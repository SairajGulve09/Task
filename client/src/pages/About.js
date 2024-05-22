import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
export default function About() {
    const navigate = useNavigate();
    return (
        <div className="bg-white ">
          <div className="bg-purple-500 text-center py-12">
            <h1 className="text-4xl font-bold text-white">ABOUT KeyMatrix</h1>
          </div>
          <div className="max-w-4xl mx-auto p-8 bg-white d shadow-lg -mt-12">
            <h2 className="text-2xl font-bold text-purple-700 dark:purple-blue-400">WHO WE ARE</h2>
            <p className="mt-4 text-zinc-700">
              We're a sales performance agency. We've been helping businesses drive revenue with the use of inbound marketing and sales enablement tactics since 2012. We're a proud HubSpot Platinum Partner and pride ourselves on using the best tools to help our clients succeed. 
            </p>
            <h2 className="mt-8 text-2xl font-bold text-purple-700 dark:text-purple-400">WE'RE DIFFERENT THAN THE REST</h2>
            <p className="mt-4 text-zinc-700 ">
              <strong>We're rooted in sales.</strong> Our parent company, 
              <a href="#" className="text-purple-500 dark:text-purple-300">The Center for Sales Strategy (CSS)</a>, has been helping sales organizations turn talent into performance for almost 40 years. Unlike other marketing agencies, we're obsessed with ROI and we have the experience to deliver inbound sales results because we've done it ourselves...
            </p>
            <p className="mt-4 text-zinc-700 ">
              <strong>We've been where you are.</strong> More than a decade ago, when we needed to grow and diversify how we generated new business at CSS, we turned to inbound marketing and found huge success after launching our 
              <a href="#" className="text-purple-500 dark:text-purple-300">sales strategy blog</a>. Once we mastered the art of using thought leadership content for lead generation, we launched LeadG2 so we could help businesses do the exact same thing.
            </p>
            <div className="mt-8 flex space-x-4">
              <Button onClick={()=>{navigate('/contact')}} className="bg-purple-500 text-white px-4 py-2 rounded shadow">CONTACT US</Button>
            </div>
          </div>
        </div>
    )
}