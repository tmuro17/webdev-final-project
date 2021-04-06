import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Socket } from 'phoenix';

const PhoenixSocketContext = createContext({ socket: null });

const PhoenixSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const socket = new Socket('ws://localhost:4000/socket');
    socket.connect();
    setSocket(socket);
  }, []);

  if (!socket) return null;

  return (
    <PhoenixSocketContext.Provider value={{ socket }}>{children}</PhoenixSocketContext.Provider>
  );
};

PhoenixSocketProvider.propTypes = {
  children: PropTypes.node,
};

export { PhoenixSocketContext, PhoenixSocketProvider };