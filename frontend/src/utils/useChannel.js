// this workflow was used from
// https://medium.com/software-fast-radius/wiring-up-phoenix-channels-with-react-hooks-921aac29f0ff
// as a way to better componentize the socket for wrapping various react components

import { useState, useContext, useEffect } from 'react';
import { PhoenixSocketContext } from './PhoenixSocketContext';

const useChannel = channelName => {
  const [channel, setChannel] = useState();
  const { socket } = useContext(PhoenixSocketContext);

  useEffect(() => {
    const gameChannel = socket.channel(channelName);

    gameChannel.join().receive('ok', () => {
      setChannel(gameChannel);
    });

    return () => {
      gameChannel.leave();
    };
  }, []);
  
  return channel;
};

export default useChannel;