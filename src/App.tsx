import { useState } from 'react'
import './App.css'
import Form from './components/FormValidation/form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h3>Form Validation</h3>
      <Form />
    </>
  )
}

export default App
