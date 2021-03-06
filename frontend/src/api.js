import store from "./store";

export const api_get = async path => {
  let text = await fetch("https://short-final-backend.tmuro17.xyz/api/v1" + path, {});
  let resp = await text.json();

  return resp.data;
};

export const api_post = async (path, data, headers = {}) => {
  let options = {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  };

  let txt = await fetch("https://short-final-backend.tmuro17.xyz/api/v1" + path, options);
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
        store.dispatch(action);
        resolve('SUCCESS');
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
  });
};

export const api_update_user = async user => {
  let state = store.getState();
  let token = state?.session?.token;

  let data = new FormData();
  data.append("user[id]", user.id);
  data.append("user[name]", user.name);
  data.append("user[email]", user.email);

  let opts = {
    method: "PATCH",
    body: data,
    headers: {
      "x-auth": token,
    }
  };

  let response = await fetch(`https://short-final-backend.tmuro17.xyz/api/v1/users/${user.id}`, opts)
  return await response.json()
};

export const fetch_user = async id => {
  return await api_get(`/users/${id}`);
};

export const fetch_user_airport_win_losses = async id => {
  return await api_get(`/user_airports_win_losses/${id}`);
};

export const fetch_user_win_loss = async id => {
  return await api_get(`/user_win_loss/${id}`);
};

export const fetch_user_total_guesses = async id => {
  return await api_get(`/user_total_guesses/${id}`);
};

export const fetch_airports_easiest_25 = async () => {
  return await api_get("/airports_easiest_25");
};

export const fetch_airports_hardest_25 = async () => {
  return await api_get("/airports_hardest_25");
};

export const fetch_airport_info = async icao => {
  return await api_get(`/airport/${icao}`);
};

export const fetch_top_100_users = async () => {
  return await api_get("/top_100");
};

export const load_defaults = () => {
  fetch_users();
};

export const get_comments = async (id) => {
  return await api_get(`/comments/airport/${id}`);
};

export const create_comment = async (data) => {
  let state = store.getState();
  let token = state?.session?.token;
  return await api_post("/comments", {comment: data}, {"x-auth": token});
};