import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  padding: 20px 0;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

const Logo = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: white;
`;

const HeroSection = styled.section`
  padding: 80px 20px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 40px;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  border: none;
  padding: 18px 40px;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 10px;
  box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(255, 107, 107, 0.4);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled(CTAButton)`
  background: transparent;
  border: 2px solid white;
  box-shadow: none;

  &:hover {
    background: white;
    color: #667eea;
    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
  }
`;

const FeaturesSection = styled.section`
  padding: 80px 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 60px;
`;

const ComparisonContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const PlanCard = styled.div<{ isPremium?: boolean }>`
  background: ${props => props.isPremium 
    ? 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)' 
    : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.isPremium ? '#333' : 'white'};
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: ${props => props.isPremium ? '3px solid #ffd700' : '1px solid rgba(255, 255, 255, 0.2)'};
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PlanBadge = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff6b6b;
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const PlanTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const PlanPrice = styled.div`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 20px;
`;

const PlanDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 30px;
  opacity: 0.8;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 30px 0;
`;

const FeatureItem = styled.li<{ available?: boolean }>`
  padding: 12px 0;
  font-size: 1rem;
  opacity: ${props => props.available ? 1 : 0.5};
  text-decoration: ${props => props.available ? 'none' : 'line-through'};
  
  &:before {
    content: '${props => props.available ? '✓' : '✗'}';
    color: ${props => props.available ? '#4CAF50' : '#f44336'};
    font-weight: bold;
    margin-right: 10px;
  }
`;

const PlanButton = styled(CTAButton)<{ isPremium?: boolean }>`
  background: ${props => props.isPremium 
    ? 'linear-gradient(135deg, #333 0%, #555 100%)' 
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  width: 100%;
  margin-top: 20px;
`;

const ComingSoonBadge = styled.span`
  background: #ff9500;
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-left: 10px;
`;

interface HomepageProps {
  onTryFree: () => void;
}

const Homepage: React.FC<HomepageProps> = ({ onTryFree }) => {
  return (
    <Container>
      <Header>
        <Logo>🐺 Wolf YouTube Downloader</Logo>
      </Header>

      <HeroSection>
        <HeroTitle>
          Download YouTube Videos
          <br />
          <span style={{ color: '#ffd700' }}>Like a Wolf</span>
        </HeroTitle>
        <HeroSubtitle>
          Fast, reliable, and powerful YouTube downloader. 
          Get your favorite videos in high quality with just one click.
          No ads, no limits, just pure downloading power.
        </HeroSubtitle>
        <div>
          <CTAButton onClick={onTryFree}>
            🚀 Try Free Version
          </CTAButton>
          <SecondaryButton>
            📖 Learn More
          </SecondaryButton>
        </div>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>Choose Your Pack</SectionTitle>
        <ComparisonContainer>
          <PlanCard>
            <PlanTitle>Free Version</PlanTitle>
            <PlanPrice>$0</PlanPrice>
            <PlanDescription>
              Perfect for casual users who want basic downloading features
            </PlanDescription>
            <FeatureList>
              <FeatureItem available>Download videos up to 720p</FeatureItem>
              <FeatureItem available>MP4 format support</FeatureItem>
              <FeatureItem available>Basic audio extraction</FeatureItem>
              <FeatureItem available>Single video downloads</FeatureItem>
              <FeatureItem>Batch downloads</FeatureItem>
              <FeatureItem>4K/8K quality</FeatureItem>
              <FeatureItem>Playlist downloads</FeatureItem>
              <FeatureItem>Multiple format options</FeatureItem>
              <FeatureItem>Priority support</FeatureItem>
            </FeatureList>
            <PlanButton onClick={onTryFree}>
              Download Free Version
            </PlanButton>
          </PlanCard>

          <PlanCard isPremium>
            <PlanBadge>Most Popular</PlanBadge>
            <PlanTitle>Premium Version</PlanTitle>
            <PlanPrice>
              $9.99
              <ComingSoonBadge>Coming Soon</ComingSoonBadge>
            </PlanPrice>
            <PlanDescription>
              For power users who need advanced features and maximum quality
            </PlanDescription>
            <FeatureList>
              <FeatureItem available>Everything in Free</FeatureItem>
              <FeatureItem available>Download videos up to 8K</FeatureItem>
              <FeatureItem available>All video formats (MP4, AVI, MKV, etc.)</FeatureItem>
              <FeatureItem available>Batch downloads</FeatureItem>
              <FeatureItem available>Playlist downloads</FeatureItem>
              <FeatureItem available>Audio-only downloads (MP3, FLAC)</FeatureItem>
              <FeatureItem available>Subtitle downloads</FeatureItem>
              <FeatureItem available>Download scheduler</FeatureItem>
              <FeatureItem available>Priority support</FeatureItem>
            </FeatureList>
            <PlanButton isPremium disabled>
              Coming Soon
            </PlanButton>
          </PlanCard>
        </ComparisonContainer>
      </FeaturesSection>

      <HeroSection>
        <SectionTitle>Why Choose Wolf?</SectionTitle>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px',
          marginTop: '40px'
        }}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⚡</div>
            <h3>Lightning Fast</h3>
            <p>Download videos at maximum speed with our optimized engine</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔒</div>
            <h3>100% Safe</h3>
            <p>No malware, no ads, no tracking. Your privacy is our priority</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎯</div>
            <h3>Always Updated</h3>
            <p>Regular updates ensure compatibility with YouTube changes</p>
          </div>
        </div>
      </HeroSection>
    </Container>
  );
};

export default Homepage; 