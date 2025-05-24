import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-screen-xl mx-auto p-4 py-10 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo & Description */}
                    <div>
                        <Link to="/" className="flex items-center mb-4">
                            <img
                                src="https://www.svgrepo.com/show/499962/music.svg"
                                className="h-8 mr-2"
                                alt="Logo"
                            />
                            <span className="text-xl font-semibold dark:text-white">Landwind</span>
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Your go-to platform for immersive music experiences and creative audio solutions.
                        </p>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">Useful Links</h3>
                        <ul className="text-gray-600 dark:text-gray-400">
                            <li className="mb-2">
                                <Link to="/about" className="hover:underline">About Us</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/services" className="hover:underline">Services</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/contact-us" className="hover:underline">Contact</Link>
                            </li>
                            <li>
                                <Link to="/faq" className="hover:underline">FAQ</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h3>
                        <ul className="text-gray-600 dark:text-gray-400">
                            <li className="mb-2">
                                <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/terms" className="hover:underline">Terms & Conditions</Link>
                            </li>
                            <li>
                                <Link to="/licensing" className="hover:underline">Licensing</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow Us</h3>
                        <div className="flex space-x-6">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <hr className="my-6 border-gray-200 dark:border-gray-700" />
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} <Link to="/" className="hover:underline">Landwind™</Link>. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
