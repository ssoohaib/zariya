import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {

    const [allUsers, setAllUsers]=useState(null);
    const [currentUser, setCurrentUser]=useState(null);
    const [token, setToken]=useState(null);
    const [AUTHCHECKENABLED, setAUTHCHECKENABLED]=useState(false);

    const setCurrentUserAndToken=(user, token)=>{
        console.log("setting current user and token")
        setCurrentUser(user);
        setToken(token);
    }

    const setAllUsersHandler=(users)=>{
        console.log("setting all users", users)
        setAllUsers(users);
    }


    return (
        <AuthContext.Provider value={{ currentUser, token, allUsers, AUTHCHECKENABLED, setCurrentUserAndToken, setAllUsersHandler}}>
            {children}
        </AuthContext.Provider>
    )
}