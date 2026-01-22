import { useState } from 'react'
import './ChatInput.css'

function ChatInput({ onSendMessage, isLoading }) {
    const [query, setQuery] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.trim() && !isLoading) {
            onSendMessage(query)
            setQuery('')
        }
    }

    const handleKeyDown = (e) => {
        // Submit on Ctrl+Enter or Cmd+Enter
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            handleSubmit(e)
        }
    }

    return (
        <div className="chat-input">
            <form onSubmit={handleSubmit} className="input-wrapper">
                <textarea
                    className="text-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about Ramayana..."
                    disabled={isLoading}
                    rows={3}
                />
                <button
                    type="submit"
                    className={`submit-btn ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading || !query.trim()}
                >
                    {isLoading ? (
                        <>
                            <span className="spinner"></span>
                            Generating...
                        </>
                    ) : (
                        'Generate Response'
                    )}
                </button>
            </form>
        </div>
    )
}

export default ChatInput
