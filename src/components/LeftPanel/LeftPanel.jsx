import './LeftPanel.css'

function LeftPanel({ selectedSargam, onSargamSelect }) {
    const sargams = Array.from({ length: 10 }, (_, i) => i + 1)

    return (
        <aside className="left-panel glass-panel">
            <header className="left-panel-header">
                <h1>Balakandam</h1>
            </header>

            <nav>
                <ul className="nav-list">
                    {sargams.map((sargamNumber) => (
                        <li key={sargamNumber} className="nav-item">
                            <a
                                className={`nav-link ${selectedSargam === sargamNumber ? 'active' : ''}`}
                                onClick={() => onSargamSelect(sargamNumber)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        onSargamSelect(sargamNumber)
                                    }
                                }}
                            >
                                Sargam {sargamNumber}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <footer className="left-panel-footer">
                <span>श्री राम जय राम</span>
            </footer>
        </aside>
    )
}

export default LeftPanel
