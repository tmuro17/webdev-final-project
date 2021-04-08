import { useEffect, useState } from 'react';
import {connect} from "react-redux";
import useChannel from '../utils/useChannel';

function AnnouncementWidget({session}) {
  
  let gameChannel = useChannel('game:announcements');
  const GUESS_MSG = 'guess_announcement';


  useEffect(() => {
    if (!gameChannel) return;

    gameChannel.on(GUESS_MSG, response => handleAnnouncement(response));

    return () => {
      gameChannel.off(GUESS_MSG, gameChannel);
    }
  }, [gameChannel]);

  const [announcements, setAnnouncements] = useState([]);

  const handleAnnouncement = (response) => {
    setAnnouncements(announcements => [...announcements, response]);
  }

  const outcomeMessage = (info) => {
    if (info.correct) {
      return ` guessed ${info.actual} correctly!`
    } else {
      return ` guessed ${info.actual} incorrectly :(`
    }
  }

  const generateMessage = (info, index) => {
    // this is here for easy debugging in case you dont want to login to two users to see announcements while playing
    if (true) {
    // if (session.username != info.username) {
      console.log('no match')
      return (
        <div className="my-1 p-2 border border-orange bg-darkwhite rounded" key={index}>
          <span>{info.correct ? "✔️" : "❌"}</span>
          <span className="font-bold pl-1">
            {info.username} 
          </span>
          <span>
            {outcomeMessage(info)}
          </span>
        </div>
      )
    } else {
      return null;
    }
  }

  const messages = announcements.reverse().map(generateMessage);

  if (session && announcements.length > 0) {
    return (
      <div className="fixed right-32 bottom-1/5 border-orange border-4 bg-lightgray p-2 rounded h-1/5 w-1/5 shadow-xl text-xs">
        <div className="font-bold">Live</div>
        <div className="flex flex-col overflow-auto h-4/5">
          {messages}
        </div>
      </div>
    )
  } else {
    return null;
  }

  
}

export default connect(({session}) => ({session}))(AnnouncementWidget);