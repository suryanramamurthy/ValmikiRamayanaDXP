import './Header.css'
import SageValmikiLogo from './SageValmikiLogo'

function Header() {
    return (
        <header className="app-header glass-panel">
            <div className="header-brand">
                <SageValmikiLogo size={56} />
                <div className="header-titles">
                    <h1 className="main-title">
                        <span className="sanskrit-title">श्रीमद्वाल्मीकिरामायणम्</span>
                    </h1>
                    <h2 className="english-title">Srimad Valmiki Ramayanam</h2>
                </div>
            </div>

            <div className="header-decoration">
                <span className="decorative-symbol">॥</span>
            </div>
        </header>
    )
}

export default Header
