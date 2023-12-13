import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {

    const [currentUser, setCurrentUser]=useState(null);
    const [token, setToken]=useState(null);

    const setCurrentUserAndToken=(user, token)=>{
        console.log("setting current user and token")
        setCurrentUser(user);
        setToken(token);
    }


    return (
        <AuthContext.Provider value={{ currentUser, token, setCurrentUserAndToken}}>
            {children}
        </AuthContext.Provider>
    )
}