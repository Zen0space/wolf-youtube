const { Octokit } = require('@octokit/rest');

exports.handler = async (event, context) => {
  console.log('Get GitHub URL function called:', event.httpMethod);
  
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

    console.log('Fetching latest release from GitHub API');

    // Fetch the latest release directly from GitHub API
    const GITHUB_RELEASE_URL = "https://api.github.com/repos/Zen0space/wolf-tv/releases/latest";
    
    const response = await fetch(GITHUB_RELEASE_URL, {
      headers: { 
        'Authorization': `Bearer ${process.env.GH_TOKEN}`,
        'User-Agent': 'wolf-youtube-downloader',
      },
    });

    if (!response.ok) {
      console.error('GitHub API error:', response.status, response.statusText);
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const releaseData = await response.json();
    console.log('Release found:', releaseData.tag_name);

    // Find the .exe asset in the release
    const exeAsset = releaseData.assets.find(asset => 
      asset.name.toLowerCase().endsWith('.exe')
    );

    if (!exeAsset) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ 
          error: 'No .exe file found in the latest release',
          availableAssets: releaseData.assets.map(a => a.name)
        }),
      };
    }

    console.log('Found .exe asset:', exeAsset.name);

    // Return the GitHub asset URL and auth token for client-side download
    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: exeAsset.url, // GitHub's authenticated asset URL
        fileName: exeAsset.name,
        fileSize: exeAsset.size,
        releaseVersion: releaseData.tag_name,
        releaseName: releaseData.name,
        releaseDate: releaseData.published_at,
        releaseNotes: releaseData.body,
        // We'll provide the token for client-side use (this is safe for temporary downloads)
        authToken: process.env.GH_TOKEN,
      }),
    };

  } catch (error) {
    console.error('Error getting GitHub URL:', error);
    
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
        error: 'Failed to get GitHub URL',
        details: error.message,
        status: error.status || 'unknown'
      }),
    };
  }
}; 