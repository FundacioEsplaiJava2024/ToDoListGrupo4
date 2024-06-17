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
  const [taskName, setTaskName] = useState<string>('');
  const [columns, setColumns] = useState<Column[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const addTask = (columnId: number) => {
    if (taskName.trim() !== '') {
      const newTask = { id: tasks.length + 1, name: taskName };
      const updatedColumns = columns.map(column =>
        column.id === columnId ? { ...column, tasks: [...column.tasks, newTask] } : column
      );
      setColumns(updatedColumns);
      setTaskName('');
      setCount(count + 1);
    }
  };

  const deleteTask = (columnId: number, taskId: number) => {
    const updatedColumns = columns.map(column =>
      column.id === columnId
        ? { ...column, tasks: column.tasks.filter(task => task.id !== taskId) }
        : column
    );
    setColumns(updatedColumns);
    setCount(count - 1);
  };

  const editTask = (columnId: number, taskId: number, newName: string) => {
    const updatedColumns = columns.map(column =>
      column.id === columnId
        ? {
            ...column,
            tasks: column.tasks.map(task =>
              task.id === taskId ? { ...task, name: newName } : task
            )
          }
        : column
    );
    setColumns(updatedColumns);
  };

  const addColumn = (name: string) => {
    const newColumn = { id: columns.length + 1, name, tasks: [] };
    setColumns([...columns, newColumn]);
  };

  return {
    count,
    columns,
    taskName,
    handleInputChange,
    addTask,
    deleteTask,
    editTask,
    addColumn,
  };
};
