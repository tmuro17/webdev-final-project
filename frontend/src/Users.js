import { Row, Col, Form, Button } from 'react-bootstrap';
import capitalize from 'lodash/capitalize';
import { connect } from "react-redux";

const Field = ({user, setUser, field}) => {
  const update = ev => {
    let tmp = Object.assign({}, user);
    tmp[field] = ev.target.value;
    setUser(tmp);
  };

  return (
    <Form.Group>
      <Form.Label>{capitalize(field)}</Form.Label>
      <Form.Control type="text" onChange={update} value={user[field] || ""}/>
    </Form.Group>
  );
};

const UserForm = ({user, setUser}) => {
  const onSubmit = ev => {
    ev.preventDefault();
  };

  return (
    <Form onSubmit={onSubmit}>
      <Field user={user} setUser={setUser} field="name"/>
      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
};

const Users = ({users, user_form, dispatch}) => {
  const setUser = user => {
    dispatch({type: 'user_form/set', data: user});
  };

  let rows = users.map((user) => (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>
        <Button variant="secondary" onClick={() => setUser(user)}>
          Edit
        </Button>
      </td>
    </tr>
  ));

  return (
    <div>
      <Row>
        <Col>
          <h2>Users:</h2>
          <p>
            <Button variant="secondary"
                    onClick={() => setUser({})}>
              New User
            </Button>
          </p>
          <table className="table table-striped">
            <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
          </table>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Edit User</h2>
          <UserForm user={user_form} setUser={setUser}/>
        </Col>
      </Row>
    </div>
  );
};

export default connect(({users, user_form}) => ({users, user_form}))(Users);
