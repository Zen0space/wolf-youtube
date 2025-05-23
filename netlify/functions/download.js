const ytdl = require('@distube/ytdl-core');

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

    // Validate YouTube URL
    if (!ytdl.validateURL(url)) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Invalid YouTube URL' }),
      };
    }

    // Get video info to find the specific format
    const info = await ytdl.getInfo(url);
    
    let selectedFormat;
    
    if (format === 'mp4') {
      // Find video format by quality (itag)
      selectedFormat = info.formats.find(f => f.itag.toString() === quality);
      
      if (!selectedFormat) {
        // Fallback to best video+audio mp4
        selectedFormat = info.formats
          .filter(f => f.hasVideo && f.hasAudio && f.container === 'mp4')
          .sort((a, b) => (b.height || 0) - (a.height || 0))[0];
      }
    } else {
      // Find audio format by quality (itag)
      selectedFormat = info.formats.find(f => f.itag.toString() === quality);
      
      if (!selectedFormat) {
        // Fallback to best audio-only format
        selectedFormat = info.formats
          .filter(f => f.hasAudio && !f.hasVideo)
          .sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0))[0];
      }
    }

    if (!selectedFormat) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'No suitable format found' }),
      };
    }

    const downloadUrl = selectedFormat.url;

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
        note: 'Click the download button to get your file.',
        filename: `${info.videoDetails.title.replace(/[^a-zA-Z0-9]/g, '_')}.${format}`
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