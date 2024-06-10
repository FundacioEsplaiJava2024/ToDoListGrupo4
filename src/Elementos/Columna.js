import { useState } from 'react';

export const useTaskManager = () => {
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');

  const handleInputChange = (event) => {
    setTaskName(event.target.value);
  };

  const addTask = () => {
    if (taskName.trim() !== '') {
      setTasks([...tasks, { id: tasks.length + 1, name: taskName }]);
      setTaskName('');
      setCount(count + 1);
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    setCount(count - 1);
  };

  return {
    count,
    tasks,
    taskName,
    handleInputChange,
    addTask,
    deleteTask,
  };
};
