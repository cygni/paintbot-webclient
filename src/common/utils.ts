import { useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from 'react';

const increment = (state: number, amount = 1) => state + amount;

export interface WebSocketEvents<T> {
  onOpen(): void;
  onMessage(message: T): void;
  onClose(code: number, reason: string, wasClean: boolean): void;
}

export function useWebSocket<T>(url: string, events: WebSocketEvents<T>) {
  const wsRef = useRef<WebSocket | null>(null);
  const messageQueueRef = useRef<string[]>([]);
  const [counter, incrementCounter] = useReducer(increment, 0);
  const [readyState, setReadyState] = useState(WebSocket.CONNECTING);

  // Allow changing the callbacks without restarting the socket
  // https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
  const eventsRef = useRef(events);
  useLayoutEffect(() => {
    eventsRef.current = events;
  });

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    setReadyState(ws.readyState);

    function handleOpen(event: WebSocketEventMap['open']) {
      setReadyState(ws.readyState);
      eventsRef.current.onOpen();

      // Dispatch queued messages
      while (messageQueueRef.current.length !== 0) {
        const message = messageQueueRef.current.shift()!;
        ws.send(message);
      }
    }

    function handleMessage({ data }: WebSocketEventMap['message']) {
      const message = JSON.parse(data);
      eventsRef.current.onMessage(message);
    }

    function handleError(event: WebSocketEventMap['error']) {
      setReadyState(ws.readyState);
    }

    function handleClose({ code, reason, wasClean }: WebSocketEventMap['close']) {
      setReadyState(ws.readyState);
      eventsRef.current.onClose(code, reason, wasClean);
    }

    ws.addEventListener('open', handleOpen);
    ws.addEventListener('message', handleMessage);
    ws.addEventListener('error', handleError);
    ws.addEventListener('close', handleClose);

    return () => {
      ws.removeEventListener('open', handleOpen);
      ws.removeEventListener('message', handleMessage);
      ws.removeEventListener('error', handleError);
      ws.removeEventListener('close', handleClose);

      if (ws.readyState !== WebSocket.CLOSING && ws.readyState !== WebSocket.CLOSED) {
        ws.close();
      }
    };
  }, [url, counter]);

  const send = useCallback((message: T) => {
    const serializedMessage = JSON.stringify(message);
    // Enqueue the message if the socket is connecting
    if (wsRef.current === null || wsRef.current.readyState === WebSocket.CONNECTING) {
      messageQueueRef.current.push(serializedMessage);
    } else {
      wsRef.current.send(serializedMessage);
    }
  }, []);

  const close = useCallback(() => {
    if (
      wsRef.current !== null &&
      wsRef.current.readyState !== WebSocket.CLOSING &&
      wsRef.current.readyState !== WebSocket.CLOSED
    ) {
      wsRef.current.close();
    }
  }, []);

  const reconnect = useCallback(() => {
    incrementCounter(1);
  }, []);

  return useMemo(() => ({ readyState, send, close, reconnect }), [readyState, send, close, reconnect]);
}
