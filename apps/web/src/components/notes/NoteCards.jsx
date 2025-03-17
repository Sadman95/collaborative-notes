import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import NoteCard from './note-card';
import CreateNoteModal from './CreateNoteModal';
import { Box, Button } from '@mui/material';
import DeleteNotemodal from './DeleteNotemodal';
import EditNoteModal from './EditNoteModal';

const NoteCards = ({ items, refetch }) => {

     const modalInitialState = {
         deleteNoteModal: false,
         editNoteModal: false,
         createNoteModal: false
    };
    
    const [modals, setModals] = useState(modalInitialState);

     const handleModalOpen = (key, value) =>
         setModals({
             ...modals,
             [key]: value
         });

    return (
        <>
            <Button variant="contained" color="primary" onClick={() => handleModalOpen('createNoteModal', true)}>
                Create Note
            </Button>

            <CreateNoteModal
                open={modals.createNoteModal}
                setOpen={(value) => handleModalOpen('createNoteModal', value)}
                refetch={refetch}
            />
            <Stack spacing={2} sx={{ mt: 2 }}>
                {items.map((item) => (
                    <Box key={item._id}>
                        <DeleteNotemodal
                            open={modals.deleteNoteModal}
                            setOpen={(value) => handleModalOpen('deleteNoteModal', value)}
                            noteId={item._id}
                            refetch={refetch}
                        />
                        <EditNoteModal
                            open={modals.editNoteModal}
                            setOpen={(value) => handleModalOpen('editNoteModal', value)}
                            noteData={item}
                            refetch={refetch}
                        />
                        <NoteCard
                            {...item}
                            openDleteModal={modals.deleteNoteModal}
                            onDelete={() => handleModalOpen('deleteNoteModal', true)}
                            onEdit={() => handleModalOpen('editNoteModal', true)}
                        />
                    </Box>
                ))}
            </Stack>
        </>
    );
}

NoteCards.propTypes = {
    items: PropTypes.array.isRequired,
    refetch: PropTypes.func.isRequired
};

export default NoteCards;
