### WEATHER API - NEXT.JS REBUILD

First started on layout and then fetched the APIs(created interfaces/types along with it). Created a component for current weather data to display. Added a useEffect for the geolocation to grab our current location. 

In our page.tsx, there's a useEffect to call our Forecast Api. Our forecast api is then mapping through the array of forecast and finding new instances of dates. Afterwards, we filter out the date that equals to the current date. We are then returning our Forecast Card Component, so that we can see the 5 day forecast!

Also have our search component, where on change, the value is saved. But when they click the search icon, we use a Hook to save or set the value of the weather city. When this value changes, the displayed data also changes to the corresponding city.