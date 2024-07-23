import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../domain/Task';
import { TodoistApi } from '@doist/todoist-api-typescript';

const api = new TodoistApi('YOUR_API_KEY'); // Reemplaza con tu clave API

interface Column {
  id: string;
  name: string;
  tasks: Task[];
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

  const currentProject = projects.find(project => project.id === currentProjectId) || { id: '', name: '', columns: [] };

  const updateProjectName = (newName: string) => {
    setProjects(projects.map(project =>
      project.id === currentProjectId ? { ...project, name: newName } : project
    ));
  };

  const addTask = async (columnId: string, taskName: string) => {
    try {
      const task = await api.addTask({ content: taskName, projectId: assignedProject, labels: [columnId] });
      setProjects(projects.map(project => {
        if (project.id === currentProjectId) {
          return {
            ...project,
            columns: project.columns.map(col =>
              col.id === columnId ? { ...col, tasks: [...col.tasks, { id: task.id, name: task.content }] } : col
            ),
          };
        }
        return project;
      }));
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (columnId: string, taskId: string) => {
    try {
      await api.deleteTask(taskId);
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
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const editTask = async (columnId: string, taskId: string, newName: string) => {
    try {
      await api.updateTask(taskId, { content: newName });
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
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const addColumn = async (name: string) => {
    const newColumn = { id: uuidv4(), name, tasks: [] };
    setProjects(projects.map(project =>
      project.id === currentProjectId
        ? { ...project, columns: [...project.columns, newColumn] }
        : project
    ));
  };

  const deleteColumn = async (columnId: string) => {
    try {
      const column = currentProject.columns.find(col => col.id === columnId);
      if (column) {
        const tasks = column.tasks;
        for (const task of tasks) {
          await api.deleteTask(task.id);
        }
        setProjects(projects.map(project =>
          project.id === currentProjectId
            ? { ...project, columns: project.columns.filter(col => col.id !== columnId) }
            : project
        ));
      }
    } catch (error) {
      console.error('Error deleting column:', error);
    }
  };

  const editColumnName = (columnId: string, newName: string) => {
    setProjects(projects.map(project =>
      project.id === currentProjectId
        ? {
          ...project,
          columns: project.columns.map(col =>
            col.id === columnId ? { ...col, name: newName } : col
          ),
        }
        : project
    ));
  };

  const moveTask = async (taskId: string, sourceColId: string, targetColId: string) => {
    if (sourceColId === targetColId) return;

    const sourceColumn = currentProject.columns.find(col => col.id === sourceColId);
    const targetColumn = currentProject.columns.find(col => col.id === targetColId);

    if (sourceColumn && targetColumn) {
      const task = sourceColumn.tasks.find(task => task.id === taskId);

      if (task) {
        try {
          await api.updateTask(taskId, { labels: [targetColumn.name] });
          setProjects(projects.map(project => {
            if (project.id === currentProjectId) {
              return {
                ...project,
                columns: project.columns.map(col => {
                  if (col.id === sourceColId) {
                    return { ...col, tasks: col.tasks.filter(task => task.id !== taskId) };
                  }
                  if (col.id === targetColId) {
                    return { ...col, tasks: [...col.tasks, task] };
                  }
                  return col;
                }),
              };
            }
            return project;
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

  return {
    currentProject,
    projects,
    createProject,
    loadProject,
    updateProjectName,
    addTask,
    deleteTask,
    editTask,
    addColumn,
    deleteColumn,
    editColumnName,
    moveTask,
  };
};
  