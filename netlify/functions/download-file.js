const { Octokit } = require('@octokit/rest');

exports.handler = async (event, context) => {
  console.log('Download function called:', event.httpMethod);
  
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Check if GitHub token is available
    if (!process.env.GH_TOKEN) {
      console.error('GH_TOKEN environment variable is not set');
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'text/html',
        },
        body: `
<!DOCTYPE html>
<html>
<head><title>Configuration Error</title></head>
<body>
  <h1>Configuration Error</h1>
  <p>GitHub token not configured. Please contact the administrator.</p>
</body>
</html>`,
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
        headers: {
          'Content-Type': 'text/html',
        },
        body: `
<!DOCTYPE html>
<html>
<head><title>File Not Found</title></head>
<body>
  <h1>File Not Found</h1>
  <p>No .exe file found in the latest release.</p>
  <p>Available files: ${release.assets.map(a => a.name).join(', ')}</p>
</body>
</html>`,
      };
    }

    console.log('Downloading asset:', exeAsset.name, 'Size:', exeAsset.size);

    // Download the file from GitHub with authentication
    const assetUrl = `https://api.github.com/repos/Zen0space/wolf-tv/releases/assets/${exeAsset.id}`;
    
    const response = await fetch(assetUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.GH_TOKEN}`,
        'Accept': 'application/octet-stream',
        'User-Agent': 'wolf-youtube-downloader',
      },
    });

    if (!response.ok) {
      console.error('GitHub API error:', response.status, response.statusText);
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    // Get the file as array buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    console.log(`File downloaded successfully, size: ${buffer.length} bytes`);

    // Return the file with proper download headers
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${exeAsset.name}"`,
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true,
    };

  } catch (error) {
    console.error('Error downloading file:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'text/html',
      },
      body: `
<!DOCTYPE html>
<html>
<head><title>Download Error</title></head>
<body>
  <h1>Download Error</h1>
  <p>Failed to download the file: ${error.message}</p>
  <p><a href="javascript:history.back()">Go Back</a></p>
</body>
</html>`,
    };
  }
}; 