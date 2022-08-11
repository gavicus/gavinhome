import axios from 'axios'
const API_URL = '/api/data/'

const createData = async (data, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.post(API_URL, data, config)
  return response.data
}

const listData = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + `user/${userId}`, config)
  return response.data
}

const getData = async(dataId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + dataId, config)
  return response.data
}

const updateData = async(data, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.put(API_URL + data._id, data, config)
  return response.data
}

const deleteData = async(id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.delete(API_URL + id, config)
  return response.data
}

const dataService = {
  createData,
  listData,
  getData,
  updateData,
  deleteData
}

export default dataService
