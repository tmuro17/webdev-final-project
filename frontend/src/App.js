import {Route, Switch} from "react-router-dom";

import Nav from "./Nav";
import UserList from "./Users/List"; // do we need listing users?
import Register from "./Users/Register";
import Login from './Users/Login';


const App = () => {
  return (
    <div id="app" className="container mx-auto px-4 font-varela">
      <Nav/>
      <Switch>
        <Route path="/" exact>
          <div>home</div>
        </Route>
        <Route path="/play" exact>
          <div>play</div>
        </Route>
        <Route path="/login" exact>
          <Login/>
        </Route>
        <Route path="/register" exact>
          <Register/>
        </Route>
        <Route path="/users/list">
          <UserList/> 
          {/* // for debugging */}
        </Route>
      </Switch>
    </div>
  )
}

export default App;
