// Contentstack configuration
export const contentstackConfig = {
    apiKey: import.meta.env.VITE_CONTENTSTACK_API_KEY,
    deliveryToken: import.meta.env.VITE_CONTENTSTACK_DELIVERY_TOKEN,
    environment: import.meta.env.VITE_CONTENTSTACK_ENVIRONMENT,
}

// Content type UIDs
export const CONTENT_TYPES = {
    SARGAM: 'sargam_layout', // Content type UID for Sargam Layout
}
