import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import LoadingButton from '@mui/lab/LoadingButton';



import { useQuery } from '@tanstack/react-query';
import NoteCards from './NoteCards';
import agent2 from 'api/agent2';
import socket from 'helpers/socket';

// ----------------------------------------------------------------------

export default function Notes() {
    const [notes, setNotes] = useState(null);

    // get notes
    const { data, isLoading, isSuccess, error, refetch } = useQuery({
        queryKey: ['notes'],
        queryFn: agent2.Notes.GetAll
    });

    useEffect(() => {
        if (isSuccess) {
            


        }
        else setNotes(null);
        
    }, [data, isSuccess, error]);

    

    return (
        <Container>
            {isLoading && <LoadingButton loading={isLoading} />}
            {notes && <NoteCards items={notes} refetch={refetch} />}
        </Container>
    );
}
