import { useState, useEffect } from 'react'

import { getNextItemId } from './helpers'
import './SkillForm.css'

export const SkillForm = ({skill, items, level, onSubmit}) => {
  const [skillName, setSkillName] = useState('')
  const [rank, setRank] = useState('')
  const [stat, setStat] = useState('')
  const [newSkillName, setNewSkillName] = useState('')
  const [skillItems, setSkillItems] = useState([])
  const [linkUrl, setLinkUrl] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (items) {
      setSkillItems(items.filter((item) => item.type === "skill"))
    }
  }, [items])

  useEffect(() => {
    if (skill) {
      setNewSkillName(skill.title)
      setStat(skill.stat)
      if (skill.linkUrl) {
        setLinkUrl(skill.linkUrl)
      }
      if (skill.notes) {
        setNotes(skill.notes)
      }
    }
  }, [skill])

  const onChangeSkillMenu = (event) => {
    setSkillName(event.target.value)
  }

  const onChangeRank = (event) => {
    setRank(event.target.value)
  }

  const onChangeStat = (event) => {
    setStat(event.target.value)
  }

  const onChangeNewSkillName = (event) => {
    setNewSkillName(event.target.value)
  }

  const onChangeLinkUrl = (event) => {
    setLinkUrl(event.target.value)
  }

  const onChangeNotes = (event) => {
    setNotes(event.target.value)
  }

  const handleSubmit = () => {
    const saveData = {
      id: skill ? skill.id : getNextItemId(items),
      level: parseInt(level),
      type: 'skill',
      title: skillName ? skillName : newSkillName,
      isNew: !skillName && !skill,
      effects: [
        { item: 'rank', adder: rank }
      ],
      linkUrl,
      notes,
    }
    if (stat) {
      saveData.effects.push({ item: 'stat', adder: stat})
    } else {}
    onSubmit(saveData)
  }

  const handleCancel = () => {
    onSubmit(null)
  }

  const isInvalid = () => {
    if (skill) {
      return false
    }
    if (!rank) { return true }
    if (!skillName) {
      if (!newSkillName) { return true }
      if (!stat) { return true }
    }
    return false
  }

  return (
    <section className="form-section skill">
      {skill ? (
        <span>skill id: {skill.id}</span>
      ) : (
        <section>
          <label>skill</label>
          <select onChange={onChangeSkillMenu} value={skillName}>
            <option value={""}>(new skill)</option>
            {skillItems.map((skill) => (
              <option key={`option-${skill.id}`} value={skill.title}>
                {skill.title}
              </option>
            ))}
          </select>
        </section>
      )}

      {skillName ? (
        <>
          <section>
            <label>increase</label>
            <input name="rank" value={rank} onChange={onChangeRank} />
          </section>
        </>
      ) : (
        <>
          <section>
            <label>skill name</label>
            {
              skill
              ?
              <div>{newSkillName}</div>
              :
              <input
                name="newSkillName"
                value={newSkillName}
                onChange={onChangeNewSkillName}
              />
            }
          </section>
          <section>
            <label>stat</label>
            {
            skill
            ?
            <div>{stat}</div>
            :
            <input name="stat" value={stat} onChange={onChangeStat} />
            }
          </section>
          {!skill && (
            <section>
              <label>rank</label>
              <input name="rank" value={rank} onChange={onChangeRank} />
            </section>
          )}
        </>
      )}
      <section>
        <label>url</label>
        <input
          type="text"
          name="url"
          value={linkUrl}
          onChange={onChangeLinkUrl}
        />
      </section>
      <section>
        <label htmlFor="notes">notes</label>
        <textarea
          name="notes"
          id=""
          cols="30"
          rows="10"
          value={notes}
          onChange={onChangeNotes}
        >
        </textarea>
      </section>
      <section className="submit">
        <button onClick={handleSubmit} disabled={isInvalid()}>
          submit
        </button>
        <button onClick={handleCancel}>cancel</button>
      </section>
    </section>
  );
}
