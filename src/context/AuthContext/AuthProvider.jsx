import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import auth from '../../firebase/firebase.init';
import { createUserWithEmailAndPassword, GithubAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';


const AuthProvider = ({children}) => {
    const githubAuthProvider = new GithubAuthProvider();
    const [loading,setLoading] = useState(true);
    const [user,setUser] = useState(null);
    
    const createUser = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);

    }

    const handlewithGithub = () =>{
        return signInWithPopup(auth,githubAuthProvider);
  }
    
    useEffect( () => {
      const unsubscribe =  onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser);
            console.log('Current User:',currentUser);
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
    
     const signInUser = (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }



    const authInfo = {
        handlewithGithub,
        createUser,
        signOutUser,
        signInUser,
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