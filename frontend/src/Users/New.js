import {Button, Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import pick from 'lodash/pick';

import {create_user, fetch_users} from '../api';

const UserNew = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    name: "", email: "", pass1: "", pass2: "",
  });

  const onSubmit = ev => {
    ev.preventDefault();
    console.log(ev);
    console.log(user);

    let data = pick(user, ['name', 'email', 'password']);
    create_user(data).then(() => {
      fetch_users();
      history.push("/users");
    });
  };

  const check_pass = (p1, p2) => {
    // This is for user experience only,
    // validation logic goes on the server.
    if (p1 !== p2) {
      return "Passwords don't match.";
    }

    if (p1.length < 12) {
      return "Password too short.";
    }

    return "";
  };

  const update = (field, ev) => {
    let u1 = Object.assign({}, user);
    u1[field] = ev.target.value;
    u1.password = u1.pass1;
    u1.pass_msg = check_pass(u1.pass1, u1.pass2);
    setUser(u1);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text"
                      onChange={
                        (ev) => update("name", ev)}
                      value={user.name}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="text"
                      onChange={
                        (ev) => update("email", ev)}
                      value={user.email}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"
                      onChange={
                        (ev) => update("pass1", ev)}
                      value={user.pass1}/>
        <p>{user.pass_msg}</p>
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password"
                      onChange={
                        (ev) => update("pass2", ev)}
                      value={user.pass2}/>
      </Form.Group>
      <Button variant="primary" type="submit"
              disabled={user.pass_msg !== ""}>
        Save
      </Button>
    </Form>
  );
};

const state2props = _state => ({});

export default connect(state2props)(UserNew);
