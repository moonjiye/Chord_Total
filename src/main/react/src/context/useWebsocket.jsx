import { useEffect, useRef, useState } from "react";

const useWebSocket = (url, email) => {
  const ws = useRef(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    ws.current = new WebSocket(`${url}?email=${encodeURIComponent(email)}`);
    ws.current.onopen = () => {
      console.log("connected to " + url);
    };
    ws.current.onmessage = (evt) => {
      const message = JSON.parse(evt.data);
      console.log(message.message);
      setMessage(message.message);
    };
    return () => {
      ws.current.close();
    };
  }, [url, email]);

  const sendMessage = (message) => {
    if (ws.current) {
      ws.current.send(JSON.stringify(message));
    }
  };

  return { message, sendMessage };
};

export default useWebSocket;
