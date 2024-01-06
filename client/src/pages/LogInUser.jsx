import { useContext, useState } from "react";
import UserContext from "../context/UserContext";

export default function LogInUser() {
  const { user, updateCurrentUser } = useContext(UserContext);
  
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginData;

  const onChange = (e) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {

  }

  return (
    <>
      <h1>Sign In</h1>
      <form >
        <label htmlFor="username">Username</label>
        <input name="username" id="username" value={username} onChange={onChange} />
        <label htmlFor="password">Password</label>
        <input name="password" id="password" value={password}onChange={onChange} />
        <button>Sign in</button>
      </form>
    </>
  );
}
