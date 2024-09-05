import axios from 'axios';
import { CONTENT } from '../communs';

const githubAPI = 'https://api.github.com';
const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

export const searchUsers = async (query: string) => {
  const response = await axios.get(`${githubAPI}/search/users`, {
    params: { q: query, per_page: 5 },
  });

  if (response.status >= 400) {
    return CONTENT.commons.errorRequest;
  }

  return response.data.items.map((item: any) => item.login);
};

export const getUserRepos = async (username: string, page: number) => {
  const response = await axios.get(
    `${githubAPI}/users/${username}/repos?per_page=20&page=${page}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (response.status >= 400) {
    return CONTENT.commons.errorRequest;
  }

  return response.data;
};
