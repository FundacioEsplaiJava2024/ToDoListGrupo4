import { useTaskManager } from './hook/useTaskManager';

import './App.css';

function App() {
  const {
    count,
    tasks,
    taskName,
    handleInputChange,
    addTask,
    deleteTask,
  } = useTaskManager();

  return (
    <>
      <div className="parametros">
        <h2 className='sub'>Idea <span>{count}</span></h2>
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
      <div className="parametros"><h2 className='sub'>Iniciando</h2></div>
      <div className="parametros"><h2 className='sub'>Finalizado</h2></div>
    </>
  );
}

export default App;
