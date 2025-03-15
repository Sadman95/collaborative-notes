'use client';

import { useEffect, useState } from 'react';
import { User } from '@collaborative-notes/shared/src/types';
import { useSocket } from '@/lib/socket';
import { UserCircle } from 'lucide-react';

interface ActiveUser extends User {
  noteId: string | null;
}

export function Presence() {
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleUserJoined = (userOrUsers: ActiveUser | ActiveUser[]) => {
      setActiveUsers((prev) => {
        if (Array.isArray(userOrUsers)) {
          return userOrUsers;
        }
        const exists = prev.find((u) => u.id === userOrUsers.id);
        if (exists) {
          return prev.map((u) => (u.id === userOrUsers.id ? userOrUsers : u));
        }
        return [...prev, userOrUsers];
      });
    };

    const handleUserLeft = (userId: string) => {
      setActiveUsers((prev) => prev.filter((u) => u.id !== userId));
    };

    socket.on('USER_JOINED', handleUserJoined);
    socket.on('USER_LEFT', handleUserLeft);

    return () => {
      socket.off('USER_JOINED', handleUserJoined);
      socket.off('USER_LEFT', handleUserLeft);
    };
  }, [socket]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4">Active Users</h2>
      <div className="space-y-3">
        {activeUsers.map((user) => (
          <div key={user.id} className="flex items-center gap-2">
            <UserCircle className="w-6 h-6 text-gray-600" />
            <div>
              <p className="font-medium">{user.name}</p>
              {user.noteId && (
                <p className="text-sm text-gray-500">
                  Editing note: {user.noteId}
                </p>
              )}
            </div>
          </div>
        ))}
        {activeUsers.length === 0 && (
          <p className="text-gray-500">No active users</p>
        )}
      </div>
    </div>
  );
}