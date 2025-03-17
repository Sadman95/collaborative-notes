import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { MdLightMode, MdNightlight } from 'react-icons/md';

const ToggleMode = ({ toggleMode, setToggleMode }) => {
    const css = `
        .cursor-pointer {
            cursor: pointer;
            display: inline-block;
            transition: transform 0.5s ease;
            transform-origin: center; // Set rotation origin to center
        }
        .rotate {
            transform: rotate(${toggleMode ? '-90deg' : '180deg'});
        }
    `;

    return (
        <>
            <style>{css}</style>
            <Box
                sx={{
                    cursor: 'pointer',
                    transform: 'rotate(0deg)',
                    margin: '0 6px'
                }}
                onClick={() => setToggleMode(!toggleMode)}>
                {toggleMode ? <MdLightMode size={24} /> : <MdNightlight size={24} />}
            </Box>
        </>
    );
};

ToggleMode.propTypes = {
    toggleMode: PropTypes.bool.isRequired,
    setToggleMode: PropTypes.func.isRequired
};

export default ToggleMode;
