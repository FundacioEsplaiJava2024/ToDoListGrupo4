import React from 'react';
import { useTaskManager } from './hook/useTaskManager';
import './App.css';
import Tablero from './Elementos/tablero';
import Header from './Elementos/header';
import Footer from './Elementos/footer';
import Aside from './Elementos/aside';
import AddColumn from './Elementos/AddColumn';

const App: React.FC = () => {
  const {
    count,
    tasks,

    columns,

    addTask,
    deleteTask,
    editTask,
    addColumn,
    deleteColumn,
    editColumnName,
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
            tasks={tasks}
            addTask={addTask}
            deleteTask={deleteTask}
            editTask={editTask}
            deleteColumn={deleteColumn}
            editColumnName={editColumnName}
            count={count}
          />
            <Footer/>
        ))}
      </div>

    </>
  );
};

export default App;
