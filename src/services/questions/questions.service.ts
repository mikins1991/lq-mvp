import { getQuestionsUrl } from '../api/api.config';
import { request } from '../api/request.api';

export const QuestionsService = {
  async getQuestions(searchTerm: string) {
    return await request<any[]>({
      url: getQuestionsUrl(''),
      method: 'GET',
      params: searchTerm ? { searchTerm } : {},
    });
  },
  async getQuestionById(id: string | number) {
    return await request<any>({
      url: getQuestionsUrl(`/${id}`),
      method: 'GET',
    });
  },
  async createQuestion(data) {
    return await request<any>({
      url: getQuestionsUrl(``),
      method: 'POST',
      data,
    });
  },
};
