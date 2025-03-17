import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import AuthLogin from 'views/pages/authentication/auth-forms/AuthLogin';
import AuthRegister from 'views/pages/authentication/auth-forms/AuthRegister';

// login option 3 routing
const Auth = Loadable(lazy(() => import('views/pages/authentication/Auth')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/auth',
    element: <Auth />,
    children: [
        {
            path: '/auth/login',
            element: <AuthLogin />
        },
        {
            path: '/auth/register',
            element: <AuthRegister />
        },
       
    ]
};

export default AuthenticationRoutes;
