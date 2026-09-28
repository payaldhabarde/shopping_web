
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { increase, decrease, remove } from "../redux/cartSlice";
import { FILE_URL } from "../api";

export default function Cart() {
  const items = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();

  const subtotal = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const delivery = subtotal >= 499 || subtotal === 0 ? 0 : 40;
  const total = subtotal + delivery;

  if (!items.length) {
    return (
      <div className="empty">
        <h2>Your cart is empty</h2>
        <Link className="primary inline" to="/products">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Cart</h1>

      <div className="cart-list">
        {items.map((item) => {
          const imageUrl = item.image
            ? item.image.startsWith("http")
              ? item.image
              : `${FILE_URL}${item.image}`
            : "";

          return (
            <div className="cart-row" key={item.product}>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={item.name}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="cart-image-placeholder">
                  No image
                </div>
              )}

              <div className="grow">
                <h3>{item.name}</h3>
                <p>₹{Number(item.price).toFixed(2)}</p>
              </div>

              <button
                onClick={() => dispatch(decrease(item.product))}
              >
                −
              </button>

              <strong>{item.quantity}</strong>

              <button
                onClick={() => dispatch(increase(item.product))}
              >
                +
              </button>

              <button
                onClick={() => dispatch(remove(item.product))}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <div className="summary">
        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
        <p>Delivery: ₹{delivery.toFixed(2)}</p>
        <h2>Total: ₹{total.toFixed(2)}</h2>

        <Link className="primary inline" to="/checkout">
          Checkout
        </Link>
      </div>
    </div>
  );
}
