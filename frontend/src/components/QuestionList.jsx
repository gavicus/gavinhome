import { useState } from 'react'
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
  const [sorted, setSorted] = useState([...questions])
  const [sortField, setSortField] = useState('subject')
  const [sortDescending, setSortDescending] = useState(false)

  const onClickHeader = (field) => {
    let descending = sortDescending
    if (field === sortField) {
      descending = !descending
      setSortDescending(descending)
    } else {
      descending = false
      setSortField(field)
    }
    setSorted(
      sorted => sorted.sort((a,b) => {
        if (sortDescending) {
          return b[field].localeCompare(a[field])
        } else {
          return a[field].localeCompare(b[field])
        }
      })
    )
  }

  return (
    <table className="listTable">
      <thead>
        <tr>
          {fields.map((field) => (
            <th
              style={{
                textDecoration: field === sortField ? "underline" : "none",
              }}
              key={field}
              onClick={() => onClickHeader(field)}
            >
              {field}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map((question) => (
          <QuestionRow question={question} key={`${question.subject}:${question.question}`} />
        ))}
      </tbody>
    </table>
  );
}

export default QuestionList
