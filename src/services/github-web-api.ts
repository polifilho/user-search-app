import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

export const searchUsers = async (query: string) => {
  const response = await axios.get(`${GITHUB_API_URL}/search/users`, {
    params: { q: query, per_page: 5 },
  });

  return response.data.items.map((item: any) => item.login);
};

export const getUserRepos = async (username: string, page: number) => {
  const response = await axios.get(
    `${GITHUB_API_URL}/users/${username}/repos?per_page=20&page=${page}`
  );

  return response.data;
};
