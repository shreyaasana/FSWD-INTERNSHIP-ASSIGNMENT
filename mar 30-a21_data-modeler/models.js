// models/  — MongoDB schemas for a blogging platform using Mongoose

const mongoose = require('mongoose');

// ─── USER ─────────────────────────────────────────────────────────────────────
const userSchema = new mongoose.Schema(
  {
    username:  { type: String, required: true, unique: true, trim: true },
    email:     { type: String, required: true, unique: true, lowercase: true },
    password:  { type: String, required: true },           // stored as bcrypt hash
    bio:       { type: String, default: '' },
    avatar:    { type: String, default: '' },              // URL
    role:      { type: String, enum: ['user', 'admin'], default: 'user' },
    isActive:  { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ─── CATEGORY ─────────────────────────────────────────────────────────────────
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
  },
  { timestamps: true }
);

// ─── TAG ──────────────────────────────────────────────────────────────────────
const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
});

// ─── POST ─────────────────────────────────────────────────────────────────────
const postSchema = new mongoose.Schema(
  {
    title:      { type: String, required: true, trim: true },
    slug:       { type: String, required: true, unique: true, lowercase: true },
    content:    { type: String, required: true },
    excerpt:    { type: String, default: '' },             // short summary
    coverImage: { type: String, default: '' },             // URL
    author:     { type: mongoose.Schema.Types.ObjectId, ref: 'User',     required: true },
    category:   { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    tags:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    status:     { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    views:      { type: Number, default: 0 },
    likes:      [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // users who liked
    publishedAt:{ type: Date },
  },
  { timestamps: true }
);
// Auto-set publishedAt when status becomes 'published'
postSchema.pre('save', function (next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

// ─── COMMENT ──────────────────────────────────────────────────────────────────
const commentSchema = new mongoose.Schema(
  {
    post:    { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    author:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    parent:  { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null }, // for nested replies
    likes:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

// ─── EXPORT ───────────────────────────────────────────────────────────────────
const User     = mongoose.model('User',     userSchema);
const Category = mongoose.model('Category', categorySchema);
const Tag      = mongoose.model('Tag',      tagSchema);
const Post     = mongoose.model('Post',     postSchema);
const Comment  = mongoose.model('Comment',  commentSchema);

module.exports = { User, Category, Tag, Post, Comment };

/*
  SCHEMA RELATIONSHIPS SUMMARY
  ─────────────────────────────
  User      → has many Posts (author field in Post)
  User      → has many Comments (author field in Comment)
  Post      → belongs to one User (author)
  Post      → belongs to one Category
  Post      → has many Tags (array)
  Post      → has many Comments
  Comment   → belongs to one Post
  Comment   → belongs to one User
  Comment   → optionally belongs to one Comment (for replies / nesting)
*/
