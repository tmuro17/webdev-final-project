import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {fetch_user, fetch_user_airport_win_losses, fetch_user_total_guesses, fetch_user_win_loss} from "../api";
import StatsMap from './StatsMap';
import {useHistory} from "react-router-dom";

const AirportWinLosses = ({details}) => {
  let detailRows = details.map((detail, index) => {
    console.log(detail);
    return (
      <tr key={index}>
        <td className="text-center">{detail.airport_name}</td>
        <td className="text-center">{detail.icao}</td>
        <td className="text-center">{Math.round((detail.wl_ratio + Number.EPSILON) * 100) / 100}</td>
      </tr>
    );
  });


  return (
    <table className="table-auto">
      <thead>
      <tr>
        <th className="w-1/2">Airport Name</th>
        <th className="w-1/4">ICAO</th>
        <th className="w-1/4">W/L %</th>
      </tr>
      </thead>
      <tbody>
      {detailRows}
      </tbody>
    </table>
  );
};

const Profile = ({session}) => {
  let user_id = session["user_id"];
  let history = useHistory();
  const [user, setUser] = useState({});
  const [airportWinLosses, setAirportWinLosses] = useState([]);
  const [globalWinLoss, setGlobalWinLoss] = useState({});
  const [totalGuesses, setTotalGuesses] = useState({});

  useEffect(() => {
    fetch_user(user_id).then((u) => setUser(u));
  }, [user_id]);

  useEffect(() => {
    fetch_user_airport_win_losses(user_id).then((wls) => setAirportWinLosses(wls));
  }, [user_id]);

  useEffect(() => {
    fetch_user_win_loss(user_id).then((wl) => setGlobalWinLoss(wl));
  }, [user_id]);

  useEffect(() => {
    fetch_user_total_guesses(user_id).then((num_guesses) => setTotalGuesses(num_guesses));
  }, [user_id]);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-1/3">
        <h1 className="text-xl font-bold">Profile:</h1>
        <br/>
        <div className="space-y-5">
          <div>
            <label className="block text-md font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              name="name"
              id="name"
              className="shadow appearance-none border rounded w-100 py-2 px-3 text-grey-darker"
              type="text"
              value={user.name}
              readOnly
            />
          </div>
          <div>
            <label className="block text-md font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              id="email"
              className="shadow appearance-none border rounded w-100 py-2 px-3 text-grey-darker"
              type="email"
              value={user.email}
              readOnly/>
          </div>
          <div>
            <button onClick={(_) => history.push("/edit_user")}
                    className="bg-orange text-white font-bold py-2 px-4 rounded"
                    type="button">
              Edit User
            </button>
          </div>

        </div>
        <br/>
        <br/>
        <h2 className="text-lg font-bold">Stats:</h2>
        <br/>
        <div className="space-y-5">
          <div>
            <label className="block text-md font-bold mb-2" htmlFor="globalWinLoss">
              Win/Loss Percentage
            </label>
            <input
              name="globalWinLoss"
              id="globalWinLoss"
              className="shadow appearance-none border rounded w-100 py-2 px-3 text-grey-darker"
              type="text"
              value={`${Math.round((globalWinLoss.win_loss + Number.EPSILON) * 100) / 100}%`}
              readOnly/>
          </div>
          <div>
            <label className="block text-md font-bold mb-2" htmlFor="totalGuesses">
              Total Guesses
            </label>
            <input
              name="totalGuesses"
              id="totalGuesses"
              className="shadow appearance-none border rounded w-100 py-2 px-3 text-grey-darker"
              type="text"
              value={totalGuesses.total_guesses}
              readOnly/>
          </div>
        </div>
        <br/>
        <h3 className="text-md font-bold">Airport Win/Loss Details:</h3>
        <br/>
        <AirportWinLosses details={airportWinLosses}/>
      </div>
      <div className="w-2/3 p-4 text-center">
        Your Map
        <StatsMap airports={airportWinLosses} />
      </div>
    </div>
  );
};

export default connect(({session}) => ({session}))(Profile);
