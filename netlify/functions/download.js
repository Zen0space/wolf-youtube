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

    // Get video info with timeout
    const info = await Promise.race([
      ytdl.getInfo(url),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout: Video info request took too long')), 25000)
      )
    ]);
    
    let selectedFormat;
    let downloadUrl;
    
    if (format === 'mp4') {
      // Find video format by quality (itag)
      if (quality) {
        selectedFormat = info.formats.find(f => f.itag.toString() === quality);
      }
      
      if (!selectedFormat) {
        // Fallback to best video+audio mp4
        selectedFormat = info.formats
          .filter(f => f.hasVideo && f.hasAudio && f.container === 'mp4')
          .sort((a, b) => {
            const aHeight = parseInt(a.qualityLabel?.replace('p', '')) || 0;
            const bHeight = parseInt(b.qualityLabel?.replace('p', '')) || 0;
            return bHeight - aHeight;
          })[0];
      }
      
      if (selectedFormat) {
        downloadUrl = selectedFormat.url;
      }
    } else {
      // For MP3, we need to provide a different approach since ytdl-core doesn't directly convert to MP3
      // Instead, we'll provide the best audio format and let the user know it's not MP3
      if (quality) {
        selectedFormat = info.formats.find(f => f.itag.toString() === quality);
      }
      
      if (!selectedFormat) {
        // Fallback to best audio-only format
        selectedFormat = info.formats
          .filter(f => f.hasAudio && !f.hasVideo)
          .sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0))[0];
      }
      
      if (selectedFormat) {
        downloadUrl = selectedFormat.url;
      }
    }

    if (!selectedFormat || !downloadUrl) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'No suitable format found for download' }),
      };
    }

    // Generate a clean filename
    const cleanTitle = info.videoDetails.title
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .substring(0, 50); // Limit length

    const fileExtension = format === 'mp3' ? (selectedFormat.container || 'webm') : 'mp4';
    const filename = `${cleanTitle}.${fileExtension}`;

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
        note: format === 'mp3' ? 
          'Note: This is the best audio format available. You may need to convert to MP3 using online tools.' : 
          'Click the download button to get your video file.',
        filename: filename,
        actualFormat: selectedFormat.container || fileExtension,
        quality: selectedFormat.qualityLabel || `${selectedFormat.audioBitrate}kbps`
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
        type: error.name || 'Unknown'
      }),
    };
  }
}; 