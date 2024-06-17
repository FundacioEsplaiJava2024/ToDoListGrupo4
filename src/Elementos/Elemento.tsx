import React, { useState } from 'react';

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
          <button onClick={handleSaveEdit}>Guardar</button>
          <button onClick={handleCancelEdit}>Cancelar</button>
        </>
      ) : (
        <>
          {title}
          <button onClick={() => deleteTask(id)}>Borrar</button>
          <button onClick={() => setIsEditing(true)}>Editar</button>
        </>
      )}
    </>
  );
};

export default Elemento;
