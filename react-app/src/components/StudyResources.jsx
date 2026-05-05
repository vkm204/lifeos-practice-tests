import { useState } from 'react'
import './StudyResources.css'

function StudyResources({ question, onClose }) {
  const [tab, setTab] = useState('learn')

  if (!question || !question.resources) {
    return null
  }

  const { khan, topic, concept } = question.resources

  const conceptCards = {
    'Exponential Equations': [
      { 
        title: 'What is an exponential equation?', 
        desc: 'An equation where the variable is in the exponent (power)' 
      },
      { 
        title: 'How to solve 2^x = 16?', 
        desc: 'Find what power of 2 equals 16. Since 2^4 = 16, the answer is x = 4' 
      },
      { 
        title: 'Key insight', 
        desc: 'If the bases are equal, the exponents must be equal: If 2^x = 2^4, then x = 4' 
      },
      { 
        title: 'Common powers of 2', 
        desc: '2^1=2, 2^2=4, 2^3=8, 2^4=16, 2^5=32, 2^6=64, 2^7=128, 2^8=256' 
      }
    ],
    'Logarithms': [
      { 
        title: 'What is a logarithm?', 
        desc: 'A logarithm is the inverse of exponentiation. log₂(32) asks: "2 to what power equals 32?"' 
      },
      { 
        title: 'How to evaluate log₂(32)?', 
        desc: '2^? = 32. Since 2^5 = 32, the answer is log₂(32) = 5' 
      },
      { 
        title: 'The relationship', 
        desc: 'If b^x = y, then log_b(y) = x. They are inverse operations!' 
      },
      { 
        title: 'Common logarithms', 
        desc: 'log₂(2)=1, log₂(4)=2, log₂(8)=3, log₂(16)=4, log₂(32)=5' 
      }
    ],
    'Exponent Rules': [
      { 
        title: 'Product Rule', 
        desc: 'When multiplying same base: a^m · a^n = a^(m+n). Add the exponents!' 
      },
      { 
        title: 'Example of Product Rule', 
        desc: '3^x · 3^2 = 3^(x+2). So if 3^(x+2) = 3^5, then x+2 = 5, so x = 3' 
      },
      { 
        title: 'Quotient Rule', 
        desc: 'When dividing same base: a^m / a^n = a^(m-n). Subtract the exponents!' 
      },
      { 
        title: 'Power Rule', 
        desc: '(a^m)^n = a^(m·n). Multiply the exponents when one power is raised to another power!' 
      }
    ]
  }

  const currentCards = conceptCards[topic] || []

  return (
    <div className="study-resources-overlay">
      <div className="study-resources">
        <div className="resources-header">
          <h3>📚 Study This Concept</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="resources-tabs">
          <button 
            className={`tab ${tab === 'learn' ? 'active' : ''}`}
            onClick={() => setTab('learn')}
          >
            Learn
          </button>
          <button 
            className={`tab ${tab === 'concepts' ? 'active' : ''}`}
            onClick={() => setTab('concepts')}
          >
            Key Ideas
          </button>
        </div>

        {tab === 'learn' && (
          <div className="tab-content">
            <div className="resource-item">
              <h4>📖 {topic}</h4>
              <p className="concept-text">{concept}</p>
              
              <a 
                href={khan} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-learn"
              >
                Watch Video on Khan Academy →
              </a>
              
              <p className="resource-note">
                💡 This video explains the concept step by step. Watch it, then come back to retry this question!
              </p>
            </div>
          </div>
        )}

        {tab === 'concepts' && (
          <div className="tab-content">
            <div className="concept-cards">
              {currentCards.map((card, idx) => (
                <div key={idx} className="concept-card">
                  <h5>{card.title}</h5>
                  <p>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="resources-footer">
          <p>🎯 <strong>Next step:</strong> Close this and retry the question with what you learned!</p>
        </div>
      </div>
    </div>
  )
}

export default StudyResources
