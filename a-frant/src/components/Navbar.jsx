import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                <Link to="/" className="flex items-center">
                    <img
                        src="https://www.svgrepo.com/show/499962/music.svg"
                        className="h-6 mr-3 sm:h-9"
                        alt="Logo"
                    />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        Landwind
                    </span>
                </Link>

                <div className="flex items-center lg:order-2">
                    {user ? (
                        <>
                            <span className="text-gray-700 dark:text-white mr-4">
                                Hello, {user.name}
                            </span>
                            <Link to="/logout"
                                onClick={logout}
                                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none"
                            >
                                Logout
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 mr-2 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="text-purple-700 border border-purple-700 hover:bg-purple-700 hover:text-white focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 dark:border-purple-500 dark:text-purple-500 dark:hover:text-white dark:hover:bg-purple-600 focus:outline-none dark:focus:ring-purple-800"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1">
                    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <Link
                                to="/"
                                className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="block py-2 pl-3 pr-4 text-gray-700 hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/services"
                                className="block py-2 pl-3 pr-4 text-gray-700 hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white"
                            >
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact-us"
                                className="block py-2 pl-3 pr-4 text-gray-700 hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
