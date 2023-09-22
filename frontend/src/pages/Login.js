import React, { useState } from "react";
import loginSignupimg from "../assests/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //////////////// to use BiShow and BiHide button properly////////////

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((previous) => !previous);
  };

  ////////////// to set data enter by user using function handleOnChange/////////////
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target; // extract name and value from e.target {arr destructing}
    setData((prev) => {
      return {
        ...prev, // spread operator
        // The computed property name allows to use the value of the name variable as the property name in the new state object and set its value to the value extracted from the input field.
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // page will not refresh on pressing submit button

    const { email, password } = data; // mandatory data

    if (email && password) {
      if (password) {
        axios
          .post(
            `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
            {
              email,
              password,
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            toast(res.data.message); // for animation
            
            if (res.data.alert) {
              dispatch(loginRedux(res.data)); // send data
              setTimeout(() => {
                navigate("/");
              }, 1000);
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
          <img src={loginSignupimg} className="w-full" />
        </div>

        {/**********************       Login form  ***************/}

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className=" w-full bg-slate-200 border-none outline-none "
              value={data.password}
              onChange={handleOnChange}
            />

            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Login
          </button>
        </form>

        <p className="text-left text-sm mt-2">
          Don't have an account ?{" "}
          <Link to={"/signup"} className="text-red-500 underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
