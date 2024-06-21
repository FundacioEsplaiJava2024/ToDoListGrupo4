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
    setColumns(columns.map(col =>
      col.id === columnaId
        ? { ...col, tasks: [...col.tasks, { id: col.tasks.length + 1, name: taskName }] }
        : col
    ));
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
    const newColumn = { id: name, name, tasks: [] };
    setColumns([...columns, newColumn]);
    console.log(newColumn)
  };

  const deleteColumn = (columnaId: string) => {
    setColumns(columns.filter(col => col.id !== columnaId));
  };

  const editColumnName = (columnaId: string, newName: string) => {
    setColumns(columns.map(col =>
      col.id === columnaId ? { ...col, name: newName } : col
    ));
  };

  const moveTask = (taskId: number, sourceColId: string, targetColId: string) => {
    const sourceColumn = columns.find(col => col.id === sourceColId);
    const targetColumn = columns.find(col => col.id === targetColId);

    if (sourceColumn && targetColumn) {
      const task = sourceColumn.tasks.find(task => task.id === taskId);

      if (task) {
        setColumns(columns.map(col => {
          if (col.id === sourceColId) {
            return { ...col, tasks: col.tasks.filter(task => task.id !== taskId)};
          }
          if (col.id === targetColId) {
            return { ...col, tasks: [...col.tasks, task]};
          }
          return col;
        }));
      }
    }
    console.log(sourceColId, targetColId, sourceColumn, targetColumn);
    console.log(taskId)
  }

  return {
    columns,
    addTask,
    deleteTask,
    editTask,
    addColumn,
    deleteColumn,
    editColumnName,
    moveTask,
  };
};

