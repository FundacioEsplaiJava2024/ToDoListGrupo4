import { useState } from 'react';

interface Task {
  id: number;
  name: string;
}

export const useTaskManager = () => {
  const [count, setCount] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (taskName: string) => {
    if (taskName.trim() !== '') {
      setTasks([...tasks, { id: tasks.length + 1, name: taskName }]);
      setCount(count + 1);
    }
  };

  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    setCount(count - 1);
  };

  const editTask = (taskId: number, newName: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, name: newName } : task
    );
    setTasks(updatedTasks);
  };

  return {
    count,
    tasks,
    addTask,
    deleteTask,
    editTask,
  };
};
