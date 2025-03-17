// material-ui

// project imports

// assets
import { Box, Typography } from '@mui/material';
import Notes from 'components/notes';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'redux/selector';
import { GradientCircularProgress } from 'ui-component/progess/GradientCircularProgress';

// ==============================|| DEFAULT DASHBOARD ||============================== //
const Dashboard = () => {
    const currentUser = useSelector(selectCurrentUser);

    return (
        <>
            
            <Notes />
            
        </>
    );
};

export default Dashboard;
