export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  course?: string;
  message: string;
  source: 'home' | 'services' | 'training';
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

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}
