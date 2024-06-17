import React, { useState } from 'react';

interface AddColumnProps {
  addColumn: (name: string) => void;
}

const AddColumn: React.FC<AddColumnProps> = ({ addColumn }) => {
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
    <div>
      <input
        type="text"
        value={newColumnName}
        onChange={handleNewColumnNameChange}
        placeholder="Nombre de la columna"
      />
      <button onClick={handleAddColumn}>Agregar Columna</button>
    </div>
  );
};

export default AddColumn;
