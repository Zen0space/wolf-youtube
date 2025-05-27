import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/Theme';
import Homepage from './screens/Homepage';
import DownloaderApp from './components/DownloaderApp';
import PremiumDownloaderApp from './components/PremiumDownloaderApp';
import PaymentSuccessPage from './screens/PaymentSuccessPage';
import PaymentCancelPage from './screens/PaymentCancelPage';
import TermsOfService from './screens/TermsOfService';
import PrivacyPolicy from './screens/PrivacyPolicy';
import RefundPolicy from './screens/RefundPolicy';
import CookiePolicy from './screens/CookiePolicy';
import FAQ from './screens/FAQ';
import ReportBug from './screens/ReportBug';

type AppView = 'homepage' | 'downloader' | 'premium' | 'payment-success' | 'payment-cancel' | 'terms-of-service' | 'privacy-policy' | 'refund-policy' | 'cookie-policy' | 'faq' | 'report-bug';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('homepage');

  useEffect(() => {
    // Check if we're on a payment success or cancel page based on the URL path
    const path = window.location.pathname;
    if (path === '/payment-success') {
      setCurrentView('payment-success');
    } else if (path === '/payment-cancel') {
      setCurrentView('payment-cancel');
    } else if (path === '/terms-of-service') {
      setCurrentView('terms-of-service');
    } else if (path === '/privacy-policy') {
      setCurrentView('privacy-policy');
    } else if (path === '/refund-policy') {
      setCurrentView('refund-policy');
    } else if (path === '/cookie-policy') {
      setCurrentView('cookie-policy');
    } else if (path === '/faq') {
      setCurrentView('faq');
    } else if (path === '/report-bug') {
      setCurrentView('report-bug');
    }
  }, []);

  const handleTryFree = () => {
    setCurrentView('downloader');
  };

  const handleGoToPremium = () => {
    setCurrentView('premium');
  };

  const handleBackToHome = () => {
    setCurrentView('homepage');
    // Also update the URL without refreshing the page
    window.history.pushState({}, '', '/');
  };

  const handleTryAgain = () => {
    setCurrentView('premium');
    // Also update the URL without refreshing the page
    window.history.pushState({}, '', '/');
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {currentView === 'homepage' ? (
        <Homepage onTryFree={handleTryFree} onGoToPremium={handleGoToPremium} />
      ) : currentView === 'downloader' ? (
        <DownloaderApp onBackToHome={handleBackToHome} onGoToPremium={handleGoToPremium} />
      ) : currentView === 'premium' ? (
        <PremiumDownloaderApp onBackToHome={handleBackToHome} />
      ) : currentView === 'payment-success' ? (
        <PaymentSuccessPage onBackToHome={handleBackToHome} />
      ) : currentView === 'terms-of-service' ? (
        <TermsOfService />
      ) : currentView === 'privacy-policy' ? (
        <PrivacyPolicy />
      ) : currentView === 'refund-policy' ? (
        <RefundPolicy />
      ) : currentView === 'cookie-policy' ? (
        <CookiePolicy />
      ) : currentView === 'faq' ? (
        <FAQ />
      ) : currentView === 'report-bug' ? (
        <ReportBug />
      ) : (
        <PaymentCancelPage onBackToHome={handleBackToHome} onTryAgain={handleTryAgain} />
      )}
    </ThemeProvider>
  );
}

export default App;
