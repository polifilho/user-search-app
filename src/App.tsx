import React from 'react';
import GitHubSearch from './components/GitHubSearch';
import { Container } from '@mui/material';

function App() {
  return (
    <Container maxWidth="md">
      <h1>GitHub User Search</h1>
      <GitHubSearch />
    </Container>
  );
}

export default App;
