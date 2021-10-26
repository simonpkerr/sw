import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Favourites from './Favourites';
import List from './List';

function App() {
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
            <Favourites />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
