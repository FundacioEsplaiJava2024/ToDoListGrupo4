import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: number;
  name: string;
}

interface Column {
  id: string;
  name: string;
  tasks: Task[];
}

export const useTaskManager = () => {
  const [columns, setColumns] = useState<Column[]>([
    { id: uuidv4(), name: 'Columna 1', tasks: [] },
  ]);

  const addTask = (columnaId: string, taskName: string) => {
    if (taskName.trim() !== '') {
      setColumns(columns.map(col =>
        col.id === columnaId
          ? { ...col, tasks: [...col.tasks, { id: col.tasks.length + 1, name: taskName }] }
          : col
      ));
    }
  };

  const deleteTask = (columnaId: string, taskId: number) => {
    setColumns(columns.map(col =>
      col.id === columnaId
        ? { ...col, tasks: col.tasks.filter(task => task.id !== taskId) }
        : col
    ));
  };

  const editTask = (columnaId: string, taskId: number, newName: string) => {
    setColumns(columns.map(col =>
      col.id === columnaId
        ? {
          ...col,
          tasks: col.tasks.map(task =>
            task.id === taskId ? { ...task, name: newName } : task
          )
        }
        : col
    ));
  };

  const addColumn = (name: string) => {
    const newColumn = { id: uuidv4(), name, tasks: [] };
    setColumns([...columns, newColumn]);
  };

  const deleteColumn = (columnaId: string) => {
    setColumns(columns.filter(col => col.id !== columnaId));
  };

  const editColumnName = (columnaId: string, newName: string) => {
    setColumns(columns.map(col =>
      col.id === columnaId ? { ...col, name: newName } : col
    ));
  };

    // Te permite agarrar las Tasks
    const handleDragStart = (event: React.DragEvent<HTMLElement>) => {
      event.dataTransfer.setData('text', event.currentTarget.id);
      event.dataTransfer.effectAllowed = "move";
    };
  
    // Evita que se pueda soltar en cualquier sitio
    const enableDropping = (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault();
    };
  
    // Termina de mover las Tasks que se a agarrado previamente a otro sitio
    const handleDrop = (event: React.DragEvent<HTMLElement>) => {
      const id = event.dataTransfer.getData('text');
      event.currentTarget.appendChild(document.getElementById(id)!);
    };

  return {
    columns,
    addTask,
    deleteTask,
    editTask,
    handleDragStart,
    enableDropping,
    handleDrop,
    addColumn,
    deleteColumn,
    editColumnName,
  };
};

