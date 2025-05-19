import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ErrorBoundary } from 'react-error-boundary';
import { useEffect } from 'react';
import Header from './components/Layout/Header';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import ErrorFallback from './components/ErrorBoundary/ErrorFallback';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  useEffect(() => {
    console.log('[App] Component mounted');
    return () => {
      console.log('[App] Component unmounting');
    };
  }, []);

  console.log('[App] Starting render');
  
  return (
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('[App] Error caught by boundary:', error);
        console.error('[App] Error info:', errorInfo);
      }}
      onReset={() => {
        console.log('[App] Error boundary reset');
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header />
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz/:sectionId" element={<Quiz />} />
              <Route path="/results" element={<div>Results Page (Coming Soon)</div>} />
            </Routes>
          </Container>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
