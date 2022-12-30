export interface IAccount {
  username: string;
  token: string;
  userRoles: string;
  roomId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  socketid: string;
}

export interface Data {
  id: number;
  attributes: IAccount;
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
  data: Data[];
  meta: Meta;
}
