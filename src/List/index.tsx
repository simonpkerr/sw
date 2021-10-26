import { useEffect, useState } from 'react';
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
  const [pagingControls, setPagingControls] = useState({
    previous: null,
    next: null,
  });
  const [page, setPage] = useState(1);
  useEffect(() => {
    const getCharacters = async () => {
      const { results, previous, next } = await findCharacters({ page });
      setData(results);
      setPagingControls({ previous, next });
    };

    getCharacters();
  }, [page]);

  return (
    <>
      <h2>Star Wars Characters</h2>
      <p>Showing page {page}</p>
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
