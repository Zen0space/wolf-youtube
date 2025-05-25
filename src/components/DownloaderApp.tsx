import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 10px;
  font-size: 2.5rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 30px;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const DownloadButton = styled.button<{ disabled?: boolean }>`
  background: ${props => props.disabled ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  margin: 10px;
  min-width: 200px;

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 10px 20px rgba(0, 0, 0, 0.2)'};
  }

  &:active {
    transform: ${props => props.disabled ? 'none' : 'translateY(0)'};
  }
`;

const InfoCard = styled.div`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 20px;
  margin: 20px 0;
  text-align: left;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  padding: 5px 0;
  border-bottom: 1px solid #e9ecef;

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-weight: 600;
  color: #495057;
`;

const Value = styled.span`
  color: #6c757d;
`;

const LoadingSpinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 10px;
  margin: 20px 0;
  border: 1px solid #f5c6cb;
`;

const SuccessMessage = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 10px;
  margin: 20px 0;
  border: 1px solid #c3e6cb;
`;

interface ReleaseInfo {
  downloadUrl: string;
  fileName: string;
  fileSize: number;
  releaseVersion: string;
  releaseName: string;
  releaseDate: string;
  releaseNotes: string;
}

const DownloaderApp: React.FC = () => {
  const [releaseInfo, setReleaseInfo] = useState<ReleaseInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchReleaseInfo();
  }, []);

  const fetchReleaseInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/.netlify/functions/download-exe');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch release information');
      }
      
      setReleaseInfo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!releaseInfo) return;
    
    try {
      setDownloading(true);
      setError(null);
      setSuccess(null);
      
      console.log('Starting download...');
      
      // Create a download link that opens the download function in a new tab
      // This prevents navigation issues and allows the download to work properly
      const downloadUrl = '/.netlify/functions/download-file';
      
      // Open in new window/tab to handle the download
      const downloadWindow = window.open(downloadUrl, '_blank');
      
      // Check if popup was blocked
      if (!downloadWindow) {
        // Fallback: create a direct link
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
      setSuccess(`Download initiated: ${releaseInfo.fileName}`);
    } catch (err) {
      console.error('Download error:', err);
      setError(err instanceof Error ? err.message : 'Download failed');
    } finally {
      setDownloading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Container>
      <Card>
        <Title>Wolf YouTube Downloader</Title>
        <Subtitle>
          Download the latest version of our powerful YouTube downloader tool.
          Get high-quality video and audio downloads with ease.
        </Subtitle>

        {loading && (
          <>
            <LoadingSpinner />
            <p>Fetching latest release information...</p>
          </>
        )}

        {error && (
          <ErrorMessage>
            <strong>Error:</strong> {error}
            <br />
            <button 
              onClick={fetchReleaseInfo}
              style={{ 
                marginTop: '10px', 
                padding: '5px 15px', 
                background: 'transparent', 
                border: '1px solid #721c24', 
                borderRadius: '5px',
                color: '#721c24',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </ErrorMessage>
        )}

        {success && (
          <SuccessMessage>
            <strong>Success:</strong> {success}
          </SuccessMessage>
        )}

        {releaseInfo && (
          <>
            <InfoCard>
              <InfoRow>
                <Label>Version:</Label>
                <Value>{releaseInfo.releaseVersion}</Value>
              </InfoRow>
              <InfoRow>
                <Label>Release Name:</Label>
                <Value>{releaseInfo.releaseName}</Value>
              </InfoRow>
              <InfoRow>
                <Label>File Name:</Label>
                <Value>{releaseInfo.fileName}</Value>
              </InfoRow>
              <InfoRow>
                <Label>File Size:</Label>
                <Value>{formatFileSize(releaseInfo.fileSize)}</Value>
              </InfoRow>
              <InfoRow>
                <Label>Release Date:</Label>
                <Value>{formatDate(releaseInfo.releaseDate)}</Value>
              </InfoRow>
            </InfoCard>

            {releaseInfo.releaseNotes && (
              <InfoCard>
                <Label>Release Notes:</Label>
                <div style={{ marginTop: '10px', whiteSpace: 'pre-wrap' }}>
                  {releaseInfo.releaseNotes}
                </div>
              </InfoCard>
            )}

            <DownloadButton 
              onClick={handleDownload} 
              disabled={downloading}
            >
              {downloading ? 'Downloading...' : `Download ${releaseInfo.fileName}`}
            </DownloadButton>
          </>
        )}

        <div style={{ marginTop: '30px', fontSize: '0.9rem', color: '#6c757d' }}>
          <p>
            This downloader is fetched from our private repository and is always up-to-date
            with the latest features and security improvements.
          </p>
        </div>
      </Card>
    </Container>
  );
};

export default DownloaderApp; 