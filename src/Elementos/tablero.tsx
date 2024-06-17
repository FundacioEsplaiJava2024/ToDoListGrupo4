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
  deleteColumn: (columnId: number) => void;
  editColumnName: (columnId: number, newName: string) => void;
}

const Tablero: React.FC<TableroProps> = ({
  column,
  handleInputChange,
  addTask,
  deleteTask,
  editTask,
  deleteColumn,
  editColumnName,
}) => {
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskName, setEditTaskName] = useState<string>('');
  const [editColumnNameState, setEditColumnNameState] = useState<boolean>(false);
  const [newColumnName, setNewColumnName] = useState<string>(column.name);

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

  const handleColumnNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewColumnName(event.target.value);
  };

  const handleSaveColumnName = () => {
    if (newColumnName.trim() !== '') {
      editColumnName(column.id, newColumnName);
      setEditColumnNameState(false);
    }
  };

  return (
    <div className="parametros">
      <h2 className='sub'>
        {editColumnNameState ? (
          <>
            <input
              type="text"
              value={newColumnName}
              onChange={handleColumnNameChange}
            />
            <span onClick={handleSaveColumnName} style={{ cursor: 'pointer', marginLeft: '5px' }}>💾</span>
            <span onClick={() => setEditColumnNameState(false)} style={{ cursor: 'pointer', marginLeft: '5px' }}>❌</span>
          </>
        ) : (
          <>
            {column.name} <span>{column.tasks.length}</span>
            <span onClick={() => setEditColumnNameState(true)} style={{ cursor: 'pointer', marginLeft: '5px' }}>✏️</span>
            <span onClick={() => deleteColumn(column.id)} style={{ cursor: 'pointer', marginLeft: '5px' }}>🗑️</span>
            <span onClick={() => addTask(column.id)} style={{ cursor: 'pointer', marginLeft: '5px' }}>➕</span>
          </>
        )}
      </h2>
      <input type="text" onChange={handleInputChange} placeholder="Nombre de la tarea" />
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
