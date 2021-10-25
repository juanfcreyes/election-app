import { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("ws://report-socket-server.herokuapp.com");
const disconnectFunction = () => socket.disconnect();
const connectFunction = () => socket.connect();
const emitFunction = (event: string, value: any) => socket.emit(event, value);
const onFunction = (event: string, callback: any) => socket.on(event, callback);

export interface Socket {
  on: Function;
  emit: Function;
  disconnect: Function;
  connect: Function;
  connected: boolean
}

const initState = {
  connected: false,
  on: () => { },
  emit: () => { },
  disconnect: () => { },
  connect: () => { },
}


export const SocketContext = createContext<Socket>(initState);

export const SocketProvider = ({ children }: any) => {
  const [value, setValue] = useState<Socket>({
    connected: false,
    on: () => { },
    emit: () => { },
    disconnect: () => { },
    connect: () => { },
  });

  useEffect(() => {
    socket.on("connect", () => {
      const { connected } = socket;
      setValue((_) => ({
        connected,
        on: onFunction,
        emit: emitFunction,
        disconnect: disconnectFunction,
        connect: connectFunction,
      }));
    });
    socket.on("disconnect", () => {
      const { connected } = socket;
      setValue((_) => ({
        connected,
        disconnect: disconnectFunction,
        connect: connectFunction,
        on: () => { },
        emit: () => { },
      }));
    });
  }, []);

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
