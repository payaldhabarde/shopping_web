// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function ProtectedRoute({ children, admin = false }) {
//   const { user } = useSelector((s) => s.auth);
//   if (!user) return <Navigate to="/login" replace />;
//   if (admin && user.role !== "admin") return <Navigate to="/" replace />;
//   return children;
// }


import {
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({
  children,
  admin = false,
}) {
  const { user } = useSelector(
    (s) => s.auth
  );

  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  if (
    admin &&
    user.role !== "admin"
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}

