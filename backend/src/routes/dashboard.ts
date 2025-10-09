import express from 'express';
import { ApiResponse } from '../types';
import firebaseService from '../services/firebaseService';

const router = express.Router();

// GET /api/dashboard/stats - Get dashboard statistics
router.get('/stats', async (req: express.Request, res: express.Response) => {
  try {
    const stats = await firebaseService.getDashboardStats();
    
    res.status(200).json({
      success: true,
      message: 'Dashboard statistics retrieved successfully',
      data: stats
    } as ApiResponse);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve dashboard statistics',
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : (error as Error).message
    } as ApiResponse);
  }
});

// GET /api/dashboard/contacts - Get all contact forms
router.get('/contacts', async (req: express.Request, res: express.Response) => {
  try {
    const contacts = await firebaseService.getAllContactForms();
    
    res.status(200).json({
      success: true,
      message: 'Contact forms retrieved successfully',
      data: contacts
    } as ApiResponse);
  } catch (error) {
    console.error('Error fetching contact forms:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contact forms',
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : (error as Error).message
    } as ApiResponse);
  }
});

// GET /api/dashboard/newsletters - Get all newsletter subscriptions
router.get('/newsletters', async (req: express.Request, res: express.Response) => {
  try {
    const newsletters = await firebaseService.getAllNewsletterSubscriptions();
    
    res.status(200).json({
      success: true,
      message: 'Newsletter subscriptions retrieved successfully',
      data: newsletters
    } as ApiResponse);
  } catch (error) {
    console.error('Error fetching newsletter subscriptions:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve newsletter subscriptions',
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : (error as Error).message
    } as ApiResponse);
  }
});

// GET /api/dashboard/brochures - Get all brochure downloads
router.get('/brochures', async (req: express.Request, res: express.Response) => {
  try {
    const brochures = await firebaseService.getAllBrochureDownloads();
    
    res.status(200).json({
      success: true,
      message: 'Brochure downloads retrieved successfully',
      data: brochures
    } as ApiResponse);
  } catch (error) {
    console.error('Error fetching brochure downloads:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve brochure downloads',
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : (error as Error).message
    } as ApiResponse);
  }
});

// GET /api/dashboard/roadmaps - Get all roadmap selections
router.get('/roadmaps', async (req: express.Request, res: express.Response) => {
  try {
    const roadmaps = await firebaseService.getAllRoadmapSelections();
    
    res.status(200).json({
      success: true,
      message: 'Roadmap selections retrieved successfully',
      data: roadmaps
    } as ApiResponse);
  } catch (error) {
    console.error('Error fetching roadmap selections:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve roadmap selections',
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : (error as Error).message
    } as ApiResponse);
  }
});

// GET /api/dashboard/health - Health check for dashboard service
router.get('/health', (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: 'Dashboard service is healthy',
    timestamp: new Date().toISOString()
  } as ApiResponse);
});

export default router;
