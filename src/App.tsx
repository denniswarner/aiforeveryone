import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Header from './components/Layout/Header';
import Home from './pages/Home';
import Quiz from './pages/Quiz';

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
  return (
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
  );
}

export default App;
