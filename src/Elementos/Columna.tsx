import Elemento from './Elemento';
import { useState } from 'react';
import { Task } from '../domain/Task';

export interface ColumnaProps {
  count: number;
  tasks: { id: number, name: string }[];
  taskName: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addTask: () => void;
  deleteTask: (taskId: number) => void;
  editTask: (taskId: number, newName: string) => void;
}

const Columna: React.FC<ColumnaProps> = ({count, tasks, taskName, handleInputChange, addTask, deleteTask, editTask}) =>{
    return (
      <div className="parametros">
        <h2 className='sub'>Columna <span className='contador'>{"Nº "+count}</span></h2>
        <input type="text" value={taskName} onChange={handleInputChange} placeholder="Nombre de la tarea" />
        <button onClick={addTask} id='aggTarea'>+</button>
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