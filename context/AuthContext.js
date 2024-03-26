import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [allUsers, setAllUsers] = useState(null);
  const [allDonors, setAllDonors] = useState(null);
  const [allRecipients, setAllRecipients] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [AUTHCHECKENABLED, setAUTHCHECKENABLED] = useState(false);
  const [pendingDonations, setPendingDonations]=useState([])

  const modifyCurrentUser = (user) => {
    setCurrentUser(user);
  };

  const setCurrentUserAndToken = (user, token) => {
    setCurrentUser(user);
    setToken(token);
  };

  const setAllDonorsHandler = (donors) => {
    setAllDonors(donors);
  };

  const setAllRecipientsHandler = (recipients) => {
    setAllRecipients(recipients);
  }

  const setAllUsersHandler = (users) => {
    setAllUsers(users);
  };

  const setPendingDonationsHandler = (pendingDonations)=>{
    console.log("Setting Pending")
    setPendingDonations(pendingDonations)
  }

  return (
    <AuthContext.Provider
      value={{
        AUTHCHECKENABLED,
        currentUser,
        token,
        allUsers,
        allDonors,
        allRecipients,
        pendingDonations,
        setCurrentUserAndToken,
        setAllUsersHandler,
        setAllDonorsHandler,
        setAllRecipientsHandler,
        modifyCurrentUser,
        setPendingDonationsHandler
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
