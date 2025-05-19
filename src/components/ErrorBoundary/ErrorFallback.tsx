import { Box, Typography, Paper, Button } from '@mui/material';
import { useEffect } from 'react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  useEffect(() => {
    console.log('[ErrorFallback] Component mounted with error:', error);
    return () => {
      console.log('[ErrorFallback] Component unmounting');
    };
  }, [error]);

  console.log('[ErrorFallback] Rendering with error:', error.message);

  const handleReset = () => {
    console.log('[ErrorFallback] Reset button clicked');
    resetErrorBoundary();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 3
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 600,
          width: '100%',
          textAlign: 'center'
        }}
      >
        <Typography variant="h5" color="error" gutterBottom>
          Oops! Something went wrong
        </Typography>
        <Typography
          variant="body1"
          component="pre"
          sx={{
            color: 'error.main',
            bgcolor: 'error.light',
            p: 2,
            borderRadius: 1,
            overflow: 'auto',
            textAlign: 'left',
            my: 2
          }}
        >
          {error.message}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleReset}
          sx={{ mt: 2 }}
        >
          Try again
        </Button>
      </Paper>
    </Box>
  );
}

export default ErrorFallback; 