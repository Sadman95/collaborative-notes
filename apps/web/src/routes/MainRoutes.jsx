// project imports
import MainLayout from 'layout/MainLayout';
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import NotFound from 'views/pages/not-found';
import ProtectedRoute from './ProtectedRoute';

// dashboard routing
const Dashboard = Loadable(lazy(() => import('views/pages/dashboard')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: (
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            )
        },

        {
            path: '*',
            element: <NotFound />
        }
    ]
};

export default MainRoutes;
