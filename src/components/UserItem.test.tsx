import React from 'react';
import { render, screen } from '@testing-library/react';
import UserItem from './UserItem';
import { ReposType } from '../types';

describe('UserItem Component', () => {
  const mockSetRepos = jest.fn();

  test('Should render users', () => {
    const usersMock: string[] = ['user1', 'user2', 'user3', 'user4', 'user5'];
    const reposMock: ReposType[] = [];

    render(
      <UserItem users={usersMock} repos={reposMock} setRepos={mockSetRepos} />
    );

    const renderedUsers = screen.getAllByText(/user/i);
    expect(renderedUsers).toHaveLength(5);
  });
});
