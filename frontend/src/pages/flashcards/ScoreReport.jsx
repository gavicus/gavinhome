import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getQuestions, reset } from '../../features/questions/questionSlice'
import { createScoreEntries } from '../../utils/quizUtils'
import scoreService from '../../features/score/scoreService'
import { UserMenu } from '../../components/UserMenu'
import { SubjectMenu } from '../../components/SubjectMenu'
import './ScoreReport.css'

export const ScoreReport = () => {
  const [scores, setScores] = useState([])
  const [selectedUserId, setSelectedUserId] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [scoreTableEntries, setScoreTableEntries] = useState([])

  const dispatch = useDispatch()
  const { user: loggedUser } = useSelector((state) => state.auth)
  const { questions } = useSelector((state) => state.questions)

  useEffect(() => {
    dispatch(getQuestions())
    return () => { dispatch(reset()) }
  }, [])

  const getTheScores = async() => {
    const reply = await scoreService.getScores(
      { userId: selectedUserId, subject: selectedSubject },
      loggedUser.token
    );
    if (!reply) { return }
    setScores(reply)
  }

  useEffect(() => {
    if (selectedSubject && selectedUserId) {
      getTheScores()
    }
  }, [selectedSubject, selectedUserId])

  useEffect(() => {
    setScoreTableEntries(createScoreEntries(scores,questions,loggedUser))
  }, [scores])

  const onChangeUser = (userId) => {
    setSelectedUserId(userId)
  }

  const onChangeSubject = (subject) => {
    setSelectedSubject(subject)
  }

  const ScoreTable = () => {


    console.log({scoreTableEntries})

    return (
      <section className="score-table">
        <table>
          <thead>
            <tr>
              <th>question</th>
              <th>answer</th>
              <th>message</th>
              <th>right</th>
              <th>wrong</th>
              <th>score</th>
            </tr>
          </thead>
          <tbody>
            {scoreTableEntries
              .sort((a,b) => (a.score - b.score))
              .map((entry) => {
              return (
              <tr key={entry.question}>
                <td className='entryQuestion'>{entry.question}</td>
                <td>{entry.answer}</td>
                <td>{entry.message}</td>
                <td>{entry.right}</td>
                <td>{entry.wrong}</td>
                <td>{entry.score}%</td>
              </tr>
            )})}
          </tbody>
        </table>
      </section>
    )
  }

  return (
    <section>
      <section className="heading">score report</section>
      <section className="optionRow">
        <UserMenu onChange={onChangeUser} />
        <SubjectMenu onChange={onChangeSubject} />
      </section>
      { scoreTableEntries && scoreTableEntries.length > 0 &&
        <ScoreTable />
      }
    </section>
  )
}
