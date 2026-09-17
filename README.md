# mimik Assessment - AI Chatbot

A simple React chatbot that connects to a local AI model running on mimOE Studio.

### Overview
This project was built as part of mimik's technical assesment. It uses LangChain to interface with the AI models served through a mimOE Studio endpoint, and displays the conversation in a simple React UI.

**Key features**:
- Real-time streaming responses
- Markdown formatting for responses
- Persistent conversation history within a session

### Tech Stack
- **React + Vite** - frontend framework and build tool
- **LangChain** (`@langchain/openai`) - model integration via OpenAI-compatible API
- **mimOE Studio** - local AI runtime serving the model of your choice

### Project Structure
```
src/
    components/
        Chat.jsx        # Chat UI
        Chat.css        # Chat styling
        useChatModel.js # Highlight of this assessment - model integration and message processing
```

### Demo
Watch a short demo here: https://drive.google.com/file/d/1v-N5b597ntqUD8DgPUq1-5PmVxia4-g2/view?usp=sharing

### Try it Yourself

**Prerequisites**
- Make sure you have Node.js v18+
- Run mimOE Studio locally with a model loaded

**Installation**
```
git clone https://github.com/jysophia/mimik_assessment.git
cd mimik_assessment
npm install
npm run setup
npm run dev
```

`npm run setup` will prompt you for your mimOE endpoint, API key, and model, and then create the `.env` file automatically. Once done and you've run `npm run dev`, open your browser at the localhost environment shown in the terminal.
