import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Sign In');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleForm = () => {
    if (state === 'Sign In') {
      setState('Sign Up');
      navigate('/register');
    } else {
      setState('Sign In');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter valid credentials');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || 'Login failed!');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('isAdmin', data.isAdmin);

      if (data.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="font-[sans-serif] bg-gray-50 max-w-4xl flex items-center justify-center mx-auto md:h-screen p-6">
      <div className="grid md:grid-cols-3 items-center shadow-xl rounded-xl overflow-hidden bg-white p-8">
        <div className="flex flex-col justify-center space-y-8 text-white bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-l-xl">
          <div>
            <h4 className="text-2xl font-semibold">Get Started</h4>
            <p className="text-lg mt-3 leading-relaxed">
              Join our platform by logging in. It's quick and easy!
            </p>
          </div>
          <div>
            <h4 className="text-2xl font-semibold">Secure Login</h4>
            <p className="text-lg mt-3 leading-relaxed">
              Your security is our priority. Log in to continue.
            </p>
          </div>
        </div>
        <div className="md:col-span-2 w-full py-6 px-6 sm:px-16 max-md:max-w-xl mx-auto">
          <h3 className="text-gray-800 text-2xl font-bold">Log In to Your Account</h3>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <a href="#" onClick={toggleForm} className="ml-1 font-medium text-blue-500 hover:text-blue-400 transition duration-300">
              {state === 'Sign In' ? 'create an account' : 'sign in'}
            </a>
          </p>
          <div className="mt-8">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-700">
                  <input type="checkbox" className="mr-2 rounded text-blue-400 focus:ring-blue-500" />
                  Remember me
                </label>
                <a href="#" className="text-blue-500 hover:text-blue-400 transition duration-300">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-md font-medium text-lg hover:bg-blue-700 transition duration-300 shadow-lg"
              >
                {state === 'Sign In' ? 'Sign In' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
