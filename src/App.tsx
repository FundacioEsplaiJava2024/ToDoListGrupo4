import { useTaskManager } from './Elementos/useTaskManager';
import Columna from './Columna';
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
