import { getActiveUsersUrl } from '../api/api.config';
import { request } from '../api/request.api';
import { ActiveUsersResponce } from './type';

export const ActiveUsersService = {
  async getAll(searchTerm: string) {
    return await request<ActiveUsersResponce>({
      url: getActiveUsersUrl(''),
      method: 'GET',
      params: searchTerm ? { searchTerm } : {},
    });
  },
  async getAUByRoomId(id: string | number) {
    return await request<ActiveUsersResponce>({
      url: getActiveUsersUrl(`?filters[roomId][$eq]=${id}`),
      method: 'GET',
    });
  },
  async deleteAUById(id: string | number) {
    return await request<ActiveUsersResponce>({
      url: getActiveUsersUrl(`/${id}`),
      method: 'DELETE',
    });
  },
};
