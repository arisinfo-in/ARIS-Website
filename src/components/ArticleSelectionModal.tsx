import React, { useState, useEffect } from 'react';
import { 
  X, FileText, Brain, BarChart3, Zap, Users, TrendingUp, ArrowRight, CheckCircle,
  Clock, Star, Eye, BookOpen, Code, Database, Target
} from 'lucide-react';

interface ArticleType {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  readTime: string;
  category: string;
  author: string;
  publishDate: string;
  tags: string[];
  stats: {
    views: number;
    likes: number;
    shares: number;
  };
}

interface ArticleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (articleType: string) => void;
}

const ArticleSelectionModal: React.FC<ArticleSelectionModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectArticle 
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const articleTypes: ArticleType[] = [
    {
      id: 'ai-analytics-future',
      title: 'AI Analytics Future',
      description: 'Discover how AI-powered data analytics is revolutionizing business intelligence and decision making.',
      icon: Brain,
      color: 'orange',
      gradient: 'from-orange-500 to-red-600',
      readTime: '5 min read',
      category: 'AI Analytics',
      author: 'Syed Rahman Hussain',
      publishDate: 'Dec 2024',
      tags: ['AI Analytics', 'Business Intelligence', 'Data Science', 'Machine Learning'],
      stats: {
        views: 12500,
        likes: 890,
        shares: 156
      }
    },
    {
      id: 'data-visualization-genai',
      title: 'Data Visualization AI',
      description: 'Learn how to create compelling data visualizations using AI-powered tools and techniques.',
      icon: BarChart3,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-600',
      readTime: '3 min read',
      category: 'Analytics',
      author: 'ARIS Team',
      publishDate: 'Dec 15, 2024',
      tags: ['Data Visualization', 'Generative AI', 'Analytics', 'Design'],
      stats: {
        views: 8900,
        likes: 567,
        shares: 89
      }
    },
    {
      id: 'prompt-engineering',
      title: 'Prompt Engineering',
      description: 'Advanced prompting techniques to get better results from AI tools in your data analysis workflow.',
      icon: Zap,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-600',
      readTime: '4 min read',
      category: 'AI Tools',
      author: 'ARIS Team',
      publishDate: 'Dec 12, 2024',
      tags: ['Prompt Engineering', 'AI Tools', 'Data Analysis', 'Productivity'],
      stats: {
        views: 11200,
        likes: 723,
        shares: 134
      }
    },
    {
      id: 'career-ai-analytics',
      title: 'Career AI Analytics',
      description: 'Essential skills and career paths for aspiring AI data analysts in 2025 and beyond.',
      icon: Users,
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
      readTime: '6 min read',
      category: 'Career',
      author: 'ARIS Team',
      publishDate: 'Dec 10, 2024',
      tags: ['Career Development', 'AI Analytics', 'Skills', 'Professional Growth'],
      stats: {
        views: 15600,
        likes: 1024,
        shares: 201
      }
    },
    {
      id: 'machine-learning',
      title: 'Machine Learning',
      description: 'A comprehensive guide to understanding machine learning concepts and their practical applications.',
      icon: Code,
      color: 'indigo',
      gradient: 'from-indigo-500 to-purple-600',
      readTime: '8 min read',
      category: 'Machine Learning',
      author: 'Syed Shabaz',
      publishDate: 'Dec 8, 2024',
      tags: ['Machine Learning', 'Data Science', 'Algorithms', 'Python'],
      stats: {
        views: 9800,
        likes: 645,
        shares: 112
      }
    },
    {
      id: 'sql-techniques',
      title: 'SQL Techniques',
      description: 'Master complex SQL queries, window functions, and optimization techniques for better data insights.',
      icon: Database,
      color: 'teal',
      gradient: 'from-teal-500 to-blue-600',
      readTime: '7 min read',
      category: 'SQL',
      author: 'Mohammed Imtiyaz',
      publishDate: 'Dec 5, 2024',
      tags: ['SQL', 'Database', 'Query Optimization', 'Data Analysis'],
      stats: {
        views: 13400,
        likes: 789,
        shares: 145
      }
    },
    {
      id: 'python-data-science',
      title: 'Python Data Science',
      description: 'Complete guide to Python libraries every data scientist should know: Pandas, NumPy, Matplotlib, and more.',
      icon: BookOpen,
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-600',
      readTime: '9 min read',
      category: 'Python',
      author: 'ARIS Team',
      publishDate: 'Dec 3, 2024',
      tags: ['Python', 'Data Science', 'Libraries', 'Programming'],
      stats: {
        views: 16700,
        likes: 1156,
        shares: 223
      }
    },
    {
      id: 'business-intelligence-trends',
      title: 'BI Trends',
      description: 'Explore the latest trends in BI, from self-service analytics to AI-driven insights and real-time dashboards.',
      icon: TrendingUp,
      color: 'rose',
      gradient: 'from-rose-500 to-pink-600',
      readTime: '6 min read',
      category: 'Business Intelligence',
      author: 'ARIS Team',
      publishDate: 'Dec 1, 2024',
      tags: ['Business Intelligence', 'Trends', 'Analytics', 'Technology'],
      stats: {
        views: 10800,
        likes: 678,
        shares: 98
      }
    }
  ];

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
        {/* Floating Article Icons */}
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
        className="relative w-full max-w-7xl mx-1 sm:mx-4 bg-gray-900/95 backdrop-blur-xl rounded-xl sm:rounded-3xl border border-gray-700 shadow-2xl overflow-hidden max-h-[90vh] sm:max-h-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-selection-title"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 px-2 sm:px-4 py-2 sm:py-4 border-b border-gray-700">
          <button
            onClick={onClose}
            className="absolute top-1 right-1 sm:top-2 sm:right-2 p-1.5 sm:p-2 hover:bg-gray-800 rounded-lg transition-colors duration-300 group"
            aria-label="Close article selection"
          >
            <X className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
          </button>
          
          <div className="text-center pr-8 sm:pr-0">
            <h1 id="article-selection-title" className="text-base sm:text-xl md:text-2xl font-bold text-white mb-1">
              Latest AI Data Analytics Insights
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm max-w-2xl mx-auto">
              Explore our comprehensive collection of articles covering AI, data analytics, and career development.
            </p>
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="p-1 sm:p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-120px)] sm:max-h-none">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            {articleTypes.map((article, index) => {
              const IconComponent = article.icon;
              const isHovered = hoveredCard === article.id;
              
              return (
                <div
                  key={article.id}
                  onMouseEnter={() => setHoveredCard(article.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => onSelectArticle(article.id)}
                  className={`group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg sm:rounded-xl p-1.5 sm:p-4 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:border-${article.color}-500/50 ${
                    isHovered ? `shadow-${article.color}-500/20` : ''
                  }`}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-center mb-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${article.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-3">
                    <div className="text-center">
                      <span className="text-xs text-orange-400 font-medium bg-orange-500/20 px-2 py-1 rounded-full">
                        {article.category}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors duration-300 text-center leading-tight">
                      {article.title}
                    </h3>

                    {/* Author */}
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-xs text-orange-500 font-bold">
                          {article.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 truncate">{article.author}</span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-1 py-1">
                      <div className="text-center">
                        <div className="text-xs font-bold text-orange-400">{Math.floor(article.stats.views / 1000)}k</div>
                        <div className="text-xs text-gray-400">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-bold text-blue-400">{article.stats.likes}</div>
                        <div className="text-xs text-gray-400">Likes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-bold text-green-400">{article.stats.shares}</div>
                        <div className="text-xs text-gray-400">Shares</div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full mt-2 px-2 py-1.5 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-orange-800 transition-all duration-300 flex items-center justify-center space-x-1 group-hover:shadow-lg text-xs">
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${article.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-lg sm:rounded-xl`}></div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ArticleSelectionModal;
