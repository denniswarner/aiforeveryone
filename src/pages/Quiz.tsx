import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  LinearProgress,
} from '@mui/material';
import Question from '../components/Quiz/Question';
import ScoreModal from '../components/Quiz/ScoreModal';
import { useQuizStore } from '../store/quizStore';
import { Question as QuestionType } from '../types/quiz.types';

// Temporary mock data - replace with actual API call later
const mockQuestions: Record<string, QuestionType[]> = {
  '1-1': [
    // Basic Questions (1-10)
    {
      id: 1,
      quizId: 1,
      text: "What is the most commonly used type of machine learning?",
      options: [
        "Unsupervised learning",
        "Reinforcement learning",
        "Supervised learning",
        "Semi-supervised learning"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 2,
      quizId: 1,
      text: "In supervised learning, what is the relationship being learned?",
      options: [
        "Input to input mappings",
        "Output to output mappings",
        "Input to output mappings",
        "Unstructured data mappings"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 3,
      quizId: 1,
      text: "Which of the following is NOT mentioned as an application of supervised learning?",
      options: [
        "Spam filtering",
        "Speech recognition",
        "Weather prediction",
        "Machine translation"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 4,
      quizId: 1,
      text: "What is the primary task of Large Language Models (LLMs) like ChatGPT?",
      options: [
        "Translating between languages",
        "Predicting the next word",
        "Identifying images",
        "Filtering spam"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 5,
      quizId: 1,
      text: "In the manufacturing example provided by Andrew Ng, what is the output of the supervised learning system?",
      options: [
        "Production speed",
        "The position of other machines",
        "Whether there's a defect (scratch or dent)",
        "Manufacturing cost estimation"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 6,
      quizId: 1,
      text: "What does Andrew Ng describe as 'maybe the most lucrative form of supervised learning'?",
      options: [
        "Self-driving cars",
        "Online advertising",
        "Manufacturing inspection",
        "Machine translation"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 7,
      quizId: 1,
      text: "What do Large Language Models (LLMs) use as training data?",
      options: [
        "Images from the internet",
        "Audio recordings",
        "Huge amounts of text",
        "Video content"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 8,
      quizId: 1,
      text: "In the example 'my favorite drink is lychee bubble tea,' how is this single sentence used for training?",
      options: [
        "As a single training example",
        "It's broken into multiple input-output pairs",
        "It's not used for training at all",
        "Only the nouns are used for training"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 9,
      quizId: 1,
      text: "What is the horizontal axis in Andrew Ng's performance graph?",
      options: [
        "Processing power",
        "Model complexity",
        "Amount of data",
        "Training time"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 10,
      quizId: 1,
      text: "What is the vertical axis in Andrew Ng's performance graph?",
      options: [
        "Training time",
        "Cost",
        "System performance",
        "Data complexity"
      ],
      correctAnswer: 2,
      points: 1
    },
    // Intermediate Questions (11-17)
    {
      id: 11,
      quizId: 1,
      text: "What are the TWO key factors needed to achieve the highest levels of AI performance?",
      options: [
        "Fast computers and simple algorithms",
        "A lot of data and large neural networks",
        "Small datasets and complex algorithms",
        "Human oversight and rule-based systems"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 12,
      quizId: 1,
      text: "How do Large Language Models (LLMs) generate text?",
      options: [
        "By copying sentences from the internet",
        "By repeatedly predicting the next word",
        "By following strict grammatical rules",
        "By translating from a base language"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 13,
      quizId: 1,
      text: "What technical detail about LLMs does Andrew Ng mention is omitted from his basic explanation?",
      options: [
        "How the models are compressed",
        "How they're deployed on servers",
        "How they learn to follow instructions rather than just predict words",
        "How they're optimized for speed"
      ],
      correctAnswer: 2,
      points: 2
    },
    {
      id: 14,
      quizId: 1,
      text: "What trend does Andrew Ng identify in the performance of traditional AI systems versus neural networks as data increases?",
      options: [
        "Traditional AI systems and neural networks improve at the same rate",
        "Traditional AI systems improve rapidly then plateau, while neural networks continue improving",
        "Traditional AI systems improve continuously, while neural networks plateau",
        "Both systems plateau, but at different points"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 15,
      quizId: 1,
      text: "What specific hardware advancement does Andrew Ng mention as enabling the training of large neural networks?",
      options: [
        "Cloud computing",
        "Graphics Processing Units (GPUs)",
        "Quantum computers",
        "Specialized AI chips"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 16,
      quizId: 1,
      text: "What does 'big data' refer to in the context of AI?",
      options: [
        "Data that takes up a lot of storage space",
        "Having large amounts of data for training AI systems",
        "Complex data structures",
        "Data from large corporations"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 17,
      quizId: 1,
      text: "What relationship exists between model size and performance?",
      options: [
        "Smaller models perform better with less data",
        "Model size has no correlation with performance",
        "Larger neural networks generally achieve better performance",
        "Medium-sized models always outperform larger ones"
      ],
      correctAnswer: 2,
      points: 2
    },
    // Advanced Questions (18-20)
    {
      id: 18,
      quizId: 1,
      text: "Based on the performance curves shown in Andrew Ng's illustration, what can be inferred about the relationship between data, model size, and diminishing returns?",
      options: [
        "All models eventually reach the same performance ceiling regardless of size",
        "Larger models reach their performance ceiling more quickly than smaller models",
        "Smaller models show diminishing returns sooner than larger models",
        "Model size has no impact on when diminishing returns begin"
      ],
      correctAnswer: 2,
      points: 3
    },
    {
      id: 19,
      quizId: 1,
      text: "What implicit limitation of supervised learning can be inferred?",
      options: [
        "It requires labeled data for training",
        "It can only be used for text-based applications",
        "It's limited to small-scale problems",
        "It always requires cloud computing"
      ],
      correctAnswer: 0,
      points: 3
    },
    {
      id: 20,
      quizId: 1,
      text: "What critical insight underlies the recent breakthroughs in generative AI systems?",
      options: [
        "The development of new algorithms",
        "The reduction in computing costs",
        "Scaling both data and model size simultaneously",
        "The focus on specific industry applications"
      ],
      correctAnswer: 2,
      points: 3
    },
    // Bonus Questions
    {
      id: 21,
      quizId: 1,
      text: "What potential limitation of LLMs can be inferred from Andrew Ng's mention of developers making 'the model less likely to generate inappropriate outputs'?",
      options: [
        "LLMs have limited vocabulary",
        "LLMs might reproduce problematic content found in their training data",
        "LLMs cannot generate creative content",
        "LLMs cannot understand context"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 22,
      quizId: 1,
      text: "Based on the performance curves shown by Andrew Ng, what strategic decision might a company with limited data need to make when implementing AI?",
      options: [
        "Always use the largest possible neural network",
        "Consider whether traditional AI methods might outperform neural networks",
        "Focus exclusively on data collection before any AI implementation",
        "Implement multiple small models rather than one large model"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 23,
      quizId: 1,
      text: "Considering how LLMs are trained to predict the next word, what theoretical limitation might this create for such models?",
      options: [
        "They can only predict one word at a time",
        "They may struggle with long-term coherence and logical consistency",
        "They can only work with languages that use words",
        "They cannot process numerical data"
      ],
      correctAnswer: 1,
      points: 3
    }
  ],
  '1-2': [
    // Placeholder for "What is data?" section
    {
      id: 24,
      quizId: 2,
      text: "What is the primary role of data in AI systems?",
      options: [
        "To store program instructions",
        "To provide examples for learning patterns and making predictions",
        "To display user interfaces",
        "To manage hardware resources"
      ],
      correctAnswer: 1,
      points: 1
    }
  ]
};

const Quiz = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const { answers, setAnswer, setScore, completeQuiz } = useQuizStore();
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [maxPossibleScore, setMaxPossibleScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = useMemo(() => mockQuestions[sectionId || ''] || [], [sectionId]);
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;

  useEffect(() => {
    if (!questions.length) {
      navigate('/');
    }
  }, [questions, navigate]);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswer(questionId, answerIndex);
  };

  const handleSubmit = () => {
    // Calculate score
    let score = 0;
    let maxScore = 0;
    questions.forEach((question: QuestionType) => {
      maxScore += question.points;
      if (answers[question.id] === question.correctAnswer) {
        score += question.points;
      }
    });

    // Save score and complete quiz
    setScore(Number(sectionId?.split('-')[0]), (score / maxScore) * 100);
    completeQuiz();
    
    // Show score modal and mark as submitted to show colors
    setFinalScore(score);
    setMaxPossibleScore(maxScore);
    setShowScoreModal(true);
    setIsSubmitted(true);
  };

  const handleCloseModal = () => {
    setShowScoreModal(false);
  };

  if (!questions.length) {
    return null;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {sectionId?.split('-')[1] === '1' ? 'Machine Learning' :
           sectionId?.split('-')[1] === '2' ? 'What is data?' :
           sectionId?.split('-')[1] === '3' ? 'The terminology of AI' :
           'Section Quiz'}
        </Typography>

        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Progress: {answeredQuestions} of {totalQuestions} questions answered
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(answeredQuestions / totalQuestions) * 100} 
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Paper>

        {questions.map((question: QuestionType) => (
          <Question
            key={question.id}
            question={question}
            onAnswer={handleAnswer}
            selectedAnswer={answers[question.id]}
            isSubmitted={isSubmitted}
          />
        ))}

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
          >
            Back to Modules
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={answeredQuestions < totalQuestions || isSubmitted}
          >
            Submit
          </Button>
        </Box>
      </Box>

      <ScoreModal
        open={showScoreModal}
        score={finalScore}
        maxScore={maxPossibleScore}
        onClose={handleCloseModal}
      />
    </Container>
  );
};

export default Quiz; 