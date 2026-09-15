# mimik Assessment - AI Chatbot

A simple React chatbot that connects to a local AI model running on mimOE Studio.

### Overview
This project was built as part of mimik's technical assesment. It uses LangChain to interface with the qwen3-1.7b model served through a mimOE Studio endpoint, and displays the conversation in a clean React UI.

**Key features**:
- Real-time streaming responses
- Markdown formatting for responses
- Persistent conversation history within a session

### Tech Stack
- **React + Vite** - frontend framework and build tool
- **LangChain** (`@langchain/openai`) - model integration via OpenAI-compatible API
- **Express** - lightweight local server
- **mimOE Studio** - local AI runtime serving the qwen3-1.7b model

### Project Structure
```
src/
    components/
        Chat.jsx        # Chat UI
        Chat.css        # Chat styling
        useChatModel.js # Highlight of this assessment - model integration and message processing
```

### Getting Started

**Prerequisites**
- Make sure you have Node.js v18+
- Run mimOE Studio locally with the qwen3-1.7b model loaded

**Installation**
```
git clone <repo-url>
cd mimik-assessment
npm install
npm run setup
npm run dev
```

`npm run setup` will prompt you for your mimOE endpoint and API key, and create the `.env` file automatically. Once done and you've run `npm run dev`, open your browser at the localhost environment shown in the terminal.
