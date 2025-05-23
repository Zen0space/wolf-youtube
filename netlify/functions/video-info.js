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
    const { url } = JSON.parse(event.body || '{}');
    
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

    console.log('Fetching info for:', url);
    
    // Configure youtube-dl-exec to use yt-dlp
    const info = await youtubedl(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ['referer:youtube.com', 'user-agent:googlebot']
    });

    // Get available formats for quality selection
    const formats = info.formats || [];
    
    // Filter and sort video formats
    const videoFormats = formats
      .filter(f => f.ext === 'mp4' && f.height && f.vcodec !== 'none')
      .sort((a, b) => (b.height || 0) - (a.height || 0))
      .map(f => ({
        format_id: f.format_id,
        quality: f.height + 'p',
        ext: f.ext,
        filesize: f.filesize
      }));

    // Filter and sort audio formats
    const audioFormats = formats
      .filter(f => f.acodec && f.acodec !== 'none' && f.vcodec === 'none')
      .sort((a, b) => (b.abr || 0) - (a.abr || 0))
      .map(f => ({
        format_id: f.format_id,
        quality: f.abr ? f.abr + 'kbps' : 'audio',
        ext: f.ext,
        filesize: f.filesize
      }));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: info.title,
        duration: info.duration,
        uploader: info.uploader,
        description: info.description,
        thumbnail: info.thumbnail,
        view_count: info.view_count,
        upload_date: info.upload_date,
        videoFormats: videoFormats.slice(0, 5), // Limit to top 5 quality options
        audioFormats: audioFormats.slice(0, 3)  // Limit to top 3 audio options
      }),
    };

  } catch (error) {
    console.error('Error fetching video info:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        error: 'Failed to fetch video information',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
    };
  }
}; 