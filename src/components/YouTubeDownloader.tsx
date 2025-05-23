import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  text-align: center;
  color: #ff0000;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: #ff0000;
  }

  &::placeholder {
    color: #999;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: 100%;
  
  background-color: ${props => 
    props.variant === 'secondary' ? '#28a745' : '#ff0000'};
  color: white;

  &:hover:not(:disabled) {
    background-color: ${props => 
      props.variant === 'secondary' ? '#218838' : '#cc0000'};
  }
`;

const StatusSection = styled.div`
  padding: 1rem;
  border-radius: 8px;
  background-color: white;
  border: 1px solid #ddd;
  min-height: 100px;
`;

const StatusText = styled.p<{ type?: 'success' | 'error' | 'info' }>`
  color: ${props => {
    switch(props.type) {
      case 'success': return '#28a745';
      case 'error': return '#dc3545';
      case 'info': return '#007bff';
      default: return '#333';
    }
  }};
  margin-bottom: 0.5rem;
  word-break: break-word;
`;

const VideoInfoCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-top: 1rem;
`;

const VideoTitle = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const VideoMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const MetaItem = styled.div`
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const MetaLabel = styled.div`
  font-weight: 600;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const MetaValue = styled.div`
  color: #333;
  font-size: 1rem;
`;

const Thumbnail = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
`;

const InfoText = styled.div`
  background: #e7f3ff;
  border: 1px solid #bee5eb;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  color: #0c5460;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 20px;
  background-color: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
  margin: 1rem 0;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.progress}%;
    background-color: #007bff;
    transition: width 0.3s ease;
  }
`;

const YouTubeInfoTool: React.FC = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoInfo, setVideoInfo] = useState<any>(null);

  const addStatus = (message: string) => {
    setStatus(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const getVideoInfo = async () => {
    if (!url.trim()) {
      addStatus('Please enter a valid YouTube URL');
      return;
    }

    try {
      setIsLoading(true);
      setStatus([]);
      setVideoInfo(null);
      setProgress(0);
      
      addStatus('Fetching video information...');
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 15;
        });
      }, 300);

      const response = await fetch('/.netlify/functions/video-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() })
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        throw new Error('Failed to fetch video info');
      }

      const info = await response.json();
      setVideoInfo(info);
      
      addStatus('✅ Video information retrieved successfully!');
      addStatus(`Found ${info.videoFormats?.length || 0} video formats available`);
      addStatus(`Found ${info.audioFormats?.length || 0} audio formats available`);
      
    } catch (error) {
      addStatus(`❌ Error: ${error instanceof Error ? error.message : 'Failed to get video info'}`);
    } finally {
      setIsLoading(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  return (
    <Container>
      <Title>📺 YouTube Video Info Tool</Title>
      <Subtitle>Get detailed information about any YouTube video</Subtitle>
      
      <InfoText>
        <strong>ℹ️ About this tool:</strong> This tool provides detailed information about YouTube videos including metadata, available formats, and quality options. It's designed for educational and research purposes only.
      </InfoText>
      
      <InputSection>
        <Input
          type="url"
          placeholder="Enter YouTube URL here... (e.g., https://www.youtube.com/watch?v=...)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isLoading}
        />
        
        <Button 
          onClick={getVideoInfo}
          disabled={isLoading}
          variant="secondary"
        >
          {isLoading ? '🔄 Analyzing...' : '🔍 Get Video Information'}
        </Button>
      </InputSection>

      {progress > 0 && (
        <ProgressBar progress={progress} />
      )}

      {videoInfo && (
        <VideoInfoCard>
          <VideoTitle>{videoInfo.title}</VideoTitle>
          
          {videoInfo.thumbnail && (
            <Thumbnail src={videoInfo.thumbnail} alt="Video thumbnail" />
          )}
          
          <VideoMeta>
            <MetaItem>
              <MetaLabel>👤 Channel</MetaLabel>
              <MetaValue>{videoInfo.uploader || 'Unknown'}</MetaValue>
            </MetaItem>
            
            <MetaItem>
              <MetaLabel>⏱️ Duration</MetaLabel>
              <MetaValue>{videoInfo.duration ? formatDuration(videoInfo.duration) : 'Unknown'}</MetaValue>
            </MetaItem>
            
            <MetaItem>
              <MetaLabel>👁️ Views</MetaLabel>
              <MetaValue>{videoInfo.view_count ? formatViews(videoInfo.view_count) : 'Unknown'}</MetaValue>
            </MetaItem>
            
            <MetaItem>
              <MetaLabel>📅 Upload Date</MetaLabel>
              <MetaValue>{videoInfo.upload_date || 'Unknown'}</MetaValue>
            </MetaItem>
            
            <MetaItem>
              <MetaLabel>🎥 Video Formats</MetaLabel>
              <MetaValue>{videoInfo.videoFormats?.length || 0} available</MetaValue>
            </MetaItem>
            
            <MetaItem>
              <MetaLabel>🎵 Audio Formats</MetaLabel>
              <MetaValue>{videoInfo.audioFormats?.length || 0} available</MetaValue>
            </MetaItem>
          </VideoMeta>

          {videoInfo.videoFormats && videoInfo.videoFormats.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <h3>Available Video Qualities:</h3>
              <ul>
                {videoInfo.videoFormats.map((format: any, index: number) => (
                  <li key={index}>
                    {format.quality} ({format.ext})
                    {format.filesize && ` - ${(format.filesize / 1024 / 1024).toFixed(1)}MB`}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {videoInfo.audioFormats && videoInfo.audioFormats.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <h3>Available Audio Qualities:</h3>
              <ul>
                {videoInfo.audioFormats.map((format: any, index: number) => (
                  <li key={index}>
                    {format.quality} ({format.ext})
                    {format.filesize && ` - ${(format.filesize / 1024 / 1024).toFixed(1)}MB`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </VideoInfoCard>
      )}

      <StatusSection>
        {status.length === 0 ? (
          <StatusText>Ready to analyze YouTube videos. Enter a URL above and click "Get Video Information" to start.</StatusText>
        ) : (
          status.map((message, index) => {
            const type = message.includes('❌') ? 'error' : 
                        message.includes('✅') || message.includes('Found') ? 'success' : 'info';
            return (
              <StatusText key={index} type={type}>
                {message}
              </StatusText>
            );
          })
        )}
      </StatusSection>
    </Container>
  );
};

export default YouTubeInfoTool; 