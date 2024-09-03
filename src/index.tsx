import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './views/Home';
import { Container } from '@mui/material';
import reportWebVitals from './reportWebVitals';
import { CONTENT } from './communs';

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Container maxWidth="md">
      <h1>{CONTENT.search.mainTitle}</h1>
      <Home />
    </Container>
  </React.StrictMode>
);

reportWebVitals();
