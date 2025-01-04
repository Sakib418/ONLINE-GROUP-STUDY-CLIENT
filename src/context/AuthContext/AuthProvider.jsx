import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import auth from '../../firebase/firebase.init';
import { createUserWithEmailAndPassword, GithubAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';


const AuthProvider = ({children}) => {
    const githubAuthProvider = new GithubAuthProvider();
    const [loading,setLoading] = useState(true);
    const [user,setUser] = useState(null);
    
    const createUser = (email,password) =>{
        setLoading(ture);
        return createUserWithEmailAndPassword(auth,email,password);

    }

    const handlewithGithub = () =>{
        return signInWithPopup(auth,githubAuthProvider);
  }
    
    useEffect( () => {
      const unsubscribe =  onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    },[])

    const signOutUser = () =>{
        setLoading(true);
       return signOut(auth);
     }

    const authInfo = {
        handlewithGithub,
        createUser,
        signOutUser,
        user,
        loading
    }
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;