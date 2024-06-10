import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);// Se crea la variable para el contador   
  const [tasks, setTasks] = useState([]);// Se crea la variable para poner el numero de las tareas que hay
  const [taskName, setTaskName] = useState('');// Se crea la variable para poner el nombre de las tareas

  const handleInputChange = (event) => {// Se crea el evento para hacer set en el nombre de la tarea
    setTaskName(event.target.value);
  };

  const addTask = () => {// metodo para añadir las tareas
    if (taskName.trim() !== '') {// Verifica que el nombre nombre no esta vacio, si esta vacio no añadirá la tarea
      setTasks([...tasks, { id: tasks.length + 1, name: taskName }]);// actualiza las tasks, como id tiene la posición del array y como nombre el nombre que le pones a la tarea
      setTaskName('');// Vuelve a setear el campo de la tarea para que se pueda escribir una tarea nueva
      setCount(count + 1); // Incrementa el contador al añadir una tarea
    }//Crea una nueva lista de tareas que incluye todas las tareas anteriores más la nueva tarea.
  };

  const deleteTask = (taskId) => {// crea un metodo que coge el taskid como parámetro
    const updatedTasks = tasks.filter(task => task.id !== taskId);// filtro para eliminar solo la tarea que tenga el mismoid
    setTasks(updatedTasks);// actualiza la lista de tareas sin poner la eliminada
    setCount(count -1);// Resta una tarea al conteo
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