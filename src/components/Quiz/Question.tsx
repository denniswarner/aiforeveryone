import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from '@mui/material';
import { Question as QuestionType } from '../../types/quiz.types';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (questionId: number, answerIndex: number) => void;
  selectedAnswer?: number;
  isSubmitted?: boolean;
}

const Question = ({ question, onAnswer, selectedAnswer, isSubmitted }: QuestionProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onAnswer(question.id, parseInt(event.target.value));
  };

  const getOptionColor = (index: number) => {
    if (!isSubmitted) return 'inherit';
    
    if (index === question.correctAnswer) {
      return 'success.main';
    }
    
    if (selectedAnswer === index && index !== question.correctAnswer) {
      return 'error.main';
    }
    
    return 'inherit';
  };

  const getCardStyle = () => {
    if (!isSubmitted) return {};
    
    const isCorrect = selectedAnswer === question.correctAnswer;
    return {
      border: `2px solid ${isCorrect ? 'success.main' : 'error.main'}`,
      backgroundColor: isCorrect ? 'success.light' : 'error.light',
      opacity: 0.9,
    };
  };

  return (
    <Card sx={{ mb: 3, ...getCardStyle() }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              flex: 1,
              color: isSubmitted ? (selectedAnswer === question.correctAnswer ? 'success.main' : 'error.main') : 'inherit'
            }}
          >
            {question.text}
          </Typography>
          {isSubmitted && (
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: selectedAnswer === question.correctAnswer ? 'success.main' : 'error.main',
                fontWeight: 'bold'
              }}
            >
              {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect'}
            </Typography>
          )}
        </Box>
        <RadioGroup
          value={selectedAnswer?.toString() || ''}
          onChange={handleChange}
        >
          {question.options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={index.toString()}
              control={<Radio />}
              label={option}
              disabled={isSubmitted}
              sx={{
                my: 0.5,
                px: 1,
                py: 0.5,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
                color: getOptionColor(index),
                '& .MuiFormControlLabel-label': {
                  color: getOptionColor(index),
                },
                backgroundColor: isSubmitted && index === question.correctAnswer ? 'success.light' : 
                               isSubmitted && selectedAnswer === index ? 'error.light' : 'transparent',
              }}
            />
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default Question; 