export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  authorId: string;
  collaborators: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface TokenPayload {
  userId: string;
  email: string;
}

export enum SocketEvents {
  JOIN_NOTE = 'JOIN_NOTE',
  LEAVE_NOTE = 'LEAVE_NOTE',
  NOTE_UPDATED = 'NOTE_UPDATED',
  NOTE_CONTENT_CHANGED = 'NOTE_CONTENT_CHANGED',
  USER_JOINED = 'USER_JOINED',
  USER_LEFT = 'USER_LEFT'
}