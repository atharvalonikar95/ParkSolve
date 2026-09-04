import { useAuth } from '../context/AuthProvider'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AdminRoutes = () => {
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading) return null;

    if (!user) {
        return <Navigate to='/signin' state={{ from: location }} replace/>;
    }

    if (user.role !== "admin") {
        return <Navigate to='/home' />;
    }

    return <Outlet />;
}

export default AdminRoutes