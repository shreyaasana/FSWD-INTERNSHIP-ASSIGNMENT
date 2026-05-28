const express = require('express');
const app = express();
app.use(express.json());

// In-memory data store
let books = [
  { id: 1, title: 'The Pragmatic Programmer', authorId: 1, genre: 'Tech', price: 499 },
  { id: 2, title: 'Clean Code',               authorId: 2, genre: 'Tech', price: 549 },
  { id: 3, title: 'You Don\'t Know JS',        authorId: 3, genre: 'Tech', price: 399 },
];
let authors = [
  { id: 1, name: 'Andrew Hunt',    country: 'USA' },
  { id: 2, name: 'Robert C. Martin', country: 'USA' },
  { id: 3, name: 'Kyle Simpson',   country: 'USA' },
];
let nextBookId   = 4;
let nextAuthorId = 4;

// ─── BOOK ROUTES ──────────────────────────────────────────────────────────────

// GET  /books          → list all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET  /books/:id      → get one book
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// POST /books          → create a book
app.post('/books', (req, res) => {
  const { title, authorId, genre, price } = req.body;
  if (!title || !authorId) {
    return res.status(400).json({ message: 'title and authorId are required' });
  }
  const book = { id: nextBookId++, title, authorId, genre, price };
  books.push(book);
  res.status(201).json(book);
});

// PUT  /books/:id      → update a book
app.put('/books/:id', (req, res) => {
  const idx = books.findIndex(b => b.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Book not found' });
  books[idx] = { ...books[idx], ...req.body, id: books[idx].id };
  res.json(books[idx]);
});

// DELETE /books/:id    → delete a book
app.delete('/books/:id', (req, res) => {
  const idx = books.findIndex(b => b.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Book not found' });
  const deleted = books.splice(idx, 1)[0];
  res.json({ message: 'Book deleted', book: deleted });
});

// ─── AUTHOR ROUTES ────────────────────────────────────────────────────────────

// GET  /authors        → list all authors
app.get('/authors', (req, res) => {
  res.json(authors);
});

// GET  /authors/:id    → get one author
app.get('/authors/:id', (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));
  if (!author) return res.status(404).json({ message: 'Author not found' });
  res.json(author);
});

// GET  /authors/:id/books → all books by an author
app.get('/authors/:id/books', (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));
  if (!author) return res.status(404).json({ message: 'Author not found' });
  const authorBooks = books.filter(b => b.authorId === author.id);
  res.json({ author, books: authorBooks });
});

// POST /authors        → create an author
app.post('/authors', (req, res) => {
  const { name, country } = req.body;
  if (!name) return res.status(400).json({ message: 'name is required' });
  const author = { id: nextAuthorId++, name, country };
  authors.push(author);
  res.status(201).json(author);
});

// PUT  /authors/:id    → update an author
app.put('/authors/:id', (req, res) => {
  const idx = authors.findIndex(a => a.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Author not found' });
  authors[idx] = { ...authors[idx], ...req.body, id: authors[idx].id };
  res.json(authors[idx]);
});

// DELETE /authors/:id  → delete an author
app.delete('/authors/:id', (req, res) => {
  const idx = authors.findIndex(a => a.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Author not found' });
  const deleted = authors.splice(idx, 1)[0];
  res.json({ message: 'Author deleted', author: deleted });
});

// ─── START ────────────────────────────────────────────────────────────────────
const PORT = 3000;
app.listen(PORT, () => console.log(`Bookstore API running on http://localhost:${PORT}`));
