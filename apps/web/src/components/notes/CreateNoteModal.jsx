import { Alert, Box, Button, CircularProgress, FormLabel, TextField, TextareaAutosize, Typography, styled, useTheme } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import agent2 from 'api/agent2';
import CustomDatePicker from 'components/custom/CustomDatePicker';
import CustomGlobalModal from 'components/custom/CustomGlobalModal';
import CustomSelect from 'components/custom/CustomSelect';
import dayjs from 'dayjs';
import { ErrorMessage, Field, Formik } from 'formik';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import 'react-clock/dist/Clock.css';
import toast from 'react-hot-toast';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import TimezoneSelect from 'react-timezone-select';
import hasDuplicate from 'utils/has-duplicate';
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
 * @summary Create campaign modal
 * @typedef {Object} Payload
 * @property {boolean} open - Modal toggle state
 * @property {Function} setOpen - Modal state setter
 * @property {Function} refetch - Rfetching campaigns
 * @param {Payload}
 * @returns {import('react').ReactNode}
 */
export default function CreateNoteModal({ open, setOpen, refetch }) {
    const theme = useTheme();

    const handleClose = () => setOpen(false);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        content: Yup.string().required('Content is required'),
    });

    

    const { mutate, isLoading: cLoading } = useMutation({
        mutationFn: (data) => agent2.Notes.Create(data),
        onSuccess: (response) => {
            const { message } = response.data;
            toast.success(message, {
                position: 'top-right'
            });
            setOpen(false);
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
        },
        onSettled: () => {
            refetch();
        }
    });

    const handleCreateNote = async (values) => {
        mutate(values);
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
                        title: '',
                        content: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(data, { resetForm }) => {
                        handleCreateNote(data);
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

                            <Button fullWidth variant="contained" color="secondary" type="submit" disabled={cLoading}>
                                {cLoading ? <CircularProgress /> : 'Create'}
                            </Button>
                        </FormContainer>
                    )}
                </Formik>
            </CustomGlobalModal>
        </>
    );
}

CreateNoteModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    refetch: PropTypes.func
};
