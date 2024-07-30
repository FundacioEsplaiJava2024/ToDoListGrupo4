import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/TodolistG4';

export class Service {
  static async getElements() {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      console.log('aaaaaaaa', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching elementos:', error);
      throw error;
    }
  };
  static async getProjects() {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects`);
      console.log('ddsds', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching elementos:', error);
      throw error;
    }
  };
  static async getUserProjects(userId: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects/` + userId);
      console.log('projects', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching elementos:', error);
      throw error;
    }
  };
  static async getColumnsByProjectId(projectId: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/columns/project/` + projectId);
      console.log('columns', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching elementos:', error);
      throw error;
    }
  };
  static async getTasksByColumnId(columnId: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks/column/` + columnId);
      console.log('task', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching elementos:', error);
      throw error;
    }
  };
  static async addProject(name: string, idproject: string, iduser: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/projects`, {
        name,
        idproject,
        iduser,
      });
      console.log('Project agregada:', response.data);
    } catch (error) {
      console.error('Error al agregar el project:', error);
    }
  };
  static async addColumn(taskId: string, taskName: string, sourceColumn: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks/add`, {
        taskId,
        taskName,
        sourceColumn,
      });
      console.log('Columna agregada:', response.data);
    } catch (error) {
      console.error('Error al agregar la columna:', error);
    }
  };
  static async addTask(taskId: string, taskName: string, sourceColumn: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks/add`, {
        taskId,
        taskName,
        sourceColumn,
      });
      console.log('Tarea agregada:', response.data);
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
  };

}

