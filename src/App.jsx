import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import LeftPanel from './components/LeftPanel/LeftPanel'
import RightPanel from './components/RightPanel/RightPanel'
import { getAllSargams, getSargamByUid } from './services/sargamService'

function App() {
    const [sargams, setSargams] = useState([])
    const [selectedSargam, setSelectedSargam] = useState(null)
    const [selectedSargamContent, setSelectedSargamContent] = useState(null)
    const [sargamCache, setSargamCache] = useState({}) // Session cache for sargam content
    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isPanelOpen, setIsPanelOpen] = useState(false) // Right panel closed by default
    const [sargamsLoading, setSargamsLoading] = useState(true)
    const [sargamsError, setSargamsError] = useState(null)

    // Fetch all sargams on component mount
    useEffect(() => {
        const fetchSargams = async () => {
            try {
                setSargamsLoading(true)
                const entries = await getAllSargams()
                setSargams(entries)
                setSargamsError(null)
            } catch (error) {
                console.error('Failed to fetch sargams:', error)
                setSargamsError('Failed to load sargams. Please try again later.')
            } finally {
                setSargamsLoading(false)
            }
        }

        fetchSargams()
    }, [])

    const handleSargamSelect = async (sargamUid) => {
        try {
            setSelectedSargam(sargamUid)

            // Check cache first
            if (sargamCache[sargamUid]) {
                console.log('[CACHE] Using cached content for:', sargamUid)
                setSelectedSargamContent(sargamCache[sargamUid])
                return
            }

            // Fetch if not in cache
            setSelectedSargamContent(null)
            const sargamEntry = await getSargamByUid(sargamUid)

            // Store in cache
            setSargamCache(prev => ({ ...prev, [sargamUid]: sargamEntry }))
            setSelectedSargamContent(sargamEntry)
        } catch (error) {
            console.error('Failed to fetch sargam content:', error)
            setSelectedSargamContent({ error: true })
        }
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

            // Get raw text first since API returns malformed JSON (JSON followed by raw text)
            const rawText = await response.text()

            // Extract only the JSON portion (ends at first closing brace)
            const jsonEndIndex = rawText.indexOf('}') + 1
            const jsonPortion = rawText.substring(0, jsonEndIndex)
            const data = JSON.parse(jsonPortion)

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
        <div className="app-wrapper">
            <Header />

            <div className="app-container">
                <LeftPanel
                    selectedSargam={selectedSargam}
                    onSargamSelect={handleSargamSelect}
                    sargams={sargams}
                    isLoading={sargamsLoading}
                    error={sargamsError}
                />

                <main className={`main-content ${isPanelOpen ? 'panel-open' : 'panel-collapsed'}`}>
                    {selectedSargam ? (
                        <div className="sargam-content">
                            {selectedSargamContent ? (
                                selectedSargamContent.error ? (
                                    <div className="error-message">
                                        <h2>Error</h2>
                                        <p>Failed to load sargam content. Please try again.</p>
                                    </div>
                                ) : (
                                    <>
                                        <h2>{selectedSargamContent.title || 'Sargam'}</h2>
                                        {selectedSargamContent.sargam_slokas && selectedSargamContent.sargam_slokas.length > 0 ? (
                                            <div className="slokam-list">
                                                {selectedSargamContent.sargam_slokas.map((sloka, index) => (
                                                    <div key={index} className="slokam-item">
                                                        <p className="slokam-text">{sloka}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p>No slokams available for this sargam.</p>
                                        )}
                                    </>
                                )
                            ) : (
                                <div className="loading-content">
                                    <p>Loading sargam content...</p>
                                </div>
                            )}
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
        </div>
    )
}

export default App
