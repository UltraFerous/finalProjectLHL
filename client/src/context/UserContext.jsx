import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  //functions related to user go here
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setUserLoaded(true);
    }
  }, []);

  const updateCurrentUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const updateUserWithCookie = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setUserLoaded(true);
    }
  };

  useEffect(() => {
    updateUserWithCookie();
  }, []); // Run once on component mount to handle page refresh

  return (
    <UserContext.Provider
      value={{
        ...user,
        userLoaded,
        updateCurrentUser,
        updateUserWithCookie,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
