import { Elemento } from './Elemento';
import { useState } from 'react';
import { Task } from '../domain/Task';

export interface ColumnaProps {
  // titulo: string,
  // agregarElemento: ()=>void,
  // elementos: Task[]
  count: number;
  //tasks: { id: number, name: string }[];
  tasks: Task[]
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
            {tasks.map((elemento, index) => (
              <li key={index}>
                <Elemento id={index} title={elemento.title}/>
                {editTaskId === index ? (
                  <>
                    <input type="text" value={editTaskName} onChange={handleEditInputChange} />
                    <button onClick={() => handleSaveEdit(index)}>Guardar</button>
                    <button onClick={handleCancelEdit}>Cancelar</button>
                  </>
                ) : (
                  <>
                    {elemento.title}
                    <button onClick={() => deleteTask(index)}>Borrar</button>
                    <button onClick={() => { setEditTaskId(index); setEditTaskName(elemento.title); }}>Editar</button>
                  </>
                )}
              </li>
            ))}
          </ul>
      </div>
    );
}
 export default Columna;