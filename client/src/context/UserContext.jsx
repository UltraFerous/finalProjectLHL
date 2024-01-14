import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessages, setNewMessages] = useState(false);

  //functions related to user go here
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setUserLoaded(true);
    }
  }, []);

  const updateLoading = (loadingStatus) => {
    setIsLoading(loadingStatus);
  };

  const updateCurrentUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const updateUserWithCookie = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setUserLoaded(true);
    }
  };

  const updateCurrentUserWithOrg = (orgId) => {
    setUser((prevUser) => {
      const updatedUser = {
        ...prevUser,
        user: { ...prevUser.user, organization_id: orgId },
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const updateNewMessages = (status) => {
    setNewMessages(status);
  }

  const fetchMessages = () => {
    const storedUser = localStorage.getItem("user");
    const userId = storedUser ? JSON.parse(storedUser).user.id : null;

    if (userId) {
      axios
        .get(`http://localhost:8080/messages/${userId}`)
        .then((response) => {
          // Check if there are new messages with is-read set to false
          const hasNewMessages = response.data.some(
            (message) => message.receiver_id === userId && !message.is_read
          );

          // Update the newMessages state
          updateNewMessages(hasNewMessages);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    } else {
      console.warn("User information not available yet.");
    }
  };

  useEffect(() => {
    updateUserWithCookie();
  }, []); // Run once on component mount to handle page refresh

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...user,
        userLoaded,
        updateCurrentUser,
        updateUserWithCookie,
        updateCurrentUserWithOrg,
        updateLoading,
        isLoading,
        newMessages,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
