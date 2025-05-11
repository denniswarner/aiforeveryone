# Project Setup Guide for macOS

This guide will help you set up the development environment and initialize the project repository on macOS.

## 1. Development Environment Setup

### Install Required Tools

#### Install Homebrew (Package Manager)
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Add Homebrew to your PATH (if not already done)
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

#### Install Node.js and npm
```bash
# Install Node.js (includes npm)
brew install node

# Verify installation
node --version  # Should be v14 or higher
npm --version   # Should be v6 or higher
```

#### Install Git
```bash
# Install Git
brew install git

# Configure Git (replace with your information)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify installation
git --version
```

#### Install Visual Studio Code (Recommended)
```bash
# Install VS Code
brew install --cask visual-studio-code

# Install recommended VS Code extensions
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension PKief.material-icon-theme
code --install-extension eamodio.gitlens
code --install-extension usernamehw.errorlens
```

## 2. Project Initialization

### Create Project Directory
```bash
# Create and navigate to project directory
mkdir ai-for-everyone-quiz
cd ai-for-everyone-quiz
```

### Initialize Git Repository
```bash
# Initialize git repository
git init

# Create .gitignore file
cat > .gitignore << EOL
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.idea/
.vscode/
*.swp
*.swo
EOL
```

### Initialize React Project with TypeScript
```bash
# Create React app with TypeScript template
npx create-react-app . --template typescript

# Install additional dependencies
npm install @mui/material @emotion/react @emotion/styled
npm install @types/node @types/react @types/react-dom
npm install react-router-dom @types/react-router-dom
npm install react-hook-form
npm install zustand
```

### Create Project Structure
```bash
# Create necessary directories
mkdir -p src/components/Quiz
mkdir -p src/data
mkdir -p src/types
mkdir -p src/store
mkdir -p src/pages
mkdir -p src/tests

# Create initial files
touch src/types/quiz.types.ts
touch src/data/chapter1.ts
touch src/components/Quiz/Question.tsx
touch src/components/Quiz/ChapterQuiz.tsx
touch src/store/quizStore.ts
```

## 3. GitHub Repository Setup

### Create GitHub Repository
1. Go to [GitHub](https://github.com)
2. Click "New repository"
3. Name it "ai-for-everyone-quiz"
4. Don't initialize with README (we'll push our existing one)
5. Click "Create repository"

### Initialize Local Git Repository
```bash
# Initialize git repository
git init

# Create .gitignore file
cat > .gitignore << EOL
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.idea/
.vscode/
*.swp
*.swo

# macOS
.DS_Store
.AppleDouble
.LSOverride
EOL

# Configure Git (replace with your information)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Rename default branch to main
git branch -M main

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Project setup and structure"

# Add remote repository (replace with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ai-for-everyone-quiz.git

# Push to GitHub
git push -u origin main
```

### Verify GitHub Setup
1. Visit your repository at `https://github.com/YOUR_USERNAME/ai-for-everyone-quiz`
2. Verify that all files are present
3. Check that the README.md is properly formatted

### Common Git Commands for Development
```bash
# Create a new branch for a feature
git checkout -b feature/feature-name

# Switch to an existing branch
git checkout branch-name

# Add changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push changes
git push origin branch-name

# Pull latest changes
git pull origin main

# Update your feature branch with main
git checkout feature/feature-name
git pull origin main
```

### GitHub Best Practices
1. **Branch Naming Convention**
   - Feature branches: `feature/feature-name`
   - Bug fixes: `fix/bug-name`
   - Documentation: `docs/description`
   - Hotfixes: `hotfix/issue-name`

2. **Commit Messages**
   - Use present tense ("Add feature" not "Added feature")
   - Use imperative mood ("Move cursor to..." not "Moves cursor to...")
   - Limit the first line to 72 characters or less
   - Reference issues and pull requests liberally after the first line

3. **Pull Requests**
   - Create pull requests for all changes
   - Use the pull request template if available
   - Request reviews from team members
   - Link related issues

4. **Code Review**
   - Review code for functionality and style
   - Check for test coverage
   - Verify documentation updates
   - Ensure CI/CD passes

## 4. Verify Setup

### Start Development Server
```bash
# Start the development server
npm start
```

Visit `http://localhost:3000` to verify the application is running.

### Run Tests
```bash
# Run the test suite
npm test
```

## 5. Next Steps

1. Review the project structure in `PLANNING.md`
2. Implement the components as outlined in the architecture
3. Add tests for each component
4. Set up CI/CD pipeline (optional)

## 6. Common Issues and Solutions

### Node/npm Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install

# Fix permissions if needed
sudo chown -R $USER:$(id -gn $USER) ~/.npm
sudo chown -R $USER:$(id -gn $USER) ~/.config
```

### Git Issues
```bash
# Reset Git repository
git reset --hard HEAD

# Update Git credentials
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Fix Git credentials if needed
git config --global credential.helper osxkeychain
```

### TypeScript Issues
```bash
# Rebuild TypeScript
npm run build

# Clear TypeScript cache
rm -rf node_modules/.cache/typescript
```

## 7. Development Workflow

1. Create a new branch for each feature
```bash
git checkout -b feature/feature-name
```

2. Make changes and commit
```bash
git add .
git commit -m "Description of changes"
```

3. Push changes
```bash
git push origin feature/feature-name
```

4. Create Pull Request on GitHub

## 8. Environment Variables

Create a `.env` file in the root directory:
```bash
# Create .env file
cat > .env << EOL
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ENV=development
EOL
```

Remember to add `.env` to `.gitignore` if it contains sensitive information.

## 9. VS Code Settings (Recommended)

Create `.vscode/settings.json`:
```bash
mkdir -p .vscode
cat > .vscode/settings.json << EOL
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
EOL
```

## 10. Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Material-UI Documentation](https://mui.com/getting-started/usage/)
- [Git Documentation](https://git-scm.com/doc)
- [Homebrew Documentation](https://docs.brew.sh/)
- [VS Code Documentation](https://code.visualstudio.com/docs) 