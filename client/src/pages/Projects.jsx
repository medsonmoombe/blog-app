import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiExternalLink,
  HiCode,
  HiStar,
  HiArrowRight,
  HiLightningBolt,
} from 'react-icons/hi';
import { FaGithub, FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiJavascript, SiTypescript } from 'react-icons/si';

export default function Projects() {
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

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce application with payment integration, user authentication, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      demo: '#',
      featured: true,
      icons: [FaReact, FaNodeJs, SiMongodb],
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates, drag-and-drop interface, and team features.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      tags: ['React', 'TypeScript', 'Firebase'],
      github: '#',
      demo: '#',
      featured: true,
      icons: [FaReact, SiTypescript, FaDatabase],
    },
    {
      title: 'Weather Dashboard',
      description: 'Beautiful weather application with forecasts, interactive maps, and location-based recommendations.',
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80',
      tags: ['JavaScript', 'API', 'Tailwind'],
      github: '#',
      demo: '#',
      featured: false,
      icons: [SiJavascript, SiTailwindcss],
    },
    {
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media metrics with beautiful charts and real-time data visualization.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      tags: ['React', 'Chart.js', 'Node.js'],
      github: '#',
      demo: '#',
      featured: false,
      icons: [FaReact, FaNodeJs],
    },
    {
      title: 'Portfolio Website',
      description: 'Modern portfolio template with smooth animations, dark mode, and responsive design.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
      tags: ['React', 'Tailwind', 'Framer Motion'],
      github: '#',
      demo: '#',
      featured: false,
      icons: [FaReact, SiTailwindcss],
    },
    {
      title: 'Blog CMS',
      description: 'Content management system for blogs with markdown support, SEO optimization, and analytics.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
      tags: ['React', 'MongoDB', 'Express'],
      github: '#',
      demo: '#',
      featured: false,
      icons: [FaReact, SiMongodb, FaNodeJs],
    },
  ];

  const categories = [
    { name: 'All Projects', count: projects.length, active: true },
    { name: 'Featured', count: projects.filter(p => p.featured).length, active: false },
    { name: 'Web Apps', count: 4, active: false },
    { name: 'Tools', count: 2, active: false },
  ];

  return (
    <div className="font-inter">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
      <div className="glow-orb-1" style={{ top: '-300px', right: '-200px' }} />
      <div className="glow-orb-2" style={{ bottom: '-200px', left: '-150px' }} />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <div className="animate-fade-up">
                <span className="inline-block px-4 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-6">
                  Portfolio
                </span>
              </div>
              <h1 className="animate-fade-up-delay-1 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight mb-6">
                My{' '}
                <span className="gradient-text-purple">Projects</span>
              </h1>
              <p className="animate-fade-up-delay-2 text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                Build fun and engaging projects while learning HTML, CSS, and JavaScript! Here are some of the things I've built.
              </p>
              <div className="animate-fade-up-delay-3 flex flex-wrap gap-4 justify-center">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-white/10 dark:to-white/5 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-white/10"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>View on GitHub</span>
                </a>
                <Link
                  to="/search"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-transparent border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm hover:bg-gray-50 dark:hover:bg-white/5 hover:border-primary/40 transition-all duration-300"
                >
                  Read Articles
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="pb-20 reveal">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="glass-card rounded-2xl p-6 text-center">
                <div className="text-3xl font-semibold gradient-text mb-2">{projects.length}+</div>
                <div className="text-sm text-gray-500 dark:text-gray-600">Projects Built</div>
              </div>
              <div className="glass-card rounded-2xl p-6 text-center">
                <div className="text-3xl font-semibold gradient-text mb-2">10+</div>
                <div className="text-sm text-gray-500 dark:text-gray-600">Technologies</div>
              </div>
              <div className="glass-card rounded-2xl p-6 text-center">
                <div className="text-3xl font-semibold gradient-text mb-2">2K+</div>
                <div className="text-sm text-gray-500 dark:text-gray-600">GitHub Stars</div>
              </div>
              <div className="glass-card rounded-2xl p-6 text-center">
                <div className="text-3xl font-semibold gradient-text mb-2">50+</div>
                <div className="text-sm text-gray-500 dark:text-gray-600">Contributions</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Categories */}
        <section className="pb-12 reveal">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    category.active
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-white/5 border border-white/10 text-gray-600 dark:text-gray-400 hover:bg-white/10 hover:border-primary/30'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 opacity-60">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-12 reveal">
              <span className="inline-block px-4 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary-light border border-primary/20 mb-4">
                Featured
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                Highlighted Projects
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
                These are some of my favorite projects that showcase my skills and passion for web development.
              </p>
            </div>

            <div className="space-y-8">
              {projects
                .filter((p) => p.featured)
                .map((project, index) => (
                  <div
                    key={index}
                    className="glass-card rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-500 reveal"
                  >
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative aspect-video md:aspect-auto overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent" />
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 backdrop-blur-sm">
                            <HiStar className="w-3 h-3" />
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex gap-2 mb-4">
                          {project.icons.map((Icon, i) => (
                            <div
                              key={i}
                              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
                            >
                              <Icon className="w-5 h-5 text-primary-light" />
                            </div>
                          ))}
                        </div>
                        <h3 className="text-2xl font-semibold tracking-tight mb-3">{project.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          <a
                            href={project.demo}
                            className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                          >
                            <HiExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                          <a
                            href={project.github}
                            className="inline-flex items-center gap-2 px-5 py-2 bg-transparent border border-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm hover:bg-white/5 hover:border-primary/40 transition-all duration-300"
                          >
                            <FaGithub className="w-4 h-4" />
                            Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/5 to-transparent" />
        </div>

        {/* All Projects Grid */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-12 reveal">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                More Projects
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
                Explore more of my work and see what I've been building lately.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((p) => !p.featured)
                .map((project, index) => (
                  <div
                    key={index}
                    className="glass-card rounded-2xl overflow-hidden group reveal"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex gap-2 mb-2">
                          {project.icons.slice(0, 3).map((Icon, i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                            >
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold tracking-tight mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={project.demo}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 text-primary-light rounded-xl font-medium text-sm hover:bg-primary/20 transition-all duration-300"
                        >
                          <HiExternalLink className="w-4 h-4" />
                          Demo
                        </a>
                        <a
                          href={project.github}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm hover:bg-white/10 transition-all duration-300"
                        >
                          <FaGithub className="w-4 h-4" />
                          Code
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 reveal">
          <div className="max-w-6xl mx-auto px-6">
            <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-96 h-96 opacity-10"
                style={{
                  background: 'radial-gradient(circle, #8B5CF6, transparent 70%)',
                  filter: 'blur(80px)',
                }}
              />
              <div className="relative z-10 text-center">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-purple-500/10 border border-purple-500/20">
                  <HiLightningBolt className="w-7 h-7 text-purple-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
                  Want to Learn How I Built These?
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
                  Check out my blog for detailed tutorials and insights on web development.
                </p>
                <Link
                  to="/search"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>Read Tutorials</span>
                  <HiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}