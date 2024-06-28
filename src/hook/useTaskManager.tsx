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
  const [columns, setColumns] = useState<Column[]>(() => {
    const savedColumns = localStorage.getItem('columns');
    return savedColumns ? JSON.parse(savedColumns) : [{ id: uuidv4(), name: 'Columna 1', tasks: [] }];
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await api.getTasks({ projectId: assignedProject });
        const tasksByTag: { [key: string]: Task[] } = {};

        tasks.forEach(task => {
          const tag = task.labels[0];
          if (!tasksByTag[tag]) {
            tasksByTag[tag] = [];
          }
          tasksByTag[tag].push({ id: task.id, name: task.content });
        });

        const newColumns = columns.map(col => ({
          ...col,
          tasks: tasksByTag[col.name] || [],
        }));
        
        setColumns(newColumns);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem('columns', JSON.stringify(columns));
  }, [columns]);

  const addTask = async (columnId: string, taskName: string) => {
    try {
      const column = columns.find(col => col.id === columnId);
      if (column) {
        const task = await api.addTask({ content: taskName, projectId: assignedProject, labels: [column.name] });
        setColumns(columns.map(col =>
          col.id === columnId
            ? { ...col, tasks: [...col.tasks, { id: task.id, name: task.content }] }
            : col
        ));
      }
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

  const addColumn = async (name: string) => {
    const newColumn = { id: uuidv4(), name, tasks: [] };
    setColumns([...columns, newColumn]);
  };

  const deleteColumn = async (columnId: string) => {
    const column = columns.find(col => col.id === columnId);
    if (column) {
      try {
        const tasks = column.tasks;
        for (const task of tasks) {
          await api.deleteTask(task.id);
        }
        setColumns(columns.filter(col => col.id !== columnId));
      } catch (error) {
        console.error('Error deleting column:', error);
      }
    }
  };

  const editColumnName = (columnId: string, newName: string) => {
    const column = columns.find(col => col.id === columnId);
    if (column) {
      const oldName = column.name;
      setColumns(columns.map(col =>
        col.id === columnId ? { ...col, name: newName } : col
      ));

      // Update tasks in the API with the new column name
      const tasksToUpdate = columns.find(col => col.id === columnId)?.tasks || [];
      tasksToUpdate.forEach(async (task) => {
        try {
          const apiTask = await api.getTask(task.id);
          const newLabels = apiTask.labels.filter(label => label !== oldName);
          newLabels.push(newName);
          await api.updateTask(task.id, { labels: newLabels });
        } catch (error) {
          console.error(`Error updating task ${task.id} labels:`, error);
        }
      });
    }
  };

  const moveTask = async (taskId: string, sourceColId: string, targetColId: string) => {
    if (sourceColId === targetColId) {
      return;
    }
    const sourceColumn = columns.find(col => col.id === sourceColId);
    const targetColumn = columns.find(col => col.id === targetColId);

    if (sourceColumn && targetColumn) {
      const task = sourceColumn.tasks.find(task => task.id === taskId);

      if (task) {
        try {
          await api.updateTask(taskId, { labels: [targetColumn.name] });
          setColumns(columns.map(col => {
            if (col.id === sourceColId) {
              return { ...col, tasks: col.tasks.filter(task => task.id !== taskId) };
            }
            if (col.id === targetColId) {
              return { ...col, tasks: [...col.tasks, task] };
            }
            return col;
          }));
        } catch (error) {
          console.error('Error moving task:', error);
        }
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
