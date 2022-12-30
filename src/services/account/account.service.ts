import { getAccountUrl } from '../api/api.config';
import { request } from '../api/request.api';
import { AccountsResponce } from './type';

export const AccountService = {
  async getAll(searchTerm: string) {
    return await request<any>({
      url: getAccountUrl(''),
      method: 'GET',
      params: searchTerm ? { searchTerm } : {},
    });
  },
  async createAccount(data: any) {
    return await request<any>({
      url: getAccountUrl(''),
      method: 'POST',
      data,
    });
  },
  async getAllByRoomId(id: string) {
    return await request<AccountsResponce>({
      url: getAccountUrl(`?filters[roomId][$eq]=${id}`),
      method: 'GET',
    });
  },
  async getUserById(id: string) {
    return await request<AccountsResponce>({
      url: getAccountUrl(`?filters[userId][$eq]=${id}`),
      method: 'GET',
    });
  },
  async updateProfile(data: any) {
    return await request<any>({
      url: getAccountUrl(`/profile`),
      method: 'PUT',
      data,
    });
  },
  async updateUser(id: string, data: any) {
    return await request<string>({
      url: getAccountUrl(`/${id}`),
      method: 'PUT',
      data,
    });
  },
};
