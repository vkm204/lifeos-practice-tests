import { useState } from 'react'
import './Dashboard.css'

function Dashboard({ kid, onStartTest }) {
  const [subject, setSubject] = useState('ALG2')
  const [numQuestions, setNumQuestions] = useState(10)

  const stats = {
    Vinay: {
      recentScore: 78,
      streak: 3,
      testsCompleted: 12,
      clusterMastery: {
        'C1': 85,
        'C2': 72,
        'C3': 68,
        'C4': 90
      }
    },
    Ishaan: {
      recentScore: 82,
      streak: 5,
      testsCompleted: 8,
      clusterMastery: {
        'C1': 90,
        'C2': 88,
        'C3': 75,
        'C4': 92
      }
    }
  }

  const kidStats = stats[kid] || stats.Vinay
  const subjects = ['ALG2', 'SAT_MATH', 'SAT_VERBAL']

  const handleStartTest = () => {
    onStartTest(subject, numQuestions)
  }

  return (
    <div className="dashboard">
      <div className="dashboard-welcome">
        <h2>Welcome, {kid}!</h2>
        <p>Keep up the great work. You're building consistency.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Recent Score</div>
          <div className="stat-value">{kidStats.recentScore}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Current Streak</div>
          <div className="stat-value">{kidStats.streak} days</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Tests Completed</div>
          <div className="stat-value">{kidStats.testsCompleted}</div>
        </div>
      </div>

      <div className="cluster-mastery">
        <h3>Cluster Mastery</h3>
        <div className="mastery-bars">
          {Object.entries(kidStats.clusterMastery).map(([cluster, score]) => (
            <div key={cluster} className="mastery-item">
              <label>{cluster}</label>
              <div className="bar-container">
                <div className="bar-fill" style={{ width: `${score}%` }}>
                  <span className="bar-label">{score}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="new-test-section">
        <h3>Start a New Test</h3>
        
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <select 
            id="subject"
            value={subject} 
            onChange={(e) => setSubject(e.target.value)}
          >
            {subjects.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="numQuestions">Number of Questions</label>
          <input 
            id="numQuestions"
            type="number" 
            min="1" 
            max="20" 
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
          />
        </div>

        <button className="btn-start-test" onClick={handleStartTest}>
          Start Test
        </button>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-date">Today</span>
            <span className="activity-text">Completed ALG2 test - 10 questions</span>
            <span className="activity-score">78%</span>
          </div>
          <div className="activity-item">
            <span className="activity-date">Yesterday</span>
            <span className="activity-text">Completed SAT Math test - 15 questions</span>
            <span className="activity-score">82%</span>
          </div>
          <div className="activity-item">
            <span className="activity-date">2 days ago</span>
            <span className="activity-text">Completed ALG2 test - 8 questions</span>
            <span className="activity-score">75%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
