import React, { useState } from 'react';
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

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 40px;
  max-width: 700px;
  line-height: 1.6;
`;

const CategoryTabs = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow-x: auto;
  padding-bottom: 10px;
  
  @media (max-width: 768px) {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
`;

interface TabProps {
  active: boolean;
}

const Tab = styled.button<TabProps>`
  padding: 10px 20px;
  background: ${({ active }) => active ? `rgba(0, 216, 122, 0.1)` : 'transparent'};
  color: ${({ active, theme }) => active ? theme.colors.button.primary.bg : theme.colors.text.secondary};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: ${({ active }) => active ? '600' : '400'};
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    background: rgba(0, 216, 122, 0.05);
    color: ${({ theme }) => theme.colors.button.primary.bg};
  }
  
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const FAQSection = styled.div`
  margin-bottom: 40px;
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

interface AccordionProps {
  isOpen: boolean;
}

const Accordion = styled.div<AccordionProps>`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${({ isOpen }) => 
    isOpen ? 'rgba(0, 216, 122, 0.3)' : 'rgba(255, 255, 255, 0.05)'};
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ isOpen }) => 
      isOpen ? 'rgba(0, 216, 122, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const AccordionHeader = styled.div<AccordionProps>`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: ${({ isOpen }) => 
    isOpen ? 'rgba(0, 216, 122, 0.05)' : 'transparent'};
`;

const Question = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
`;

const ToggleIcon = styled.span<AccordionProps>`
  color: ${({ theme }) => theme.colors.button.primary.bg};
  font-size: 1.5rem;
  transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  transition: transform 0.3s ease;
`;

const AccordionContent = styled.div<AccordionProps>`
  padding: ${({ isOpen }) => (isOpen ? '0 20px 20px' : '0 20px')};
  max-height: ${({ isOpen }) => (isOpen ? '1000px' : '0')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition: all 0.3s ease;
  overflow: hidden;
`;

const Answer = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
  line-height: 1.6;
  
  a {
    color: ${({ theme }) => theme.colors.button.primary.bg};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  ul {
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 8px;
  }
  
  p {
    margin-bottom: 15px;
  }
  
  strong {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

// Removed unused Highlight component

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  
  const toggleAccordion = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const generalFAQs: FAQItemProps[] = [
    {
      question: 'What is Wolf YouTube Downloader?',
      answer: (
        <p>
          Wolf YouTube Downloader is a powerful application that allows you to download videos from YouTube in various formats and qualities. Our tool offers both free and premium versions, with the premium version providing additional features like 4K downloads, batch processing, and more format options.
        </p>
      )
    },
    {
      question: 'Is Wolf YouTube Downloader free to use?',
      answer: (
        <p>
          Yes, we offer a free version with basic features that allows you to download videos in up to 720p quality. For advanced features like 4K downloads, batch processing, and more format options, we offer a premium version for RM 23.20 (discounted from RM 50.00).
        </p>
      )
    },
    {
      question: 'Is it legal to download YouTube videos?',
      answer: (
        <p>
          Downloading videos for personal use is generally acceptable in many jurisdictions. However, redistributing or using downloaded content commercially without permission may violate copyright laws. Always respect copyright and the terms of service of the platforms you're downloading from. Wolf YouTube Downloader is designed for personal use only.
        </p>
      )
    }
  ];
  
  const downloadFAQs: FAQItemProps[] = [
    {
      question: 'What video formats does Wolf YouTube Downloader support?',
      answer: (
        <p>
          The free version supports MP4 and WebM formats up to 720p. The premium version adds support for higher resolutions (1080p, 1440p, and 4K) and additional formats like MKV and AVI.
        </p>
      )
    },
    {
      question: 'How do I download a YouTube video?',
      answer: (
        <div>
          <p>Downloading a video is simple:</p>
          <ol>
            <li>Copy the YouTube video URL</li>
            <li>Paste it into the URL field in Wolf YouTube Downloader</li>
            <li>Select your preferred format and quality</li>
            <li>Click the Download button</li>
          </ol>
        </div>
      )
    },
    {
      question: 'Can I download multiple videos at once?',
      answer: (
        <p>
          The free version allows downloading one video at a time. The premium version supports batch downloading of up to 10 videos simultaneously.
        </p>
      )
    }
  ];
  
  const premiumFAQs: FAQItemProps[] = [
    {
      question: 'How much does the premium version cost?',
      answer: (
        <p>
          The premium version costs RM 23.20, which is a special discounted price from the regular price of RM 50.00.
        </p>
      )
    },
    {
      question: 'What additional features do I get with the premium version?',
      answer: (
        <div>
          <p>The premium version includes:</p>
          <ul>
            <li>4K and 1440p video downloads</li>
            <li>Batch downloading (up to 10 videos simultaneously)</li>
            <li>Additional video formats (MKV, AVI)</li>
            <li>Ad-free experience</li>
            <li>Faster download speeds</li>
            <li>Priority customer support</li>
          </ul>
        </div>
      )
    },
    {
      question: 'How do I upgrade to the premium version?',
      answer: (
        <p>
          Click the "Upgrade to Premium" button in the application, complete the payment process through our secure Stripe payment gateway, and you'll receive immediate access to all premium features.
        </p>
      )
    }
  ];
  
  const troubleshootingFAQs: FAQItemProps[] = [
    {
      question: 'The download fails or gets stuck at 0%',
      answer: (
        <div>
          <p>If your download fails or gets stuck, try these solutions:</p>
          <ul>
            <li>Check your internet connection</li>
            <li>Make sure the video is not private or age-restricted</li>
            <li>Try a different video format or quality</li>
            <li>Restart the application</li>
            <li>Temporarily disable your firewall or antivirus</li>
          </ul>
        </div>
      )
    },
    {
      question: 'The application shows "Video unavailable" error',
      answer: (
        <p>
          This usually means the video has been deleted, is private, or is not available in your region. Verify that you can watch the video in your browser first.
        </p>
      )
    },
    {
      question: 'Audio and video are out of sync',
      answer: (
        <p>
          This can happen with certain video formats. Try downloading in MP4 format, which usually has better compatibility across devices and players.
        </p>
      )
    }
  ];
  
  const renderFAQs = () => {
    let faqs: FAQItemProps[] = [];
    
    switch (activeCategory) {
      case 'general':
        faqs = generalFAQs;
        break;
      case 'download':
        faqs = downloadFAQs;
        break;
      case 'premium':
        faqs = premiumFAQs;
        break;
      case 'troubleshooting':
        faqs = troubleshootingFAQs;
        break;
      default:
        faqs = generalFAQs;
    }
    
    return (
      <FAQList>
        {faqs.map((faq, index) => {
          const id = `${activeCategory}-${index}`;
          return (
            <Accordion key={id} isOpen={!!openItems[id]}>
              <AccordionHeader 
                isOpen={!!openItems[id]} 
                onClick={() => toggleAccordion(id)}
              >
                <Question>{faq.question}</Question>
                <ToggleIcon isOpen={!!openItems[id]}>↓</ToggleIcon>
              </AccordionHeader>
              <AccordionContent isOpen={!!openItems[id]}>
                <Answer>{faq.answer}</Answer>
              </AccordionContent>
            </Accordion>
          );
        })}
      </FAQList>
    );
  };
  
  return (
    <Container>
      <FloatingNavbar currentPage="faq" />
      
      <Content>
        <Title>Frequently Asked Questions</Title>
        <Subtitle>
          Find answers to the most common questions about Wolf YouTube Downloader. If you can't find what you're looking for, feel free to contact our support team.
        </Subtitle>
        
        <CategoryTabs>
          <Tab 
            active={activeCategory === 'general'} 
            onClick={() => setActiveCategory('general')}
          >
            General
          </Tab>
          <Tab 
            active={activeCategory === 'download'} 
            onClick={() => setActiveCategory('download')}
          >
            Download Features
          </Tab>
          <Tab 
            active={activeCategory === 'premium'} 
            onClick={() => setActiveCategory('premium')}
          >
            Premium Version
          </Tab>
          <Tab 
            active={activeCategory === 'troubleshooting'} 
            onClick={() => setActiveCategory('troubleshooting')}
          >
            Troubleshooting
          </Tab>
        </CategoryTabs>
        
        <FAQSection>
          {renderFAQs()}
        </FAQSection>
      </Content>
      
      <Footer />
    </Container>
  );
};

export default FAQ;
