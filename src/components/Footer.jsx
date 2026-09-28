
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>MyStore</h3>
          <p>
            Your one-stop shop for quality products at the best prices.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/cart">Cart</a>
          <a href="/orders">Orders</a>
        </div>

        <div className="footer-section">
          <h4>Account</h4>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
          <a href="/profile">Profile</a>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@mystore.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MyStore. All rights reserved.</p>
      </div>
    </footer>
  );
}

