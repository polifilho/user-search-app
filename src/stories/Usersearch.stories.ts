import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import UserSearch from '../components/UserSearch';

const meta = {
  title: 'Example/UserSearch',
  component: UserSearch,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof UserSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithUserName: Story = {
  args: {
    username: 'User name',
    errorMessage: false,
    loadingUsers: false,
    handleChangeUserName: fn(),
    handleSearch: fn(),
  },
};

export const WithErrorMessage: Story = {
  args: {
    username: '',
    errorMessage: true,
    loadingUsers: false,
    handleChangeUserName: fn(),
    handleSearch: fn(),
  },
};

export const WithLoading: Story = {
  args: {
    username: 'User name',
    errorMessage: false,
    loadingUsers: true,
    handleChangeUserName: fn(),
    handleSearch: fn(),
  },
};
