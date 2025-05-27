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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
  font-size: 0.9rem;
`;

const TableHead = styled.thead`
  background: rgba(0, 216, 122, 0.1);
  border-bottom: 2px solid rgba(0, 216, 122, 0.3);
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: rgba(255, 255, 255, 0.03);
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px 15px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const TableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const CookiePolicy: React.FC = () => {
  return (
    <Container>
      <FloatingNavbar currentPage="cookies" />
      
      <Content>
        <Title>Cookie Policy</Title>
        <LastUpdated>Last Updated: May 27, 2025</LastUpdated>
        
        <Section>
          <Paragraph>
            This Cookie Policy explains how Wolf Downloader ("we", "us", or "our") uses cookies and similar technologies on our Wolf YouTube Downloader website and application (collectively, the "Service"). This policy is designed to help you understand what cookies are, how we use them, and the choices you have regarding their use.
          </Paragraph>
          <Paragraph>
            This Cookie Policy should be read alongside our Privacy Policy, which explains how we use your personal information in compliance with the <Highlight>Personal Data Protection Act 2010 (PDPA)</Highlight> of Malaysia.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>1. What Are Cookies?</SectionTitle>
          <Paragraph>
            Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. Cookies are widely used to make websites work more efficiently and provide information to the website owners. They help with things like remembering your preferences, understanding how you use our website, and improving your user experience.
          </Paragraph>
          <Paragraph>
            Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device when you go offline, while session cookies are deleted as soon as you close your web browser.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>2. Types of Cookies We Use</SectionTitle>
          <Paragraph>
            We use the following types of cookies on our Service:
          </Paragraph>
          
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Type of Cookie</TableHeader>
                <TableHeader>Purpose</TableHeader>
                <TableHeader>Duration</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              <TableRow>
                <TableCell><strong>Essential Cookies</strong></TableCell>
                <TableCell>These cookies are necessary for the website to function properly. They enable basic functions like page navigation, secure areas, and payment processing. The website cannot function properly without these cookies.</TableCell>
                <TableCell>Session / Persistent</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Preference Cookies</strong></TableCell>
                <TableCell>These cookies allow the website to remember choices you make (such as your preferred language or the region you are in) and provide enhanced, personalized features.</TableCell>
                <TableCell>Persistent (1 year)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Analytics Cookies</strong></TableCell>
                <TableCell>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They help us improve the way our website works.</TableCell>
                <TableCell>Persistent (up to 2 years)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Marketing Cookies</strong></TableCell>
                <TableCell>These cookies are used to track visitors across websites. They are used to display ads that are relevant and engaging for individual users.</TableCell>
                <TableCell>Persistent (up to 2 years)</TableCell>
              </TableRow>
            </tbody>
          </Table>
        </Section>
        
        <Section>
          <SectionTitle>3. Specific Cookies We Use</SectionTitle>
          <Paragraph>
            Below is a detailed list of the cookies we use on our Service:
          </Paragraph>
          
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Cookie Name</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>Purpose</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              <TableRow>
                <TableCell>_wolf_session</TableCell>
                <TableCell>Essential</TableCell>
                <TableCell>Used to maintain your session while using our Service.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>_wolf_auth</TableCell>
                <TableCell>Essential</TableCell>
                <TableCell>Used to authenticate users and maintain login status.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>_wolf_preferences</TableCell>
                <TableCell>Preference</TableCell>
                <TableCell>Stores your preferences such as theme settings and download quality preferences.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>_wolf_analytics</TableCell>
                <TableCell>Analytics</TableCell>
                <TableCell>Collects anonymous information about how you use our Service to help us improve functionality.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>_stripe_*</TableCell>
                <TableCell>Essential</TableCell>
                <TableCell>Cookies set by our payment processor Stripe to enable secure payment processing.</TableCell>
              </TableRow>
            </tbody>
          </Table>
        </Section>
        
        <Section>
          <SectionTitle>4. Third-Party Cookies</SectionTitle>
          <Paragraph>
            Some cookies are placed by third parties on our website. These third parties may include:
          </Paragraph>
          <List>
            <ListItem><strong>Stripe:</strong> Our payment processor, which uses cookies to enable secure payment transactions.</ListItem>
            <ListItem><strong>Google Analytics:</strong> We use Google Analytics to understand how visitors interact with our website. Google Analytics uses cookies to collect information about your use of our Service.</ListItem>
          </List>
          <Paragraph>
            These third parties have their own privacy policies and cookie policies, which we encourage you to review. We do not control these third-party cookies and suggest consulting the privacy policies of these third parties directly to understand how they use cookies.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>5. Managing Your Cookie Preferences</SectionTitle>
          <Paragraph>
            Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies, or to alert you when cookies are being sent. The methods for doing so vary from browser to browser, and from version to version. You can obtain up-to-date information about blocking and deleting cookies via these links:
          </Paragraph>
          <List>
            <ListItem><a href="https://support.google.com/chrome/answer/95647" style={{ color: '#00D87A' }}>Google Chrome</a></ListItem>
            <ListItem><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" style={{ color: '#00D87A' }}>Mozilla Firefox</a></ListItem>
            <ListItem><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" style={{ color: '#00D87A' }}>Microsoft Edge</a></ListItem>
            <ListItem><a href="https://support.apple.com/en-my/guide/safari/sfri11471/mac" style={{ color: '#00D87A' }}>Safari</a></ListItem>
          </List>
          <Paragraph>
            Please note that if you choose to block cookies, you may not be able to use all the features of our Service. If you delete cookies, any preferences they have saved will be lost, including settings related to our Service.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>6. Consent to Cookie Use</SectionTitle>
          <Paragraph>
            When you first visit our Service, you will be shown a cookie banner that allows you to accept or decline non-essential cookies. By clicking "Accept All Cookies," you consent to the use of all cookies described in this policy. If you click "Essential Cookies Only," only cookies necessary for the basic functionality of our website will be used.
          </Paragraph>
          <Paragraph>
            You can change your cookie preferences at any time by clicking on the "Cookie Settings" link in the footer of our website.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>7. Cookie Policy and Malaysian Law</SectionTitle>
          <Paragraph>
            While Malaysia does not have specific cookie laws like the EU's GDPR, our cookie practices comply with the <Highlight>Personal Data Protection Act 2010 (PDPA)</Highlight>, which governs the processing of personal data in commercial transactions in Malaysia. We are committed to being transparent about our use of cookies and providing you with control over your data.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>8. Changes to This Cookie Policy</SectionTitle>
          <Paragraph>
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last Updated" date at the top of this policy.
          </Paragraph>
          <Paragraph>
            You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are effective when they are posted on this page.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>9. Contact Us</SectionTitle>
          <Paragraph>
            If you have any questions about our Cookie Policy, please contact us at:
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

export default CookiePolicy;
