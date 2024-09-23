import { Navigate, useLocation} from 'react-router-dom'
import { useAuth } from '../../Hooks/Auth'


const PrivateRoute = ({ element, ...rest }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation(); 

    return isAuthenticated ? (
        element
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default PrivateRoute
