import Elemento from './Elemento';
import { useState } from 'react';
import { Task } from '../domain/Task';

export interface ColumnaProps {
  count: number;
  tasks: { id: number, name: string }[];
  addTask: (taskName: string) => void;
  deleteTask: (taskId: number) => void;
  editTask: (taskId: number, newName: string) => void;
}

const Columna: React.FC<ColumnaProps> = ({count, tasks, addTask, deleteTask, editTask}) =>{
  const [taskName, setTaskName] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleAddTask = () => {
    if (taskName.trim() !== '') {
      addTask(taskName);
      setTaskName('');
    }
  };
  
  return (
      <div className="parametros">
        <h2 className='sub'>Columna <span className='contador'>{"Nº "+count}</span></h2>
        <input type="text" value={taskName} onChange={handleInputChange} placeholder="Nombre de la tarea" />
        <button onClick={handleAddTask} id='aggTarea'>+</button>
        <div className="listas"></div>
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                <Elemento
                  id = {task.id}
                  title = {task.name}
                  deleteTask = {deleteTask}
                  editTask = {editTask}
                  />
              </li>
            ))}
          </ul>
      </div>
    );
}
 export default Columna;