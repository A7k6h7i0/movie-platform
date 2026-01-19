import { motion } from 'framer-motion';
import { FiAlertTriangle, FiInfo, FiShield, FiExternalLink, FiCheckCircle } from 'react-icons/fi';
import SEO from '../../components/seo/SEO';

const Disclaimer = () => {
  const sections = [
    {
      icon: <FiInfo className="text-blue-400" size={28} />,
      title: "Platform Purpose",
      content: [
        "MovieHub is strictly an informational and educational platform designed to help users discover movies and connect with official streaming services.",
        "We DO NOT host, upload, store, stream, or distribute any movies, TV shows, web series, or any copyrighted media content on our servers.",
        "MovieHub functions solely as a movie discovery and information aggregator, acting as a bridge between users and legitimate content providers.",
      ]
    },
    {
      icon: <FiShield className="text-green-400" size={28} />,
      title: "Content Sources & Copyright",
      content: [
        "All movie information, metadata, images, posters, ratings, and trailers displayed on this website are sourced from publicly available third-party APIs including The Movie Database (TMDB), YouTube, and other licensed data providers.",
        "MovieHub does not claim ownership of any media content, images, logos, or trademarks displayed on this platform. All intellectual property rights belong to their respective copyright holders and production studios.",
        "We operate under fair use principles for informational and educational purposes only.",
      ]
    },
    {
      icon: <FiExternalLink className="text-yellow-400" size={28} />,
      title: "External Links & Third-Party Services",
      content: [
        "MovieHub may provide external links redirecting users to official streaming platforms, production studios, or authorized content distributors.",
        "We have no control over the content, availability, pricing, or policies of third-party websites and platforms.",
        "MovieHub is not responsible for any transactions, subscriptions, or interactions you have with external platforms.",
        "All links are provided for convenience and informational purposes only and do not constitute endorsement.",
      ]
    },
    {
      icon: <FiAlertTriangle className="text-red-400" size={28} />,
      title: "Anti-Piracy Commitment",
      content: [
        "MovieHub strictly opposes and does not support, promote, or facilitate piracy in any form.",
        "We do not provide download links, torrent files, streaming URLs, or any unauthorized access to copyrighted content.",
        "Users are encouraged to access content only through legal and authorized platforms.",
        "We respect intellectual property rights and comply with applicable copyright laws including DMCA regulations.",
      ]
    },
    {
      icon: <FiCheckCircle className="text-purple-400" size={28} />,
      title: "Accuracy & Liability Disclaimer",
      content: [
        "While we strive to provide accurate and up-to-date information, MovieHub makes no warranties or guarantees regarding the completeness, reliability, accuracy, or timeliness of any content displayed.",
        "Information such as release dates, ratings, cast details, and availability may change without notice.",
        "Under no circumstances shall MovieHub, its owners, developers, or contributors be liable for any direct, indirect, incidental, or consequential damages arising from the use of this website.",
        "Your use of MovieHub is entirely at your own risk and discretion.",
      ]
    },
    {
      icon: <FiShield className="text-indigo-400" size={28} />,
      title: "Copyright Infringement Notice",
      content: [
        "If you are a copyright owner or authorized representative and believe that content referenced on MovieHub infringes upon your intellectual property rights, please contact us immediately.",
        "Provide detailed information including: (1) Description of copyrighted work, (2) URL of allegedly infringing content, (3) Your contact information, (4) Statement of good faith belief.",
        "We will investigate all legitimate claims and take appropriate action in accordance with applicable laws, including removal of references if necessary.",
      ]
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <SEO
        title="Disclaimer - MovieHub"
        description="Important legal disclaimer and terms of use for MovieHub platform"
      />

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full mb-6 shadow-lg shadow-red-600/30">
              <FiAlertTriangle size={36} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
              Legal Disclaimer
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
              Please read this disclaimer carefully before using MovieHub services
            </p>
            <div className="mt-6 inline-block bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-6 py-3">
              <p className="text-yellow-400 text-sm font-medium">
                Last Updated: January 19, 2026
              </p>
            </div>
          </motion.div>

          {/* Important Notice Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <FiAlertTriangle className="text-red-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Important Notice</h3>
                <p className="text-gray-300 leading-relaxed">
                  MovieHub is NOT a streaming platform. We do not host, provide, or distribute any copyrighted content. 
                  This platform is purely for movie information discovery and redirects users to official, licensed streaming services only.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Disclaimer Sections */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {sections.map((section, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-md border border-gray-800 rounded-xl p-6 md:p-8 hover:border-gray-700 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4">
                      {section.title}
                    </h2>
                    <div className="space-y-3">
                      {section.content.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-gray-300 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* User Responsibility Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-8 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <FiCheckCircle className="text-purple-400" size={28} />
              User Consent & Responsibility
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>
                By accessing and using MovieHub, you acknowledge and agree that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You have read, understood, and agree to comply with this disclaimer</li>
                <li>You will use this platform for informational purposes only</li>
                <li>You are solely responsible for your actions and how you interpret the information provided</li>
                <li>You will access copyrighted content only through legal, authorized channels</li>
                <li>You understand MovieHub is not liable for any decisions or actions you take based on information found here</li>
              </ul>
            </div>
          </motion.div>

          {/* Updates Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-8 bg-gray-800/30 border border-gray-700 rounded-lg p-6 backdrop-blur-sm"
          >
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <FiInfo className="text-blue-400" />
              Disclaimer Updates
            </h3>
            <p className="text-gray-400 text-sm">
              This disclaimer may be updated or modified at any time without prior notice. 
              Users are encouraged to review this page periodically to stay informed about any changes. 
              Continued use of MovieHub after changes constitutes acceptance of the updated disclaimer.
            </p>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="mt-8 text-center"
          >
            <div className="inline-block bg-gradient-to-r from-red-600/10 to-orange-600/10 border border-red-600/30 rounded-lg px-8 py-4">
              <p className="text-gray-300 text-sm mb-2">
                For copyright concerns or legal inquiries, please contact us through our{' '}
                <a href="/dmca" className="text-red-400 hover:text-red-300 underline transition-colors">
                  DMCA page
                </a>
              </p>
            </div>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-12 pt-8 border-t border-gray-800 text-center"
          >
            <p className="text-gray-500 text-sm">
              © 2026 MovieHub. All rights reserved. This platform respects intellectual property rights and operates in compliance with applicable laws.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Disclaimer;
