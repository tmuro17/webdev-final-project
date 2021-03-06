import MapImage from './MapImage';
import Controls from './Controls';
import useChannel from '../utils/useChannel';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

function Game({session, regional}) {

  let gameChannel = useChannel('game:global');
  const USER_LOCATION_MSG = 'user_location';
  const INCOMING_QUESTION_MSG = 'incoming_question';
  const GET_QUESTION_MSG = 'get_question';
  const NEW_GUESS_MSG = 'new_guess';
  const OUTCOME_MSG = 'outcome';
  const GAME_OVER_MSG = 'game_over';
  const NEW_GAME_MSG = 'new_game';


  const [coordinates, setCoordinates] = useState(null);
  const [round, setRound] = useState(null);
  const [result, setResult] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!gameChannel) return;

    gameChannel.on(INCOMING_QUESTION_MSG, response => handleIncomingQuestion(response));
    gameChannel.on(OUTCOME_MSG, response => handleOutcome(response));
    gameChannel.on(GAME_OVER_MSG, response => handleGameOver(response));

    return () => {
      gameChannel.off(INCOMING_QUESTION_MSG, gameChannel);
      gameChannel.off(OUTCOME_MSG, gameChannel);
      gameChannel.off(GAME_OVER_MSG, gameChannel);
    }
  }, [gameChannel]);

  useEffect(() => {
    if (!gameChannel) return;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        setCoordinates(pos.coords);
        gameChannel.push(USER_LOCATION_MSG,
          {
            user_id: session.user_id, 
            coordinates: {latitude: pos.coords.latitude, longitude: pos.coords.longitude},
            regional: regional
          })
          .receive("ok", () => {
            getNewQuestion();
          });
      })
    }
  }, [gameChannel])

  const handleIncomingQuestion = (response) => {
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
    setResult(response);
  }

  const handleGameOver = (response) => {
    setResult(null);
    setRound(null);
    setGameOver(true);
  }

  const startNextGame = () => {
    gameChannel.push(NEW_GAME_MSG, null)
      .receive("ok", () => {
        setGameOver(false);
        getNewQuestion();
      });
  }

  return (
    <div id="game">
      {gameOver ?
        <div className="text-center flex flex-col">
          <h1 className="font-bold">Game over!</h1>
          <h3>Check your profile to see updated stats.</h3>
          <button onClick={startNextGame} className="mt-4 bg-orange rounded p-4 w-1/3 mx-auto">Start New Game</button>
        </div> :
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
      }
      
    </div>
  )
}

export default connect(({session}) => ({session}))(Game);