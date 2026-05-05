// src/config.js
// API configuration for development and production

const isDevelopment = process.env.NODE_ENV === 'development'

export const API_URL = isDevelopment 
  ? 'http://localhost:5000'
  : 'https://your-backend-on-railway.app' // Update after deploying to Railway

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your_client_id'

export const SHEETS_CONFIG = {
  HUB_SHEET_ID: '1KAseBpCF_qQQ0gnyYAckhT5SEVUNZHf0bgwJTLB23B4',
  SCOPES: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
  ]
}
