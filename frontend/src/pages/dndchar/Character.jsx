import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import { useNavigate, Link } from 'react-router-dom'

import characterService from '../../features/character/characterService'
import { PageStandard } from '../../components/PageStandard'
import { AttributeForm } from './AttributeForm'
import { Input } from './Components'

import { ItemBox } from './ItemBox'
import { SkillForm } from './SkillForm'
import { NotesForm } from './NotesForm'
import { SkillList } from './SkillList'
import { getNextItemId } from './helpers'
import { LevelBox } from './LevelBox'
import './Character.css'

/*
give each item a note and/or hyperlink
*/

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
    notes: [],
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

  useEffect(() => {
    if (!id) {
      setFormData(defaultData)
    }
  }, [id])

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

  const onNotesChange = (data) => {
    setFormData(previous => ({
      ...previous,
      notes: data,
    }))
  }

  const onSubmit = () => {
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

  const onChangeItems = (data) => {
    console.log({onChangeItems: data})
    setFormData(previous => ({
      ...previous,
      items: data,
    }))
  }

  const onDeleteItem = (id) => {
    const newData = formData
    newData.items = newData.items.filter(item => item.id !== id)
    setFormData(newData)
  }

  const isInvalid = () => {
    return !formData.overview.name
  }

  const handleSkillFormSubmit = (data) => {
    console.log({formData})
    console.log({handleSkillFormSubmit:data})
  }

  const handleLevelBoxChange = (data) => {
    if (data) {
      const newData = formData
      newData.items.push(data)
      setFormData(newData)
    }
  }

  const Overview = () => {
    return (
      <section className="form-section overview">
          <Input
            name="name"
            label="name"
            value={formData.overview.name}
            onChange={onOverviewChange}
          />
          <Input
            name="race"
            label="race"
            value={formData.overview.race}
            onChange={onOverviewChange}
          />
          <Input
            name="class"
            label="class"
            value={formData.overview.class}
            onChange={onOverviewChange}
          />
          <Input
            name="level"
            label="level"
            value={formData.overview.level}
            onChange={onOverviewChange}
          />
        </section>
    )
  }

  return (
    <PageStandard title="character">
      <section className="controls">
        <Link to={"/characterlist"}>character list</Link>
        <Link to={"/character"}>new character</Link>
        <button onClick={onSubmit} disabled={isInvalid()}>
          {id ? "update" : "create"}
        </button>
      </section>

      <section className="character-form">
        <Overview />

        <AttributeForm
          data={formData.attributes}
          onChange={onAttributeChange}
        />

        <LevelBox
          level={formData.overview.level}
          items={formData.items}
          onChange={handleLevelBoxChange}
        />

        <ItemBox
          items={formData.items}
          onChange={onChangeItems}
          onDelete={onDeleteItem}
        />

        <SkillList items={formData.items} level={formData.overview.level} />

        <SkillForm
          skills={formData.items.filter((item) => item.type === "skill")}
          onSubmit={handleSkillFormSubmit}
          level={formData.overview.level}
        />

        <NotesForm items={formData.notes} onChange={onNotesChange} />
      </section>
    </PageStandard>
  );
}
