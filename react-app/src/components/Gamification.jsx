import './Gamification.css'

function Gamification({ gameState, kid }) {
  const xpPerLevel = 500
  const currentLevelXP = (gameState.level - 1) * xpPerLevel
  const nextLevelXP = gameState.level * xpPerLevel
  const xpInLevel = gameState.xp - currentLevelXP
  const xpToNextLevel = nextLevelXP - currentLevelXP
  const progressPercent = (xpInLevel / xpToNextLevel) * 100

  const badges = {
    'first-10': { name: 'First 10', icon: '🌱', desc: 'Answered 10 correctly' },
    'mastery-25': { name: 'Mastery', icon: '⭐', desc: 'Answered 25 correctly' },
    'perfect-score': { name: 'Perfect!', icon: '💯', desc: 'Got 100%' },
    'expert': { name: 'Expert', icon: '🏆', desc: 'Scored 90%+' },
    'proficient': { name: 'Proficient', icon: '✨', desc: 'Scored 80%+' },
    'streak-7': { name: '7-Day', icon: '🔥', desc: 'Answered 7 days straight' },
    'streak-30': { name: '30-Day', icon: '🌟', desc: 'Answered 30 days straight' },
  }

  return (
    <div className="gamification">
      <div className="level-section">
        <div className="level-display">
          <span className="level-icon">🎮</span>
          <div className="level-info">
            <span className="level-number">Level {gameState.level}</span>
            <span className="level-title">Scholar</span>
          </div>
        </div>
        
        <div className="xp-progress">
          <div className="xp-bar">
            <div className="xp-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <span className="xp-text">{xpInLevel}/{xpToNextLevel} XP</span>
        </div>

        <div className="streak-display">
          <span className="streak-icon">🔥</span>
          <span className="streak-count">{gameState.streak}</span>
          <span className="streak-label">day streak</span>
        </div>
      </div>

      <div className="badges-section">
        <h4>Badges ({gameState.badges.length})</h4>
        <div className="badges-grid">
          {gameState.badges.length > 0 ? (
            gameState.badges.map(badgeId => {
              const badge = badges[badgeId]
              return (
                <div key={badgeId} className="badge" title={badge.desc}>
                  <span className="badge-icon">{badge.icon}</span>
                  <span className="badge-name">{badge.name}</span>
                </div>
              )
            })
          ) : (
            <p className="no-badges">Earn badges by completing tests!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Gamification
