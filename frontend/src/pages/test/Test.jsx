import { TestCreateScore } from './TestCreateScore'
import { TestGetScores } from './TestGetScores'
import { TestUpdateScore } from './TestUpdateScore'
import { TestDeleteScore } from './TestDeleteScore'

export const Test = () => {
  return (
    <>
      <section className="heading">
        <h3>Testing</h3>
      </section>

      <TestDeleteScore />

      <TestUpdateScore />
      <TestGetScores />
      <TestCreateScore />

    </>
  )
}
