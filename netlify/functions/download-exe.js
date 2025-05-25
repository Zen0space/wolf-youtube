const { Octokit } = require('@octokit/rest');

exports.handler = async (event, context) => {
  console.log('Function called:', event.httpMethod);
  console.log('Environment check - GH_TOKEN exists:', !!process.env.GH_TOKEN);
  
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

    console.log('Fetching latest release from Zen0space/wolf-tv');

    // Fetch the latest release from the private repository
    const { data: release } = await octokit.rest.repos.getLatestRelease({
      owner: 'Zen0space',
      repo: 'wolf-tv',
    });

    console.log('Release found:', release.tag_name);
    console.log('Assets count:', release.assets.length);

    // Find the .exe asset in the release
    const exeAsset = release.assets.find(asset => 
      asset.name.toLowerCase().endsWith('.exe')
    );

    if (!exeAsset) {
      console.log('Available assets:', release.assets.map(a => a.name));
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ 
          error: 'No .exe file found in the latest release',
          availableAssets: release.assets.map(a => a.name)
        }),
      };
    }

    console.log('Found .exe asset:', exeAsset.name);

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName: exeAsset.name,
        fileSize: exeAsset.size,
        releaseVersion: release.tag_name,
        releaseName: release.name,
        releaseDate: release.published_at,
        releaseNotes: release.body,
        assetId: exeAsset.id,
      }),
    };
  } catch (error) {
    console.error('Error fetching release:', error);
    
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
        error: 'Failed to fetch the latest release',
        details: error.message,
        status: error.status || 'unknown'
      }),
    };
  }
}; 