# AI for Everyone Quiz Application

An interactive quiz system for Andrew Yang's AI for Everyone course on deeplearning.ai.

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Local Development Setup

1. Clone the repository (after initial GitHub setup)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from create-react-app

## Project Structure

```
src/
├── components/
│   ├── Quiz/        # Quiz-related components
│   ├── Layout/      # Layout components
│   └── Results/     # Results components
├── pages/           # Page components
├── store/           # State management
└── types/           # TypeScript type definitions
```

## Tech Stack

- React with TypeScript
- Material-UI for components
- React Router for navigation
- Zustand for state management
- React Hook Form for form handling
