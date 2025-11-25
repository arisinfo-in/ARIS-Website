import React from 'react';
import { ArrowLeft, Shield, Eye, Database, Mail, Globe, Lock, User, FileText, CheckCircle } from 'lucide-react';
import Logo from './Logo';

interface PrivacyPolicyProps {
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onNavigateContact: () => void;
  onNavigateTraining: () => void;
  onNavigateServices: () => void;
  onNavigateTerms: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ 
  onNavigateHome, 
  onNavigateAbout, 
  onNavigateContact, 
  onNavigateTraining, 
  onNavigateServices,
  onNavigateTerms 
}) => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 transition-all duration-300 px-4 py-4">
        <div className="max-w-6xl mx-auto bg-gray-800/95 rounded-full px-6 py-4 border border-gray-700 shadow-lg flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={onNavigateHome} className="hover:scale-110 transition-transform duration-300">
              <Logo size="sm" />
            </button>
            <div className="flex items-center space-x-2 text-orange-400">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">Privacy Policy</span>
            </div>
          </div>
          
          <button 
            onClick={onNavigateHome}
            className="flex items-center space-x-2 text-gray-300 hover:text-orange-400 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600/20 rounded-full mb-6">
              <Shield className="w-8 h-8 text-orange-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <div className="mt-6 text-sm text-gray-500">
              Last updated: December 2024
            </div>
          </div>

          {/* Content */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="prose prose-invert max-w-none">
              
              {/* Introduction */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <FileText className="w-6 h-6 text-orange-500 mr-3" />
                  Introduction
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  ARIS AI Data Analyst ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
              </section>

              {/* Information We Collect */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Database className="w-6 h-6 text-orange-500 mr-3" />
                  Information We Collect
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-3">Personal Information</h3>
                    <p className="text-gray-300 mb-3">We may collect the following personal information:</p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                      <li>Name and contact information (email, phone number)</li>
                      <li>Company information</li>
                      <li>Service preferences and interests</li>
                      <li>Communication history with us</li>
                      <li>Newsletter subscription information</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-3">Automatically Collected Information</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                      <li>Website usage data and analytics</li>
                      <li>IP address and device information</li>
                      <li>Browser type and version</li>
                      <li>Pages visited and time spent on site</li>
                      <li>Referring website information</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How We Use Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Eye className="w-6 h-6 text-orange-500 mr-3" />
                  How We Use Your Information
                </h2>
                <p className="text-gray-300 mb-4">We use your information for the following purposes:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>To provide and improve our AI analytics training services</li>
                  <li>To respond to your inquiries and provide customer support</li>
                  <li>To send you newsletters and marketing communications (with your consent)</li>
                  <li>To process course registrations and training requests</li>
                  <li>To analyze website usage and improve user experience</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              {/* Data Storage and Security */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Lock className="w-6 h-6 text-orange-500 mr-3" />
                  Data Storage and Security
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    We use industry-standard security measures to protect your information:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                    <li>Data is stored securely using Firebase (Google Cloud Platform)</li>
                    <li>All data transmission is encrypted using HTTPS</li>
                    <li>Access to personal data is restricted to authorized personnel</li>
                    <li>Regular security audits and updates</li>
                  </ul>
                </div>
              </section>

              {/* Third-Party Services */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Globe className="w-6 h-6 text-orange-500 mr-3" />
                  Third-Party Services
                </h2>
                <p className="text-gray-300 mb-4">We use the following third-party services:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li><strong>Firebase/Google Cloud:</strong> Data storage and backend services</li>
                  <li><strong>Gmail SMTP:</strong> Email delivery services</li>
                  <li><strong>Google Analytics:</strong> Website analytics and performance monitoring</li>
                  <li><strong>Vercel:</strong> Website hosting and deployment</li>
                </ul>
              </section>

              {/* Your Rights */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <User className="w-6 h-6 text-orange-500 mr-3" />
                  Your Rights
                </h2>
                <p className="text-gray-300 mb-4">You have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Data portability (receive your data in a structured format)</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              {/* Cookies */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking</h2>
                <p className="text-gray-300 mb-4">
                  We use cookies and similar technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.
                </p>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Mail className="w-6 h-6 text-orange-500 mr-3" />
                  Contact Us
                </h2>
                <p className="text-gray-300 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <p className="text-gray-300">
                    <strong>Email:</strong> contact@arisinfo.in<br/>
                    <strong>Phone:</strong> +91 8790955213<br/>
                    <strong>Location:</strong> Hyderabad, India
                  </p>
                </div>
              </section>

              {/* Updates */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Policy Updates</h2>
                <p className="text-gray-300">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onNavigateTerms}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Terms of Service
            </button>
            <button 
              onClick={onNavigateContact}
              className="border-2 border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 hover:border-orange-500 transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Us
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
