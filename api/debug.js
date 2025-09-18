export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }
  
  try {
    res.status(200).json({
      success: true,
      message: 'Debug information',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      emailUser: process.env.EMAIL_USER ? 'SET' : 'MISSING',
      emailPass: process.env.EMAIL_PASS ? 'SET' : 'MISSING',
      emailUserLength: process.env.EMAIL_USER ? process.env.EMAIL_USER.length : 0,
      emailPassLength: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0,
      allEnvVars: Object.keys(process.env).filter(key => key.includes('EMAIL'))
    });
  } catch (error) {
    console.error('❌ Debug error:', error);
    res.status(500).json({
      success: false,
      message: 'Debug failed',
      error: error.message
    });
  }
}
