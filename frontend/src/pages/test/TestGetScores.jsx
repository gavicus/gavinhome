import { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import scoreService from '../../features/score/scoreService'
import { TestWrapper } from "./TestWrapper"
import { UserMenu } from '../../components/UserMenu'
import { SubjectMenu } from '../../components/SubjectMenu'

export const TestGetScores = () => {
  const [scores, setScores] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [formValid, setFormValid] = useState(false)

  const { user: loggedUser } = useSelector((state) => state.auth)
  const { questions } = useSelector((state) => state.questions)

  useEffect(() => {
    setFormValid(selectedUser && selectedSubject)
  }, [selectedUser, selectedSubject])

  const getTheScores = async() => {
    const reply = await scoreService.getScores(
      { userId: selectedUser, subject: selectedSubject },
      loggedUser.token
    );
    if (!reply) { return }
    console.log('reply',reply)
    setScores(reply)
  }

  const onUserChange = (userId) => {
    console.log('onUserChange',userId)
    setSelectedUser(userId)
  }

  const onSubjectChange = (sub) => {
    setSelectedSubject(sub)
  }

  const onSubmit = () => {
    console.log(selectedUser,selectedSubject)
    getTheScores()
  }

  return (
    <TestWrapper title="get scores" message={""}>
      <UserMenu onChange={onUserChange} />

      <SubjectMenu onChange={onSubjectChange} />

      <button disabled={!formValid} onClick={onSubmit} className="btn">
        Get Them
      </button>

      {scores && scores.length > 0 &&
        <section>
          <table className="listTable">
            <thead>
              <tr>
                <th>question</th>
                <th>right</th>
                <th>wrong</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((s) => (
                <tr key={s._id}>
                  <td>
                    { questions.find((q) => q._id === s.question).question }
                  </td>
                  <td>{s.right}</td>
                  <td>{s.wrong}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      }
    </TestWrapper>
  );
}
