import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../domain/Task';
import { TodoistApi } from '@doist/todoist-api-typescript';

const api = new TodoistApi('119fcc545482c6691694cfbee148660b8df319f7');
const assignedProject = '2335344757';

interface Column {
  id: string;
  name: string;
  tasks: Task[];
}

export const useTaskManager = () => {
  const [columns, setColumns] = useState<Column[]>([
    { id: uuidv4(), name: 'Columna 1', tasks: [] },
  ]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await api.getTasks({ projectId: assignedProject });
        const newColumns = columns.map(col => ({
          ...col,
          tasks: tasks.map(task => ({ id: task.id, name: task.content })),
        }));
        setColumns(newColumns);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [columns]);

  const addTask = async (columnId: string, taskName: string) => {
    try {
      const task = await api.addTask({ content: taskName, projectId: assignedProject });
      setColumns(columns.map(col =>
        col.id === columnId
          ? { ...col, tasks: [...col.tasks, { id: task.id, name: task.content }] }
          : col
      ));
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (columnId: string, taskId: string) => {
    try {
      await api.deleteTask(taskId);
      setColumns(columns.map(col =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter(task => task.id !== taskId) }
          : col
      ));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const editTask = async (columnId: string, taskId: string, newName: string) => {
    try {
      await api.updateTask(taskId, { content: newName });
      setColumns(columns.map(col =>
        col.id === columnId
          ? {
            ...col,
            tasks: col.tasks.map(task =>
              task.id === taskId ? { ...task, name: newName } : task
            )
          }
          : col
      ));
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const addColumn = (name: string) => {
    const newColumn = { id: uuidv4(), name, tasks: [] };
    setColumns([...columns, newColumn]);
  };

  const deleteColumn = (columnId: string) => {
    setColumns(columns.filter(col => col.id !== columnId));
  };

  const editColumnName = (columnId: string, newName: string) => {
    setColumns(columns.map(col =>
      col.id === columnId ? { ...col, name: newName } : col
    ));
  };

  const moveTask = (taskId: string, sourceColId: string, targetColId: string) => {
    if (sourceColId === targetColId) {
      return;
    }
    const sourceColumn = columns.find(col => col.id === sourceColId);
    const targetColumn = columns.find(col => col.id === targetColId);

    if (sourceColumn && targetColumn) {
      const task = sourceColumn.tasks.find(task => task.id === taskId);

      if (task) {
        setColumns(columns.map(col => {
          if (col.id === sourceColId) {
            return { ...col, tasks: col.tasks.filter(task => task.id !== taskId) };
          }
          if (col.id === targetColId) {
            return { ...col, tasks: [...col.tasks, task] };
          }
          return col;
        }));
      }
    }
  };

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
