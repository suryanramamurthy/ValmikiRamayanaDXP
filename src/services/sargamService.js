import stack from './contentstackClient.js'
import { CONTENT_TYPES } from '../config/contentstack.config.js'

/**
 * Fetch all Sargam entries from Contentstack
 * @returns {Promise<Array>} Array of sargam entries
 */
export const getAllSargams = async () => {
    try {
        // Use getMultipleEntries to fetch all sargam entries
        const result = await stack
            .contentType(CONTENT_TYPES.SARGAM)
            .entry()
            .limit(100) // Get up to 100 entries
            .find()

        // SDK .find() returns {entries: [...], count: N}
        const entries = result.entries || []

        // Sort by sargam number in ascending order
        const sortedEntries = entries.sort((a, b) => {
            const numA = parseSargamNumber(a.title) || 0
            const numB = parseSargamNumber(b.title) || 0
            return numA - numB
        })

        console.log('[SERVICE] Fetched sargams count:', sortedEntries.length)
        return sortedEntries
    } catch (error) {
        console.error('Error fetching sargams:', error)
        throw new Error('Failed to fetch sargams from Contentstack')
    }
}

/**
 * Fetch a specific Sargam entry by UID
 * @param {string} uid - The entry UID
 * @returns {Promise<Object>} Sargam entry
 */
export const getSargamByUid = async (uid) => {
    try {
        console.log('[SERVICE] Fetching entry:', uid)
        const result = await stack
            .contentType(CONTENT_TYPES.SARGAM)
            .entry(uid)
            .fetch()

        // SDK returns entry directly, not wrapped in result.entry
        return result
    } catch (error) {
        console.error(`Error fetching sargam with UID ${uid}:`, error)
        throw new Error(`Failed to fetch sargam with UID ${uid}`)
    }
}

/**
 * Parse sargam number from entry title
 * Entry titles are in format: "Sargam # <description>"
 * @param {string} title - The entry title
 * @returns {number|null} Sargam number or null if not found
 */
export const parseSargamNumber = (title) => {
    if (!title) return null

    const match = title.match(/Sargam\s+(\d+)/)
    return match ? parseInt(match[1], 10) : null
}
