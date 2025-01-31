import React from 'react';
// import facebook from '../assets/image/icons8-facebook-30.png'
// import youtube from '../assets/image/icons8-youtube-30.png'
// import insta from '../assets/image/icons8-instagram-30.png'
// import x from '../assets/image/icons8-x-30.png'


const Footer = () => {
    return (
        <div className='bg-white dark:bg-gray-900 text-black dark:text-white'>
            
    <div className="footer mt-6 rounded-xl bg-slate-900 flex justify-center pl-4 lg:pl-0 lg:justify-around  flex-col lg:flex-row pt-24 py-28">
    <div>
      <h6 className="flex justify-center items-center gap-2 mb-6 text-[#FFFFFF] font-black text-3xl">
        {/* <div>
          <img src="images/logo.webp" alt="">
        </div> */}
        One assignment at a time.</h6>
      <h4 className="link link-hover font-normal text-base text-white/60">Location: Chittagong Bangladesh</h4>
      <h4 className="link link-hover font-normal text-base text-white/60">Email: ifthekerskb@gmail.com</h4>
      <h4 className="link link-hover font-normal text-base text-white/60">Volunteer</h4>
      <h4 className="link link-hover font-normal text-base text-white/60">Openings hours: 9.00 AM - 5.00 PM</h4>
      <div className="flex gap-4">
       
        {/* <img src={facebook} alt=""/>
        <img src={x} alt=""/>
        <img src={youtube} alt=""/>
        <img src={insta} alt=""/> */}
      </div>
    </div>
    <div className="text-left">
      <h6 className="font-bold text-lg text-white/90 mb-6">Useful Links</h6>
      <h4 className="link link-hover font-normal text-base text-white/60">Home</h4>
      <h4 className="link link-hover font-normal text-base text-white/60">About Us </h4>
      <h4 className="link link-hover font-normal text-base text-white/60">Foundation</h4>
      <h4 className="link link-hover font-normal text-base text-white/60">Contact</h4>
    </div>
    <div>
      <h6 className="font-bold text-lg text-white/90 mb-6">Drop a Message</h6>
      <label className="input input-bordered flex items-center  w-[250px] gap-2 mb-2">
        <input type="text" className="grow input-sm  bg-black"  placeholder="     Enter a name" />
        
      </label>
      <button className="btn btn-wide hover:text-black bg-[#0E7A81]">Subscribe</button>
    </div>
  </div>



        </div>
    );
};

export default Footer;