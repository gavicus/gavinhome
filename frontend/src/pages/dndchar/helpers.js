
export const getNextItemId = (itemArray) => {
  let id = 0
  for (const item of itemArray) {
    if (item.hasOwnProperty('id')) {
      const itemId = parseInt(item.id)
      if (itemId >= id) {
        id = itemId + 1
      }
    }
  }
  return id
}
