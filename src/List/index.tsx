import React, { useEffect, useState } from 'react';
import { findCharacters, findHomeworld } from '../api';

const ListItem = ({ character }: { character: any }) => {
  const [homeworld, setHomeworld] = useState<string | null>(null);
  useEffect(() => {
    const getHomeworld = async () => {
      const { name } = await findHomeworld(character.homeworld);
      setHomeworld(name);
    };

    getHomeworld();
  }, [character.homeworld]);

  return homeworld !== null ? (
    <li>
      <h3>{character.name}</h3>
      <p>Gender: {character.gender}</p>
      <p>Home planet: {homeworld}</p>
    </li>
  ) : null;
};

const List = () => {
  const [data, setData] = useState<[]>([]);
  const [search, setSearch] = useState<string>();
  const [searchString, setSearchString] = useState<string>('');
  const [pagingControls, setPagingControls] = useState({
    previous: null,
    next: null,
  });
  const [page, setPage] = useState(1);
  useEffect(() => {
    const getCharacters = async () => {
      const { results, previous, next } = await findCharacters({
        page,
        searchParam: search,
      });
      setData(results);
      setPagingControls({ previous, next });
    };

    getCharacters();
  }, [page, search]);

  const searchByName = (e: React.MouseEvent) => {
    setSearch(searchString);
  };

  return (
    <>
      <h2>Star Wars Characters</h2>
      <p>Showing page {page}</p>
      <label>
        Search
        <input
          type='text'
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
      </label>
      <button onClick={searchByName}>Search by name</button>
      {data && (
        <ul>
          {data.map((character: any, i: number) => (
            <ListItem character={character} key={i} />
          ))}
        </ul>
      )}
      {pagingControls.previous && (
        <button onClick={() => setPage(page - 1)}>previous</button>
      )}
      {pagingControls.next && (
        <button onClick={() => setPage(page + 1)}>next</button>
      )}
    </>
  );
};

export default List;
