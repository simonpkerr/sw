import axios from 'axios';

type SearchProps = {
  searchParam?: string;
  page?: number;
};

export const findCharacters = async ({
  searchParam,
  page = 1,
}: SearchProps = {}) => {
  const url = `https://swapi.dev/api/people/`;
  const response = await axios.get(
    `${url}?page=${page}${searchParam ? `&search=${searchParam}` : ''}`,
  );
  return response.data;
};

export const findHomeworld = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export const findFilms = async (urls: string[]) => {
  const response = await Promise.all(urls.map((url) => axios.get(url)));
  return response.map((r) => r.data.title);
};

export const findStarships = async (urls: string[]) => {
  const response = await Promise.all(urls.map((url) => axios.get(url)));
  return response.map((r) => r.data.name);
};
