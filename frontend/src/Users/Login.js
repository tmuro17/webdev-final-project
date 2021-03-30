import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { api_login } from '../api'

const ErrorMessage = ({msg}) => {
  if (msg !== "") {
    return (
      <p className="text-yellow text-xs italic">{msg}</p>
    )
  } else {
    return null;
  }
}

function Login() {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errString, setErr] = useState("");

  const validPassword = () => {
    if (pass.length < 6) {
      setErr("Password must be six characters or longer.")
      return false;
    }
    return true;
  }

  const handleLogin = ev => {
    ev.preventDefault();
    if (validPassword()) {
      console.log('logging in')
      api_login(email, pass).then(res => {
        // go back to home for now
        history.push("/")
      })
      .catch(err => {
        console.log('erroring!')
        setErr(err);
      })
    }
  };

  return (
    <div className="bg-darkgray shadow-lg rounded px-8 pt-6 pb-8 my-4 flex flex-col w-1/3 mx-auto">
    <div className="mb-4">
      <label className="block text-white text-md font-bold mb-2">
        Email
      </label>
      <input
       className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
       type="text"
       value={email}
       onChange={(ev) => setEmail(ev.target.value)}
       placeholder="Email"/>
    </div>
    <div className="mb-6">
      <label className="block text-white text-md font-bold mb-2">
        Password
      </label>
      <input
       className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
       type="password"
       value={pass}
       onChange={(ev) => setPass(ev.target.value)}
       placeholder="******************"/>
      <ErrorMessage msg={errString}/>
    </div>
    <div className="flex items-center justify-center">
      <button onClick={handleLogin} className="bg-orange text-white font-bold py-2 px-4 rounded" type="button">
        Sign In
      </button>
    </div>
  </div>
  )
}

export default Login;