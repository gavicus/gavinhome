
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { QuestionForm } from "../../../components/QuestionForm"
import { createQuestion, reset } from '../../../features/questions/questionSlice'
import { getQuestions } from '../../../features/questions/questionSlice'


export const QuestionNew = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { questions } = useSelector(
    (state) => state.questions
  )

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getQuestions())
  }, [])
  
  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const onSubmit = (data) => {

    console.log({data})

    const existing = questions.find(
      (q) => q.question === data.question && q.subject === data.subject
    );
    if (existing) {
      alert(`question "${data.question}" already exists`)
    } else {
      dispatch(createQuestion(data))
    }
    return () => { dispatch(reset()) }
  }

  return (
    <>
      <section className="heading">
        <h3>create question</h3>
      </section>
      <QuestionForm onSubmit={onSubmit} />
    </>
  )
}
