import React from 'react';
import { useTaskManager } from './hook/useTaskManager';
import './App.css';
import Columna from './Elementos/tablero';
import Header from './Elementos/header';
import Footer from './Elementos/footer';
import Aside from './Elementos/aside';

const App: React.FC = () => {
  const {
    count,
    tasks,
    taskName,
    handleInputChange,
    addTask,
    deleteTask,
    editTask,
  } = useTaskManager();

  return (
    <>
      <Header/>
      <Columna
        count={count}
        tasks={tasks}
        taskName={taskName}
        handleInputChange={handleInputChange}
        addTask={addTask}
        deleteTask={deleteTask}
        editTask={editTask}
      />
      <Footer />
    </>
  );
}

export default App;
