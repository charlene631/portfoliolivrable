import { 
  BrowserRouter, 
  Routes, 
  Route 
} from 'react-router-dom'

import Home from './Pages/Home'
import Connect from './Pages/Connect'
import CreateAccount from './Pages/CreateAccount'
import Document from './Pages/Document'
import { useState } from 'react'
import { useEffect } from 'react'

function App() {
  const [category, setCategory] = useState("")

  useEffect(()=>{
    fetch("http://localhost:3000/categories/getAll")
      .then((r)=>{
        if(r.ok){
          return r.json()
        }
      })
      .then((data)=>{
        console.log(data)
        setCategory(data)
      })
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home data={category}/>} />
        <Route path='/connect' element={<Connect/>} />
        <Route path='/createaccount' element={<CreateAccount/>} />
        <Route path='/document' element={<Document/>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
