import { render, screen } from '@testing-library/react';
import GitHubSearch from './GitHubSearch';

test('renders search button', () => {
  render(<GitHubSearch />);
  const searchButton = screen.getByText(/Search/i);
  expect(searchButton).toBeInTheDocument();
});
