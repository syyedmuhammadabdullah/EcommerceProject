import { useEffect, useState } from 'react'
import {PrimaryBtn, DefaultBtn, SearchBtn, Divider, InputBox} from "./index"
import SidebarMenu from './components/SidebarMenu'
import ProductForm from './components/Form'
import axios from 'axios'

function App() {
useEffect(() => {
// axios.post('http://localhost:3001/api/v1/sellers/register')
axios.post('http://localhost:3001/api/v1/sellers/login')
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.error(error)
  })
}, [])

  const [count, setCount] = useState(0)

  return (
    <>
  <ProductForm/>
     
    </>
  )
}

export default App
