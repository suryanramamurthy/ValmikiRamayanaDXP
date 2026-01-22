import './LeftPanel.css'
import { parseSargamNumber } from '../../services/sargamService'

function LeftPanel({ selectedSargam, onSargamSelect, sargams = [], isLoading = false, error = null }) {
    return (
        <aside className="left-panel glass-panel">
            <header className="left-panel-header">
                <h1>Balakandam</h1>
            </header>

            <nav>
                {isLoading ? (
                    <div className="loading-state">
                        <p>Loading sargams...</p>
                    </div>
                ) : error ? (
                    <div className="error-state">
                        <p>{error}</p>
                    </div>
                ) : sargams.length === 0 ? (
                    <div className="empty-state">
                        <p>No sargams available</p>
                    </div>
                ) : (
                    <ul className="nav-list">
                        {sargams.map((sargam) => {
                            const sargamNumber = parseSargamNumber(sargam.title)
                            const displayTitle = sargam.title || `Sargam ${sargamNumber}`

                            return (
                                <li key={sargam.uid} className="nav-item">
                                    <a
                                        className={`nav-link ${selectedSargam === sargam.uid ? 'active' : ''}`}
                                        onClick={() => onSargamSelect(sargam.uid)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                onSargamSelect(sargam.uid)
                                            }
                                        }}
                                    >
                                        {displayTitle}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </nav>

            <footer className="left-panel-footer">
                <span>श्री राम जय राम</span>
            </footer>
        </aside>
    )
}

export default LeftPanel
