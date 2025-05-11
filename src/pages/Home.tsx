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
  }
];

const Home = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          AI for Everyone Quiz
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
          Select a section to begin the quiz
        </Typography>
        
        {modules.map((module) => (
          <Paper key={module.id} elevation={2} sx={{ mt: 4 }}>
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