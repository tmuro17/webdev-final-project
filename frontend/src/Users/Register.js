import { connect } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import pick from 'lodash/pick';

import { create_user, fetch_users } from '../api';

const ErrorMessage = ({msg}) => {
  if (msg !== "") {
    return (
      <p className="text-yellow text-xs italic mb-6">{msg}</p>
    )
  } else {
    return null;
  }
}

const Register = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    name: "", email: "", pass1: "", pass2: "",
  });

  const handleRegister = ev => {
    ev.preventDefault();
    console.log(ev);
    console.log(user);

    let data = pick(user, ['name', 'email', 'password']);
    create_user(data).then(() => {
      fetch_users();
      history.push("/login");
    });
  };

  const check_pass = (p1, p2) => {
    // This is for user experience only,
    // validation logic goes on the server.
    if (p1.length < 8) {
      return "Password must be 8 or more characters.";
    } else if (p1 !== p2) {
      return "Passwords don't match.";
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
    <div className="bg-darkgray shadow-lg rounded px-8 pt-6 pb-8 my-4 flex flex-col w-1/3 mx-auto">
    <div className="mb-4">
      <label className="block text-white text-md font-bold mb-2">
        Name
      </label>
      <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
      type="text"
      value={user.name}
      onChange={(ev) => update("name", ev)}
      placeholder="Name"/>
    </div>
    <div className="mb-4">
      <label className="block text-white text-md font-bold mb-2">
        Email
      </label>
      <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
      type="text"
      value={user.email}
      onChange={(ev) => update("email", ev)}
      placeholder="Email"/>
    </div>
    <div>
      <label className="block text-white text-md font-bold mb-2">
        Password
      </label>
      <input
      className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-black mb-3"
      type="password"
      value={user.pass1}
      onChange={(ev) => update("pass1", ev)}
      placeholder="******************"/>
    </div>
    <div>
      <label className="block text-white text-md font-bold mb-2">
        Confirm Password
      </label>
      <input
      className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-black mb-3"
      type="password"
      value={user.pass2}
      onChange={(ev) => update("pass2", ev)}
      placeholder="******************"/>
    </div>
    <ErrorMessage msg={user.pass_msg}/>
    <div className="flex items-center justify-center">
      <button onClick={handleRegister} disabled={user.pass_msg !== ""} className="bg-orange text-black font-bold py-2 px-4 rounded" type="button">
        Register
      </button>
    </div>
    </div>
  );
};

const state2props = _state => ({});

export default connect(state2props)(Register);
