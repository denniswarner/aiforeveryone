import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI for Everyone Quiz
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 