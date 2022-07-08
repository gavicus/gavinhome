import { useEffect, useState } from 'react'
import styled from 'styled-components'

import gmdocService from '../../features/gmdoc/gmdocService'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledLeftPane = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: .8em;
`

const StyledRightPane = styled.div`
  border: 1px solid gray;
  padding: 10px;
`

const StyledTable = styled.table`
  border-collapse: collapse;
`

const StyledSegmentDatum = styled.td`
  font-size: .7em;
  padding: 8px;
  border-right: 1px solid gray;
  &.current {
    color: yellow;
    background: #444;
    font-weight: bold;
  }
`

const StyledHeader = styled.th`
  font-weight: normal;
  &.current {
    font-weight: bold;
  }
  text-align: center;
`

const Controls = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: center;
  margin-bottom: 10px;
`

const ControlButton = styled.button`
  padding: 5px;
`

export const TurnOrder = ({loggedUser, gmdocs, onChange}) => {
  const [characters, setCharacters] = useState(null)
  const [segments, setSegments] = useState(null)
  const [rows, setRows] = useState(null)
  const [selection, setSelection] = useState(null)
  
  useEffect(() => {
    if (gmdocs) {
      setCharacters(gmdocs.filter(d => d.type === 'character'))
      if (!selection) {
        const cache = gmdocs.find(d => d.type === 'cache')
        if (cache) {
          setSelection(cache.doc.turnOrder)
        }
      }
    }
  }, [gmdocs])

  useEffect(() => {
    computeSegments()
  }, [characters])

  useEffect(()=>{
    computeRows()
  },[
    segments
  ])

  const speedInSegment = (speed, segment) => {
    if (speed === 12) return true;
    if (segment === 12 && speed > 1) return true;
    if (segment === 2 && speed > 5) return true;
    if (segment === 3 && (speed === 4 || speed === 5 || speed > 7)) return true;
    if (segment === 4 && (speed === 3 || speed === 6 || speed === 7 || speed > 8)) return true;
    if (segment === 5 && (speed === 5 || speed === 8 || speed > 9)) return true;
    if (segment === 6 && (speed === 2 || speed === 4 || speed > 5)) return true;
    if (segment === 7 && (speed === 1 || speed === 7 || speed === 9 || speed > 10)) return true;
    if (segment === 8 && (speed === 3 || speed === 5 || speed === 6 || speed > 7)) return true;
    if (segment === 9 && (speed === 4 || speed === 7 || speed === 8 || speed > 9)) return true;
    if (segment === 10 && (speed === 5 || speed === 6 || speed > 8)) return true;
    if (segment === 11 && speed > 6) return true;
    return false;
  }

  const computeSegments = () => {
    if (!characters) return;
    const segs = {}
    for (let i=1; i<=12; ++i) {
      const segAry = []
      for (const char of characters) {
        const speed = parseInt(char.doc.speed)
        if (speedInSegment(speed, i)) {
          segAry.push(char)
        }
      }
      segAry.sort((a,b) => parseInt(b.doc.dex) - parseInt(a.doc.dex))
      segs[i] = segAry
    }
    setSegments(segs)
  }

  const computeRows = () => {
    if (!segments) return

    const tempRows = []
    let row = 0
    while (true) {
      let thisRow = []
      let found = false
      for (let column=1; column<=12; ++column) {
        if (segments[column].length > row) {
          thisRow[column] = segments[column][row]
          found = true
        } else {
          thisRow[column] = null
        }
      }
      if (found) {
        tempRows.push(thisRow)
        ++row;
      } else {
        break
      }
    }
    setRows(tempRows)
  }
  
  const changeCache = (name, value) => {
    const cache = gmdocs.find(d => d.type === 'cache')
    if (!cache) return
    cache.doc.turnOrder[name] = value
    gmdocService.updateGmdoc(cache, loggedUser.token)
    onChange()
  }

  const setCache = (data) => {
    setSelection(data)
    const cache = gmdocs.find(d => d.type === 'cache')
    cache.doc.turnOrder = data
    gmdocService.updateGmdoc(cache, loggedUser.token)
    onChange()
  }

  const getCache = (name) => {
    const cache = gmdocs.find(d => d.type === 'cache')
    if (!cache) return null
    return cache.doc.turnOrder[name]
  }

  const handleNextTurn = (back) => {
    let segmentIndex = selection.segmentIndex
    let rowIndex = selection.rowIndex
    const nextSegment = () => {
      do {
        if (back) {
          segmentIndex--
          if (segmentIndex < 1) { segmentIndex = 12 }
        } else {
          segmentIndex++
          if (segmentIndex > 12) { segmentIndex = 1 }
        }
      } while (segments[segmentIndex].length === 0)
    }
    if (back) {--rowIndex} else {++rowIndex}
    if (rowIndex >= segments[segmentIndex].length || rowIndex < 0) {
      nextSegment()
      if (back) {
        rowIndex = segments[segmentIndex].length-1
      } else {
        rowIndex = 0
      }
    }
    const newCache = {segmentIndex,rowIndex}
    setCache(newCache)
  }

  const handleReset = () => {
    changeCache('segmentIndex',12)
    changeCache('rowIndex',0)
  }

  const TurnChart = () => {
    let keyIndex = 0
    return (
      <>
        <Controls>
          <ControlButton onClick={handleReset}>reset</ControlButton>
          <ControlButton onClick={() => handleNextTurn(true)}>back</ControlButton>
          <ControlButton onClick={() => handleNextTurn(false)}>next</ControlButton>
        </Controls>
        <StyledTable>
          <thead>
            <tr>
              {
                Object.keys(segments).map(k => {
                  ++keyIndex
                  return (
                    <StyledHeader
                      key={`header-${keyIndex}`}
                      className={
                        parseInt(k) === selection.segmentIndex ? "current" : ""
                      }
                    >
                      {k}
                    </StyledHeader>
                  );
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              rows.map((row, thisIndex) => {
                ++keyIndex
                return (
                  <tr key={`row-${keyIndex}`}>
                    {
                      row.map((entry, columnIndex) => {
                        ++keyIndex
                        return (
                          <StyledSegmentDatum
                            key={`datum-${keyIndex}`}
                            className={
                              thisIndex === selection.rowIndex
                              && columnIndex === selection.segmentIndex
                                ? "current"
                                : ""
                            }
                          >
                            {entry ? entry.doc.name : null}
                          </StyledSegmentDatum>
                        );
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </StyledTable>
      </>
    )
  }

  return (
    <>
      <p>turns</p>
      <StyledWrapper>
        { characters &&
          <StyledLeftPane>
            {
              characters.map(c => <p key={c._id}>{c.doc.player} / {c.doc.name}</p>)
            }
          </StyledLeftPane>
        }
        { rows &&
          <StyledRightPane>
            <TurnChart/>
          </StyledRightPane>
        }
      </StyledWrapper>
    </>
  )
}
