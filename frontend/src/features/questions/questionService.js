import axios from 'axios'

const API_URL = '/api/questions/'

const getQuestions = async(token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

const getOneQuestion = async(questionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + questionId, config)
  return response.data
}

const createQuestion = async (data, token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, data, config)
  return response.data
}

const deleteQuestion = async(questionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(API_URL + questionId, config)
  return response.data
}

const updateQuestion = async(data, token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.put(API_URL + data._id, data, config)
  return response.data
}

const questionService = {
  getQuestions,
  createQuestion,
  getOneQuestion,
  deleteQuestion,
  updateQuestion,
}

export default questionService
