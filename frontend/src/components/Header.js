import React, { useEffect } from "react";
import logo from "../assests/logo2.jpg";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCart4 } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const Header = () => {
  const userData = useSelector((state) => state.user);
  const cartItemNumber = useSelector((state) => state.product.cartItem);
  const dispatch = useDispatch();

  // to show menu bar on pressing user icon
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const handleLogout = () => {
    dispatch(logoutRedux());
     toast("Logout successfully");
    
  };

  return (
    <header className="fixed shadow-md w-full h-20 px-4 md:px-6 z-50 bg-white">
      {/* desktop */}

      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-16 px-2">
            <img src={logo} className="h-full" />
          </div>
        </Link>

        <div className="flex items-center gap-6 md:gap-7 ">
          {/* hidden to hide navbar in mobile version */}
          <nav className="md:flex gap-4 md:gap-6 text-base hidden md:text-lg">
            <Link to={""}>Home</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>

          <div className="text-2xl text-slate-600 relative">
            <Link to={"cart"}>
              <BsCart4 />
              <div className="absolute -top-2 -right-2 text-white bg-red-500 h-5 w-5 rounded-full m-0 p-0 text-sm justify-center text-center">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>

          <div className=" text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
              {/************show user image ********/}
              {userData.image ? (
                <img src={userData.image} className="h-full w-full" />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>

            {showMenu && (
              <div className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    New product
                  </Link>
                )}

                {/******************condition for logut and login *****/}
                {userData.email ? (
                  <p
                    className="cursor-pointer text-white px-2 bg-red-500"
                    onClick={handleLogout}
                  >
                    Logout ({userData.firstName}){" "}
                  </p>
                ) : (
                  <>
                    <Link
                      to={"signup"}
                      className="whitespace-nowrap cursor-pointer px-2"
                    >
                      Signup
                    </Link>
                    <Link
                      to={"Login"}
                      className="whitespace-nowrap cursor-pointer px-2"
                    >
                      Login
                    </Link>
                  </>
                )}

                <nav className="md:hidden text-base flex flex-col md:text-lg">
                  <Link to={""}>Home</Link>
                  <Link to={"menu/64c0f72508012a82e5b64caa"}>Menu</Link>
                  <Link to={"about"}>About</Link>
                  <Link to={"contact"}>Contact</Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  );
};

export default Header;
