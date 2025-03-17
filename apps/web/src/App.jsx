import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

// routing
import router from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { selectCurrentMode } from 'redux/selector';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector(selectCurrentMode);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <RouterProvider router={router} />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
