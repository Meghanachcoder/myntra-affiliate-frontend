import { useEffect, useRef, useState } from 'react';

export function useWebSocket(url: string) {

  const socketRef = useRef<WebSocket | null>(null);

  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    
    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      console.log('WebSocket connected');
    };

    socketRef.current.onmessage = (event) => {
      setMessages(event.data);
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      socketRef.current?.close();
    };
  }, [url]);

  const sendMessage = (msg: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    }
  };

  return { messages, sendMessage };
}
