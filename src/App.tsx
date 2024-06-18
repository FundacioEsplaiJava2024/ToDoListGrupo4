import React from 'react';
import './App.css';

import Tablero from './Elementos/tablero';
import Header from './Elementos/header';
import Footer from './Elementos/footer';
import Aside from './Elementos/aside';
import { useTaskManager } from './hook/useTaskManager'; // Asumiendo que useTaskManager contiene la lógica para manejar tareas

const App: React.FC = () => {
  const { count, tasks, addTask, deleteTask, editTask } = useTaskManager();

  return (
    <>
      <Header />
      <main>
        <Aside />
        <Tablero
          count={count}
          tasks={tasks}
          addTask={addTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      </main>
      <Footer />
    </>
  );
};

export default App;
