import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Repository {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  url: string;
}

export const categoryApi = {
  getAllCategories: async (): Promise<Category[]> => {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  },

  getCategoryById: async (categoryId: string): Promise<Category> => {
    const response = await axios.get(`${API_BASE_URL}/categories/${categoryId}`);
    return response.data;
  },

  getRepositoriesByCategory: async (categoryId: string): Promise<Repository[]> => {
    const response = await axios.get(`${API_BASE_URL}/categories/${categoryId}/repositories`);
    return response.data;
  }
}; 