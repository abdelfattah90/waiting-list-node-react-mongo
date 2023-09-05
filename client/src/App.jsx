import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'
import Update from './pages/Update'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add-client' element={<Add />} />
          <Route path='/update/:id' element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
