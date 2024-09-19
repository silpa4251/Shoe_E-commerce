import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/Hooks/Auth';

const AdminRoute = ({ children }) => {
    const { isAuthenticated, isAdmin } = useAuth();

    if (!isAuthenticated || !isAdmin) {
        return <Navigate to="/login" />; 
    }

    return children; 
};

export default AdminRoute
