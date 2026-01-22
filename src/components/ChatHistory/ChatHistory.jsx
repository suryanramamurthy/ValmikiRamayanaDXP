import { useEffect, useRef } from 'react'
import './ChatHistory.css'

function ChatHistory({ messages, isLoading }) {
    const messagesEndRef = useRef(null)

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages, isLoading])

    if (messages.length === 0 && !isLoading) {
        return (
            <div className="chat-history">
                <div className="chat-history-empty">
                    <span className="empty-icon">💬</span>
                    <p>Ask me anything about the Ramayana!<br />I'm here to help you explore this ancient epic.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="chat-history">
            {messages.map((message) => (
                <div key={message.id} className={`message ${message.type}`}>
                    <div className={`message-bubble ${message.isError ? 'error' : ''}`}>
                        {message.content}
                    </div>
                    <span className="message-timestamp">{message.timestamp}</span>
                </div>
            ))}

            {isLoading && (
                <div className="loading-indicator">
                    <div className="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <span className="loading-text">Thinking...</span>
                </div>
            )}

            <div ref={messagesEndRef} />
        </div>
    )
}

export default ChatHistory
