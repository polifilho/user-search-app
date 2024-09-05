import axios from 'axios';
import { searchUsers, getUserRepos } from './github-web-api';

jest.mock('axios');

describe('API Services', () => {
  const githubAPI = process.env.REACT_APP_GITHUB_API_URL;

  describe('searchUsers', () => {
    test('should return the users list', async () => {
      const mockResponse = {
        data: {
          items: [
            { login: 'user1' },
            { login: 'user2' },
            { login: 'user3' },
            { login: 'user4' },
            { login: 'user5' },
          ],
        },
      };

      (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const users = await searchUsers('user');

      expect(users).toEqual(['user1', 'user2', 'user3', 'user4', 'user5']);
      expect(axios.get).toHaveBeenCalledWith(`${githubAPI}/search/users`, {
        params: { q: 'user', per_page: 5 },
      });
    });

    test('should handle with an empty API response regarding users', async () => {
      const mockResponse = {
        data: {
          items: [],
        },
      };

      (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const users = await searchUsers('user');

      expect(users).toEqual([]);
      expect(axios.get).toHaveBeenCalledWith(`${githubAPI}/search/users`, {
        params: { q: 'user', per_page: 5 },
      });
    });

    test('should throw an error if user API fails', async () => {
      (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Erro na API'));

      await expect(searchUsers('test')).rejects.toThrow('Erro na API');
    });
  });

  describe('getUserRepos', () => {
    const githubAPI = process.env.REACT_APP_GITHUB_API_URL;
    const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

    test('shoudl return the repositories from user', async () => {
      const mockResponse = {
        data: [{ name: 'repo1' }, { name: 'repo2' }, { name: 'repo3' }],
      };

      (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const repos = await getUserRepos('user1', 1);

      expect(repos).toEqual(mockResponse.data);
      expect(axios.get).toHaveBeenCalledWith(
        `${githubAPI}/users/user1/repos?per_page=20&page=1`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
    });

    test('should handle with an empty API response regarding repositories', async () => {
      const mockResponse = {
        data: [],
      };

      (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const repos = await getUserRepos('user1', 1);

      expect(repos).toEqual([]);
      expect(axios.get).toHaveBeenCalledWith(
        `${githubAPI}/users/user1/repos?per_page=20&page=1`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
    });

    test('should throw an error if repositories API fails', async () => {
      (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Erro na API'));

      await expect(getUserRepos('user1', 1)).rejects.toThrow('Erro na API');
    });
  });
});
