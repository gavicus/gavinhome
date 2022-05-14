import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import scoreService from '../../features/score/scoreService'
import { getQuestions, reset } from '../../features/questions/questionSlice'
import { createScoreEntries } from '../../utils/quizUtils'
import { SubjectMenu } from '../../components/SubjectMenu'
import './Flashcards.css'

const Flashcards = () => {
  const [questionCount, setQuestionCount] = useState(10)
  const [deck, setDeck] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [chosenAnswer, setChosenAnswer] = useState(null)
  const [score, setScore] = useState([])
  const [dbScores, setDbScores] = useState([])
  const [testDone, setTestDone] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { questions } = useSelector(
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
    if (!selectedSubject || !questionCount) {
      setDeck([])
      return
    }
    const scoreEntries = createScoreEntries(dbScores,questions,user)
    const sortedEntries = scoreEntries
      .filter(e => e.subject === selectedSubject)
      .sort((a,b) => a.right + a.wrong - (b.right + b.wrong))
    const hardCount = Math.floor(questionCount * .75)
    const hardQuestions = sortedEntries.slice(0,hardCount)
    const easyCount = questionCount - hardCount
    const leftOvers = sortedEntries.slice(hardCount)
    shuffle(leftOvers)
    const easyQuestions = leftOvers.slice(-easyCount)
    const quizEntries = [...hardQuestions, ...easyQuestions]

    const draftDeck = []
    for (const question of quizEntries) {
      const candidates = scoreEntries.filter(
        (q) => q.type === question.type && q.answer !== question.answer && q.subject === question.subject
      );
      shuffle(candidates)
      const wrongAnswers = candidates
        .slice(0, optionCount - 1)
        .map((w) => ({ answer: w.answer, correct: false }));
      const options = [
        { answer: question.answer, correct: true },
        ...wrongAnswers
      ]
      shuffle(options)
      const entry = {
        subject: question.subject,
        question: question.question,
        options,
        message: question.message,
        id: question.questionId,
      }
      draftDeck.push(entry)
    }
    shuffle(draftDeck)
    setDeck(draftDeck)
    setQuestionIndex(0)
  }

  const getAllScores = async () => {
    const reply = await scoreService.getAllScores(user.token)
    if (reply) {
      setDbScores(reply)
    }
  }

  useEffect(() => {
    if (!user || !user.admin) {
      navigate('/login')
    }
    dispatch(getQuestions())
    getAllScores()
    return () => { dispatch(reset()) }
  }, [])
  
  const saveScore = async(question, correct) => {
    let stored = dbScores.find(
      (s) => s.question === question.id && s.user === user._id
    )
    if (stored) {
      if (correct) {
        stored.right += 1
      } else {
        stored.wrong += 1
      }
      scoreService.updateScore(stored, user.token)
      setDbScores([
        ...(dbScores.filter(s => s._id !== stored._id)),
        stored
      ])
    } else {
      const data = {}
      if (correct) {
        data["right"] = 1;
      } else {
        data["wrong"] = 1;
      }

      const questionObject = deck.find(q => q.id === question.id)
      data["question"] = question.id
      data['subject'] = question.subject
      data['user'] = user._id
      stored = await scoreService.createScore(data, user.token)
      setDbScores(previous => ([
        ...previous,
        stored
      ]))
    }
  }

  const onAnswer = (opt) => {
    if (showAnswer) { return; }
    const scoreEntry = {
      questionId: deck[questionIndex].id,
      correct: opt.correct,
    }
    setScore(previous => [...previous, scoreEntry])
    saveScore(deck[questionIndex], opt.correct)
    setChosenAnswer(opt)
    setShowAnswer(true)
  }

  const onContinue = () => {
    setChosenAnswer(null)
    setShowAnswer(false)
    if (questionIndex === deck.length - 1) {
      setTestDone(true)
    } else {
      setQuestionIndex((previous) => previous + 1)
    }
  }

  const buttonStyle = (opt) => {
    return showAnswer
      ? opt.correct 
        ? { color: 'green', boxShadow: 'inset 0 0 10px #0c0' }
        : chosenAnswer.answer === opt.answer
          ? { color: 'red', boxShadow: 'inset 0 0 10px #f00' }
          : { color: 'gray' }
      : { color: 'black' }
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
            style={buttonStyle(opt)}
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
    const correctCount = score.filter(s => s.correct).length
    const percentage = Math.floor((correctCount / score.length) * 100)
    return (
      <>
        <div>done</div>
        <div>your score: {percentage}%</div>
      </>
    )
  }

  const onCountChange = (event) => {
    setQuestionCount(event.target.value)
  }

  const onChangeSubject = (subjectName) => {
    setSelectedSubject(subjectName)
  }

  const onNewQuiz = () => {
    generateDeck()
    setTestDone(false)
  }

  return (
    <>
      <section className="heading">flashcards</section>
      <section className="optionRow">
        <div className="form-group">
          <label htmlFor="questionCount">Question Count</label>
          <input
            name="questionCount"
            value={questionCount}
            type="text"
            onChange={onCountChange}
          />
        </div>
        <div className="form-group">
          <SubjectMenu onChange={onChangeSubject} />
        </div>
        <div className="form-group">
          <button className="btn" onClick={onNewQuiz} style={{width: "100%", margin:"30px 10px"}}>new quiz</button>
        </div>
      </section>
      {testDone ? renderDone() : deck && deck.length > 0 && renderQuiz()}
    </>
  );
}

export default Flashcards
