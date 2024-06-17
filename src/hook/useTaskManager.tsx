import { useState } from 'react';

interface Task {
  id: number;
  name: string;
}

interface Column {
  id: number;
  name: string;
  tasks: Task[];
}

export const useTaskManager = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [taskName, setTaskName] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const addTask = (columnId: number) => {
    const newColumns = columns.map(column => {
      if (column.id === columnId) {
        const newTask = { id: column.tasks.length + 1, name: taskName };
        return { ...column, tasks: [...column.tasks, newTask] };
      }
      return column;
    });
    setColumns(newColumns);
    setTaskName('');
  };

  const deleteTask = (columnId: number, taskId: number) => {
    const newColumns = columns.map(column => {
      if (column.id === columnId) {
        const updatedTasks = column.tasks.filter(task => task.id !== taskId);
        return { ...column, tasks: updatedTasks };
      }
      return column;
    });
    setColumns(newColumns);
  };

  const editTask = (columnId: number, taskId: number, newName: string) => {
    const newColumns = columns.map(column => {
      if (column.id === columnId) {
        const updatedTasks = column.tasks.map(task =>
          task.id === taskId ? { ...task, name: newName } : task
        );
        return { ...column, tasks: updatedTasks };
      }
      return column;
    });
    setColumns(newColumns);
  };

  const addColumn = (name: string) => {
    const newColumn = { id: columns.length + 1, name, tasks: [] };
    setColumns([...columns, newColumn]);
  };

  const deleteColumn = (columnId: number) => {
    const updatedColumns = columns.filter(column => column.id !== columnId);
    setColumns(updatedColumns);
  };

  const editColumnName = (columnId: number, newName: string) => {
    const updatedColumns = columns.map(column =>
      column.id === columnId ? { ...column, name: newName } : column
    );
    setColumns(updatedColumns);
  };

  return {
    columns,
    taskName,
    handleInputChange,
    addTask,
    deleteTask,
    editTask,
    addColumn,
    deleteColumn,
    editColumnName,
  };
};
