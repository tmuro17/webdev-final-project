import {Col, Row, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const UserList = ({users}) => {
  let rows = users.map((user) => (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
    </tr>
  ));

  return (
    <div>
      <Row>
        <Col>
          <h2>List Users</h2>
          <p>
            <Link to="/users/new">
              New User
            </Link>
          </p>
          <Table className="table table-striped">
            <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );

};

const state2props = ({users, user_form}) => ({users, user_form});

export default connect(state2props)(UserList);
