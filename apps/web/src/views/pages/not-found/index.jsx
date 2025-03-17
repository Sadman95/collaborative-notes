import { Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCurrentMode } from 'redux/selector';

const NotFound = () => {
    const { mode } = useSelector(selectCurrentMode);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4
            }}
        >
            <Typography variant="h1" fontWeight={900} fontSize={90}>
                404
            </Typography>
            <Typography variant="h4">Page not found!</Typography>
            <Link to={'/'}>
                <Button variant="contained" color={mode == 'dark' ? 'secondary' : 'info'}>
                    Go Home
                </Button>
            </Link>
        </Box>
    );
};

export default NotFound;
