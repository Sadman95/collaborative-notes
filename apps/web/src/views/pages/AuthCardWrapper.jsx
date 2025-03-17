import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';

// project import
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCurrentMode } from 'redux/selector';
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapper = ({ children, ...other }) => {
    const theme = useTheme();
    const { mode } = useSelector(selectCurrentMode);

    return (
        <MainCard
            sx={{
                maxWidth: { xs: 400, lg: 475 },
                margin: { xs: 2.5, md: 3 },
                backgroundColor: mode == 'dark' ? theme.palette.common.white : theme.palette.grey[700],
                color: mode == 'dark' ? theme.palette.background.paper : theme.palette.common.white,
                '& > *': {
                    flexGrow: 1,
                    flexBasis: '50%'
                }
            }}
            content={false}
            {...other}
        >
            <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
        </MainCard>
    );
};

AuthCardWrapper.propTypes = {
    children: PropTypes.node
};

export default AuthCardWrapper;
