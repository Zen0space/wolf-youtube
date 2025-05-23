const youtubedl = require('youtube-dl-exec');

exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { url, format, quality } = JSON.parse(event.body || '{}');
    
    if (!url) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'URL is required' }),
      };
    }

    if (!format || !['mp4', 'mp3'].includes(format)) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Format must be mp4 or mp3' }),
      };
    }

    console.log(`Starting ${format} download for:`, url, 'Quality:', quality);

    let options = {
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ['referer:youtube.com', 'user-agent:googlebot']
    };

    if (format === 'mp3') {
      // For audio extraction
      options = {
        ...options,
        extractAudio: true,
        audioFormat: 'mp3',
        audioQuality: quality || 0, // Best quality by default
      };
    } else {
      // For video (mp4)
      if (quality) {
        options.format = quality; // Use specific quality format ID
      } else {
        options.format = 'best[ext=mp4]/best';
      }
      options.mergeOutputFormat = 'mp4';
    }

    // Get download URL instead of downloading file (for Netlify compatibility)
    const downloadUrl = await youtubedl(url, {
      ...options,
      getUrl: true
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        downloadUrl: downloadUrl,
        message: `${format.toUpperCase()} download link generated successfully!`,
        note: 'Click the download button to get your file.'
      }),
    };

  } catch (error) {
    console.error('Download error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        error: 'Download failed',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
    };
  }
}; 