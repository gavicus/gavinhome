import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import gmdocService from '../../features/gmdoc/gmdocService'
import { PageStandard } from '../../components/PageStandard'
import { CampaignForm } from './campaignForm'

const ElementStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`

export const GmTools = () => {
  const [campaignList, setCampaignList] = useState()
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [showCampaignForm, setShowCampaignForm] = useState(false)
  const { user: loggedUser } = useSelector((state) => state.auth)

  useEffect(() => {
    if (campaignList) { return; }
    gmdocService.listGmdocs(loggedUser._id, loggedUser.token)
    .then((docs)=>{
      const campaigns = docs.filter(d => d.type === 'campaign')
      setCampaignList(campaigns)
    })
  }, [campaignList, loggedUser._id, loggedUser.token])

  const handleClickNewCampaign = () => {
    setShowCampaignForm(previous => !previous)
  }

  const handleCampaignSelect = (event) => {
    setSelectedCampaign(event.target.value)
  }

  const handleCampaignSubmit = (data) => {
    console.log({data})
    const gmdoc = {
      gmId: loggedUser._id,
      type: 'campaign',
      doc: data,
    }
    gmdocService.createGmdoc(gmdoc, loggedUser.token)
  }

  console.log({campaignList})

  return (
    <PageStandard title="gm tools">
      <ElementStack>
        {
          campaignList && campaignList.length > 0 &&
          <>
            <span>campaigns</span>
            <select name="campaignSelection" onChange={handleCampaignSelect}>
              { campaignList.map(c => (
                <option key={c.doc.title} value={c.doc.title}>
                  {c.doc.title}
                </option>
              )) }
            </select>
          </>
        }
        <button onClick={handleClickNewCampaign}>new campaign</button>
      </ElementStack>
      {
        showCampaignForm &&
        <CampaignForm onSubmit={handleCampaignSubmit} />
      }
    </PageStandard>
  )
}
