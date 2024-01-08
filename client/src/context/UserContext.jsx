import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //functions related to user go here
  const updateCurrentUser = (userData) => {
    console.log(userData);
    setUser(userData);
    console.log(user);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateCurrentUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
