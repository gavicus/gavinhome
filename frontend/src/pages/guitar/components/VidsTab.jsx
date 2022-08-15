import { useState } from 'react'
import styled from 'styled-components'

import { VidForm } from './VidForm'

const VidList = styled.div`
  margin: 20px;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, 160px);
`

const VidEntry = styled.a`
  margin-top: 10px;
  width: fit-content;
  cursor: pointer;
  display: grid;
  justify-items: start;
  gap: 5px;
  img {
    max-width: 150px;
  }
  div {
    font-size: .8em;
    line-height: 1em;
    width: 150px;
  }
`

export const VidsTab = ({data, category, currentTab}) => {
  const [showCreateForm, setShowCreateForm] = useState(false)

  const handleCloseForm = () => {
    setShowCreateForm(false)
  }

  return (
    <>
      <div>{category}</div>
      {
        currentTab === category && showCreateForm
        ?
        <VidForm category={category} onClose={handleCloseForm} />
        :
        <>
          <button onClick={() => setShowCreateForm(true)}>new</button>
          <VidList>
            {
              data &&
              data
                .filter(d => d.doc.category===category)
                .map((d, index) => (
                  <VidEntry key={`${index}`} href={d.doc.url} target="_blank">
                    <img src={d.doc.thumbUrl} alt="thumbnail" />
                    <div>{d.doc.title}</div>
                  </VidEntry>
                ))
            }
          </VidList>
        </>
      }
    </>
  )
}
