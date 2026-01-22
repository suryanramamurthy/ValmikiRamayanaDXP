import contentstack from '@contentstack/delivery-sdk'
import { contentstackConfig } from '../config/contentstack.config.js'

// Initialize Contentstack SDK
const stack = contentstack.stack({
    apiKey: contentstackConfig.apiKey,
    deliveryToken: contentstackConfig.deliveryToken,
    environment: contentstackConfig.environment,
})

export default stack
