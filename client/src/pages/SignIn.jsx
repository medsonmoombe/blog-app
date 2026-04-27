import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import { HiMail, HiLockClosed, HiArrowRight, HiExclamationCircle } from 'react-icons/hi';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      // Handle validation errors from express-validator
      if (data.errors && Array.isArray(data.errors)) {
        const errorMessages = data.errors.map(err => err.message).join('. ');
        return dispatch(signInFailure(errorMessages));
      }
      
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="font-inter min-h-screen">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
      <div className="glow-orb-1" style={{ top: '-300px', right: '-200px' }} />
      <div className="glow-orb-2" style={{ bottom: '-200px', left: '-150px' }} />

      <main className="relative z-10 flex items-center justify-center min-h-screen py-20 px-6">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Branding */}
            <div className="hidden lg:block">
              <div className="animate-fade-up">
                <span className="inline-block px-4 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary-light border border-primary/20 mb-6">
                  Welcome Back
                </span>
              </div>
              <h1 className="animate-fade-up-delay-1 text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-6">
                Sign in to{' '}
                <span className="gradient-text">Emmanuel's Blog</span>
              </h1>
              <p className="animate-fade-up-delay-2 text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                Access your account to create posts, leave comments, and engage with the community.
              </p>

              {/* Features */}
              <div className="animate-fade-up-delay-3 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <HiArrowRight className="w-5 h-5 text-primary-light" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Create & Share</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Write articles and share your knowledge with the community
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <HiArrowRight className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Engage & Connect</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Comment on posts and connect with other developers
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <HiArrowRight className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Track Progress</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Save your favorite articles and track your learning journey
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full">
              <div className="glass-card rounded-3xl p-8 md:p-10">
                {/* Mobile Logo */}
                <div className="lg:hidden mb-8 text-center">
                  <Link to="/" className="inline-block">
                    <h2 className="text-2xl font-bold">
                      <span className="px-3 py-1 bg-gradient-to-r from-primary to-primary-dark rounded-xl text-white">
                        Emmanuel's
                      </span>
                      {' '}Blog
                    </h2>
                  </Link>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                    Sign In
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Welcome back! Please enter your details.
                  </p>
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                    <HiExclamationCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-400">{errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-600" />
                      <input
                        type="email"
                        id="email"
                        placeholder="name@company.com"
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 rounded-xl text-sm bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-xs font-medium text-primary-light hover:text-primary transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-600" />
                      <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 rounded-xl text-sm bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Sign In Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <HiArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white dark:bg-[#050505] text-gray-500 dark:text-gray-600">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* OAuth */}
                  <OAuth />
                </form>

                {/* Sign Up Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link
                      to="/sign-up"
                      className="font-medium text-primary-light hover:text-white transition-colors"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
