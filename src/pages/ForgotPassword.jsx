import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resetUrl, setResetUrl] = useState("");

  async function submit(e) {
    e.preventDefault();

    setMessage("");
    setError("");
    setResetUrl("");

    try {
      const { data } = await api.post("/auth/forgot-password", {
        email
      });

      setMessage(data.message);

      if (data.resetUrl) {
        setResetUrl(data.resetUrl);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }

  return (
    <form className="form-card" onSubmit={submit}>
      <h2>Forgot Password</h2>

      <p>
        Enter your registered email to reset your password.
      </p>

      {message && <div className="success">{message}</div>}

      {error && <div className="error">{error}</div>}

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button className="primary">
        Reset Password
      </button>

      {resetUrl && (
        <p>
          <strong>Reset Link:</strong>{" "}
          <a href={resetUrl}>Click here to reset password</a>
        </p>
      )}

      <p>
        Remember your password?{" "}
        <Link to="/login">Back to Login</Link>
      </p>
    </form>
  );
}

