import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');

  const handleInputChange = (event) => {
    setTaskName(event.target.value);
  };

  const addTask = () => {
    if (taskName.trim() !== '') {
      setTasks([...tasks, { id: tasks.length + 1, name: taskName }]);
      setTaskName('');
      setCount(count + 1); // Incrementa el contador al añadir una tarea
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    setCount(count -1);
  };

  return (
    <>
      <div className="parametros">
        <h2 className='sub'>Idea <span> {count}</span></h2>
        <input type="text" value={taskName} onChange={handleInputChange} placeholder="Nombre de la tarea" />
        <button onClick={addTask} id='aggTarea'>+</button>
        <div className="listas">
          
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                {task.name}
                <button onClick={() => deleteTask(task.id)}>Borrar</button>
              </li>
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