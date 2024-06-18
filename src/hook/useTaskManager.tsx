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
    count,
    tasks,
    addTask,
    deleteTask,
    editTask,
    handleDragStart,
    enableDropping,
    handleDrop,
  };
};