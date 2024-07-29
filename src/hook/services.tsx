import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/TodolistG4';

export async function registerUser(email: string, password: string) {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/register`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}
