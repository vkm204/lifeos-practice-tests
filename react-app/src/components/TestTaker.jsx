import { useState } from 'react'
import './TestTaker.css'

function TestTaker({ test, kid, settings, onSubmitAnswer, onCelebration, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [showHint, setShowHint] = useState(false)
  const [streak, setStreak] = useState(0)

  const currentQuestion = test.questions[currentIndex]
  const isAnswered = test.answers[currentQuestion.id] !== undefined
  const isCorrect = isAnswered && test.answers[currentQuestion.id] === currentQuestion.correctAnswer

  const handleSelectAnswer = (optionIndex) => {
    setSelectedAnswer(optionIndex.toString())
  }

  const handleCheckAnswer = () => {
    const isCorrectAnswer = selectedAnswer === currentQuestion.correctAnswer
    
    if (isCorrectAnswer) {
      setFeedback({ type: 'correct', message: 'Correct!' })
      onCelebration(true)
      setStreak(streak + 1)
    } else {
      setFeedback({ type: 'incorrect', message: 'Not quite. Try again or see the hint.' })
      setStreak(0)
    }

    onSubmitAnswer(currentQuestion.id, selectedAnswer)
  }

  const handleRetry = () => {
    setSelectedAnswer('')
    setFeedback(null)
    setShowHint(false)
  }

  const handleNext = () => {
    if (currentIndex < test.questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer('')
      setFeedback(null)
      setShowHint(false)
    } else {
      onFinish()
    }
  }

  const progressPercent = ((currentIndex + 1) / test.questions.length) * 100

  return (
    <div className="test-taker">
      <div className="test-header">
        <div className="test-info">
          <h2>{test.subject} Test</h2>
          <p>Question {currentIndex + 1} of {test.questions.length}</p>
        </div>
        <div className="test-stats">
          <div className="stat">
            <span className="stat-label">Streak</span>
            <span className="stat-value">{streak}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Answered</span>
            <span className="stat-value">{Object.keys(test.answers).length}/{test.questions.length}</span>
          </div>
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
      </div>

      <div className="question-area">
        <div className="question-box">
          <h3>{currentQuestion.question}</h3>
        </div>

        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option ${selectedAnswer === index.toString() ? 'selected' : ''} ${
                feedback && index.toString() === currentQuestion.correctAnswer ? 'correct' : ''
              } ${feedback && selectedAnswer === index.toString() && !isCorrect ? 'incorrect' : ''}`}
              onClick={() => handleSelectAnswer(index)}
              disabled={feedback !== null && settings.enableRetry === false}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}.</span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>

        {!feedback && selectedAnswer && (
          <button className="btn-check" onClick={handleCheckAnswer}>
            Check Answer
          </button>
        )}

        {feedback && (
          <div className={`feedback feedback-${feedback.type}`}>
            <p>{feedback.message}</p>
            
            {feedback.type === 'incorrect' && (
              <>
                {!showHint ? (
                  <button className="btn-hint" onClick={() => setShowHint(true)}>
                    Show Hint
                  </button>
                ) : (
                  <div className="hint-box">
                    <p><strong>Hint:</strong> {currentQuestion.hint}</p>
                  </div>
                )}

                {settings.enableRetry && (
                  <button className="btn-retry" onClick={handleRetry}>
                    Try Again
                  </button>
                )}
              </>
            )}

            {feedback.type === 'correct' && (
              <button className="btn-next" onClick={handleNext}>
                {currentIndex < test.questions.length - 1 ? 'Next Question' : 'Finish Test'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TestTaker
