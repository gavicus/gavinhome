import { useState } from 'react'
import { useSelector } from 'react-redux'

import scoreService from '../../features/score/scoreService'
import questionService from '../../features/questions/questionService'
import { TestWrapper } from "./TestWrapper"
import { ScoreMenu } from '../../components/ScoreMenu'

const QuestionDisplay = ({question}) => {
  return (
    <section>
      <ul>
        <li>subject: {question.subject}</li>
        <li>question: {question.question}</li>
        <li>answer: {question.answer}</li>
        {question.message &&
          <li>message: {question.message}</li>
        }
      </ul>
    </section>
  )
}

export const TestUpdateScore = () => {
  // const [selectedScore, setSelectedScore] = useState('')
  const [questionObject, setQuestionObject] = useState(null)
  const [scoreObject, setScoreObject] = useState(null)
  const [formValues, setFormValues] = useState({right:0, wrong:0})

  const { user: loggedUser } = useSelector((state) => state.auth)

  const onScoreChange = async (scoreId) => {
    console.log('onScoreChange scoreId',scoreId)
    const sObject = await scoreService.getOneScore(scoreId, loggedUser.token)
    if (!sObject) { return }
    console.log('sObject', sObject)
    setScoreObject(sObject)
    setFormValues({
      right: sObject.right,
      wrong: sObject.wrong
    })
    const qObject = await questionService.getOneQuestion(
      sObject.question,
      loggedUser.token
    )
    console.log('questionObject',qObject)
    setQuestionObject(qObject)
  }

  const onChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    console.log('name',name,'value',value)
    setFormValues((previous) => ({
      ...previous,
      [name]: value
    }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    console.log('onSubmit event',event)
    console.log('onSubmit formValues',formValues)
    const data = {
      right: parseInt(formValues.right),
      wrong: parseInt(formValues.wrong),
      _id: scoreObject._id,
    }
    console.log('data',data)
    scoreService.updateScore(data, loggedUser.token)
  }

  return (
    <TestWrapper title="update score" message={""}>
      <ScoreMenu onChange={onScoreChange} />
      {questionObject &&
        <QuestionDisplay question={questionObject} />
      }
      {scoreObject &&
        <section className="form">
          <form onSubmit={onSubmit}>

            <div className="form-group">
              <label htmlFor='right'>Right</label>
              <input
                type="text"
                name="right"
                value={formValues.right}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor='wrong'>Wrong</label>
              <input
                type="text"
                name="wrong"
                value={formValues.wrong}
                onChange={onChange}
              />
            </div>
            
            <button className="btn" type="submit">
              update
            </button>

          </form>
        </section>
      }
    </TestWrapper>
  )
}
