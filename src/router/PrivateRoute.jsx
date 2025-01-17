import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext/AuthContext';
import { Navigate, useLoaderData, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();
    
    if(loading){
        // return <span className="loading loading-dots loading-lg mx-auto text-center mt-10"></span>
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="loading loading-dots loading-lg text-center"></span>
            </div>
        );
    }
   

    if(user){
        return children;
    }
    return  <Navigate to = '/login' state={location?.pathname}></Navigate>
       
    
};

export default PrivateRoute;