import { useState, useEffect } from 'react'

import { SkillList } from './SkillList'
import { SkillForm } from './SkillForm'

export const LevelBox = ({level, items, onChange}) => {
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

  return (
    <section className="form-section levelling">
      levelling to level {level}
      <section>
        {showSkillForm ? (
          <SkillForm
            items={items}
            level={level}
            onSubmit={handleSkillFormSubmit}
        />
        ) : (
          <>
            <button onClick={handleAddSkillButton}>add a skill</button>
            <SkillList level={level} items={formItems} />
          </>
        )}
      </section>
    </section>
  );
}
