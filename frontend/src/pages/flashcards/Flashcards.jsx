import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getQuestions, reset } from '../../features/questions/questionSlice'
import './Flashcards.css'

const Flashcards = () => {
  // const [deckSize, setDeckSize] = useState(8)
  const [deck, setDeck] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [chosenAnswer, setChosenAnswer] = useState(null)
  const [score, setScore] = useState([])
  const [testDone, setTestDone] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { questions, isLoading, isError, message } = useSelector(
    (state) => state.questions
  );
  const optionCount = 5

  const shuffle = (ary) => {
    for (let index = 0; index < ary.length; ++index) {
      const roll = Math.floor(Math.random() * ary.length)
      const temp = ary[index]
      ary[index] = ary[roll]
      ary[roll] = temp
    }
  }

  const generateDeck = () => {
    /*
      TODO:
        input field for question count
        drop menu for subject
        generate quiz button
    */
    const draftDeck = []
    for (const question of questions) {
      const candidates = questions.filter(
        (q) => q.type === question.type && q.answer !== question.answer
      );
      const wrongAnswers = candidates
        .slice(0, optionCount - 1)
        .map((w) => ({ answer: w.answer, correct: false }));
      const options = [
        { answer: question.answer, correct: true },
        ...wrongAnswers
      ]
      shuffle(options)
      const entry = {
        question: question.question,
        options,
        message: question.message,
        id: question._id,
      }
      draftDeck.push(entry)
    }
    shuffle(draftDeck)
    setDeck(draftDeck)

    console.log('draftDeck',draftDeck)

    setQuestionIndex(0)
  }

  useEffect(() => {
    if (!user || !user.admin) {
      navigate('/login')
    }
    dispatch(getQuestions())
    return () => { dispatch(reset()) }
  }, [])
  
  useEffect(() => {
    if (questions && questions.length > 0) {
      generateDeck()
    }
  }, [questions])

  const onAnswer = (opt) => {
    if (showAnswer) { return; }
    const scoreEntry = {
      questionId: deck[questionIndex].id,
      correct: opt.correct,
    }
    setScore(previous => [...previous, scoreEntry])
    setChosenAnswer(opt)
    setShowAnswer(true)
  }

  const onContinue = () => {
    setChosenAnswer(null)
    setShowAnswer(false)
    if (questionIndex === deck.length - 1) {
      console.log('the end')
      setTestDone(true)
    } else {
      setQuestionIndex((previous) => previous + 1)
    }
  }

  const buttonColor = (opt) => {
    return showAnswer
      ? opt.correct 
        ? 'green'
        : chosenAnswer.answer === opt.answer
          ? 'red'
          : 'gray'
      : 'black'
  }

  const renderQuiz = () => (
    <section className="current-question">
      <div className="question">{deck[questionIndex].question}</div>
      <div className="answers-container">
        {deck[questionIndex].options.map((opt) => (
          <button
            key={opt.answer}
            className="answer"
            onClick={() => onAnswer(opt)}
            style={{ color: buttonColor(opt) }}
          >
            {opt.answer}
          </button>
        ))}
      </div>
      {showAnswer && (
        <>
          <div className="message">
            {deck[questionIndex].message}
          </div>
          <button className="btn continue" onClick={onContinue}>continue</button>
        </>
      )}
    </section>

  )

  const renderDone = () => {
    /**
     * TODO
     * save score to database
     * { userid, questionid, right, wrong }
     * new quiz button
     */
    
    const correctCount = score.filter(s => s.correct).length
    const percentage = Math.floor((correctCount / score.length) * 100)
    return (
      <>
        <div>done</div>
        <div>your score: {percentage}%</div>
      </>
    )
  }

  return (
    <>
      <section className="heading">flashcards</section>
      { testDone ? (
        renderDone()
      ) : (
        deck && deck.length > 0 && renderQuiz()
      ) }
    </>
  );
}

export default Flashcards
