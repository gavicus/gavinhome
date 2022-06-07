import './ItemList.css'

export const ItemList = ({items, onNew, onEdit}) => {
  const handleClickEntry = (index) => {
    onEdit(index)
  }

  console.log({items})

  const ListEntry = ({item}) => {
    return (
      <tr onClick={() => handleClickEntry(item.id)}>
        <td>{item.title}</td>
        <td>{item.type}</td>
        <td>{item.level}</td>
      </tr>
    )
  }
  
  return (
    <>
      item list
      <section className="controls">
        <button onClick={onNew}>new</button>
      </section>
      <section className="itemList">
        <table>
          <thead>
            <tr>
              <th>title</th>
              <th>type</th>
              <th>level</th>
            </tr>
          </thead>
          <tbody>
          {
            items
            .sort((a,b) => a.level - b.level)
            .map((item, index) => (
              <ListEntry key={`listEntry-${index}`} item={item} />
            ))
          }
          </tbody>
        </table>
      </section>
    </>
  )
}
