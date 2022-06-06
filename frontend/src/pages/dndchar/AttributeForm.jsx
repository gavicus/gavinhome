import { useState, useEffect } from 'react'

export const AttributeForm = ({data, onChange}) => {
  const attributes = ['str','dex','con','int','wis','cha']
  const defaults = Object.fromEntries(attributes.map(a=>[a,8]))
  const [formValues, setFormValues] = useState(defaults)
  const [costs, setCosts] = useState(
    Object.fromEntries(attributes.map(a=>[a,0]))
  )

  useEffect(() => {
    const newCosts = {}
    for (const att of attributes) {
      newCosts[att] = getCost(formValues[att])
    }
    setCosts(newCosts)
  }, [formValues])

  useEffect(() => {
    setFormValues(data)
  }, [data])
  
  const getCost = (value) => {
    const free = 8
    const oneMax = 13
    const twoMax = 15
    return parseInt(value-free) + Math.max(0, value-oneMax) + Math.max(0, value-twoMax);
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

  return (
    <table>
      <thead>
        <tr>
          <th>attr</th>
          <th>base</th>
          <th>cost</th>
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
        </tr>
      ))}
      </tbody>
    </table>
  )
}
