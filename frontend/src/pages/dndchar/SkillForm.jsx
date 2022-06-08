import { useState } from 'react'

import './SkillForm.css'

export const SkillForm = ({skills, onSubmit}) => {
  const [skillName, setSkillName] = useState('')
  const [rank, setRank] = useState('')
  const [stat, setStat] = useState('')
  const [newSkillName, setNewSkillName] = useState('')

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

  const handleSubmit = () => {
    let data
    if (skillName) {
      data = {
        isNew: false,
        title: skillName,
        adder: rank,
      }
    } else {
      data = {
        isNew: true,
        title: newSkillName,
        adder: rank,
        stat: stat,
      }
    }
    onSubmit(data)
  }

  const handleCancel = () => {
    onSubmit(null)
  }

  const isInvalid = () => {
    if (!rank) { return true }
    if (!skillName) {
      if (!newSkillName) { return true }
      if (!stat) { return true }
    }
    return false
  }

  return (
    <section className="form-section skill">
      <section>
        <label>skill</label>
        <select onChange={onChangeSkillMenu} value={skillName}>
          <option value={''}>(new skill)</option>
          {skills.map(skill => (
            <option key={`option-${skill.id}`} value={skill.title}>
              {skill.title}
            </option>
          ))}
        </select>
      </section>
      {
        skillName
        ?
        <>
          <section>
            <label>increase</label>
            <input name="rank" value={rank} onChange={onChangeRank} />
          </section>
        </>
        :
        <>
          <section>
            <label>skill name</label>
            <input name="newSkillName" value={newSkillName} onChange={onChangeNewSkillName} />
          </section>
          <section>
            <label>stat</label>
            <input name="stat" value={stat} onChange={onChangeStat} />
          </section>
          <section>
            <label>rank</label>
            <input name="rank" value={rank} onChange={onChangeRank} />
          </section>
        </>
      }
      <section className="submit">
        <button onClick={handleSubmit} disabled={isInvalid()}>submit</button>
        <button onClick={handleCancel}>cancel</button>
      </section>
    </section>
  )
}
