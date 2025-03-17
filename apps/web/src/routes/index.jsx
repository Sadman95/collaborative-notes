import { createBrowserRouter, Outlet } from 'react-router-dom';

export const ErrorBoundaryLayout = () => (
    <ErrorBoundary FallbackComponent={<Box>Error!</Box>}>
        <Outlet />
    </ErrorBoundary>
);

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import { ErrorBoundary } from 'react-error-boundary';
import { Box } from '@mui/material';

// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([MainRoutes, AuthenticationRoutes]);

export default router;
