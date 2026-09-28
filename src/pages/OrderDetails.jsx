import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`).then(({ data }) => setOrder(data));
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="form-card wide">
      <h2>Order #{order._id.slice(-8)}</h2>
      <p>Status: <strong>{order.status}</strong></p>
      <p>Payment: {order.paymentMethod} / {order.paymentStatus}</p>
      {order.items.map((i) => <div className="cart-row" key={i.product}><span>{i.name}</span><span>{i.quantity} × ₹{i.price}</span></div>)}
      <hr />
      <p>Subtotal: ₹{order.subtotal}</p>
      <p>Delivery: ₹{order.deliveryFee}</p>
      <h2>Total: ₹{order.total}</h2>
    </div>
  );
}
