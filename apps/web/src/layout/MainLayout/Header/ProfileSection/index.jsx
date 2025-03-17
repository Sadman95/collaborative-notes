import { useEffect, useRef, useState } from 'react';

import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';

// assets
import { useMutation } from '@tanstack/react-query';
import agent2 from 'api/agent2';
import { validateJwt } from 'helpers/jwtHelper';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { TbLogout, TbSettings } from 'react-icons/tb';
import { logout } from 'redux/auth.reducer';
import { selectCurrentMode, selectCurrentUser } from 'redux/selector';
import { createStructuredSelector } from 'reselect';
import { GradientCircularProgress } from 'ui-component/progess/GradientCircularProgress';
import { decrypt } from 'utils/decrypt';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = ({ currentUser, customization }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);

    const { mutate: handleLogout, isLoading: isLogoutLoading } = useMutation({
        mutationFn: agent2.User.LogOut,
        onSuccess: (v) => {
            const { message, links } = v.data;

            Cookies.remove('refresh_token');
            dispatch(logout());
            navigate(links.login);
            toast.success(message);
        },
        onError: (error) => {
            if (error.response.data.errorMessages.length > 0) {
                error.response.data.errorMessages.map(({ msg }) =>
                    setTimeout(() => {
                        toast.error(msg, { position: 'top-center' });
                    }, 500)
                );
            } else {
                toast.error(error.response.data.message, { position: 'top-right' });
            }
        }
    });

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListItemClick = (event, index, route = '') => {
        setSelectedIndex(index);
        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        }
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    useEffect(() => {
        if (currentUser) {
            const { token } = currentUser;
            if (!validateJwt(decrypt(token))) {
                dispatch(logout());

                if (Cookies.get('refresh_token')) Cookies.remove('refresh_token');
            }
        }
    }, [currentUser]);

    return (
        currentUser && (
            <>
                <Chip
                    sx={{
                        height: '48px',
                        alignItems: 'center',
                        borderRadius: '27px',
                        transition: 'all .2s ease-in-out',
                        borderColor: theme.palette.primary.light,
                        backgroundColor: theme.palette.primary.light,
                        '&[aria-controls="menu-list-grow"], &:hover': {
                            borderColor: theme.palette.primary.main,
                            background: `${theme.palette.primary.main}!important`,
                            color: theme.palette.primary.light,
                            '& svg': {
                                stroke: theme.palette.primary.light
                            }
                        },
                        '& .MuiChip-label': {
                            lineHeight: 0
                        }
                    }}
                    icon={
                        <Avatar
                            src={currentUser?.avatar}
                            sx={{
                                ...theme.typography.mediumAvatar,
                                margin: '8px 0 8px 8px !important',
                                cursor: 'pointer'
                            }}
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            color="inherit"
                        />
                    }
                    label={<TbSettings size="1.5rem" color={theme.palette.primary.main} />}
                    variant="outlined"
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    color="primary"
                />
                <Popper
                    placement="bottom-end"
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                    popperOptions={{
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, 14]
                                }
                            }
                        ]
                    }}
                >
                    {({ TransitionProps }) => (
                        <Transitions in={open} {...TransitionProps}>
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                        <Box sx={{ p: 2, pb: 0 }}>
                                            <Stack>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                                                        {currentUser.name}
                                                    </Typography>
                                                </Stack>
                                                <Typography variant="subtitle2" sx={{ color: theme.palette.grey[500] }}>
                                                    {currentUser.email}
                                                </Typography>
                                            </Stack>
                                            <Divider className="mt-4" />
                                        </Box>
                                        <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                                            <Box sx={{ p: 2, pt: 0 }}>
                                                <List
                                                    component="nav"
                                                    sx={{
                                                        width: '100%',
                                                        maxWidth: 350,
                                                        minWidth: 300,
                                                        backgroundColor: theme.palette.background.paper,
                                                        borderRadius: '10px',
                                                        [theme.breakpoints.down('md')]: {
                                                            minWidth: '100%'
                                                        },
                                                        '& .MuiListItemButton-root': {
                                                            mt: 0.5
                                                        }
                                                    }}
                                                >
                                                    <ListItemButton
                                                        sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                        selected={selectedIndex === 0}
                                                        onClick={(event) => handleListItemClick(event, 0, '#')}
                                                    >
                                                        <ListItemIcon>
                                                            <TbSettings size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            onClick={() =>
                                                                navigate('/settings', {
                                                                    replace: true
                                                                })
                                                            }
                                                            primary={<Typography variant="body2">Account Settings</Typography>}
                                                        />
                                                    </ListItemButton>

                                                    <ListItemButton
                                                        sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                        selected={selectedIndex === 4}
                                                        onClick={handleLogout}
                                                        disabled={isLogoutLoading}
                                                    >
                                                        <>
                                                            <ListItemIcon>
                                                                <TbLogout size="1.3rem" />
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={
                                                                    <Typography variant="body2">
                                                                        {isLogoutLoading ? <GradientCircularProgress /> : 'Logout'}
                                                                    </Typography>
                                                                }
                                                            />
                                                        </>
                                                    </ListItemButton>
                                                </List>
                                            </Box>
                                        </PerfectScrollbar>
                                    </MainCard>
                                </ClickAwayListener>
                            </Paper>
                        </Transitions>
                    )}
                </Popper>
            </>
        )
    );
};

ProfileSection.propTypes = {
    currentUser: PropTypes.object,
    customization: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    customization: selectCurrentMode
});
export default connect(mapStateToProps, null)(ProfileSection);
