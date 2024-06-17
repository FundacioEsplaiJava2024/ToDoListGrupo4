import React from 'react';
import { useTaskManager } from './hook/useTaskManager';
import './App.css';
import Tablero from './Elementos/tablero';

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
      <Tablero
        count={count}
        tasks={tasks}
        taskName={taskName}
        handleInputChange={handleInputChange}
        addTask={addTask}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </>
  );
}

export default App;
