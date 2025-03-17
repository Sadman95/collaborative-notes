import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { MdDelete, MdEdit } from 'react-icons/md';
import { on } from 'events';
import { Button } from '@mui/material';
import socket from 'helpers/socket';

const NoteCard = ({ _id, title, content, author, createdAt, updatedAt, onEdit, onDelete }) => {

    useEffect(() => {
        socket.on('editing-note', (message) => {
            console.log(message);
        });
        return () => {
            sokcet.off('editing-note');
        }
    }, [])

    return (
        <Card>
            <CardHeader
                title={
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant="h6">{title}</Typography>
                        </Box>
                        <Box>
                            <Button color="primary" onClick={() => onEdit()}>
                                <MdEdit className="text-black-300" />
                            </Button>
                            <Button color="error" onClick={() => onDelete()}>
                                <MdDelete />
                            </Button>
                        </Box>
                    </Box>
                }
                subheader={`added by ${author.name}`}
            />

            <CardContent>
                {/* Branch Information */}
                <Box display="flex" alignItems="center">
                    <Typography variant="body2">{content}</Typography>
                    {/* Add a similar box for the base branch if you'd like */}
                </Box>

                <Grid container spacing={3} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body2">Created: {formatDistanceToNow(new Date(createdAt), { addSuffix: true })} </Typography>
                        <Typography variant="body2">Updated: {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })} </Typography>
                        {/* ... Add closed, merged, etc. if needed */}
                    </Grid>
                    {/* Grid items for Avatar grid  and Hyperlink Grid */}
                </Grid>
            </CardContent>
        </Card>
    );
}

NoteCard.propTypes = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.object.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
};

export default NoteCard;
