import { connect, useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// material-ui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import { CssBaseline, styled, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { SET_MENU } from 'redux/actions';
import { drawerWidth } from 'redux/constant';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import Customization from '../Customization';
import Header from './Header';
import Sidebar from './Sidebar';

// assets
import { FaChevronRight } from 'react-icons/fa';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from 'redux/selector';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'theme' })(({ theme, open }) => ({
    ...theme.typography.mainContent,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create(
        'margin',
        open
            ? {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.enteringScreen
              }
            : {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen
              }
    ),
    [theme.breakpoints.up('md')]: {
        marginLeft: open ? 0 : -(drawerWidth - 20),
        width: `calc(100% - ${drawerWidth}px)`
    },
    [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px'
    },
    [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px',
        marginRight: '10px'
    }
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = ({ currentUser }) => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                }}
            >
                <Toolbar>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} currentUser={currentUser} />
                </Toolbar>
            </AppBar>

            {/* drawer */}
            <Sidebar
                currentUser={currentUser}
                drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
                drawerToggle={handleLeftDrawerToggle}
            />

            {/* main content */}
            <Main theme={theme} open={leftDrawerOpened}>
                {/* breadcrumb */}
                <Breadcrumbs separator={FaChevronRight} navigation={navigation} icon title rightAlign />
                <Outlet />
            </Main>
            <Customization />
        </Box>
    );
};

MainLayout.propTypes = {
    currentUser: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});
export default connect(mapStateToProps, null)(MainLayout);
