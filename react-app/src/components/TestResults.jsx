import { useState } from 'react'
import StudyResources from './StudyResources'
import './TestResults.css'

function TestResults({ test, masteryData, onRetake, onDashboard }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showResources, setShowResources] = useState(false)

  const score = Math.round((test.correctCount / test.questions.length) * 100)
  const passed = score >= 60

  const getQuestionFeedback = (question) => {
    const studentAnswer = test.answers[question.id]
    const isCorrect = studentAnswer === question.correctAnswer
    
    return {
      isCorrect,
      studentAnswer: studentAnswer ? question.options[parseInt(studentAnswer)] : '(Not answered)',
      correctAnswer: question.options[parseInt(question.correctAnswer)],
      letter: String.fromCharCode(65 + parseInt(question.correctAnswer))
    }
  }

  return (
    <div className="test-results">
      <div className="results-header">
        <h2>Test Complete! 🎉</h2>
        <p>{test.subject}</p>
      </div>

      {/* SCORE CARD */}
      <div className={`score-card ${passed ? 'passed' : 'needs-improvement'}`}>
        <div className="score-display">
          <div className="score-circle">
            <span className="score-number">{score}%</span>
            <span className="score-label">{passed ? 'Passed' : 'Needs Work'}</span>
          </div>
          <div className="score-details">
            <p><strong>{test.correctCount} of {test.questions.length}</strong> correct</p>
            <p>Current mastery: <strong>{masteryData.overallMastery}%</strong></p>
            <p>Goal: <strong>100%</strong></p>
          </div>
        </div>
      </div>

      {/* QUESTIONS REVIEW */}
      <div className="results-questions">
        <h3>Review Your Answers</h3>
        <div className="questions-list">
          {test.questions.map((question, idx) => {
            const feedback = getQuestionFeedback(question)
            return (
              <div key={question.id} className={`result-item ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="result-header">
                  <span className="result-number">Q{idx + 1}</span>
                  <span className="result-icon">{feedback.isCorrect ? '✅' : '❌'}</span>
                </div>
                <p className="result-question">{question.question}</p>
                <div className="result-answers">
                  <div className="your-answer">
                    <span className="label">Your answer:</span>
                    <span className={`answer ${feedback.isCorrect ? 'correct' : 'wrong'}`}>
                      {feedback.studentAnswer}
                    </span>
                  </div>
                  {!feedback.isCorrect && (
                    <div className="correct-answer">
                      <span className="label">Correct answer:</span>
                      <span className="answer correct">{feedback.letter}. {feedback.correctAnswer}</span>
                    </div>
                  )}
                </div>
                {!feedback.isCorrect && (
                  <button 
                    className="btn-learn"
                    onClick={() => {
                      setSelectedQuestion(question)
                      setShowResources(true)
                    }}
                  >
                    📚 Learn This Concept
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="results-actions">
        {passed && (
          <button className="btn-retake" onClick={() => onRetake(test.subject)}>
            🔄 Retake with Different Questions
          </button>
        )}
        <button className="btn-dashboard" onClick={onDashboard}>
          📊 Back to Dashboard
        </button>
      </div>

      {/* STUDY RESOURCES MODAL */}
      {showResources && selectedQuestion && (
        <StudyResources 
          question={selectedQuestion}
          onClose={() => setShowResources(false)}
        />
      )}
    </div>
  )
}

export default TestResults
