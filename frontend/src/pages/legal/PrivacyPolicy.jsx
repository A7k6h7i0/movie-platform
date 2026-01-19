import { motion } from 'framer-motion';
import { FiLock, FiEye, FiDatabase, FiShield, FiUsers, FiGlobe, FiCheckCircle } from 'react-icons/fi';
import SEO from '../../components/seo/SEO';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <FiEye className="text-blue-400" size={28} />,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Automatically Collected Data",
          points: [
            "Browser type and version",
            "Device information (type, operating system)",
            "IP address (anonymized for analytics)",
            "Pages visited and time spent on our website",
            "Referring website URL"
          ]
        },
        {
          subtitle: "Information You Provide",
          points: [
            "Search queries for movie discovery",
            "Preferences you set (optional)",
            "No personal registration required - we do not collect names, emails, or passwords"
          ]
        }
      ]
    },
    {
      icon: <FiDatabase className="text-green-400" size={28} />,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Primary Uses",
          points: [
            "Improve website functionality and user experience",
            "Analyze usage patterns to enhance content discovery",
            "Provide personalized movie recommendations (optional)",
            "Monitor and prevent fraudulent activity",
            "Comply with legal obligations"
          ]
        }
      ]
    },
    {
      icon: <FiShield className="text-purple-400" size={28} />,
      title: "Data Protection & Security",
      content: [
        {
          subtitle: "Our Commitment",
          points: [
            "We implement industry-standard security measures to protect your data",
            "SSL encryption for all data transmission",
            "Regular security audits and updates",
            "Limited access to user data by authorized personnel only",
            "We do not sell, rent, or share your personal information with third parties for marketing purposes"
          ]
        }
      ]
    },
    {
      icon: <FiGlobe className="text-yellow-400" size={28} />,
      title: "Third-Party Services",
      content: [
        {
          subtitle: "External Platforms",
          points: [
            "MovieHub uses The Movie Database (TMDB) API for movie information",
            "YouTube API for official trailers (embedded videos)",
            "Google Analytics for website traffic analysis (anonymized)",
            "These services have their own privacy policies which govern their data collection practices"
          ]
        },
        {
          subtitle: "Cookies & Tracking",
          points: [
            "We use cookies to improve your browsing experience",
            "Analytics cookies help us understand user behavior",
            "You can disable cookies in your browser settings",
            "Some features may not work properly without cookies"
          ]
        }
      ]
    },
    {
      icon: <FiUsers className="text-red-400" size={28} />,
      title: "Your Rights & Choices",
      content: [
        {
          subtitle: "User Control",
          points: [
            "Access: Request information about data we've collected about you",
            "Deletion: Request deletion of your data from our systems",
            "Opt-Out: Disable analytics tracking via browser settings",
            "Correction: Update or correct any inaccurate information",
            "Portability: Request a copy of your data in a common format"
          ]
        }
      ]
    },
    {
      icon: <FiCheckCircle className="text-indigo-400" size={28} />,
      title: "Children's Privacy",
      content: [
        {
          subtitle: "Age Restrictions",
          points: [
            "MovieHub is intended for users aged 13 and above",
            "We do not knowingly collect information from children under 13",
            "If we discover we've collected data from a child under 13, we will delete it immediately",
            "Parents or guardians can contact us to request deletion of their child's data"
          ]
        }
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Privacy Policy - MovieHub"
        description="Learn how MovieHub collects, uses, and protects your data and personal information"
      />

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-green-600/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse delay-700"></div>
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-full mb-6 shadow-lg shadow-green-600/30">
              <FiLock size={36} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
              Your privacy matters to us. Learn how we collect, use, and protect your information.
            </p>
            <div className="mt-6 inline-block bg-green-500/10 border border-green-500/30 rounded-lg px-6 py-3">
              <p className="text-green-400 text-sm font-medium">
                Last Updated: January 19, 2026
              </p>
            </div>
          </motion.div>

          {/* Privacy Commitment Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <FiShield className="text-green-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Our Privacy Commitment</h3>
                <p className="text-gray-300 leading-relaxed mb-2">
                  MovieHub is committed to protecting your privacy and maintaining transparency about our data practices. We do not sell your personal information to third parties.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  <strong className="text-white">Key Point:</strong> MovieHub helps streaming platforms reach their audience by providing movie discovery services - we act as an informational bridge between users and official content providers without collecting unnecessary personal data.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Privacy Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-gray-800 rounded-xl p-6 md:p-8 hover:border-gray-700 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="mb-4 last:mb-0">
                        {item.subtitle && (
                          <h3 className="text-lg font-semibold text-gray-200 mb-2">{item.subtitle}</h3>
                        )}
                        <ul className="space-y-2">
                          {item.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start gap-2 text-gray-300">
                              <span className="text-green-400 mt-1.5">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Data Retention */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-8 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <FiDatabase className="text-purple-400" size={28} />
              Data Retention & Deletion
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>
                We retain your information only for as long as necessary to provide our services and comply with legal obligations.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Analytics data is anonymized and retained for up to 12 months</li>
                <li>Search history and preferences are stored locally in your browser</li>
                <li>You can clear this data at any time through your browser settings</li>
                <li>Deleted data is permanently removed from our systems within 30 days</li>
              </ul>
            </div>
          </motion.div>

          {/* Changes to Policy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-8 bg-gray-800/30 border border-gray-700 rounded-lg p-6 backdrop-blur-sm"
          >
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <FiCheckCircle className="text-blue-400" />
              Changes to This Policy
            </h3>
            <p className="text-gray-400 text-sm">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
              We will notify users of any material changes by posting the new policy on this page with an updated "Last Updated" date. 
              Your continued use of MovieHub after changes constitutes acceptance of the updated policy.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="mt-8 text-center"
          >
            <div className="inline-block bg-gradient-to-r from-green-600/10 to-blue-600/10 border border-green-600/30 rounded-lg px-8 py-4">
              <p className="text-gray-300 text-sm mb-2">
                Questions about our privacy practices? Contact us at{' '}
                <a href="mailto:privacy@moviehub.com" className="text-green-400 hover:text-green-300 underline transition-colors">
                  privacy@moviehub.com
                </a>
              </p>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-12 pt-8 border-t border-gray-800 text-center"
          >
            <p className="text-gray-500 text-sm">
              © 2026 MovieHub. We respect your privacy and are committed to protecting your personal information.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
