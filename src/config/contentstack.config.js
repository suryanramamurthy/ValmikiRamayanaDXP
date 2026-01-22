// Helper function to get environment variable with validation
const getEnvVar = (key, fallback = null) => {
    const value = import.meta.env[key]

    if (!value && !fallback) {
        console.error(`❌ Missing required environment variable: ${key}`)
        console.warn('📋 Please check:')
        console.warn('  1. .env file exists in project root')
        console.warn('  2. Variable is prefixed with VITE_')
        console.warn('  3. Dev server was restarted after adding .env')
    }

    return value || fallback
}

// Contentstack configuration
export const contentstackConfig = {
    apiKey: getEnvVar('VITE_CONTENTSTACK_API_KEY'),
    deliveryToken: getEnvVar('VITE_CONTENTSTACK_DELIVERY_TOKEN'),
    environment: getEnvVar('VITE_CONTENTSTACK_ENVIRONMENT'),
}

// Log loaded config (without sensitive values) for debugging
console.log('[CONFIG] Contentstack initialized:', {
    apiKey: contentstackConfig.apiKey ? '✓ Loaded' : '✗ Missing',
    deliveryToken: contentstackConfig.deliveryToken ? '✓ Loaded' : '✗ Missing',
    environment: contentstackConfig.environment || '✗ Missing',
})

// Content type UIDs
export const CONTENT_TYPES = {
    SARGAM: 'sargam_layout', // Content type UID for Sargam Layout
}
