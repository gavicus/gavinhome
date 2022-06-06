import { useState, useEffect } from 'react'

import { Input } from './Components'

const EffectRow = ({index, category, item, adder, onChange}) => {
  const handleEffectChange = (event) => {
    const [fieldName, fieldIndex] = event.target.name.split('-')
    const value = event.target.value
    const newData = { fieldIndex, fieldName, value }
    onChange(newData)
  }

  return (
    <tr>
      <td>
        <input type="text" value={category} name={`category-${index}`} onChange={handleEffectChange} />
      </td>
      <td>
        <input type="text" value={item} name={`item-${index}`} onChange={handleEffectChange} />
      </td>
      <td>
        <input type="text" value={adder} name={`adder-${index}`} onChange={handleEffectChange} />
      </td>
    </tr>
  )
}

export const ItemForm = ({onSave}) => {
  const types = ['race','feat','skill','spell','power']
  const defaults = {
    level: 0,
    title: '',
    type: '',
    effects: [{category:'', item:'', adder:''}],
    // ex: {'attribute', 'str', 1}, {'skill', 'climb', 2}
  }
  const [formData, setFormData] = useState(defaults)
  const [formInvalid, setFormInvalid] = useState(true)

  const validate = () => {
    if (!formData.type) return setFormInvalid(true)
    if (!formData.title) return setFormInvalid(true)
    if (formData.level === '' || isNaN(formData.level)) return setFormInvalid(true)
    setFormInvalid(false)
  }

  const onTypeChange = (type) => {
    setFormData(previous => ({
      ...previous,
      type,
    }))
  }

  const handleChange = (field, value) => {
    setFormData(previous => ({
      ...previous,
      [field]: value
    }))
  }

  useEffect(() => {
    validate()
  }, [formData])

  const onEffectChange = (data) => {
    const newData = { ...formData }
    newData.effects[data.fieldIndex][data.fieldName] = data.value
    setFormData(newData)
  }

  const addEffectRow = () => {
    const newData = { ...formData }
    newData.effects.push({category:'', item:'', adder:''})
    setFormData(newData)
  }

  const onSubmitItem = () => {
    const submitData = formData
    submitData.effects = submitData.effects.filter(d => !!d.item)
    onSave(submitData)
  }

  const onCancelItem = () => {
    onSave(null)
  }

  return (
    <>
      <section className="itemTypes">
        {types.map((t) => (
          <button
            className="typeButton"
            key={`type-btn-${t}`}
            style={{
              backgroundColor: t === formData.type ? "yellow" : "inherit",
            }}
            onClick={() => onTypeChange(t)}
          >
            {t}
          </button>
        ))}
      </section>
      <section className="submitItem">
        <button onClick={onSubmitItem} disabled={formInvalid}>save item</button>
        <button onClick={onCancelItem}>cancel</button>
      </section>
      <section className="itemBasics">
        <Input
          edit={true}
          name="level"
          label="level"
          value={formData.level}
          onChange={handleChange}
        />
        <Input
          edit={true}
          name="title"
          label="title"
          value={formData.title}
          onChange={handleChange}
        />
      </section>
      <section className="effects">
        <span>effects</span>
        <button onClick={addEffectRow} style={{marginLeft:10}}>add another</button>
        <table>
          <thead>
            <tr>
              <th>category</th>
              <th>item</th>
              <th>adder</th>
            </tr>
          </thead>
          <tbody>
            {formData.effects.map((e, index) => (
              <EffectRow
                key={`effect-row-${index}`}
                index={index}
                category={e.category}
                item={e.item}
                adder={e.adder}
                onChange={onEffectChange}
              />
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
