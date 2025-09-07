import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  X, Search, ChevronRight, Database, BarChart3, Brain, Code, TrendingUp, 
  Users, Zap, Target, BookOpen, Briefcase, Star, CheckCircle, 
  Clock, Award, Rocket, Shield, Layers, Cpu, 
  FileText, GitBranch, Sparkles, Eye,
  ArrowUp, ShoppingCart
} from 'lucide-react';

interface RoadmapStage {
  id: string;
  title: string;
  description: string;
  tools: string[];
  outcomes: string[];
  icon: React.ComponentType<any>;
  level: 'beginner' | 'intermediate' | 'advanced' | 'career';
  duration: string;
  cta?: string;
  progress?: number;
  prerequisites?: string[];
  projects?: string[];
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  estimatedHours: number;
  skills: string[];
}

interface RoadmapOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  roadmapType?: string;
  onNavigateContact?: () => void;
}

const RoadmapOverlay: React.FC<RoadmapOverlayProps> = ({ isOpen, onClose, roadmapType = 'course', onNavigateContact }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Comprehensive roadmap data for all types
  const getRoadmapData = (type: string): RoadmapStage[] => {
    const roadmapData = {
      course: [
    {
      id: 'foundations',
      title: 'Foundations',
      description: 'Build essential computer skills, mathematical foundations, and data literacy to start your analytics journey.',
      tools: ['Computer Basics', 'Mathematics', 'Data Literacy', 'Problem Solving'],
      outcomes: ['Basic computer proficiency', 'Mathematical thinking', 'Data awareness'],
      icon: BookOpen,
          level: 'beginner' as const,
      duration: '2-3 weeks',
      cta: 'Start here',
          difficulty: 'easy' as const,
      estimatedHours: 40,
      skills: ['Computer Literacy', 'Basic Math', 'Critical Thinking'],
      prerequisites: ['None'],
      projects: ['Data Literacy Assessment', 'Math Fundamentals Quiz']
    },
    {
      id: 'excel-powerbi',
      title: 'Excel & Power BI',
      description: 'Master spreadsheet analysis and business intelligence visualization tools for data manipulation and reporting.',
      tools: ['Excel', 'Power BI', 'Pivot Tables', 'DAX', 'Data Modeling'],
      outcomes: ['Advanced Excel skills', 'BI dashboard creation', 'Data visualization'],
      icon: BarChart3,
          level: 'beginner' as const,
      duration: '3-4 weeks',
          difficulty: 'easy' as const,
      estimatedHours: 60,
      skills: ['Excel Mastery', 'Power BI', 'Data Visualization'],
      prerequisites: ['Foundations'],
      projects: ['Sales Dashboard', 'Financial Report', 'KPI Tracking System']
    },
    {
      id: 'sql-databases',
      title: 'SQL & Databases',
      description: 'Learn database fundamentals and SQL querying to extract and manipulate data from relational databases.',
      tools: ['SQL', 'MySQL', 'PostgreSQL', 'Database Design', 'Query Optimization'],
      outcomes: ['Database querying', 'Data extraction', 'Database design'],
      icon: Database,
          level: 'intermediate' as const,
      duration: '4-5 weeks',
          difficulty: 'medium' as const,
      estimatedHours: 80,
      skills: ['SQL Querying', 'Database Design', 'Data Modeling'],
      prerequisites: ['Excel & Power BI'],
      projects: ['E-commerce Database', 'Customer Analytics Queries', 'Performance Optimization']
    },
    {
      id: 'python-data',
      title: 'Python for Data Analysis',
      description: 'Master Python programming with Pandas and NumPy for data manipulation, analysis, and scientific computing.',
      tools: ['Python', 'Pandas', 'NumPy', 'Jupyter', 'Data Structures'],
      outcomes: ['Python programming', 'Data manipulation', 'Statistical analysis'],
      icon: Code,
          level: 'intermediate' as const,
      duration: '5-6 weeks',
          difficulty: 'medium' as const,
      estimatedHours: 100,
      skills: ['Python Programming', 'Pandas', 'NumPy', 'Data Analysis'],
      prerequisites: ['SQL & Databases'],
      projects: ['Data Cleaning Pipeline', 'Statistical Analysis', 'Automated Reports']
    },
    {
      id: 'statistics-eda',
      title: 'Statistics & EDA',
      description: 'Develop statistical thinking and exploratory data analysis skills to understand and interpret data patterns.',
      tools: ['Statistics', 'EDA', 'Hypothesis Testing', 'Correlation Analysis', 'Data Profiling'],
      outcomes: ['Statistical analysis', 'Data exploration', 'Pattern recognition'],
      icon: TrendingUp,
          level: 'intermediate' as const,
      duration: '3-4 weeks',
          difficulty: 'medium' as const,
      estimatedHours: 70,
      skills: ['Statistical Analysis', 'Hypothesis Testing', 'Data Exploration'],
      prerequisites: ['Python for Data'],
      projects: ['A/B Testing Analysis', 'Customer Segmentation', 'Market Research']
    },
    {
      id: 'visualization',
      title: 'Visualization',
      description: 'Create compelling data visualizations using Power BI, Matplotlib, and Plotly to communicate insights effectively.',
      tools: ['Power BI', 'Matplotlib', 'Plotly', 'Seaborn', 'Tableau'],
      outcomes: ['Data storytelling', 'Visual communication', 'Dashboard design'],
      icon: Eye,
          level: 'intermediate' as const,
      duration: '3-4 weeks',
          difficulty: 'medium' as const,
      estimatedHours: 60,
      skills: ['Data Visualization', 'Dashboard Design', 'Storytelling'],
      prerequisites: ['Statistics & EDA'],
      projects: ['Interactive Dashboard', 'Executive Reports', 'Data Story Presentation']
    },
    {
      id: 'machine-learning',
      title: 'Machine Learning',
      description: 'Build and deploy machine learning models using supervised and unsupervised learning techniques.',
      tools: ['Scikit-learn', 'TensorFlow', 'Model Evaluation', 'Feature Engineering', 'Cross-validation'],
      outcomes: ['ML model building', 'Model evaluation', 'Predictive analytics'],
      icon: Brain,
          level: 'advanced' as const,
      duration: '6-8 weeks',
          difficulty: 'hard' as const,
      estimatedHours: 120,
      skills: ['Machine Learning', 'Model Building', 'Feature Engineering'],
      prerequisites: ['Visualization'],
      projects: ['Predictive Model', 'Classification System', 'Recommendation Engine']
    },
    {
      id: 'mlops',
      title: 'MLOps Basics',
      description: 'Learn machine learning operations including environment management, versioning, and model deployment.',
      tools: ['Docker', 'Git', 'MLflow', 'Model Versioning', 'CI/CD'],
      outcomes: ['Model deployment', 'Version control', 'Production ML'],
      icon: GitBranch,
          level: 'advanced' as const,
      duration: '3-4 weeks',
          difficulty: 'hard' as const,
      estimatedHours: 80,
      skills: ['MLOps', 'Docker', 'CI/CD', 'Model Deployment'],
      prerequisites: ['Machine Learning'],
      projects: ['ML Pipeline', 'Model Registry', 'Automated Deployment']
    },
    {
      id: 'ai-genai',
      title: 'AI & GenAI',
      description: 'Explore large language models, prompt engineering, and retrieval-augmented generation for AI applications.',
      tools: ['LLMs', 'Prompting', 'RAG', 'OpenAI API', 'LangChain'],
      outcomes: ['AI integration', 'Prompt engineering', 'Generative AI'],
      icon: Sparkles,
          level: 'advanced' as const,
      duration: '4-5 weeks',
          difficulty: 'expert' as const,
      estimatedHours: 90,
      skills: ['LLMs', 'Prompt Engineering', 'RAG', 'AI Integration'],
      prerequisites: ['MLOps Basics'],
      projects: ['AI Chatbot', 'Document Q&A System', 'Content Generator']
    },
    {
      id: 'projects-portfolio',
      title: 'Projects & Portfolio',
      description: 'Build real-world projects and create a professional portfolio to showcase your data analytics skills.',
      tools: ['GitHub', 'Portfolio Website', 'Project Documentation', 'Case Studies'],
      outcomes: ['Professional portfolio', 'Real-world experience', 'Industry readiness'],
      icon: Target,
          level: 'career' as const,
      duration: 'Ongoing',
      cta: 'See portfolio tips',
          difficulty: 'medium' as const,
      estimatedHours: 100,
      skills: ['Portfolio Development', 'Project Management', 'Documentation'],
      prerequisites: ['AI & GenAI'],
      projects: ['Portfolio Website', 'Case Study Collection', 'GitHub Repository']
    },
    {
      id: 'careers-interview',
      title: 'Careers & Interview Prep',
      description: 'Prepare for data analytics roles with interview practice, resume building, and career strategy guidance.',
      tools: ['Resume Building', 'Interview Prep', 'Networking', 'Job Search Strategy'],
      outcomes: ['Job readiness', 'Interview skills', 'Career planning'],
      icon: Briefcase,
          level: 'career' as const,
      duration: '2-3 weeks',
          difficulty: 'medium' as const,
      estimatedHours: 50,
      skills: ['Interview Skills', 'Resume Writing', 'Networking'],
      prerequisites: ['Projects & Portfolio'],
      projects: ['Resume Optimization', 'Mock Interviews', 'LinkedIn Profile']
    }
      ],
      career: [
        {
          id: 'data-analyst-jr',
          title: 'Junior Data Analyst',
          description: 'Entry-level position focusing on data collection, cleaning, and basic analysis using Excel and SQL.',
          tools: ['Excel', 'SQL', 'Power BI', 'Google Analytics', 'Basic Statistics'],
          outcomes: ['Data cleaning skills', 'Basic reporting', 'Dashboard creation'],
          icon: BarChart3,
          level: 'beginner' as const,
          duration: '6-12 months',
          difficulty: 'easy' as const,
          estimatedHours: 200,
          skills: ['Data Cleaning', 'Basic SQL', 'Excel Mastery', 'Reporting'],
          prerequisites: ['None'],
          projects: ['Monthly Sales Report', 'Customer Analytics Dashboard', 'Data Quality Assessment']
        },
        {
          id: 'data-analyst-sr',
          title: 'Senior Data Analyst',
          description: 'Advanced analytical role with Python, statistical modeling, and business intelligence expertise.',
          tools: ['Python', 'R', 'Advanced SQL', 'Tableau', 'Statistical Modeling'],
          outcomes: ['Advanced analytics', 'Predictive modeling', 'Business insights'],
          icon: TrendingUp,
          level: 'intermediate' as const,
          duration: '1-2 years',
          difficulty: 'medium' as const,
          estimatedHours: 300,
          skills: ['Python', 'Statistical Analysis', 'Advanced SQL', 'Business Intelligence'],
          prerequisites: ['Junior Data Analyst'],
          projects: ['Predictive Sales Model', 'Customer Churn Analysis', 'Executive Dashboard']
        },
        {
          id: 'data-scientist',
          title: 'Data Scientist',
          description: 'Machine learning and advanced analytics role focusing on predictive modeling and AI solutions.',
          tools: ['Python', 'Machine Learning', 'Deep Learning', 'Cloud Platforms', 'MLOps'],
          outcomes: ['ML model development', 'AI solution design', 'Advanced analytics'],
          icon: Brain,
          level: 'advanced' as const,
          duration: '2-3 years',
          difficulty: 'hard' as const,
          estimatedHours: 400,
          skills: ['Machine Learning', 'Deep Learning', 'Python', 'Cloud Computing'],
          prerequisites: ['Senior Data Analyst'],
          projects: ['ML Pipeline', 'AI Recommendation System', 'NLP Model']
        },
        {
          id: 'ai-data-analyst',
          title: 'AI Data Analyst',
          description: 'Specialized role combining traditional analytics with AI/ML and generative AI technologies.',
          tools: ['LLMs', 'Generative AI', 'Prompt Engineering', 'AI Tools', 'Advanced Analytics'],
          outcomes: ['AI integration', 'Generative AI expertise', 'Advanced automation'],
          icon: Sparkles,
          level: 'advanced' as const,
          duration: '3-4 years',
          difficulty: 'expert' as const,
          estimatedHours: 500,
          skills: ['Generative AI', 'LLMs', 'AI Integration', 'Advanced Analytics'],
          prerequisites: ['Data Scientist'],
          projects: ['AI-Powered Dashboard', 'Automated Report Generation', 'Intelligent Data Pipeline']
        },
        {
          id: 'lead-data-analyst',
          title: 'Lead Data Analyst',
          description: 'Leadership role managing data teams and driving data strategy across organizations.',
          tools: ['Team Management', 'Data Strategy', 'Stakeholder Communication', 'Project Management'],
          outcomes: ['Team leadership', 'Strategic planning', 'Cross-functional collaboration'],
          icon: Users,
          level: 'career' as const,
          duration: '4-5 years',
          difficulty: 'expert' as const,
          estimatedHours: 600,
          skills: ['Leadership', 'Data Strategy', 'Team Management', 'Communication'],
          prerequisites: ['AI Data Analyst'],
          projects: ['Data Team Building', 'Data Strategy Implementation', 'Cross-functional Initiative']
        },
        {
          id: 'chief-data-officer',
          title: 'Chief Data Officer',
          description: 'Executive role responsible for data governance, strategy, and driving data-driven culture.',
          tools: ['Data Governance', 'Executive Leadership', 'Strategic Planning', 'Change Management'],
          outcomes: ['Executive leadership', 'Data governance', 'Organizational transformation'],
          icon: Award,
          level: 'career' as const,
          duration: '5+ years',
          difficulty: 'expert' as const,
          estimatedHours: 800,
          skills: ['Executive Leadership', 'Data Governance', 'Strategic Planning', 'Change Management'],
          prerequisites: ['Lead Data Analyst'],
          projects: ['Data Governance Framework', 'Organizational Data Strategy', 'Digital Transformation']
        }
      ],
      project: [
        {
          id: 'ecommerce-analytics',
          title: 'E-commerce Dashboard',
          description: 'Build a comprehensive analytics dashboard for an e-commerce platform with real-time metrics and insights.',
          tools: ['Python', 'Streamlit', 'PostgreSQL', 'Plotly', 'AWS'],
          outcomes: ['Real-time dashboard', 'E-commerce metrics', 'Cloud deployment'],
          icon: BarChart3,
          level: 'intermediate' as const,
          duration: '4-6 weeks',
          difficulty: 'medium' as const,
          estimatedHours: 80,
          skills: ['Python', 'Dashboard Development', 'Cloud Computing', 'Database Design'],
          prerequisites: ['Python Basics', 'SQL Fundamentals'],
          projects: ['Sales Analytics', 'Customer Behavior Analysis', 'Inventory Management']
        },
        {
          id: 'ml-churn-prediction',
          title: 'Customer Churn Model',
          description: 'Develop a machine learning model to predict customer churn with 90%+ accuracy using real business data.',
          tools: ['Python', 'Scikit-learn', 'Pandas', 'Jupyter', 'MLflow'],
          outcomes: ['ML model deployment', 'High accuracy prediction', 'Business impact'],
          icon: Brain,
          level: 'advanced' as const,
          duration: '6-8 weeks',
          difficulty: 'hard' as const,
          estimatedHours: 120,
          skills: ['Machine Learning', 'Model Deployment', 'Feature Engineering', 'MLOps'],
          prerequisites: ['Python Advanced', 'Machine Learning Basics'],
          projects: ['Data Preprocessing Pipeline', 'Model Training & Validation', 'Production Deployment']
        },
        {
          id: 'ai-chatbot',
          title: 'AI-Powered Chatbot',
          description: 'Create an intelligent chatbot using LLMs for customer support with RAG and conversation memory.',
          tools: ['OpenAI API', 'LangChain', 'Vector Database', 'FastAPI', 'Docker'],
          outcomes: ['AI chatbot', 'RAG implementation', 'Production deployment'],
          icon: Sparkles,
          level: 'advanced' as const,
          duration: '5-7 weeks',
          difficulty: 'expert' as const,
          estimatedHours: 100,
          skills: ['LLMs', 'RAG', 'API Development', 'Vector Databases'],
          prerequisites: ['Python Advanced', 'API Development'],
          projects: ['Knowledge Base Creation', 'Conversation Flow Design', 'Performance Optimization']
        },
        {
          id: 'real-time-data-pipeline',
          title: 'Data Pipeline',
          description: 'Build a scalable real-time data processing pipeline using Apache Kafka and cloud services.',
          tools: ['Apache Kafka', 'Python', 'AWS Kinesis', 'Docker', 'Kubernetes'],
          outcomes: ['Real-time processing', 'Scalable architecture', 'Cloud deployment'],
          icon: Zap,
          level: 'advanced' as const,
          duration: '6-10 weeks',
          difficulty: 'expert' as const,
          estimatedHours: 150,
          skills: ['Stream Processing', 'Cloud Architecture', 'Containerization', 'Scalability'],
          prerequisites: ['Python Advanced', 'Cloud Computing'],
          projects: ['Data Ingestion System', 'Stream Processing Logic', 'Monitoring & Alerting']
        },
        {
          id: 'computer-vision-app',
          title: 'CV Product Classifier',
          description: 'Develop a computer vision application for automated product classification using deep learning.',
          tools: ['TensorFlow', 'OpenCV', 'Flask', 'Docker', 'AWS EC2'],
          outcomes: ['CV model', 'Web application', 'Image processing'],
          icon: Eye,
          level: 'advanced' as const,
          duration: '8-12 weeks',
          difficulty: 'expert' as const,
          estimatedHours: 200,
          skills: ['Computer Vision', 'Deep Learning', 'Web Development', 'Model Optimization'],
          prerequisites: ['Python Advanced', 'Deep Learning'],
          projects: ['Image Dataset Creation', 'Model Training', 'Web Interface Development']
        }
      ],
      domain: [
        {
          id: 'healthcare-analytics',
          title: 'Healthcare Data Analytics',
          description: 'Specialized analytics for healthcare data including patient outcomes, clinical trials, and medical imaging.',
          tools: ['Python', 'Medical Imaging Libraries', 'HIPAA Compliance', 'Clinical Data Standards'],
          outcomes: ['Healthcare insights', 'Compliance knowledge', 'Medical data analysis'],
          icon: Shield,
          level: 'advanced' as const,
          duration: '6-8 months',
          difficulty: 'hard' as const,
          estimatedHours: 200,
          skills: ['Healthcare Data', 'Medical Imaging', 'Compliance', 'Clinical Analytics'],
          prerequisites: ['Python Advanced', 'Statistics'],
          projects: ['Patient Outcome Analysis', 'Clinical Trial Dashboard', 'Medical Image Classification']
        },
        {
          id: 'fintech-analytics',
          title: 'FinTech & Financial Analytics',
          description: 'Financial data analysis including risk assessment, fraud detection, and algorithmic trading insights.',
          tools: ['Python', 'Financial APIs', 'Risk Models', 'Regulatory Compliance', 'Time Series Analysis'],
          outcomes: ['Financial modeling', 'Risk assessment', 'Regulatory compliance'],
          icon: TrendingUp,
          level: 'advanced' as const,
          duration: '6-8 months',
          difficulty: 'hard' as const,
          estimatedHours: 180,
          skills: ['Financial Modeling', 'Risk Analysis', 'Time Series', 'Regulatory Knowledge'],
          prerequisites: ['Python Advanced', 'Statistics', 'Finance Basics'],
          projects: ['Fraud Detection Model', 'Risk Assessment Dashboard', 'Trading Algorithm']
        },
        {
          id: 'ecommerce-domain',
          title: 'E-commerce & Retail Analytics',
          description: 'E-commerce focused analytics including customer behavior, supply chain optimization, and recommendation systems.',
          tools: ['Python', 'Recommendation Engines', 'A/B Testing', 'Supply Chain Analytics'],
          outcomes: ['E-commerce insights', 'Recommendation systems', 'Supply chain optimization'],
          icon: ShoppingCart,
          level: 'intermediate' as const,
          duration: '4-6 months',
          difficulty: 'medium' as const,
          estimatedHours: 150,
          skills: ['E-commerce Analytics', 'Recommendation Systems', 'A/B Testing', 'Supply Chain'],
          prerequisites: ['Python Intermediate', 'Machine Learning Basics'],
          projects: ['Customer Segmentation', 'Product Recommendation Engine', 'Inventory Optimization']
        },
        {
          id: 'manufacturing-iot',
          title: 'Manufacturing & IoT Analytics',
          description: 'Industrial analytics for manufacturing processes, IoT sensor data, and predictive maintenance.',
          tools: ['Python', 'IoT Platforms', 'Time Series Analysis', 'Predictive Maintenance', 'Edge Computing'],
          outcomes: ['IoT analytics', 'Predictive maintenance', 'Manufacturing optimization'],
          icon: Cpu,
          level: 'advanced' as const,
          duration: '6-8 months',
          difficulty: 'hard' as const,
          estimatedHours: 220,
          skills: ['IoT Analytics', 'Time Series', 'Predictive Maintenance', 'Edge Computing'],
          prerequisites: ['Python Advanced', 'Time Series Analysis'],
          projects: ['Predictive Maintenance Model', 'IoT Dashboard', 'Quality Control System']
        },
        {
          id: 'marketing-analytics',
          title: 'Marketing & Digital Analytics',
          description: 'Marketing-focused analytics including campaign optimization, customer journey analysis, and attribution modeling.',
          tools: ['Google Analytics', 'Marketing Automation', 'Attribution Models', 'Customer Journey Mapping'],
          outcomes: ['Marketing insights', 'Campaign optimization', 'Customer journey analysis'],
          icon: Target,
          level: 'intermediate' as const,
          duration: '4-6 months',
          difficulty: 'medium' as const,
          estimatedHours: 140,
          skills: ['Marketing Analytics', 'Attribution Modeling', 'Customer Journey', 'Campaign Optimization'],
          prerequisites: ['Analytics Basics', 'Marketing Knowledge'],
          projects: ['Attribution Model', 'Customer Journey Dashboard', 'Campaign Performance Analysis']
        }
      ]
    };

    return roadmapData[type as keyof typeof roadmapData] || roadmapData.course;
  };

  const roadmapStages = getRoadmapData(roadmapType);

  // Filter stages based on search term
  const filteredStages = roadmapStages.filter(stage =>
    stage.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stage.tools.some(tool => tool.toLowerCase().includes(searchTerm.toLowerCase())) ||
    stage.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              setActiveSection(sectionId);
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
  }, [isOpen, filteredStages]);

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

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId: string) => {
    const element = sectionRefs.current.get(sectionId);
    if (element && contentRef.current) {
      const container = contentRef.current;
      // Calculate proper offset for sticky header (header height + some padding)
      const headerHeight = 180; // Approximate height of sticky header including navigation
      const elementTop = element.offsetTop - headerHeight;
      
      container.scrollTo({
        top: Math.max(0, elementTop), // Ensure we don't scroll to negative values
        behavior: 'smooth'
      });
    }
  }, []);


  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Get level color
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'advanced': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'career': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'hard': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'expert': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Get difficulty icon
  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return <CheckCircle className="w-3 h-3" />;
      case 'medium': return <Clock className="w-3 h-3" />;
      case 'hard': return <Zap className="w-3 h-3" />;
      case 'expert': return <Award className="w-3 h-3" />;
      default: return <Star className="w-3 h-3" />;
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
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-pink-500/30 to-orange-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
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
          <div className="absolute bottom-20 right-20 w-10 h-10 bg-green-500/40 rounded-full animate-bounce" style={{ animationDelay: '3s' }}></div>
          
          {/* Additional floating icons */}
          <div className="absolute top-1/3 left-1/3 w-6 h-6 bg-gradient-to-br from-cyan-500/50 to-blue-600/50 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}>
            <Database className="w-4 h-4 text-white m-1" />
          </div>
          <div className="absolute top-2/3 right-1/3 w-6 h-6 bg-gradient-to-br from-emerald-500/50 to-green-600/50 rounded-full animate-pulse" style={{ animationDelay: '1.2s' }}>
            <Brain className="w-4 h-4 text-white m-1" />
          </div>
          <div className="absolute bottom-1/3 left-1/2 w-6 h-6 bg-gradient-to-br from-violet-500/50 to-purple-600/50 rounded-full animate-pulse" style={{ animationDelay: '1.8s' }}>
            <Code className="w-4 h-4 text-white m-1" />
          </div>
        </div>
      </div>

      {/* Main Overlay Content */}
      <div 
        ref={overlayRef}
        className="relative w-full h-full max-w-7xl mx-auto bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700 shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="roadmap-title"
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            <div className="flex-1">
              <h1 id="roadmap-title" className="text-lg md:text-2xl font-bold text-white mb-1">
                {roadmapType === 'course' && 'Course Roadmap - Data Analytics & AI'}
                {roadmapType === 'career' && 'Career Roadmap - Professional Growth'}
                {roadmapType === 'project' && 'Project Roadmap - Real-World Applications'}
                {roadmapType === 'domain' && 'Domain Roadmap - Industry Specialization'}
              </h1>
              <p className="text-gray-400 text-xs md:text-sm">
                {roadmapType === 'course' && 'Your complete learning journey from beginner to AI data analyst'}
                {roadmapType === 'career' && 'Strategic career progression and role advancement path'}
                {roadmapType === 'project' && 'Hands-on projects to build your portfolio and expertise'}
                {roadmapType === 'domain' && 'Specialized knowledge for specific industry domains'}
              </p>
            </div>
            
            {/* Search Input */}
            <div className="flex-1 max-w-md md:mx-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search stages, tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm"
                />
              </div>
            </div>

            {/* Interactive Controls */}
            <div className="flex items-center space-x-2">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-300 group"
                aria-label="Close roadmap"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </button>
            </div>
          </div>

          {/* Mini Navigation - Mobile Optimized */}
          <nav className="mt-3 md:mt-4 grid grid-cols-1 md:grid-cols-6 gap-2 pb-2 md:pb-0">
            {/* Mobile: Single column with horizontal scroll */}
            <div className="md:hidden flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {roadmapStages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => scrollToSection(stage.id)}
                  className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap text-center flex-shrink-0 ${
                    activeSection === stage.id
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {stage.title}
                </button>
              ))}
              {/* Start Journey Button */}
              <button
                onClick={() => {
                  const footerElement = document.querySelector('.roadmap-footer-cta');
                  if (footerElement && contentRef.current) {
                    const container = contentRef.current;
                    const elementTop = (footerElement as HTMLElement).offsetTop - 180;
                    container.scrollTo({
                      top: Math.max(0, elementTop),
                      behavior: 'smooth'
                    });
                  }
                }}
                className="px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap text-center bg-gradient-to-r from-orange-600 to-purple-600 text-white hover:from-orange-700 hover:to-purple-700 shadow-lg flex-shrink-0"
              >
                Start Journey
              </button>
            </div>
            
            {/* Desktop: Grid layout */}
            <div className="hidden md:contents">
              {roadmapStages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => scrollToSection(stage.id)}
                  className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap text-center ${
                    activeSection === stage.id
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {stage.title}
                </button>
              ))}
              {/* Start Journey Button */}
              <button
                onClick={() => {
                  const footerElement = document.querySelector('.roadmap-footer-cta');
                  if (footerElement && contentRef.current) {
                    const container = contentRef.current;
                    const elementTop = (footerElement as HTMLElement).offsetTop - 180;
                    container.scrollTo({
                      top: Math.max(0, elementTop),
                      behavior: 'smooth'
                    });
                  }
                }}
                className="px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap text-center bg-gradient-to-r from-orange-600 to-purple-600 text-white hover:from-orange-700 hover:to-purple-700 shadow-lg"
              >
                Start Journey
              </button>
            </div>
          </nav>
        </header>

        {/* Scrollable Content */}
        <div 
          ref={contentRef}
          className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
          style={{ height: 'calc(100vh - 180px)' }}
        >
          <div className="px-3 md:px-6 py-4 md:py-8 space-y-4 md:space-y-8">
            {/* Roadmap Stages */}
            {filteredStages.map((stage, index) => {
              const IconComponent = stage.icon;
              const isVisible = visibleSections.has(stage.id);
              
              return (
                <div
                  key={stage.id}
                  ref={(el) => {
                    if (el) sectionRefs.current.set(stage.id, el);
                  }}
                  data-section-id={stage.id}
                  className={`roadmap-stage group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl md:rounded-2xl p-3 md:p-8 transition-all duration-700 hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-500/30 ${
                    isVisible ? 'fade-up opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-6">
                    {/* Stage Icon */}
                    <div className="flex-shrink-0 flex justify-center md:justify-start">
                      <div className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg md:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <IconComponent className="w-5 h-5 md:w-8 md:h-8 text-white" />
                      </div>
                    </div>

                    {/* Stage Content */}
                    <div className="flex-1 space-y-3 md:space-y-4">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                        <div>
                          <h2 className="text-lg md:text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                            {stage.title}
                          </h2>
                          <div className="flex flex-wrap items-center gap-1 md:gap-2 mb-2">
                            <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(stage.level)} flex items-center space-x-1`}>
                              <span>{stage.level.charAt(0).toUpperCase() + stage.level.slice(1)}</span>
                            </span>
                            <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(stage.difficulty)} flex items-center space-x-1`}>
                              {getDifficultyIcon(stage.difficulty)}
                              <span>{stage.difficulty.charAt(0).toUpperCase() + stage.difficulty.slice(1)}</span>
                            </span>
                            <span className="px-2 md:px-3 py-1 rounded-full text-xs font-medium border bg-gray-700/50 text-gray-300 border-gray-600 flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{stage.duration}</span>
                            </span>
                            <span className="px-2 md:px-3 py-1 rounded-full text-xs font-medium border bg-gray-700/50 text-gray-300 border-gray-600 flex items-center space-x-1">
                              <Target className="w-3 h-3" />
                              <span>{stage.estimatedHours}h</span>
                            </span>
                          </div>
                        </div>
                        {stage.cta && (
                          <button className="px-3 md:px-4 py-2 bg-orange-600 text-white rounded-lg text-xs md:text-sm font-medium hover:bg-orange-700 transition-colors duration-300 flex items-center space-x-2 w-fit">
                            <span>{stage.cta}</span>
                            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 text-sm md:text-lg leading-relaxed">
                        {stage.description}
                      </p>

                      {/* Enhanced Information Grid - Mobile Optimized */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                        {/* Tools */}
                        <div>
                          <h3 className="text-xs md:text-sm font-semibold text-orange-400 mb-2 md:mb-3 uppercase tracking-wide flex items-center space-x-1 md:space-x-2">
                            <Layers className="w-3 h-3 md:w-4 md:h-4" />
                            <span>Key Tools</span>
                          </h3>
                          <div className="space-y-1 md:space-y-2">
                            {stage.tools.map((tool, toolIndex) => (
                              <div 
                                key={toolIndex}
                                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group"
                                style={{ transitionDelay: `${(index * 100) + (toolIndex * 50)}ms` }}
                              >
                                <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                                <span className="text-xs md:text-sm">{tool}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Outcomes */}
                        <div>
                          <h3 className="text-xs md:text-sm font-semibold text-green-400 mb-2 md:mb-3 uppercase tracking-wide flex items-center space-x-1 md:space-x-2">
                            <Award className="w-3 h-3 md:w-4 md:h-4" />
                            <span>Learning Outcomes</span>
                          </h3>
                          <div className="space-y-1 md:space-y-2">
                            {stage.outcomes.map((outcome, outcomeIndex) => (
                              <div 
                                key={outcomeIndex}
                                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group"
                                style={{ transitionDelay: `${(index * 100) + (outcomeIndex * 50)}ms` }}
                              >
                                <Star className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                                <span className="text-xs md:text-sm">{outcome}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Projects */}
                        <div>
                          <h3 className="text-xs md:text-sm font-semibold text-blue-400 mb-2 md:mb-3 uppercase tracking-wide flex items-center space-x-1 md:space-x-2">
                            <Rocket className="w-3 h-3 md:w-4 md:h-4" />
                            <span>Projects</span>
                          </h3>
                          <div className="space-y-1 md:space-y-2">
                            {stage.projects?.map((project, projectIndex) => (
                              <div 
                                key={projectIndex}
                                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group"
                                style={{ transitionDelay: `${(index * 100) + (projectIndex * 50)}ms` }}
                              >
                                <FileText className="w-2.5 h-2.5 md:w-3 md:h-3 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                                <span className="text-xs md:text-sm">{project}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Prerequisites */}
                      {stage.prerequisites && stage.prerequisites.length > 0 && (
                        <div className="mt-3 md:mt-4">
                          <h3 className="text-xs md:text-sm font-semibold text-purple-400 mb-2 md:mb-3 uppercase tracking-wide flex items-center space-x-1 md:space-x-2">
                            <ArrowUp className="w-3 h-3 md:w-4 md:h-4" />
                            <span>Prerequisites</span>
                          </h3>
                          <div className="flex flex-wrap gap-1 md:gap-2">
                            {stage.prerequisites.map((prereq, prereqIndex) => (
                              <span 
                                key={prereqIndex}
                                className="px-2 md:px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-medium hover:bg-purple-500/30 transition-colors duration-300"
                              >
                                {prereq}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Footer CTA */}
            <div className="text-center py-6 md:py-12 roadmap-footer-cta">
              <div className="bg-gradient-to-r from-orange-600 to-purple-600 rounded-xl md:rounded-2xl p-4 md:p-8 text-white">
                <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4">Ready to Start Your Journey?</h3>
                <p className="text-sm md:text-lg mb-4 md:mb-6 opacity-90">
                  Join thousands of professionals who have transformed their careers with our AI data analytics training.
                </p>
                <button 
                  onClick={() => {
                    if (onNavigateContact) {
                      onNavigateContact();
                    }
                  }}
                  className="px-4 md:px-8 py-2 md:py-4 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2 mx-auto text-sm md:text-base"
                >
                  <span>Get Started Today</span>
                  <ChevronRight className="w-3 h-3 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapOverlay;
