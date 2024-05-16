import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from 'axios';

const Signin = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const Navigate = useNavigate(); // Initialize useHistory hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', formData);
      console.log(response.data);
      // Handle successful signup
      Navigate('/profile-settings'); // Redirect to profile settings page
    } catch (error) {
      if (error.response) {
        console.error('Signup failed:', error.response.data);
        // Handle signup error
      } else {
        console.error('Signup failed:', error.message);
      }
    }
  };
  
  
  
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <form onSubmit={handleSubmit}>
            <input 
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
            />

            <input 
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input 
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <input 
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
            />

            <div className="flex justify-center items-center h-full">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-center text-white font-bold py-2 px-4 rounded-full"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the 
            <a className="no-underline border-b border-grey-dark text-grey-dark" href="/">
              Terms of Service
            </a> and 
            <a className="no-underline border-b border-grey-dark text-grey-dark" href="/">
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account? 
          <a className="no-underline border-b border-blue text-blue" href="/Login">
            Log in
          </a>.
        </div>
      </div>
    </div>
  );
};

export default Signin;
