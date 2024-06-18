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
  const [count, setCount] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (taskName: string) => {
    if (taskName.trim() !== '') {
      setTasks([...tasks, { id: tasks.length + 1, name: taskName }]);
      setCount(count + 1);
    }
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
    count,
    tasks,
    columns,
    addTask,
    deleteTask,
    editTask,
    addColumn,
    deleteColumn,
    editColumnName,
  };
};
