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

const PrivacyPolicy: React.FC = () => {
  return (
    <Container>
      <FloatingNavbar currentPage="privacy" />
      
      <Content>
        <Title>Privacy Policy</Title>
        <LastUpdated>Last Updated: May 27, 2025</LastUpdated>
        
        <Section>
          <Paragraph>
            Wolf Downloader ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Wolf YouTube Downloader application and related services (collectively, the "Service").
          </Paragraph>
          <Paragraph>
            This Privacy Policy has been developed in accordance with the <Highlight>Personal Data Protection Act 2010 (PDPA)</Highlight> of Malaysia and other applicable privacy laws. Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access or use our Service.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>1. Collection of Your Information</SectionTitle>
          <Paragraph>
            We may collect information about you in various ways. The information we may collect via the Service includes:
          </Paragraph>
          <List>
            <ListItem>
              <strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and payment information, that you voluntarily provide to us when you register with the Service or when you choose to participate in various activities related to the Service, such as purchasing a premium subscription.
            </ListItem>
            <ListItem>
              <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Service, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Service.
            </ListItem>
            <ListItem>
              <strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., credit card number, expiration date) that we may collect when you purchase a premium subscription. We store only very limited financial information that we need to process your payments. All payment transactions are processed through our payment processor, Stripe, and are subject to their privacy policy.
            </ListItem>
            <ListItem>
              <strong>Usage Data:</strong> Information about your interactions with our Service, including the videos you download, the formats you select, and other analytics data that helps us improve our Service.
            </ListItem>
          </List>
        </Section>
        
        <Section>
          <SectionTitle>2. Use of Your Information</SectionTitle>
          <Paragraph>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Service to:
          </Paragraph>
          <List>
            <ListItem>Create and manage your account.</ListItem>
            <ListItem>Process payments and refunds.</ListItem>
            <ListItem>Fulfill and manage purchases, orders, and downloads.</ListItem>
            <ListItem>Send you technical notices, updates, security alerts, and support messages.</ListItem>
            <ListItem>Respond to your comments, questions, and requests.</ListItem>
            <ListItem>Assist law enforcement when required by applicable law.</ListItem>
            <ListItem>Compile anonymous statistical data and analysis for use internally or with third parties.</ListItem>
            <ListItem>Deliver targeted advertising, newsletters, and other information regarding promotions and the Service to you.</ListItem>
            <ListItem>Monitor and analyze usage and trends to improve your experience with the Service.</ListItem>
            <ListItem>Notify you of updates to the Service.</ListItem>
            <ListItem>Resolve disputes and troubleshoot problems.</ListItem>
          </List>
          <Paragraph>
            In accordance with the <Highlight>PDPA</Highlight>, we will only process your personal data for the purposes for which it was collected, unless we reasonably consider that we need to use it for another reason and that reason is compatible with the original purpose.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>3. Disclosure of Your Information</SectionTitle>
          <Paragraph>
            We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
          </Paragraph>
          <List>
            <ListItem>
              <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
            </ListItem>
            <ListItem>
              <strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
            </ListItem>
            <ListItem>
              <strong>Marketing Communications:</strong> With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law.
            </ListItem>
            <ListItem>
              <strong>Business Transfers:</strong> If we or our assets are acquired, or in the unlikely event that we go out of business or enter bankruptcy, user information would be one of the assets that is transferred or acquired by a third party. You acknowledge that such transfers may occur and that the transferee may decline to honor commitments we made in this Privacy Policy.
            </ListItem>
          </List>
          <Paragraph>
            We will not disclose your personal data to any third party except as set out above, unless we have obtained your consent or are otherwise required or permitted to do so under the <Highlight>PDPA</Highlight> or other applicable laws.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>4. Security of Your Information</SectionTitle>
          <Paragraph>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </Paragraph>
          <Paragraph>
            In accordance with the <Highlight>PDPA</Highlight>, we have implemented appropriate security measures to protect your personal data from accidental loss, unauthorized access, use, alteration, and disclosure. All payment transactions are encrypted using SSL technology and processed through our secure payment processor.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>5. Your Rights Under the PDPA</SectionTitle>
          <Paragraph>
            Under the <Highlight>Personal Data Protection Act 2010</Highlight>, you have the following rights regarding your personal data:
          </Paragraph>
          <List>
            <ListItem>
              <strong>Right of Access:</strong> You have the right to request access to your personal data that we hold about you.
            </ListItem>
            <ListItem>
              <strong>Right to Correction:</strong> You have the right to request correction of your personal data that we hold if it is inaccurate, incomplete, misleading, or not up-to-date.
            </ListItem>
            <ListItem>
              <strong>Right to Withdraw Consent:</strong> You have the right to withdraw your consent to the processing of your personal data at any time, subject to legal or contractual restrictions and reasonable notice.
            </ListItem>
            <ListItem>
              <strong>Right to Limit Processing:</strong> You have the right to limit the processing of your personal data, including for marketing purposes.
            </ListItem>
          </List>
          <Paragraph>
            To exercise any of these rights, please contact us at privacy@wolfdownloader.com. We will respond to your request within 21 days as required by the PDPA.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>6. Data Retention</SectionTitle>
          <Paragraph>
            We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
          </Paragraph>
          <Paragraph>
            To determine the appropriate retention period for personal data, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure of your personal data, the purposes for which we process your personal data and whether we can achieve those purposes through other means, and the applicable legal requirements.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>7. Cross-Border Transfers</SectionTitle>
          <Paragraph>
            Your information, including personal data, may be transferred to and maintained on computers located outside of Malaysia where the data protection laws may differ from those in your jurisdiction.
          </Paragraph>
          <Paragraph>
            In accordance with the <Highlight>PDPA</Highlight>, we will ensure that any cross-border transfer of your personal data is made only to countries that ensure an adequate level of protection for your rights and freedoms in relation to the processing of personal data, or where we have put in place appropriate safeguards to ensure the protection of your personal data.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>8. Children's Privacy</SectionTitle>
          <Paragraph>
            Our Service is not intended for use by children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we can take necessary actions.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>9. Changes to This Privacy Policy</SectionTitle>
          <Paragraph>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.
          </Paragraph>
          <Paragraph>
            Changes to this Privacy Policy are effective when they are posted on this page. Your continued use of the Service following the posting of changes to this Privacy Policy will constitute your acknowledgment of the changes and your consent to abide and be bound by the modified Privacy Policy.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>10. Contact Us</SectionTitle>
          <Paragraph>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at:
          </Paragraph>
          <Paragraph>
            Wolf Downloader<br />
            Email: privacy@wolfdownloader.com<br />
            Address: Kuala Lumpur, Malaysia
          </Paragraph>
        </Section>
      </Content>
      
      <Footer />
    </Container>
  );
};

export default PrivacyPolicy;
