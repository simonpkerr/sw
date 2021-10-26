import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import * as api from '../api';
import List from '.';
import userEvent from '@testing-library/user-event';

describe('List', () => {
  beforeEach(() => {
    jest.spyOn(api, 'findHomeworld').mockResolvedValue({
      name: 'some planet',
    });

    // @ts-ignore
    jest.spyOn(api, 'findCharacters').mockResolvedValue({
      results: [{ name: 'Luke Skywalker' }],
      previous: 'url',
      next: 'url',
    });
    render(<List />);
  });
  it('should load the people list', async () => {
    // eslint-disable-next-line testing-library/await-async-utils
    await waitFor(() =>
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument(),
    );
  });

  it('should correctly paginate data', async () => {
    await waitFor(() => screen.getByText('next'));
    userEvent.click(screen.getByText('next'));
    expect(api.findCharacters).toBeCalledWith({ page: 2 });
    userEvent.click(screen.getByText('previous'));
    expect(api.findCharacters).toBeCalledWith({ page: 1 });
  });

  it('should search for specific characters', () => {
    fireEvent.change(screen.getByLabelText('Search'), {
      target: { value: 'luke' },
    });
    userEvent.click(screen.getByText('Search by name'));
    expect(api.findCharacters).toBeCalledWith({ page: 1, searchParam: 'luke' });
  });
});
