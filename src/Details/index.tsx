import React, { useEffect, useState } from 'react';
import { findFilms, findStarships } from '../api';

type DetailsProps = { films: null | string[]; starships: null | string[] };
const Details = ({ location, favourites, setFavourites }: any) => {
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

  const addToFavourites = (e: React.MouseEvent) => {
    e.preventDefault();
    const favourite = {
      name: character.name,
      height: character.height,
      gender: character.gender,
      homeworld: character.homeworld,
    };
    // should check here first to see if item already added

    const newFavourites = [...favourites];
    newFavourites.push(favourite);
    setFavourites(newFavourites);
  };

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
      <button onClick={addToFavourites}>Add to favourites</button>
    </>
  ) : null;
};

export default Details;
