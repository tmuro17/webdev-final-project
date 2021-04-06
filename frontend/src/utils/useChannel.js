import { useState, useContext, useEffect } from 'react';
import { PhoenixSocketContext } from './PhoenixSocketContext';

const useChannel = channelName => {
  const [channel, setChannel] = useState();
  const { socket } = useContext(PhoenixSocketContext);

  useEffect(() => {
    const gameChannel = socket.channel(channelName);

    gameChannel.join().receive('ok', () => {
      console.log('joined!')
      setChannel(gameChannel);
    });

    return () => {
      gameChannel.leave();
    };
  }, []);
  
  return channel;
};

export default useChannel;