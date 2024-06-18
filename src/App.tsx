import React from 'react';
import { useTaskManager } from './hook/useTaskManager';
import './App.css';

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
  } = useTaskManager();

  return (
    <>
      <Header/>

      <Tablero

        count={count}
        tasks={tasks}
        addTask={addTask}
        deleteTask={deleteTask}
        editTask={editTask}
      />
      <Footer />
    </>
  );
}

export default App;
