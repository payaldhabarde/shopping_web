import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const count = useSelector((s) => s.cart.items.reduce((n, i) => n + i.quantity, 0));

  function signOut() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <nav className="nav">
      <Link className="logo" to="/">QuickCommerce</Link>
      <div className="nav-links">
        <Link to="/products">Products</Link>
        {user && <Link to="/orders">Orders</Link>}
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
        <Link to="/cart">Cart ({count})</Link>
        {user ? (
          <>
            <Link to="/profile">{user.name}</Link>
            <button onClick={signOut}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
