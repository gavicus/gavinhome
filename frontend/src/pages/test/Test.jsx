import { TestCreateScore } from './TestCreateScore'
import { TestGetScores } from './TestGetScores'
import { TestUpdateScore } from './TestUpdateScore'
import { TestDeleteScore } from './TestDeleteScore'
import { TestCreateGmdoc } from './TestCreateGmdoc'
import { TestGetGmdoc } from './TestGetGmdoc'
import { TestListGmdocs } from './TestListGmdocs'
import { TestCreateData } from './TestCreateData'
import { TestListData } from './TestListData'
import { TestWrapper } from "./TestWrapper"

export const Test = () => {
  return (
    <>
      <section className="heading">
        <h3>Testing</h3>
      </section>

      <TestWrapper title="data tests">
        <TestCreateData />
        <TestListData />
      </TestWrapper>

      <TestWrapper
        title="gmdoc tests"
      >
        <TestListGmdocs />
        <TestGetGmdoc />
        <TestCreateGmdoc />
      </TestWrapper>

      <TestWrapper
        title="score tests"
      >
        <TestDeleteScore />
        <TestUpdateScore />
        <TestGetScores />
        <TestCreateScore />
      </TestWrapper>

    </>
  )
}
