import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%);
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
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  max-width: 700px;
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

const Button = styled.button<{ isPrimary?: boolean; disabled?: boolean }>`
  background: ${props => props.disabled ? '#ccc' : props.isPrimary ? 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 100%)' : 'transparent'};
  color: ${props => props.isPrimary ? 'white' : '#1a2a6c'};
  border: ${props => props.isPrimary ? 'none' : '2px solid #1a2a6c'};
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
    box-shadow: ${props => props.disabled ? 'none' : '0 10px 20px rgba(0, 0, 0, 0.1)'};
    background: ${props => props.disabled ? '#ccc' : props.isPrimary ? 'linear-gradient(135deg, #152470 0%, #9c1b1b 100%)' : 'rgba(26, 42, 108, 0.1)'};
  }

  &:active {
    transform: ${props => props.disabled ? 'none' : 'translateY(0)'};
  }
`;

const LoadingSpinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1a2a6c;
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

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: #28a745;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  color: white;
  font-size: 40px;
  box-shadow: 0 10px 20px rgba(40, 167, 69, 0.3);

  &::after {
    content: '✓';
  }
`;

const TokenCard = styled.div`
  background: linear-gradient(135deg, #1a2a6c 0%, #b21f1f 100%);
  color: white;
  padding: 20px;
  border-radius: 15px;
  margin: 30px 0;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const TokenValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin: 10px 0;
  letter-spacing: 2px;
  font-family: monospace;
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

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 10px;
  margin: 20px 0;
  border: 1px solid #f5c6cb;
`;

interface ReleaseInfo {
  fileName: string;
  fileSize: number;
  releaseVersion: string;
  releaseName: string;
  releaseDate: string;
  releaseNotes: string;
}

interface PaymentSuccessPageProps {
  onBackToHome?: () => void;
  onDownloadPremium?: () => void;
}

const PaymentSuccessPage: React.FC<PaymentSuccessPageProps> = ({ onBackToHome, onDownloadPremium }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [releaseInfo, setReleaseInfo] = useState<ReleaseInfo | null>(null);
  // We don't need to track sessionId in state since we use it directly from URL params

  useEffect(() => {
    // Get the session ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const session = urlParams.get('session_id');
    
    if (session) {
      // We don't need to set sessionId since we use session directly
      verifyPayment(session);
    } else {
      setError('No session ID found. Payment verification failed.');
      setLoading(false);
    }
    
    // Also fetch the release info
    fetchReleaseInfo();
  }, []);

  const verifyPayment = async (session: string) => {
    try {
      setLoading(true);
      
      // Call the payment verification endpoint
      const response = await fetch(`/.netlify/functions/check-payment-status?paymentId=${session}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Payment verification failed');
      }
      
      if (data.success) {
        setToken(data.token);
      } else {
        throw new Error(data.details || 'Payment not completed');
      }
    } catch (err) {
      console.error('Payment verification error:', err);
      setError(err instanceof Error ? err.message : 'Failed to verify payment');
    } finally {
      setLoading(false);
    }
  };

  const fetchReleaseInfo = async () => {
    try {
      const response = await fetch('/.netlify/functions/get-premium-github-url');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch release information');
      }
      
      const data = await response.json();
      setReleaseInfo(data);
    } catch (err) {
      console.error('Release info error:', err);
      // We don't set the error state here because the payment verification is more important
    }
  };

  const handleDownload = async () => {
    if (!releaseInfo) return;
    
    try {
      // Open the download redirect function in a new tab
      const downloadUrl = '/.netlify/functions/download-premium-redirect';
      
      // Open in new window/tab to handle the download
      window.open(downloadUrl, '_blank');
      
      // Also call the onDownloadPremium callback if provided
      if (onDownloadPremium) {
        onDownloadPremium();
      }
    } catch (err) {
      console.error('Download error:', err);
      setError(err instanceof Error ? err.message : 'Download failed');
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
        {loading ? (
          <>
            <LoadingSpinner />
            <Subtitle>Verifying your payment...</Subtitle>
          </>
        ) : error ? (
          <>
            <Title>Payment Verification Failed</Title>
            <ErrorMessage>
              <strong>Error:</strong> {error}
            </ErrorMessage>
            <Button onClick={onBackToHome}>Back to Home</Button>
          </>
        ) : (
          <>
            <SuccessIcon />
            <Title>Payment Successful!</Title>
            <Subtitle>
              Thank you for purchasing Wolf YouTube Downloader Premium.
              Your payment has been successfully processed.
            </Subtitle>
            
            {token && (
              <TokenCard>
                <Label>Your Premium Token:</Label>
                <TokenValue>{token}</TokenValue>
                <p>Save this token for future use. It proves your premium status.</p>
              </TokenCard>
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
                
                <Button isPrimary onClick={handleDownload}>
                  Download Premium Version
                </Button>
              </>
            )}
            
            <Button onClick={onBackToHome}>Back to Home</Button>
          </>
        )}
      </Card>
    </Container>
  );
};

export default PaymentSuccessPage;
