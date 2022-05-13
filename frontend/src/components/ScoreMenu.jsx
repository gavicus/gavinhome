import { useState, useEffect} from 'react'
import { useSelector } from 'react-redux'

import scoreService from '../features/score/scoreService'
import authService from '../features/auth/authService'

export const ScoreMenu = ({onChange}) => {
  const [scores, setScores] = useState([])
  const [userList, setUserList] = useState([])
  const [selectedScore, setSelectedScore] = useState('')

  const { user: loggedUser } = useSelector((state) => state.auth)
  const { questions } = useSelector((state) => state.questions)

  useEffect(() => {
    getTheScores()
  }, [])

  useEffect(() => {
    const fetchUsers = async() => {
      const users = await authService.getUsers(loggedUser.token)
      setUserList(users)
    }
    fetchUsers()
  }, [loggedUser.token])

  const scoreDisplay = (score) => {
    const { subject, right, wrong, question: qId, user: uId } = score
    const item = questions.find((q) => q._id === qId)
    if (!item) return ''
    const subjectLabel = subject ? subject.substr(0,3) : ''
    const questionLabel = item.question
    const userObject = userList.find((u) => u._id === uId)
    const userLabel = userObject?.name || ''
    return `${userLabel} - ${subjectLabel}:${questionLabel} (${right}/${wrong})`
  }

  const getTheScores = async() => {
    const reply = await scoreService.getAllScores(loggedUser.token)
    if (!reply) { return }
    setScores(reply)
  }

  const onScoreSelect = (event) => {
    setSelectedScore(event.target.value)
    onChange(event.target.value)
  }

  return (
      <select value={selectedScore} onChange={onScoreSelect}>
        <option key='empty' value=''></option>
        {scores.map((s) => (
          <option key={s._id} value={s._id}>{scoreDisplay(s)}</option>
        ))}
      </select>
  )
}
