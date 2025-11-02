// Vercel Serverless Function to proxy GNews API
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { category, country, page, pageSize, apiKeyIndex = '0' } = req.query;

  // Validate required parameters
  if (!category || !country || !page || !pageSize) {
    return res.status(400).json({ 
      error: 'Missing required parameters: category, country, page, pageSize',
      received: { category, country, page, pageSize }
    });
  }

  // Get API keys from environment variables (same as your .env)
  const apiKeys = [
    process.env.REACT_APP_API_KEY_1,
    process.env.REACT_APP_API_KEY_2,
    process.env.REACT_APP_API_KEY_3,
    process.env.REACT_APP_API_KEY_4
  ];

  const keyIndex = parseInt(apiKeyIndex) % apiKeys.length;
  const currentApiKey = apiKeys[keyIndex];
  
  if (!currentApiKey) {
    console.error('API Key missing for index:', keyIndex);
    console.error('Available keys:', apiKeys.map((key, i) => `${i}: ${key ? 'SET' : 'MISSING'}`));
    return res.status(500).json({ 
      error: `API key not found for index ${keyIndex}`,
      keyIndex,
      availableKeys: apiKeys.length
    });
  }

  const gnewsUrl = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=${country}&apikey=${currentApiKey}&page=${page}&pageSize=${pageSize}`;

  try {
    console.log('Fetching from GNews with key index:', keyIndex);
    const response = await fetch(gnewsUrl);
    
    // Log response details for debugging
    console.log('GNews Response Status:', response.status);
    
    if (!response.ok) {
      console.error('GNews API Error:', response.status, response.statusText);
      return res.status(response.status).json({ 
        error: `GNews API error: ${response.status} ${response.statusText}`,
        status: response.status,
        keyIndex,
        shouldSwitchKey: response.status === 403
      });
    }

    const data = await response.json();
    console.log('GNews Response Success:', data.totalArticles || 0, 'articles');
    
    // Return the data with proper structure
    res.status(200).json(data);
  } catch (error) {
    console.error('Fetch Error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch news',
      details: error.message,
      keyIndex
    });
  }
}