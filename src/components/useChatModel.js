import { useState } from "react";
import { ChatOpenAI } from "@langchain/openai";

export function useChatModel() {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Initialize the ChatOpenAI model using LangChain framework
    const model = new ChatOpenAI({
        apiKey: import.meta.env.VITE_API_KEY,
        configuration: {
            baseURL: import.meta.env.VITE_API_BASE_URL,
        },
        model: import.meta.env.VITE_AI_MODEL
    });

    const sendMessage = async (userInput) => {
        if (!userInput.trim()) return;

        // Update message history with the user's new message
        const userMessage = { role: "user", content: userInput };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setIsLoading(true);
        setError(null);

        try {
            // Pass the entire conversation history to the model for continuity of context
            const messageHistory = updatedMessages.map((msg) => ({
                role: msg.role,
                content: msg.content,
            }));

            // Use LangChain's streaming API to get the model's response
            const stream = await model.stream(messageHistory);

            // Collect the full response content from the stream
            let fullResponseContent = "";
            for await (const chunk of stream) {
                fullResponseContent += chunk.content;
            }

            // Remove any content within <think>...</think> tags from model's response
            const cleanedContent = fullResponseContent.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

            // Split response on sentence boundaries or new lines to create chunked display
            const chunks = cleanedContent.match(/[^.!?\n]+[.!?\n]*/g) || [ cleanedContent ];

            // Add the cleaned response as a new assistant message in the state
            setMessages((prev) => [...prev, { role: "assistant", content: cleanedContent }]);

            for (const chunk of chunks) {
                // Stream the response in delayed chunks instead of character-by-character for better readability
                const delay = 50 + Math.random() * 100; // 50–150ms per chunk
                await new Promise((resolve) => setTimeout(resolve, delay));

                // Append the chunk to the last assistant message in the state
                setMessages((prev) => {
                    const updated = [...prev];
                    const last = updated[updated.length - 1];
                    updated[updated.length - 1] = { ...last, content: last.content + chunk };
                    return updated;
                });
            }
        } catch (err) {
            console.error("Model error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const clearMessages = () => {
        setMessages([]);
        setError(null);
    };

    return { messages, isLoading, error, sendMessage, clearMessages };
}
