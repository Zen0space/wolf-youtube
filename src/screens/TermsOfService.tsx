import React from 'react';
import styled from 'styled-components';
import { FloatingNavbar, Footer } from '../components/ui';

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

const LastUpdated = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 40px;
`;

const Section = styled.div`
  margin-bottom: 40px;
  line-height: 1.7;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Paragraph = styled.p`
  margin-bottom: 20px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const List = styled.ul`
  margin-left: 20px;
  margin-bottom: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.button.primary.bg};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

interface TermsOfServiceProps {
  // Add any props if needed
}

const TermsOfService: React.FC<TermsOfServiceProps> = () => {
  return (
    <Container>
      <FloatingNavbar currentPage="terms" />
      
      <Content>
        <Title>Terms of Service</Title>
        <LastUpdated>Last Updated: May 27, 2025</LastUpdated>
        
        <Section>
          <Paragraph>
            Welcome to Wolf YouTube Downloader. These Terms of Service ("Terms") govern your access to and use of the Wolf YouTube Downloader application and services (collectively, the "Service"), operated by Wolf Downloader ("we", "us", or "our"). By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access or use our Service.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>1. Use of the Service</SectionTitle>
          <Paragraph>
            The Wolf YouTube Downloader is designed to allow users to download videos from YouTube for personal, non-commercial use only. By using our Service, you agree to comply with all applicable laws and regulations in Malaysia and internationally, including but not limited to copyright laws.
          </Paragraph>
          <List>
            <ListItem>You must be at least 18 years old or have parental consent to use this Service.</ListItem>
            <ListItem>You are responsible for maintaining the confidentiality of your account information, including your password.</ListItem>
            <ListItem>You agree not to use the Service for any illegal purposes or in violation of any applicable local, state, national, or international law.</ListItem>
            <ListItem>You agree not to distribute, share, or commercialize any content downloaded through our Service.</ListItem>
          </List>
        </Section>
        
        <Section>
          <SectionTitle>2. Intellectual Property Rights</SectionTitle>
          <Paragraph>
            Our Service respects the intellectual property rights of others. We do not claim ownership of the content that you download through our Service. The content remains the property of its respective owners.
          </Paragraph>
          <Paragraph>
            You acknowledge that downloading copyrighted content without permission from the copyright owner may constitute copyright infringement. We strongly advise you to obtain proper permission before downloading any content that is protected by copyright.
          </Paragraph>
          <Paragraph>
            Under the <Highlight>Copyright Act 1987 of Malaysia</Highlight>, copyright infringement is a serious offense that may result in civil and criminal penalties. We reserve the right to terminate your access to our Service if you repeatedly infringe upon the intellectual property rights of others.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>3. Premium Services and Payments</SectionTitle>
          <Paragraph>
            Our Service offers both free and premium features. By purchasing our premium features, you agree to pay the specified amount (currently RM 23.20, discounted from RM 50.00) and provide accurate billing information.
          </Paragraph>
          <Paragraph>
            All payments are processed securely through Stripe, a third-party payment processor. Your use of Stripe's services is subject to their terms and conditions. We do not store your complete credit card information on our servers.
          </Paragraph>
          <Paragraph>
            In accordance with the <Highlight>Consumer Protection Act 1999 of Malaysia</Highlight>, we offer a 14-day money-back guarantee for our premium services. If you are not satisfied with our Service, you may request a refund within 14 days of your purchase by contacting our support team at support@wolfdownloader.com.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>4. Service Limitations and Modifications</SectionTitle>
          <Paragraph>
            We reserve the right to modify, suspend, or discontinue any part of our Service at any time without prior notice. We shall not be liable to you or any third party for any such modification, suspension, or discontinuation.
          </Paragraph>
          <Paragraph>
            The quality and speed of downloads may vary based on your internet connection, the size of the video, and other technical factors beyond our control. We do not guarantee that our Service will always be available, uninterrupted, or error-free.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>5. Data Privacy and Security</SectionTitle>
          <Paragraph>
            Your privacy is important to us. Our data collection and processing practices are detailed in our Privacy Policy, which is incorporated into these Terms by reference. By using our Service, you consent to our collection and use of your information as described in the Privacy Policy.
          </Paragraph>
          <Paragraph>
            In accordance with the <Highlight>Personal Data Protection Act 2010 of Malaysia</Highlight>, we implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>6. Limitation of Liability</SectionTitle>
          <Paragraph>
            To the fullest extent permitted by applicable law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </Paragraph>
          <List>
            <ListItem>Your access to or use of or inability to access or use the Service;</ListItem>
            <ListItem>Any conduct or content of any third party on the Service;</ListItem>
            <ListItem>Any content obtained from the Service; and</ListItem>
            <ListItem>Unauthorized access, use, or alteration of your transmissions or content.</ListItem>
          </List>
        </Section>
        
        <Section>
          <SectionTitle>7. Governing Law</SectionTitle>
          <Paragraph>
            These Terms shall be governed by and construed in accordance with the laws of Malaysia, without regard to its conflict of law provisions. Any dispute arising from or relating to these Terms or your use of the Service shall be subject to the exclusive jurisdiction of the courts of Malaysia.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>8. Changes to Terms</SectionTitle>
          <Paragraph>
            We reserve the right to modify these Terms at any time. If we make material changes to these Terms, we will provide notice through our Service or by other means to provide you with the opportunity to review the changes before they become effective.
          </Paragraph>
          <Paragraph>
            Your continued use of our Service after any such changes constitutes your acceptance of the new Terms. If you do not agree to the new Terms, you must stop using the Service.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>9. Contact Information</SectionTitle>
          <Paragraph>
            If you have any questions about these Terms, please contact us at:
          </Paragraph>
          <Paragraph>
            Wolf Downloader<br />
            Email: legal@wolfdownloader.com<br />
            Address: Kuala Lumpur, Malaysia
          </Paragraph>
        </Section>
      </Content>
      
      <Footer />
    </Container>
  );
};

export default TermsOfService;
