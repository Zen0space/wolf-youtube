import { Octokit } from '@octokit/rest';

export const handler = async (event, context) => {
  console.log('Get Premium GitHub URL function called:', event.httpMethod);
  
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

    console.log('Fetching latest premium release from GitHub API');

    // Fetch the latest release directly from GitHub API
    const GITHUB_RELEASE_URL = "https://api.github.com/repos/Zen0space/wolf-tv-premium/releases/latest";
    
    const response = await fetch(GITHUB_RELEASE_URL, {
      headers: { 
        'Authorization': `Bearer ${process.env.GH_TOKEN}`,
        'User-Agent': 'wolf-youtube-premium-downloader',
      },
    });

    if (!response.ok) {
      console.error('GitHub API error:', response.status, response.statusText);
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const releaseData = await response.json();
    console.log('Premium release found:', releaseData.tag_name);

    // Find the .exe asset in the release
    const exeAsset = releaseData.assets.find(asset => 
      asset.name.toLowerCase().endsWith('.exe')
    );

    if (!exeAsset) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ 
          error: 'No .exe file found in the latest premium release',
          availableAssets: releaseData.assets.map(a => a.name)
        }),
      };
    }

    console.log('Found premium .exe asset:', exeAsset.name);

    // Return just the release information for display
    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName: exeAsset.name,
        fileSize: exeAsset.size,
        releaseVersion: releaseData.tag_name,
        releaseName: releaseData.name,
        releaseDate: releaseData.published_at,
        releaseNotes: releaseData.body,
      }),
    };

  } catch (error) {
    console.error('Error getting premium GitHub URL:', error);
    
    // Handle specific GitHub API errors
    if (error.status === 404) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ 
          error: 'Premium repository not found or no access',
          details: 'Check if the repository exists and the token has proper permissions'
        }),
      };
    }
    
    if (error.status === 401) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ 
          error: 'Unauthorized access to premium repository',
          details: 'Check if the GitHub token is valid and has repo access'
        }),
      };
    }
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to get premium GitHub URL',
        details: error.message,
        status: error.status || 'unknown'
      }),
    };
  }
};
