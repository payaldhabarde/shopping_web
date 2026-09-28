
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { FILE_URL } from "../api";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${FILE_URL}${product.image}`
    : "";

  const handleAddToCart = () => {
    dispatch(addToCart(product));

    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 4000);
  };

  return (
    <>
      <div className="card">
        <Link to={`/products/${product._id}`} className="product-image-link">
          {imageUrl ? (
            <img
              className="product-image"
              src={imageUrl}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="image-placeholder">
              No image
            </div>
          )}
        </Link>

        <span className="pill">{product.category}</span>

        <h3 className="product-title">{product.name}</h3>

        <div className="product-description">
          <p className="muted">
            {product.description?.length > 90
              ? `${product.description.slice(0, 90)}...`
              : product.description}
          </p>

          {product.description?.length > 90 && (
            <Link
              to={`/products/${product._id}`}
              className="read-more-description"
            >
              Read More
            </Link>
          )}
        </div>

        <p className="product-rating">
          ⭐ {product.rating} · {product.stock} left
        </p>

        <strong className="product-price">
          ${product.price}
        </strong>

        <button
          className="primary add-cart-btn"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>

      {showPopup && (
        <div className="cart-toast">
          <div className="cart-toast-icon">✓</div>

          <div className="cart-toast-text">
            <strong>Added to Cart</strong>
            <span>{product.name}</span>
          </div>

          <Link to="/cart" className="cart-toast-btn">
            Go to Cart
          </Link>

          <button
            className="cart-toast-close"
            onClick={() => setShowPopup(false)}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}


