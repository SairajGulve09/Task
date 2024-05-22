import React from 'react';
import { useNavigate } from 'react-router-dom';
import facebookimage from '../Assets/facebook.png';
import Twitterimage from '../Assets/twitter.png';
import LinkedInimage from '../Assets/linkedin.png';
import YouTubeimage from '../Assets/youtube.png';
import Instagramimage from '../Assets/instagram.png';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-zinc-100 p-8">
        <div className="bg-purple-500 text-black p-6 rounded-lg shadow-lg flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Ready for a next project?</h2>
            <p>Let's get started!</p>
          </div>
          <button onClick={()=>{navigate("/contact")}} className="bg-zinc-800 text-white py-2 px-4 rounded-lg">Contact us</button>
        </div>
      </div>
      <footer className="bg-zinc-100 text-zinc-800 p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <h3 className="text-black font-bold">KeyMatrix Solutions</h3>
            <p>© 2019</p>
          </div>
          <div>
            <h3 className="text-black font-bold">Customers</h3>
            <ul>
              <li>Buisnesses</li>
              <li>Influencers</li>
            </ul>
          </div>
          <div>
            <h3 className="text-black font-bold">Company</h3>
            <ul>
              <li><a href='/about'>About us</a></li>
              <li><a href='/careers'>Careers</a></li>
              <li><a href='/contact'>Contact us</a></li>
            </ul>
          </div>
          <div className="flex flex-col relative">
            <h3 className="text-black font-bold">Further Information</h3>
            <ul>
              <li><a href='/terms-and-conditions'>Terms & Conditions</a></li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="mt-4 flex justify-end space-x-4">
              <a href="#" className="text-white"><img undefinedhidden="true" alt="facebook" src={facebookimage} /></a>
              <a href="#" className="text-white"><img undefinedhidden="true" alt="twitter" src={Twitterimage} /></a>
              <a href="#" className="text-white"><img undefinedhidden="true" alt="linkedin" src={LinkedInimage} /></a>
              <a href="#" className="text-white"><img undefinedhidden="true" alt="youtube" src={YouTubeimage} /></a>
              <a href="#" className="text-white"><img undefinedhidden="true" alt="instagram" src={Instagramimage} /></a>
            </div>
        </div>
      </footer>
      </>
  )
}