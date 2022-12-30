export interface Attributes {
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  isPlayed: boolean;
}

export interface QuestionData {
  id: number;
  attributes: Attributes;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: Pagination;
}

export interface ActiveUsersResponce {
  data: QuestionData[];
  meta: Meta;
}
