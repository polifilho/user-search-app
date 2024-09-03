import axios from 'axios';

const githubAPI = process.env.REACT_APP_GITHUB_API_URL;
const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

export const searchUsers = async (query: string) => {
  const response = await axios.get(`${githubAPI}/search/users`, {
    params: { q: query, per_page: 5 },
  });

  return response.data.items.map((item: any) => item.login);
};

export const getUserRepos = async (username: string, page: number) => {
  const response = await axios.get(
    `${githubAPI}/users/${username}/repos?per_page=20&page=${page}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  return response.data;
};
