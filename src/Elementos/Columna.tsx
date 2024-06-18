import React, { useState } from 'react';
import Elemento from './Elemento';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

export interface ColumnaProps {
  count: number;
  tasks: { id: number; name: string }[];
  addTask: (taskName: string) => void;
  deleteTask: (taskId: number) => void;
  editTask: (taskId: number, newName: string) => void;
  eliminarColumna: () => void;
  editarNombreColumna: (nuevoNombre: string) => void;
  nombre: string;
}

const Columna: React.FC<ColumnaProps> = ({
  count,
  tasks,
  addTask,
  deleteTask,
  editTask,
  eliminarColumna,
  editarNombreColumna,
  nombre,
}) => {
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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  const [editColumnaName, setEditColumnaName] = useState<string>(nombre);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditColumnaName(event.target.value);
  };

  const handleSaveEdit = () => {
    if (editColumnaName.trim() !== '') {
      editarNombreColumna(editColumnaName);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditColumnaName(nombre);
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
  };

  const handleEditTask = (taskId: number, newName: string) => {
    editTask(taskId, newName);
  };

  return (
    <div className="parametros">
      <div className="column-header">
        {isEditing ? (
          <>
            <input type="text" value={editColumnaName} onChange={handleEditInputChange} />
            <button onClick={handleSaveEdit}><FontAwesomeIcon icon={faSave} /></button>
            <button onClick={handleCancelEdit}><FontAwesomeIcon icon={faTimes} /></button>
          </>
        ) : (
          <>
            <h2 className='sub'>{nombre}</h2>
            <button onClick={() => setIsEditing(true)}><FontAwesomeIcon icon={faEdit} /></button>
          </>
        )}
        <button onClick={eliminarColumna}><FontAwesomeIcon icon={faTrashAlt} /></button>
      </div>
      <input
        type="text"
        value={taskName}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Nombre de la tarea"
      />
      <button onClick={handleAddTask}><FontAwesomeIcon icon={faPlus} /> Añadir Tarea</button>
      <div className="listas">
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <Elemento
                id={task.id}
                title={task.name}
                deleteTask={() => handleDeleteTask(task.id)}
                editTask={(newName) => handleEditTask(task.id, newName)} 
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Columna;
