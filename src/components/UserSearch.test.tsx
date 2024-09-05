import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserSearch from './UserSearch';

describe('UserSearch Component', () => {
  it('should call handleChangeUserName and handleSearch correctly', () => {
    const mockHandleChangeUserName = jest.fn();
    const mockHandleSearch = jest.fn();

    const username: string = 'testuser';
    const errorMessage: boolean = false;
    const loadingUsers: boolean = false;

    render(
      <UserSearch
        username={username}
        errorMessage={errorMessage}
        loadingUsers={loadingUsers}
        handleChangeUserName={mockHandleChangeUserName}
        handleSearch={mockHandleSearch}
      />
    );

    const inputElement = screen.getByRole('textbox', { name: /GitHub Username/i });
    fireEvent.change(inputElement, { target: { value: 'newuser' } });
    expect(mockHandleChangeUserName).toHaveBeenCalledWith('newuser');

    const buttonElement = screen.getByText('Search');
    fireEvent.click(buttonElement);
    expect(mockHandleSearch).toHaveBeenCalled();
  });

  it('should display an error message', () => {
    const mockHandleChangeUserName = jest.fn();
    const mockHandleSearch = jest.fn();

    const username = '';
    const errorMessage: boolean = true;
    const loadingUsers: boolean = false;

    render(
      <UserSearch
        username={username}
        errorMessage={errorMessage}
        loadingUsers={loadingUsers}
        handleChangeUserName={mockHandleChangeUserName}
        handleSearch={mockHandleSearch}
      />
    );

    expect(screen.getByText('Please, set username!')).toBeInTheDocument();
  });

  it('should render loading icon when loadingUsers is true', () => {
    const mockHandleChangeUserName = jest.fn();
    const mockHandleSearch = jest.fn();

    const username = 'testuser';
    const errorMessage: boolean = false;
    const loadingUsers: boolean = true;

    render(
      <UserSearch
        username={username}
        errorMessage={errorMessage}
        loadingUsers={loadingUsers}
        handleChangeUserName={mockHandleChangeUserName}
        handleSearch={mockHandleSearch}
      />
    );

    expect(screen.getByTestId('loading-icon')).toBeInTheDocument();
  });
});
