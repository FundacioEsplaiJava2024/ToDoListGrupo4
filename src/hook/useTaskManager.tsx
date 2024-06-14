import { useState } from 'react';

export const useTaskManager = () => {
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const addTask = () => {
    if (taskName.trim() !== '') {
      setTasks([...tasks, { id: tasks.length + 1, name: taskName }]);
      setTaskName('');
      setCount(count + 1);
    }
  };

  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    setCount(count - 1);
  };

  function getStringValue(taskId: number): string {
    taskId = Math.floor((Math.random() * 10000) + 1);
    return taskId.toString();
  }

  return {
    count,
    tasks,
    taskName,
    handleInputChange,
    addTask,
    deleteTask,
    getStringValue,
  };
};

export const useTaskMove = () => {

  // Te permite agarrar el elementoDiv
  const handleDragStart = (event: React.DragEvent<HTMLElement>) => {
    event.dataTransfer.setData('text', event.currentTarget.id);
    event.dataTransfer.effectAllowed = "move";
  };

  // Evita que se pueda soltar en cualquier sitio
  const enableDropping = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // Termina de mover el div que se a agarrado previamente a otro sitio
  const handleDrop = (event: React.DragEvent<HTMLElement>) => {
    const id = event.dataTransfer.getData('text');
    event.currentTarget.appendChild(document.getElementById(id)!);
  };

  return {
    handleDragStart,
    enableDropping,
    handleDrop,
  };
};