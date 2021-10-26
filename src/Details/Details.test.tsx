import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import * as api from '../api';
import Details from '.';

describe('Details', () => {
  let result: RenderResult;
  beforeEach(() => {
    jest.spyOn(api, 'findFilms').mockResolvedValue(['film title 1']);
    jest.spyOn(api, 'findStarships').mockResolvedValue(['starship 1']);

    const location = {
      state: {
        name: 'person',
        eye_color: 'red',
        hair_color: 'blue',
        gender: 'm',
        homeworld: 'tatooine',
        films: ['url1', 'url2'],
        starships: ['url1', 'url2'],
      },
    };
    result = render(
      <MemoryRouter>
        <Details location={location} />
      </MemoryRouter>,
    );
  });
  it('should show the character details, films and starships passed from the list', () => {
    expect(result.container).toMatchSnapshot();
  });

  it('should show a favourites button', () => {});
});
