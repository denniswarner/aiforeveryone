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

const getRadioColor = (index: number, correctAnswer: number, selectedAnswer: number | undefined, isSubmitted: boolean) => {
  if (!isSubmitted) return 'default';
  if (index === correctAnswer) return 'success';
  if (selectedAnswer === index && index !== correctAnswer) return 'error';
  return 'default';
};

const getLabelStyle = (index: number, correctAnswer: number, selectedAnswer: number | undefined, isSubmitted: boolean) => {
  if (!isSubmitted) return {};
  if (index === correctAnswer) {
    return { color: '#43a047 !important' };
  }
  if (selectedAnswer === index && index !== correctAnswer) {
    return { color: '#e53935 !important' };
  }
  return {};
};

const Question = ({ question, onAnswer, selectedAnswer, isSubmitted }: QuestionProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onAnswer(question.id, parseInt(event.target.value));
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
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
              control={
                <Radio
                  color={getRadioColor(index, question.correctAnswer, selectedAnswer, !!isSubmitted)}
                  checked={selectedAnswer === index}
                />
              }
              label={option}
              disabled={isSubmitted}
              sx={{
                my: 0.5,
                ml: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                  borderRadius: 1,
                },
                '& .MuiFormControlLabel-label': {
                  ...getLabelStyle(index, question.correctAnswer, selectedAnswer, !!isSubmitted),
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