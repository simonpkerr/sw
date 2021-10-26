import { render, screen, waitFor } from '@testing-library/react';
import * as api from '../api';
import List from '.';

describe('List', () => {
  beforeEach(() => {
    // @ts-ignore
    jest.spyOn(api, 'findCharacters').mockResolvedValue({
      results: [{ name: 'Luke Skywalker' }],
    });
  });
  it('should load the people list', () => {
    render(<List />);
    // eslint-disable-next-line testing-library/await-async-utils
    waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });
});
