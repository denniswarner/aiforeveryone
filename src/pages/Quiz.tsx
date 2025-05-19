import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  LinearProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import Question from '../components/Quiz/Question';
import { useQuizStore } from '../store/quizStore';
import { Question as QuestionType } from '../types/quiz.types';
import { progressService } from '../services/progressService';

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
    // Basic Questions (1-10)
    {
      id: 48,
      quizId: 2,
      text: "What is a table of data also called?",
      options: [
        "A database",
        "A data set",
        "A spreadsheet",
        "A data warehouse"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 49,
      quizId: 2,
      text: "In the real estate example, what could be chosen as input A for pricing houses?",
      options: [
        "Only the price of the house",
        "Only the size of the house",
        "Both size and number of bedrooms",
        "Only the number of bedrooms"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 50,
      quizId: 2,
      text: "Who decides what is input A and what is output B in a data set?",
      options: [
        "The AI algorithm",
        "The data scientist",
        "You, based on your business use case",
        "The software vendor"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 51,
      quizId: 2,
      text: "What is an example of unstructured data?",
      options: [
        "House prices in a table",
        "Machine temperature readings",
        "Images",
        "Customer IDs"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 52,
      quizId: 2,
      text: "What is an example of structured data?",
      options: [
        "Audio files",
        "Video recordings",
        "Text documents",
        "Data in a spreadsheet format"
      ],
      correctAnswer: 3,
      points: 1
    },
    {
      id: 53,
      quizId: 2,
      text: "Which of the following is a way to acquire data mentioned?",
      options: [
        "Manual labeling",
        "Creating synthetic data",
        "Crowdsourcing",
        "Blockchain verification"
      ],
      correctAnswer: 0,
      points: 1
    },
    {
      id: 54,
      quizId: 2,
      text: "What type of data was used in the example of detecting cats in pictures?",
      options: [
        "Structured data",
        "Unstructured data",
        "Semi-structured data",
        "Meta data"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 55,
      quizId: 2,
      text: "In the context of a machine failure prediction system, what could be chosen as output B?",
      options: [
        "Machine ID",
        "Temperature",
        "Pressure",
        "Whether the machine failed or not"
      ],
      correctAnswer: 3,
      points: 1
    },
    {
      id: 56,
      quizId: 2,
      text: "What phrase is mentioned to describe the problem of using bad quality data?",
      options: [
        "Data in, insights out",
        "Garbage in, garbage out",
        "More data, more problems",
        "Bad data, bad model"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 57,
      quizId: 2,
      text: "What is one example of a data problem mentioned?",
      options: [
        "Too much data",
        "Encrypted data",
        "Missing values",
        "Outdated algorithms"
      ],
      correctAnswer: 2,
      points: 1
    },
    // Intermediate Questions (11-17)
    {
      id: 58,
      quizId: 2,
      text: "Why is it advised against waiting years to build up an IT team before starting AI projects?",
      options: [
        "AI technology will be obsolete by then",
        "Competitors will gain an advantage",
        "AI teams can provide valuable feedback to guide IT infrastructure development",
        "It's more cost-effective to develop both simultaneously"
      ],
      correctAnswer: 2,
      points: 2
    },
    {
      id: 59,
      quizId: 2,
      text: "How can observing user behaviors generate a data set?",
      options: [
        "By directly asking users for information",
        "By recording actions like purchases at different price points",
        "By analyzing social media profiles",
        "By requiring users to complete surveys"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 60,
      quizId: 2,
      text: "What is the relationship between generative AI and unstructured data?",
      options: [
        "Generative AI cannot work with unstructured data",
        "Generative AI is primarily used to generate unstructured data",
        "Generative AI converts unstructured data to structured data",
        "Generative AI works equally well with both types"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 61,
      quizId: 2,
      text: "What is a problematic assumption some CEOs make about data?",
      options: [
        "That data collection is unnecessary",
        "That only small amounts of data are needed",
        "That having large amounts of data automatically makes it valuable",
        "That all data should be structured"
      ],
      correctAnswer: 2,
      points: 2
    },
    {
      id: 62,
      quizId: 2,
      text: "What differentiates supervised learning from generative AI in terms of data types?",
      options: [
        "Supervised learning works only with structured data",
        "Generative AI works only with unstructured data",
        "Supervised learning works well with both structured and unstructured data",
        "Generative AI requires more data than supervised learning"
      ],
      correctAnswer: 2,
      points: 2
    },
    {
      id: 63,
      quizId: 2,
      text: "How might an AI team's feedback improve data collection for preventative maintenance?",
      options: [
        "By suggesting to collect data more frequently",
        "By recommending different machines to monitor",
        "By eliminating the need for data collection entirely",
        "By outsourcing data collection to specialists"
      ],
      correctAnswer: 0,
      points: 2
    },
    {
      id: 64,
      quizId: 2,
      text: "What is the significance of the 'infamous Google cat' mentioned?",
      options: [
        "It was the first AI system to classify images",
        "It demonstrated that AI could detect cats from watching YouTube videos",
        "It proved that manual labeling is unnecessary",
        "It showed that cats are better than dogs for AI training"
      ],
      correctAnswer: 1,
      points: 2
    },
    // Advanced Questions (18-20)
    {
      id: 65,
      quizId: 2,
      text: "What can be inferred about the relationship between IT infrastructure and AI implementation?",
      options: [
        "They should be developed independently",
        "IT infrastructure must be fully developed before AI implementation",
        "They should develop iteratively with feedback between teams",
        "AI implementation should precede IT infrastructure development"
      ],
      correctAnswer: 2,
      points: 3
    },
    {
      id: 66,
      quizId: 2,
      text: "What strategic error was observed in a company that acquired other companies for their data?",
      options: [
        "They paid too much for the acquisitions",
        "They acquired companies with incompatible data formats",
        "They assumed the data would automatically create value without involving AI teams",
        "They focused too much on unstructured data"
      ],
      correctAnswer: 2,
      points: 3
    },
    {
      id: 67,
      quizId: 2,
      text: "Based on the discussion of data problems, what approach to data collection and preparation would be most effective?",
      options: [
        "Collect as much data as possible before involving AI teams",
        "Focus exclusively on clean, structured data",
        "Involve AI teams early to guide data collection and cleaning strategies",
        "Prioritize volume of data over quality of data"
      ],
      correctAnswer: 2,
      points: 3
    },
    // Bonus Questions
    {
      id: 68,
      quizId: 2,
      text: "What might be the underlying business reason for caution against overinvesting in IT infrastructure without AI team input?",
      options: [
        "Risk of technological obsolescence",
        "Risk of capital misallocation on infrastructure that doesn't support the most valuable AI use cases",
        "Risk of creating organizational silos between IT and AI teams",
        "Risk of overemphasizing data collection at the expense of model development"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 69,
      quizId: 2,
      text: "What can be inferred about the relationship between business strategy and data science implementation?",
      options: [
        "Data science should dictate business strategy",
        "Business strategy and data science objectives should be aligned with iterative feedback",
        "Business strategy should be developed independently of data considerations",
        "Data science is primarily useful for optimization rather than strategic decisions"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 70,
      quizId: 2,
      text: "Based on the distinction between structured and unstructured data and their relationship to different AI approaches, what might be a strategic consideration for a company with both types of data?",
      options: [
        "Always prioritize structured data as it's easier to work with",
        "Develop separate AI systems for each data type without integration",
        "Consider how different AI approaches might be combined for comprehensive insights",
        "Convert all unstructured data to structured data before analysis"
      ],
      correctAnswer: 2,
      points: 3
    }
  ],
  '1-3': [
    // Basic Questions (1-10)
    {
      id: 25,
      quizId: 3,
      text: "What is the most commonly used definition of machine learning?",
      options: [
        "The process of programming computers to follow specific rules",
        "The field of study that gives computers the ability to learn without being explicitly programmed",
        "The science of extracting knowledge and insights from data",
        "The design of neural networks to mimic human cognition"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 26,
      quizId: 3,
      text: "What is typically the output of a data science project?",
      options: [
        "A running piece of software",
        "A neural network model",
        "A slide deck or presentation with insights for decision-making",
        "A mobile application"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 27,
      quizId: 3,
      text: "Who was Arthur Samuel?",
      options: [
        "The creator of the term 'data science'",
        "A pioneer of machine learning who built a checkers-playing program",
        "The inventor of neural networks",
        "The founder of deep learning"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 28,
      quizId: 3,
      text: "What do the terms 'neural network' and 'deep learning' refer to today?",
      options: [
        "Different technologies with different applications",
        "Essentially the same thing, used interchangeably",
        "Competing approaches to AI",
        "Different programming paradigms"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 29,
      quizId: 3,
      text: "In the housing price example, what would be considered the input A?",
      options: [
        "Only the size of the house",
        "Only the number of bedrooms",
        "The price of the house",
        "Size, number of bedrooms, number of bathrooms, and renovation status"
      ],
      correctAnswer: 3,
      points: 1
    },
    {
      id: 30,
      quizId: 3,
      text: "What would be considered the output B in the housing price example?",
      options: [
        "The size of the house",
        "The number of bedrooms",
        "The price of the house",
        "Whether the house is newly renovated"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 31,
      quizId: 3,
      text: "Which of these is a key characteristic of a machine learning system?",
      options: [
        "It requires human oversight for every decision",
        "It's a piece of software that can run automatically at any time",
        "It only works with structured data",
        "It only provides insights, not predictions"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 32,
      quizId: 3,
      text: "What is an artificial neural network primarily described as?",
      options: [
        "A recreation of the human brain",
        "A big mathematical equation for computing output from input",
        "A database of information",
        "A collection of if-then rules"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 33,
      quizId: 3,
      text: "What is the relationship between artificial neural networks and the biological brain?",
      options: [
        "They work in exactly the same way",
        "Neural networks were originally inspired by the brain, but work almost completely differently",
        "Neural networks are digital recreations of brain circuits",
        "They process the same types of information"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 34,
      quizId: 3,
      text: "In the online advertising example, what would be considered a machine learning application?",
      options: [
        "Analyzing which industries are buying the most ads",
        "A system that predicts which ads a user is most likely to click on",
        "A presentation showing advertising trends",
        "Recommending more salespeople for certain industries"
      ],
      correctAnswer: 1,
      points: 1
    },
    // Intermediate Questions (11-17)
    {
      id: 35,
      quizId: 3,
      text: "What distinguishes the outputs of machine learning projects from data science projects?",
      options: [
        "Machine learning produces insights; data science produces software",
        "Machine learning produces software that runs automatically; data science produces insights for decision-making",
        "Machine learning is always more accurate than data science",
        "Data science is always used for business decisions; machine learning never is"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 36,
      quizId: 3,
      text: "According to the diagram presented, what is the relationship between AI and machine learning?",
      options: [
        "They are completely separate fields",
        "They are the same thing with different names",
        "Machine learning is a subset of AI",
        "AI is a subset of machine learning"
      ],
      correctAnswer: 2,
      points: 2
    },
    {
      id: 37,
      quizId: 3,
      text: "Which statement best captures the relationship between deep learning and machine learning?",
      options: [
        "Deep learning is the only form of machine learning that's valuable",
        "Deep learning and machine learning are completely separate fields",
        "Deep learning is considered the most important part of machine learning today",
        "Machine learning is a small subset of deep learning techniques"
      ],
      correctAnswer: 2,
      points: 2
    },
    {
      id: 38,
      quizId: 3,
      text: "In the context of the housing price example, which of the following would be a data science insight rather than a machine learning output?",
      options: [
        "The predicted price of a specific house",
        "The discovery that three-bedroom houses cost more than two-bedroom houses of similar size",
        "A web application that predicts house prices",
        "An algorithm that classifies houses by type"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 39,
      quizId: 3,
      text: "How is the relationship between data science and AI described in the conceptual diagram?",
      options: [
        "Data science is clearly a subset of AI",
        "AI is clearly a subset of data science",
        "There is inconsistency in how the terminology is used in the industry",
        "They are completely separate fields with no overlap"
      ],
      correctAnswer: 2,
      points: 2
    },
    {
      id: 40,
      quizId: 3,
      text: "What would be an example of AI that is not machine learning, based on the concepts discussed?",
      options: [
        "Neural networks",
        "Deep learning",
        "Knowledge graphs (mentioned as one of the other AI tools)",
        "A supervised learning system"
      ],
      correctAnswer: 2,
      points: 2
    },
    {
      id: 41,
      quizId: 3,
      text: "In the context of online advertising, which represents the contrast between machine learning and data science?",
      options: [
        "Machine learning provides real-time ad recommendations; data science might reveal trends about which industries to target",
        "Machine learning is only used for text ads; data science is used for image ads",
        "Machine learning requires more data than data science",
        "Data science is more profitable than machine learning"
      ],
      correctAnswer: 0,
      points: 2
    },
    // Advanced Questions (18-20)
    {
      id: 42,
      quizId: 3,
      text: "What would be the key difference in how a company might implement the results of a machine learning project versus a data science project?",
      options: [
        "Machine learning results would be deployed as automated software systems; data science results would inform strategic human decisions",
        "Machine learning would only be used by technical teams; data science would only be used by business teams",
        "Machine learning projects would focus on customer-facing applications; data science would focus only on internal processes",
        "Machine learning would require more investment; data science would provide faster returns"
      ],
      correctAnswer: 0,
      points: 3
    },
    {
      id: 43,
      quizId: 3,
      text: "What can be inferred about the skill sets typically needed in machine learning versus data science teams?",
      options: [
        "They require completely different skills with no overlap",
        "Machine learning requires programming skills and algorithm understanding; data science likely requires more business analysis and communication skills",
        "Data science requires technical skills; machine learning requires only business knowledge",
        "Both require identical skill sets that can be used interchangeably"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 44,
      quizId: 3,
      text: "Based on the hierarchical diagram presented, how might an organization structure its AI initiatives for maximum effectiveness?",
      options: [
        "Keep data science and machine learning teams completely separate",
        "Only invest in deep learning and ignore other approaches",
        "Recognize the overlapping nature of these fields and create cross-functional teams",
        "Outsource all AI work since the terminology is inconsistent"
      ],
      correctAnswer: 2,
      points: 3
    },
    // Bonus Questions
    {
      id: 45,
      quizId: 3,
      text: "Given the historical context provided about neural networks being rebranded as deep learning, what might this suggest about the evolution of AI terminology?",
      options: [
        "Technical accuracy is the primary driver of terminology changes",
        "Marketing and perception can significantly influence the adoption and funding of technical approaches",
        "Newer terms always represent completely new technologies",
        "Academic terms always prevail over industry terms in the long run"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 46,
      quizId: 3,
      text: "Based on the careful distinction between artificial neural networks and biological brains, what philosophical implication might be drawn about current AI approaches?",
      options: [
        "Current AI systems are approaching human-like intelligence",
        "Neural networks are becoming more biologically accurate over time",
        "Successful AI doesn't necessarily need to replicate human cognition methods",
        "AI research should focus more on accurately modeling the human brain"
      ],
      correctAnswer: 2,
      points: 3
    },
    {
      id: 47,
      quizId: 3,
      text: "Considering the overall structure of AI as presented, how might the relationship between these various fields evolve as AI technology advances in the next decade?",
      options: [
        "All approaches will likely merge into a single unified field",
        "The distinctions will become more rigid and clearly defined",
        "New approaches might emerge that don't fit neatly into the current categorizations",
        "Deep learning will completely replace all other approaches"
      ],
      correctAnswer: 2,
      points: 3
    }
  ],
  '1-4': [
    // Basic Questions (1-10)
    {
      id: 71,
      quizId: 4,
      text: "According to Andrew Ng, simply using a few neural networks or deep learning algorithms makes a company:",
      options: [
        "An AI company",
        "An AI-first company",
        "Neither an AI company nor an AI-first company",
        "A tech company"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 72,
      quizId: 4,
      text: "What analogy does Andrew Ng use to explain the difference between using AI and being an AI company?",
      options: [
        "Operating systems vs software companies",
        "Shopping malls with websites vs internet companies",
        "Traditional manufacturing vs automation",
        "Small businesses vs corporations"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 73,
      quizId: 4,
      text: "What is the first step in the five-step AI transformation playbook?",
      options: [
        "Building an in-house AI team",
        "Developing an AI strategy",
        "Executing pilot projects to gain momentum",
        "Providing broad AI training"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 74,
      quizId: 4,
      text: "What role did Andrew Ng have that helped make companies great at AI?",
      options: [
        "He led the Google Brain team and Baidu's AI group",
        "He was CEO of Google and Baidu",
        "He consulted for Microsoft and Facebook",
        "He was a board member at Apple and Amazon"
      ],
      correctAnswer: 0,
      points: 1
    },
    {
      id: 75,
      quizId: 4,
      text: "What does Andrew Ng say is important for decision-making in internet companies?",
      options: [
        "All decisions should be made by the CEO",
        "Decisions should be pushed down to engineers and specialized roles",
        "Decision-making should be centralized at the top",
        "Decision-making should be outsourced"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 76,
      quizId: 4,
      text: "What is a Machine Learning Engineer commonly abbreviated as?",
      options: [
        "MLA",
        "MLE",
        "MLT",
        "MLO"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 77,
      quizId: 4,
      text: "What is one thing AI companies are very good at according to Andrew Ng?",
      options: [
        "Marketing",
        "Strategic data acquisition",
        "Avoiding automation",
        "Maintaining multiple separate databases"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 78,
      quizId: 4,
      text: "According to Andrew Ng, how many steps are in the AI transformation playbook?",
      options: [
        "Three",
        "Four",
        "Five",
        "Six"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 79,
      quizId: 4,
      text: "What is the second step in the AI transformation playbook?",
      options: [
        "Executing pilot projects",
        "Building an in-house AI team and providing broad AI training",
        "Developing an AI strategy",
        "Aligning communications"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 80,
      quizId: 4,
      text: "What does Andrew Ng say about the process of becoming good at AI?",
      options: [
        "It's a mysterious, magical process",
        "It's only possible for tech companies",
        "It's not a mysterious, magical process but a systematic one",
        "It requires complete reorganization of the company"
      ],
      correctAnswer: 2,
      points: 1
    },
    // Intermediate Questions (11-17)
    {
      id: 81,
      quizId: 4,
      text: "Why do AI companies tend to have unified data warehouses?",
      options: [
        "To comply with regulations",
        "To save money on storage",
        "To enable engineers to connect dots and spot patterns across datasets",
        "To centralize control under one executive"
      ],
      correctAnswer: 2,
      points: 2
    },
    {
      id: 82,
      quizId: 4,
      text: "What concern does Andrew Ng mention about unified data warehouses?",
      options: [
        "Cost",
        "Privacy guarantees and data regulations like GDPR",
        "Technical complexity",
        "Employee resistance"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 83,
      quizId: 4,
      text: "Why might AI companies launch products that do not monetize?",
      options: [
        "To outcompete other businesses",
        "To test new technologies",
        "To acquire data that can be monetized elsewhere",
        "To satisfy investor demands"
      ],
      correctAnswer: 2,
      points: 2
    },
    {
      id: 84,
      quizId: 4,
      text: "How does Andrew Ng describe the AI capabilities of major tech companies like Google, Baidu, Facebook, and Microsoft 10 years ago?",
      options: [
        "They were already great AI companies",
        "They were not great AI companies the way they are today",
        "They were focused on different technologies entirely",
        "They had more advanced AI than they do now"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 85,
      quizId: 4,
      text: "What does Andrew Ng suggest about AI training in organizations?",
      options: [
        "It should be limited to the engineering team",
        "It should be broad, including managers, division leaders, and executives",
        "It should be conducted only after developing an AI strategy",
        "It should be outsourced to specialized training firms"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 86,
      quizId: 4,
      text: "What is the relationship between executing pilot projects and developing an AI strategy according to the playbook?",
      options: [
        "They should happen simultaneously",
        "Pilot projects should follow strategy development",
        "Strategy development typically follows after gaining experience with pilot projects",
        "They are independent steps with no particular order"
      ],
      correctAnswer: 2,
      points: 2
    },
    {
      id: 87,
      quizId: 4,
      text: "How does Andrew Ng compare the potential value creation of AI inside versus outside the software industry?",
      options: [
        "AI will only create value in the software industry",
        "AI will create tremendous value in the software industry and outside of it",
        "AI will create more value outside the software industry than within it",
        "AI will create value equally in all industries"
      ],
      correctAnswer: 1,
      points: 2
    },
    // Advanced Questions (18-20)
    {
      id: 88,
      quizId: 4,
      text: "Based on Andrew Ng's comparison between internet companies and AI companies, what fundamental shift in organizational structure appears common to both transformations?",
      options: [
        "The need for more centralized decision-making",
        "Distributing expertise and decision-making authority more widely",
        "Reducing the size of the workforce",
        "Focusing exclusively on technology over business strategies"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 89,
      quizId: 4,
      text: "What underlying principle connects the examples Andrew Ng gives of what makes a great AI company?",
      options: [
        "Maximizing short-term profits",
        "Doing the things that AI allows you to do really well",
        "Following industry best practices",
        "Competing directly with established tech giants"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 90,
      quizId: 4,
      text: "Based on the discussion, what could be inferred about the relationship between organizational structure and successful AI implementation?",
      options: [
        "Traditional hierarchical structures are optimal for AI implementation",
        "Successful AI implementation likely requires new organizational roles and structures",
        "Organizational structure is irrelevant to AI success",
        "AI implementation should be kept separate from the main business organization"
      ],
      correctAnswer: 1,
      points: 3
    },
    // Bonus Questions
    {
      id: 91,
      quizId: 4,
      text: "Considering Andrew Ng's comments about strategic data acquisition, what ethical and strategic tension might AI-aspiring companies need to navigate?",
      options: [
        "The trade-off between immediate monetization and long-term data strategy",
        "The conflict between data acquisition goals and user privacy expectations",
        "Both A and B",
        "Neither A nor B"
      ],
      correctAnswer: 2,
      points: 3
    },
    {
      id: 92,
      quizId: 4,
      text: "Based on the discussion of the AI transformation playbook, what implicit assumption might underlie the recommended sequence of steps?",
      options: [
        "That AI implementation is primarily a technical challenge",
        "That cultural and organizational changes must precede technical implementation",
        "That understanding through experience must precede strategic direction",
        "That external communications are more important than internal ones"
      ],
      correctAnswer: 2,
      points: 3
    },
    {
      id: 93,
      quizId: 4,
      text: "Given Andrew Ng's background and his comparison between internet transformation and AI transformation, what historical pattern might we infer about technological revolutions in business?",
      options: [
        "Each technological revolution requires completely new business principles",
        "Technological revolutions succeed when they enhance existing business models",
        "Each major technological shift follows a similar pattern of organizational transformation",
        "Technology adoption is primarily driven by competitive pressure rather than internal transformation"
      ],
      correctAnswer: 2,
      points: 3
    }
  ],
  '1-5': [
    // Basic Questions (1-10)
    {
      id: 94,
      quizId: 5,
      text: "What is technical diligence on an AI project meant to determine?",
      options: [
        "The cost of implementation",
        "The timeline for development",
        "The feasibility of the project",
        "The return on investment"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 95,
      quizId: 5,
      text: "According to Andrew Ng, what type of results do media and academic literature tend to report about AI?",
      options: [
        "Only positive results or success stories",
        "Balanced coverage of successes and failures",
        "Primarily negative results",
        "Only theoretical possibilities"
      ],
      correctAnswer: 0,
      points: 1
    },
    {
      id: 96,
      quizId: 5,
      text: "What rule of thumb does Andrew Ng suggest for determining if supervised learning might be able to automate a task?",
      options: [
        "If it can be done with mathematical formulas",
        "If a human can do it with a second of thought",
        "If it requires visual recognition",
        "If it involves pattern recognition"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 97,
      quizId: 5,
      text: "What example is given of something that AI today cannot do well?",
      options: [
        "Spam filtering",
        "Speech recognition",
        "Accurately predicting stock prices based only on historical prices",
        "Visual inspection of manufacturing defects"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 98,
      quizId: 5,
      text: "Why is predicting future stock prices particularly challenging for AI?",
      options: [
        "There isn't enough historical data available",
        "The computational requirements are too high",
        "Past stock prices are not very predictive of future prices",
        "The algorithms are not sophisticated enough"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 99,
      quizId: 5,
      text: "What does Andrew Ng mean by a 'simple concept' in machine learning terms?",
      options: [
        "A concept that can be explained in one sentence",
        "A concept that takes a human only a second or a very small number of seconds to process",
        "A concept that requires minimal computing power",
        "A concept that can be programmed using simple code"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 100,
      quizId: 5,
      text: "What type of data is needed to build a machine learning system to detect scratches on phones?",
      options: [
        "Only images of phones",
        "Only labels indicating scratched or not scratched",
        "Both images of phones and labels identifying them as scratched or not",
        "Technical specifications of phone materials"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 101,
      quizId: 5,
      text: "According to Andrew Ng, what is AI transforming?",
      options: [
        "Only the technology sector",
        "Only large corporations",
        "Every industry",
        "Only consumer products"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 102,
      quizId: 5,
      text: "What is one factor that makes a machine learning problem more likely to be feasible?",
      options: [
        "Having lots of data available",
        "Having a large development team",
        "Having significant financial resources",
        "Having advanced computing hardware"
      ],
      correctAnswer: 0,
      points: 1
    },
    {
      id: 103,
      quizId: 5,
      text: "What does Andrew Ng compare AI to?",
      options: [
        "The internet",
        "Electricity",
        "Steam power",
        "Nuclear energy"
      ],
      correctAnswer: 1,
      points: 1
    },
    // Intermediate Questions (11-17)
    {
      id: 104,
      quizId: 5,
      text: "Why might CEOs sometimes have unrealistic expectations about AI capabilities?",
      options: [
        "They read too many science fiction novels",
        "They are influenced by media reports of only positive results",
        "They lack technical backgrounds",
        "They are pressured by competitors"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 105,
      quizId: 5,
      text: "What is the relationship between the complexity of a concept and the feasibility of automating it with machine learning?",
      options: [
        "Complex concepts are more feasible to automate because they provide more data",
        "There is no relationship between complexity and feasibility",
        "Simpler concepts are more likely to be feasible to automate",
        "Complexity only matters for certain types of machine learning models"
      ],
      correctAnswer: 2,
      points: 2
    },
    {
      id: 106,
      quizId: 5,
      text: "In the context of predicting stock prices, what alternative approach might have some predictive power?",
      options: [
        "Using only longer historical time periods",
        "Using more complex algorithms",
        "Using additional inputs like web traffic or foot traffic data",
        "Using faster computers for real-time analysis"
      ],
      correctAnswer: 2,
      points: 2
    },
    {
      id: 107,
      quizId: 5,
      text: "What are the two main factors mentioned that make a machine learning problem more likely to be feasible?",
      options: [
        "Simple concept and lots of computing power",
        "Simple concept and lots of data available",
        "Complex concept and specialized algorithms",
        "Lots of data and powerful hardware"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 108,
      quizId: 5,
      text: "Why does identifying the position of other cars seem like a feasible task for machine learning?",
      options: [
        "Because it requires little data",
        "Because it's a computationally simple task",
        "Because humans can do it with less than a second of thought",
        "Because it's already been done before"
      ],
      correctAnswer: 2,
      points: 2
    },
    {
      id: 109,
      quizId: 5,
      text: "What does Andrew Ng suggest engineers should do before committing to an AI project?",
      options: [
        "Secure sufficient funding",
        "Perform technical diligence to assess feasibility",
        "Start with a pilot implementation",
        "Hire specialized talent"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 110,
      quizId: 5,
      text: "What misconception about AI capabilities does Andrew Ng highlight?",
      options: [
        "That AI is too limited to be useful",
        "That AI can only work with digital data",
        "That AI can do everything",
        "That AI is only useful for large companies"
      ],
      correctAnswer: 2,
      points: 2
    },
    // Advanced Questions (18-20)
    {
      id: 111,
      quizId: 5,
      text: "Based on the discussion of stock price prediction, what principle can be inferred about the relationship between input data and output predictions in machine learning?",
      options: [
        "More historical data always leads to better predictions",
        "The input data must have a meaningful causal relationship with the output to be predicted",
        "Complex outputs require complex inputs",
        "Time-series data is always difficult to predict"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 112,
      quizId: 5,
      text: "What inference can be made about the role of human judgment in selecting AI projects?",
      options: [
        "Human judgment will soon be replaced by AI decision-making",
        "Human judgment is essential for filtering feasible from infeasible AI projects",
        "Human judgment is only needed for technical implementation details",
        "Human judgment is less reliable than algorithmic project selection"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 113,
      quizId: 5,
      text: "What strategic implication can be drawn from the distinction between what AI can and cannot do?",
      options: [
        "Companies should wait until AI can do everything before investing",
        "Companies should focus only on what competitors are doing with AI",
        "Companies should be selective and target AI projects where feasibility is higher",
        "Companies should prioritize complex AI problems for greater competitive advantage"
      ],
      correctAnswer: 2,
      points: 3
    },
    // Bonus Questions
    {
      id: 114,
      quizId: 5,
      text: "Based on the described limitations of AI in predicting stock prices, what broader limitation might this suggest about AI's capabilities with complex systems?",
      options: [
        "AI cannot work with financial data at all",
        "AI struggles with systems where past behavior may not predict future behavior due to numerous complex, changing variables",
        "AI is limited by processing power when handling financial calculations",
        "AI will eventually overcome these limitations with more data"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 115,
      quizId: 5,
      text: "What philosophical question does the 'one second of thought' rule of thumb raise about the nature of human versus machine intelligence?",
      options: [
        "Whether machines will ever think like humans",
        "Whether tasks that require instantaneous human intuition represent a fundamentally different type of cognition than tasks requiring longer deliberation",
        "Whether machines process information faster than humans",
        "Whether human cognition is essentially computational"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 116,
      quizId: 5,
      text: "Considering Andrew Ng's advice on project selection, what might be an optimal approach for a company just beginning to implement AI?",
      options: [
        "Focus on cutting-edge research problems to gain competitive advantage",
        "Start with well-defined, high-value problems where the concept is simple and data is abundant",
        "Wait for AI technology to mature further before implementing",
        "Implement AI across all business processes simultaneously"
      ],
      correctAnswer: 1,
      points: 3
    }
  ],
  '1-6': [
    // Basic Questions (1-10)
    {
      id: 120,
      quizId: 6,
      text: "What does the speaker say is one of the challenges of becoming good at recognizing what AI can and cannot do?",
      options: [
        "It requires advanced programming skills",
        "It requires seeing concrete examples of AI successes and failures",
        "It requires a PhD in computer science",
        "It requires working at a tech company"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 121,
      quizId: 6,
      text: "In the self-driving car example, what can AI do pretty well?",
      options: [
        "Detect the intentions of pedestrians",
        "Determine where other cars are positioned",
        "Understand all human gestures",
        "Predict traffic patterns"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 122,
      quizId: 6,
      text: "What is mentioned as an input that self-driving cars might use besides cameras?",
      options: [
        "GPS",
        "Radar and lidar",
        "Satellite imagery",
        "Traffic data"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 123,
      quizId: 6,
      text: "According to the speaker, what medical diagnosis task can AI potentially perform?",
      options: [
        "Diagnosing pneumonia from X-ray images",
        "Understanding medical textbooks",
        "Diagnosing all diseases from a single image",
        "Replacing doctors entirely"
      ],
      correctAnswer: 0,
      points: 1
    },
    {
      id: 124,
      quizId: 6,
      text: "When does machine learning tend to work well, according to the video?",
      options: [
        "When trying to learn complex concepts with little data",
        "When trying to learn simple concepts with lots of data",
        "When programming complex algorithms",
        "When humans cannot solve the problem"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 125,
      quizId: 6,
      text: "What is one type of input data mentioned for self-driving cars?",
      options: [
        "Traffic signals",
        "Pictures of what's in front of the car",
        "Weather conditions",
        "Road maps"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 126,
      quizId: 6,
      text: "What is described as difficult for current AI systems to interpret accurately?",
      options: [
        "Road signs",
        "Other vehicles",
        "Human gestures and intentions",
        "Weather conditions"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 127,
      quizId: 6,
      text: "How much time would typically be needed to see three examples of AI projects if you work on one new project per year?",
      options: [
        "1 year",
        "2 years",
        "3 years",
        "6 months"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 128,
      quizId: 6,
      text: "In the X-ray example, what is the output (B) the AI system is trying to determine?",
      options: [
        "The patient's age",
        "Whether the patient has pneumonia",
        "The quality of the X-ray",
        "The best treatment option"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 129,
      quizId: 6,
      text: "What is one reason the speaker gives for why interpreting human gestures is difficult for AI?",
      options: [
        "People gesture too quickly",
        "The number of ways people can gesture is very large",
        "Cameras can't capture gestures clearly",
        "AI doesn't have hands to understand gestures"
      ],
      correctAnswer: 1,
      points: 1
    },
    // Intermediate Questions (11-17)
    {
      id: 130,
      quizId: 6,
      text: "Why does the speaker suggest that detecting human intentions from gestures is particularly challenging for self-driving cars?",
      options: [
        "The computational power required is too high",
        "It's a safety-critical application requiring extreme accuracy",
        "Humans don't gesture at self-driving cars",
        "The cameras are not positioned correctly"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 131,
      quizId: 6,
      text: "What contrast does the speaker make between humans and AI regarding learning from medical textbooks?",
      options: [
        "Humans need more examples than AI",
        "AI can learn faster but less accurately",
        "Humans can learn from few examples and explanations, while AI struggles with this",
        "AI and humans learn equally well from textbooks"
      ],
      correctAnswer: 2,
      points: 2
    },
    {
      id: 132,
      quizId: 6,
      text: "What weakness of machine learning is described as 'underappreciated' in the video?",
      options: [
        "Its inability to work with very large datasets",
        "Its poor performance when asked to work with new types of data different from its training data",
        "Its high energy consumption",
        "Its inability to explain its decisions"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 133,
      quizId: 6,
      text: "What example does the speaker use to demonstrate AI's weakness in generalizing to new data?",
      options: [
        "A language model failing to understand slang",
        "A pneumonia detection system trained on high-quality X-rays failing on X-rays from a different hospital",
        "A self-driving car failing in rainy conditions",
        "A chess AI failing against unconventional strategies"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 134,
      quizId: 6,
      text: "What does the speaker suggest about the boundary between what AI can and cannot do?",
      options: [
        "It's completely clear and well-defined",
        "It's fuzzy and determining feasibility often requires technical investigation",
        "It's only understandable to AI experts",
        "It's constantly shifting every few months"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 135,
      quizId: 6,
      text: "According to the video, why is it particularly difficult to collect enough data for an AI to interpret human gestures directed at cars?",
      options: [
        "People don't like being recorded",
        "The diversity of gestures is too great to capture completely",
        "Video quality is usually too poor",
        "Legal restrictions on data collection"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 136,
      quizId: 6,
      text: "What does the speaker suggest about their own ability to determine AI project feasibility?",
      options: [
        "They can immediately determine if a project is feasible",
        "They often need weeks of technical diligence to form strong convictions about feasibility",
        "They rely entirely on others' opinions",
        "They use a mathematical formula to calculate feasibility"
      ],
      correctAnswer: 1,
      points: 2
    },
    // Advanced Questions (18-20)
    {
      id: 137,
      quizId: 6,
      text: "Based on the principles discussed in the video, why would neural networks be effective for complex patterns?",
      options: [
        "They use simple programming code",
        "They require less data than other methods",
        "Simple neurons stack to compute increasingly complex functions",
        "They work without any human supervision"
      ],
      correctAnswer: 2,
      points: 3
    },
    {
      id: 138,
      quizId: 6,
      text: "What would you need to do if you wanted to add 'seasonal trends' as a factor in the t-shirt demand prediction?",
      options: [
        "Completely redesign the neural network",
        "Simply add it as an additional input to the existing network",
        "Create a separate neural network just for seasonality",
        "This wouldn't be possible with neural networks"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 139,
      quizId: 6,
      text: "If a neural network consistently overestimates demand, what might be happening?",
      options: [
        "The network is too small",
        "It needs more training data or adjustment",
        "Neural networks always overestimate by design",
        "The input features are irrelevant"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 140,
      quizId: 6,
      text: "Why didn't the designer need to explicitly tell the neural network that 'affordability' was an important factor?",
      options: [
        "Affordability isn't actually important for sales",
        "The neural network can discover these relationships on its own",
        "Affordability was pre-programmed in all neural networks",
        "They did explicitly define affordability"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 141,
      quizId: 6,
      text: "What advantages would a larger neural network with thousands of neurons have over the simple examples shown?",
      options: [
        "It would compute faster but less accurately",
        "It could potentially model more complex, nuanced relationships",
        "It would require less training data",
        "It would be easier to interpret"
      ],
      correctAnswer: 1,
      points: 3
    },
    // Bonus Questions (21-23)
    {
      id: 142,
      quizId: 6,
      text: "How might a neural network handle 'discontinuous' relationships, such as if t-shirts sold dramatically better at certain price points (like $19.99 vs $20.00)?",
      options: [
        "Neural networks cannot model discontinuous relationships",
        "By using special 'discontinuity neurons'",
        "With enough neurons and proper training, it could approximate these jumps",
        "By converting all inputs to continuous variables"
      ],
      correctAnswer: 2,
      points: 3
    },
    {
      id: 143,
      quizId: 6,
      text: "Based on the concepts explained, how might transfer learning work in the context of neural networks?",
      options: [
        "Creating entirely new neural networks for each similar problem",
        "Using parts of trained neural networks as starting points for related problems",
        "Transferring data between different databases",
        "Moving neural networks between different computers"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 144,
      quizId: 6,
      text: "How would the concept of 'vanishing gradients' potentially affect a very deep neural network with many layers compared to the simple examples shown?",
      options: [
        "It would make training faster",
        "It would have no effect on modern networks",
        "It could make it difficult for early layers to learn properly",
        "It would cause the network to use more memory"
      ],
      correctAnswer: 2,
      points: 3
    }
  ],
  '1-7': [
    // Basic Questions (1-10)
    {
      id: 143,
      quizId: 7,
      text: "In AI, what two terms are used almost interchangeably?",
      options: [
        "Machine learning and AI",
        "Deep learning and neural networks",
        "Data mining and clustering",
        "Supervised and unsupervised learning"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 144,
      quizId: 7,
      text: "What is the simplest form of a neural network shown in the example?",
      options: [
        "Multiple interconnected neurons",
        "A single artificial neuron",
        "A decision tree",
        "A clustering algorithm"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 145,
      quizId: 7,
      text: "In the t-shirt example, what was the input to the simplest neural network?",
      options: [
        "Demand",
        "Material quality",
        "Price",
        "Marketing budget"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 146,
      quizId: 7,
      text: "What was the output of the simplest neural network in the t-shirt example?",
      options: [
        "Price",
        "Estimated demand",
        "Shipping cost",
        "Quality rating"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 147,
      quizId: 7,
      text: "What shape did the simplest neural network create when plotting price vs. demand?",
      options: [
        "A straight line",
        "A curved line that flattens at zero",
        "A bell curve",
        "A zigzag pattern"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 148,
      quizId: 7,
      text: "What metaphor was used to describe how artificial neurons work together?",
      options: [
        "Building blocks",
        "Puzzle pieces",
        "Lego bricks",
        "Chain links"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 149,
      quizId: 7,
      text: "How many inputs were used in the more complex t-shirt demand prediction model?",
      options: [
        "2",
        "3",
        "4",
        "5"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 150,
      quizId: 7,
      text: "What was NOT one of the inputs in the more complex neural network example?",
      options: [
        "Price",
        "Shipping cost",
        "Customer age",
        "Material"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 151,
      quizId: 7,
      text: "In the more complex neural network example, what were the blue neurons calculating?",
      options: [
        "Final demand predictions",
        "Intermediate factors like affordability and awareness",
        "Error rates",
        "Learning rates"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 152,
      quizId: 7,
      text: "In a neural network, what does the output neuron do?",
      options: [
        "Processes raw input data",
        "Combines intermediate calculations to produce the final output",
        "Stores the training data",
        "Controls the learning rate"
      ],
      correctAnswer: 1,
      points: 1
    },
    // Intermediate Questions (11-15)
    {
      id: 153,
      quizId: 7,
      text: "What is one of the 'wonderful things' about neural networks according to the content?",
      options: [
        "They're easy to debug",
        "They require minimal computational power",
        "They figure out the middle connections by themselves",
        "They never make prediction errors"
      ],
      correctAnswer: 2,
      points: 2
    },
    {
      id: 154,
      quizId: 7,
      text: "How many artificial neurons were in the more complex t-shirt demand example?",
      options: [
        "3",
        "4",
        "5",
        "7"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 155,
      quizId: 7,
      text: "What is the relationship between perceived quality and price in the neural network example?",
      options: [
        "They are unrelated",
        "Higher price can increase perceived quality",
        "Price only affects affordability, not quality",
        "Price decreases perceived quality"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 156,
      quizId: 7,
      text: "What does it mean to 'train' a neural network?",
      options: [
        "Manually setting all the weights",
        "Feeding it data with inputs and expected outputs",
        "Building the physical hardware",
        "Writing the programming language"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 157,
      quizId: 7,
      text: "What factors did the 'perceived quality' neuron take as inputs?",
      options: [
        "Price, shipping cost, and material",
        "Price, marketing, and material",
        "Only material quality",
        "Marketing and affordability"
      ],
      correctAnswer: 1,
      points: 2
    },
    // Advanced Questions (16-20)
    {
      id: 158,
      quizId: 7,
      text: "Based on the explanation, why would neural networks be effective for complex patterns?",
      options: [
        "They use simple programming code",
        "They require less data than other methods",
        "Simple neurons stack to compute increasingly complex functions",
        "They work without any human supervision"
      ],
      correctAnswer: 2,
      points: 3
    },
    {
      id: 159,
      quizId: 7,
      text: "What would you need to do if you wanted to add 'seasonal trends' as a factor in the t-shirt demand prediction?",
      options: [
        "Completely redesign the neural network",
        "Simply add it as an additional input to the existing network",
        "Create a separate neural network just for seasonality",
        "This wouldn't be possible with neural networks"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 160,
      quizId: 7,
      text: "If a neural network consistently overestimates demand, what might be happening?",
      options: [
        "The network is too small",
        "It needs more training data or adjustment",
        "Neural networks always overestimate by design",
        "The input features are irrelevant"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 161,
      quizId: 7,
      text: "Why didn't the designer need to explicitly tell the neural network that 'affordability' was an important factor?",
      options: [
        "Affordability isn't actually important for sales",
        "The neural network can discover these relationships on its own",
        "Affordability was pre-programmed in all neural networks",
        "They did explicitly define affordability"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 162,
      quizId: 7,
      text: "What advantages would a larger neural network with thousands of neurons have over the simple examples shown?",
      options: [
        "It would compute faster but less accurately",
        "It could potentially model more complex, nuanced relationships",
        "It would require less training data",
        "It would be easier to interpret"
      ],
      correctAnswer: 1,
      points: 3
    },
    // Bonus Questions (21-23)
    {
      id: 163,
      quizId: 7,
      text: "How might a neural network handle 'discontinuous' relationships, such as if t-shirts sold dramatically better at certain price points (like $19.99 vs $20.00)?",
      options: [
        "Neural networks cannot model discontinuous relationships",
        "By using special 'discontinuity neurons'",
        "With enough neurons and proper training, it could approximate these jumps",
        "By converting all inputs to continuous variables"
      ],
      correctAnswer: 2,
      points: 3
    },
    {
      id: 164,
      quizId: 7,
      text: "Based on the concepts explained, how might transfer learning work in the context of neural networks?",
      options: [
        "Creating entirely new neural networks for each similar problem",
        "Using parts of trained neural networks as starting points for related problems",
        "Transferring data between different databases",
        "Moving neural networks between different computers"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 165,
      quizId: 7,
      text: "How would the concept of 'vanishing gradients' potentially affect a very deep neural network with many layers compared to the simple examples shown?",
      options: [
        "It would make training faster",
        "It would have no effect on modern networks",
        "It could make it difficult for early layers to learn properly",
        "It would cause the network to use more memory"
      ],
      correctAnswer: 2,
      points: 3
    }
  ],
  '1-8': [
    // Basic Questions (1-7)
    {
      id: 166,
      quizId: 8,
      text: "How does a computer see a picture compared to how humans see it?",
      options: [
        "Exactly the same way humans do",
        "As a grid of pixel brightness values",
        "As abstract concepts and ideas",
        "Only in black and white"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 167,
      quizId: 8,
      text: "In a black and white or grayscale image, what does each pixel correspond to?",
      options: [
        "Three numbers for color intensity",
        "A single number for brightness",
        "The name of the object in that pixel",
        "An edge detection value"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 168,
      quizId: 8,
      text: "How many numbers represent each pixel in a color image?",
      options: [
        "One",
        "Two",
        "Three",
        "Four"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 169,
      quizId: 8,
      text: "What do the three numbers in a color pixel represent?",
      options: [
        "Height, width, and depth",
        "Hue, saturation, and brightness",
        "Red, green, and blue brightness values",
        "Horizontal, vertical, and diagonal coordinates"
      ],
      correctAnswer: 2,
      points: 1
    },
    {
      id: 170,
      quizId: 8,
      text: "What is the primary task of the neural network in face recognition?",
      options: [
        "To create new faces",
        "To take pixel values as input and output a person's identity",
        "To enhance photo quality",
        "To compress image files"
      ],
      correctAnswer: 1,
      points: 1
    },
    {
      id: 171,
      quizId: 8,
      text: "For a 1000 × 1000 pixel color image, approximately how many input numbers would a neural network process?",
      options: [
        "1,000",
        "10,000",
        "1,000,000",
        "3,000,000"
      ],
      correctAnswer: 3,
      points: 1
    },
    {
      id: 172,
      quizId: 8,
      text: "What is one advantage of neural networks mentioned in the text?",
      options: [
        "They require very little data",
        "They are easy to program manually",
        "You don't need to worry about what happens in the middle layers",
        "They work only with numerical data"
      ],
      correctAnswer: 2,
      points: 1
    },
    // Intermediate Questions (8-13)
    {
      id: 173,
      quizId: 8,
      text: "What do neurons in the earlier parts of a face recognition neural network typically learn to detect?",
      options: [
        "Complete faces",
        "Identities of people",
        "Edges in pictures",
        "Clothing and accessories"
      ],
      correctAnswer: 2,
      points: 2
    },
    {
      id: 174,
      quizId: 8,
      text: "After learning to detect edges, what do the neurons in the middle layers of the network learn to detect?",
      options: [
        "Pixel brightness only",
        "Parts of objects like eyes and noses",
        "The background of images",
        "Image resolution"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 175,
      quizId: 8,
      text: "What do the later neurons (further to the right) in a face recognition neural network learn to detect?",
      options: [
        "Only edge features",
        "Different shapes of faces",
        "Only pixel colors",
        "Image timestamps"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 176,
      quizId: 8,
      text: "How does a neural network figure out what each neuron in the middle should compute?",
      options: [
        "By following explicit programming instructions",
        "Through the learning algorithm and lots of training data",
        "By asking the user for guidance",
        "By copying other neural networks"
      ],
      correctAnswer: 1,
      points: 2
    },
    {
      id: 177,
      quizId: 8,
      text: "If you increase the resolution of an image from 500×500 pixels to 1000×1000 pixels, how does this affect the number of input values to the neural network?",
      options: [
        "No change",
        "Doubles the number of inputs",
        "Quadruples the number of inputs",
        "Increases by 50%"
      ],
      correctAnswer: 2,
      points: 2
    },
    {
      id: 178,
      quizId: 8,
      text: "What key components does a neural network need to learn face recognition?",
      options: [
        "Just images of faces",
        "Images (input A) and correct identities (output B)",
        "Only the identities of people",
        "Predetermined facial features"
      ],
      correctAnswer: 1,
      points: 2
    },
    // Advanced Questions (14-17)
    {
      id: 179,
      quizId: 8,
      text: "How does the neural network's approach to face recognition differ from traditional programming approaches?",
      options: [
        "Neural networks use fewer computational resources",
        "Neural networks must be explicitly told what features to look for",
        "Neural networks discover important features on their own",
        "Neural networks only work with pre-processed images"
      ],
      correctAnswer: 2,
      points: 3
    },
    {
      id: 180,
      quizId: 8,
      text: "What is the progression of feature detection in a face recognition neural network?",
      options: [
        "Identities → Faces → Parts → Edges",
        "Edges → Parts of objects → Shapes of faces → Identities",
        "Colors → Textures → Shapes → Identities",
        "Pixels → Identities (no intermediate steps)"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 181,
      quizId: 8,
      text: "Why doesn't the user need to specify what each neuron in the neural network should compute?",
      options: [
        "Because neural networks only have input and output neurons",
        "Because the learning algorithm automatically determines this during training",
        "Because all neurons compute the same function",
        "Because only the first layer of neurons matters"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 182,
      quizId: 8,
      text: "How would a neural network process a 1000×1000 pixel image that has both color and depth information (RGBD)?",
      options: [
        "It would use 3 million inputs",
        "It would use 4 million inputs",
        "It would convert it to grayscale first",
        "It cannot process depth information"
      ],
      correctAnswer: 1,
      points: 3
    },
    // Bonus Questions (18-20)
    {
      id: 183,
      quizId: 8,
      text: "How might the computational requirements change if you wanted to recognize not just who is in an image but also their emotional state, age, and whether they're wearing glasses?",
      options: [
        "The input size would increase",
        "The output layer would need more neurons for multiple classifications",
        "The network would need fewer hidden layers",
        "The computation would be simpler as these are related tasks"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 184,
      quizId: 8,
      text: "In a neural network for face recognition, if we consider computational efficiency, which of the following architectural modifications might be most effective and why?",
      options: [
        "Adding more layers to improve accuracy regardless of computational cost",
        "Using convolutional layers that share weights to reduce parameters while maintaining spatial information",
        "Randomly removing connections between neurons during each forward pass",
        "Converting all images to grayscale to reduce input size"
      ],
      correctAnswer: 1,
      points: 3
    },
    {
      id: 185,
      quizId: 8,
      text: "How does the concept of hierarchical feature learning in neural networks for face recognition relate to how neuroscientists believe the human visual cortex processes images?",
      options: [
        "They are completely different processes with no similarities",
        "Both systems process entire images holistically from the start",
        "Both systems tend to recognize familiar people faster than strangers",
        "Both systems process visual information in a hierarchical manner, starting with simple features and building to complex representations"
      ],
      correctAnswer: 3,
      points: 3
    }
  ]
};

const Quiz = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const { answers, setAnswer, setScore, completeQuiz, resetQuiz } = useQuizStore();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [maxPossibleScore, setMaxPossibleScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const questions = useMemo(() => mockQuestions[sectionId || ''] || [], [sectionId]);
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;
  const chapter = Number(sectionId?.split('-')[0]);
  const userId = 1; // TODO: Replace with actual user ID from auth system

  useEffect(() => {
    if (!questions.length) {
      navigate('/');
      return;
    }

    const loadProgress = async () => {
      try {
        const progress = await progressService.getProgress(userId, chapter);
        // Restore answers
        Object.entries(progress.answers).forEach(([questionId, answerIndex]) => {
          setAnswer(Number(questionId), answerIndex);
        });
        // Restore score if completed
        if (progress.completed) {
          setFinalScore(progress.score);
          setMaxPossibleScore(100); // Assuming score is stored as percentage
          setIsSubmitted(true);
        }
      } catch (err: any) {
        // If no progress found, that's okay - start fresh
        if (err.response?.status !== 404) {
          setError('Failed to load progress');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [questions, navigate, chapter, userId, setAnswer]);

  // Auto-save progress when answers change
  useEffect(() => {
    const saveProgress = async () => {
      if (loading || !answeredQuestions) return;
      
      try {
        await progressService.saveProgress(
          userId,
          chapter,
          answers,
          (finalScore / maxPossibleScore) * 100,
          isSubmitted
        );
        setSaveSuccess(true);
      } catch (err) {
        setError('Failed to save progress');
      }
    };

    const debounceTimer = setTimeout(saveProgress, 1000);
    return () => clearTimeout(debounceTimer);
  }, [answers, loading, answeredQuestions, finalScore, maxPossibleScore, isSubmitted, chapter, userId]);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswer(questionId, answerIndex);
  };

  const handleSubmit = async () => {
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
    const percentageScore = (score / maxScore) * 100;
    setScore(chapter, percentageScore);
    completeQuiz();
    
    // Show score and mark as submitted
    setFinalScore(score);
    setMaxPossibleScore(maxScore);
    setIsSubmitted(true);

    // Save final progress
    try {
      await progressService.saveProgress(
        userId,
        chapter,
        answers,
        percentageScore,
        true
      );
      setSaveSuccess(true);
    } catch (err) {
      setError('Failed to save final progress');
    }
  };

  if (!questions.length || loading) {
    return null;
  }

  const percentage = Math.round((finalScore / maxPossibleScore) * 100);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {sectionId?.split('-')[1] === '1' ? 'Machine Learning' :
           sectionId?.split('-')[1] === '2' ? 'What is data?' :
           sectionId?.split('-')[1] === '3' ? 'The terminology of AI' :
           sectionId?.split('-')[1] === '4' ? 'What Machine Learning Can and Cannot Do' :
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

        {isSubmitted && (
          <Paper sx={{ p: 3, mt: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="div" gutterBottom>
              {percentage}%
            </Typography>
            <Typography variant="body1" color="text.secondary">
              You scored {finalScore} out of {maxPossibleScore} points
            </Typography>
          </Paper>
        )}

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

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={saveSuccess}
        autoHideDuration={3000}
        onClose={() => setSaveSuccess(false)}
      >
        <Alert severity="success" onClose={() => setSaveSuccess(false)}>
          Progress saved
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Quiz; 