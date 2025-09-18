import React, { useState, useEffect } from 'react';
import { 
  X, Download, Eye, FileText, User, Mail, Phone, CheckCircle, ArrowRight, BarChart3, 
  Brain, Zap
} from 'lucide-react';
import { apiService } from '../services/api';

interface BrochureDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BrochureType = 'data-analytics' | 'vibe-analytics' | 'prompting-ai-tools';

interface BrochureInfo {
  id: BrochureType;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  file: string;
  features: string[];
  duration: string;
  level: string;
  type: string;
}

const BrochureDownloadModal: React.FC<BrochureDownloadModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [selectedBrochure, setSelectedBrochure] = useState<BrochureType>('data-analytics');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Brochure configurations
  const brochures: BrochureInfo[] = [
    {
      id: 'data-analytics',
      title: 'Data Analytics & AI Course',
      description: 'Comprehensive training program covering data analysis, AI tools, and practical applications',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'orange',
      gradient: 'from-orange-500 to-orange-600',
      file: 'ARIS Data Analytics & AI Course Broucher.pdf',
      features: ['Detailed Course Curriculum', 'Project Portfolio Examples', 'Career Opportunities', 'Pricing & Payment Plans'],
      duration: '6 Weeks',
      level: 'All Levels',
      type: 'Course'
    },
    {
      id: 'vibe-analytics',
      title: 'Vibe Analytics',
      description: 'Advanced analytics focusing on behavioral insights, and emotional intelligence in data',
      icon: <Brain className="w-5 h-5" />,
      color: 'orange',
      gradient: 'from-orange-500 to-orange-600',
      file: 'ARIS Vibe Analytics Course Broucher.pdf.pdf',
      features: ['Sentiment Analysis Tools', 'Behavioral Data Insights', 'Emotional Intelligence in AI', 'Advanced Analytics Techniques'],
      duration: '2 Weeks',
      level: 'Intermediate',
      type: 'Specialized'
    },
    {
      id: 'prompting-ai-tools',
      title: 'Prompting & AI Tools',
      description: 'Master the art of AI prompting and leverage cutting-edge AI tools for maximum productivity',
      icon: <Zap className="w-5 h-5" />,
      color: 'orange',
      gradient: 'from-orange-500 to-orange-600',
      file: 'ARIS Prompting & AI Tools Brochure.pdf.pdf',
      features: ['AI Prompting Techniques', 'Tool Integration Strategies', 'Productivity Optimization', 'Advanced AI Workflows'],
      duration: '2 Weeks',
      level: 'Beginner',
      type: 'Tools'
    }
  ];

  const currentBrochure = brochures.find(b => b.id === selectedBrochure) || brochures[0];

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
        message: `Requested to download ${currentBrochure.title} Brochure`,
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
    link.href = `/public/${currentBrochure.file}`;
    link.download = currentBrochure.file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle brochure view
  const handleView = () => {
    window.open(`/public/${currentBrochure.file}`, '_blank');
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedBrochure('data-analytics');
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
        className="relative w-full max-w-2xl mx-4 bg-gray-900/95 backdrop-blur-xl rounded-xl sm:rounded-3xl border border-gray-700 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="brochure-download-title"
      >
        {/* Header */}
        <div className={`relative bg-gradient-to-r ${currentBrochure.gradient} px-4 py-3 border-b ${currentBrochure.color}-500/30`}>
          <button
            onClick={onClose}
            className={`absolute top-2 right-2 p-2 hover:bg-${currentBrochure.color}-800 rounded-lg transition-colors duration-300 group`}
            aria-label="Close brochure download"
          >
            <X className={`w-5 h-5 text-white group-hover:text-${currentBrochure.color}-200 transition-colors duration-300`} />
          </button>
          
          <div className="text-center pr-10">
            <div className="flex items-center justify-center mb-1">
              <FileText className="w-6 h-6 text-white mr-2" />
              <h1 id="brochure-download-title" className="text-lg md:text-xl font-bold text-white">
                Download Course Brochure
              </h1>
            </div>
            <p className={`text-${currentBrochure.color}-100 text-xs max-w-lg mx-auto`}>
              Get detailed information about our {currentBrochure.title}. Enter your details to access the brochure.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {!isFormSubmitted ? (
            /* Form Section */
            <div className="space-y-4">
              {/* Brochure Selection */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white mb-2">Select Brochure:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {brochures.map((brochure) => (
                    <button
                      key={brochure.id}
                      onClick={() => setSelectedBrochure(brochure.id)}
                      className={`p-3 rounded-lg border transition-all duration-300 text-left group ${
                        selectedBrochure === brochure.id
                          ? `bg-${brochure.color}-600/20 border-${brochure.color}-500/50 shadow-lg`
                          : 'bg-gray-800/50 border-gray-600 hover:bg-gray-700/50 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <div className={`w-8 h-8 bg-gradient-to-br ${brochure.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          {brochure.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-white mb-1 truncate">
                            {brochure.title}
                          </h4>
                          <p className="text-gray-400 text-xs leading-tight line-clamp-2">
                            {brochure.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <span className={`px-1.5 py-0.5 bg-${brochure.color}-600/20 text-${brochure.color}-400 text-xs rounded-full border border-${brochure.color}-500/30`}>
                              {brochure.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Course Info Card */}
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                <div className="flex items-start space-x-2">
                  <div className={`w-10 h-10 bg-gradient-to-br ${currentBrochure.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {currentBrochure.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white mb-1">{currentBrochure.title}</h3>
                    <p className="text-gray-300 text-xs mb-2">
                      {currentBrochure.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <span className={`px-1.5 py-0.5 bg-${currentBrochure.color}-600/20 text-${currentBrochure.color}-400 text-xs rounded-full border border-${currentBrochure.color}-500/30`}>
                        {currentBrochure.duration}
                      </span>
                      <span className="px-1.5 py-0.5 bg-green-600/20 text-green-400 text-xs rounded-full border border-green-500/30">
                        {currentBrochure.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Name Field */}
                  <div className="space-y-1">
                    <label htmlFor="name" className="block text-xs font-medium text-gray-300">
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
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-gray-700 text-white placeholder-gray-400 text-sm ${
                          formErrors.name ? 'border-red-500' : 'border-gray-600'
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {formErrors.name && (
                      <p className="text-red-400 text-xs">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-xs font-medium text-gray-300">
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
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-gray-700 text-white placeholder-gray-400 text-sm ${
                          formErrors.email ? 'border-red-500' : 'border-gray-600'
                        }`}
                        placeholder="Enter your email"
                      />
                    </div>
                    {formErrors.email && (
                      <p className="text-red-400 text-xs">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone Field */}
                <div className="space-y-1">
                  <label htmlFor="phone" className="block text-xs font-medium text-gray-300">
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
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-gray-700 text-white placeholder-gray-400 text-sm ${
                        formErrors.phone ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="text-red-400 text-xs">{formErrors.phone}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2.5 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group flex items-center justify-center text-sm ${
                    isSubmitting 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : `bg-gradient-to-r ${currentBrochure.gradient} hover:from-${currentBrochure.color}-700 hover:to-${currentBrochure.color}-800`
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Get {currentBrochure.title} Access
                      <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Success Section */
            <div className="text-center space-y-4">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Success Message */}
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Access Granted!</h3>
                <p className="text-gray-300 text-sm">
                  Thank you for your interest! You can now download or view the course brochure.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={handleDownload}
                  className={`group bg-gradient-to-r ${currentBrochure.gradient} text-white px-6 py-2.5 rounded-lg font-semibold hover:from-${currentBrochure.color}-700 hover:to-${currentBrochure.color}-800 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center text-sm`}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
                
                <button
                  onClick={handleView}
                  className="group bg-gray-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center text-sm"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Online
                </button>
              </div>

              {/* Course Highlights */}
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                <h4 className="text-white font-semibold mb-2 text-sm">What's Inside the Brochure:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-gray-300">
                  {currentBrochure.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-1.5">
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
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
