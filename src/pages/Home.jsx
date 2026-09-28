
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-banner">
      <div className="banner-shape shape-one"></div>
      <div className="banner-shape shape-two"></div>
      <div className="banner-shape shape-three"></div>

      <div className="banner-content">
        <span className="banner-badge">
          ⚡ Fast delivery · Fresh products
        </span>

        <h1>
          Everything you need,
          <span> delivered quickly.</span>
        </h1>

        <p>
          Discover amazing products, enjoy smooth shopping and get everything
          delivered right to your doorstep.
        </p>

        <div className="banner-actions">
          <Link className="shop-now-btn" to="/products">
            Shop Now
            <span>→</span>
          </Link>

          <Link className="explore-btn" to="/products">
            Explore Products
          </Link>
        </div>

        <div className="banner-features">
          <div>
            <strong>10K+</strong>
            <span>Products</span>
          </div>

          <div>
            <strong>24/7</strong>
            <span>Support</span>
          </div>

          <div>
            <strong>Fast</strong>
            <span>Delivery</span>
          </div>
        </div>
      </div>

      <div className="banner-visual">
        <div className="floating-card card-one">
          <span>📱</span>
          <div>
            <strong>Mobiles</strong>
            <small>Latest collection</small>
          </div>
        </div>

        <div className="floating-card card-two">
          <span>👕</span>
          <div>
            <strong>Fashion</strong>
            <small>Trending styles</small>
          </div>
        </div>

        <div className="floating-card card-three">
          <span>🎧</span>
          <div>
            <strong>Electronics</strong>
            <small>Best deals</small>
          </div>
        </div>

        <div className="main-product-circle">
          <div className="circle-glow"></div>
          <div className="shopping-bag">🛍️</div>
        </div>

        <div className="discount-badge">
          <strong>50%</strong>
          <span>OFF</span>
        </div>
      </div>
    </div>
  );
}



