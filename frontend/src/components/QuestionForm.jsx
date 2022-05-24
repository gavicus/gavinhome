import { useState, useEffect } from 'react'

import './QuestionForm.css'

export const QuestionForm = ({onSubmit, question: original, questionList}) => {
  const defaultData = {
    subject: 'japanese',
    type: 'kanji',
    question: '',
    answer: '',
    message: '',
    similar: [],
  }
  
  const [formData, setFormData] = useState(defaultData)

  const { subject, type, question, answer, message } = formData

  const subjects = ['japanese','russian']
  const types = {
    japanese: ['hiragana','katakana','kanji','english'],
    russian: ['russian','english'],
  }

  useEffect(() => {
    if (original) {
      setFormData((previousState) => ({
        ...previousState,
        ...original
      }))
    }
  }, [original])

  const submitHandler = (event) => {
    event.preventDefault()
    onSubmit(formData)
    setFormData(defaultData)
  }

  const onChange = (event) => {
    setFormData((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value
    }))
  }

  const onChangeSimilar = (event) => {
    setFormData(previous => ({
      ...previous,
      similar: [
        ...previous.similar,
        event.target.value
      ]
    }))
  }

  const onRemoveSimilar = (rid) => {
    setFormData(previous => ({
      ...previous,
      similar: formData.similar.filter(s=>s !== rid)
    }))
  }

  return (
    <>
      <section className="heading"></section>
      <section className="form">
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select
              name="subject"
              onChange={onChange}
              value={subject}
            >
              { subjects.map((subname) => (
                <option
                  value={subname}
                  key={subname}
                >
                  {subname}
                </option>
              ))}
            </select>
          </div>
          { subject &&
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <select
                name="type"
                onChange={onChange}
                value={type}
              >
                { types[subject].map((typename) => (
                  <option
                    value={typename}
                    key={typename}
                  >
                    {typename}
                  </option>
                ))}
              </select>
            </div>
          }
          <div className="form-group">
            <label htmlFor="question">Question</label>
            <input
              type="text"
              className="form-control"
              name="question"
              placeholder="question"
              value={question}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="answer">Answer</label>
            <input
              type="text"
              className="form-control"
              name="answer"
              placeholder="answer"
              value={answer}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <input
              type="text"
              className="form-control"
              name="message"
              placeholder="message"
              value={message}
              onChange={onChange}
            />
          </div>

          {questionList &&
          <>
            <div className="form-group">
              {formData.similar.map(sid=>(
                <div className='similarEntry' key={`selected-similar-${sid}`}>
                  {questionList.find(q=>q._id===sid).answer}
                  <button className="btn" type='button' onClick={() => onRemoveSimilar(sid)}>
                    x
                  </button>
                </div>
              ))}
            </div>

            <div className="form-group">
              <label htmlFor='similar'>Similar</label>
              <select name="similar" onChange={onChangeSimilar}>
                {questionList.map(q=>(
                  <option key={q._id} value={q._id}>{q.answer}</option>
                ))}
              </select>
            </div>
          </>
          }

          <div className="form-group">
            <button className="btn" type="submit">
              { original ? "Submit" : "Create" }
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
