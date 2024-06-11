import { useTaskManager } from './hook/useTaskManager';
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

  return (
    <>
      <Columna
        count={count}
        tasks={tasks}
        taskName={taskName}
        handleInputChange={handleInputChange}
        addTask={addTask}
        deleteTask={deleteTask}
      />
    </>
  );
}

export default App;
