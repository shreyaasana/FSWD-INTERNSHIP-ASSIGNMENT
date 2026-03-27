import { useState, useMemo } from 'react'
import './App.css'

const PRODUCTS = [
  { id: 1, name: 'Sketch Pad', price: 599, category: 'Art', emoji: '🎨', rating: 4.6 },
  { id: 2, name: 'Camera Lens', price: 4999, category: 'Photography', emoji: '📷', rating: 4.8 },
  { id: 3, name: 'Graphic Tablet', price: 3499, category: 'Tech', emoji: '✏️', rating: 4.4 },
  { id: 4, name: 'LED Ring Light', price: 1299, category: 'Photography', emoji: '💡', rating: 4.2 },
  { id: 5, name: 'Acrylic Paint Set', price: 899, category: 'Art', emoji: '🖌️', rating: 4.5 },
  { id: 6, name: 'Tripod Stand', price: 1599, category: 'Photography', emoji: '📐', rating: 4.3 },
  { id: 7, name: 'Wireless Mouse', price: 799, category: 'Tech', emoji: '🖱️', rating: 4.1 },
  { id: 8, name: 'Canvas Roll', price: 449, category: 'Art', emoji: '🖼️', rating: 4.0 },
  { id: 9, name: 'USB Microphone', price: 2199, category: 'Tech', emoji: '🎤', rating: 4.7 },
]

const CATEGORIES = ['All', 'Art', 'Photography', 'Tech']

function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('default')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'All' || p.category === category
      return matchesSearch && matchesCategory
    })

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price)
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating)
    else if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name))

    return result
  }, [search, category, sortBy])

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    )
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  const renderStars = (rating) => {
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.5
    let stars = ''
    for (let i = 0; i < full; i++) stars += '★'
    if (half) stars += '☆'
    return stars
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>🛍️ BazaarBox</h1>
        <div className="header-right">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
            🛒 Cart ({cartCount})
          </button>
        </div>
      </header>

      {/* Main Content: Products LEFT, Sidebar RIGHT */}
      <div className="main-layout">
        {/* Products (left, wider) */}
        <main className="products-section">
          <div className="controls">
            <div className="categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`cat-btn ${category === cat ? 'active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="default">Sort by</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-results">
              <span className="no-emoji">🔍</span>
              <p>No products found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="card-image-area">
                    <span className="product-emoji">{product.emoji}</span>
                    <span className="card-category">{product.category}</span>
                  </div>
                  <div className="card-body">
                    <h3>{product.name}</h3>
                    <div className="card-meta">
                      <span className="stars">{renderStars(product.rating)}</span>
                      <span className="rating-num">{product.rating}</span>
                    </div>
                    <div className="card-footer">
                      <span className="price">₹{product.price.toLocaleString()}</span>
                      <button className="add-btn" onClick={() => addToCart(product)}>
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Sidebar / Cart (right, narrower) */}
        <aside className={`sidebar ${showCart ? 'sidebar-open' : ''}`}>
          <h2>🛒 Your Cart</h2>
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            <>
              <ul className="cart-list">
                {cart.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <span className="cart-emoji">{item.emoji}</span>
                      <div>
                        <strong>{item.name}</strong>
                        <span className="cart-price">₹{item.price}</span>
                      </div>
                    </div>
                    <div className="cart-item-controls">
                      <button onClick={() => updateQty(item.id, -1)}>−</button>
                      <span className="qty">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)}>+</button>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <strong>Total:</strong>
                <strong>₹{cartTotal.toLocaleString()}</strong>
              </div>
              <button className="checkout-btn">Checkout →</button>
            </>
          )}
        </aside>
      </div>
    </div>
  )
}

export default App
