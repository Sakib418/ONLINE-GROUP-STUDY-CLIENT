import React, { useContext, useRef } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate,Link, useLocation } from 'react-router-dom';
import swal from 'sweetalert2';
import animationData from '../../assets/Animation - 1735972339956.json'
import Lottie from 'lottie-react';
import axios from 'axios';

const Login = () => {

    const {handlewithGithub,signInUser} = useContext(AuthContext);
    const  navigate = useNavigate();
    const emailRef = useRef();
    const location = useLocation();
    const from = location.state || '/';
    

    
const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
  
    if (!email || !password) {
      swal.fire({
        title: "Error!",
        text: "Email and Password are required.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }


    signInUser(email, password)
      .then((res) => {
        console.log(res.user);
        const user = {email:res.user.email}
        axios.post('https://online-group-study-server-pi-lyart.vercel.app/jwt',user,{withCredentials:true})
        .then(res=>{
          console.log(res.data);
        })
        //e.target.reset();
        swal.fire({
          title: "Success!",
          text: "Login Successfully",
          icon: "success",
          confirmButtonText: "Cool",
        });
        
        navigate(from);
      })
  
      .catch((error) => {
        console.log(error.message);
        Swal.fire({
          title: "Error!",
          text: "Please check the credentials",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };
  const handleLoginWithGithub = (e) =>{
    e.preventDefault();
    handlewithGithub()
    .then(res => {
        console.log(res.user);
        const user = {email:res.user.email}
        axios.post('https://online-group-study-server-pi-lyart.vercel.app/jwt',user,{withCredentials:true})
        .then(res=>{
          console.log(res.data);
        })
        swal.fire({
          title: "Success!",
          text: "Login Successfully",
          icon: "success",
          confirmButtonText: "Cool",
        });
        navigate(from);
    })
    .catch(error => console.log(error.message));
}



    return (
        <div className="hero bg-base-200 min-h-screen rounded-xl  dark:bg-gray-900 text-black dark:text-white">
      <div className="hero-content flex-col ">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10">
          {/* <h1 className="text-2xl font-bold">Login now!</h1> */}
          <div className="text-center lg:text-left max-w-xl">
          <Lottie animationData = {animationData}></Lottie>
          </div>
        
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <p>
              Login with{" "}
              <Link onClick={handleLoginWithGithub} className="text-blue-700">
                Github
              </Link>
            </p>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                ref={emailRef}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                {/* <a
                  className="label-text-alt  text-blue-600 underline link link-hover"
                //   onClick={() => handleForgetPassword(emailRef.current?.value)}
                >
                  Forgot password?
                </a> */}
                {/* <Link  to={`/forgetPassword/${emailRef.current?.value}`}>Forgot password?</Link> */}
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <p className="ml-4 mb-4 mr-4">
            New to this website? please
            <Link className="text-blue-500" to="/register">
              {" "}
              Register.
            </Link>
          </p>
        </div>
        </div>
      </div>
    </div>
    );
};

export default Login;