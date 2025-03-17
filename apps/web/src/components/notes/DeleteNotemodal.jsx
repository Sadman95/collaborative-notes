import { Box, Button, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { useMutation } from '@tanstack/react-query';
import agent2 from 'api/agent2';
import CustomGlobalModal from 'components/custom/CustomGlobalModal';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { MdCancel, MdDelete } from 'react-icons/md';
import { GradientCircularProgress } from 'ui-component/progess/GradientCircularProgress';

/**
 * @summary Delete note modal
 * @typedef {Object} Payload
 * @property {boolean} open - Modal toggle state
 * @property {Function} setOpen - Modal state setter
 * @property {string} noteId - Campaign ID
 * @param {Payload}
 * @returns {import('react').ReactNode}
 */
export default function DeleteNotemodal({ open, setOpen, noteId, refetch }) {
    const theme = useTheme();

    const handleClose = () => setOpen(false);

    const { mutate, isLoading } = useMutation({
        mutationFn: (id) => agent2.Notes.Delete(id),
        onSuccess: (response) => {
            const { message } = response.data;
            toast.success(message, { position: 'top-right' });
            setOpen(false);
            refetch();
        },
        onError: (error) => {
            if (error.response.data.errorMessages.length > 0) {
                error.response.data.errorMessages.map(({ msg }) =>
                    setTimeout(() => {
                        toast.error(msg, { position: 'top-right' });
                    }, 500)
                );
            } else {
                toast.error(error.response.data.message, { position: 'top-right' });
            }
        }
    });

    const handleDelete = (id) => {
        mutate(id);
    };

    return (
        <>
            <CustomGlobalModal open={open} handleClose={handleClose}>
                <Box
                    sx={{
                        backgroundColor: theme.palette.background.default,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '50%',
                        flexDirection: 'column',
                        padding: 6,
                        borderRadius: 6
                    }}
                >
                    <>
                        {isLoading ? (
                            <GradientCircularProgress />
                        ) : (
                            <>
                                <Typography my={2} variant="h4">
                                    Are you sure about deleting the note?
                                </Typography>
                                <Stack direction="row" spacing={2}>
                                    <Button
                                        onClick={() => handleDelete(noteId)}
                                        color="error"
                                        variant="outlined"
                                        startIcon={<MdDelete />}
                                    >
                                        Delete
                                    </Button>
                                    <Button onClick={handleClose} color="primary" variant="contained" endIcon={<MdCancel />}>
                                        Cancel
                                    </Button>
                                </Stack>
                            </>
                        )}
                    </>
                </Box>
            </CustomGlobalModal>
        </>
    );
}

DeleteNotemodal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    refetch: PropTypes.func,
    noteId: PropTypes.string
};
