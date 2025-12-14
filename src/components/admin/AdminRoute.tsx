import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface AdminRouteProps {
    children: React.ReactNode;
}

/**
 * Protected route component that ensures admin routes are only accessible
 * when user is authenticated and through the /admin path structure
 */
export const AdminRoute = ({ children }: AdminRouteProps) => {
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    // Ensure the path starts with /admin
    if (!location.pathname.startsWith("/admin")) {
        return <Navigate to="/admin" replace />;
    }

    return <>{children}</>;
};

