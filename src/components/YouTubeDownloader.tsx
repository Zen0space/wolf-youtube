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

const QualitySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const QualityLabel = styled.label`
  font-weight: 600;
  color: #333;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;

  &:focus {
    border-color: #ff0000;
    outline: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'download' }>`
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex: 1;
  min-width: 150px;
  
  background-color: ${props => {
    switch(props.variant) {
      case 'secondary': return '#28a745';
      case 'download': return '#007bff';
      default: return '#ff0000';
    }
  }};
  color: white;

  &:hover:not(:disabled) {
    background-color: ${props => {
      switch(props.variant) {
        case 'secondary': return '#218838';
        case 'download': return '#0056b3';
        default: return '#cc0000';
      }
    }};
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

const DownloadLink = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  margin-top: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

interface VideoFormat {
  format_id: string;
  quality: string;
  ext: string;
  filesize?: number;
}

const YouTubeDownloader: React.FC = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoFormats, setVideoFormats] = useState<VideoFormat[]>([]);
  const [audioFormats, setAudioFormats] = useState<VideoFormat[]>([]);
  const [selectedVideoQuality, setSelectedVideoQuality] = useState('');
  const [selectedAudioQuality, setSelectedAudioQuality] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const addStatus = (message: string) => {
    setStatus(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const getVideoInfo = async () => {
    if (!url.trim()) {
      addStatus('Please enter a valid YouTube URL');
      return;
    }

    try {
      setIsLoading(true);
      setStatus([]);
      setVideoFormats([]);
      setAudioFormats([]);
      setDownloadUrl('');
      
      addStatus('Fetching video information...');
      
      const response = await fetch('/.netlify/functions/video-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch video info');
      }

      const info = await response.json();
      addStatus(`Title: ${info.title || 'Unknown'}`);
      addStatus(`Duration: ${info.duration || 'Unknown'} seconds`);
      addStatus(`Uploader: ${info.uploader || 'Unknown'}`);
      
      if (info.videoFormats && info.videoFormats.length > 0) {
        setVideoFormats(info.videoFormats);
        setSelectedVideoQuality(info.videoFormats[0].format_id);
        addStatus(`Found ${info.videoFormats.length} video quality options`);
      }
      
      if (info.audioFormats && info.audioFormats.length > 0) {
        setAudioFormats(info.audioFormats);
        setSelectedAudioQuality(info.audioFormats[0].format_id);
        addStatus(`Found ${info.audioFormats.length} audio quality options`);
      }
      
    } catch (error) {
      addStatus(`Error: ${error instanceof Error ? error.message : 'Failed to get video info'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadVideo = async (format: 'mp4' | 'mp3') => {
    if (!url.trim()) {
      addStatus('Please enter a valid YouTube URL');
      return;
    }

    const quality = format === 'mp4' ? selectedVideoQuality : selectedAudioQuality;
    
    if (!quality) {
      addStatus('Please get video info first to select quality');
      return;
    }

    try {
      setIsLoading(true);
      setProgress(0);
      setDownloadUrl('');
      
      addStatus(`Generating ${format.toUpperCase()} download link...`);
      
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

      const response = await fetch('/.netlify/functions/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url.trim(),
          format: format,
          quality: quality
        })
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const result = await response.json();
      
      addStatus(result.message);
      if (result.note) {
        addStatus(result.note);
      }
      
      setDownloadUrl(result.downloadUrl);
      
    } catch (error) {
      addStatus(`Error: ${error instanceof Error ? error.message : 'Download failed'}`);
    } finally {
      setIsLoading(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  return (
    <Container>
      <Title>🎬 YouTube Downloader</Title>
      
      <InputSection>
        <Input
          type="url"
          placeholder="Enter YouTube URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isLoading}
        />
        
        <Button 
          onClick={getVideoInfo}
          disabled={isLoading}
          variant="secondary"
        >
          📋 Get Video Info & Quality Options
        </Button>

        {videoFormats.length > 0 && (
          <QualitySection>
            <QualityLabel>Video Quality:</QualityLabel>
            <Select 
              value={selectedVideoQuality} 
              onChange={(e) => setSelectedVideoQuality(e.target.value)}
              disabled={isLoading}
            >
              {videoFormats.map((format) => (
                <option key={format.format_id} value={format.format_id}>
                  {format.quality} ({format.ext})
                  {format.filesize && ` - ${(format.filesize / 1024 / 1024).toFixed(1)}MB`}
                </option>
              ))}
            </Select>
          </QualitySection>
        )}

        {audioFormats.length > 0 && (
          <QualitySection>
            <QualityLabel>Audio Quality:</QualityLabel>
            <Select 
              value={selectedAudioQuality} 
              onChange={(e) => setSelectedAudioQuality(e.target.value)}
              disabled={isLoading}
            >
              {audioFormats.map((format) => (
                <option key={format.format_id} value={format.format_id}>
                  {format.quality} ({format.ext})
                  {format.filesize && ` - ${(format.filesize / 1024 / 1024).toFixed(1)}MB`}
                </option>
              ))}
            </Select>
          </QualitySection>
        )}
        
        <ButtonGroup>
          <Button 
            onClick={() => downloadVideo('mp4')}
            disabled={isLoading || !selectedVideoQuality}
          >
            🎥 Generate MP4 Link
          </Button>
          <Button 
            onClick={() => downloadVideo('mp3')}
            disabled={isLoading || !selectedAudioQuality}
          >
            🎵 Generate MP3 Link
          </Button>
        </ButtonGroup>

        {downloadUrl && (
          <DownloadLink href={downloadUrl} target="_blank" rel="noopener noreferrer">
            📥 Download File
          </DownloadLink>
        )}
      </InputSection>

      {progress > 0 && (
        <ProgressBar progress={progress} />
      )}

      <StatusSection>
        {status.length === 0 ? (
          <StatusText>Ready to download YouTube videos. Enter a URL above and click "Get Video Info" to start.</StatusText>
        ) : (
          status.map((message, index) => {
            const type = message.includes('Error:') ? 'error' : 
                        message.includes('completed successfully') || message.includes('Title:') || message.includes('Found') ? 'success' : 'info';
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

export default YouTubeDownloader; 