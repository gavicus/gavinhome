
export const ButtonMenu = ({options, onChange}) => {
  const handleClick = (opt) => {
    onChange(opt)
  }

  return (
    <>
    {
      options.map(o => (
        <button onClick={() => handleClick(o)}>{o}</button>
      ))
    }
    </>
  )
}