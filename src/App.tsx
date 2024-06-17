import './App.css';
<<<<<<< HEAD
import { App } from './main';
=======
import Columna from './Elementos/tablero';

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
      <Columna
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
>>>>>>> fb133e662848cb211d8c3f76ef211878bf6c2b17

export default App;
