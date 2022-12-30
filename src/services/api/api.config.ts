export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const API_URL = `${SERVER_URL}/api`;

export const getAccountUrl = (string: string) => `/accounts${string}`;
export const getRoomsUrl = (string: string) => `/rooms${string}`;
export const getActiveUsersUrl = (string: string) => `/active-users${string}`;
export const getQuestionsUrl = (string: string) => `/questions${string}`;
