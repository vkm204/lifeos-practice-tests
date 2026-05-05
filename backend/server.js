// server.js - LifeOS Practice Testing Backend
// Handles Google OAuth and Sheets API access

const express = require('express')
const cors = require('cors')
const { google } = require('googleapis')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Google OAuth Setup
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
)

// Store tokens in memory (use database in production)
const userTokens = {}

// Generate auth URL
app.get('/auth/google/url', (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
  ]

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  })

  res.json({ authUrl: url })
})

// Handle OAuth callback
app.post('/auth/google/callback', async (req, res) => {
  const { code, kidId } = req.body

  try {
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)
    
    // Store token for this kid
    userTokens[kidId] = tokens
    
    res.json({ 
      success: true, 
      message: 'Authentication successful',
      kidId: kidId
    })
  } catch (error) {
    console.error('Error during authentication:', error)
    res.status(400).json({ success: false, error: error.message })
  }
})

// Get questions from HUB sheet (MOCK DATA FOR TESTING)
app.get('/api/questions/:subject', async (req, res) => {
  const { subject } = req.params

  // Mock questions for testing
  const mockQuestions = [
    {
      id: '1',
      subject: 'ALG2',
      cluster: 'C1',
      difficulty: 'medium',
      question: 'Solve for x: 2^x = 16',
      optionA: '2',
      optionB: '4',
      optionC: '8',
      optionD: '16',
      correctAnswer: '1',
      hint: 'What power of 2 equals 16?',
      topic: 'Exponential Equations',
      concept: 'Solving exponential equations'
    },
    {
      id: '2',
      subject: 'ALG2',
      cluster: 'C2',
      difficulty: 'hard',
      question: 'Evaluate: log₂(32)',
      optionA: '4',
      optionB: '5',
      optionC: '6',
      optionD: '10',
      correctAnswer: '1',
      hint: '2 to what power equals 32?',
      topic: 'Logarithms',
      concept: 'Evaluating logarithms'
    },
    {
      id: '3',
      subject: 'ALG2',
      cluster: 'C1',
      difficulty: 'easy',
      question: 'Simplify: 3^x · 3^2 = 3^5. Solve for x.',
      optionA: '1',
      optionB: '2',
      optionC: '3',
      optionD: '5',
      correctAnswer: '1',
      hint: 'When multiplying same base, add exponents',
      topic: 'Exponent Rules',
      concept: 'Product rule for exponents'
    }
  ]

  const filtered = mockQuestions.filter(q => q.subject === subject)
  res.json(filtered)
})
// Save score to kid's sheet
app.post('/api/saveScore', async (req, res) => {
  const { kidId, subject, score, correct, total } = req.body

  try {
    if (!userTokens[kidId]) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    oauth2Client.setCredentials(userTokens[kidId])
    
    const sheets = google.sheets({ version: 'v4', auth: oauth2Client })
    
    // Get kid's sheet ID from Drive
    const drive = google.drive({ version: 'v3', auth: oauth2Client })
    
    // Find kid's sheet
    const fileList = await drive.files.list({
      q: `name='LifeOS_PracticeTests_${kidId}.xlsx' and trashed=false`,
      spaces: 'drive',
      fields: 'files(id, name)',
      pageSize: 1
    })

    if (fileList.data.files.length === 0) {
      return res.status(404).json({ error: `Sheet not found for ${kidId}` })
    }

    const sheetId = fileList.data.files[0].id
    
    // Append score to ScoreTracker sheet
    const timestamp = new Date().toISOString()
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'ScoreTracker!A:E',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[timestamp, subject, score, correct, total]]
      }
    })

    res.json({ success: true, message: 'Score saved' })
  } catch (error) {
    console.error('Error saving score:', error)
    res.status(500).json({ error: error.message })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'LifeOS Practice Testing Backend' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
