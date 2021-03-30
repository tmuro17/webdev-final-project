import {Alert, Button, Nav, Form, Row, Col} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {useState} from "react";
import {api_login} from "./api";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const on_submit = ev => {
    ev.preventDefault();
    api_login(email, pass);
  };

  return (
    <Form onSubmit={on_submit} inline>
      <Form.Control name="email"
                    type="text"
                    placeholder="Email"
                    onChange={(ev) => setEmail(ev.target.value)}
                    value={email}/>
      <Form.Control name="password"
                    type="password"
                    placeholder="Password"
                    onChange={(ev) => setPass(ev.target.value)}
                    value={pass}/>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

let SessionInfo = connect()(({session, dispatch}) => {
  const logout = () => {
    dispatch({type: 'session/clear'});
  };
  return (
    <p>
      Logged in as {session.email} &nbsp;
      <Button onClick={logout}>Logout</Button>
    </p>
  );
});

const Link = ({to, children}) => {
  return (
    <Nav.Item>
      <NavLink to={to} exact className="nav-link" activeClassName="active">
        {children}
      </NavLink>
    </Nav.Item>
  );
};

const LoginHeader = ({session}) => {
  console.log(session)
  if (session) {
    return <SessionInfo session={session}/>;
  } else {
    return <LoginForm/>;
  }
};

const LoginHeaderBar = connect(({session}) => ({session}))(LoginHeader);

const AppNav = ({error}) => {
  let error_row = null;

  if (error) {
    error_row = (
      <Row>
        <Col>
          <Alert variant="danger">{error}</Alert>
        </Col>
      </Row>
    );
  }

  return (
    <div>
      <Row>
        <Col>
          <Nav variant="pills">
            <Link to="/">Users</Link>
          </Nav>
        </Col>
        <Col>
          <LoginHeaderBar/>
        </Col>
      </Row>
      {error_row}
    </div>
  );
};

export default connect(({error}) => ({error}))(AppNav);
