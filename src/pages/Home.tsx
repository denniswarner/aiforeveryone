import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Box,
  Link,
} from '@mui/material';

const modules = [
  {
    id: 1,
    title: 'What is AI?',
    sections: [
      { id: '1-1', title: 'Machine Learning' },
      { id: '1-2', title: 'What is data?' },
      { id: '1-3', title: 'The terminology of AI' },
      { id: '1-4', title: 'What makes an AI company?' },
      { id: '1-5', title: 'What machine learning can and cannot do' },
      { id: '1-6', title: 'More examples of what machine learning can and cannot do' },
      { id: '1-7', title: 'Non-technical explanation of deep learning (Part 1, optional)' },
      { id: '1-8', title: 'Non-technical explanation of deep learning (Part 2, optional)' },
    ]
  },
  {
    id: 2,
    title: 'Building AI Projects',
    sections: [
      { id: '2-1', title: 'Quiz 1 (placeholder)' },
      { id: '2-2', title: 'Quiz 2 (placeholder)' },
    ]
  },
  {
    id: 3,
    title: 'Building AI in Your Company',
    sections: [
      { id: '3-1', title: 'Quiz 1 (placeholder)' },
      { id: '3-2', title: 'Quiz 2 (placeholder)' },
    ]
  },
  {
    id: 4,
    title: 'AI and Society',
    sections: [
      { id: '4-1', title: 'Quiz 1 (placeholder)' },
      { id: '4-2', title: 'Quiz 2 (placeholder)' },
    ]
  },
];

const Home = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          AI for Everyone
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
          Select a section to begin the quiz
        </Typography>

        {/* Horizontal Table of Contents */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
          {modules.map((module, idx) => (
            <>
              <Link
                key={module.id}
                href={`#module-${module.id}`}
                underline="hover"
                color="primary"
                sx={{ fontWeight: 500, fontSize: '1.1rem', mx: 1 }}
              >
                {module.title}
              </Link>
              {idx < modules.length - 1 && <span style={{ color: '#888', fontWeight: 600 }}>|</span>}
            </>
          ))}
        </Box>

        {modules.map((module) => (
          <Paper key={module.id} elevation={2} sx={{ mt: 4 }} id={`module-${module.id}`}>
            <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
              <Typography variant="h6">
                Module {module.id}: {module.title}
              </Typography>
            </Box>
            <List>
              {module.sections.map((section, index) => (
                <ListItem key={section.id} disablePadding divider={index !== module.sections.length - 1}>
                  <ListItemButton
                    component={RouterLink}
                    to={`/quiz/${section.id}`}
                    sx={{ py: 2 }}
                  >
                    <ListItemText
                      primary={section.title}
                      secondary="Click to start quiz"
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default Home; 