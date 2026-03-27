import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [activeField, setActiveField] = useState(null)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const getEmoji = () => {
    if (submitted) return '🎊'
    if (Object.keys(errors).length > 0 && Object.keys(errors).some(k => errors[k])) return '😬'
    if (activeField === 'name') return '👋'
    if (activeField === 'email') return '🔍'
    if (activeField === 'password' || activeField === 'confirmPassword') {
      if (passwordStrength >= 4) return '💪'
      if (passwordStrength >= 2) return '🛡️'
    }
    return '🌟'
  }

  const calculateStrength = (pass) => {
    let score = 0
    if (pass.length >= 8) score++
    if (/[A-Z]/.test(pass)) score++
    if (/[0-9]/.test(pass)) score++
    if (/[^A-Za-z0-9]/.test(pass)) score++
    return score
  }

  useEffect(() => {
    setPasswordStrength(calculateStrength(formData.password))
  }, [formData.password])

  const getStrengthLabel = () => {
    if (formData.password.length === 0) return ''
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong']
    return labels[passwordStrength]
  }

  const getStrengthColor = (index) => {
    if (index >= passwordStrength) return '#e2e8f0'
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e']
    return colors[Math.min(passwordStrength - 1, 3)]
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Must be at least 8 characters'
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true)
    }
  }

  const checklist = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(formData.password) },
    { label: 'One number', met: /[0-9]/.test(formData.password) },
    { label: 'One special character', met: /[^A-Za-z0-9]/.test(formData.password) },
  ]

  if (submitted) {
    return (
      <div className="page">
        <div className="card success-card">
          <div className="face-emoji">🎊</div>
          <h2>Welcome aboard, {formData.name}!</h2>
          <p>Your account has been created successfully.</p>
          <button className="submit-btn" onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', password: '', confirmPassword: '' }) }}>
            Create Another Account
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="card">
        <div className="card-stripe"></div>
        <div className="face-emoji">{getEmoji()}</div>
        <h1>Create Account</h1>
        <p className="subtitle">Join us and get started today</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>🧑 Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setActiveField('name')}
              onBlur={() => setActiveField(null)}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>

          <div className="field">
            <label>✉️ Email</label>
            <input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setActiveField('email')}
              onBlur={() => setActiveField(null)}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="field">
            <label>🔐 Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Create a secure password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setActiveField('password')}
                onBlur={() => setActiveField(null)}
                className={errors.password ? 'error' : ''}
              />
              <button type="button" className="toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <span className="error-msg">{errors.password}</span>}

            {formData.password && (
              <>
                <div className="strength-bars-vertical">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="v-bar"
                      style={{ backgroundColor: getStrengthColor(i) }}
                    />
                  ))}
                </div>
                <span className="strength-label">{getStrengthLabel()}</span>

                <ul className="checklist">
                  {checklist.map((item, i) => (
                    <li key={i} className={item.met ? 'met' : ''}>
                      {item.met ? '✅' : '⬜'} {item.label}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="field">
            <label>🔓 Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => setActiveField('confirmPassword')}
                onBlur={() => setActiveField(null)}
                className={errors.confirmPassword ? 'error' : ''}
              />
              <button type="button" className="toggle-btn" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default App
