import { useQuery } from '@tanstack/react-query';
import type { ApiCategory, ApiDetails, ApiService } from '../../../Shared/types/api';
import { api } from '../../../Shared/utils/api/axios';

export const useApiCategories = () => {
  return useQuery<ApiCategory[]>({
    queryKey: ['apiCategories'],
    queryFn: async () => {
      const { data } = await api.get('/api/categories');
      return data;
    },
  });
};

export const useApiServices = (categoryId?: string) => {
  return useQuery<ApiService[]>({
    queryKey: ['apiServices', categoryId],
    queryFn: async () => {
      const { data } = await api.get(`/api/services${categoryId ? `?categoryId=${categoryId}` : ''}`);
      return data;
    },
    enabled: !!categoryId,
  });
};

export const useApiDetails = (apiId: string) => {
  return useQuery<ApiDetails>({
    queryKey: ['apiDetails', apiId],
    queryFn: async () => {
      const { data } = await api.get(`/api/details/${apiId}`);
      return data;
    },
    enabled: !!apiId,
  });
}; 