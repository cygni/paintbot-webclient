import React from 'react';

const WebSocketContext = React.createContext((message: any) => {
  console.log('WEBSOCKETCONTEXT NOT SET YET');
});

export default WebSocketContext;
