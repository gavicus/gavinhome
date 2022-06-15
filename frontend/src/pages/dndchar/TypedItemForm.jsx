import { useEffect, useState } from 'react'

export const TypedItemForm = ({title, type, item, onSubmit}) => {
  const [data, setData] = useState({})

  useEffect(() => {
    if (item) {
      setData(item)
    }
  }, [item])

  return (
    <>
      <div>{title}</div>
    </>
  )
}
