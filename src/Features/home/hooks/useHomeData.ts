import { useQuery } from '@tanstack/react-query';
import { api } from '../../../Shared/utils/api/axios';

interface HomeStats {
  totalApis: number;
  totalCategories: number;
  totalServices: number;
}

export const useHomeStats = () => {
  return useQuery<HomeStats>({
    queryKey: ['homeStats'],
    queryFn: async () => {
      const { data } = await api.get('/api/stats');
      return data;
    },
  });
}; 