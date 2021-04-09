import {useEffect, useState} from "react";
import {fetch_top_100_users} from "../api";

const LeaderTable = ({users}) => {
  let userRows = users.map((user, index) => {
    return (
      <tr className="border">
        <td className="text-center">{index + 1}</td>
        <td className="text-center">{user.name}</td>
        <td className="text-center">{Math.round((user.win_loss + Number.EPSILON) * 100) / 100}</td>
      </tr>
    );
  });


  return (
    <table className="2xl:table-fixed">
      <thead>
      <tr>
        <th className="2xl:w-1/3">Rank</th>
        <th className="2xl:w-1/3">Name</th>
        <th className="2xl:w-1/3">W/L %</th>
      </tr>
      </thead>
      <tbody>
      {userRows}
      </tbody>
    </table>
  );
};

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch_top_100_users().then((usrs) => setUsers(usrs));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold">Top 100 W/L%:</h1>
      <br/>
      <LeaderTable users={users}/>
    </div>
  );
};

export default Leaderboard;
