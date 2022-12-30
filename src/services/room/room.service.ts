import { getRoomsUrl } from '../api/api.config';
import { request } from '../api/request.api';

export const RoomService = {
  async getRoom(searchTerm: string) {
    return await request<any[]>({
      url: getRoomsUrl(''),
      method: 'GET',
      params: searchTerm ? { searchTerm } : {},
    });
  },
  async getRoomById(roomId: string | number) {
    return await request<any>({
      url: getRoomsUrl(`?filters[roomId][$eq]=${roomId}`),
      method: 'GET',
    });
  },
  async createRoom(data: any) {
    return await request<any>({
      url: getRoomsUrl(''),
      method: 'POST',
      data,
    });
  },
  async updateRoom(id: string, data: any) {
    return await request<any>({
      url: getRoomsUrl(`/${id}`),
      method: 'PUT',
      data,
    });
  },
};
