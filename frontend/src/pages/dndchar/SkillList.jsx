import { useState, useEffect } from 'react'

import './SkillList.css'

export const SkillList = ({items, level, onDelete, onEdit}) => {
  const [skills, setSkills] = useState([])

  useEffect(() => {
    if (!items) { return [] }
    const filtered = items
    .filter(item => parseInt(item.level) <= level && item.type === 'skill')

    const names = new Set()
    for (let item of filtered) {
      names.add(item.title)
    }

    const mergedSkills = []
    for (let name of names) {
      const myItems = filtered.filter(item => item.title === name)
      if (!myItems || myItems.length === 0) { continue }
      let rank = 0
      let stat
      let linkUrl, notes
      for (let item of myItems) {
        const rankEffect = item.effects.find(e => e.item === 'rank')
        if (rankEffect) { rank += parseInt(rankEffect.adder) }
        const statEffect = item.effects.find(e => e.item === 'stat')
        if (statEffect) { stat = statEffect.adder }
        if (item.linkUrl) { linkUrl = item.linkUrl }
        if (item.notes) { notes = item.notes }
      }
      mergedSkills.push({title:name, rank, stat, id: myItems[0].id, linkUrl, notes})
    }

    setSkills(mergedSkills.sort((a,b) => a.title.localeCompare(b.title)))
  }, [items, level])

  const handleDelete = (skill) => {
    const doIt = window.confirm(`Delete the ${skill.title} skill?`)
    if (doIt) { onDelete(skill.id) }
  }

  const handleEdit = (skill) => {
    if (!onEdit) { return }
    onEdit(skill)
  }

  const SkillEntry = ({skill}) => {
    return (
      <tr>
        {
          onDelete &&
          <td>
            <button onClick={() => handleDelete(skill)}>delete</button>
          </td>
        }
        <td className={ onEdit ? "clickable" : "" } onClick={() => handleEdit(skill)}>
          {skill.title} { skill.stat && <>({skill.stat})</> }
        </td>
        <td>{skill.rank}</td>
        <td>
          {
            skill.linkUrl &&
            <a href={skill.linkUrl} target="_blank">link</a>
          }
          {
            skill.notes &&
            <div style={{display:'inline-block', marginLeft:'10px'}}>
              <div className="tooltip">notes
                <span className="tooltiptext">{skill.notes}</span>
              </div>
            </div>
          }
        </td>
      </tr>
    )
  }

  return (
    <section className="form-section skills">
      <p>skills</p>
      <table>
        <tbody>
          {
            skills.map(skill => (
              <SkillEntry key={`skill-${skill.title}`} skill={skill} />
            ))
          }
        </tbody>
      </table>
    </section>
  )
}
