import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import UserRepositories from '../components/UserRepositories';

const meta = {
  title: 'Example/UserRepositories',
  component: UserRepositories,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof UserRepositories>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTwentyUsers: Story = {
  args: {
    user: 'user 1',
    loadingRepos: false,
    repos: [
      {
        userName: 'user 1',
        repositories: Array.from({ length: 20 }, (_, i) => ({
          name: `Repo ${i}`,
          description: 'simple description',
          stargazers_count: 13,
        })),
        loadMore: true,
      },
    ],
    page: 1,
    setRepos: fn(),
    setPage: fn(),
  },
};

export const WithFiveUsers: Story = {
  args: {
    user: 'user 2',
    loadingRepos: false,
    repos: [
      {
        userName: 'user 2',
        repositories: Array.from({ length: 5 }, (_, i) => ({
          name: `Repo ${i}`,
          description: 'simple description',
          stargazers_count: 13,
        })),
        loadMore: false,
      },
    ],
    page: 1,
    setRepos: fn(),
    setPage: fn(),
  },
};

export const WithoutUsers: Story = {
  args: {
    user: 'user 3',
    loadingRepos: false,
    repos: [
      {
        userName: 'user 3',
        repositories: [],
        loadMore: false,
      },
    ],
    page: 1,
    setRepos: fn(),
    setPage: fn(),
  },
};
