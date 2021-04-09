import {useEffect, useState} from "react";
import Comments from './Comments';
import {fetch_airport_info} from "../api";

const AirportStats = ({icao}) => {
  const [airport, setAirport] = useState({});

  useEffect(() => {
    fetch_airport_info(icao).then((info) => setAirport(info));
  }, []);

  if (airport == null) {
    return <h1 className="font-bold text-xl-center">Requested Airport Could Not Be Found</h1>;
  } else {
    return (
      <div>
        <h1 className="text-xl font-bold">Airport Stats:</h1>
        <br/>
        <div className="flex flex-row">
          <div className="space-y-5 w-2/5">
            <div>
              <label className="block text-md font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                name="name"
                id="name"
                className="shadow appearance-none border rounded w-100 py-2 px-3 text-grey-darker"
                type="text"
                value={airport.name}
                readOnly
              />
            </div>
            <div>
              <label className="block text-md font-bold mb-2" htmlFor="icao">
                ICAO
              </label>
              <input
                name="ICAO"
                id="ICAO"
                className="shadow appearance-none border rounded w-100 py-2 px-3 text-grey-darker"
                type="text"
                value={airport.icao}
                readOnly/>
            </div>
            <div>
              <label className="block text-md font-bold mb-2" htmlFor="wl">
                Win/Loss Percentage
              </label>
              <input
                name="wl"
                id="wl"
                className="shadow appearance-none border rounded w-100 py-2 px-3 text-grey-darker"
                type="text"
                value={`${Math.round((airport.wl + Number.EPSILON) * 100) / 100}%`}
                readOnly/>
            </div>
            <div>
              <label className="block text-md font-bold mb-2" htmlFor="guesses">
                Num Guesses
              </label>
              <input
                name="guesses"
                id="guesses"
                className="shadow appearance-none border rounded w-100 py-2 px-3 text-grey-darker"
                type="text"
                value={airport.guesses}
                readOnly/>
            </div>
          </div>
          <div className="w-3/5">
            <Comments airport_id={airport.id} />
          </div>
        </div>
      </div>
    );
  }
};

export default AirportStats;
