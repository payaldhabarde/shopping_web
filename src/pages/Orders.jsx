import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then(({ data }) => setOrders(data));
  }, []);

  return (
    <div>
      <h1>My Orders</h1>
      {orders.map((o) => (
        <Link className="order-row" to={`/orders/${o._id}`} key={o._id}>
          <span>#{o._id.slice(-6)}</span>
          <span>₹{o.total}</span>
          <span>{o.status}</span>
        </Link>
      ))}
    </div>
  );
}
