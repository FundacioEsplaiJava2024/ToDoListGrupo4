import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/TodolistG4';

export async function getElements() {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    console.log('aaaaaaaa',response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching elementos:', error);
    throw error;
  }
};
export async function getProjects(){
    try {
      const response = await axios.get(`${API_BASE_URL}/project`);
      console.log('ddsds',response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching elementos:', error);
      throw error;
    }
  };
  export async function getUserProjects(userId: string){
    try {
      const response = await axios.get(`${API_BASE_URL}/projects/`+userId);
      console.log('projects',response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching elementos:', error);
      throw error;
    }
  };
  export async function getColumnsByProjectId(projectId: string){
    try {
      const response = await axios.get(`${API_BASE_URL}/columns/project/`+projectId);
      console.log('columns',response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching elementos:', error);
      throw error;
    }
  };
  export async function getTasksByColumnId(columnId: string){
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks/`+columnId);
      console.log('columns',response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching elementos:', error);
      throw error;
    }
  };