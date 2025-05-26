import { Octokit } from '@octokit/rest';

export const handler = async (event, context) => {
  console.log('Direct premium download function called');
  
  try {
    // Check if GitHub token is available
    if (!process.env.GH_TOKEN) {
      console.error('GH_TOKEN environment variable is not set');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'GitHub token not configured' }),
      };
    }
    
    console.log('Fetching latest premium release for direct download');

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
        body: JSON.stringify({ error: 'No .exe file found in the latest premium release' }),
      };
    }

    console.log('Found premium .exe asset:', exeAsset.name);

    // For private repositories, we need to get the actual download URL
    const assetResponse = await fetch(exeAsset.url, {
      method: 'HEAD',
      headers: {
        'Authorization': `Bearer ${process.env.GH_TOKEN}`,
        'Accept': 'application/octet-stream',
        'User-Agent': 'wolf-youtube-premium-downloader',
      },
      redirect: 'manual',
    });

    // GitHub will return a 302 redirect with the actual download URL
    const downloadUrl = assetResponse.headers.get('location');
    
    if (!downloadUrl) {
      // Fallback: try to get the download URL from the asset response
      const assetDetailResponse = await fetch(exeAsset.url, {
        headers: {
          'Authorization': `Bearer ${process.env.GH_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'wolf-youtube-premium-downloader',
        },
      });
      
      if (assetDetailResponse.ok) {
        const assetDetail = await assetDetailResponse.json();
        if (assetDetail.browser_download_url) {
          // Redirect to the browser download URL
          return {
            statusCode: 302,
            headers: {
              'Location': assetDetail.browser_download_url,
              'Cache-Control': 'no-cache',
            },
            body: '',
          };
        }
      }
      
      throw new Error('Could not get premium download URL from GitHub');
    }

    console.log('Redirecting to premium download URL');

    // Redirect the user to the actual download URL
    return {
      statusCode: 302,
      headers: {
        'Location': downloadUrl,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      body: '',
    };

  } catch (error) {
    console.error('Error getting direct premium download:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
