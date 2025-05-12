import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
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

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {question.text}
        </Typography>
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
                '&:hover': {
                  backgroundColor: 'action.hover',
                  borderRadius: 1,
                },
                color: getOptionColor(index),
                '& .MuiFormControlLabel-label': {
                  color: getOptionColor(index),
                },
              }}
            />
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default Question; 