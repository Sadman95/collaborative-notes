// material-ui
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack position="fixed" bottom="1rem" right="2rem" direction="row" justifyContent="flex-end">
    <Typography variant="subtitle2" component={Link} href="https://alchemy-bd.com" target="_blank" underline="hover">
      &copy; asl-bd.com
    </Typography>
  </Stack>
);

export default AuthFooter;
