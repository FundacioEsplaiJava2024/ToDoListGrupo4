import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EditarIcono, BorrarIcono, GuardarIcono, CancelarIcono } from './iconos';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

export interface ElementoProps {
  id: string;
  title: string;
  deleteTask: (taskId: string) => void;
  editTask: (taskId: string, newName: string) => void;
  sourceColId: string;
}

const Elemento: React.FC<ElementoProps> = ({ id, title, deleteTask, editTask, sourceColId }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTaskName, setEditTaskName] = useState<string>(title);

  const handleEditInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTaskName(event.target.value);
  };

  const handleSaveEdit = () => {
    if (editTaskName.trim() !== '') {
      editTask(id, editTaskName);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTaskName(title);
  };

  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.TaskM,
    item: {id, sourceColId},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [id])

  const taskStyle = {
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li ref={drag} style={taskStyle}>
      {isEditing ? (
        <>
          <input type="text" value={editTaskName} onChange={handleEditInputChange} />
          <div className="icons">
            <span onClick={handleSaveEdit}><FontAwesomeIcon icon={GuardarIcono} /></span>
            <span onClick={handleCancelEdit}><FontAwesomeIcon icon={CancelarIcono} /></span>
          </div>
          
        </>
      ) : (
        <>
        <p>
          {title}
        </p>
          
          <div className="icons">
            <span onClick={() => deleteTask(id)}><FontAwesomeIcon icon={BorrarIcono} /></span>
            <span onClick={() => setIsEditing(true)}><FontAwesomeIcon icon={EditarIcono} /></span>
          </div>
          
        </>
      )}
    </li>
  );
};

export default Elemento;
