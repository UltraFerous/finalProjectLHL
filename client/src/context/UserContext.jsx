import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  //functions related to user go here
  const updateCurrentUser = (userData) => {
    setUser(userData);
  };

  const updateLoading = (status) => {
    setLoading(status);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateCurrentUser,
        loading,
        updateLoading, //all the states and functions that we want to export and use in other files go in here, destructured
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
