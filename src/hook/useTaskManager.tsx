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
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects and tasks from the API when the component mounts
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        const projectsData = await getProjects();
        const tasksData = await getElements();

        // Transform the data to match the expected format
        const transformedProjects = projectsData.map((proj: any) => ({
          id: proj.idproject.toString(),
          name: proj.name,
          columns: [], // Initialize with empty columns; adjust if needed
        }));

        // Agrupar tareas por columna
        const tasksByColumnId: { [key: string]: Task[] } = {};
        tasks.forEach((task) => {
          if (!tasksByColumnId[task.columnId]) {
            tasksByColumnId[task.columnId] = [];
          }
          tasksByColumnId[task.columnId].push(task);
        });

        // Actualizar proyectos con tareas en sus columnas
        const projectsWithTasks = transformedProjects.map((project: Project) => ({
          ...project,
          columns: project.columns.map((column: Column) => ({
            ...column,
            tasks: tasksByColumnId[column.id] || [],
          })),
        }));

        setProjects(projectsWithTasks);
        if (projectsWithTasks.length > 0) {
          setCurrentProjectId(projectsWithTasks[0].id);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

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
    const filteredProjects = projects.filter(project => project.id !== projectId);
    setProjects(filteredProjects);

    if (filteredProjects.length > 0) {
      setCurrentProjectId(filteredProjects[0].id);
    } else {
      setCurrentProjectId('');
    }
  };

  return {
    currentProject,
    currentProjectId,
    projects,
    loading,
    error,
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
