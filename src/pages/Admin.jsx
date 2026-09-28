import { useEffect, useState } from "react";
import api, { FILE_URL } from "../api";

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get("/admin/dashboard"),
      api.get("/admin/users"),
      api.get("/orders/admin/all")
    ]).then(([a, u, o]) => {
      setStats(a.data);
      setUsers(u.data);
      setOrders(o.data);
    });
  }, []);

  async function updateStatus(id, status) {
    const { data } = await api.put(`/orders/${id}/status`, { status });
    setOrders((old) => old.map((o) => o._id === id ? data : o));
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {stats && <div className="stats">
        <div><strong>{stats.users}</strong><span>Users</span></div>
        <div><strong>{stats.products}</strong><span>Products</span></div>
        <div><strong>{stats.orders}</strong><span>Orders</span></div>
        <div><strong>₹{stats.revenue}</strong><span>Revenue</span></div>
        <div><strong>{stats.loginEvents}</strong><span>Login events</span></div>
      </div>}

      <h2>Users / Login Count</h2>
      <div className="table">
        {users.map((u) => (
          <div className="table-row" key={u._id}>
            <span>{u.name}</span><span>{u.email}</span><span>Logins: {u.loginCount}</span>
            <span>{u.lastLogin ? new Date(u.lastLogin).toLocaleString() : "—"}</span>
          </div>
        ))}
      </div>

      <h2>Orders</h2>
      {orders.map((o) => (
        <div className="order-row" key={o._id}>
          <span>#{o._id.slice(-6)} · {o.user?.email}</span>
          <span>₹{o.total}</span>
          <select value={o.status} onChange={(e) => updateStatus(o._id, e.target.value)}>
            {["Placed", "Confirmed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      ))}
    </div>
  );
}
