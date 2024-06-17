import Elemento from './Elemento';
import { useState } from 'react';
import { Task } from '../domain/Task';

export interface ColumnaProps {
  // titulo: string,
  // agregarElemento: ()=>void,
  // elementos: Task[]
  count: number;
  tasks: { id: number, name: string }[];
  //tasks: Task[]
  taskName: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addTask: () => void;
  deleteTask: (taskId: number) => void;
  editTask: (taskId: number, newName: string) => void;
}

function Columna({count, tasks, taskName, handleInputChange, addTask, deleteTask, editTask} : ColumnaProps) {
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskName, setEditTaskName] = useState<string>('');

  const handleEditInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTaskName(event.target.value);
  };

  const handleSaveEdit = (taskId: number) => {
    if (editTaskName.trim() !== '') {
      editTask(taskId, editTaskName);
      setEditTaskId(null);
      setEditTaskName('');
    }
  };

  const handleCancelEdit = () => {
    setEditTaskId(null);
    setEditTaskName('');
  };

    return (
      <div className="parametros">
        <h2 className='sub'>Columna <span className='contador'>{"Nº "+count}</span></h2>
        <input type="text" value={taskName} onChange={handleInputChange} placeholder="Nombre de la tarea" />
        <button onClick={addTask} id='aggTarea'>+</button>
        <div className="listas"></div>
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                <Elemento id={task.id} title={task.name}/>
                {editTaskId === task.id ? (
                  <>
                    <input type="text" value={editTaskName} onChange={handleEditInputChange} />
                    <button onClick={() => handleSaveEdit(task.id)}>Guardar</button>
                    <button onClick={handleCancelEdit}>Cancelar</button>
                  </>
                ) : (
                  <>
                    {task.name}
                    <button onClick={() => deleteTask(task.id)}>Borrar</button>
                    <button onClick={() => { setEditTaskId(task.id); setEditTaskName(task.name); }}>Editar</button>
                  </>
                )}
              </li>
            ))}
          </ul>
      </div>
    );
}
 export default Columna;