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

    // Get video info
    const info = await ytdl.getInfo(url);
    
    // Extract video formats
    const videoFormats = info.formats
      .filter(format => format.hasVideo && format.hasAudio && format.container === 'mp4')
      .sort((a, b) => (b.height || 0) - (a.height || 0))
      .map(format => ({
        format_id: format.itag.toString(),
        quality: format.qualityLabel || `${format.height}p`,
        ext: format.container,
        filesize: format.contentLength ? parseInt(format.contentLength) : null
      }))
      .slice(0, 5);

    // Extract audio formats
    const audioFormats = info.formats
      .filter(format => format.hasAudio && !format.hasVideo)
      .sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0))
      .map(format => ({
        format_id: format.itag.toString(),
        quality: format.audioBitrate ? `${format.audioBitrate}kbps` : 'audio',
        ext: format.container,
        filesize: format.contentLength ? parseInt(format.contentLength) : null
      }))
      .slice(0, 3);

    const videoDetails = info.videoDetails;

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: videoDetails.title,
        duration: parseInt(videoDetails.lengthSeconds),
        uploader: videoDetails.author?.name,
        description: videoDetails.shortDescription,
        thumbnail: videoDetails.thumbnails?.[0]?.url,
        view_count: parseInt(videoDetails.viewCount),
        upload_date: videoDetails.uploadDate,
        videoFormats,
        audioFormats
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