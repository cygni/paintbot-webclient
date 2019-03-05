import React from 'react';
import { useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from 'react';

import Config from '../Config';

import { EventType } from './type';

const increment = (state: number, amount = 1) => state + amount;

interface WebSocketEvents {
  onOpen(): void;
  onMessage(data: any): void;
  onClose(code: number, reason: string, wasClean: boolean): void;
}

function useWebSocket(url: string, events: WebSocketEvents) {
  const wsRef = useRef<WebSocket | null>(null);
  const messageQueueRef = useRef<any[]>([]);
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
        const message = messageQueueRef.current.shift();
        ws.send(message);
      }
    }

    function handleMessage({ data }: WebSocketEventMap['message']) {
      eventsRef.current.onMessage(data);
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

  const send = useCallback((message: any) => {
    // Enqueue the message if the socket is connecting
    if (wsRef.current === null || wsRef.current.readyState === WebSocket.CONNECTING) {
      messageQueueRef.current.push(message);
    } else {
      wsRef.current.send(message);
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

interface GameEvent {
  type: EventType;
}

type GameState = ReadonlyArray<GameEvent>;

const initialState: GameState = [];

function eventReducer(state: GameState, event: GameEvent): GameState {
  return [...state, event];
}

export interface GameDirectorProps {
  id: string;
}

const readyStateMap = {
  [WebSocket.CONNECTING]: 'CONNECTING',
  [WebSocket.OPEN]: 'OPEN',
  [WebSocket.CLOSING]: 'CLOSING',
  [WebSocket.CLOSED]: 'CLOSED',
};

export default function GameDirector({ id }: GameDirectorProps) {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  const ws = useWebSocket(Config.WebSocketApiUrl, {
    onOpen() {
      console.log('WebSocket connection opened');
    },
    onMessage(data) {
      console.log('WebSocket message received', data);
      dispatch(JSON.parse(data));
    },
    onClose(code, reason, wasClean) {
      console.log('WebSocket connection closed', { code, reason, wasClean });
    },
  });

  return (
    <>
      <button onClick={ws.reconnect}>Reconnect</button>
      <pre>ReadyState: {readyStateMap[ws.readyState]}</pre>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
}
