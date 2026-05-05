import './Settings.css'

function Settings({ settings, onSave }) {
  const handleCelebrationChange = (level) => {
    onSave({ ...settings, celebration: level })
  }

  const handleRetryChange = (enabled) => {
    onSave({ ...settings, enableRetry: enabled })
  }

  const handleDifficultyChange = (type, value) => {
    const newDifficulty = { ...settings.difficulty, [type]: parseInt(value) }
    onSave({ ...settings, difficulty: newDifficulty })
  }

  return (
    <div className="settings">
      <h2>Settings</h2>

      <div className="settings-section">
        <h3>Celebration Level</h3>
        <p className="section-description">How should the app celebrate your correct answers?</p>
        <div className="setting-options">
          <label className={`option ${settings.celebration === 'none' ? 'selected' : ''}`}>
            <input 
              type="radio" 
              name="celebration" 
              value="none"
              checked={settings.celebration === 'none'}
              onChange={(e) => handleCelebrationChange(e.target.value)}
            />
            <span>None - Just show the result</span>
          </label>

          <label className={`option ${settings.celebration === 'subtle' ? 'selected' : ''}`}>
            <input 
              type="radio" 
              name="celebration" 
              value="subtle"
              checked={settings.celebration === 'subtle'}
              onChange={(e) => handleCelebrationChange(e.target.value)}
            />
            <span>Subtle - Small sound and visual feedback</span>
          </label>

          <label className={`option ${settings.celebration === 'normal' ? 'selected' : ''}`}>
            <input 
              type="radio" 
              name="celebration" 
              value="normal"
              checked={settings.celebration === 'normal'}
              onChange={(e) => handleCelebrationChange(e.target.value)}
            />
            <span>Normal - Clear feedback and encouragement</span>
          </label>

          <label className={`option ${settings.celebration === 'high' ? 'selected' : ''}`}>
            <input 
              type="radio" 
              name="celebration" 
              value="high"
              checked={settings.celebration === 'high'}
              onChange={(e) => handleCelebrationChange(e.target.value)}
            />
            <span>High - Full celebration mode!</span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3>Retry Logic</h3>
        <p className="section-description">Can you try the question again after seeing it's wrong?</p>
        <div className="setting-options">
          <label className={`option ${!settings.enableRetry ? 'selected' : ''}`}>
            <input 
              type="radio" 
              name="retry" 
              value="false"
              checked={!settings.enableRetry}
              onChange={(e) => handleRetryChange(e.target.value === 'true')}
            />
            <span>No - Move on after checking</span>
          </label>

          <label className={`option ${settings.enableRetry ? 'selected' : ''}`}>
            <input 
              type="radio" 
              name="retry" 
              value="true"
              checked={settings.enableRetry}
              onChange={(e) => handleRetryChange(e.target.value === 'true')}
            />
            <span>Yes - I can retry questions I got wrong</span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3>Difficulty Mix (in each test)</h3>
        <p className="section-description">What mix of question difficulty levels do you want?</p>
        
        <div className="difficulty-sliders">
          <div className="slider-group">
            <label>Easy: {settings.difficulty.easy}%</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={settings.difficulty.easy}
              onChange={(e) => handleDifficultyChange('easy', e.target.value)}
              className="slider"
            />
          </div>

          <div className="slider-group">
            <label>Medium: {settings.difficulty.medium}%</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={settings.difficulty.medium}
              onChange={(e) => handleDifficultyChange('medium', e.target.value)}
              className="slider"
            />
          </div>

          <div className="slider-group">
            <label>Hard: {settings.difficulty.hard}%</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={settings.difficulty.hard}
              onChange={(e) => handleDifficultyChange('hard', e.target.value)}
              className="slider"
            />
          </div>

          <p className="difficulty-note">
            Total: {settings.difficulty.easy + settings.difficulty.medium + settings.difficulty.hard}%
            (adjust to 100% for balanced tests)
          </p>
        </div>
      </div>
    </div>
  )
}

export default Settings
