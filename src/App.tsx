import { useState } from 'react'
import './App.css'
¡
function App() {
<script id='a' src='Elementos/Columna.js'></script>

  const handleInputChange = (event) => {// Se crea el evento para hacer set en el nombre de la tarea
    setTaskName(event.target.value);
  };

 
  return (
    <>
    
      <div className="parametros">
        <h2 className='sub'>Idea <span> {count}</span></h2>
        <input type="text" value={taskName} onChange={handleInputChange} placeholder="Nombre de la tarea" />
        <button onClick={addTask} id='aggTarea'>+</button>
        <div className="listas">
          {/* Cuando haces click en el botón de + se añade la tarea que hemos escrito en el campo de texto que llama a la funcion addTask */}
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                {task.name}
                <button onClick={() => deleteTask(task.id)}>Borrar</button>
              </li>
              // Se crea un mapeo de las tareas coge el id de la tarea y con el botón de borrar lo elimina de la lista.
            ))}
          </ul>
        </div>
      </div>
      <div className="parametros" ><h2 className='sub'>Iniciando</h2></div>
      <div className="parametros"><h2 className='sub'>Finalizado</h2></div>
    </>
  );
}

export default App;