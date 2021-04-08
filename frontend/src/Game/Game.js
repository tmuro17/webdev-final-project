import MapImage from './MapImage';
import Controls from './Controls';
import useChannel from '../utils/useChannel';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

function Game({session}) {

  let gameChannel = useChannel('game:global');
  const USER_LOCATION_MSG = 'user_location';
  const INCOMING_QUESTION_MSG = 'incoming_question';
  const GET_QUESTION_MSG = 'get_question';
  const NEW_GUESS_MSG = 'new_guess';
  const OUTCOME_MSG = 'outcome';


  const [coordinates, setCoordinates] = useState(null);
  const [round, setRound] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!gameChannel) return;

    gameChannel.on(INCOMING_QUESTION_MSG, response => handleIncomingQuestion(response));
    gameChannel.on(OUTCOME_MSG, response => handleOutcome(response));

    return () => {
      gameChannel.off(INCOMING_QUESTION_MSG, gameChannel);
      gameChannel.off(OUTCOME_MSG, gameChannel);
    }
  }, [gameChannel]);

  useEffect(() => {
    if (!gameChannel) return;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        console.log('userpos: ', pos)
        setCoordinates(pos.coords);
        gameChannel.push(USER_LOCATION_MSG,
          {
            user_id: session.user_id, 
            coordinates: {latitude: pos.coords.latitude, longitude: pos.coords.longitude}
          })
          .receive("ok", () => {
            console.log('successful location')
            getNewQuestion();
          });
      })
    }
  }, [gameChannel])

  const handleIncomingQuestion = (response) => {
    console.log('new round', response);
    setRound(response);
  }

  const getNewQuestion = () => {
    setResult(null);
    gameChannel.push(GET_QUESTION_MSG);
  }

  const handleGuess = (guess) => {
    gameChannel.push(NEW_GUESS_MSG, {guess: guess});
  }

  const handleOutcome = (response) => {
    console.log('outcome', response)
    setResult(response);
  }

  return (
    <div id="game">
      <div className="flex flex-row w-full mt-4">
        <div className="w-2/3">
          {round && <MapImage coordinates={round.map_coords}/>}
        </div>
        <div className="flex flex-col w-1/3 align-center text-center">
          {round && // only show if options are available
            <Controls options={round.options} handleGuess={handleGuess} getNewQuestion={getNewQuestion} result={result} />
          }
        </div>
      </div>
    </div>
  )
}

export default connect(({session}) => ({session}))(Game);