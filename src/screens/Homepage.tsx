import React from 'react';
import styled from 'styled-components';
import { FloatingNavbar, Button, Footer } from '../components/ui';
import '../styles/BadgeFix.css';

const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.main};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 600px;
    background: linear-gradient(to bottom, rgba(0, 216, 122, 0.1), transparent);
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 600px;
    background-image: radial-gradient(rgba(0, 216, 122, 0.03) 1px, transparent 1px);
    background-size: 20px 20px;
    z-index: 0;
    opacity: 0.4;
  }
`;



const HeroSection = styled.section`
  padding: 180px 20px 120px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3.8rem;
  font-weight: 900;
  margin-bottom: 35px;
  line-height: 1.1;
  color: #ffffff;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 60px;
  opacity: 0.95;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 50px;
  }
`;

// CTAButton replaced with the Button component from UI folder

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const PricingSection = styled.section`
  padding: 60px 20px 70px;
  background: ${({ theme }) => theme.colors.background.main};
  backdrop-filter: blur(15px);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, rgba(0, 216, 122, 0.05), transparent 70%);
    pointer-events: none;
  }
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.h2};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  text-align: center;
  margin-bottom: 50px; /* Reduced margin for shorter section */
  background-image: linear-gradient(135deg, ${({ theme }) => theme.colors.text.primary} 0%, ${({ theme }) => theme.colors.accent} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
    margin-bottom: 40px;
  }
`;

const ComparisonContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const PlanCard = styled.div<{ isPremium?: boolean }>`
  background: ${props => props.theme.colors.background.main};
  color: ${props => props.isPremium ? props.theme.colors.text.accent : props.theme.colors.text.primary};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: 40px 35px; /* Reduced padding for shorter cards */
  text-align: center;
  backdrop-filter: blur(20px);
  border: ${props => props.isPremium 
    ? `2px solid ${props.theme.colors.accent}` 
    : `1px solid ${props.theme.colors.border}`};
  position: relative;
  transition: ${props => props.theme.transitions.medium};
  box-shadow: ${props => props.theme.colors.shadow};
  overflow: visible;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.isPremium 
      ? `radial-gradient(circle at top right, rgba(0, 216, 122, 0.15), transparent 70%)` 
      : `radial-gradient(circle at top right, rgba(0, 216, 122, 0.05), transparent 70%)`};
    pointer-events: none;
    z-index: 0;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
`;

const PlanBadge = styled.div`
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.button.primary.bg};
  color: ${({ theme }) => theme.colors.button.primary.text};
  padding: 12px 30px;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  z-index: 5;
`;

const PlanTitle = styled.h3`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 20px;
`;

const PlanPrice = styled.div`
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 30px;
`;

const PlanDescription = styled.p`
  font-size: 1.3rem;
  margin-bottom: 50px;
  opacity: 0.85;
  line-height: 1.6;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 30px 0; /* Reduced margin for shorter feature list */
  text-align: left;
`;

const FeatureItem = styled.li<{ available?: boolean }>`
  padding: 18px 0;
  font-size: 1.2rem;
  opacity: ${props => props.available ? 1 : 0.5};
  text-decoration: ${props => props.available ? 'none' : 'line-through'};
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  
  &:before {
    content: '${props => props.available ? '✓' : '✗'}';
    color: ${props => props.available ? props.theme.colors.primary : '#f44336'};
    font-weight: bold;
    margin-right: 18px;
    font-size: 1.4rem;
    min-width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.available ? 'rgba(67, 97, 238, 0.1)' : 'rgba(244, 67, 54, 0.1)'};
    border-radius: 50%;
    width: 28px;
    height: 28px;
  }
`;

const PlanButton = styled(Button)<{ isPremium?: boolean }>`
  background: ${props => props.isPremium 
    ? props.theme.colors.button.primary.hover 
    : props.theme.colors.button.primary.bg};
  width: 100%;
  margin-top: 40px;
  padding: 20px 45px;
  font-size: 1.3rem;
  position: relative;
  z-index: 1;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
    z-index: -1;
  }
  
  &:hover::after {
    transform: translateX(100%);
  }
`;

// We don't need a separate badge component since we're using inline styles for the discount

const WhyChooseSection = styled.section`
  padding: 120px 20px;
  background: ${({ theme }) => theme.colors.background.main};
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at bottom left, rgba(0, 216, 122, 0.15), transparent 70%);
    pointer-events: none;
  }
`;

const BenefitsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 50px;
  margin-top: 80px;
`;

const BenefitCard = styled.div`
  text-align: center;
  padding: 40px 30px;
  background: ${({ theme }) => theme.colors.background.main};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  backdrop-filter: blur(15px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transitions.medium};
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(0, 216, 122, 0.08), transparent 60%);
    opacity: 0;
    transform: scale(0.5);
    transition: opacity 0.4s ease, transform 0.4s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-8px);
    background: ${({ theme }) => theme.colors.background.main};
    box-shadow: ${({ theme }) => theme.colors.shadow};
    
    &::before {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const BenefitIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 30px;
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
`;

const BenefitTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.accent};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
    opacity: 0.6;
  }
`;

const BenefitDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  opacity: 0.9;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ReviewsSection = styled.section`
  padding: 120px 20px;
  background: ${({ theme }) => theme.colors.background.main};
  backdrop-filter: blur(15px);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top center, rgba(0, 216, 122, 0.08), transparent 60%);
    pointer-events: none;
  }
`;

const ReviewsWrapper = styled.div`
  overflow: hidden;
  width: 100%;
`;

const ReviewsContainer = styled.div`
  display: flex;
  gap: 30px;
  width: fit-content;
  animation: infiniteScroll 40s linear infinite;

  @keyframes infiniteScroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-50% - 15px));
    }
  }

  &:hover {
    animation-play-state: paused;
  }
`;

const ReviewCard = styled.div`
  background: ${({ theme }) => theme.colors.background.main};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: 30px;
  min-width: 380px;
  max-width: 380px;
  backdrop-filter: blur(15px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transitions.medium};
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0.1;
    border-radius: 0 0 50px 0;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    background: ${({ theme }) => theme.colors.background.main};
    box-shadow: ${({ theme }) => theme.colors.shadow};
    
    &::before {
      width: 100%;
      height: 100%;
      border-radius: 0;
      opacity: 0.05;
    }
  }

  @media (max-width: 768px) {
    min-width: 280px;
    max-width: 280px;
    padding: 25px;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const ReviewAvatar = styled.div<{ bgColor: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  box-shadow: ${({ theme }) => theme.colors.shadow};
`;

const ReviewUserInfo = styled.div`
  flex: 1;
`;

const ReviewUserName = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 5px 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ReviewUserTitle = styled.p`
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.8;
  color: ${({ theme }) => theme.colors.primary};
`;

const ReviewStars = styled.div`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 1.2rem;
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const ReviewText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-style: italic;
  position: relative;
  z-index: 1;
`;

interface HomepageProps {
  onTryFree: () => void;
  onGoToPremium: () => void;
}

const Homepage: React.FC<HomepageProps> = ({ onTryFree, onGoToPremium }) => {
  const reviews = [
    {
      name: "Ahmad Faiz",
      title: "Content Creator",
      avatar: "AF",
      bgColor: "#667eea",
      rating: 5,
      text: "Wolf has been a game-changer for my YouTube channel! The download speed is incredible and the quality is always perfect. I've tried many tools but this one is by far the best."
    },
    {
      name: "Siti Aminah",
      title: "Digital Marketer",
      avatar: "SA",
      bgColor: "#ff6b6b",
      rating: 5,
      text: "Finally found a YouTube downloader that actually works! No ads, no malware, just clean downloads. The interface is so intuitive that even my grandmother could use it."
    },
    {
      name: "Raj Kumar",
      title: "Video Editor",
      avatar: "RK",
      bgColor: "#4ecdc4",
      rating: 5,
      text: "As a professional video editor, I need reliable tools. Wolf delivers every time. The 4K downloads are crystal clear and the batch feature saves me hours of work."
    },
    {
      name: "Lim Wei Ming",
      title: "Student",
      avatar: "LW",
      bgColor: "#45b7d1",
      rating: 5,
      text: "Perfect for downloading educational videos for offline study! The free version gives me everything I need. Clean, fast, and no annoying popups like other downloaders."
    },
    {
      name: "Nurul Aina",
      title: "Tech Enthusiast",
      avatar: "NA",
      bgColor: "#96ceb4",
      rating: 5,
      text: "I've been using Wolf for 6 months now and it's never let me down. Regular updates keep it working with YouTube's changes. Highly recommend to anyone!"
    },
    {
      name: "Chong Kai Wen",
      title: "Music Producer",
      avatar: "CK",
      bgColor: "#feca57",
      rating: 5,
      text: "The audio extraction feature is phenomenal! I can get high-quality MP3s from music videos without any quality loss. This tool is essential for my workflow."
    }
  ];

  // Duplicate reviews for seamless loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <Container>
      <FloatingNavbar onDownloadClick={onTryFree} currentPage="home" />

      <HeroSection>
        <HeroTitle>
          Download YouTube Videos
          <br />
          <span>Like a Wolf</span>
        </HeroTitle>
        <HeroSubtitle>
          Fast, reliable, and powerful YouTube downloader. Get your favorite videos in high quality with just one click.
          No ads, no limits, just pure downloading power.
        </HeroSubtitle>
        <ButtonContainer>
          <Button 
            variant='outline'
            size='large'
            onClick={onTryFree}
            style={{ margin: '0 15px' }}
          >
            Try Free Version
          </Button>
          <Button 
            variant='primary'
            size='large'
            onClick={onGoToPremium}
            style={{ margin: '0 15px' }}
          >
            Get Premium
          </Button>
        </ButtonContainer>
      </HeroSection>

      <WhyChooseSection>
        <SectionTitle>Why Choose Wolf?</SectionTitle>
        <BenefitsGrid>
          <BenefitCard>
            <BenefitIcon>⚡</BenefitIcon>
            <BenefitTitle>Lightning Fast</BenefitTitle>
            <BenefitDescription>
              Download videos at maximum speed with our optimized engine
            </BenefitDescription>
          </BenefitCard>
          <BenefitCard>
            <BenefitIcon>🔒</BenefitIcon>
            <BenefitTitle>100% Safe</BenefitTitle>
            <BenefitDescription>
              No malware, no ads, no tracking. Your privacy is our priority
            </BenefitDescription>
          </BenefitCard>
          <BenefitCard>
            <BenefitIcon>🎯</BenefitIcon>
            <BenefitTitle>Always Updated</BenefitTitle>
            <BenefitDescription>
              Regular updates ensure compatibility with YouTube changes
            </BenefitDescription>
          </BenefitCard>
        </BenefitsGrid>
      </WhyChooseSection>

      <PricingSection>
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
              <FeatureItem>4K quality</FeatureItem>
              <FeatureItem>Playlist downloads</FeatureItem>
              <FeatureItem>Multiple format options</FeatureItem>
              <FeatureItem>Priority support</FeatureItem>
            </FeatureList>
            <PlanButton onClick={onTryFree}>
              Download Free Version
            </PlanButton>
          </PlanCard>

          <PlanCard isPremium className="plan-card" role="plan-card">
            <PlanBadge className="plan-badge" role="plan-badge">Most Popular</PlanBadge>
            <PlanTitle>Premium Version</PlanTitle>
            <PlanPrice>
              RM 23.20
              <span style={{ fontSize: '1rem', fontWeight: 'normal', textDecoration: 'line-through', opacity: 0.7, marginRight: '10px' }}>
                RM 50.00
              </span>
            </PlanPrice>
            <PlanDescription>
              For power users who need advanced features and maximum quality
            </PlanDescription>
            <FeatureList>
              <FeatureItem available>Everything in Free</FeatureItem>
              <FeatureItem available>Download videos up to 4K</FeatureItem>
              <FeatureItem available>All video formats (MP4, AVI, MKV, etc.)</FeatureItem>
              <FeatureItem available>Batch downloads</FeatureItem>
              <FeatureItem available>Playlist downloads</FeatureItem>
              <FeatureItem available>Audio-only downloads (MP3, FLAC)</FeatureItem>
              <FeatureItem available>Subtitle downloads</FeatureItem>
              <FeatureItem available>Priority support</FeatureItem>
            </FeatureList>
            <PlanButton isPremium onClick={onGoToPremium}>
              Get Premium
            </PlanButton>
          </PlanCard>
        </ComparisonContainer>
      </PricingSection>

      <ReviewsSection>
        <SectionTitle>What Our Users Say</SectionTitle>
        <ReviewsWrapper>
          <ReviewsContainer>
            {duplicatedReviews.map((review, index) => (
              <ReviewCard key={index}>
                <ReviewHeader>
                  <ReviewAvatar bgColor={review.bgColor}>
                    {review.avatar}
                  </ReviewAvatar>
                  <ReviewUserInfo>
                    <ReviewUserName>{review.name}</ReviewUserName>
                    <ReviewUserTitle>{review.title}</ReviewUserTitle>
                  </ReviewUserInfo>
                </ReviewHeader>
                <ReviewStars>
                  {'★'.repeat(review.rating)}
                </ReviewStars>
                <ReviewText>"{review.text}"</ReviewText>
              </ReviewCard>
            ))}
          </ReviewsContainer>
        </ReviewsWrapper>
      </ReviewsSection>
      <Footer />
    </Container>
  );
};

export default Homepage; 