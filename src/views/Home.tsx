import React, { useState } from 'react';
import { Grid, Alert } from '@mui/material';
import { searchUsers } from '../services/github-web-api';
import UserSearch from '../components/UserSearch';
import UserItem from '../components/UserItem';
import { ReposType } from '../types';
import { CONTENT } from '../communs';

const Home: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [loadingUsers, setUsersLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [repos, setRepos] = useState<ReposType[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [requestError, setRequestError] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!username || username === '') {
      setErrorMessage(true);
      return;
    }
    setUsersLoading(true);
    const result = await searchUsers(username);
    if (typeof result === 'string') {
      setRequestError(true);
    } else {
      setUsers(result);
      setRepos([]);
      setUsersLoading(false);
      setRequestError(false);
    }
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
      {requestError && users.length === 0 && (
        <Alert style={{ marginTop: 10 }} severity="error">
          {CONTENT.commons.errorRequest}
        </Alert>
      )}
      <UserItem users={users} repos={repos} setRepos={setRepos} />
    </Grid>
  );
};

export default Home;
