import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [allUsers, setAllUsers] = useState(null);
  const [allDonors, setAllDonors] = useState(null);
  const [allRecipients, setAllRecipients] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [AUTHCHECKENABLED, setAUTHCHECKENABLED] = useState(false);

  const modifyCurrentUser = (user) => {
    setCurrentUser(user);
  };

  const setCurrentUserAndToken = (user, token) => {
    // console.log("setting current user and token");
    setCurrentUser(user);
    setToken(token);
  };

  const setAllDonorsHandler = (donors) => {
    // console.log("setting all donors", donors);
    setAllDonors(donors);
  };

  const setAllRecipientsHandler = (recipients) => {
    // console.log("setting all recipients", recipients);
    setAllRecipients(recipients);
  }

  const setAllUsersHandler = (users) => {
    // console.log("setting all users", users);
    setAllUsers(users);
  };

  return (
    <AuthContext.Provider
      value={{
        AUTHCHECKENABLED,
        currentUser,
        token,
        allUsers,
        allDonors,
        allRecipients,
        setCurrentUserAndToken,
        setAllUsersHandler,
        setAllDonorsHandler,
        setAllRecipientsHandler,
        modifyCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
