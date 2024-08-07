import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../domain/Task';
import { Service } from './Service';

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        const userIdString = localStorage.getItem('userId');
        if (!userIdString) {
          throw new Error('User ID not found');
        }
        const userId = parseInt(userIdString, 10);
        if (isNaN(userId)) {
          throw new Error('Invalid User ID');
        }

        const projectsData = await Service.getUserProjects(userId);

        if (!Array.isArray(projectsData)) {
          throw new Error('Unexpected response format: projectsData is not an array');
        }

        const transformedProjects = projectsData.map((proj: any) => {
          if (proj.idproject === undefined || proj.name === undefined) {
            throw new Error('Unexpected response format: missing idproject or name');
          }
          return {
            id: proj.idproject.toString(),
            name: proj.name,
            columns: [], 
          };
        });

        setProjects(transformedProjects);
        console.log(transformedProjects);
        if (transformedProjects.length > 0) {
          setCurrentProjectId(transformedProjects[0].id);
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

  useEffect(() => {
    if (currentProjectId) {
      const fetchProjectData = async () => {
        setLoading(true);
        setError(null);
        try {
          const columnsData = await Service.getColumnsByProjectId(currentProjectId);

          if (!Array.isArray(columnsData)) {
            throw new Error('Unexpected response format: columns data is not an array');
          }

          const columnsWithTasks = await Promise.all(
            columnsData.map(async (col: any) => {
              const tasks = await Service.getTasksByColumnId(col.idcolumn);
              return {
                id: col.idcolumn,
                name: col.nameColumn,
                tasks: tasks.map((task: any) => ({
                  id: task.taskId,
                  name: task.taskName,
                  columnId: task.sourceColumn,
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
    const userIdString = localStorage.getItem('userId');
    if (!userIdString) {
      throw new Error('User ID not found');
    }
    const userId = parseInt(userIdString, 10);
    if (isNaN(userId)) {
      throw new Error('Invalid User ID');
    }
    Service.updateProject(currentProjectId, newName, userId);
  };

  const addTask = (columnId: string, taskName: string) => {
    const task = { id: uuidv4(), name: taskName, columnId };
    Service.addTask(task.id, task.name, task.columnId);
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
    Service.deleteTask(taskId);
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
    Service.updateTask(taskId, newName);
  };

  const addColumn = (name: string) => {
    const newColumn = { id: uuidv4(), name, tasks: [] };
    setProjects(projects.map(project =>
      project.id === currentProjectId
        ? { ...project, columns: [...project.columns, newColumn] }
        : project
    ));
    Service.addColumn(newColumn.id, newColumn.name, currentProjectId);
  };

  const deleteColumn = (columnId: string) => {
    console.log("Borrada" + columnId);
    Service.deleteColumn(columnId);
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
    Service.updateColumn(columnId, newName, currentProjectId);
  };

  const moveTask = (taskId: string, sourceColId: string, targetColId: string) => {
    if (sourceColId === targetColId) return;

    const sourceColumn = currentProject.columns.find(col => col.id === sourceColId);
    const targetColumn = currentProject.columns.find(col => col.id === targetColId);

    if (sourceColumn && targetColumn) {
      const task = sourceColumn.tasks.find(task => task.id === taskId);
      Service.updateTaskColumn(taskId, targetColId);
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
    const userIdString = localStorage.getItem('userId');
    if (!userIdString) {
      throw new Error('User ID not found');
    }
    const userId = parseInt(userIdString, 10);
    if (isNaN(userId)) {
      throw new Error('Invalid User ID');
    }
    const newProject = { id: uuidv4(), name, columns: [] };
    Service.addProject(newProject.name, newProject.id, userId);
    setProjects([...projects, newProject]);
    setCurrentProjectId(newProject.id);
  };

  const loadProject = (projectId: string) => {
    setCurrentProjectId(projectId);
  };

  const deleteProject = (projectId: string) => {
    Service.deleteProject(projectId);
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
  };
};
