import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './auth';

let socket: Socket | null = null;

export function useSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const { user, accessToken } = useAuth();

  useEffect(() => {
    if (!user || !accessToken) return;

    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_WS_URL!, {
        auth: {
          token: accessToken,
        },
      });
    }

    socket.on('connect', () => {
      setIsConnected(true);
      socket?.emit('USER_CONNECTED', user);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, [user, accessToken]);

  return socket;
}