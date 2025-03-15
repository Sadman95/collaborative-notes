'use client';

import { useState } from 'react';
import { FileText, Plus } from 'lucide-react';
import { Note } from '@collaborative-notes/shared/src/types';
import { NoteEditor } from './NoteEditor';

export function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleCreateNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: 'Untitled Note',
      content: '',
      authorId: 'user-id', // This should come from auth context
      collaborators: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setNotes(prev => [...prev, newNote]);
    setSelectedNote(newNote);
  };

  const handleNoteContentChange = (content: string) => {
    if (!selectedNote) return;

    const updatedNote = {
      ...selectedNote,
      content,
      updatedAt: new Date()
    };

    setSelectedNote(updatedNote);
    setNotes(prev => prev.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    ));
  };

  return (
    <div className="flex h-full gap-6">
      <div className="w-64 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Notes</h2>
          <button
            onClick={handleCreateNote}
            className="p-2 transition-colors rounded-full hover:bg-gray-100"
            title="Create new note"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2">
          {notes.map(note => (
            <button
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`w-full flex items-center gap-2 p-2 rounded-lg transition-colors ${
                selectedNote?.id === note.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm truncate">{note.title}</span>
            </button>
          ))}
          {notes.length === 0 && (
            <p className="py-4 text-sm text-center text-gray-500">
              No notes yet. Create one to get started!
            </p>
          )}
        </div>
      </div>
      <div className="flex-1">
        {selectedNote ? (
          <NoteEditor
            noteId={selectedNote.id}
            content={selectedNote.content}
            onContentChange={handleNoteContentChange}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a note or create a new one to start editing
          </div>
        )}
      </div>
    </div>
  );
}