import axios from 'axios'

const API_URL = '/api/todo/'

const getTodos = async (options, token) => {
  if (!options) { return null; }
  const userId = options.userId || null;
  if (!userId) { return null; }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + `user/${userId}`, config)
  return response.data
}

const getOneTodo = async(todoId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + todoId, config)
  return response.data
}

const todoService = {
  getTodos,
  getOneTodo,
}

export default todoService
