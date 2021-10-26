import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Details from './Details';
import Favourites from './Favourites';
import List from './List';

function App() {
  const [favourites, setFavourites] = useState([]);
  return (
    <BrowserRouter>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/favourites'>Favourites</NavLink>
      </nav>
      <main>
        <Switch>
          <Route path='/' exact>
            <List />
          </Route>
          <Route path='/favourites'>
            <Favourites favourites={favourites} />
          </Route>
          <Route
            path='/details'
            component={(props: any) => (
              <Details
                {...props}
                favourites={favourites}
                setFavourites={setFavourites}
              />
            )}
          />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
