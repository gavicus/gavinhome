import { useState } from 'react'

import { ItemForm } from './ItemForm'
import { ItemList } from './ItemList'

export const ItemBox = ({items, onChange}) => {
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editId, setEditId] = useState(0)

  const getNextId = () => {
    let id = 0
    for (const item of items) {
      if (item.hasOwnProperty('id')) {
        const itemId = parseInt(item.id)
        if (itemId >= id) {
          id = itemId + 1
        }
      }
    }
    return id
  }

  const onSaveItem = (data) => {
    console.log({onSaveItem: data})
    if (data) { // if data is null then the user hit cancel
      if (editing) {
        const others = items.filter(item => item.id !== data.id)
        onChange([ ...others, data ])
      } else {
        data.id = getNextId()
        onChange([ ...items, data ])
      }
    }
    setShowForm(false)
  }

  const onEdit = (id) => {
    console.log({onEdit: id})

    setEditId(id)
    setEditing(true)
    setShowForm(true)
  }

  const showItemForm = () => {
    setShowForm(true)
  }

  const getEditItem = () => {
    if (!editing) { return null }
    return items.find(item => {
      if (item.hasOwnProperty('id')) {
        if (item.id === editId) { return item }
      }
    })
  }

  return (
    <>
      {
        showForm
        ?
        <ItemForm onSave={onSaveItem} item={getEditItem()} />
        :
        <ItemList items={items} onNew={showItemForm} onEdit={onEdit} />
      }
    </>
  )
}