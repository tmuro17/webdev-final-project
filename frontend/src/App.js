import {Route, Switch} from "react-router-dom";

import "./App.scss";
import {Container} from "react-bootstrap";
import Nav from "./Nav";
import UserList from "./Users/List";
import UserNew from "./Users/New";


const App = () => {
  return (
    <Container>
      <Nav/>
      <Switch>
        <Route path="/" exact>
          <UserList/>
        </Route>
        <Route path="/users/new" exact>
          <UserNew/>
        </Route>
      </Switch>
    </Container>
  )
}

export default App;
