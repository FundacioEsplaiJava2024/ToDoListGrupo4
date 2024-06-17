import React from 'react';
import { useTaskManager } from './hook/useTaskManager';
import './App.css';
import Tablero from './Elementos/tablero';

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
      <Tablero
        count={count}
        tasks={tasks}
        addTask={addTask}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </>
  );
}

export default App;
