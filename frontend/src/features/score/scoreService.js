import axios from 'axios'

const API_URL = '/api/score/'

const createScore = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, data, config)
  return response.data
}

const getScores = async (options, token) => {
  if (!options) { return null; }
  const userId = options.userId || null;
  const subject = options.subject || null;
  if (!userId || !subject) { return null; }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + `${userId}/${subject}`, config)
  return response.data
}

const getAllScores = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

const getOneScore = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + id, config)
  return response.data
}

const updateScore = async(data, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.put(API_URL + data._id, data, config)
  return response.data
}

const deleteScore = async(id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.delete(API_URL + id, config)
  return response.data
}

const scoreService = {
  createScore,
  getScores,
  getAllScores,
  getOneScore,
  updateScore,
  deleteScore,
}

export default scoreService
