import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function submit(e) {
    e.preventDefault();

    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { data } = await api.post(
        `/auth/reset-password/${token}`,
        { password }
      );

      setMessage(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to reset password"
      );
    }
  }

  return (
    <form className="form-card" onSubmit={submit}>
      <h2>Reset Password</h2>

      {message && <div className="success">{message}</div>}

      {error && <div className="error">{error}</div>}

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={6}
        required
      />

      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        minLength={6}
        required
      />

      <button className="primary">
        Change Password
      </button>

      <p>
        <Link to="/login">Back to Login</Link>
      </p>
    </form>
  );
}

