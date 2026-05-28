// Role Guard — JWT auth + admin/user role-based route protection

const express  = require('express');
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');

const JWT_SECRET  = process.env.JWT_SECRET || 'your_jwt_secret_key';
const SALT_ROUNDS = 10;

// ─── DB ───────────────────────────────────────────────────────────────────────
mongoose.connect('mongodb://localhost:27017/role-guard')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// ─── USER MODEL ───────────────────────────────────────────────────────────────
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────

// Verify JWT and attach user to request
const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  try {
    req.user = jwt.verify(header.split(' ')[1], JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Restrict to specific roles
const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: `Access denied. Requires role: ${roles.join(' or ')}` });
  }
  next();
};

// ─── APP ──────────────────────────────────────────────────────────────────────
const app = express();
app.use(express.json());

// SIGNUP — POST /auth/signup
app.post('/auth/signup', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'username, email and password are required' });
    }
    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) return res.status(409).json({ message: 'Username or email already taken' });

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    // Only allow role: 'admin' if explicitly set — prevents privilege escalation in prod
    const user = await User.create({ username, email, password: hashed, role: role || 'user' });
    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, username, email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN — POST /auth/login
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── PROTECTED ROUTES ─────────────────────────────────────────────────────────

// Any logged-in user
app.get('/profile', authenticate, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

// Any logged-in user
app.get('/dashboard', authenticate, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}!`, role: req.user.role });
});

// Admin only — list all users
app.get('/admin/users', authenticate, authorize('admin'), async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Admin only — delete a user
app.delete('/admin/users/:id', authenticate, authorize('admin'), async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted' });
});

// Admin only — promote user to admin
app.patch('/admin/users/:id/role', authenticate, authorize('admin'), async (req, res) => {
  const { role } = req.body;
  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'role must be user or admin' });
  }
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

const PORT = 3005;
app.listen(PORT, () => console.log(`Role Guard API running on http://localhost:${PORT}`));
