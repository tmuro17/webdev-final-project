import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
// I will implement faIcons for the navbar in the future
import {connect} from "react-redux";


// ill move this functionality to the profile page, leaving it in a comment for ez copying
// let SessionInfo = connect()(({session, dispatch}) => {
//   const logout = () => {
//     dispatch({type: 'session/clear'});
//   };
//   return (
//     <p>
//       Logged in as {session.email} &nbsp;
//       <Button onClick={logout}>Logout</Button>
//     </p>
//   );
// });

const LoginLogoutLink = connect()(({session, dispatch}) => {
  const logout = () => {
    dispatch({type: 'session/clear'});
  };

  if (session) {
    return (
      <a onClick={logout} className="px-3 py-2 flex items-center leading-snug">
        Logout
      </a>
    )
  } else {
    return (
    <a href="/login" className="px-3 py-2 flex items-center leading-snug">
      Login
    </a>
    )
  }
})

const AppNav = ({session}) => {
  return (
    <div className="flex flex-wrap pb-2">
      <div className="w-full">
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-darkgray rounded-b">
          <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
              <a href="/" className="text-md font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
                Short Final
              </a>
            </div>
            <div className="flex lg:flex-grow items-center" id="example-navbar-info">
              <ul className="flex flex-col lg:flex-row list-none ml-auto text-sm uppercase font-bold text-white">
                <li className="nav-item hover:bg-orange rounded">
                  <a href="/play" className="px-3 py-2 flex items-center leading-snug">
                    Play
                  </a>
                </li>
                <li className="nav-item hover:bg-orange rounded">
                  <a href="/profile" className="px-3 py-2 flex items-center leading-snug">
                    Profile
                  </a>
                </li>
                <li className="nav-item hover:bg-orange rounded">
                  <a href="/leaderboard" className="px-3 py-2 flex items-center leading-snug">
                    Leaderboard
                  </a>
                </li>
                <li className="nav-item hover:bg-orange rounded">
                  <a href="/airports" className="px-3 py-2 flex items-center leading-snug">
                    Airport Stats
                  </a>
                </li>
                <li className="nav-item hover:bg-orange rounded">
                  <LoginLogoutLink session={session}/>
                </li>
                {!session &&
                  <li className="nav-item hover:bg-orange rounded">
                    <a href="/register" className="px-3 py-2 flex items-center leading-snug">
                      Register
                    </a>
                  </li>
                }
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )};

export default connect(({session}) => ({session}))(AppNav);
