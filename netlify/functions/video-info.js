const ytdl = require('ytdl-core');

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

    // Get video info with timeout to prevent function hanging
    const info = await Promise.race([
      ytdl.getInfo(url),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout: Video info request took too long')), 25000)
      )
    ]);
    
    // Extract video formats (mp4 with video and audio)
    const videoFormats = info.formats
      .filter(format => 
        format.hasVideo && 
        format.hasAudio && 
        format.container === 'mp4' &&
        format.qualityLabel
      )
      .sort((a, b) => {
        const aHeight = parseInt(a.qualityLabel?.replace('p', '')) || 0;
        const bHeight = parseInt(b.qualityLabel?.replace('p', '')) || 0;
        return bHeight - aHeight;
      })
      .map(format => ({
        format_id: format.itag.toString(),
        quality: format.qualityLabel,
        ext: 'mp4',
        filesize: format.contentLength ? parseInt(format.contentLength) : null
      }))
      .slice(0, 5);

    // Extract audio formats (audio only)
    const audioFormats = info.formats
      .filter(format => 
        format.hasAudio && 
        !format.hasVideo &&
        format.audioBitrate
      )
      .sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0))
      .map(format => ({
        format_id: format.itag.toString(),
        quality: `${format.audioBitrate}kbps`,
        ext: format.container || 'webm',
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
        thumbnail: videoDetails.thumbnails?.[videoDetails.thumbnails.length - 1]?.url,
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
        type: error.name || 'Unknown'
      }),
    };
  }
}; 