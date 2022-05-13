
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getQuestions, reset } from '../../../features/questions/questionSlice'
import QuestionList from '../../../components/QuestionList'
import { Spinner } from '../../../components/Spinner'

/**
 * TODO
 * filters and sorting
 */

const Questions = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { questions, isLoading, isError, message } = useSelector((state) => state.questions)

  useEffect(() => {
    if (isError) {
      console.log('error',message)
    }

    if (!user || !user.admin) {
      navigate('/login')
    }

    dispatch(getQuestions())

    return () => { dispatch(reset()) }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      questions
      { questions.length > 0 ? (
        <QuestionList questions={questions} />
      ) : (
        <h3>there are no questions yet</h3>
      ) }
    </div>
  )
}

export default Questions
