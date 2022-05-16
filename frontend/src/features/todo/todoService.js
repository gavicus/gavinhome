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

const updateTodo = async(data, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.put(API_URL + data._id, data, config)
  return response.data
}

const createTodo = async (data, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.post(API_URL, data, config)
  return response.data
}

const deleteTodo = async(todoId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.delete(API_URL + todoId, config)
  return response.data
}

const todoService = {
  getTodos,
  getOneTodo,
  updateTodo,
  createTodo,
  deleteTodo,
}

export default todoService
