import { useState, useEffect, useRef } from "react";
import { useChatModel } from "./useChatModel";
import Markdown from "react-markdown";
import "./Chat.css";

/**
 * Chat component that provides the UI for interacting with the AI chat bot.
 * Manages user input, displays messages, and handles sending messages to the AI model.
 */
export default function Chat() {
    const [input, setInput] = useState("");
    const { messages, isLoading, error, sendMessage, clearMessages } = useChatModel();
    const latestAssistantRef = useRef(null);

    // Scroll to the top of the latest assistant message when response is received
    useEffect(() => {
        latestAssistantRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [messages.length]);

    // Handle sending a message when the user presses Enter (without Shift) or clicks the Send button
    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        const text = input;
        setInput("");
        await sendMessage(text);
    };

    // Handle key press events, distinguishing between Enter to send and Shift+Enter to allow multi-line input
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-container">
            <header className="chat-header">
                <span className="chat-title">Assistant</span>
                {messages.length > 0 && (
                <button className="chat-clear" onClick={clearMessages} aria-label="Clear chat">
                    Clear
                </button>
                )}
            </header>

            <div className="chat-messages">
                {messages.length === 0 && !isLoading && (
                    <p className="chat-empty">Send a message to get started.</p>
                )}

                {messages.map((msg, i) => (
                    <div
                        key={i}
                        ref={msg.role === "assistant" && i === messages.length - 1 ? latestAssistantRef : null}
                        className={`chat-bubble chat-bubble--${msg.role}`}
                        aria-label={msg.role === "user" ? "You" : "Assistant"}
                    >
                        <span className="chat-bubble-label">
                            {msg.role === "user" ? "You" : "Assistant"}
                        </span>
                        <div className="chat-bubble-text">
                            <Markdown>{msg.content}</Markdown>
                        </div>
                    </div>
                ))}

                {isLoading && (
                <div className="chat-bubble chat-bubble--assistant chat-bubble--loading">
                    <span className="chat-bubble-label">Assistant</span>
                    <span className="chat-typing">
                    <span /><span /><span />
                    </span>
                </div>
                )}

                {error && <p className="chat-error">{error}</p>}

                <div ref={latestAssistantRef} />
            </div>

            <div className="chat-input-row">
                <textarea
                    className="chat-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message…"
                    rows={1}
                    disabled={isLoading}
                    aria-label="Message input"
                />
                <button
                    className="chat-send"
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    aria-label="Send message"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
