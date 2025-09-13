import React, { useState, useEffect } from 'react';
import { 
  X, Download, Eye, FileText, User, Mail, Phone, CheckCircle, ArrowRight, BarChart3
} from 'lucide-react';
import { apiService } from '../services/api';

interface BrochureDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BrochureDownloadModal: React.FC<BrochureDownloadModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle escape key and mouse tracking
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isOpen) return;
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      setMousePosition({
        x: (clientX - centerX) / centerX,
        y: (clientY - centerY) / centerY
      });
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousemove', handleMouseMove);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validation
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (formData.phone.trim().length < 10) {
      errors.phone = 'Please provide a valid phone number';
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    // Send data to backend API
    try {
      console.log('📧 Sending brochure download request:', formData);
      
      // Send contact form data with brochure source
      const response = await apiService.submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: '', // Optional field
        message: 'Requested to download Data Analytics & AI Course Brochure',
        source: 'brochure'
      });
      
      console.log('✅ Brochure request response:', response);
      
      if (response.success) {
        setIsFormSubmitted(true);
      } else {
        throw new Error(response.message || 'Failed to submit brochure request');
      }
    } catch (error) {
      console.error('❌ Error submitting brochure request:', error);
      // Still show success to user, but log the error
      setIsFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle brochure download
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/ARIS Data Analytics Course Brochure.pdf';
    link.download = 'ARIS Data Analytics Course Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle brochure view
  const handleView = () => {
    window.open('/ARIS Data Analytics Course Brochure.pdf', '_blank');
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', email: '', phone: '' });
      setFormErrors({});
      setIsFormSubmitted(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {/* Enhanced Backdrop with Parallax */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Elements */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
          }}
        >
          <div className="absolute top-20 left-20 w-16 h-16 bg-orange-500/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-32 right-32 w-12 h-12 bg-blue-500/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-32 w-14 h-14 bg-purple-500/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-20 w-10 h-10 bg-green-500/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
          }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      {/* Main Modal Content */}
      <div 
        className="relative w-full max-w-2xl mx-4 bg-gray-900/95 backdrop-blur-xl rounded-xl sm:rounded-3xl border border-gray-700 shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="brochure-download-title"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-orange-600 to-orange-700 px-4 py-4 border-b border-orange-500/30">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 hover:bg-orange-800 rounded-lg transition-colors duration-300 group"
            aria-label="Close brochure download"
          >
            <X className="w-5 h-5 text-white group-hover:text-orange-200 transition-colors duration-300" />
          </button>
          
          <div className="text-center pr-10">
            <div className="flex items-center justify-center mb-2">
              <FileText className="w-8 h-8 text-white mr-3" />
              <h1 id="brochure-download-title" className="text-xl md:text-2xl font-bold text-white">
                Download Course Brochure
              </h1>
            </div>
            <p className="text-orange-100 text-sm max-w-lg mx-auto">
              Get detailed information about our Data Analytics & AI Course. Enter your details to access the brochure.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isFormSubmitted ? (
            /* Form Section */
            <div className="space-y-6">
              {/* Course Info Card */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">Data Analytics & AI Course</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Comprehensive training program covering data analysis, AI tools, and practical applications
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-orange-600/20 text-orange-400 text-xs rounded-full border border-orange-500/30">
                        6 Weeks Duration
                      </span>
                      <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
                        Beginner to Advanced
                      </span>
                      <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full border border-green-500/30">
                        Hands-on Projects
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-gray-700 text-white placeholder-gray-400 ${
                          formErrors.name ? 'border-red-500' : 'border-gray-600'
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {formErrors.name && (
                      <p className="text-red-400 text-sm">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-gray-700 text-white placeholder-gray-400 ${
                          formErrors.email ? 'border-red-500' : 'border-gray-600'
                        }`}
                        placeholder="Enter your email"
                      />
                    </div>
                    {formErrors.email && (
                      <p className="text-red-400 text-sm">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-gray-700 text-white placeholder-gray-400 ${
                        formErrors.phone ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="text-red-400 text-sm">{formErrors.phone}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group flex items-center justify-center ${
                    isSubmitting 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Get Brochure Access
                      <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Success Section */
            <div className="text-center space-y-6">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Success Message */}
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Access Granted!</h3>
                <p className="text-gray-300">
                  Thank you for your interest! You can now download or view the course brochure.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleDownload}
                  className="group bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-orange-800 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
                
                <button
                  onClick={handleView}
                  className="group bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Online
                </button>
              </div>

              {/* Course Highlights */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <h4 className="text-white font-semibold mb-3">What's Inside the Brochure:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Detailed Course Curriculum</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Project Portfolio Examples</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Career Opportunities</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Pricing & Payment Plans</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrochureDownloadModal;
