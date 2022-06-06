import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import characterService from '../../features/character/characterService'
import { PageStandard } from '../../components/PageStandard'
import './CharacterList.css'

export const CharacterList = () => {
  const { user: loggedUser } = useSelector((state) => state.auth)
  const [characters, setCharacters] = useState(null)
  const navigate = useNavigate()

  const getTheCharacters = async() => {
    const reply = await characterService.getCharacters(
      { userId: loggedUser._id },
      loggedUser.token
    );
    if (!reply) { return }
    setCharacters(reply)
  }

  useEffect(() => {
    if (characters) return
    getTheCharacters()
  }, [])

  const CharacterRow = ({data}) => {
    return (
      <tr className="characterRow" onClick={() => onClickRow(data._id)}>
        <td>{data.character.overview.name}</td>
        <td>{data.character.overview.race}</td>
        <td>{data.character.overview.class}</td>
      </tr>
    )
  }

  const onClickRow = (id) => {
    navigate(`/character/${id}`)
  }

  return (
    <PageStandard title="character list">
      { characters && (
        <table className="characterList">
          <thead>
            <tr>
              <th>name</th>
              <th>race</th>
              <th>class</th>
            </tr>
          </thead>
          <tbody>
            {characters.map(c => <CharacterRow key={c._id} data={c} />)}
          </tbody>
        </table>
      ) }
    </PageStandard>
  )
}
