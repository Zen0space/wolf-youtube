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

const RefundPolicy: React.FC = () => {
  return (
    <Container>
      <FloatingNavbar currentPage="refund" />
      
      <Content>
        <Title>Refund Policy</Title>
        <LastUpdated>Last Updated: May 27, 2025</LastUpdated>
        
        <Section>
          <Paragraph>
            At Wolf Downloader, we strive to ensure your complete satisfaction with our products and services. This Refund Policy outlines our procedures and guidelines regarding refunds for our Wolf YouTube Downloader premium version, currently priced at RM 23.20 (discounted from RM 50.00).
          </Paragraph>
          <Paragraph>
            This policy has been developed in accordance with the <Highlight>Consumer Protection Act 1999</Highlight> of Malaysia and other applicable consumer protection laws. By purchasing our premium version, you agree to the terms of this Refund Policy.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>1. Eligibility for Refunds</SectionTitle>
          <Paragraph>
            We offer a 14-day money-back guarantee for our premium version. If you are not satisfied with your purchase, you may request a refund within 14 days from the date of purchase, subject to the following conditions:
          </Paragraph>
          <List>
            <ListItem>The refund request must be submitted within 14 days from the date of purchase.</ListItem>
            <ListItem>You must provide a valid reason for the refund request.</ListItem>
            <ListItem>Your account must not have violated our Terms of Service.</ListItem>
            <ListItem>The premium features must not have been excessively used (defined as more than 50 downloads).</ListItem>
          </List>
        </Section>
        
        <Section>
          <SectionTitle>2. Non-Refundable Circumstances</SectionTitle>
          <Paragraph>
            Refunds will not be provided under the following circumstances:
          </Paragraph>
          <List>
            <ListItem>After the 14-day refund period has expired.</ListItem>
            <ListItem>If you have violated our Terms of Service.</ListItem>
            <ListItem>If the reason for the refund request is not related to the functionality or quality of our service (e.g., accidental purchases or change of mind after extensive use).</ListItem>
            <ListItem>If the premium features have been excessively used as defined above.</ListItem>
            <ListItem>If the refund is requested due to issues beyond our control, such as internet connectivity problems, compatibility issues with your device that were clearly stated in our system requirements, or changes in YouTube's platform that affect our service temporarily.</ListItem>
          </List>
        </Section>
        
        <Section>
          <SectionTitle>3. Refund Process</SectionTitle>
          <Paragraph>
            To request a refund, please follow these steps:
          </Paragraph>
          <List>
            <ListItem>Send an email to refunds@wolfdownloader.com with the subject line "Refund Request".</ListItem>
            <ListItem>Include your purchase receipt or transaction ID.</ListItem>
            <ListItem>Provide a detailed explanation of why you are requesting a refund.</ListItem>
            <ListItem>Include your name and email address associated with the purchase.</ListItem>
          </List>
          <Paragraph>
            We will process your refund request within 7 business days of receiving it. If approved, the refund will be issued to the original payment method used for the purchase. Depending on your payment provider, it may take an additional 5-10 business days for the refunded amount to appear in your account.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>4. Partial Refunds</SectionTitle>
          <Paragraph>
            In some cases, we may issue partial refunds if:
          </Paragraph>
          <List>
            <ListItem>You have used a significant portion of the premium features during the refund period.</ListItem>
            <ListItem>Only certain aspects of the service did not meet your expectations, while others were satisfactory.</ListItem>
            <ListItem>There were temporary service disruptions that have since been resolved.</ListItem>
          </List>
          <Paragraph>
            The amount of the partial refund will be determined based on the extent of usage and the specific circumstances of the refund request.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>5. Cancellation of Premium Access</SectionTitle>
          <Paragraph>
            Upon processing a refund, your access to premium features will be revoked immediately. Any downloaded content obtained through the premium version prior to the refund will not be affected, but you will no longer be able to access premium features.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>6. Special Promotions and Discounts</SectionTitle>
          <Paragraph>
            Purchases made using special promotional codes, discounts, or during special sales events may be subject to different refund terms, which will be clearly communicated at the time of purchase. Unless otherwise stated, the standard refund policy applies to all purchases.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>7. Changes to This Refund Policy</SectionTitle>
          <Paragraph>
            We reserve the right to modify this Refund Policy at any time. Any changes will be effective immediately upon posting the updated policy on our website. Your continued use of our service after such changes constitutes your acceptance of the new Refund Policy.
          </Paragraph>
          <Paragraph>
            We will notify users of any significant changes to this policy via email or through a notification on our website.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>8. Consumer Rights in Malaysia</SectionTitle>
          <Paragraph>
            This Refund Policy does not affect your statutory rights as a consumer under Malaysian law. Under the <Highlight>Consumer Protection Act 1999</Highlight>, consumers in Malaysia have certain rights regarding the quality of goods and services, including the right to redress for products and services that do not conform to contract.
          </Paragraph>
          <Paragraph>
            If you believe that our service does not conform to what was advertised or agreed upon, you may have additional rights beyond this Refund Policy. For more information about your consumer rights in Malaysia, you can visit the official website of the Ministry of Domestic Trade and Consumer Affairs (KPDNHEP) at www.kpdnhep.gov.my.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>9. Contact Information</SectionTitle>
          <Paragraph>
            If you have any questions or concerns about our Refund Policy, please contact us at:
          </Paragraph>
          <Paragraph>
            Wolf Downloader<br />
            Email: refunds@wolfdownloader.com<br />
            Address: Kuala Lumpur, Malaysia
          </Paragraph>
        </Section>
      </Content>
      
      <Footer />
    </Container>
  );
};

export default RefundPolicy;
