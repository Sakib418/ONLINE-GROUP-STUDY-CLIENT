import React, { useContext, useRef } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {

    const {handlewithGithub,signInUser} = useContext(AuthContext);
    const  navigate = useNavigate();
    const emailRef = useRef();
     

    
const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
  
    signInUser(email, password)
      .then((res) => {
        console.log(res.user);
        e.target.reset();
        Swal.fire({
          title: "Success!",
          text: "Login Successfully",
          icon: "success",
          confirmButtonText: "Cool",
        });
        navigate("/");
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
        navigate('/');
    })
    .catch(error => console.log(error.message));
}



    return (
        <div className="hero bg-base-200 min-h-screen rounded-xl">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl font-bold">Login now!</h1>
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
    );
};

export default Login;