import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  X, Search, ChevronRight, Brain, BarChart3, Zap, Users, TrendingUp, 
  Clock, Star, Eye, BookOpen, Code, Database, Target, ArrowUp, 
  Share2, Heart, Bookmark, MessageCircle, ThumbsUp, Download,
  Calendar, User, Tag, ExternalLink, ArrowLeft, ArrowRight
} from 'lucide-react';

interface ArticleContent {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  stats: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
  };
  sections: {
    id: string;
    title: string;
    content: string;
    type: 'text' | 'code' | 'image' | 'quote' | 'list';
  }[];
  relatedArticles: {
    id: string;
    title: string;
    readTime: string;
    category: string;
  }[];
}

interface ArticleOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  articleType?: string;
  onNavigateContact?: () => void;
  onNavigateToArticle?: (articleId: string) => void;
}

const ArticleOverlay: React.FC<ArticleOverlayProps> = ({ isOpen, onClose, articleType = 'ai-analytics-future', onNavigateContact, onNavigateToArticle }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Comprehensive article data
  const getArticleData = (type: string): ArticleContent => {
    const articleData = {
      'ai-analytics-future': {
        id: 'ai-analytics-future',
        title: 'The Future of AI Data Analytics: Transforming Business Intelligence',
        description: 'Discover how AI-powered data analytics is revolutionizing the way businesses make decisions. From predictive modeling to real-time insights, explore the cutting-edge technologies that are shaping the future of business intelligence and data-driven decision making.',
        content: 'The landscape of data analytics is undergoing a revolutionary transformation, driven by the rapid advancement of artificial intelligence technologies. This comprehensive exploration delves into how AI is reshaping business intelligence and creating new paradigms for data-driven decision making.',
        author: 'Syed Rahman Hussain',
        publishDate: 'December 2024',
        readTime: '5 min read',
        category: 'AI Analytics',
        tags: ['AI Analytics', 'Business Intelligence', 'Data Science', 'Machine Learning', 'Future Technology'],
        icon: Brain,
        color: 'orange',
        gradient: 'from-orange-500 to-red-600',
        stats: {
          views: 12500,
          likes: 890,
          shares: 156,
          comments: 23
        },
        sections: [
          {
            id: 'introduction',
            title: 'Introduction',
            content: 'Artificial Intelligence has emerged as the most transformative force in data analytics, fundamentally changing how organizations collect, process, and derive insights from their data. The convergence of machine learning, natural language processing, and advanced analytics is creating unprecedented opportunities for businesses to understand their operations, customers, and markets with unprecedented depth and accuracy.',
            type: 'text'
          },
          {
            id: 'current-state',
            title: 'Current State of AI in Analytics',
            content: 'Today\'s AI-powered analytics platforms are already delivering remarkable results. Companies are leveraging machine learning algorithms to predict customer behavior, optimize supply chains, and identify market trends with accuracy rates that were unimaginable just a few years ago. The integration of real-time data processing with AI models enables organizations to make decisions based on the most current information available.',
            type: 'text'
          },
          {
            id: 'key-technologies',
            title: 'Key Technologies Driving Change',
            content: 'Several cutting-edge technologies are at the forefront of this transformation:',
            type: 'list'
          },
          {
            id: 'machine-learning',
            title: 'Machine Learning and Predictive Analytics',
            content: 'Machine learning algorithms are becoming increasingly sophisticated, enabling businesses to predict future outcomes with remarkable accuracy. From forecasting sales trends to identifying potential equipment failures, these systems are helping organizations stay ahead of challenges and capitalize on opportunities.',
            type: 'text'
          },
          {
            id: 'natural-language',
            title: 'Natural Language Processing',
            content: 'NLP technologies are making data analytics more accessible by allowing users to query complex datasets using natural language. This democratization of data analysis means that business users without technical backgrounds can now extract insights directly from their data.',
            type: 'text'
          },
          {
            id: 'automated-insights',
            title: 'Automated Insight Generation',
            content: 'AI systems are now capable of automatically identifying patterns, anomalies, and trends in data without human intervention. This automated insight generation is revolutionizing how businesses approach data analysis, making it faster and more comprehensive than ever before.',
            type: 'text'
          },
          {
            id: 'future-implications',
            title: 'Future Implications for Business',
            content: 'The future of AI in data analytics promises even more dramatic changes. We can expect to see fully autonomous analytics systems that not only identify insights but also recommend and implement actions based on those insights. This level of automation will fundamentally change the role of data analysts and business intelligence professionals.',
            type: 'text'
          },
          {
            id: 'conclusion',
            title: 'Conclusion',
            content: 'The future of AI data analytics is bright and full of possibilities. As these technologies continue to evolve, businesses that embrace and integrate AI into their analytics strategies will gain significant competitive advantages. The key to success lies in understanding these technologies, investing in the right tools and talent, and maintaining a focus on ethical and responsible AI implementation.',
            type: 'text'
          }
        ],
        relatedArticles: [
          { id: 'data-visualization-genai', title: 'Mastering Data Visualization with Generative AI', readTime: '3 min read', category: 'Analytics' },
          { id: 'prompt-engineering-data', title: 'Prompt Engineering for Data Analysis', readTime: '4 min read', category: 'AI Tools' },
          { id: 'career-ai-analytics', title: 'Building a Career in AI Data Analytics', readTime: '6 min read', category: 'Career' }
        ]
      },
      'data-visualization-genai': {
        id: 'data-visualization-genai',
        title: 'Mastering Data Visualization with Generative AI',
        description: 'Learn how to create compelling data visualizations that tell a story and drive actionable insights using AI-powered tools.',
        content: 'Data visualization has always been a crucial component of effective data analysis, but the integration of generative AI is taking it to entirely new levels of sophistication and accessibility.',
        author: 'ARIS Team',
        publishDate: 'December 15, 2024',
        readTime: '3 min read',
        category: 'Analytics',
        tags: ['Data Visualization', 'Generative AI', 'Analytics', 'Design'],
        icon: BarChart3,
        color: 'blue',
        gradient: 'from-blue-500 to-cyan-600',
        stats: {
          views: 8900,
          likes: 567,
          shares: 89,
          comments: 12
        },
        sections: [
          {
            id: 'introduction',
            title: 'The Evolution of Data Visualization',
            content: 'Traditional data visualization tools required significant technical expertise and design skills. Generative AI is changing this by enabling users to create professional-quality visualizations through natural language commands and intelligent design suggestions.',
            type: 'text'
          },
          {
            id: 'ai-powered-tools',
            title: 'AI-Powered Visualization Tools',
            content: 'Modern visualization platforms are incorporating AI to automatically suggest the best chart types, color schemes, and layouts based on the data being analyzed. This intelligent assistance makes it easier for analysts to create compelling visual stories.',
            type: 'text'
          },
          {
            id: 'best-practices',
            title: 'Best Practices for AI-Enhanced Visualization',
            content: 'When working with AI-powered visualization tools, it\'s important to maintain a balance between automation and human insight. The AI can handle the technical aspects of chart creation, but human analysts should focus on interpreting the results and ensuring the visualizations tell the right story.',
            type: 'text'
          }
        ],
        relatedArticles: [
          { id: 'ai-analytics-future', title: 'The Future of AI Data Analytics', readTime: '5 min read', category: 'AI Analytics' },
          { id: 'python-data-science', title: 'Python for Data Science: Essential Libraries', readTime: '9 min read', category: 'Python' }
        ]
      },
      'prompt-engineering-data': {
        id: 'prompt-engineering-data',
        title: 'Prompt Engineering for Data Analysis',
        description: 'Discover advanced prompting techniques to get better results from AI tools in your data analysis workflow.',
        content: 'Prompt engineering has become an essential skill for data analysts working with AI tools. The ability to craft effective prompts can dramatically improve the quality and accuracy of AI-generated insights.',
        author: 'ARIS Team',
        publishDate: 'December 12, 2024',
        readTime: '4 min read',
        category: 'AI Tools',
        tags: ['Prompt Engineering', 'AI Tools', 'Data Analysis', 'Productivity'],
        icon: Zap,
        color: 'purple',
        gradient: 'from-purple-500 to-pink-600',
        stats: {
          views: 11200,
          likes: 723,
          shares: 134,
          comments: 18
        },
        sections: [
          {
            id: 'introduction',
            title: 'The Art of Prompt Engineering',
            content: 'Effective prompt engineering involves understanding how AI models interpret and respond to different types of instructions. For data analysts, this means learning to structure prompts that guide AI tools to provide relevant, accurate, and actionable insights.',
            type: 'text'
          },
          {
            id: 'techniques',
            title: 'Advanced Prompting Techniques',
            content: 'Key techniques include providing context, specifying output formats, using examples, and breaking complex queries into smaller, more manageable parts. Each technique serves a specific purpose in improving AI tool performance.',
            type: 'text'
          },
          {
            id: 'data-specific-prompts',
            title: 'Data-Specific Prompting Strategies',
            content: 'When working with data analysis, prompts should include information about the dataset, the type of analysis needed, and the desired output format. This context helps AI tools provide more relevant and useful responses.',
            type: 'text'
          }
        ],
        relatedArticles: [
          { id: 'ai-analytics-future', title: 'The Future of AI Data Analytics', readTime: '5 min read', category: 'AI Analytics' },
          { id: 'career-ai-analytics', title: 'Building a Career in AI Data Analytics', readTime: '6 min read', category: 'Career' }
        ]
      },
      'career-ai-analytics': {
        id: 'career-ai-analytics',
        title: 'Building a Career in AI Data Analytics',
        description: 'Discover the essential skills and career paths for aspiring AI data analysts in 2025 and beyond.',
        content: 'The field of AI data analytics is experiencing unprecedented growth, creating numerous opportunities for professionals looking to build careers in this exciting domain.',
        author: 'ARIS Team',
        publishDate: 'December 10, 2024',
        readTime: '6 min read',
        category: 'Career',
        tags: ['Career Development', 'AI Analytics', 'Skills', 'Professional Growth'],
        icon: Users,
        color: 'green',
        gradient: 'from-green-500 to-emerald-600',
        stats: {
          views: 15600,
          likes: 1024,
          shares: 201,
          comments: 45
        },
        sections: [
          {
            id: 'introduction',
            title: 'The Growing Demand for AI Data Analysts',
            content: 'Organizations across industries are recognizing the value of AI-powered data analytics, leading to a surge in demand for skilled professionals who can bridge the gap between traditional data analysis and artificial intelligence.',
            type: 'text'
          },
          {
            id: 'essential-skills',
            title: 'Essential Skills for Success',
            content: 'Success in AI data analytics requires a combination of technical skills, analytical thinking, and business acumen. Key areas include machine learning, statistical analysis, programming, and domain expertise.',
            type: 'text'
          },
          {
            id: 'career-paths',
            title: 'Career Paths and Opportunities',
            content: 'The field offers diverse career paths, from technical roles focused on model development to strategic positions that involve translating AI insights into business decisions. Understanding these paths helps professionals make informed career choices.',
            type: 'text'
          },
          {
            id: 'getting-started',
            title: 'Getting Started in AI Data Analytics',
            content: 'For those new to the field, starting with foundational skills in data analysis and gradually building expertise in AI and machine learning is the recommended approach. Practical experience through projects and real-world applications is crucial.',
            type: 'text'
          }
        ],
        relatedArticles: [
          { id: 'ai-analytics-future', title: 'The Future of AI Data Analytics', readTime: '5 min read', category: 'AI Analytics' },
          { id: 'machine-learning-basics', title: 'Machine Learning Fundamentals for Data Analysts', readTime: '8 min read', category: 'Machine Learning' }
        ]
      }
    };

    return articleData[type as keyof typeof articleData] || articleData['ai-analytics-future'];
  };

  const article = getArticleData(articleType);

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

  // Intersection Observer for scroll animations and active section tracking
  useEffect(() => {
    if (!isOpen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute('data-section-id');
          if (sectionId) {
            if (entry.isIntersecting) {
              setVisibleSections(prev => new Set([...prev, sectionId]));
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: '-180px 0px -100px 0px' }
    );

    // Observe all sections
    sectionRefs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isOpen, article.sections]);

  // Scroll progress tracking and enhanced parallax
  useEffect(() => {
    if (!isOpen || !contentRef.current) return;

    const handleScroll = () => {
      const container = contentRef.current;
      if (!container) return;

      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
      setScrollY(scrollTop);
    };

    const container = contentRef.current;
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

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
      {/* Backdrop with blur and dim */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      {/* Enhanced Parallax Background Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Layer A - Gradient blobs (farthest, slowest) */}
        <div 
          className="absolute inset-0 opacity-20 parallax-layer"
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10 + scrollY * 0.1}px)`
          }}
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/30 to-green-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Layer B - Grid lines (mid layer) */}
        <div 
          className="absolute inset-0 opacity-10 parallax-layer"
          style={{
            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5 + scrollY * 0.2}px)`
          }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Layer C - Floating motifs (nearest, fastest) */}
        <div 
          className="absolute inset-0 opacity-30 parallax-layer"
          style={{
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15 + scrollY * 0.3}px)`
          }}
        >
          <div className="absolute top-20 left-20 w-8 h-8 bg-orange-500/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-32 right-32 w-6 h-6 bg-blue-500/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-32 left-32 w-4 h-4 bg-purple-500/40 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
        </div>
      </div>

      {/* Main Overlay Content */}
      <div 
        ref={overlayRef}
        className="relative w-full h-full max-w-6xl mx-auto bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700 shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-title"
      >
        {/* Progress Indicator */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-700 z-10">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-purple-600 transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>

        {/* Sticky Header */}
        <header className="sticky top-0 z-20 bg-gray-900/90 backdrop-blur-sm border-b border-gray-700 px-3 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Left Side - Article Info */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 bg-gradient-to-br ${article.gradient} rounded-lg flex items-center justify-center`}>
                  <article.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-xs text-orange-400 font-medium">{article.category}</span>
                  <div className="text-xs text-gray-400">{article.readTime}</div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Close Button */}
            <div className="flex items-center">
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-300 group"
                aria-label="Close article"
              >
                <X className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div 
          ref={contentRef}
          className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
          style={{ height: 'calc(100vh - 80px)' }}
        >
          <div className="px-3 md:px-6 py-4 md:py-8">
            {/* Article Header */}
            <div className="max-w-4xl mx-auto mb-8">
              <h1 id="article-title" className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {article.title}
              </h1>
              
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {article.description}
              </p>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-sm text-orange-500 font-bold">
                      {article.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-medium">{article.author}</div>
                    <div className="text-gray-400 text-sm">{article.publishDate}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{article.stats.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{article.stats.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Share2 className="w-4 h-4" />
                    <span>{article.stats.shares}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{article.stats.comments}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-orange-600/20 text-orange-400 text-sm rounded-full border border-orange-500/30">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Article Content */}
            <div className="max-w-4xl mx-auto space-y-8">
              {article.sections.map((section, index) => {
                const isVisible = visibleSections.has(section.id);
                
                return (
                  <div
                    key={section.id}
                    ref={(el) => {
                      if (el) sectionRefs.current.set(section.id, el);
                    }}
                    data-section-id={section.id}
                    className={`article-section group bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 md:p-8 transition-all duration-700 hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-500/30 ${
                      isVisible ? 'fade-up opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
                      {section.title}
                    </h2>
                    
                    {section.type === 'text' && (
                      <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                          {section.content}
                        </p>
                      </div>
                    )}
                    
                    {section.type === 'list' && (
                      <div className="space-y-3">
                        <ul className="space-y-2">
                          <li className="flex items-start space-x-3 text-gray-300">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Machine Learning and Predictive Analytics</span>
                          </li>
                          <li className="flex items-start space-x-3 text-gray-300">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Natural Language Processing for Data Querying</span>
                          </li>
                          <li className="flex items-start space-x-3 text-gray-300">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Automated Insight Generation and Pattern Recognition</span>
                          </li>
                          <li className="flex items-start space-x-3 text-gray-300">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Real-time Data Processing and Analysis</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}


              {/* Related Articles */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-6">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {article.relatedArticles.map((relatedArticle, index) => (
                    <div 
                      key={index} 
                      onClick={() => onNavigateToArticle && onNavigateToArticle(relatedArticle.id)}
                      className="group bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 hover:border-orange-500/30 border border-transparent transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-orange-500/10"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-orange-400 font-medium bg-orange-500/20 px-2 py-1 rounded-full">
                          {relatedArticle.category}
                        </span>
                        <span className="text-xs text-gray-400">{relatedArticle.readTime}</span>
                      </div>
                      <h4 className="text-white font-medium group-hover:text-orange-400 transition-colors duration-300 line-clamp-2">
                        {relatedArticle.title}
                      </h4>
                      <div className="mt-2 flex items-center text-xs text-gray-400 group-hover:text-orange-400 transition-colors duration-300">
                        <span>Read more</span>
                        <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center py-8">
                <div className="bg-gradient-to-r from-orange-600 to-purple-600 rounded-xl p-6 md:p-8 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-4">Ready to Start Your AI Data Analytics Journey?</h3>
                  <p className="text-sm md:text-lg mb-6 opacity-90">
                    Join thousands of professionals who have transformed their careers with our comprehensive training programs.
                  </p>
                  <button 
                    onClick={() => {
                      if (onNavigateContact) {
                        onNavigateContact();
                      }
                    }}
                    className="px-6 md:px-8 py-3 md:py-4 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2 mx-auto"
                  >
                    <span>Get Started Today</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .prose {
          color: inherit;
        }
        
        .prose p {
          margin-bottom: 1rem;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
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
        
        .fade-up {
          animation: fadeInUp 0.6s ease-out both;
        }
      `}</style>
    </div>
  );
};

export default ArticleOverlay;
