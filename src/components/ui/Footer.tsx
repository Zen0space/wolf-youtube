import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: rgba(27, 30, 40, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 60px 20px 30px;
  color: #ffffffcc;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const LogoIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
`;

const FooterDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  opacity: 0.8;
  margin-bottom: 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #00D87A;
    transform: translateY(-3px);
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 20px;
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 12px;
  
  a {
    color: #ffffffcc;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s ease;
    display: inline-flex;
    align-items: center;
    
    &:hover {
      color: #00D87A;
    }
    
    svg {
      margin-right: 8px;
      font-size: 0.8rem;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.85rem;
  opacity: 0.7;
`;

interface FooterProps {
  // Any props needed for the footer
}

const Footer: React.FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterLogo>
            <LogoIcon src="/icon-wolf.png" alt="Wolf" />
            <LogoText>Wolf</LogoText>
          </FooterLogo>
          <FooterDescription>
            Fast, reliable, and powerful YouTube downloader. Get your favorite videos in high quality with just one click.
          </FooterDescription>
          <SocialLinks>
            <SocialIcon href="#" aria-label="Twitter">
              <span>𝕏</span>
            </SocialIcon>
            <SocialIcon href="#" aria-label="Facebook">
              f
            </SocialIcon>
            <SocialIcon href="#" aria-label="Instagram">
              📷
            </SocialIcon>
            <SocialIcon href="#" aria-label="GitHub">
              🐙
            </SocialIcon>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Navigation</FooterTitle>
          <FooterLinks>
            <FooterLink>
              <a href="/">Home</a>
            </FooterLink>
            <FooterLink>
              <a href="#feedback">Feedback</a>
            </FooterLink>
            <FooterLink>
              <a href="#about">About us</a>
            </FooterLink>
            <FooterLink>
              <a href="#products">Products</a>
            </FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Legal</FooterTitle>
          <FooterLinks>
            <FooterLink>
              <a href="/terms-of-service">Terms of Service</a>
            </FooterLink>
            <FooterLink>
              <a href="/privacy-policy">Privacy Policy</a>
            </FooterLink>
            <FooterLink>
              <a href="/refund-policy">Refund Policy</a>
            </FooterLink>
            <FooterLink>
              <a href="/cookie-policy">Cookie Policy</a>
            </FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact</FooterTitle>
          <FooterLinks>
            <FooterLink>
              <a href="mailto:support@wolfdownloader.com">support@wolfdownloader.com</a>
            </FooterLink>
            <FooterLink>
              <a href="/faq">FAQ</a>
            </FooterLink>
            <FooterLink>
              <a href="#help">Help Center</a>
            </FooterLink>
            <FooterLink>
              <a href="/report-bug">Report a Bug</a>
            </FooterLink>
          </FooterLinks>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © {currentYear} Wolf Downloader. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
