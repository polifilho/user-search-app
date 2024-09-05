import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import UserItem from '../components/UserItem';

const meta = {
  title: 'Example/UserItem',
  component: UserItem,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof UserItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithFiveUsers: Story = {
  args: {
    users: ['user 1', 'user 2', 'user 3', 'user 4', 'user 5'],
    repos: [],
    setRepos: fn(),
  },
};

export const WithTwoUsers: Story = {
  args: {
    users: ['user 1', 'user 2'],
    repos: [],
    setRepos: fn(),
  },
};
