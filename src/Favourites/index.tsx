const Favourites = ({ favourites }: { favourites: any }) => (
  <>
    <div>Favourites list</div>
    {favourites && favourites.length > 0 ? (
      <ul>
        {favourites.map((f: any, i: number) => (
          <li key={i}>
            <div>
              <p>Name: {f.name}</p>
              <p>Height: {f.height}</p>
              <p>Gender: {f.gender}</p>
              <p>Homeworld: {f.homeworld}</p>
            </div>
          </li>
        ))}
      </ul>
    ) : null}
  </>
);

export default Favourites;
