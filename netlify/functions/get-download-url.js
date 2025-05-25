const { Octokit } = require('@octokit/rest');

exports.handler = async (event, context) => {
  console.log('Get download URL function called:', event.httpMethod);
  
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Check if GitHub token is available
    if (!process.env.GH_TOKEN) {
      console.error('GH_TOKEN environment variable is not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'GitHub token not configured',
          details: 'GH_TOKEN environment variable is missing'
        }),
      };
    }

    // Initialize Octokit with the GitHub token
    const octokit = new Octokit({
      auth: process.env.GH_TOKEN,
    });

    console.log('Fetching latest release for download URL');

    // Fetch the latest release from the private repository
    const { data: release } = await octokit.rest.repos.getLatestRelease({
      owner: 'Zen0space',
      repo: 'wolf-tv',
    });

    // Find the .exe asset in the release
    const exeAsset = release.assets.find(asset => 
      asset.name.toLowerCase().endsWith('.exe')
    );

    if (!exeAsset) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ 
          error: 'No .exe file found in the latest release',
          availableAssets: release.assets.map(a => a.name)
        }),
      };
    }

    console.log('Creating authenticated download URL for:', exeAsset.name);

    // For private repositories, we need to create a URL that includes authentication
    // We'll return the asset info and let the frontend handle the download with a token
    const downloadUrl = `/.netlify/functions/stream-download?asset_id=${exeAsset.id}&filename=${encodeURIComponent(exeAsset.name)}`;

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        downloadUrl: downloadUrl,
        fileName: exeAsset.name,
        fileSize: exeAsset.size,
        assetId: exeAsset.id,
      }),
    };

  } catch (error) {
    console.error('Error getting download URL:', error);
    
    // Handle specific GitHub API errors
    if (error.status === 404) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ 
          error: 'Repository not found or no access',
          details: 'Check if the repository exists and the token has proper permissions'
        }),
      };
    }
    
    if (error.status === 401) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ 
          error: 'Unauthorized access to repository',
          details: 'Check if the GitHub token is valid and has repo access'
        }),
      };
    }
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to get download URL',
        details: error.message,
        status: error.status || 'unknown'
      }),
    };
  }
}; 