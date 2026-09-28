import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { clearCart } from "../redux/cartSlice";

export default function Checkout() {
  const items = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState({ name: "", phone: "", address: "", city: "", pincode: "" });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [error, setError] = useState("");

  async function placeOrder(e) {
    e.preventDefault();
    try {
      const { data } = await api.post("/orders", { items, shippingAddress: address, paymentMethod });
      dispatch(clearCart());
      navigate(`/orders/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Could not place order");
    }
  }

  return (
    <form className="form-card wide" onSubmit={placeOrder}>
      <h2>Checkout</h2>
      {error && <div className="error">{error}</div>}
      {Object.keys(address).map((key) => (
        <input key={key} placeholder={key[0].toUpperCase() + key.slice(1)} value={address[key]} onChange={(e) => setAddress({ ...address, [key]: e.target.value })} required />
      ))}
      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="COD">Cash on Delivery</option>
        <option value="ONLINE">UPI</option>
      </select>
      <button className="primary">Place Order</button>
    </form>
  );
}
