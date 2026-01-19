import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiAlertCircle, FiMail, FiFileText, FiCheckSquare, FiClock, FiUser, FiPhone, FiMapPin, FiLink, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import SEO from '../../components/seo/SEO';
import { submitDmcaComplaint } from '../../api/dmca';

const DMCA = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    copyrightOwner: '',
    copyrightWorkDescription: '',
    infringingContent: '',
    infringingUrl: '',
    goodFaithStatement: false,
    accuracyStatement: false,
    authorizedStatement: false,
    digitalSignature: ''
  });

  const requirements = [
    "A physical or electronic signature of the copyright owner or authorized representative",
    "Identification and description of the copyrighted work claimed to have been infringed",
    "Identification of the material claimed to be infringing, including its URL or location on our website",
    "Your contact information including name, address, telephone number, and email address",
    "A statement that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law",
    "A statement, made under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorized to act on their behalf"
  ];

  const process = [
    {
      icon: <FiFileText className="text-blue-400" />,
      title: "Step 1: Submit Notice",
      description: "Send a complete DMCA notice with all required information to our designated agent"
    },
    {
      icon: <FiClock className="text-yellow-400" />,
      title: "Step 2: Review Process",
      description: "We will review your claim within 24-48 hours of receipt"
    },
    {
      icon: <FiCheckSquare className="text-green-400" />,
      title: "Step 3: Action Taken",
      description: "Valid claims will result in removal or disabling access to the referenced content"
    }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setSubmitStatus(null); // Clear status on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      const response = await submitDmcaComplaint(formData);
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        copyrightOwner: '',
        copyrightWorkDescription: '',
        infringingContent: '',
        infringingUrl: '',
        goodFaithStatement: false,
        accuracyStatement: false,
        authorizedStatement: false,
        digitalSignature: ''
      });

      // Hide form after 3 seconds
      setTimeout(() => {
        setShowForm(false);
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Failed to submit complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="DMCA Copyright Policy - MovieHub"
        description="Digital Millennium Copyright Act compliance and takedown notice procedures for MovieHub"
      />

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse"></div>
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full mb-6 shadow-lg shadow-blue-600/30">
              <FiShield size={36} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              DMCA Copyright Policy
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
              Digital Millennium Copyright Act Compliance & Takedown Procedures
            </p>
            <div className="mt-6 inline-block bg-blue-500/10 border border-blue-500/30 rounded-lg px-6 py-3">
              <p className="text-blue-400 text-sm font-medium">
                Effective: January 19, 2026
              </p>
            </div>
          </motion.div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <FiAlertCircle className="text-blue-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Copyright Respect Statement</h3>
                <p className="text-gray-300 leading-relaxed">
                  MovieHub respects the intellectual property rights of others and expects its users to do the same. 
                  We comply with the Digital Millennium Copyright Act (DMCA) and will respond promptly to valid copyright infringement notices.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Content Policy Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 bg-white/5 backdrop-blur-md border border-gray-800 rounded-xl p-6 md:p-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                <FiFileText className="text-purple-400" size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Our Content Policy</h2>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <strong className="text-white">MovieHub does not host, upload, stream, or distribute</strong> any copyrighted movies, TV shows, or media files on our servers.
                  </p>
                  <p>
                    All content displayed on this website, including movie information, images, posters, ratings, and trailers, is sourced from third-party platforms and publicly available APIs such as:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>The Movie Database (TMDB)</li>
                    <li>YouTube (for official trailers)</li>
                    <li>Other licensed data providers</li>
                  </ul>
                  <p>
                    MovieHub acts solely as an informational aggregator and redirects users to official, authorized streaming platforms.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Filing a DMCA Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8 bg-white/5 backdrop-blur-md border border-gray-800 rounded-xl p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Filing a DMCA Takedown Notice</h2>
            <p className="text-gray-300 mb-6">
              If you are a copyright owner or an authorized agent and believe that content referenced or linked on MovieHub infringes your copyright, you may submit a DMCA takedown request.
            </p>
            
            <h3 className="text-xl font-semibold text-white mb-4">Required Information</h3>
            <div className="space-y-3">
              {requirements.map((req, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-3 bg-gray-800/30 rounded-lg p-4"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-300 leading-relaxed">{req}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Process Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-8 bg-white/5 backdrop-blur-md border border-gray-800 rounded-xl p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">DMCA Process Timeline</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* DMCA Submission Form Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mb-8 text-center"
          >
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/30"
            >
              <FiFileText size={20} />
              {showForm ? 'Hide DMCA Form' : 'Submit DMCA Complaint'}
            </button>
          </motion.div>

          {/* DMCA Complaint Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 bg-white/5 backdrop-blur-md border border-gray-800 rounded-xl p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FiShield className="text-blue-400" size={28} />
                DMCA Takedown Request Form
              </h2>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-start gap-3"
                >
                  <FiCheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={24} />
                  <div>
                    <p className="text-green-500 font-semibold mb-1">DMCA Complaint Submitted Successfully!</p>
                    <p className="text-green-400 text-sm">We will review your complaint within 24-48 hours and take appropriate action.</p>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3"
                >
                  <FiXCircle className="text-red-500 flex-shrink-0 mt-0.5" size={24} />
                  <div>
                    <p className="text-red-500 font-semibold mb-1">Submission Failed</p>
                    <p className="text-red-400 text-sm">{errorMessage}</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Personal Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                        Address *
                      </label>
                      <div className="relative">
                        <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                          placeholder="Your address"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Copyright Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Copyright Information</h3>
                  
                  {/* Copyright Owner */}
                  <div>
                    <label htmlFor="copyrightOwner" className="block text-sm font-medium text-gray-300 mb-2">
                      Copyright Owner Name *
                    </label>
                    <input
                      type="text"
                      id="copyrightOwner"
                      name="copyrightOwner"
                      value={formData.copyrightOwner}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Name of the copyright owner"
                    />
                  </div>

                  {/* Copyright Work Description */}
                  <div>
                    <label htmlFor="copyrightWorkDescription" className="block text-sm font-medium text-gray-300 mb-2">
                      Description of Copyrighted Work * (min 20 characters)
                    </label>
                    <textarea
                      id="copyrightWorkDescription"
                      name="copyrightWorkDescription"
                      value={formData.copyrightWorkDescription}
                      onChange={handleChange}
                      required
                      minLength={20}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      placeholder="Describe the copyrighted work that has been infringed (e.g., movie title, publication, artwork, etc.)"
                    />
                  </div>
                </div>

                {/* Infringement Details Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Infringement Details</h3>
                  
                  {/* Infringing Content Description */}
                  <div>
                    <label htmlFor="infringingContent" className="block text-sm font-medium text-gray-300 mb-2">
                      Description of Infringing Content *
                    </label>
                    <textarea
                      id="infringingContent"
                      name="infringingContent"
                      value={formData.infringingContent}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      placeholder="Describe the infringing material found on our website"
                    />
                  </div>

                  {/* Infringing URL */}
                  <div>
                    <label htmlFor="infringingUrl" className="block text-sm font-medium text-gray-300 mb-2">
                      URL of Infringing Content *
                    </label>
                    <div className="relative">
                      <FiLink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="url"
                        id="infringingUrl"
                        name="infringingUrl"
                        value={formData.infringingUrl}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="https://moviehub.com/..."
                      />
                    </div>
                  </div>
                </div>

                {/* Legal Statements Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Legal Statements (Required)</h3>
                  
                  <div className="space-y-3 bg-gray-800/30 rounded-lg p-4">
                    {/* Good Faith Statement */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="goodFaithStatement"
                        checked={formData.goodFaithStatement}
                        onChange={handleChange}
                        required
                        className="mt-1 w-5 h-5 rounded border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
                      />
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                        I have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.
                      </span>
                    </label>

                    {/* Accuracy Statement */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="accuracyStatement"
                        checked={formData.accuracyStatement}
                        onChange={handleChange}
                        required
                        className="mt-1 w-5 h-5 rounded border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
                      />
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                        Under penalty of perjury, the information in this notification is accurate.
                      </span>
                    </label>

                    {/* Authorized Statement */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="authorizedStatement"
                        checked={formData.authorizedStatement}
                        onChange={handleChange}
                        required
                        className="mt-1 w-5 h-5 rounded border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
                      />
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                        I am authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
                      </span>
                    </label>
                  </div>
                </div>

                {/* Digital Signature */}
                <div>
                  <label htmlFor="digitalSignature" className="block text-sm font-medium text-gray-300 mb-2">
                    Digital Signature * (Type your full name)
                  </label>
                  <input
                    type="text"
                    id="digitalSignature"
                    name="digitalSignature"
                    value={formData.digitalSignature}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors font-signature text-lg"
                    placeholder="Your full name as signature"
                  />
                  <p className="text-xs text-gray-500 mt-1">By typing your name, you are providing a legal electronic signature</p>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FiCheckSquare size={20} />
                        Submit DMCA Complaint
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>

                {/* Warning */}
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="text-yellow-400 text-sm">
                    <strong>Warning:</strong> Submitting a false or fraudulent DMCA notice may result in legal liability under federal law (17 U.S.C. § 512(f)).
                  </p>
                </div>
              </form>
            </motion.div>
          )}

          {/* Counter-Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mb-8 bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-xl p-6 md:p-8 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <FiAlertCircle className="text-orange-400" size={28} />
              Counter-Notification Process
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>
                If you believe that content was removed or disabled by mistake or misidentification, you may file a counter-notification with our designated DMCA agent.
              </p>
              <p>
                Your counter-notice must include similar information as the original claim, along with a statement of good faith belief that the material was removed by mistake.
              </p>
              <p className="text-sm text-gray-400">
                <strong>Warning:</strong> Filing a false or fraudulent DMCA notice or counter-notice may result in legal liability under federal law.
              </p>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/30 rounded-xl p-8 backdrop-blur-sm text-center"
          >
            <FiMail className="text-blue-400 mx-auto mb-4" size={48} />
            <h2 className="text-2xl font-bold text-white mb-4">Alternative Contact Method</h2>
            <p className="text-gray-300 mb-6">
              For urgent DMCA requests, you can also email our designated agent directly:
            </p>
            <a
              href="mailto:dmca@moviehub.com"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/30"
            >
              <FiMail size={20} />
              dmca@moviehub.com
            </a>
            <p className="text-gray-400 text-sm mt-4">
              Response time: 24-48 hours
            </p>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="mt-12 pt-8 border-t border-gray-800 text-center"
          >
            <p className="text-gray-500 text-sm">
              This DMCA policy is part of our commitment to respecting intellectual property rights and operating in compliance with applicable copyright laws.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DMCA;
