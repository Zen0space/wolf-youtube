import React from 'react';
import styled from 'styled-components';
import { FloatingNavbar, Footer } from '../components/ui';
import discordLogo from '../assets/discord-logo.svg';

const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.main};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  position: relative;
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 120px 20px 60px;
  
  @media (max-width: 768px) {
    padding: 100px 20px 40px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100px;
    height: 4px;
    background: ${({ theme }) => theme.colors.button.primary.bg};
    border-radius: 4px;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 40px;
  max-width: 700px;
  line-height: 1.6;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: 1.7;
    margin-bottom: 20px;
  }
  
  ul {
    margin: 20px 0;
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

// Removed unused Highlight component

const DiscordButton = styled.a`
  display: inline-flex;
  align-items: center;
  background: #5865F2; /* Discord brand color */
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  margin-top: 20px;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background: #4752c4;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(88, 101, 242, 0.3);
    color: white; /* Explicitly keep text white on hover */
  }
  
  img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
`;

const InfoBox = styled.div`
  background: rgba(0, 216, 122, 0.05);
  border: 1px solid rgba(0, 216, 122, 0.2);
  border-radius: 8px;
  padding: 20px;
  margin: 30px 0;
  
  h3 {
    color: ${({ theme }) => theme.colors.button.primary.bg};
    margin-bottom: 10px;
    font-size: 1.2rem;
  }
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: 0;
  }
`;

const ReportBug: React.FC = () => {
  return (
    <Container>
      <FloatingNavbar currentPage="report-bug" />
      
      <Content>
        <Title>Report a Bug</Title>
        <Subtitle>
          Found an issue with Wolf YouTube Downloader? We're here to help! Join our Discord community to report bugs and get support from our team and other users.
        </Subtitle>
        
        <Card>
          <h2>How to Report a Bug</h2>
          <p>
            To help us fix issues quickly, please provide as much detail as possible when reporting a bug. Here's what we need to know:
          </p>
          
          <ul>
            <li><strong>Bug description:</strong> What happened? What did you expect to happen instead?</li>
            <li><strong>Steps to reproduce:</strong> The exact steps that led to the issue</li>
            <li><strong>Video URL:</strong> If applicable, the YouTube URL you were trying to download</li>
            <li><strong>App version:</strong> Which version of Wolf YouTube Downloader you're using</li>
            <li><strong>System info:</strong> Your operating system and browser version</li>
            <li><strong>Screenshots:</strong> If possible, include screenshots showing the error</li>
          </ul>
          
          <p>
            The more information you provide, the faster we can identify and fix the issue. Our development team actively monitors bug reports and works to resolve them as quickly as possible.
          </p>
          
          <InfoBox>
            <h3>Premium Support</h3>
            <p>Premium users receive priority support with faster response times. If you're a premium user, make sure to mention this when reporting your issue.</p>
          </InfoBox>
          
          <p>
            The best way to report bugs and get support is through our Discord community. Our active community of users and developers can help troubleshoot issues and provide workarounds while we work on permanent fixes.
          </p>
          
          <DiscordButton href="https://discord.gg/Rx5Wjhx7" target="_blank" rel="noopener noreferrer">
            <img src={discordLogo} alt="Discord logo" /> Join Our Discord Community
          </DiscordButton>
        </Card>
        
        <Card>
          <h2>Common Issues & Solutions</h2>
          <p>
            Before reporting a bug, check if your issue is addressed in these common problems and solutions:
          </p>
          
          <ul>
            <li><strong>Download fails at 0%:</strong> Check your internet connection or try a different video format</li>
            <li><strong>"Video unavailable" error:</strong> The video may be private, deleted, or region-restricted</li>
            <li><strong>Application crashes:</strong> Try restarting the app and your computer</li>
            <li><strong>Audio/video out of sync:</strong> Try downloading in MP4 format instead</li>
            <li><strong>Can't download higher than 720p:</strong> This is a limitation of the free version, upgrade to premium for higher resolutions</li>
          </ul>
          
          <p>
            You can also check our <a href="/faq" style={{ color: '#00D87A', textDecoration: 'none' }}>FAQ page</a> for more troubleshooting tips and solutions to common problems.
          </p>
        </Card>
      </Content>
      
      <Footer />
    </Container>
  );
};

export default ReportBug;
