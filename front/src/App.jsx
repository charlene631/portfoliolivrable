import { 
  BrowserRouter, 
  Routes, 
  Route 
} from 'react-router-dom'

import Home from './Pages/Home'
import Connect from './Pages/Connect'
import CreateAccount from './Pages/CreateAccount'
import Document from './Pages/Document'


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/connect' element={<Connect/>} />
        <Route path='/createaccount' element={<CreateAccount/>} />
        <Route path='/document' element={<Document/>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
