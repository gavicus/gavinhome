import { useNavigate } from 'react-router-dom'

import './QuestionList.css'

const fields = ['subject','type','question','answer','message']

const QuestionRow = ({question}) => {
  const navigate = useNavigate()

  const onClickRow = (q) => {
    navigate(`/questionedit/${q._id}`)
  }

  return (
    <tr className="linkRow" onClick={() => onClickRow(question)}>
      {fields.map((field, index) => (
        <td key={`${index}-${question[field]}`}>
          {question[field]}
        </td>
      ))}
    </tr>
  )
}

const QuestionList = ({questions}) => {
  return (
    <table className="listTable">
      <thead>
        <tr>
          {fields.map((field) => <th key={field}>{field}</th>)}
        </tr>
      </thead>
      <tbody>
        {questions.map((question) => (
          <QuestionRow
            question={question}
            key={question.question}
          />
        ))}
      </tbody>
    </table>
  )
}

export default QuestionList
