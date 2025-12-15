import React, { useState, useRef, useEffect } from 'react';
import './styles.css';
import axios from 'axios';
import { Send, MessageCircle, X, Mic, MicOff } from 'lucide-react';

/* 
 * Chatbot Widget
 * Integrates with FastAPI RAG backend.
 * Now supports Voice Input via Web Speech API.
 */

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hi! I'm your Physical AI assistant. Ask me anything about the book!", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Voice Recognition Logic
    const startListening = () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert("Your browser does not support speech recognition.");
            return;
        }

        // @ts-ignore
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInputText(transcript);
        };

        recognition.start();
    };

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const userMsg: Message = { id: Date.now(), text: inputText, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);
        const query = inputText;
        setInputText("");

        try {
            // Retrieve selected text from the window if any
            const selection = window.getSelection()?.toString();

            // Call local backend (which proxies to Grok)
            const response = await axios.post('http://localhost:8000/api/chat', {
                question: query,
                context_text: selection || undefined
            });

            const botMsg: Message = {
                id: Date.now() + 1,
                text: response.data.answer,
                sender: 'bot'
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Sorry, I couldn't reach the robot brain. Make sure to run 'python main.py' in the backend folder!",
                sender: 'bot'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            {!isOpen && (
                <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
                    <MessageCircle size={24} />
                </button>
            )}

            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <span>AI Tutor (Beta)</span>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && <div className="message bot">Thinking...</div>}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chatbot-input-area">
                        <button
                            className={`chatbot-mic ${isListening ? 'listening' : ''}`}
                            onClick={startListening}
                            title="Speak"
                        >
                            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                        </button>
                        <input
                            className="chatbot-input"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={isListening ? "Listening..." : "Ask a question..."}
                        />
                        <button className="chatbot-send" onClick={handleSend}>
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
