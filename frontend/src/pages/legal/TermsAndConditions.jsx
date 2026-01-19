import { motion } from 'framer-motion';
import { FiFileText, FiAlertTriangle, FiUsers, FiLink, FiXCircle, FiCheckCircle, FiRefreshCw } from 'react-icons/fi';
import SEO from '../../components/seo/SEO';

const TermsAndConditions = () => {
  const sections = [
    {
      icon: <FiCheckCircle className="text-green-400" size={28} />,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using MovieHub, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.",
        "If you do not agree with any part of these terms, you must immediately discontinue use of our services.",
        "These terms constitute a legally binding agreement between you (the user) and MovieHub.",
        "Your continued use of the platform constitutes ongoing acceptance of these terms and any future modifications."
      ]
    },
    {
      icon: <FiFileText className="text-blue-400" size={28} />,
      title: "Service Description & Use of Content",
      content: [
        "MovieHub is an informational platform that provides movie discovery services by aggregating publicly available data from third-party sources.",
        "We DO NOT host, upload, stream, or distribute any copyrighted movies, TV shows, or media files.",
        "All movie information, images, posters, ratings, and trailers are sourced from licensed third-party APIs including The Movie Database (TMDB) and YouTube.",
        "MovieHub acts solely as a bridge to help platforms reach their audience by directing users to official streaming services.",
        "You may use MovieHub for personal, non-commercial purposes only."
      ]
    },
    {
      icon: <FiLink className="text-yellow-400" size={28} />,
      title: "Third-Party Services & External Links",
      content: [
        "MovieHub may provide links to third-party websites and streaming platforms for your convenience.",
        "We have no control over the content, policies, or practices of these external platforms.",
        "We are not responsible for the availability, accuracy, legality, or quality of content on third-party websites.",
        "Any transactions, subscriptions, or interactions with third-party platforms are solely between you and that platform.",
        "External links do not imply endorsement, sponsorship, or affiliation unless explicitly stated."
      ]
    },
    {
      icon: <FiUsers className="text-purple-400" size={28} />,
      title: "User Conduct & Responsibilities",
      content: [
        "You agree to use MovieHub in accordance with all applicable laws and regulations.",
        "You may not use our platform for any illegal or unauthorized purpose.",
        "Prohibited activities include but are not limited to:",
        "  • Attempting to access restricted areas of the website",
        "  • Interfering with the proper functioning of the platform",
        "  • Uploading malicious code, viruses, or harmful content",
        "  • Scraping, harvesting, or extracting data without authorization",
        "  • Impersonating others or providing false information",
        "  • Using automated systems (bots) without permission",
        "We reserve the right to terminate access for users who violate these terms."
      ]
    },
    {
      icon: <FiXCircle className="text-red-400" size={28} />,
      title: "Intellectual Property Rights",
      content: [
        "All content on MovieHub, including but not limited to text, design, graphics, logos, and code, is the property of MovieHub or its licensors.",
        "Movie-related content (posters, descriptions, trailers) is owned by respective studios and distributors.",
        "You may not copy, reproduce, distribute, modify, or create derivative works from our platform without written permission.",
        "The MovieHub name, logo, and branding are trademarks and may not be used without authorization.",
        "We respect intellectual property rights and expect users to do the same."
      ]
    },
    {
      icon: <FiAlertTriangle className="text-orange-400" size={28} />,
      title: "Limitation of Liability",
      content: [
        "MovieHub is provided on an 'AS IS' and 'AS AVAILABLE' basis without warranties of any kind, either express or implied.",
        "We do not guarantee that the platform will be uninterrupted, error-free, secure, or free from viruses.",
        "To the fullest extent permitted by law, MovieHub shall not be liable for any:",
        "  • Direct, indirect, incidental, or consequential damages",
        "  • Loss of profits, data, or business opportunities",
        "  • Damages resulting from use or inability to use our services",
        "  • Damages arising from third-party content or external links",
        "Your sole remedy for dissatisfaction with MovieHub is to stop using the platform.",
        "Some jurisdictions do not allow limitation of liability, so these limitations may not apply to you."
      ]
    },
    {
      icon: <FiRefreshCw className="text-indigo-400" size={28} />,
      title: "Modifications & Updates",
      content: [
        "We reserve the right to modify, suspend, or discontinue any aspect of MovieHub at any time without prior notice.",
        "These Terms and Conditions may be updated periodically to reflect changes in our practices or legal requirements.",
        "Material changes will be indicated by updating the 'Last Updated' date at the top of this page.",
        "Your continued use of MovieHub after modifications constitutes acceptance of the updated terms.",
        "We encourage you to review these terms regularly to stay informed."
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Terms & Conditions - MovieHub"
        description="Terms of service, user agreements, and legal conditions for using MovieHub platform"
      />

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse delay-700"></div>
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-full mb-6 shadow-lg shadow-indigo-600/30">
              <FiFileText size={36} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Terms & Conditions
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
              Legal agreement governing your use of MovieHub services
            </p>
            <div className="mt-6 inline-block bg-indigo-500/10 border border-indigo-500/30 rounded-lg px-6 py-3">
              <p className="text-indigo-400 text-sm font-medium">
                Effective Date: January 19, 2026
              </p>
            </div>
          </motion.div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <FiAlertTriangle className="text-indigo-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Please Read Carefully</h3>
                <p className="text-gray-300 leading-relaxed">
                  These Terms and Conditions constitute a legally binding agreement. By accessing or using MovieHub, 
                  you agree to comply with these terms in their entirety. If you disagree with any provision, 
                  please discontinue use of our platform immediately.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Terms Sections */}
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
          </div>

          {/* Governing Law */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-8 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-8 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <FiFileText className="text-blue-400" size={28} />
              Governing Law & Dispute Resolution
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>
                These Terms and Conditions shall be governed by and construed in accordance with the laws of India, 
                without regard to its conflict of law provisions.
              </p>
              <p>
                Any disputes arising from or relating to these terms or your use of MovieHub shall be resolved through:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Good faith negotiations between the parties</li>
                <li>Mediation, if negotiations fail</li>
                <li>Binding arbitration in Hyderabad, India</li>
              </ul>
              <p className="text-sm text-gray-400">
                You agree to waive any right to a jury trial or to participate in a class action lawsuit.
              </p>
            </div>
          </motion.div>

          {/* Severability */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="mt-8 bg-gray-800/30 border border-gray-700 rounded-lg p-6 backdrop-blur-sm"
          >
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <FiCheckCircle className="text-green-400" />
              Severability & Entire Agreement
            </h3>
            <div className="space-y-2 text-gray-400 text-sm">
              <p>
                If any provision of these terms is found to be unenforceable or invalid, that provision will be limited 
                or eliminated to the minimum extent necessary so that the remaining terms remain in full force and effect.
              </p>
              <p>
                These Terms and Conditions, together with our Privacy Policy and Disclaimer, constitute the entire 
                agreement between you and MovieHub regarding the use of our services.
              </p>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-8 text-center"
          >
            <div className="inline-block bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-600/30 rounded-lg px-8 py-4">
              <p className="text-gray-300 text-sm mb-2">
                Questions about these terms? Contact us at{' '}
                <a href="mailto:legal@moviehub.com" className="text-indigo-400 hover:text-indigo-300 underline transition-colors">
                  legal@moviehub.com
                </a>
              </p>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="mt-12 pt-8 border-t border-gray-800 text-center"
          >
            <p className="text-gray-500 text-sm">
              © 2026 MovieHub. All rights reserved. By using our platform, you agree to these terms and conditions.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;
