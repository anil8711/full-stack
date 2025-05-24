import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { toast } from 'react-toastify';

const ContactUs = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, email, message };
        console.log(data)
        try {
            const response = await axiosInstance.post("/contact-us", data);

            if (response.status === 201) {
                toast.success('Contact created successfully')
                setName('');
                setEmail('');
                setMessage('');

            } else {
                alert("Error submitting user");
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
             toast.success("Something went wrong while submitting.");
        }
    }
    return (
        <div className=" mt-10 flex items-center justify-center ">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Contact Us</h2>


                <form onSubmit={handleSubmit} className="space-y-6" >
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            id="message"
                            rows="4"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Write your message here..."
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full  bg-purple-700 text-white py-2 px-4 rounded-md  hover:bg-purple-800 transition duration-300"
                    >
                        Send Message
                    </button>
                </form>


            </div>
        </div >
    );
};

export default ContactUs;
