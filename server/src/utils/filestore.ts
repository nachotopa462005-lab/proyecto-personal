import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, '../data')

// Ensure data directory exists
if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true })
}

export function readJsonFile<T>(filename: string, defaultValue: T): T {
  const filePath = join(DATA_DIR, filename)
  
  try {
    if (!existsSync(filePath)) {
      return defaultValue
    }
    const content = readFileSync(filePath, 'utf-8')
    return JSON.parse(content) as T
  } catch (error) {
    console.error(`Error reading ${filename}:`, error)
    return defaultValue
  }
}

export function writeJsonFile<T>(filename: string, data: T): void {
  const filePath = join(DATA_DIR, filename)
  
  try {
    writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
  } catch (error) {
    console.error(`Error writing ${filename}:`, error)
  }
}
