import React, { useState } from 'react';
import Elemento from './Elemento';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

export interface ColumnaProps {
  count: number;
  tasks: { id: string; name: string }[];
  name: string;//
  columnId: string;
  addTask: (taskName: string) => void;
  deleteTask: (taskId: string) => void;
  editTask: (taskId: string, newName: string) => void;
  eliminarColumna: () => void; //
  editarNombreColumna: (nuevoNombre: string) => void;//
  moveTask: (taskId: string, sourceColId: string, targetColId: string) => void;
}

const Columna: React.FC<ColumnaProps> = ({ tasks, name, columnId, addTask, deleteTask, editTask, eliminarColumna, editarNombreColumna, moveTask }) => {
  const [taskName, setTaskName] = useState<string>('');
  const [editColumnaName, setEditColumnaName] = useState<string>(name);
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
    setEditColumnaName(name);
  };

  const [, drop] = useDrop({
    accept: ItemTypes.TaskM,
    drop: (item: { id: string; sourceColId: string}) => {
      const targetColId = columnId; 
      moveTask(item.id, item.sourceColId, targetColId);
    },
  });
  return (
    <div ref={drop} className="parametros">
      <div className="column-header">
        {isEditing ? (
          <>
            <input type="text" value={editColumnaName} onChange={handleEditInputChange} />
            <span className='cssIcon' onClick={handleSaveEdit}><FontAwesomeIcon icon={faSave} /></span>
            <span className='cssIcon' onClick={handleCancelEdit}><FontAwesomeIcon icon={faTimes} /></span>
          </>
        ) : (
          <>
            <h2 className='sub'>{name}</h2>
            <span className='cssIcon' onClick={() => setIsEditing(true)}><FontAwesomeIcon icon={faEdit} /></span>
          </>
        )}
        <span className='cssIcon' onClick={eliminarColumna}><FontAwesomeIcon icon={faTrashAlt} /></span>
      </div>
      <input type="text" value={taskName} onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder="Nombre de la tarea" />
      <div className="listas">
        <ul>
          {tasks.map(task => (
            <Elemento
              key={task.id}
              id={task.id}
              title={task.name}
              deleteTask={deleteTask}
              editTask={editTask}
              sourceColId={columnId}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Columna;
