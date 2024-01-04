import { useContext } from 'react';
import UserContext from '../context/UserContext';

export default function LogInUser() {

  const {loading, updateLoading, user, updateCurrentUser} = useContext(UserContext);

  return (
    <>
      <h1>Log In Page</h1>
    </>
  );
}