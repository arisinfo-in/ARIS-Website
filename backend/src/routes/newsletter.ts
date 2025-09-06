import express from 'express';
import { NewsletterData, ApiResponse } from '../types';
import emailService from '../services/emailService';
import { validateNewsletter } from '../middleware/validation';

const router = express.Router();

// POST /api/newsletter - Handle newsletter subscriptions
router.post('/', validateNewsletter, async (req: express.Request, res: express.Response) => {
  try {
    const newsletterData: NewsletterData = {
      email: req.body.email,
      source: req.body.source || 'website'
    };

    // Send welcome email to subscriber
    const emailSent = await emailService.sendNewsletterConfirmation(newsletterData);

    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send confirmation email. Please try again later.',
        error: 'Email service unavailable'
      } as ApiResponse);
    }

    // Log the subscription (in production, you might want to log to a file or service)
    console.log(`Newsletter subscription:`, {
      email: newsletterData.email,
      source: newsletterData.source,
      timestamp: new Date().toISOString()
    });

    res.status(200).json({
      success: true,
      message: 'Successfully subscribed to our newsletter! Check your email for confirmation.',
      data: {
        subscribedAt: new Date().toISOString(),
        email: newsletterData.email
      }
    } as ApiResponse);

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : (error as Error).message
    } as ApiResponse);
  }
});

// GET /api/newsletter/health - Health check for newsletter service
router.get('/health', (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: 'Newsletter service is healthy',
    timestamp: new Date().toISOString()
  } as ApiResponse);
});

export default router;
