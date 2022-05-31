import { useState, useEffect } from 'react'

import './QuestionForm.css'

const TypeMenu = ({subject, onChange, startValue}) => {
  const [selectedType, setSelectedType] = useState(startValue)
  const types = {
    japanese: ['hiragana','katakana','kanji','english'],
    russian: ['russian','english'],
  }

  const onClick = (event, type) => {
    event.preventDefault()
    setSelectedType(type)
    onChange(type)
  }

  return (
    <div className="typeButtonRow">
      <span>Type: </span>
      {types[subject].map((type) => (
        <button
          key={`type-button-${type}`}
          className="typeButton"
          onClick={(event) => onClick(event, type)}
          style={{
            backgroundColor: selectedType===type ? '#444' : 'inherit',
            color: selectedType===type ? 'white' : 'inherit'
          }}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

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
    setFormData({
      ...defaultData,
      subject,
      type,
    })
  }

  const onChange = (event) => {
    setFormData((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value
    }))
  }

  const onTypeChange = (type) => {
    setFormData((previous) => ({
      ...previous,
      type
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
              <TypeMenu subject={subject} onChange={onTypeChange} startValue={type} />
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
                {
                  questionList
                  .filter(q=>(
                    q._id !== original._id && q.type === type
                  ))
                  .map(q=>(
                    <option key={q._id} value={q._id}>{q.answer}</option>
                  ))
                }
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
