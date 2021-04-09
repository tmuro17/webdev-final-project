import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Nav from "./Nav";
import UserList from "./Users/List"; // do we need listing users?
import Register from "./Users/Register";
import Login from './Users/Login';
import Game from './Game/Game';
import { PhoenixSocketProvider } from './utils/PhoenixSocketContext'
import Profile from "./Stats/Profile";
import AirportsStats from "./Stats/Airports";
import AirportStats from "./Stats/Airport";
import Leaderboard from "./Stats/Leaderboard";
import AnnouncementWidget from './Game/AnnouncementWidget';
import EditUser from "./Users/Edit";
import HomePage from "./HomePage";


const App = () => {
  return (
    <div id="app" className="bg-backblack h-screen text-white">
      <div className="container mx-auto px-4">
        <Nav/>
      <Switch>
        <Route path="/" exact>
          <HomePage/>
        </Route>
        {/* private route means you need to be logged in */}
        <PrivateRoute path="/play/regional" exact>
          <PhoenixSocketProvider>
            <Game regional={true} />
          </PhoenixSocketProvider>
        </PrivateRoute>
        <PrivateRoute path="/play" exact>
          <PhoenixSocketProvider>
            <Game regional={false}/>
          </PhoenixSocketProvider>
        </PrivateRoute>
        <Route path="/login" exact>
          <Login/>
        </Route>
        <Route path="/register" exact>
          <Register/>
        </Route>
        <PrivateRoute path="/profile" exact>
          <Profile/>
        </PrivateRoute>
        <Route path="/airports" exact>
          <AirportsStats/>
        </Route>
        <Route path="/airport/:icao" exact render={(props) => {
          let icao = props.match.params.icao;
          return <AirportStats icao={icao}/>;
        }}/>
        <Route path="/leaderboard" exact>
          <Leaderboard/>
        </Route>
        <Route path="/users/list">
          <UserList/> 
          {/* // for debugging */}
        </Route>
        <PrivateRoute path="/edit_user" exact>
          <EditUser/>
        </PrivateRoute>
      </Switch>
      </div>
      <PhoenixSocketProvider>
        <AnnouncementWidget/>
      </PhoenixSocketProvider>
    </div>
  )
}

export default App;
