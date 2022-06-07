import { useState } from 'react'

import './NotesForm.css'

export const NotesForm = ({items, onChange}) => {
  const [newNote, setNewNote] = useState('')
  const [editing, setEditing] = useState(false)
  const [editingIndex, setEditingIndex] = useState(0)

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = () => {
    if (editing) {
      const notes = [
        ...(items.slice(0,editingIndex)),
        newNote,
        ...(items.slice(editingIndex+1,items.length)),
      ]
      onChange(notes)
      setEditing(false)
    } else {
      onChange([
        ...items,
        newNote,
      ])
    }
    setNewNote('')
  }

  const handleCancel = () => {
    setNewNote('')
    setEditing(false)
  }

  const removeNote = (index) => {
    console.log({items,index})
    onChange([
      ...(items.slice(0,index)),
      ...(items.slice(index+1,items.length))
    ])
  }

  const editNote = (index) => {
    const text = items[index]
    setNewNote(text)
    setEditing(true)
    setEditingIndex(index)
  }

  const NoteDisplay = ({item, index}) => {
    return (
      <div className="noteDisplay">
        <button className="removeButton" onClick={() => removeNote(index)}>x</button>
        <span>{item}</span>
        <button className="editButton" onClick={() => editNote(index)}>edit</button>
      </div>
    )
  }

  return (
    <>
      <p>notes</p>
      {items && items.map((item, index) => <NoteDisplay key={`note-${index}`} item={item} index={index} />)}
      <section className="entryField">
        <textarea type="text" onChange={handleChange} value={newNote} />
        <button onClick={handleSubmit}>submit</button>
        <button onClick={handleCancel}>cancel</button>
      </section>
    </>
  )
}