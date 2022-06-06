import axios from 'axios'

const API_URL = '/api/character/'

const createCharacter = async (data, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.post(API_URL, data, config)
  return response.data
}

const getCharacter = async(characterId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + characterId, config)
  return response.data
}

const getCharacters = async (options, token) => {
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

const updateCharacter = async(data, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.put(API_URL + data._id, data, config)
  return response.data
}

const characterService = {
  createCharacter,
  getCharacter,
  getCharacters,
  updateCharacter,
}

export default characterService
