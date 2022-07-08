import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// import styled from 'styled-components'

import gmdocService from '../../features/gmdoc/gmdocService'
import { PageStandard } from '../../components/PageStandard'
import { CampaignForm } from './campaignForm'
import { CharacterForm } from './components/CharacterForm'
import { ButtonMenu } from '../../components/ButtonMenu'
import { TurnOrder } from './TurnOrder'
/**
 * Todo
 * selectedCampaign should default to last campaign
 * which means that this page needs a cache entry with a selectedCampaign field
 */
export const GmTools = () => {
  const [gmdocs, setGmdocs] = useState(null)
  const [campaignList, setCampaignList] = useState()
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [showTab, setShowTab] = useState(null)

  const { user: loggedUser } = useSelector((state) => state.auth)

  const loadGmDocs = () => {
    gmdocService.listGmdocs(loggedUser._id, loggedUser.token)
    .then((docs)=>{
      setGmdocs(docs)
    })
  }

  useEffect(() => {
    if (campaignList) { return; }
    loadGmDocs()
  }, [campaignList, loggedUser._id, loggedUser.token])

  useEffect (() => {
    if (gmdocs) {
      const campaigns = gmdocs.filter(d => d.type === 'campaign')
      setCampaignList(campaigns)
      setSelectedCampaign(campaigns[0]._id)
    }
  }, [gmdocs])

  const handleButtonMenu = (text) => {
    setShowTab(
      previous => previous === text ? null : text
    )
  }

  const handleCampaignSelect = (event) => {
    setSelectedCampaign(event.target.value)
  }

  const handleCampaignSubmit = (data) => {
    console.log({data})
    const gmdoc = { gmId: loggedUser._id, type: 'campaign', doc: data }
    gmdocService.createGmdoc(gmdoc, loggedUser.token)
    setShowTab(null)
  }

  const handleCharacterSubmit = (data) => {
    console.log({data})
    const gmdoc = {
      gmId: loggedUser._id,
      type: "character",
      doc: { ...data, campaign: selectedCampaign },
    };
    gmdocService.createGmdoc(gmdoc, loggedUser.token)
    setShowTab(null)
  }

  const handleTurnOrderChange = () => {
    loadGmDocs()
  }

  const menuOptions = ['campaign','character','turns']
  return (
    <PageStandard title="gm tools">
      {
        campaignList && campaignList.length > 0 &&
        <>
          <span>campaign </span>
          <select name="campaignSelection" onChange={handleCampaignSelect}>
            { campaignList.map(c => (
              <option key={c._id} value={c._id}>
                {c.doc.title}
              </option>
            )) }
          </select>
        </>
      }
      
      <ButtonMenu onClick={handleButtonMenu} options={menuOptions} />
      {
        showTab === 'campaign' &&
        <CampaignForm onSubmit={handleCampaignSubmit} />
      }
      {
        showTab === 'character' &&
        <CharacterForm onSubmit={handleCharacterSubmit} />
      }
      {
        showTab === 'turns' &&
        <TurnOrder loggedUser={loggedUser} gmdocs={gmdocs} onChange={handleTurnOrderChange} />
      }
    </PageStandard>
  )
}
