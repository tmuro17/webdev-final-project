import {createStore, combineReducers} from "redux";

const users = (state = [], action) => {
  switch (action.type) {
    case "users/set":
      return action.data;
    default:
      return state;
  }
};

const user_form = (state = {}, action) => {
  switch (action.type) {
    case "user_form/set":
      return action.data;
    default:
      return state;
  }
};

const save_session = (sess) => {
  let session = Object.assign({}, sess, {time: Date.now()});
  localStorage.setItem("session", JSON.stringify(session));
};

const load_session = () => {
  let session = localStorage.getItem("session");
  if (!session) {
    return null;
  }

  session = JSON.parse(session);
  let age = Date.now() - session.time;
  let expiry = 24 * 60 * 60 * 1000;
  if (age < expiry) {
    return session;
  } else {
    return null;
  }
};

const session = (state = load_session(), action) => {
  switch (action.type) {
    case "session/set":
      save_session(action.data);
      return action.data;
    case "session/clear":
      localStorage.removeItem("session");
      return null;
    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case "session/set":
      return null;
    case "error/set":
      return action.data;
    default:
      return state;
  }
};

const root_reducer = (state, action) => {
  console.log("root_reducer", state, action);
  let reducer = combineReducers({
    users, user_form, session, error
  });
  return reducer(state, action);
};

let store = createStore(root_reducer);
export default store;

