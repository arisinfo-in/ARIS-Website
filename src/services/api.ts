import axios from 'axios';

// API base URL - change this to your backend URL in production
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' // Use same domain as frontend (Vercel will handle routing)
  : 'http://localhost:5001';
// #region agent log
fetch('http://127.0.0.1:7242/ingest/67342be6-0439-4144-a28e-3e3b2f7d386f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.ts:6',message:'API base URL configured',data:{apiBaseUrl:API_BASE_URL,nodeEnv:process.env.NODE_ENV,origin:typeof window!=='undefined'?window.location.origin:'server'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
// #endregion

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging (development only)
api.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    
    // Handle different error types
    if (error.response?.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    }
    
    throw error;
  }
);

// Types for API responses
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  course?: string;
  message: string;
  source: 'home' | 'services' | 'training' | 'brochure';
}

export interface NewsletterData {
  email: string;
  source?: string;
}

export interface RoadmapData {
  type: 'course' | 'consulting' | 'workshop';
  email?: string;
  name?: string;
  preferences?: string[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface RoadmapType {
  id: string;
  name: string;
  description: string;
  duration: string;
  level: string;
}

// API service functions
export const apiService = {
  // Health check
  async checkHealth(): Promise<ApiResponse> {
    const response = await api.get('/health');
    return response.data;
  },

  // Contact form submission
  async submitContactForm(data: ContactFormData): Promise<ApiResponse> {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/67342be6-0439-4144-a28e-3e3b2f7d386f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.ts:103',message:'API call started',data:{endpoint:'/api/contact',baseUrl:api.defaults.baseURL,source:data.source},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    try {
      const response = await api.post('/api/contact', data);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/67342be6-0439-4144-a28e-3e3b2f7d386f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.ts:106',message:'API call succeeded',data:{status:response.status,success:response.data.success},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      return response.data;
    } catch (error: any) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/67342be6-0439-4144-a28e-3e3b2f7d386f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.ts:110',message:'API call failed',data:{errorMessage:error?.message,status:error?.response?.status,statusText:error?.response?.statusText,responseData:error?.response?.data},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      throw error;
    }
  },

  // Newsletter subscription
  async subscribeNewsletter(data: NewsletterData): Promise<ApiResponse> {
    const response = await api.post('/api/newsletter', data);
    return response.data;
  },

  // Get roadmap types
  async getRoadmapTypes(): Promise<ApiResponse<RoadmapType[]>> {
    const response = await api.get('/api/roadmap');
    return response.data;
  },

  // Submit roadmap selection
  async submitRoadmapSelection(data: RoadmapData): Promise<ApiResponse> {
    const response = await api.post('/api/roadmap/selection', data);
    return response.data;
  },
};

export default api;
