import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

it('should render the list component by default', () => {
  render(<App />);
  expect(screen.getByText('Star Wars Characters')).toBeInTheDocument();
});

it('should render the favourites page when navigated to', () => {
  render(<App />);
  userEvent.click(screen.getByText('Favourites'));
  expect(screen.getByText('Favourites list')).toBeInTheDocument();
});
