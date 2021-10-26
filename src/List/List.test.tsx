import { render, screen, waitFor } from '@testing-library/react';
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

  it('should render the previous page when next is pressed', async () => {});
});
