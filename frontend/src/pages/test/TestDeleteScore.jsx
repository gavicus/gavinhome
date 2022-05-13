import { useState } from 'react'
import { useSelector } from 'react-redux'

import scoreService from '../../features/score/scoreService'
import { ScoreMenu } from '../../components/ScoreMenu'
import { TestWrapper } from "./TestWrapper"

export const TestDeleteScore = () => {
  const [selectedScore, setSelectedScore] = useState('')

  const { user: loggedUser } = useSelector((state) => state.auth)

  const onChangeScore = (scoreId) => {
    setSelectedScore(scoreId)
  }

  const onDelete = () => {
    scoreService.deleteScore(selectedScore, loggedUser.token)
    setSelectedScore('')
  }

  return (
    <TestWrapper title="delete score">
      <ScoreMenu onChange={onChangeScore} />
      {selectedScore ? (
        <>
          <section>
            <span>delete this score?</span>
          </section>
          <section>
            <button className="btn" onClick={onDelete}>delete it</button>
          </section>
        </>
      ) : (
        <section>
          <span>select a score</span>
        </section>
      )}
    </TestWrapper>
  )
}
