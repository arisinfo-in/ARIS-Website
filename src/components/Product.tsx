import React from 'react';
import { CheckCircle } from 'lucide-react';

const Product: React.FC = () => {
  const features = [
    'Custom Study Plans',
    'Practice Tests',
    'AI Tutors by Module (Excel, Power BI, Python, SQL & DB, Statistics, ML, Prompt Engineering, Advanced AI & Analytics)',
    'Articles, Series, Clips',
    'Free Certification',
    'Job Kit',
    'AI Tools for Analysts',
    'Standard Project Templates'
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <section className="pt-24 pb-12 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white">ARIS Product Tour</h1>
          <p className="mt-4 text-gray-300 max-w-3xl">
            A complete learning and practice environment for AI-driven data analytics.
          </p>
          <div className="mt-8 rounded-2xl overflow-hidden border border-gray-700 bg-black">
            <video
              controls
              playsInline
              preload="metadata"
              poster="/poster-aris-intro.jpg"
              className="w-full aspect-video"
            >
              <source src="/aris-intro.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">What you can do with ARIS</h2>
            <ul className="space-y-3">
              {features.map((f, i) => (
                <li key={i} className="flex items-start text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-white font-semibold mb-3">Chapters in the video</h3>
            <ol className="list-decimal list-inside text-gray-300 space-y-2">
              <li>Overview & Navigation</li>
              <li>Creating a Study Plan</li>
              <li>Practice Tests</li>
              <li>AI Tutors per Module</li>
              <li>Resources: Articles, Series, Clips</li>
              <li>Free Certification & Job Kit</li>
              <li>AI Tools & Standard Projects</li>
            </ol>
            <a
              href="https://arisinfo.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Launch ARIS
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;


