import { useState } from 'react';

export function useWebSocket(url: string) {
  const [state, setState] = useState({ url });
  console.log(state);
  if (url !== url) {
    setState({ url });
  }
}
