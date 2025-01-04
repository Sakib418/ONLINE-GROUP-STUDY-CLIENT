import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEyeSlash } from 'react-icons/fa';
import { FaEye } from "react-icons/fa";
import registerLottieData from '../../assets/Animation - 1735884761600.json'
import Lottie from 'lottie-react';
import AuthContext from '../../context/AuthContext/AuthContext';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase/firebase.init';



const Register = () => {

    const {createUser,handlewithGithub} = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword,setShowpassword] = useState(false);

    const handleRegister = (e) =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photoURL = e.target.photoURL.value;
        console.log (email,password,name,photoURL);
         if(password.length < 6){
          toast.warn('Password should be six character or longer');
          return;
         }
         const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
         if(!passwordRegex.test(password)){
          toast.warn('Password should be six character or longer and Must have an Uppercase letter and ust have an Lower letter');
          return;
         }

        createUser(email,password)
        .then(res => {
            console.log(res.user);

            const profile = {
              displayName: name,
              photoURL: photoURL
            }

            updateProfile(auth.currentUser,profile)
            .then(res=>console.log('Profile updated'))
            .catch(error=> console.log(error));

            toast.success('Register Successfull!!');
            e.target.reset();
            navigate('/');

        })
        .catch(error => {
            console.log(error.message);
            toast.error('Register Failed!!');
        });
       }
       const handleLoginWithGithub = (e) =>{
        e.preventDefault();
        handlewithGithub()
        .then(res => {
            console.log(res.user);
            navigate('/');
        })
        .catch(error => console.log(error.message));
    }
    return (
        <div className="hero bg-base-200 min-h-screen p-2 rounded-xl">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10">
           
            <div className="text-center lg:text-left">
            <Lottie animationData = {registerLottieData}></Lottie>
            
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleRegister} className=" card-body relative">
            <p>Register with <Link onClick={handleLoginWithGithub} className='text-blue-700'>Github</Link></p>
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name="name" placeholder="name" className="input input-bordered" required/>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input type="text" name="photoURL" placeholder="photo URL" className="input input-bordered"  required/>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type={showPassword? "text" : "password"} name="password" placeholder="password" className="input input-bordered" required />
                
              </div>
              <button onClick={() => setShowpassword(!showPassword)} className="absolute right-12 bottom-32  btn btn-xs">
              {
                showPassword ? <FaEye></FaEye> : <FaEyeSlash ></FaEyeSlash>
              }
              </button>
              
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
            <p className='ml-4 mb-4 mr-4'>Already have an account? please <Link className="text-blue-400" to='/Login'>Login.</Link></p>
          </div>
           
         
        </div>
      </div>
    );
};

export default Register;