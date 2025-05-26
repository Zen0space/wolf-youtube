import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #2c3e50 0%, #1a1a1a 100%);
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  padding: 25px 0;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const LogoIcon = styled.img`
  width: 50px;
  height: 50px;
  filter: brightness(0) invert(1);
`;

const Logo = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0;
  color: white;
`;

const HeroSection = styled.section`
  padding: 80px 20px 120px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 900;
  margin-bottom: 35px;
  line-height: 1.1;
  background: linear-gradient(135deg, #ffffff 0%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 3rem;
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

const CTAButton = styled.button`
  background: linear-gradient(135deg, #00d4aa 0%, #00b894 100%);
  color: white;
  border: none;
  padding: 22px 55px;
  border-radius: 60px;
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s ease;
  margin: 0 auto;
  box-shadow: 0 15px 35px rgba(0, 212, 170, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 45px rgba(0, 212, 170, 0.5);
    background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
  }

  &:active {
    transform: translateY(-2px);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const PricingSection = styled.section`
  padding: 60px 20px 70px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(15px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 50px; /* Reduced margin for shorter section */
  background: linear-gradient(135deg, #ffffff 0%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
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
  background: ${props => props.isPremium 
    ? 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)' 
    : 'rgba(255, 255, 255, 0.12)'};
  color: ${props => props.isPremium ? '#333' : 'white'};
  border-radius: 30px;
  padding: 40px 35px; /* Reduced padding for shorter cards */
  text-align: center;
  backdrop-filter: blur(20px);
  border: ${props => props.isPremium ? '3px solid #ffd700' : '2px solid rgba(255, 255, 255, 0.2)'};
  position: relative;
  transition: all 0.4s ease;
  box-shadow: ${props => props.isPremium 
    ? '0 25px 50px rgba(255, 215, 0, 0.3)' 
    : '0 25px 50px rgba(0, 0, 0, 0.2)'};

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.isPremium 
      ? '0 35px 70px rgba(255, 215, 0, 0.4)' 
      : '0 35px 70px rgba(0, 0, 0, 0.3)'};
  }
`;

const PlanBadge = styled.div`
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #00d4aa 0%, #00b894 100%);
  color: white;
  padding: 12px 30px;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 700;
  box-shadow: 0 10px 25px rgba(0, 212, 170, 0.4);
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
  
  &:before {
    content: '${props => props.available ? '✓' : '✗'}';
    color: ${props => props.available ? '#4CAF50' : '#f44336'};
    font-weight: bold;
    margin-right: 18px;
    font-size: 1.4rem;
    min-width: 25px;
  }
`;

const PlanButton = styled(CTAButton)<{ isPremium?: boolean }>`
  background: ${props => props.isPremium 
    ? 'linear-gradient(135deg, #333 0%, #555 100%)' 
    : 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)'};
  width: 100%;
  margin-top: 40px;
  padding: 20px 45px;
  font-size: 1.3rem;
`;

// We don't need a separate badge component since we're using inline styles for the discount

const WhyChooseSection = styled.section`
  padding: 120px 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
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
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
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
  color: #ffd700;
`;

const BenefitDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  opacity: 0.9;
`;

const ReviewsSection = styled.section`
  padding: 120px 20px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  position: relative;
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
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  min-width: 380px;
  max-width: 380px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
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
  font-weight: 700;
  color: white;
`;

const ReviewUserInfo = styled.div`
  flex: 1;
`;

const ReviewUserName = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 5px 0;
  color: white;
`;

const ReviewUserTitle = styled.p`
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.7;
  color: #00d4aa;
`;

const ReviewStars = styled.div`
  color: #ffd700;
  font-size: 1.2rem;
  margin-bottom: 15px;
`;

const ReviewText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  opacity: 0.9;
  font-style: italic;
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
      <Header>
        <LogoContainer>
          <LogoIcon src="/icon-wolf.png" alt="Wolf" />
          <Logo>Wolf YouTube Downloader</Logo>
        </LogoContainer>
      </Header>

      <HeroSection>
        <HeroTitle>
          Download YouTube Videos
          <br />
          <span style={{ color: '#ffd700' }}>Like a Wolf</span>
        </HeroTitle>
        <HeroSubtitle>
          Fast, reliable, and powerful YouTube downloader. Get your favorite videos in high quality with just one click.
          No ads, no limits, just pure downloading power.
        </HeroSubtitle>
        <ButtonContainer>
          <CTAButton onClick={onTryFree}>
            Try Free Version
          </CTAButton>
          <CTAButton 
            onClick={onGoToPremium}
            style={{
              background: 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 100%)'
            }}
          >
            Get Premium
          </CTAButton>
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

          <PlanCard isPremium>
            <PlanBadge>Most Popular</PlanBadge>
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
    </Container>
  );
};

export default Homepage; 