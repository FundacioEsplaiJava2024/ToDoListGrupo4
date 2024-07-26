import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/TodolistG4';

export async function getElements() {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    console.log('aaaaaaaa', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching elementos:', error);
    throw error;
  }
};
export async function getProjects() {
  try {
    const response = await axios.get(`${API_BASE_URL}/project`);
    console.log('ddsds', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching elementos:', error);
    throw error;
  }
};

export async function getColumns() {
  try {
    const response = await axios.get(`${API_BASE_URL}/column`);
    console.log('ddsds', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching elementos:', error);
    throw error;
  }
};

export async function getUsers() {
  try {
    const response = await axios.get(`${API_BASE_URL}/user`);
    console.log('ddsds', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching elementos:', error);
    throw error;
  }
};