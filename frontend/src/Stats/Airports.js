import {useEffect, useState} from "react";
import {fetch_airports_easiest_25, fetch_airports_hardest_25} from "../api";
import {useHistory} from "react-router-dom";

const gotoAirport = (icao, history) => {
  history.push('/airport/' + icao)
}

const AirportTable = ({airports}) => {
  let history = useHistory();
  let airportRows = airports.map((airport) => {
    return (
      <tr className="border hover:bg-darkwhite hover:text-black cursor-pointer" onClick={e => gotoAirport(airport.icao, history)}>
        <td className="text-center ">{airport.airport_name}</td>
        <td className="text-center">{airport.icao}</td>
        <td className="text-center">{Math.round((airport.win_loss + Number.EPSILON) * 100) / 100}</td>
        <td className="text-center">{airport.total}</td>
      </tr>
    );
  });


  return (
    <table className="table-auto">
      <thead>
      <tr>
        <th className="w-1/2">Airport Name</th>
        <th className="w-1/6">ICAO</th>
        <th className="w-1/6">W/L %</th>
        <th className="w-1/6">Total Guesses</th>
      </tr>
      </thead>
      <tbody>
      {airportRows}
      </tbody>
    </table>
  );
};

const AirportsStats = () => {
  let history = useHistory();
  const [icaoInput, setIcaoInput] = useState("");
  const [easy25, setEasy25] = useState([]);
  const [hard25, setHard25] = useState([]);


  useEffect(() => {
    fetch_airports_easiest_25().then((airports) => setEasy25(airports));
  }, []);

  useEffect(() => {
    fetch_airports_hardest_25().then((airports) => setHard25(airports));
  }, []);

  const search = () => {
    history.push(`/airport/${icaoInput}`);
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Airport Stats:</h1>
      <br/>
      <div className="flex space-x-1">
        <input
          name="icaoSearch"
          id="icaoSearch"
          className="shadow appearance-none border rounded w-100 py-2 px-3 text-black"
          type="text"
          onChange={(ev) => setIcaoInput(ev.target.value)}
          value={icaoInput}
          placeholder="ICAO Code"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={search}
        >
          Search
        </button>
      </div>
      <br/>
      <h3>Click a row to view airport details.</h3>
      <br/>
      <div className="w-full flex flex-row">
        <div className="w-1/2">
          <h2 className="text-lg font-bold">25 Hardest:</h2>
          <AirportTable airports={hard25}/>
        </div>
        <div className="w-1/2">
          <h2 className="text-lg font-bold">25 Easiest:</h2>
          <AirportTable airports={easy25}/>
        </div>
      </div>
    </div>
  );
};

export default AirportsStats;
