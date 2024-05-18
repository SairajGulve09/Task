import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom"; // Import useHistory
import axios from 'axios';
import {useAuth} from "../context/AuthContext"

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useHistory hook
  const {storeTokenInLs, isLoggedIn} = useAuth();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const { token } = response.data;
      console.log("This is token",token);
      localStorage.setItem("token", token);
      console.log("isLoggedin ", isLoggedIn);
      // Redirect to profile settings page upon successful login
      navigate("/");
    } catch (error) {
      setError(error.response.data.error || 'Failed to login');
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'rememberMe') setRememberMe(checked);
  };

  return (
    <>
    <div className="text-center mt-24">
      <div className="flex items-center justify-center">
        <svg
          fill="none"
          viewBox="0 0 24 24"
          className="w-12 h-12 text-blue-500"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </div>
      <h2 className="text-4xl tracking-tight">Sign in into your account</h2>
      <span className="text-sm">
        or{" "}
        <Link to="/Signup" className="text-blue-500">
          register a new account
        </Link>
      </span>
    </div>
    <div className="flex justify-center my-2 mx-4 md:mx-0">
      <form onSubmit={handleLogin} className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              id="email"
              autoComplete="email" // Add autocomplete attribute
              className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full md:w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              autoComplete="current-password" // Add autocomplete attribute
              className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full flex items-center justify-between px-3 mb-3 ">
            <label htmlFor="remember" className="flex items-center w-1/2">
              <input
                type="checkbox"
                name="rememberMe"
                id="remember"
                className="mr-1 bg-white shadow"
                checked={rememberMe}
                onChange={handleChange}
              />
              <span className="text-sm text-gray-700 pt-1">Remember Me</span>
            </label>
            <div className="w-1/2 text-right">
            <Link to="/ForgotPassword" className="text-blue-500 text-sm tracking-tight"> {/* Use Link component */}
                  Forget your password?
                </Link>
            </div>
          </div>
          <div className="w-full md:w-full px-3 mb-6">
            <button type="submit" className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500 ">
              Sign in
            </button>
          </div>
          <div className="mx-auto -mb-6 pb-1">
            <span className="text-center text-xs text-gray-700">
              or sign up with
            </span>
          </div>
          {/* Buttons for signing up with other services */}
        </div>
      </form>
    </div>
    </>
  );
};

export default LoginPage;
