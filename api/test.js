// Simple test endpoint to check if environment variables are set
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const apiKeys = [
    process.env.REACT_APP_API_KEY_1,
    process.env.REACT_APP_API_KEY_2,
    process.env.REACT_APP_API_KEY_3,
    process.env.REACT_APP_API_KEY_4
  ];

  const keyStatus = apiKeys.map((key, index) => ({
    index,
    exists: !!key,
    length: key ? key.length : 0,
    preview: key ? `${key.substring(0, 8)}...` : 'MISSING'
  }));

  res.status(200).json({
    message: 'Environment test',
    timestamp: new Date().toISOString(),
    apiKeysStatus: keyStatus,
    totalKeys: apiKeys.filter(key => key).length
  });
}