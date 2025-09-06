import express from 'express';
import { RoadmapData, ApiResponse } from '../types';
import emailService from '../services/emailService';
import { validateRoadmap } from '../middleware/validation';

const router = express.Router();

// Available roadmap types
const roadmapTypes = [
  {
    id: 'course',
    name: 'AI Data Analyst Course',
    description: 'Comprehensive training program covering data analysis, AI tools, and practical applications',
    duration: '12 weeks',
    level: 'Beginner to Intermediate'
  },
  {
    id: 'consulting',
    name: 'AI Consulting Services',
    description: 'Expert consultation for AI implementation and data strategy',
    duration: 'Flexible',
    level: 'All Levels'
  },
  {
    id: 'workshop',
    name: 'Hands-on Workshop',
    description: 'Intensive hands-on workshop for practical AI and data skills',
    duration: '2-3 days',
    level: 'Intermediate to Advanced'
  }
];

// GET /api/roadmap - Get available roadmap types
router.get('/', (req: express.Request, res: express.Response) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Roadmap types retrieved successfully',
      data: roadmapTypes
    } as ApiResponse);
  } catch (error) {
    console.error('Error fetching roadmap types:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve roadmap types',
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : (error as Error).message
    } as ApiResponse);
  }
});

// POST /api/roadmap/selection - Handle roadmap selections
router.post('/selection', validateRoadmap, async (req: express.Request, res: express.Response) => {
  try {
    const roadmapData: RoadmapData = {
      type: req.body.type,
      email: req.body.email,
      name: req.body.name,
      preferences: req.body.preferences || []
    };

    // Send email notification about roadmap selection
    const emailSent = await emailService.sendRoadmapSelectionEmail(roadmapData);

    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send notification email. Please try again later.',
        error: 'Email service unavailable'
      } as ApiResponse);
    }

    // Find the selected roadmap details
    const selectedRoadmap = roadmapTypes.find(roadmap => roadmap.id === roadmapData.type);

    // Log the selection (in production, you might want to log to a file or service)
    console.log(`Roadmap selection:`, {
      type: roadmapData.type,
      email: roadmapData.email,
      name: roadmapData.name,
      timestamp: new Date().toISOString()
    });

    res.status(200).json({
      success: true,
      message: 'Roadmap selection received! We\'ll contact you soon with more details.',
      data: {
        selectedAt: new Date().toISOString(),
        roadmap: selectedRoadmap,
        contactInfo: {
          email: roadmapData.email,
          name: roadmapData.name
        }
      }
    } as ApiResponse);

  } catch (error) {
    console.error('Roadmap selection error:', error);
    
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : (error as Error).message
    } as ApiResponse);
  }
});

// GET /api/roadmap/health - Health check for roadmap service
router.get('/health', (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: 'Roadmap service is healthy',
    timestamp: new Date().toISOString()
  } as ApiResponse);
});

export default router;
