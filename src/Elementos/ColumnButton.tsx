import React, { useState } from 'react';
import { useTaskManager } from '../hook/useTaskManager';

const ColumnButton: React.FC = () => {
  const { addColumn } = useTaskManager();
  const [newColumnName, setNewColumnName] = useState('');

  const handleNewColumnNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewColumnName(event.target.value);
  };

  const handleAddColumn = () => {
    if (newColumnName.trim() !== '') {
      addColumn(newColumnName);
      setNewColumnName('');
    }
  };

  return (
    <div className="column-buttons">
      <input type="text" value={newColumnName} onChange={handleNewColumnNameChange} placeholder="Nombre de la columna" />
      <button onClick={handleAddColumn}>Agregar Columna</button>
    </div>
  );
}

export default ColumnButton;