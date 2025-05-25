import { useState } from 'react';
import { GlobalStyles } from './styles/GlobalStyles';
import Homepage from './screens/Homepage';
import DownloaderApp from './components/DownloaderApp';

type AppView = 'homepage' | 'downloader';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('homepage');

  const handleTryFree = () => {
    setCurrentView('downloader');
  };

  const handleBackToHome = () => {
    setCurrentView('homepage');
  };

  return (
    <>
      <GlobalStyles />
      {currentView === 'homepage' ? (
        <Homepage onTryFree={handleTryFree} />
      ) : (
        <DownloaderApp onBackToHome={handleBackToHome} />
      )}
    </>
  );
}

export default App;
