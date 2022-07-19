import { useState, useEffect } from 'react'
import authService from '../../features/auth/authService'
import questionService from '../../features/questions/questionService'
import { useSelector, useDispatch } from 'react-redux'
import { getQuestions, reset } from '../../features/questions/questionSlice'
import { createScore } from '../../features/score/scoreSlice'

import { TestWrapper } from "./TestWrapper"

export const TestCreateScore = () => {
  const [formData, setFormData] = useState({
    user: '',
    subject: '',
    question: '',
    right: '',
    wrong: '',
  })
  const [userList, setUserList] = useState([])
  const [subjectList, setSubjectList] = useState([])
  const [formValid, setFormValid] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const { user, subject, question, right, wrong } = formData
  const dispatch = useDispatch()
  const { questions } = useSelector(
    (state) => state.questions
  );
  const { user: loggedUser } = useSelector((state) => state.auth)

  useEffect(() => {
    console.log('dispatch')
    dispatch(getQuestions())
    return () => { dispatch(reset()) }
  }, [dispatch])

  useEffect(() => {
    const fetchData = async() => {
      const users = await authService.getUsers(loggedUser.token)
      setUserList(users)
      const subjects = await questionService.getSubjects(loggedUser.token)
      setSubjectList(subjects)
    }
    fetchData()
  }, [loggedUser.token])

  useEffect(() => {
    const valid = user && subject && question
    setFormValid(valid)
  }, [user, subject, question])

  const onChange = (event) => {
    setFormData((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('formData',formData)
    dispatch(createScore(formData))
    setSubmitMessage('Score created.')
  }

  const clearSubmitMessage = () => {
    setSubmitMessage('')
  }

  return (
    <TestWrapper
      title="create score"
      message={submitMessage}
      onContinue={clearSubmitMessage}
    >
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="user">User</label>
          <select name="user" value={user} onChange={onChange}>
            <option value={null}></option>
            {userList.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <select name="subject" value={subject} onChange={onChange}>
            <option value={null}></option>
            {subjectList.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="question">Question</label>
          <select name="question" value={question} onChange={onChange}>
            <option value={null}></option>
            {questions
              .filter((q) => q.subject === subject)
              .map((q) => (
                <option key={q._id} value={q._id}>
                  {q.question}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="right">Right</label>
          <input
            type="text"
            className="form-control"
            name="right"
            value={right}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="wrong">Wrong</label>
          <input
            type="text"
            className="form-control"
            name="wrong"
            value={wrong}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button disabled={!formValid} className="btn" type="submit">
            Create
          </button>
        </div>
      </form>
    </TestWrapper>
  );
}