import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../domain/Task';
import { getProjects } from './Service';

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

  // Fetch projects from the API when the component mounts
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const projectsData = await getProjects();

        // Transform the data to match the expected format
        const transformedProjects = projectsData.map((proj: any) => ({
          id: proj.project_id.toString(),
          name: proj.project_name,
          columns: [], // Initialize with empty columns; adjust if needed
        }));

        setProjects(transformedProjects);
        if (transformedProjects.length > 0) {
          setCurrentProjectId(transformedProjects[0].id);
        }
        setLoading(false);
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

          const columnsWithTasks = await Promise.all(
            columnsData.map(async (col: any) => {
              const tasks = await getTasksByColumnId(col.column_id);
              return {
                id: col.column_id,
                name: col.column_name,
                tasks: tasks.map((task: any) => ({
                  id: task.task_id,
                  name: task.task_name,
                  columnId: task.column_id,
                })),
              };
            })
          );

          setProjects((prevProjects) =>
            prevProjects.map((project) =>
              project.id === currentProjectId
                ? { ...project, columns: columnsWithTasks }
                : project
            )
          );

          setLoading(false);
        } catch (error) {
          console.error('Error fetching project data:', error);
          setError('Failed to fetch project data');
          setLoading(false);
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
  };
};
