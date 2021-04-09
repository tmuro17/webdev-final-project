import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {api_update_user, fetch_user} from "../api";
import {useHistory} from "react-router-dom";

const EditUser = ({session}) => {
  let user_id = session["user_id"];
  let history = useHistory()
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    fetch_user(user_id).then((u) => {
        setUser(u);
        setEmail(u.email);
        setName(u.name);
      }
    );
  }, [user_id]);

  const updateUser = ev => {
    ev.preventDefault();
    console.log('updating user');
    api_update_user({
      id: user_id,
      name: name,
      email: email,
    }).then((_) =>
      history.push("/profile")
    );
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-1/3">
        <h1 className="text-xl font-bold">Edit User:</h1>
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
              value={name}
              onChange={(ev) => setName(ev.target.value)}
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
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <div>
            <button onClick={updateUser} className="bg-orange text-white font-bold py-2 px-4 rounded" type="button">
              Update User!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(({session}) => ({session}))(EditUser);
