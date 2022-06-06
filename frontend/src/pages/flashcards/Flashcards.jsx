import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import scoreService from '../../features/score/scoreService'
import { getQuestions, reset } from '../../features/questions/questionSlice'
import { createScoreEntries } from '../../utils/quizUtils'
import { SubjectMenu } from '../../components/SubjectMenu'
import { PageStandard } from '../../components/PageStandard'
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
  const [selectedSubject, setSelectedSubject] = useState('japanese')
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
    const oneThird = Math.floor(questionCount * .33)

    let selectionBatch = scoreEntries
      .filter(e => e.subject === selectedSubject)
      .sort((a,b) => a.right + a.wrong - (b.right + b.wrong))
    const fewVisitQuestions = selectionBatch.slice(0, oneThird)

    selectionBatch = selectionBatch
      .slice(oneThird)
      .sort((a,b) => a.score - (b.score))
    const lowScoreQuestions = selectionBatch.slice(0, oneThird)

    selectionBatch = selectionBatch
      .slice(oneThird)
    shuffle(selectionBatch)
    const randomCount = questionCount
      - fewVisitQuestions.length
      - lowScoreQuestions.length
    const randomQuestions = selectionBatch.slice(0,randomCount)

    const quizEntries = [
      ...fewVisitQuestions,
      ...lowScoreQuestions,
      ...randomQuestions
    ]

    const draftDeck = []
    for (const question of quizEntries) {
      const similar = question.similar.map(sim => scoreEntries.find(se=>se.questionId === sim))

      const candidates = scoreEntries.filter(
        (q) =>
          q.type === question.type &&
          q.answer !== question.answer &&
          q.subject === question.subject &&
          similar.indexOf(q) === -1
      );

      shuffle(candidates)

      const wrongEntries = [
        ...similar,
        ...candidates
      ]

      const wrongAnswers = wrongEntries
        .slice(0, optionCount - 1)
        .map((w) => ({ answer: w.answer, correct: false, key: question._id + w.questionId }));
      const options = [
        { answer: question.answer, correct: true, key: question._id + question._id },
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
            key={opt.key}
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
    <PageStandard title="flashcards">
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
          <button className="btn" onClick={onNewQuiz} style={{width: "100%", margin:"30px 10px"}}>
            new quiz
          </button>
        </div>
      </section>
      {testDone ? renderDone() : deck && deck.length > 0 && renderQuiz()}
    </PageStandard>
  );
}

export default Flashcards
