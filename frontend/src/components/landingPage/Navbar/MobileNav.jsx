import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import logo from "../../../assets/images/tapart.png";
import close from "../../../assets/images/close.png";
import  {useAuth } from "../../../../context/auth-context"
import "./nav.css";

const MobileNav = ({ navClose }) => {
  const auth =useAuth()
  const handleLogout = () => {
		auth.logout();
		navigate('/');
		console.log('log');
	};
  return (
    <div
      className="bg-white w-[261px] fixed top-0 left-0 lg:hidden z-20 h-full "
      id="cbk-mobile-nav"
    >
      <nav className="flex relative flex-col justify-center  items-start gap-y-10 lg:hidden px-10 pb-10 z-30">
        <div className=" mt-5 flex justify-between w-full gap-5">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <div>
            <img
              src={close}
              alt=""
              onClick={navClose}
              className="text-[#8B70E9] mt-2"
            />
          </div>
        </div>
        <ul className=" flex flex-col justify-between items-start gap-5 cursor-pointer ">
          <li
            onClick={navClose}
            className="p-2  border-b-white border-b hover:border-opacity-100 hover:text-purple hover:border-b-purple active:border-b-purple active:text-purple"
          >
            <Link to="/"> Home</Link>
          </li>
          <li
            onClick={navClose}
            className="p-2 border-b-white border-b hover:text-purple hover:border-b-purple active:border-b-purple active:text-purple"
          >
            <Link to="/Aboutus">About Us</Link>
          </li>
          <li
            onClick={navClose}
            className="p-2 border-b-white border-b hover:text-purple hover:border-b-purple active:border-b-purple active:text-purple"
          >
            <Link to="/Pricing">Pricing</Link>
          </li>
          {/* <li
            onClick={navClose}
            className="p-2 border-b-white border-b hover:text-purple hover:border-b-purple active:border-b-purple active:text-purple"
          >
            <Link to="/contactus">Contact Us</Link>
          </li>
          <li
            onClick={navClose}
            className="p-2 border-b-white border-b hover:text-purple hover:border-b-purple active:border-b-purple active:text-purple"
          >
            <Link to="/FAQ">FAQs</Link>
          </li> */}
        </ul>
        <div className=" w-full flex flex-col items-start justify-start gap-y-5">

        {auth.token === null ? (
						 <Link to="/Login" className=" w-full">
             <button
               className="inline-flex justify-center items-center px-8 py-3  border border-[#8B70E9]  
             rounded-[8px] font-semibold text-md text-[#8B70E9] bg-white transition ease-in-out duration-150 cbk-mobile-login-btn"
             >
                Log in
             </button>
             </Link>
					) : (
						<span onClick={handleLogout} className="w-full">
							 <button
               className="inline-flex justify-center items-center px-8 py-3  border border-[#8B70E9]  
             rounded-[8px] font-semibold text-md text-[#8B70E9] bg-white transition ease-in-out duration-150 cbk-mobile-login-btn"
             >
                Logout
             </button>
						</span>
					)}

{auth.token === null ? (
  <Link to="/Signup" className=" w-full">
  <Button className="text-white bg-[#8B70E9] cbk-mobile-login-btn">
     Sign up 
  </Button>
  </Link>
) :""}
          
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
