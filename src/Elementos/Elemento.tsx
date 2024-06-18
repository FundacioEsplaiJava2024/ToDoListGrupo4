import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EditarIcono, BorrarIcono, GuardarIcono, CancelarIcono } from './iconos';


export interface ElementoProps {
  id: number;
  title: string;
  deleteTask: (taskId: number) => void;
  editTask: (taskId: number, newName: string) => void;
}

const Elemento: React.FC<ElementoProps> = ({ id, title, deleteTask, editTask }) => {
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

  return (
    <>
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
    </>
  );
};

export default Elemento;
