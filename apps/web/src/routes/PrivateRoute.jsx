// ProtectedRoute.js
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { Navigate, useLocation } from 'react-router-dom';

// ==============================|| PRIVATE ROUTING ||============================== //

const PrivateRoute = ({ children }) => {
    const location = useLocation();

    if (!Cookies.get('__twilio_data')) {
        setTimeout(() => {
            toast.error('Provide you twilio credentials first!', {
                duration: 5000
            });
        });
        return <Navigate to="/twilio/settings" replace state={location.pathname} />;
    }
    return children;
};

PrivateRoute.propTypes = {
    children: PropTypes.node
};

export default PrivateRoute;
