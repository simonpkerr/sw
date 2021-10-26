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
  useEffect(() => {
    const getCharacters = async () => {
      const { results, previous, next } = await findCharacters();
      setData(results);
    };

    getCharacters();
  }, []);

  return (
    <>
      <h2>Star Wars Characters</h2>
      {data && (
        <ul>
          {data.map((character: any, i: number) => (
            <ListItem character={character} key={i} />
          ))}
        </ul>
      )}
    </>
  );
};

export default List;
