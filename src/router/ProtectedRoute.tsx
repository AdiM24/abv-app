import { ReactNode } from 'react';
import {
    Navigate,
    useLocation,
} from 'react-router-dom';
import useAuth from '../context/AuthContext';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" replace state={{ error: 'Please log in' }} />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;