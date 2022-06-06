

export const ItemList = ({items, onEdit}) => {
  return (
    <>
      item list
      <section className="controls">
        <button onClick={onEdit}>new</button>
      </section>
      <section className="list">
        {
          items
          .sort((a,b) => a.level - b.level)
          .map(item => (
            <div key={`${item.title}(${item.level}:${item.type})`}>
              {item.title}({item.level}:{item.type})
            </div>
          ))
        }
      </section>
    </>
  )
}
