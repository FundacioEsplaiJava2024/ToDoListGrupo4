import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Task } from '../domain/Task';

const API_BASE_URL = 'http://localhost:8080/TodolistG4'; // Asegúrate de que esta URL sea correcta

interface Column {
  id: string;
  name: string;
  tasks: Task[];
}
interface Project {
  projectId: string;
  projectName: string;
  columns: Column[];
}

export const useTaskManager = () => {
  const [columns, setColumns] = useState<Column[]>(() => {
    const savedColumns = localStorage.getItem('columns');
    return savedColumns ? JSON.parse(savedColumns) : [{ id: uuidv4(), name: 'Columna 1', tasks: [] }];
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/tasks`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const tasks: Task[] = response.data;

        // Agrupar tareas por columna
        const tasksByColumnId: { [key: string]: Task[] } = {};
        tasks.forEach((task) => {
          if (!tasksByColumnId[task.columnId]) {
            tasksByColumnId[task.columnId] = [];
          }
          tasksByColumnId[task.columnId].push(task);
        });

        // Actualizar columnas con tareas
        const newColumns = columns.map(col => ({
          ...col,
          tasks: tasksByColumnId[col.id] || [],
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
        const response = await axios.post(`${API_BASE_URL}/tasks`, {
          content: taskName,
          columnId: columnId
        });
        const task = response.data;
        setColumns(columns.map(col =>
          col.id === columnId
            ? { ...col, tasks: [...col.tasks, task] }
            : col
        ));
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (columnId: string, taskId: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
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
      await axios.put(`${API_BASE_URL}/tasks/${taskId}`, { content: newName });
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

  const createProject = async (projectName: string) => {
    const newProject = { id: uuidv4(), projectName, columns: [] };
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
          await axios.delete(`${API_BASE_URL}/tasks/${task.id}`);
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
          await axios.put(`${API_BASE_URL}/tasks/${taskId}`, { columnId: targetColId });
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
    createProject,
  };
};
