// Simple endpoint to test if environment variables are set up correctly
export default function handler(req, res) {
  // Check if environment variables are available
  const keys = [
    process.env.REACT_APP_API_KEY_1,
    process.env.REACT_APP_API_KEY_2,
    process.env.REACT_APP_API_KEY_3,
    process.env.REACT_APP_API_KEY_4
  ];

  const availableKeys = keys.filter(key => key && key !== 'undefined').length;
  
  res.status(200).json({
    message: 'Environment Variables Test',
    availableKeys,
    keysStatus: {
      key1: process.env.REACT_APP_API_KEY_1 ? 'Set' : 'Missing',
      key2: process.env.REACT_APP_API_KEY_2 ? 'Set' : 'Missing',
      key3: process.env.REACT_APP_API_KEY_3 ? 'Set' : 'Missing',
      key4: process.env.REACT_APP_API_KEY_4 ? 'Set' : 'Missing'
    },
    environment: process.env.NODE_ENV || 'unknown'
  });
}