import { useState } from 'react'
import './LoginScreen.css'

function LoginScreen({ onLogin }) {
  const [selectedKid, setSelectedKid] = useState(null)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const kids = [
    { name: 'Vinay', emoji: '👨‍🎓', color: '#2E7D6F' },
    { name: 'Ishaan', emoji: '👨‍🏫', color: '#8B5CF6' }
  ]

  const handleKidSelect = (kidName) => {
    setSelectedKid(kidName)
    setPassword('')
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!selectedKid) {
      setError('Please select a student')
      return
    }

    if (!password) {
      setError('Please enter password')
      return
    }

    const success = onLogin(selectedKid, password)
    
    if (!success) {
      setError('Incorrect password. Try again!')
      setPassword('')
    }
  }

  if (!selectedKid) {
    return (
      <div className="login-screen">
        <div className="login-container">
          <div className="login-header">
            <h1>🚀 LifeOS Practice</h1>
            <p>Personalized Learning Platform</p>
          </div>

          <div className="select-kid-section">
            <h2>Who are you?</h2>
            <div className="kid-options">
              {kids.map(kid => (
                <button
                  key={kid.name}
                  className="kid-option"
                  onClick={() => handleKidSelect(kid.name)}
                  style={{ borderColor: kid.color }}
                >
                  <span className="kid-emoji">{kid.emoji}</span>
                  <span className="kid-name">{kid.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="login-footer">
            <p>Each student has their own secure workspace</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="login-screen">
      <div className="login-container login-active">
        <button 
          className="back-button"
          onClick={() => handleKidSelect(null)}
        >
          ← Back
        </button>

        <div className="login-header">
          <h1>Welcome, {selectedKid}!</h1>
          <p>Enter your password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️‍🗨️' : '👁️'}
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-login">
            Enter Workspace
          </button>
        </form>

        <div className="login-tips">
          <p>💡 <strong>Password tip:</strong> Your password is case-sensitive</p>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
