import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom"

import characterService from '../../features/character/characterService'
import { PageStandard } from '../../components/PageStandard'
import { AttributeForm } from './AttributeForm'
import { ItemForm } from './ItemForm'
import { Input } from './Components'
import { ItemList } from './ItemList'
import './Character.css'

export const Character = () => {
  const { id } = useParams()
  const { user: loggedUser } = useSelector((state) => state.auth)
  const defaultData = {
    overview: {
      name: '',
      race: '',
      class: '',
      level: '',
    },
    attributes: {
      str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8,
    },
    items: [],
  }
  const [formData, setFormData] = useState(defaultData)
  const [showItemForm, setShowItemForm] = useState(false)
  const [character, setCharacter] = useState(null)

  useEffect(() => {
    const getTheCharacter = async() => {
      const reply = await characterService.getCharacter(
        id,
        loggedUser.token
      );
      if (!reply) { return }
      setCharacter(reply)
    }
  
    getTheCharacter()
  }, [id, loggedUser.token])

  useEffect(() => {
    if (character && character.character) {
      setFormData(character.character)
    }
  }, [character])

  const onOverviewChange = (name, value) => {
    setFormData(previous => ({
      ...previous,
      overview: {
        ...previous.overview,
        [name]: value
      }
    }))
  }

  const onAttributeChange = (data) => {
    setFormData(previous => ({
      ...previous,
      attributes: data,
    }))
  }

  const onSubmit = () => {
    console.log({formData})
    const data = {
      userId: loggedUser._id,
      character: formData,
    }
    if (id) {
      data._id = id
      characterService.updateCharacter(data,loggedUser.token)
    } else {
      characterService.createCharacter(data, loggedUser.token)
    }
  }

  const onSaveItem = (data) => {
    setShowItemForm(false)
    if (!data) return
    const newData = formData
    if ('id' in Object.keys(data)) {
      console.log('update item to be implemented')
    } else {
      newData.items.push(data)
      setFormData(newData)
    }
  }

  const toggleItemForm = (data) => {
    setShowItemForm(true)
  }

  return (
    <PageStandard title="character">
      <section className="controls">
        <button onClick={onSubmit}>
          {id ? 'update' : 'create'}
        </button>
      </section>

      <section className="character-form">

        <section className="form-section overview">
          <Input name="name" label="name" value={formData.overview.name} onChange={onOverviewChange} />
          <Input name="race" label="race" value={formData.overview.race} onChange={onOverviewChange} />
          <Input name="class" label="class" value={formData.overview.class} onChange={onOverviewChange} />
          <Input name="level" label="level" value={formData.overview.level} onChange={onOverviewChange} />
        </section>

        <section className="form-section attributes">
          <AttributeForm data={formData.attributes} onChange={onAttributeChange} />
        </section>

        <section className="form-section items">
          {
            showItemForm ?
            <ItemForm onSave={onSaveItem} />
            :
            <ItemList items={formData.items} onEdit={toggleItemForm} />
          }
        </section>

      </section>
    </PageStandard>
  )
}
