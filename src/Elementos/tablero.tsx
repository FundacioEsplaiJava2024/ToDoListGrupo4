import React, { useState } from 'react';

interface Task {
  id: number;
  name: string;
}

interface Column {
  id: number;
  name: string;
  tasks: Task[];
}

interface TableroProps {
  column: Column;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addTask: (columnId: number) => void;
  deleteTask: (columnId: number, taskId: number) => void;
  editTask: (columnId: number, taskId: number, newName: string) => void;
}

const Tablero: React.FC<TableroProps> = ({ column, handleInputChange, addTask, deleteTask, editTask }) => {
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskName, setEditTaskName] = useState<string>('');

  const handleEditInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTaskName(event.target.value);
  };

  const handleSaveEdit = (taskId: number) => {
    if (editTaskName.trim() !== '') {
      editTask(column.id, taskId, editTaskName);
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
      <h2 className='sub'>{column.name} <span>{column.tasks.length}</span></h2>
      <input type="text" onChange={handleInputChange} placeholder="Nombre de la tarea" />
      <button onClick={() => addTask(column.id)} id='aggTarea'>+</button>
      <div className="listas">
        <ul>
          {column.tasks.map(task => (
            <li key={task.id}>
              {editTaskId === task.id ? (
                <>
                  <input type="text" value={editTaskName} onChange={handleEditInputChange} />
                  <button onClick={() => handleSaveEdit(task.id)}>Guardar</button>
                  <button onClick={handleCancelEdit}>Cancelar</button>
                </>
              ) : (
                <>
                  {task.name}
                  <button onClick={() => deleteTask(column.id, task.id)}>Borrar</button>
                  <button onClick={() => { setEditTaskId(task.id); setEditTaskName(task.name); }}>Editar</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tablero;
