import { Grid, Stack, Typography } from '@mui/material';
import DummyLoginBg from 'assets/images/dummy-login.jpg';
import { Outlet } from 'react-router-dom';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthWrapper from '../AuthWrapper';
// import GoogleSignIn from 'views/utilities/GoogleSignIn';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCurrentMode } from 'redux/selector';

const css = `
  body {
    overflow-y: hidden;
    height: 100vh;
  }
  .text-hover-underline:hover{
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Auth = () => {
    const theme = useTheme();
    const customization = useSelector(selectCurrentMode);

    return (
        <>
            <style>{css}</style>
            <AuthWrapper>
                <Grid container sx={{ minHeight: '100vh', overflow: 'hidden' }}>
                    <Grid item xs={12} md={7} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <img src={DummyLoginBg} alt="authLoginBg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Grid>
                    <Grid item xs={12} md={5} sx={{ height: '100vh', overflow: 'auto' }}>
                        <Grid container direction="column" justifyContent="flex-end" sx={{ height: '100vh' }}>
                            <Grid item xs={12}>
                                <Grid container justifyContent="center" alignItems="center" sx={{ height: 'calc(100vh - 68px)' }}>
                                    <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                                        <AuthCardWrapper>
                                            <Grid container spacing={2} alignItems="center" justifyContent="center">
                                                <Grid item xs={12}>
                                                    <Grid
                                                        container
                                                        direction={{ xs: 'column-reverse', md: 'row' }}
                                                        alignItems="center"
                                                        justifyContent="center"
                                                    >
                                                        <Grid item>
                                                            <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                                <Logo />
                                                                <Typography
                                                                    variant="caption"
                                                                    fontSize="16px"
                                                                    textAlign="center"
                                                                    color={
                                                                        customization.mode == 'dark'
                                                                            ? theme.palette.grey[800]
                                                                            : theme.palette.common.white
                                                                    }
                                                                >
                                                                    Enter your credentials to continue
                                                                </Typography>
                                                            </Stack>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Outlet />
                                                </Grid>
                                            </Grid>
                                        </AuthCardWrapper>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                                <AuthFooter />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AuthWrapper>
        </>
    );
};

export default Auth;
