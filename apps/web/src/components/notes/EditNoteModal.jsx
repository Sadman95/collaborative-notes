import { Button, CircularProgress, TextField, TextareaAutosize, styled, useTheme } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import agent2 from 'api/agent2';
import CustomGlobalModal from 'components/custom/CustomGlobalModal';
import { ErrorMessage, Field, Formik } from 'formik';
import socket from 'helpers/socket';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import 'react-clock/dist/Clock.css';
import toast from 'react-hot-toast';
import { connect } from 'react-redux';
import 'react-time-picker/dist/TimePicker.css';
import { selectCurrentUser } from 'redux/selector';
import { createStructuredSelector } from 'reselect';
import * as Yup from 'yup';

const FormContainer = styled('form')(({ theme }) => ({
    display: 'grid',
    gap: theme.spacing(3),
    maxWidth: 400,
    margin: '0 auto'
}));

const MuiTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        backgroundColor: theme.palette.background.paper
    },
    '& .Mui-focused': {
        color: theme.palette.primary.main
    }
}));

/**
 * @summary Edit note modal
 * @typedef {Object} Payload
 * @property {boolean} open - Modal toggle state
 * @property {Function} setOpen - Modal state setter
 * @property {Function} refetch - Rfetching notes
 * @param {Payload}
 * @returns {import('react').ReactNode}
 */
function EditNoteModal({ open, setOpen, refetch, noteData, currentUser }) {
    const theme = useTheme();

    const handleClose = () => setOpen(false);

    const validationSchema = Yup.object().shape({
        title: Yup.string().min(3, 'Title is too short').optional(),
        content: Yup.string().min(10, 'Content is too short').optional()
    });

    // join all to note
    useEffect(() => {
        if (open) {
            socket.emit('join-note', noteData);
        }
        return () => {
            socket.off('join-note');
        };
    }, [open]);

    const { mutate, isPending } = useMutation({
        mutationFn: (data) => agent2.Notes.Update({ id: noteData._id, data }),
        onSuccess: (response) => {
            const { message } = response.data;
            toast.success(message, {
                position: 'top-right'
            });
            setOpen(false);
            refetch();
        },
        onError: (error) => {
            if (error.response.data.errorMessages.length > 0) {
                error.response.data.errorMessages.map(({ message }) =>
                    setTimeout(() => {
                        toast.error(message, { position: 'top-right' });
                    }, 500)
                );
            } else {
                toast.error(error.response.data.message, { position: 'top-right' });
            }
        }
    });

    const handleEditNote = async (values) => {
        mutate(values);
    };

    const handleEditing = () => {
        socket.emit('edit-note', { currentUser, noteData });
    };

    const css = `
    
    #timePicker{
     width: 100%;
     background-color: ${theme.palette.common.white};
     color: ${theme.palette.common.black};
     outline: none;
     border-radius: 3px

    }

    .react-time-picker__wrapper{
     border: 1px solid transparent;
     padding: 6px;
     font-size: 1rem
    }

    `;

    return (
        <>
            <style>{css}</style>
            <CustomGlobalModal open={open} handleClose={handleClose}>
                <Formik
                    initialValues={{
                        title: noteData.title,
                        content: noteData.content
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(data, { resetForm }) => {
                        handleEditNote(data);
                        resetForm();
                    }}
                >
                    {({ values, setFieldValue, handleSubmit }) => (
                        <FormContainer
                            sx={{
                                backgroundColor: 'lightgray',
                                padding: '24px',
                                borderRadius: '5px',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'flex-start',

                                scrollbarWidth: 'none',
                                '-ms-overflow-style': 'none',
                                maxHeight: '90vh',
                                '&::-webkit-scrollbar': {
                                    width: '0.2em'
                                }
                            }}
                            onSubmit={handleSubmit}
                            onChange={() => handleEditing()}
                        >
                            <Field
                                as={MuiTextField}
                                name="title"
                                id="title"
                                label="Note Title"
                                variant="outlined"
                                fullWidth
                                size="small"
                                error={!!ErrorMessage.title}
                                helperText={<ErrorMessage name="title" component="div" style={{ color: 'red' }} />}
                            />

                            <Field
                                as={TextareaAutosize}
                                name="content"
                                placeholder="Content"
                                minRows={5}
                                style={{
                                    border: '1px solid lightgray',
                                    borderRadius: '5px',
                                    padding: '5px',
                                    width: '100%',
                                    minHeight: '80px'
                                }}
                            />
                            <ErrorMessage name="content" component="div" style={{ color: 'red' }} />

                            <Button fullWidth variant="contained" color="secondary" type="submit" disabled={isPending}>
                                {isPending ? <CircularProgress /> : 'Update'}
                            </Button>
                        </FormContainer>
                    )}
                </Formik>
            </CustomGlobalModal>
        </>
    );
}

EditNoteModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    refetch: PropTypes.func,
    noteData: PropTypes.object,
    currentUser: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});
export default connect(mapStateToProps, null)(EditNoteModal);
