import axios from 'axios';
import { findCharacters, findHomeworld } from '.';

jest.mock('axios');
describe('API', () => {
  describe('findCharacters', () => {
    beforeEach(() => {
      // @ts-ignore
      axios.get.mockResolvedValue({
        data: { results: [{ name: 'Luke Skywalker' }] },
      });
    });

    it('should call the correct endpoint and return characters', () => {
      findCharacters();
      expect(axios.get).toBeCalledWith('https://swapi.dev/api/people/?page=1');
    });

    it('should accept a page number', () => {
      findCharacters({ page: 2 });
      expect(axios.get).toBeCalledWith('https://swapi.dev/api/people/?page=2');
    });

    it('should accept a search parameter', () => {
      findCharacters({ searchParam: 'luke' });
      expect(axios.get).toBeCalledWith(
        'https://swapi.dev/api/people/?page=1&search=luke',
      );
    });
  });

  describe('findHomeworld', () => {
    it('should call the correct endpoint and return a homeworld object', () => {
      // @ts-ignore
      axios.get.mockResolvedValue({
        data: { name: 'Tatooine' },
      });
      findHomeworld('https://swapi.dev/api/planets/1');
      expect(axios.get).toBeCalledWith('https://swapi.dev/api/planets/1');
    });
  });
});
