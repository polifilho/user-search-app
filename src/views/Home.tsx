import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { searchUsers } from '../services/github-web-api';
import UserSearch from '../components/UserSearch';
import UserItem from '../components/UserItem';
import { ReposType } from '../types';

const Home: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [loadingUsers, setUsersLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [repos, setRepos] = useState<ReposType[]>([]);
  const [users, setUsers] = useState<string[]>([]);

  const handleSearch = async () => {
    if (!username || username === '') {
      setErrorMessage(true);
      return;
    }
    setUsersLoading(true);
    const result = await searchUsers(username);
    setUsers(result);
    setRepos([]);
    setUsersLoading(false);
  };

  const handleChangeUserName = (user: string) => {
    setUsername(user);
    if (user.length >= 3) {
      setErrorMessage(false);
    }
  };

  return (
    <Grid>
      <UserSearch
        username={username}
        errorMessage={errorMessage}
        loadingUsers={loadingUsers}
        handleChangeUserName={handleChangeUserName}
        handleSearch={handleSearch}
      />
      <UserItem users={users} repos={repos} setRepos={setRepos} />
    </Grid>
  );
};

export default Home;
