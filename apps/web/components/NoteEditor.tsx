'use client';

import { useEffect } from 'react';
import { useSocket } from '@/lib/socket';
import { SocketEvents } from '@collaborative-notes/shared/src/types';

interface NoteEditorProps {
  noteId: string;
  content: string;
  onContentChange: (content: string) => void;
}

export function NoteEditor({ noteId, content, onContentChange }: NoteEditorProps) {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    // Join the note room when the component mounts
    socket.emit(SocketEvents.JOIN_NOTE, noteId);

    // Listen for content changes from other users
    socket.on(SocketEvents.NOTE_CONTENT_CHANGED, (newContent: string) => {
      onContentChange(newContent);
    });

    // Leave the note room when the component unmounts
    return () => {
      socket.emit(SocketEvents.LEAVE_NOTE);
      socket.off(SocketEvents.NOTE_CONTENT_CHANGED);
    };
  }, [socket, noteId, onContentChange]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    onContentChange(newContent);
    socket?.emit(SocketEvents.NOTE_CONTENT_CHANGED, newContent);
  };

  return (
    <div className="w-full h-full">
      <textarea
        value={content}
        onChange={handleContentChange}
        className="w-full h-[calc(100vh-200px)] p-4 bg-white rounded-lg shadow-sm border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        placeholder="Start typing your note..."
      />
    </div>
  );
}