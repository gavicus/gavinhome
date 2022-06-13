import { useState, useEffect } from 'react'

import { SkillList } from './SkillList'
import { SkillForm } from './SkillForm'
import { FeatList } from './FeatList'
import './LevelBox.css'

export const LevelBox = ({level, items, onChange, onDelete}) => {
  const [formItems, setFormItems] = useState([])
  const [showSkillForm, setShowSkillForm] = useState(false)

  useEffect(() => {
    if (typeof items !== 'undefined') {
      setFormItems(items.filter(item => parseInt(item.level) === parseInt(level)))
    }
  }, [items, level])

  const handleSkillFormSubmit = (data) => {
    console.log({handleSkillFormSubmit:data})
    if (data) {
      setFormItems(previous => [ ...previous, data ])
      onChange(data)
    }
    setShowSkillForm(false)
  }

  const handleAddSkillButton = () => {
    setShowSkillForm(true)
  }

  const handleDeleteSkill = (skillId) => {
    onDelete(skillId)
  }

  return (
    <section className="form-section levelling">
      level {level} changes
      <section>
        <button onClick={handleAddSkillButton}>add a skill</button>
      </section>
      <section>
        {showSkillForm ? (
          <SkillForm
            items={items}
            level={level}
            onSubmit={handleSkillFormSubmit}
        />
        ) : (
          <>
            <SkillList level={level} items={formItems} onDelete={handleDeleteSkill} />
            <FeatList level={level} items={formItems} />
          </>
        )}
      </section>
    </section>
  );
}
