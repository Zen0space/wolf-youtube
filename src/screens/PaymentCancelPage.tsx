import React from 'react';
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

const Button = styled.button<{ isPrimary?: boolean }>`
  background: ${props => props.isPrimary ? 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 100%)' : 'transparent'};
  color: ${props => props.isPrimary ? 'white' : '#1a2a6c'};
  border: ${props => props.isPrimary ? 'none' : '2px solid #1a2a6c'};
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 10px;
  min-width: 200px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    background: ${props => props.isPrimary ? 'linear-gradient(135deg, #152470 0%, #9c1b1b 100%)' : 'rgba(26, 42, 108, 0.1)'};
  }

  &:active {
    transform: translateY(0);
  }
`;

const CancelIcon = styled.div`
  width: 80px;
  height: 80px;
  background: #dc3545;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  color: white;
  font-size: 40px;
  box-shadow: 0 10px 20px rgba(220, 53, 69, 0.3);

  &::after {
    content: 'u2715';
  }
`;

interface PaymentCancelPageProps {
  onBackToHome?: () => void;
  onTryAgain?: () => void;
}

const PaymentCancelPage: React.FC<PaymentCancelPageProps> = ({ onBackToHome, onTryAgain }) => {
  return (
    <Container>
      <Card>
        <CancelIcon />
        <Title>Payment Cancelled</Title>
        <Subtitle>
          Your payment for Wolf YouTube Downloader Premium was cancelled.
          You can try again or return to the homepage.
        </Subtitle>
        
        <Button isPrimary onClick={onTryAgain}>
          Try Again
        </Button>
        
        <Button onClick={onBackToHome}>
          Back to Home
        </Button>
      </Card>
    </Container>
  );
};

export default PaymentCancelPage;
