import React, { createContext, useContext, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; 
import { app } from '../firebase.config'; // Assuming your Firebase config is in firebase.config.js
import { getAuth } from 'firebase/auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [uid, setUid] = useState(null);
  const auth = getAuth(app); // Initialize auth instance

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
    } else {
      setUid(null);
    }
  });

  return (
    <AuthContext.Provider value={{ uid }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
