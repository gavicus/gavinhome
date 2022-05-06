import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  getOneQuestion,
  deleteQuestion,
  updateQuestion,
  reset,
} from "../features/questions/questionSlice";
import { QuestionForm } from "../components/QuestionForm"

export const QuestionEdit = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const { user } = useSelector((state) => state.auth)
  const { questions, isError, message } = useSelector(
    (state) => state.questions
  );

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getOneQuestion(id))

    return () => { dispatch(reset()) }
  }, [user, navigate, isError, message, dispatch, id])

  const onSubmit = (data) => {
    dispatch(updateQuestion({...data, _id: id}))
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
          <QuestionForm onSubmit={onSubmit} question={questions[0]} />
          <section className="form">
            <div className="form-group">
              <button className="btn" onClick={onDelete}>
                Delete Question
              </button>
            </div>
          </section>
        </>
      ) : (
        <div>no such question</div>
      )}
    </>
  )
}