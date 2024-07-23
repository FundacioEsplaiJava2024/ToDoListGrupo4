import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../domain/Task';

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

  const addTask = (columnId: string, taskName: string) => {
    const task = { id: uuidv4(), name: taskName };
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

  const moveTask = (taskId: string, sourceColId: string, targetColId: string) => {
    if (sourceColId === targetColId) return;

    const sourceColumn = currentProject.columns.find(col => col.id === sourceColId);
    const targetColumn = currentProject.columns.find(col => col.id === targetColId);

    if (sourceColumn && targetColumn) {
      const task = sourceColumn.tasks.find(task => task.id === taskId);

      if (task) {
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
