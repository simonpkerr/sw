import { useEffect, useState } from 'react';
import { findFilms, findStarships } from '../api';

type DetailsProps = { films: null | string[]; starships: null | string[] };
const Details = ({ location }: any) => {
  const [characterDetails, setCharacterDetails] = useState<DetailsProps>({
    films: null,
    starships: null,
  });
  useEffect(() => {
    const getDetails = async () => {
      const films = location?.state?.films;
      const starships = location?.state?.starships;

      if (films && starships) {
        const filmData = await findFilms(films);
        const starshipData = await findStarships(starships);
        setCharacterDetails({ films: filmData, starships: starshipData });
      }
    };

    getDetails();
  }, [location]);

  const character = location?.state;

  return character ? (
    <>
      <h1>{character.name}</h1>
      <ul>
        <li>Hair colour: {character.hair_color}</li>
        <li>Eye colour: {character.eye_color}</li>
        <li>Gender: {character.gender}</li>
        <li>Home planet: {character.homeworld}</li>
      </ul>
      {characterDetails.films && characterDetails.films.length > 0 && (
        <>
          <h2>Films</h2>
          <ul>
            {characterDetails.films.map((film, i) => (
              <li key={i}>{film}</li>
            ))}
          </ul>
        </>
      )}
      {characterDetails.starships && characterDetails.starships.length > 0 && (
        <>
          <h2>Starships</h2>
          <ul>
            {characterDetails.starships.map((starship, i) => (
              <li key={i}>{starship}</li>
            ))}
          </ul>
        </>
      )}
    </>
  ) : null;
};

export default Details;
