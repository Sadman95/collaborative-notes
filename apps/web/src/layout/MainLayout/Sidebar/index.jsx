import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';

// third-party
import { BrowserView, MobileView } from 'react-device-detect';
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import Chip from 'ui-component/extended/Chip';
import LogoSection from '../LogoSection';
import MenuList from './MenuList';

import { useSelector } from 'react-redux';
import { drawerWidth } from 'redux/constant';
import { selectCurrentMode } from 'redux/selector';

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const customization = useSelector(selectCurrentMode);

    const drawer = (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
                    <LogoSection />
                </Box>
            </Box>
            <BrowserView>
                <PerfectScrollbar
                    component="div"
                    style={{
                        height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                        paddingLeft: '16px',
                        paddingRight: '16px'
                    }}
                >
                    <MenuList />
                    {/* <MenuCard /> */}
                    <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
                        <Chip
                            label={import.meta.env.VITE_APP_VERSION}
                            chipcolor={customization.mode == 'dark' ? 'primary' : 'secondary'}
                            size="small"
                            sx={{ cursor: 'pointer' }}
                        />
                    </Stack>
                </PerfectScrollbar>
            </BrowserView>
            <MobileView>
                <Box sx={{ px: 2 }}>
                    <MenuList />
                    {/* <MenuCard /> */}
                    <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
                        <Chip
                            label={import.meta.env.VITE_APP_VERSION}
                            chipcolor={customization.mode == 'dark' ? 'primary' : 'secondary'}
                            size="small"
                            sx={{ cursor: 'pointer' }}
                        />
                    </Stack>
                </Box>
            </MobileView>
        </>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
            <Drawer
                container={container}
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor="left"
                open={drawerOpen}
                onClose={drawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        background: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        borderRight: 'none',
                        [theme.breakpoints.up('md')]: {
                            top: '88px'
                        }
                    }
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

Sidebar.propTypes = {
    drawerOpen: PropTypes.bool,
    drawerToggle: PropTypes.func,
    window: PropTypes.object
};

export default Sidebar;
