import { useState, useEffect } from 'react';
import { GlobalStyles } from './styles/GlobalStyles';
import Homepage from './screens/Homepage';
import DownloaderApp from './components/DownloaderApp';
import PremiumDownloaderApp from './components/PremiumDownloaderApp';
import PaymentSuccessPage from './screens/PaymentSuccessPage';
import PaymentCancelPage from './screens/PaymentCancelPage';

type AppView = 'homepage' | 'downloader' | 'premium' | 'payment-success' | 'payment-cancel';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('homepage');

  useEffect(() => {
    // Check if we're on a payment success or cancel page based on the URL path
    const path = window.location.pathname;
    if (path === '/payment-success') {
      setCurrentView('payment-success');
    } else if (path === '/payment-cancel') {
      setCurrentView('payment-cancel');
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
    <>
      <GlobalStyles />
      {currentView === 'homepage' ? (
        <Homepage onTryFree={handleTryFree} onGoToPremium={handleGoToPremium} />
      ) : currentView === 'downloader' ? (
        <DownloaderApp onBackToHome={handleBackToHome} onGoToPremium={handleGoToPremium} />
      ) : currentView === 'premium' ? (
        <PremiumDownloaderApp onBackToHome={handleBackToHome} />
      ) : currentView === 'payment-success' ? (
        <PaymentSuccessPage onBackToHome={handleBackToHome} />
      ) : (
        <PaymentCancelPage onBackToHome={handleBackToHome} onTryAgain={handleTryAgain} />
      )}
    </>
  );
}

export default App;
