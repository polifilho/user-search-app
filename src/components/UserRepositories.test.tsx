import React from 'react';
import { render, screen } from '@testing-library/react';
import UserRepositories from './UserRepositories';
import { ReposType } from '../types';

describe('UserRepositories Component', () => {
  const mockSetRepos = jest.fn();
  const mockSetPage = jest.fn();
  const reposMock: ReposType[] = [];

  const defaultProps = {
    user: 'testUser',
    setRepos: mockSetRepos,
    loadingRepos: false,
    repos: reposMock,
    page: 1,
    setPage: mockSetPage,
  };

  test('should display the message "repositories not found" when repository is 0', () => {
    const reposMock = [
      { userName: 'testUser', loadMore: false, repositories: [] },
    ];

    render(<UserRepositories {...defaultProps} repos={reposMock} />);

    expect(
      screen.getByText(/Sorry! Repositories not found from this user./i)
    ).toBeInTheDocument();
  });

  test('should render only 1 item about the first user', () => {
    const reposMock = [
      {
        userName: 'testUser',
        loadMore: false,
        repositories: [
          { name: 'Repo 1', description: '', stargazers_count: 0 },
        ],
      },
    ];
    render(<UserRepositories {...defaultProps} repos={reposMock} />);

    reposMock[0].repositories.forEach((repo) => {
      expect(screen.getByText(repo.name)).toBeInTheDocument();
    });

    expect(screen.queryByText(/load more/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/Repo/i)).toHaveLength(1);
  });

  test('should render 20 itens and the button to load more should render', () => {
    const reposMock = [
      {
        userName: 'testUser',
        repositories: Array.from({ length: 20 }, (_, i) => ({
          name: `Repo ${i}`,
          description: '',
          stargazers_count: 0,
        })),
        loadMore: true,
      },
    ];
    render(<UserRepositories {...defaultProps} repos={reposMock} />);

    reposMock[0].repositories.slice(0, 20).forEach((repo) => {
      expect(screen.getByText(repo.name)).toBeInTheDocument();
    });

    expect(screen.getByText(/load more/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Repo/i)).toHaveLength(20);
  });
});
