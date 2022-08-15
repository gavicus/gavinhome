import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import dataService from '../../features/data/dataService'
import { PageStandard } from '../../components/PageStandard'
import { ButtonMenu } from '../../components/ButtonMenu'
import { Tablature } from './components/tablature'
import { VidsTab } from './components/VidsTab'

export const Guitar = () => {
  const [currentTab, setCurrentTab] = useState('tablature')
  const [data, setData] = useState(null)

  const { user: loggedUser } = useSelector((state) => state.auth)
  const tabNames = ['songs','backing','tablature']

  const getData = () => {
    dataService.listData(loggedUser._id, loggedUser.token)
    .then((entries)=>{
      setData(entries.filter(e => e.project === "guitar"))
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const handleTabClick = (response) => {
    setCurrentTab(response)
  }

  return (
    <PageStandard title="guitar">
      <ButtonMenu current = {currentTab} options={tabNames} onClick={handleTabClick} />
      { currentTab === 'songs' && <VidsTab data={data} category='songs' currentTab={currentTab} />}
      { currentTab === 'backing' && <VidsTab data={data} category='backing' currentTab={currentTab} />}
      { currentTab === 'tablature' && <Tablature />}
    </PageStandard>
  )
}
