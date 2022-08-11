import { Routes, Route } from 'react-router-dom'

import { HelloCube } from './HelloCube'

export const Threejs = () => {
  return (
    <Routes>
      <Route path="hellocube" element={<HelloCube />} />
    </Routes>
  )
}
