import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';

interface ScoreModalProps {
  open: boolean;
  score: number;
  maxScore: number;
  onClose: () => void;
}

const ScoreModal = ({ open, score, maxScore, onClose }: ScoreModalProps) => {
  const percentage = Math.round((score / maxScore) * 100);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Quiz Results</DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="h4" component="div" gutterBottom>
            {percentage}%
          </Typography>
          <Typography variant="body1" color="text.secondary">
            You scored {score} out of {maxScore} points
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScoreModal; 