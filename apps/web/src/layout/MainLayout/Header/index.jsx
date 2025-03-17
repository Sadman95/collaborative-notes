import PropTypes from 'prop-types';

// material-ui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { useTheme } from '@mui/material/styles';

// project imports
import LogoSection from '../LogoSection';
import ProfileSection from './ProfileSection';
import SearchSection from './SearchSection';

// assets
import { useEffect, useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { SET_COLOR_MODE } from 'redux/actions';
import ToggleMode from './ToggleMode';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle, currentUser }) => {
    const theme = useTheme();

    const dispatch = useDispatch();

    // state - color mode
    const [toggleMode, setToggleMode] = useState(true);
    useEffect(() => {
        let currentMode;
        switch (toggleMode) {
            case false:
                currentMode = 'light';
                break;
            default:
                currentMode = 'dark';
                break;
        }
        dispatch({ type: SET_COLOR_MODE, mode: currentMode });
    }, [dispatch, toggleMode]);

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                <ButtonBase sx={{ borderRadius: '8px', overflow: 'hidden' }}>
                    <Avatar
                        src={currentUser?.picture}
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <HiMenu size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>

            {/* header search */}
            {/* <SearchSection /> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* notification, profile & mode-switch */}
            <ToggleMode toggleMode={toggleMode} setToggleMode={setToggleMode} />
            {/* <NotificationSection /> */}
            <ProfileSection />
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func,
    currentUser: PropTypes.object
};

export default Header;
