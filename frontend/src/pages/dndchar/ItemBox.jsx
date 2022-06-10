import { useState, useEffect } from 'react'

import { ItemForm } from './ItemForm'
import { ItemList } from './ItemList'
import { getNextItemId } from './helpers'

export const ItemBox = ({items, onChange, onDelete}) => {
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editId, setEditId] = useState(0)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect (() => {
    if (!editing) {
      setSelectedItem(null)
      return
    }
    const item = items.find(item => {
      if (item.hasOwnProperty('id')) {
        if (item.id === editId) { return item }
      }
    })
    setSelectedItem(item)
  }, [editing, editId])

  const handleDelete = (id) => {
    setEditing(false)
    setShowForm(false)
    setSelectedItem(null)
    onDelete(id)
  }

  const onSaveItem = (data) => {
    if (data) { // if data is null then the user hit cancel
      if (editing) {
        const others = items.filter(item => item.id !== data.id)
        onChange([ ...others, data ])
      } else {
        data.id = getNextItemId(items)
        onChange([ ...items, data ])
      }
    }
    setShowForm(false)
  }

  const onEdit = (id) => {
    setEditId(id)
    setEditing(true)
    setShowForm(true)
  }

  const showItemForm = () => {
    setShowForm(true)
  }

  return (
    <section className="form-section items">
      {
        showForm
        ?
        <ItemForm onSave={onSaveItem} onDelete={handleDelete} item={selectedItem} />
        :
        <ItemList items={items} onNew={showItemForm} onEdit={onEdit} />
      }
    </section>
  )
}
