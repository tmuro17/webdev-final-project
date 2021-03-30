import store from "./store";

export const api_get = async path => {
  let text = await fetch("http://localhost:4000/api/v1" + path, {});
  let resp = await text.json();

  return resp.data;
};

export const api_post = async (path, data) => {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  };

  let txt = await fetch("http://localhost:4000/api/v1" + path, options);
  return await txt.json();
};

export const create_user = user => api_post("/users", {user});

export const fetch_users = () => {
  api_get("/users").then((data) => store.dispatch({
    type: "users/set",
    data: data,
  }));
};

export const api_login = (email, password) => {
  return new Promise((resolve, reject) => {
    api_post("/session", {email, password}).then((data) => {
      if (data.session) {
        let action = {
          type: "session/set",
          data: data.session,
        };
        console.log('setting session')
        store.dispatch(action);
        resolve('SUCCESS')
      } else if (data.error) {
        let action = {
          type: "error/set",
          data: data.error,
        };
        store.dispatch(action);
        // handle this better in the future
        reject(data.error);
      }
    });
  })
};

export const load_defaults = () => {
  fetch_users();
};
