import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface Category {
  id: string;
  name: string;
  description?: string;
}

interface Repository {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  url: string;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

// API functions
const fetchAllCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${API_BASE_URL}/categories`);
  return response.data;
};

const fetchCategoryById = async (categoryId: string): Promise<Category> => {
  const response = await axios.get(`${API_BASE_URL}/categories/${categoryId}`);
  return response.data;
};

const fetchRepositoriesByCategory = async (categoryId: string): Promise<Repository[]> => {
  const response = await axios.get(`${API_BASE_URL}/categories/${categoryId}/repositories`);
  return response.data;
};

// Query hooks
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchAllCategories,
  });
};

export const useCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => fetchCategoryById(categoryId),
    enabled: !!categoryId,
  });
};

export const useRepositoriesByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['repositories', categoryId],
    queryFn: () => fetchRepositoriesByCategory(categoryId),
    enabled: !!categoryId,
  });
}; 