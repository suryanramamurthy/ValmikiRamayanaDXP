import './RightPanel.css'
import ChatHistory from '../ChatHistory/ChatHistory'
import ChatInput from '../ChatInput/ChatInput'

function RightPanel({ isOpen, onToggle, messages, isLoading, onSendMessage }) {
    return (
        <aside className={`right-panel glass-panel ${!isOpen ? 'collapsed' : ''}`}>
            <header className="right-panel-header">
                <button
                    className="toggle-btn"
                    onClick={onToggle}
                    aria-label={isOpen ? 'Collapse panel' : 'Expand panel'}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 12L6 8L10 4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <div className="header-content">
                    <span className="header-icon">🤖</span>
                    <h2>Ramayana Expert</h2>
                </div>
            </header>

            <div className="panel-content">
                <ChatHistory messages={messages} isLoading={isLoading} />
                <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
            </div>
        </aside>
    )
}

export default RightPanel
