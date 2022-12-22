import { useState, useContext} from "react";
import { baseUrl } from "../shared";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

export default function Login() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext)
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();


  const location = useLocation()
  const navigate = useNavigate()

  // useEffect(()=>{
  //   console.log(location.state.previousUrl)
  // })
  function login(e) {
    e.preventDefault();
    const url = baseUrl + "api/token/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        setLoggedIn(true)
        navigate(location?.state?.previousUrl ? location.state.previousUrl : '/customers')
      });
  }
  return (
    <>
      <b> Login</b>
      <form id="customer" onSubmit={login} className="w-full max-w-sm">
        <div className="flex items-center border-b border-purple-600 py-2">
          <input
            id="username"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center border-b border-purple-600 py-2">
          <input
            id="password"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className="no-underline px-4 py-1 mt-4 bg-purple-400 text-sm text-white font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
          Login
        </button>
      </form>
    </>
  );
}
