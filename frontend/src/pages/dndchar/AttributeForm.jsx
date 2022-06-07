import { useState, useEffect } from 'react'

import './AttributeForm.css'

export const AttributeForm = ({data, onChange}) => {
  const attributes = ['str','dex','con','int','wis','cha']
  const defaults = Object.fromEntries(attributes.map(a=>[a,8]))
  const [formValues, setFormValues] = useState(defaults)
  const [costs, setCosts] = useState(
    Object.fromEntries(attributes.map(a=>[a,0]))
  )
  const [mods, setMods] = useState(
    Object.fromEntries(attributes.map(a=>[a,-1]))
  )

  useEffect(() => {
    const newCosts = {}
    const newMods = {}
    for (const att of attributes) {
      const attValue = formValues[att]
      newCosts[att] = getCost(attValue)
      newMods[att] = getMod(attValue)
    }
    setCosts(newCosts)
    setMods(newMods)
  }, [formValues])

  useEffect(() => {
    setFormValues(data)
  }, [data])
  
  const getCost = (value) => {
    const free = 8
    const oneMax = 13
    const twoMax = 15
    const attribute = parseInt(value)
    return attribute - free + Math.max(0, attribute - oneMax) + Math.max(0, attribute - twoMax);
  }

  const getMod = (value) => {
    const attribute = parseInt(value)
    const aboveTen = attribute - 10
    return Math.floor(aboveTen / 2)
  }

  const updateForm = (data) => {
    setFormValues(data)
  }

  const handleChange = (event) => {
    const newValues = {
      ...formValues,
      [event.target.name]: parseInt(event.target.value),
    }
    updateForm(newValues)
    onChange(newValues)
  }

  const showMod = (mod) => {
    const operator = mod > 0 ? '+' : ''
    return `(${operator}${mod})`
  }

  return (
    <table>
      <thead>
        <tr>
          <th>attr</th>
          <th>base</th>
          <th>cost</th>
          <th>mod</th>
        </tr>
      </thead>
      <tbody>
      {attributes.map(a => (
        <tr key={`attribute-row-${a}`}>
          <td>{a}</td>
          <td>
            <input onChange={handleChange} name={a} value={data[a]} />
          </td>
          <td>{costs[a]}</td>
          <td>{showMod(mods[a])}</td>
        </tr>
      ))}
        <tr>
          <td></td><td></td>
          <td className='totalField'>{
            Object.values(costs).reduce((past,current) => past+current, 0)
          }</td>
        </tr>
      </tbody>
    </table>
  )
}
