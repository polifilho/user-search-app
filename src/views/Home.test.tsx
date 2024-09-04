import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders TextField and Button', () => {
  render(<Home />);

  const textFieldElement = screen.getByRole('textbox', { name: /GitHub Username/i });
  expect(textFieldElement).toBeInTheDocument();

  const buttonElement = screen.getByRole('button', { name: /search/i });
  expect(buttonElement).toBeInTheDocument();
});