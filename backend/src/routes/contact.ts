import express from 'express';
import { ContactFormData, ApiResponse } from '../types';
import firebaseService from '../services/firebaseService';
import { validateContactForm } from '../middleware/validation';

const router = express.Router();

// POST /api/contact - Handle contact form submissions
router.post('/', validateContactForm, async (req: express.Request, res: express.Response) => {
  try {
    const formData: ContactFormData = {
      name: req.body.name,
      email: req.body.email,
      company: req.body.company,
      phone: req.body.phone,
      service: req.body.service,
      course: req.body.course,
      message: req.body.message,
      source: req.body.source
    };

    // Store in Firebase database
    let firebaseStored = false;
    try {
      firebaseStored = await firebaseService.storeContactForm(formData);
      if (firebaseStored) {
        console.log('✅ Contact form stored in Firebase successfully');
      } else {
        console.warn('⚠️ Firebase storage failed, but continuing with form submission');
      }
    } catch (firebaseError) {
      console.error('❌ Firebase service error:', firebaseError);
      console.warn('⚠️ Firebase storage failed, but continuing with form submission');
    }

    // Log the submission (in production, you might want to log to a file or service)
    console.log(`Contact form submitted from ${formData.source}:`, {
      name: formData.name,
      email: formData.email,
      timestamp: new Date().toISOString()
    });

    res.status(200).json({
      success: true,
      message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
        data: {
          submittedAt: new Date().toISOString(),
          source: formData.source,
          firebaseStored: firebaseStored
        }
    } as ApiResponse);

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : (error as Error).message
    } as ApiResponse);
  }
});

// GET /api/contact/health - Health check for contact service
router.get('/health', (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: 'Contact service is healthy',
    timestamp: new Date().toISOString()
  } as ApiResponse);
});

export default router;
