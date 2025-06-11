import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '../api/categoryApi';
import type { Category, Repository } from '../api/categoryApi';

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: categoryApi.getAllCategories,
  });
};

export const useCategory = (categoryId: string) => {
  return useQuery<Category>({
    queryKey: ['category', categoryId],
    queryFn: () => categoryApi.getCategoryById(categoryId),
    enabled: !!categoryId,
  });
};

export const useRepositoriesByCategory = (categoryId: string) => {
  return useQuery<Repository[]>({
    queryKey: ['repositories', categoryId],
    queryFn: () => categoryApi.getRepositoriesByCategory(categoryId),
    enabled: !!categoryId,
  });
}; 