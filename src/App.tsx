import React from 'react';
import { useTaskManager } from './hook/useTaskManager';
import './App.css';
import Tablero from './Elementos/tablero';
import Header from './Elementos/header';
import Aside from './Elementos/aside';
import AddColumn from './Elementos/AddColumn';

const App: React.FC = () => {
  const {
    count,
    columns,
    taskName,
    handleInputChange,
    addTask,
    deleteTask,
    editTask,
    addColumn,
  } = useTaskManager();

  return (
    <>
      <Header />
      <Aside />
      <AddColumn addColumn={addColumn} />
      <div className="columns-container">
        {columns.map(column => (
          <Tablero
            key={column.id}
            column={column}
            handleInputChange={handleInputChange}
            addTask={addTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))}
      </div>
    </>
  );
};

export default App;
