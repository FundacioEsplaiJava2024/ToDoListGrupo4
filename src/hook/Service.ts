import { Task } from '@doist/todoist-api-typescript';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/TodolistG4';

export class Service{
  static async getElements() {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      console.log('aaaaaaaa',response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching elementos:', error);
      throw error;
    }
  };
  static async getProjects(){
      try {
        const response = await axios.get(`${API_BASE_URL}/projects`);
        console.log('ddsds',response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching elementos:', error);
        throw error;
      }
    };
    static async getUserProjects(userId: string){
      try {
        const response = await axios.get(`${API_BASE_URL}/projects/`+userId);
        console.log('projects',response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching elementos:', error);
        throw error;
      }
    };
    static async getColumnsByProjectId(projectId: string){
      try {
        const response = await axios.get(`${API_BASE_URL}/columns/project/`+projectId);
        console.log('columns',response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching elementos:', error);
        throw error;
      }
    };
    static async getTasksByColumnId(columnId: string){
      try {
        const response = await axios.get(`${API_BASE_URL}/tasks/column/`+columnId);
        console.log('columns',response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching elementos:', error);
        throw error;
      }
    };
    
      static async updateTask(taskId: string, newName: string){
      try {
        console.log("asldfjsalkfjlsfl", newName);
        const response = await axios.post(`${API_BASE_URL}/tasks/`+taskId+`/edit`,{"newName":newName});
        return response.data;
      } catch (error) {
        console.error('Error fetching elementos:', error);
        throw error;
      }
    };


    static async deleteTask(taskId: string) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}/delete`);
        return response.data;
      } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
      }
    }

    static async deleteColumn(columnId: string) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/delete/${columnId}`);
        return response.data;
      } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
      }
    }

    static async deleteProject(projectId: string){
      try{
        const response = await axios.delete (`${API_BASE_URL}/projects/delete/${projectId}`);
        return response.data;
      } catch (error){
        console.error('Error deleting task:', error);
        throw error;
      }
    }

    static async updateTaskColumn(taskId: string, newCol: string){
      try {
        const response = await axios.post(`${API_BASE_URL}/tasks/`+taskId+`/move`,newCol);
        return response.data;
      } catch (error) {
        console.error('Error fetching elementos:', error);
        throw error;
      }
    };
    static async updateColumn(columnId: string, newName: string){
      try {
        const response = await axios.post(`${API_BASE_URL}/columns/edit/`+columnId, newName);
        return response.data;
      } catch (error) {
        console.error('Error fetching elementos:', error);
        throw error;
      }
    };
    static async updateProject(projectId: string, updatedProject:string){
      try {
        const response = await axios.post(`${API_BASE_URL}/projects/update/`+projectId,updatedProject);
        return response.data;
      } catch (error) {
        console.error('Error fetching elementos:', error);
        throw error;
      }
    };
    
    
}

