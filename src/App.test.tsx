import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('should render the correct components', () => {
  render(<App />);
  expect(screen.getByText('Star wars characters')).toBeInTheDocument();
});
