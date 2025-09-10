import express from 'express';
import { ContactFormData, ApiResponse } from '../types';
import emailService from '../services/emailService';
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

    // Send email notification (optional - don't fail if email fails)
    let emailSent = false;
    try {
      emailSent = await emailService.sendContactFormEmail(formData);
      if (emailSent) {
        console.log('✅ Email notification sent successfully');
      } else {
        console.warn('⚠️ Email notification failed, but continuing with form submission');
      }
    } catch (emailError) {
      console.error('❌ Email service error:', emailError);
      console.warn('⚠️ Email notification failed, but continuing with form submission');
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
        emailNotificationSent: emailSent
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
