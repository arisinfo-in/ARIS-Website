import React from 'react';
import { ArrowLeft, FileText, Scale, Shield, Users, CreditCard, AlertTriangle, CheckCircle, Mail, Globe } from 'lucide-react';
import Logo from './Logo';

interface TermsOfServiceProps {
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onNavigateContact: () => void;
  onNavigateTraining: () => void;
  onNavigateServices: () => void;
  onNavigatePrivacy: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ 
  onNavigateHome, 
  onNavigateAbout, 
  onNavigateContact, 
  onNavigateTraining, 
  onNavigateServices,
  onNavigatePrivacy 
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
              <Scale className="w-5 h-5" />
              <span className="font-semibold">Terms of Service</span>
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
              <Scale className="w-8 h-8 text-orange-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Please read these terms carefully before using our AI analytics training and consultancy services.
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
                  Agreement to Terms
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  These Terms of Service ("Terms") govern your use of ARIS AI Data Analyst's website and services. By accessing or using our services, you agree to be bound by these Terms.
                </p>
              </section>

              {/* Service Description */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Users className="w-6 h-6 text-orange-500 mr-3" />
                  Our Services
                </h2>
                <p className="text-gray-300 mb-4">ARIS provides the following services:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>AI Analytics Training Programs</li>
                  <li>Self-Paced Learning Courses</li>
                  <li>AI Consultancy Services</li>
                  <li>Agentic AI Solutions</li>
                  <li>Startup Support and Freelancing Guidance</li>
                  <li>SME Digital Transformation</li>
                </ul>
              </section>

              {/* User Responsibilities */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Shield className="w-6 h-6 text-orange-500 mr-3" />
                  User Responsibilities
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-300">As a user of our services, you agree to:</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                    <li>Provide accurate and complete information</li>
                    <li>Use our services for lawful purposes only</li>
                    <li>Respect intellectual property rights</li>
                    <li>Not share your account credentials</li>
                    <li>Not engage in any harmful or malicious activities</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>
                </div>
              </section>

              {/* Payment Terms */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <CreditCard className="w-6 h-6 text-orange-500 mr-3" />
                  Payment Terms
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-300">For paid services:</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                    <li>Payment is due before service delivery</li>
                    <li>All fees are non-refundable unless otherwise specified</li>
                    <li>We reserve the right to change pricing with 30 days notice</li>
                    <li>Late payments may result in service suspension</li>
                    <li>Refunds are at our sole discretion</li>
                  </ul>
                </div>
              </section>

              {/* Intellectual Property */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    All content, materials, and resources provided through our services, including but not limited to:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                    <li>Training materials and course content</li>
                    <li>Software tools and applications</li>
                    <li>Documentation and guides</li>
                    <li>Website design and content</li>
                  </ul>
                  <p className="text-gray-300">
                    are owned by ARIS or our licensors and are protected by copyright, trademark, and other intellectual property laws.
                  </p>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <AlertTriangle className="w-6 h-6 text-orange-500 mr-3" />
                  Limitation of Liability
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    To the maximum extent permitted by law, ARIS shall not be liable for:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                    <li>Any indirect, incidental, or consequential damages</li>
                    <li>Loss of profits, data, or business opportunities</li>
                    <li>Damages resulting from third-party services</li>
                    <li>Force majeure events beyond our control</li>
                  </ul>
                  <p className="text-gray-300">
                    Our total liability shall not exceed the amount paid by you for our services in the 12 months preceding the claim.
                  </p>
                </div>
              </section>

              {/* Service Availability */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Service Availability</h2>
                <p className="text-gray-300 mb-4">
                  We strive to provide reliable services but cannot guarantee:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Uninterrupted service availability</li>
                  <li>Error-free operation</li>
                  <li>Compatibility with all devices or browsers</li>
                  <li>Specific performance outcomes</li>
                </ul>
              </section>

              {/* Termination */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    We may terminate or suspend your access to our services:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                    <li>For violation of these Terms</li>
                    <li>For non-payment of fees</li>
                    <li>At our sole discretion with reasonable notice</li>
                    <li>Immediately for serious violations</li>
                  </ul>
                  <p className="text-gray-300">
                    You may terminate your use of our services at any time by contacting us.
                  </p>
                </div>
              </section>

              {/* Dispute Resolution */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Dispute Resolution</h2>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Any disputes arising from these Terms or our services shall be resolved through:
                  </p>
                  <ol className="list-decimal list-inside text-gray-300 space-y-2 ml-4">
                    <li>Good faith negotiation between the parties</li>
                    <li>Mediation if negotiation fails</li>
                    <li>Binding arbitration as a last resort</li>
                  </ol>
                  <p className="text-gray-300">
                    These Terms are governed by the laws of India, and any legal proceedings shall be conducted in Hyderabad, India.
                  </p>
                </div>
              </section>

              {/* Privacy */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Privacy</h2>
                <p className="text-gray-300">
                  Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, use, and protect your information.
                </p>
              </section>

              {/* Changes to Terms */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
                <p className="text-gray-300">
                  We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or website notice. Continued use of our services after changes constitutes acceptance of the new Terms.
                </p>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Mail className="w-6 h-6 text-orange-500 mr-3" />
                  Contact Information
                </h2>
                <p className="text-gray-300 mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <p className="text-gray-300">
                    <strong>ARIS AI Data Analyst</strong><br/>
                    <strong>Email:</strong> contact@arisinfo.in<br/>
                    <strong>Phone:</strong> +91 8790955213<br/>
                    <strong>Location:</strong> Hyderabad, India
                  </p>
                </div>
              </section>

              {/* Severability */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Severability</h2>
                <p className="text-gray-300">
                  If any provision of these Terms is found to be unenforceable or invalid, the remaining provisions shall remain in full force and effect.
                </p>
              </section>

            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onNavigatePrivacy}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              <Shield className="w-4 h-4 mr-2" />
              Privacy Policy
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

export default TermsOfService;
