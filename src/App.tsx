import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
      <div className="parametros">
        <h2 className='sub'>Idea</h2>
        <button  id='aggTarea'><p className='agg'>+</p></button>
      </div>
      
      <div className="parametros" ><h2 className='sub'>Iniciando</h2></div>
      <div className="parametros"><h2 className='sub'>Finalizado</h2></div>
      
    </>
  )
}

export default App
