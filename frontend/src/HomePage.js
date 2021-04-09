import {useHistory} from "react-router-dom";

const HomePage = () => {
  let history = useHistory();
  return (
    <div>
      <h1 className="font-bold">Welcome to Short Final!</h1>
      <br/>
      <p>
        Short Final is a game for aviation enthusiasts who are just looking to have some fun, as well as GA pilots who
        want to get more familiar with their regional airports.
      </p>
      <br/>
      <p>
        Short Final puts you in a satellite view above an airport, and presents you with four possible ICAO codes, one
        of which represents the airport that you are looking at. You must then select which of the ICAO codes is for the
        airport that you are looking at.
      </p>
      <br/>
      <p>
        In the original variant of the game, the airports that you are shown are chosen for you based off of your
        location, in fact, any US based airport within 500 km of your location is fair play.
      </p>
      <button
        className="bg-orange text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={(_) => history.push("/play/regional")}
      >
        Play Original Mode
      </button>
      <br/>
      <br/>
      <p>
        In the challenge mode variant of the game, you will be challenged to identify the 25 most difficult to identify
        airports, as determined by their global win loss ratio.
      </p>
        <button
          className="bg-orange text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={(_) => history.push("/play")}
        >
          Play Challenge Mode
        </button>
    </div>
  );
};


export default HomePage;
