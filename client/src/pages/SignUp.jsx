import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { HiMail, HiLockClosed, HiUser, HiArrowRight, HiExclamationCircle, HiCheckCircle } from 'react-icons/hi';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      // Handle validation errors from express-validator
      if (data.errors && Array.isArray(data.errors)) {
        const errorMessages = data.errors.map(err => err.message).join('. ');
        setLoading(false);
        return setErrorMessage(errorMessages);
      }
      
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      
      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="font-inter min-h-screen">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
      <div className="glow-orb-1" style={{ top: '-300px', left: '-200px' }} />
      <div className="glow-orb-2" style={{ bottom: '-200px', right: '-150px' }} />

      <main className="relative z-10 flex items-center justify-center min-h-screen py-20 px-6">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Form */}
            <div className="w-full lg:order-2">
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
                    Create Account
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Join our community and start sharing your knowledge.
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
                  {/* Username Input */}
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Username
                    </label>
                    <div className="relative">
                      <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-600" />
                      <input
                        type="text"
                        id="username"
                        placeholder="johndoe"
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 rounded-xl text-sm bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>

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
                    <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Password
                    </label>
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

                  {/* Sign Up Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign Up</span>
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

                {/* Sign In Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link
                      to="/sign-in"
                      className="font-medium text-primary-light hover:text-white transition-colors"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Branding */}
            <div className="hidden lg:block lg:order-1">
              <div className="animate-fade-up">
                <span className="inline-block px-4 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-6">
                  Join Us
                </span>
              </div>
              <h1 className="animate-fade-up-delay-1 text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-6">
                Start your journey with{' '}
                <span className="gradient-text-purple">Emmanuel's Blog</span>
              </h1>
              <p className="animate-fade-up-delay-2 text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                Create an account to unlock all features and become part of our growing developer community.
              </p>

              {/* Benefits */}
              <div className="animate-fade-up-delay-3 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                    <HiCheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Free Forever</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No credit card required. Start learning and sharing immediately.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <HiCheckCircle className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Exclusive Content</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Access premium tutorials and resources for members only.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <HiCheckCircle className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Community Support</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Get help from experienced developers and grow together.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="animate-fade-up-delay-4 grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200 dark:border-white/5">
                <div>
                  <div className="text-2xl font-semibold gradient-text">1.2K+</div>
                  <div className="text-xs text-gray-500 dark:text-gray-600 mt-1">Members</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold gradient-text">50+</div>
                  <div className="text-xs text-gray-500 dark:text-gray-600 mt-1">Articles</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold gradient-text">10K+</div>
                  <div className="text-xs text-gray-500 dark:text-gray-600 mt-1">Comments</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
