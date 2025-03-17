import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import { useMutation } from '@tanstack/react-query';
import agent1 from 'api/agent1';
import { validateJwt } from 'helpers/jwtHelper';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from 'redux/auth.reducer';
import { selectCurrentMode } from 'redux/selector';
import { GradientCircularProgress } from 'ui-component/progess/GradientCircularProgress';

// ============================|| AUTH - LOGIN ||============================ //

const AuthLogin = ({ ...others }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector(selectCurrentMode);
    const currentUser = useSelector((state) => state.auth).user;
    const [checked, setChecked] = useState(false);
    const [demoChecked, setDemoChecked] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const redirect_uri = location.state?.from || '/';

    // login with credentials mutation
    const { mutate: loginMutation, isLoading: isLoginLoading } = useMutation({
        // agent1.Authentication.Login
        mutationFn: (data) => agent1.Authentication.Login(data),
        onSuccess: (res) => {
            const { links, message, data } = res.data;

            const user = validateJwt(data.accessToken);

            dispatch(login({ token: data.accessToken, ...user }));

            toast.success(message, {
                position: 'top-center'
            });
            navigate(redirect_uri ? redirect_uri : links.home);
        },
        onError: (error) => {
            if (error.response.data.errorMessages.length > 0) {
                error.response.data.errorMessages.map(({ message }) =>
                    setTimeout(() => {
                        toast.error(message, { position: 'top-center' });
                    }, 500)
                );
            } else {
                toast.error(error.response.data.message, { position: 'top-center' });
            }
        }
    });

    useEffect(() => {
        if (currentUser) {
            navigate(redirect_uri);
        }
    }, [currentUser]);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const css = `
  .hover\\:text-underline:hover{
    text-decoration: underline;
    
  }
    label{
    color: ${theme.palette.text.disabled}
}
  `;

    return (
        <>
            <style>{css}</style>

            <Formik
                initialValues={{
                    email: demoChecked ? import.meta.env.VITE_APP_DEMO_EMAIL : '',
                    password: demoChecked ? import.meta.env.VITE_APP_DEMO_PASSWORD : ''
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={(v) => loginMutation(v)}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
                            <OutlinedInput
                                readOnly={demoChecked}
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email Address"
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                readOnly={demoChecked}
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isLoginLoading}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    {isLoginLoading ? <GradientCircularProgress /> : 'Sign in'}
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>

            <Grid item xs={12}>
                <Box margin={1} />
                <Divider orientation="horizontal" />
                <Box margin={1} />
                <Grid item container direction="column" alignItems="center" xs={12}>
                    <Typography
                        className="hover:text-underline"
                        component={Link}
                        to="/auth/register"
                        variant="subtitle1"
                        sx={{ textDecoration: 'none' }}
                        color={customization.mode == 'dark' ? theme.palette.grey[900] : theme.palette.grey[100]}
                    >
                        Don&apos;t have an account?
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default AuthLogin;
