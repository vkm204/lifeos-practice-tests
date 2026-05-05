import { useState, useEffect } from 'react'
import './App.css'
import TestTaker from './components/TestTaker'
import Dashboard from './components/Dashboard'
import Settings from './components/Settings'

function App() {
  const [kid, setKid] = useState(localStorage.getItem('kidId') || 'Vinay')
  const [view, setView] = useState('dashboard') // dashboard, test, settings
  const [currentTest, setCurrentTest] = useState(null)
  const [questions, setQuestions] = useState([])
  const [settings, setSettings] = useState({
    celebration: 'subtle',
    enableRetry: true,
    difficulty: { easy: 30, medium: 50, hard: 20 }
  })

  // Initialize
  useEffect(() => {
    localStorage.setItem('kidId', kid)
    loadSettings()
  }, [kid])

  const loadSettings = () => {
    const saved = localStorage.getItem('practiceTestSettings')
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }

  const saveSettings = (newSettings) => {
    setSettings(newSettings)
    localStorage.setItem('practiceTestSettings', JSON.stringify(newSettings))
  }

  const loadQuestions = async (subject, numQuestions) => {
    try {
      const response = await fetch(import.meta.env.VITE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'getQuestions',
          subject: subject,
          numQuestions: numQuestions,
          kidId: kid
        })
      })
      
      // Mock response for now
      const mockQuestions = [
        {
          id: '1',
          subject: 'ALG2',
          cluster: 'C1',
          question: 'Solve for x: 2^x = 16',
          type: 'multiple_choice',
          options: ['2', '4', '8', '16'],
          correctAnswer: '1', // index
          hint: 'What power of 2 equals 16? Think: 2^? = 16'
        },
        {
          id: '2',
          subject: 'ALG2',
          cluster: 'C2',
          question: 'Evaluate: log₂(32)',
          type: 'multiple_choice',
          options: ['4', '5', '6', '10'],
          correctAnswer: '1',
          hint: 'Ask yourself: 2 to what power equals 32?'
        },
        {
          id: '3',
          subject: 'ALG2',
          cluster: 'C1',
          question: 'Simplify: 3^x · 3^2 = 3^5. Solve for x.',
          type: 'multiple_choice',
          options: ['1', '2', '3', '5'],
          correctAnswer: '2',
          hint: 'When multiplying powers with same base, add exponents'
        }
      ]
      
      setQuestions(mockQuestions)
      setCurrentTest({
        subject: subject,
        questions: mockQuestions,
        currentQuestionIndex: 0,
        answers: {},
        startTime: new Date()
      })
      setView('test')
    } catch (error) {
      console.error('Error loading questions:', error)
      alert('Could not load questions. Check connection to HUB.')
    }
  }

  const handleStartTest = (subject, numQuestions) => {
    loadQuestions(subject, numQuestions)
  }

  const handleSubmitAnswer = async (questionId, answer) => {
    const updatedTest = { ...currentTest }
    updatedTest.answers[questionId] = answer
    setCurrentTest(updatedTest)

    // Send to Apps Script
    try {
      await fetch(import.meta.env.VITE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'saveAnswer',
          kidId: kid,
          questionId: questionId,
          answer: answer,
          testId: currentTest.testId
        })
      })
    } catch (error) {
      console.error('Error submitting answer:', error)
    }
  }

  const handleFinishTest = async () => {
    const testDuration = new Date() - currentTest.startTime
    const correctCount = Object.entries(currentTest.answers).filter(
      ([qId, answer]) => {
        const question = currentTest.questions.find(q => q.id === qId)
        return question && question.correctAnswer === answer
      }
    ).length

    const score = Math.round((correctCount / currentTest.questions.length) * 100)

    // Save to sheet
    try {
      await fetch(import.meta.env.VITE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'saveScore',
          kidId: kid,
          subject: currentTest.subject,
          score: score,
          correct: correctCount,
          total: currentTest.questions.length,
          duration: testDuration
        })
      })
    } catch (error) {
      console.error('Error saving score:', error)
    }

    alert(`Test complete! Score: ${score}%`)
    setView('dashboard')
    setCurrentTest(null)
  }

  const handleCelebration = (isCorrect) => {
    if (isCorrect && settings.celebration !== 'none') {
      if (settings.celebration === 'subtle') {
        playSound('success-subtle')
      } else if (settings.celebration === 'normal') {
        playSound('success-normal')
      } else if (settings.celebration === 'high') {
        playSound('success-high')
      }
    }
  }

  const playSound = (type) => {
    // Placeholder for audio feedback
    console.log(`Playing ${type} sound`)
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>LifeOS Practice Testing</h1>
        <div className="header-nav">
          <button 
            className={view === 'dashboard' ? 'active' : ''}
            onClick={() => setView('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={view === 'settings' ? 'active' : ''}
            onClick={() => setView('settings')}
          >
            Settings
          </button>
          <div className="kid-selector">
            <label>Kid: </label>
            <select value={kid} onChange={(e) => setKid(e.target.value)}>
              <option value="Vinay">Vinay</option>
              <option value="Ishaan">Ishaan</option>
            </select>
          </div>
        </div>
      </header>

      <main className="app-main">
        {view === 'dashboard' && (
          <Dashboard 
            kid={kid} 
            onStartTest={handleStartTest}
          />
        )}

        {view === 'test' && currentTest && (
          <TestTaker
            test={currentTest}
            kid={kid}
            settings={settings}
            onSubmitAnswer={handleSubmitAnswer}
            onCelebration={handleCelebration}
            onFinish={handleFinishTest}
          />
        )}

        {view === 'settings' && (
          <Settings 
            settings={settings}
            onSave={saveSettings}
          />
        )}
      </main>
    </div>
  )
}

export default App
