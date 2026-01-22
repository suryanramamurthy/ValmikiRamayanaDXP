import { useState } from 'react'
import './App.css'
import LeftPanel from './components/LeftPanel/LeftPanel'
import RightPanel from './components/RightPanel/RightPanel'

function App() {
    const [selectedSargam, setSelectedSargam] = useState(null)
    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isPanelOpen, setIsPanelOpen] = useState(true)

    const handleSargamSelect = (sargamNumber) => {
        setSelectedSargam(sargamNumber)
    }

    const handleSendMessage = async (query) => {
        if (!query.trim()) return

        // Add user message to history
        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: query,
            timestamp: new Date().toLocaleTimeString()
        }
        setMessages(prev => [...prev, userMessage])
        setIsLoading(true)

        try {
            // Make API call to automation endpoint
            const response = await fetch(
                `https://app.contentstack.com/automations-api/run/29f70e7053254b5f96685255a94737c9?query=${encodeURIComponent(query)}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            const data = await response.json()

            // Add assistant response to history
            const assistantMessage = {
                id: Date.now() + 1,
                type: 'assistant',
                content: data.response || data.message || JSON.stringify(data),
                timestamp: new Date().toLocaleTimeString()
            }
            setMessages(prev => [...prev, assistantMessage])
        } catch (error) {
            // Handle error
            const errorMessage = {
                id: Date.now() + 1,
                type: 'assistant',
                content: 'Sorry, I encountered an error while processing your query. Please try again.',
                timestamp: new Date().toLocaleTimeString(),
                isError: true
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    const togglePanel = () => {
        setIsPanelOpen(prev => !prev)
    }

    return (
        <div className="app-container">
            <LeftPanel
                selectedSargam={selectedSargam}
                onSargamSelect={handleSargamSelect}
            />

            <main className={`main-content ${isPanelOpen ? 'panel-open' : 'panel-collapsed'}`}>
                {selectedSargam ? (
                    <div className="sargam-content">
                        <h2>Sargam {selectedSargam}</h2>
                        <p>Content for Sargam {selectedSargam} will be displayed here.</p>
                    </div>
                ) : (
                    <div className="placeholder-content">
                        <h2>Welcome to Valmiki Ramayana</h2>
                        <p>Select a Sargam from the left panel to begin exploring</p>
                    </div>
                )}
            </main>

            <RightPanel
                isOpen={isPanelOpen}
                onToggle={togglePanel}
                messages={messages}
                isLoading={isLoading}
                onSendMessage={handleSendMessage}
            />
        </div>
    )
}

export default App
