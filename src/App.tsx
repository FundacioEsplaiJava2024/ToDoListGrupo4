import { useTaskManager } from './hook/useTaskManager';
import Columna from './Elementos/tablero';
import React from 'react';
import './App.css';
import './Elementos/fontAwesomeSetup';
import Tablero from './Elementos/tablero';
import Header from './Elementos/header';
import Footer from './Elementos/footer';
import Aside from './Elementos/aside';

const App: React.FC = () => {
  const {
    count,
    tasks,
    addTask,
    deleteTask,
    editTask,
    handleDragStart,
    enableDropping,
    handleDrop,
  } = useTaskManager();

  return (
    <>
      <Header/>

      <Tablero

        count={count}
        tasks={tasks}
        addTask={addTask}
        deleteTask={deleteTask}
        handleDragStart={handleDragStart}
        enableDropping={enableDropping}
        handleDrop={handleDrop}
        editTask={editTask}
      />
      <Footer />
    </>
  );
}

export default App;
