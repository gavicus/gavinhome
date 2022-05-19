
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { QuestionForm } from "../../../components/QuestionForm"
import { createQuestion, reset } from '../../../features/questions/questionSlice'

export const QuestionNew = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const onSubmit = (data) => {
    dispatch(createQuestion(data))
    // navigate('/questions')
    
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
