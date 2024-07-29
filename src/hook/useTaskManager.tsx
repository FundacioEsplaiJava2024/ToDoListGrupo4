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

interface Project {
  id: string;
  name: string;
  columns: Column[];
}

export const useTaskManager = () => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [];
  });
  const [currentProjectId, setCurrentProjectId] = useState<string>(() => {
    const savedCurrentProjectId = localStorage.getItem('currentProjectId');
    return savedCurrentProjectId ? savedCurrentProjectId : '';
  });

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('currentProjectId', currentProjectId);
  }, [currentProjectId]);

  // Fetch projects from the API when the component mounts
  useEffect(() => {
    const fetchInitialData = async () => {
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

        newColumns(newColumns);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch columns and tasks when the current project changes
  useEffect(() => {
    if (currentProjectId) {
      const fetchProjectData = async () => {
        setLoading(true);
        setError(null);
        try {
          const columnsData = await getColumnsByProjectId(currentProjectId);

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
          );

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
      };

      fetchProjectData();
    }
  }, [currentProjectId]);

  // Save projects to localStorage when they change
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  // Save currentProjectId to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('currentProjectId', currentProjectId);
  }, [currentProjectId]);

  const currentProject = projects.find(project => project.id === currentProjectId) || { id: '', name: '', columns: [] };

  const updateProjectName = (newName: string) => {
    setProjects(projects.map(project =>
      project.id === currentProjectId ? { ...project, name: newName } : project
    ));
  };

  const addTask = (columnId: string, taskName: string) => {
    const task = { id: uuidv4(), name: taskName, columnId };
    setProjects(projects.map(project => {
      if (project.id === currentProjectId) {
        return {
          ...project,
          columns: project.columns.map(col =>
            col.id === columnId ? { ...col, tasks: [...col.tasks, task] } : col
          ),
        };
      }
      return project;
    }));
  };

  const deleteTask = (columnId: string, taskId: string) => {
    setProjects(projects.map(project => {
      if (project.id === currentProjectId) {
        return {
          ...project,
          columns: project.columns.map(col =>
            col.id === columnId ? { ...col, tasks: col.tasks.filter(task => task.id !== taskId) } : col
          ),
        };
      }
      return project;
    }));
  };

  const editTask = (columnId: string, taskId: string, newName: string) => {
    setProjects(projects.map(project => {
      if (project.id === currentProjectId) {
        return {
          ...project,
          columns: project.columns.map(col =>
            col.id === columnId
              ? {
                ...col,
                tasks: col.tasks.map(task =>
                  task.id === taskId ? { ...task, name: newName } : task
                ),
              }
              : col
          ),
        };
      }
      return project;
    }));
  };

  const addColumn = (name: string) => {
    const newColumn = { id: uuidv4(), name, tasks: [] };
    setProjects(projects.map(project =>
      project.id === currentProjectId
        ? { ...project, columns: [...project.columns, newColumn] }
        : project
    ));
  };

  const deleteColumn = (columnId: string) => {
    setProjects(projects.map(project => {
      if (project.id === currentProjectId) {
        return {
          ...project,
          columns: project.columns.filter(col => col.id !== columnId)
        };
      }
      return project;
    }));
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

  const moveTask = (taskId: string, sourceColId: string, targetColId: string) => {
    if (sourceColId === targetColId) return;

    const sourceColumn = currentProject.columns.find(col => col.id === sourceColId);
    const targetColumn = currentProject.columns.find(col => col.id === targetColId);

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

  const createProject = (name: string) => {
    const newProject = { id: uuidv4(), name, columns: [] };
    setProjects([...projects, newProject]);
    setCurrentProjectId(newProject.id);
  };

  const loadProject = (projectId: string) => {
    setCurrentProjectId(projectId);
  };

  const deleteProject = (projectId: string) => {
    // Eliminar el proyecto actual y seleccionar el siguiente disponible
    const filteredProjects = projects.filter(project => project.id !== projectId);
    setProjects(filteredProjects);

    if (filteredProjects.length > 0) {
      // Si hay proyectos restantes, seleccionar el primero
      setCurrentProjectId(filteredProjects[0].id);
    } else {
      // Si no quedan proyectos, deseleccionar el proyecto
      setCurrentProjectId('');
    }
  };

  return {
    currentProject,
    currentProjectId,
    projects,
    createProject,
    loadProject,
    deleteProject,
    updateProjectName,
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
