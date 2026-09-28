import { useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector((s) => s.auth);
  return (
    <div className="form-card">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Login count:</strong> {user.loginCount}</p>
      <p><strong>Last login:</strong> {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Not available"}</p>
    </div>
  );
}
