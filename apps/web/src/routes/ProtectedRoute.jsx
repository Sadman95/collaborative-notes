// ProtectedRoute.js
import { validateJwt } from 'helpers/jwtHelper';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectCurrentUser } from 'redux/selector';
import { decrypt } from 'utils/decrypt';

// ==============================|| PROTECTED ROUTING ||============================== //

const ProtectedRoute = ({ children }) => {
    const currentUser = useSelector(selectCurrentUser);

    if (!currentUser || !validateJwt(decrypt(currentUser.token))) {
        return <Navigate to="/auth/login" replace />;
    }
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node
};

export default ProtectedRoute;
