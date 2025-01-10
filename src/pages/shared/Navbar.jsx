import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import { toast } from "react-toastify";
import logo from '../../assets/images/logo.png'
import { Tooltip } from "react-tooltip";
const Navbar = () => {
     
     const {user,signOutUser} = useContext(AuthContext);
     const email = user && user.email;
  const links = <div className='lg:flex gap-2 text-base text-gray-500'>
     <li><NavLink to = "/">Home</NavLink></li>
     <li><NavLink to = "/assignments">Assignments</NavLink></li>
     <li><NavLink to = "/createAssignment">Add New Assignment</NavLink></li>
     {/* {
      user && 
      <>
      <li><NavLink to = {`/myCampaign/${email}`}>My Campaign</NavLink></li>
      <li><NavLink to = {`/myDonation/${email}`}>My Donations</NavLink></li>
      </>
     } */}
     
    
  </div>

    

  const handleSignOut = () =>{
    signOutUser()
    .then(res=> toast("Sign out successfully!"))
    .catch(error => toast("Error occured!"));
    
   }


    return (
        <div className='mb-10'>
              <div className="navbar ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <div className="avatar hidden lg:block">
  <div className="w-16 rounded-full">
  <a className="my-anchor-element" place="top"> 
  <img src={(user) ? user.photoURL : logo} />
  </a>
    

  <Tooltip anchorSelect=".my-anchor-element" place="top">
    
    {user && user.displayName
    }
    
  </Tooltip>
    
  </div>
</div>
    <a className="btn btn-ghost text-2xl font-bold hidden lg:block">Fund</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    {links}
    </ul>
  </div>
  <div className="navbar-end">
  {
      user ?
      <div className='flex gap-2 justify-center items-center'>
      {/* <span>{user.email}</span> */}
      <button onClick={handleSignOut} className='btn '>Sign Out</button>
      </div>
      
     :
     <NavLink to = '/login' className="btn">Login</NavLink>
    }
  </div>
</div>
        </div>
    );
};

export default Navbar;


// {
//     user ?
//     <div className='flex gap-2 justify-center items-center'>
//     {/* <span>{user.email}</span> */}
//     <button onClick={handleSignOut} className='btn '>Sign Out</button>
//     </div>
    
//    :
//    <NavLink to = '/login' className="btn">Login</NavLink>
//   }