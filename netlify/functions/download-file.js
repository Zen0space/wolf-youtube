const { Octokit } = require('@octokit/rest');

exports.handler = async (event, context) => {
  console.log('Download function called:', event.httpMethod);
  
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

    console.log('Fetching latest release for download');

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

    console.log('Downloading asset:', exeAsset.name);

    // Construct the GitHub API URL for the asset
    const assetUrl = `https://api.github.com/repos/Zen0space/wolf-tv/releases/assets/${exeAsset.id}`;

    // Fetch the asset with proper authentication
    const assetResponse = await fetch(assetUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.GH_TOKEN}`,
        'Accept': 'application/octet-stream',
        'User-Agent': 'wolf-youtube-downloader',
      },
    });

    if (!assetResponse.ok) {
      console.error('Failed to fetch asset:', assetResponse.status, assetResponse.statusText);
      throw new Error(`Failed to fetch asset: ${assetResponse.statusText}`);
    }

    // Get the file data as array buffer
    const arrayBuffer = await assetResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('Asset downloaded successfully, size:', buffer.length);

    // Return the file with proper headers for download
    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${exeAsset.name}"`,
        'Content-Length': buffer.length.toString(),
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true,
    };

  } catch (error) {
    console.error('Error downloading file:', error);
    
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
        error: 'Failed to download the file',
        details: error.message,
        status: error.status || 'unknown'
      }),
    };
  }
}; 