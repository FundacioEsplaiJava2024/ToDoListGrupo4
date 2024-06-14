import { useTaskManager, useTaskMove } from './hook/useTaskManager';
import Columna from './Elementos/tablero';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const {
    count,
    tasks,
    taskName,
    handleInputChange,
    addTask,
    deleteTask,
  } = useTaskManager();

  const {
    handleDragStart,
    enableDropping,
    handleDrop,
  } = useTaskMove();

  return (
    <>
      <Columna
        count={count}
        tasks={tasks}
        taskName={taskName}
        handleInputChange={handleInputChange}
        addTask={addTask}
        deleteTask={deleteTask}
        handleDragStart={handleDragStart}
        enableDropping={enableDropping}
        handleDrop={handleDrop}
      />
    </>
  );
}

export default App;
