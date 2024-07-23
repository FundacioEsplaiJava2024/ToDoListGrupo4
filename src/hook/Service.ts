import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/TodolistG4';

export const getElementos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    console.log('aaaaaaaa',response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching elementos:', error);
    throw error;
  }
};
