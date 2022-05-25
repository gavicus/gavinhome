import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  getQuestions,
  deleteQuestion,
  updateQuestion,
  createQuestion,
  reset,
} from "../../features/questions/questionSlice";
import { QuestionForm } from "../../components/QuestionForm"

export const QuestionEdit = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const { user } = useSelector((state) => state.auth)
  const { questions, isError, message } = useSelector(
    (state) => state.questions
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login')
    }
    dispatch(getQuestions(id))
    return () => { dispatch(reset()) }
  }, [user, navigate, isError, message, dispatch, id])

  const onSubmit = (data) => {
    dispatch(updateQuestion({...data, _id: id}))
    navigate('/questions')
  }

  const reverseExists = () => {
    const question = questions.find((q) => q._id === id)
    const existing = questions.find(q => q.question === question.answer)
    return !!existing
  }

  const onReverse = () => {
    const question = questions.find((q) => q._id === id)
    const data = {
      subject: question.subject,
      type: question.type === 'english' ? question.type : 'english',
      question: question.answer,
      answer: question.question,
      message: question.message,
    }
    const existing = questions.find(q => q.question === data.question)
    if (existing) {
      alert(`question "${data.question}" already exists`)
    } else {
      dispatch(createQuestion(data))
    }
    navigate('/questions')
  }

  const onDelete = () => {
    if (window.confirm('Delete this question?')) {
      dispatch(deleteQuestion(id))
      navigate('/questions')
    }
  }

  return (
    <>
      <section className="heading">Question Edit</section>
      {questions && questions.length > 0 ? (
        <>
          <QuestionForm
            onSubmit={onSubmit}
            question={questions.find((q) => q._id === id)}
            questionList={questions}
          />
          <section className="form">
            {!reverseExists() &&
              <div className="form-group">
                <button className="btn" onClick={onReverse}>Create Reverse Question</button>
              </div>
            }
            <div className="form-group">
              <button className="btn alert" onClick={onDelete}>
                Delete Question
              </button>
            </div>
          </section>
        </>
      ) : (
        <div>no such question</div>
      )}
    </>
  );
}