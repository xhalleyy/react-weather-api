### WEATHER API - NEXT.JS REBUILD

-------Rebuild Weather App with Next.JS to display current weather data and 5 day forecast!---------
-------Have the ability to Search and Favorite Cities---------


Halley Pham


3/29/24


First started on layout and then fetched the APIs(created interfaces/types along with it). Created a component for current weather data to display. Added a useEffect for the geolocation to grab our current location. 

In our page.tsx, there's a useEffect to call our Forecast Api. Our forecast api is then mapping through the array of forecast and finding new instances of dates. Afterwards, we filter out the date that equals to the current date. We are then returning our Forecast Card Component, so that we can see the 5 day forecast!

Also have our search component, where on change, the value is saved. But when they click the search icon, we use a Hook to save or set the value of the weather city. When this value changes, the displayed data also changes to the corresponding city.

When the Favorites Button is clicked, it navigates to another page that renders the favorites. Local storage is mapped and is returning the favorites component.

Wasn't able to get the Favorites to navigate back to home page with the favorited city populating.


Peer Reviewer & Comments:

