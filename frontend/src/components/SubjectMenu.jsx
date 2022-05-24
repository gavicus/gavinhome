import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import questionService from '../features/questions/questionService'

export const SubjectMenu = ({onChange}) => {
  const [subjectList, setSubjectList] = useState([])
  const [selectedSubject, setSelectedSubject] = useState('')
  const { user: loggedUser } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchData = async() => {
      const subjects = await questionService.getSubjects(loggedUser.token)
      setSubjectList(subjects)
    }
    fetchData()
  }, [loggedUser.token])

  useEffect(()=>{
    if (subjectList && subjectList.length > 0) {
      setSelectedSubject(subjectList[0])
    }
  },[subjectList])

  const handleChange = (event) => {
    setSelectedSubject(event.target.value)
    onChange(event.target.value)
  }

  return (
    <div className="form-group">
      <label htmlFor="subject">Subject</label>
      <select name="subject" value={selectedSubject} onChange={handleChange}>
        <option value={null}></option>
        {subjectList.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  )
}
