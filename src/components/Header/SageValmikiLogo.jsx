import sageValmikiImage from './sage-valmiki-logo.png'

function SageValmikiLogo({ size = 60 }) {
    return (
        <img
            src={sageValmikiImage}
            alt="Sage Valmiki"
            width={size}
            height={size}
            className="sage-logo"
            style={{
                objectFit: 'contain',
                borderRadius: '50%',
            }}
        />
    )
}

export default SageValmikiLogo
