import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HiCode,
  HiLightningBolt,
  HiHeart,
  HiUsers,
  HiArrowRight,
  HiMail,
} from 'react-icons/hi';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function About() {
  useEffect(() => {
    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: 'JavaScript', level: 95 },
    { name: 'React', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'MongoDB', level: 85 },
    { name: 'Tailwind CSS', level: 90 },
  ];

  const values = [
    {
      icon: HiCode,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code is my priority.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: HiLightningBolt,
      title: 'Fast Learning',
      description: 'Always exploring new technologies and staying up-to-date with trends.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: HiHeart,
      title: 'Passion',
      description: 'Deeply passionate about web development and creating amazing experiences.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: HiUsers,
      title: 'Community',
      description: 'Believe in sharing knowledge and helping others grow in their journey.',
      color: 'from-purple-500 to-indigo-500',
    },
  ];

  return (
    <div className="font-inter">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
      <div className="glow-orb-1" style={{ top: '-300px', left: '-200px' }} />
      <div className="glow-orb-2" style={{ bottom: '-200px', right: '-150px' }} />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <div className="animate-fade-up">
                <span className="inline-block px-4 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary-light border border-primary/20 mb-6">
                  About Me
                </span>
              </div>
              <h1 className="animate-fade-up-delay-1 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight mb-6">
                Hi, I'm{' '}
                <span className="gradient-text">Emmanuel</span>
              </h1>
              <p className="animate-fade-up-delay-2 text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                A passionate web developer who loves to write about technology, coding, and everything in between. Welcome to my corner of the internet!
              </p>
              <div className="animate-fade-up-delay-3 flex flex-wrap gap-4 justify-center">
                <Link
                  to="/search"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>Read My Articles</span>
                  <HiArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-transparent border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm hover:bg-gray-50 dark:hover:bg-white/5 hover:border-primary/40 transition-all duration-300"
                >
                  <HiMail className="w-4 h-4" />
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 reveal">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Image/Illustration */}
              <div className="relative">
                <div className="glass-card rounded-3xl p-8 aspect-square flex items-center justify-center relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: 'radial-gradient(circle, #5F8D75, transparent 70%)',
                      filter: 'blur(60px)',
                    }}
                  />
                  <div className="relative z-10 text-center">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-6xl font-bold text-white shadow-2xl shadow-primary/30">
                      E
                    </div>
                    <div className="flex gap-4 justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <HiCode className="w-8 h-8 text-blue-400" />
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                        <HiLightningBolt className="w-8 h-8 text-purple-400" />
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                        <HiHeart className="w-8 h-8 text-pink-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Content */}
              <div>
                <span className="inline-block px-4 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">
                  My Story
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
                  Building the web,{' '}
                  <span className="gradient-text-purple">one line at a time</span>
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p>
                    Welcome to Emmanuel's Blog! This blog was created as a personal project to share thoughts, ideas, and knowledge with the world. As a passionate developer, I love exploring the endless possibilities of web development.
                  </p>
                  <p>
                    On this blog, you'll find weekly articles and tutorials on topics such as web development, software engineering, and programming languages. I'm always learning and exploring new technologies, so be sure to check back often for fresh content!
                  </p>
                  <p>
                    I believe that a community of learners can help each other grow and improve. That's why I encourage you to leave comments, engage with other readers, and share your own experiences. Together, we can build something amazing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/5 to-transparent" />
        </div>

        {/* Values Section */}
        <section className="py-20 reveal">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary-light border border-primary/20 mb-4">
                Core Values
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                What I Stand For
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                These principles guide my work and shape how I approach every project and article.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
                >
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center shadow-lg`}>
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/5 to-transparent" />
        </div>

        {/* Skills Section */}
        <section className="py-20 reveal">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Content */}
              <div>
                <span className="inline-block px-4 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 mb-4">
                  Expertise
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
                  Technologies I{' '}
                  <span className="gradient-text">Love Working With</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                  Over the years, I've worked with various technologies and frameworks. Here are some of the tools I use most frequently to bring ideas to life.
                </p>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 text-primary-light hover:text-white transition-colors group"
                >
                  View My Projects
                  <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Right - Skills */}
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="glass-card rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-sm">{skill.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/5 to-transparent" />
        </div>

        {/* Contact Section */}
        <section id="contact" className="py-20 reveal">
          <div className="max-w-6xl mx-auto px-6">
            <div className="glass-card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 opacity-15"
                style={{
                  background: 'radial-gradient(circle, #5F8D75, transparent 70%)',
                  filter: 'blur(60px)',
                }}
              />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-primary/10 border border-primary/20">
                  <HiMail className="w-6 h-6 text-primary-light" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
                  Let's Connect
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
                  Have a question or want to work together? Feel free to reach out through any of these platforms.
                </p>

                <div className="flex gap-4 justify-center">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-gray-600 dark:text-gray-400 hover:bg-primary/10 hover:border-primary/30 hover:text-primary-light hover:-translate-y-1 transition-all duration-300"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-gray-600 dark:text-gray-400 hover:bg-primary/10 hover:border-primary/30 hover:text-primary-light hover:-translate-y-1 transition-all duration-300"
                  >
                    <FaTwitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-gray-600 dark:text-gray-400 hover:bg-primary/10 hover:border-primary/30 hover:text-primary-light hover:-translate-y-1 transition-all duration-300"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 reveal">
          <div className="max-w-6xl mx-auto px-6">
            <div className="glass-card rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
                Explore my articles and tutorials to level up your web development skills.
              </p>
              <Link
                to="/search"
                className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Browse All Articles</span>
                <HiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
