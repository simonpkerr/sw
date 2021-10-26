# Starwars searcher

This is a create react app so just do an install and run `npm start` to start the app.

## Things to improve
* Test coverage is quite low due to time restrictions so this needs boosting.
* There are a lot of duplicated API calls made so a caching solution would be implemented. At a basic level this would be addings things like films, starships and homeworlds to local state in the App component and checking this local state before making an API call.
* The app only works if navigated through without refreshing the browser. If the user goes to the details page and hits refresh, no data will be available. So, implementing checks on the presence of data and conditionally doing further API calls to re-fetch it would be an idea.
* No state management solution was chosen due to the size of the app, but if it were to grow substantially larger, I'd consider either adding in redux, or look at one of the more atomic state management patterns that are emerging, such as recoil. 
* The presentation is very minimal. I would obviously work on improving the UX of the whole app (it is responsive though :) )
* In terms of features, I didn't get round to implementing the 'remove favourite' feature, but this would be a case of passing the 'setFavourites' function through to the favourites component, and adding a button next to each item. When the item was clicked, it would be removed from the favourites list. 