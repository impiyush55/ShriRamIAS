import { useState } from 'react';
import '../../styles/chat-widget.css';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello! How can I help you today?', sender: 'system' }
    ]);
    const [inputValue, setInputValue] = useState('');

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Add user message
        const userMsg = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages([...messages, userMsg]);
        setInputValue('');

        // Simulate auto-response
        setTimeout(() => {
            const systemMsg = {
                id: Date.now() + 1,
                text: 'Thanks for your message. Detailed analytics support is coming soon!',
                sender: 'system'
            };
            setMessages(prev => [...prev, systemMsg]);
        }, 1000);
    };

    return (
        <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
            <button className="chat-toggle-btn" onClick={toggleChat}>
                <i className={isOpen ? 'ri-close-line' : 'ri-message-3-line'}></i>
            </button>

            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <h3>Admin Support</h3>
                        <p>Ask about reports & analytics</p>
                    </div>
                    <div className="chat-body">
                        {messages.map(msg => (
                            <div key={msg.id} className={`chat-message ${msg.sender}`}>
                                <div className="message-content">{msg.text}</div>
                            </div>
                        ))}
                    </div>
                    <form className="chat-footer" onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button type="submit"><i className="ri-send-plane-fill"></i></button>
                    </form>
                </div>
            )}
        </div>
    );
}
