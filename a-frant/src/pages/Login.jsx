import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import axiosInstance from '../../utils/axiosConfig';
import { AuthContext } from '../context/AuthContext';

const Login = () => {

    const [email, setEmail] = useState("ronak@gmail.com");
    const [password, setPassword] = useState("456123");
    const navigate = useNavigate()
    const { setUser } = useContext(AuthContext); // ✅ Correct usage


    const handleLogin = async (e) => {
        e.preventDefault()

        console.log(email);
        console.log(password);
        try {
            const response = await axiosInstance.post("api/auth/login", {
                email,
                password,
            });
            const data = response.data;

            console.log(data);
            
            (data.user);
            setUser(data.user); // ✅ Set user in context
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/');
        } catch (error) {
            const message =
                error.response?.data?.message || "Check your email and password again.";
            alert(message);
        }
    };
    return (
        <div>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center   sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 max-w">

                        <Link to={"/register"} className="font-medium text-blue-600 hover:text-blue-500">
                            create an account
                        </Link>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form onSubmit={handleLogin} className="space-y-6" action="#" method="POST">
                            <div>
                                <label for="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input id="email" name="email" type="email" autocomplete="email" required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        value={email}
                                        placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>

                            <div>
                                <label for="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input id="password" name="password" type="password" autocomplete="current-password" required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        value={password}
                                        placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember_me" name="remember_me" type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                    <label for="remember_me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">

                                    Sign in
                                </button>
                            </div>
                        </form>
                        <div className="mt-6">

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-gray-100 text-gray-500">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3">
                                <div>
                                    <a href="#"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                        <img className="h-5 w-5" src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                                            alt="" />
                                    </a>
                                </div>
                                <div>
                                    <a href="#"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                        <img className="h-5 w-5" src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                                            alt="" />
                                    </a>
                                </div>
                                <div>
                                    <a href="#"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                        <img className="h-6 w-6" src="https://www.svgrepo.com/show/506498/google.svg"
                                            alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login