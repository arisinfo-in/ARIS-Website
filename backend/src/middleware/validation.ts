import { Request, Response, NextFunction } from 'express';

// Simple email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Contact form validation - Simple and reliable
export const validateContactForm = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, company, phone, service, course, message, source } = req.body;
  const errors: Array<{ field: string; message: string }> = [];

  console.log('🔍 Validating contact form data:', req.body);

  // Required fields validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
  }
  
  if (!email || typeof email !== 'string' || !isValidEmail(email.trim())) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  }
  
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters long' });
  }

  // Optional fields validation
  if (company && typeof company === 'string' && company.trim().length > 200) {
    errors.push({ field: 'company', message: 'Company name must be less than 200 characters' });
  }
  
  if (phone && typeof phone === 'string' && (phone.trim().length < 10 || phone.trim().length > 15)) {
    errors.push({ field: 'phone', message: 'Phone number must be between 10 and 15 characters' });
  }
  
  if (service && typeof service === 'string' && service.trim().length > 100) {
    errors.push({ field: 'service', message: 'Service selection must be less than 100 characters' });
  }
  
  if (course && typeof course === 'string' && course.trim().length > 100) {
    errors.push({ field: 'course', message: 'Course selection must be less than 100 characters' });
  }

  // Source validation
  if (!source || !['home', 'services', 'training'].includes(source)) {
    errors.push({ field: 'source', message: 'Invalid source specified' });
  }

  if (errors.length > 0) {
    console.log('❌ Contact form validation errors:', errors);
    console.log('📝 Request body:', req.body);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  console.log('✅ Contact form validation passed');
  next();
};

// Newsletter validation - Simple and reliable
export const validateNewsletter = (req: Request, res: Response, next: NextFunction) => {
  const { email, source } = req.body;
  const errors: Array<{ field: string; message: string }> = [];

  console.log('🔍 Validating newsletter data:', req.body);

  if (!email || typeof email !== 'string' || !isValidEmail(email.trim())) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  }
  
  if (source && typeof source === 'string' && source.trim().length > 50) {
    errors.push({ field: 'source', message: 'Source must be less than 50 characters' });
  }

  if (errors.length > 0) {
    console.log('❌ Newsletter validation errors:', errors);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  console.log('✅ Newsletter validation passed');
  next();
};

// Roadmap validation - Simple and reliable
export const validateRoadmap = (req: Request, res: Response, next: NextFunction) => {
  const { type, email, name, preferences } = req.body;
  const errors: Array<{ field: string; message: string }> = [];

  console.log('🔍 Validating roadmap data:', req.body);

  if (!type || !['course', 'consulting', 'workshop'].includes(type)) {
    errors.push({ field: 'type', message: 'Invalid roadmap type specified' });
  }
  
  if (email && typeof email === 'string' && !isValidEmail(email.trim())) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  }
  
  if (name && typeof name === 'string' && (name.trim().length < 2 || name.trim().length > 100)) {
    errors.push({ field: 'name', message: 'Name must be between 2 and 100 characters' });
  }
  
  if (preferences && !Array.isArray(preferences)) {
    errors.push({ field: 'preferences', message: 'Preferences must be an array' });
  }
  
  if (preferences && Array.isArray(preferences)) {
    preferences.forEach((pref: any, index: number) => {
      if (typeof pref === 'string' && pref.trim().length > 100) {
        errors.push({ field: `preferences[${index}]`, message: 'Each preference must be less than 100 characters' });
      }
    });
  }

  if (errors.length > 0) {
    console.log('❌ Roadmap validation errors:', errors);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  console.log('✅ Roadmap validation passed');
  next();
};
