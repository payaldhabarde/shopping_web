
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../api";
import { setAuth } from "../redux/authSlice";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/auth/login", form);
      dispatch(setAuth(data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <form className="form-card" onSubmit={submit}>
      <h2>Login</h2>

      {error && <div className="error">{error}</div>}

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
        required
      />

      <div style={{ textAlign: "right", marginBottom: "12px" }}>
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>

      <button className="primary">Sign in</button>

      <p>
        New user? <Link to="/register">Create account</Link>
      </p>
    </form>
  );
}

