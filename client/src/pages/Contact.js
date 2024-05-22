import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Contact() {


    const [contact, setContact] = useState({
        fullname: "",
        email: "",
        message: "",
    });

    const [userData, setUserData] = useState(true);

    const { user } = useAuth();

    if (userData && user) {
        setContact({
            fullname: user.fullname,
            email: user.email,
            message: "",
        });

        setUserData(false);
    }

    // lets tackle our handleInput
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setContact({
            ...contact,
            [name]: value,
        });
    };

    // handle fomr getFormSubmissionInfo
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(" ", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact),
            });

            if (response.ok) {
                setContact({
                    fullname: contact.fullname,
                    email: contact.email,
                    message: "",
                });

                // toast.success("Message sent successfully...");
            }
        } catch (error) {
            // toast.error("error in contact form")
            console.log("Error in contact form: ", error);

        }

        console.log(contact);
    };


    return (
        <>
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-4">
                <h2 className="text-3xl font-semibold mb-6">Contact us</h2>
                <form>
                  <div className="mb-4">
                    <label className="block text-zinc-700" htmlFor="fullname">Name</label>
                    <input onChange={handleInput} className="w-full p-3 rounded-lg border border-zinc-300 mt-2" type="text" id="fullname" value={user.fullname} placeholder="Name"/>
                  </div>
                  <div className="mb-4">
                    <label className="block text-zinc-700" htmlFor="email">Email</label>
                    <input onChange={handleInput} className="w-full p-3 rounded-lg border border-zinc-300 mt-2" type="email" id="email" value={contact.email} placeholder="Email"/>
                  </div>
                  <div className="mb-4">
                    <label className="block text-zinc-700" htmlFor="message">Message</label>
                    <textarea onChange={handleInput} className="w-full p-3 rounded-lg border border-zinc-300 mt-2" id="message" rows="4" placeholder="Message"></textarea>
                  </div>
                  <button onClick={handleSubmit} className="bg-purple-500 text-white py-3 px-6 rounded-lg">Send Message</button>
                </form>
              </div>
              <div className="md:w-1/2 p-4 flex items-center justify-center">
                <img src="https://placehold.co/300x300" alt="Contact Illustration" className="w-full h-auto"/>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}