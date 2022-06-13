import { useState, useEffect } from 'react'

export const FeatList = ({level, items}) => {
  const [feats, setFeats] = useState([])

  useEffect (() => {
    if (!items) { return [] }
    const filtered = items
    .filter(item => parseInt(item.level) <= level && item.type === 'feat')
    setFeats(filtered)
  }, [level, items])

  const effectSummary = (feat) => {
    return feat.effects
    .map(e => `${e.item}:${e.adder}`)
    .join(', ')
  }

  const FeatRow = ({feat}) => {
    return (
      <tr>
        <td>{feat.title}</td>
        <td>({effectSummary(feat)})</td>
      </tr>
    )
  }

  return (
    <section className="form-section skills">
      feats
      <table>
        <tbody>
          {
            feats.map(feat => <FeatRow feat={feat} key={`feat-${feat.id}`} />)
          }
        </tbody>
      </table>
    </section>
  )
}
