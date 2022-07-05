import axios from 'axios'

const API_URL = '/api/gmdoc/'

const createGmdoc = async (data, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.post(API_URL, data, config)
  return response.data
}

const getGmdoc = async(gmdocId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + gmdocId, config)
  return response.data
}

const listGmdocs = async (gmId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + `gm/${gmId}`, config)
  return response.data
}

const updateGmdoc = async(data, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.put(API_URL + data._id, data, config)
  return response.data
}

const deleteGmdoc = async(id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.delete(API_URL + id, config)
  return response.data
}

const gmdocService = {
  createGmdoc,
  getGmdoc,
  listGmdocs,
  updateGmdoc,
  deleteGmdoc
}

export default gmdocService
