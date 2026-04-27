import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsLinkedin } from 'react-icons/bs';
import { HiPencil, HiHeart, HiCode } from 'react-icons/hi';

export default function FooterCom() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-white/5 relative z-10 bg-white dark:bg-[#050505]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark">
                <HiPencil className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-semibold tracking-tight">Emmanuel's Blog</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-500 leading-relaxed">
              Exploring web development, sharing knowledge, one article at a time.
            </p>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-500 mb-4">
              About
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-600 dark:text-gray-500 hover:text-primary-light transition-colors"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-sm text-gray-600 dark:text-gray-500 hover:text-primary-light transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <a
                  href="https://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 dark:text-gray-500 hover:text-primary-light transition-colors"
                >
                  100 JS Projects
                </a>
              </li>
              <li>
                <Link
                  to="/search"
                  className="text-sm text-gray-600 dark:text-gray-500 hover:text-primary-light transition-colors"
                >
                  All Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-500 mb-4">
              Follow Us
            </h4>
            <div className="flex gap-3">
              <a
                href="https://github.com/medsonmoombe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-500 hover:bg-primary/10 hover:border-primary/30 hover:text-primary-light hover:-translate-y-1 transition-all duration-300"
              >
                <BsGithub className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-500 hover:bg-primary/10 hover:border-primary/30 hover:text-primary-light hover:-translate-y-1 transition-all duration-300"
              >
                <BsTwitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-500 hover:bg-primary/10 hover:border-primary/30 hover:text-primary-light hover:-translate-y-1 transition-all duration-300"
              >
                <BsLinkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-500 hover:bg-primary/10 hover:border-primary/30 hover:text-primary-light hover:-translate-y-1 transition-all duration-300"
              >
                <BsFacebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-500 mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-gray-500 hover:text-primary-light transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-gray-500 hover:text-primary-light transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-gray-500 hover:text-primary-light transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/5 to-transparent mt-12 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600 dark:text-gray-500">
            © {currentYear} Emmanuel's Blog. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-500">
            <span>Built with</span>
            <HiHeart className="w-3 h-3 text-primary" />
            <span>and lots of</span>
            <HiCode className="w-3 h-3 text-purple-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
