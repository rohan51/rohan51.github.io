# rohan51.github.io

This project is a demo of how the Foursquare venues API can be used. The application is built using angular (v1), and bootstrap. To retrieve venues, the app either uses the user's current location, or the user can specify a location in the location text input field in various formats eg. City name ("Chicago, IL"); Latitude/Longitude ("47.24,42.35")

## Next steps/Improvements

- Minify scripts for smaller payload
- Show paginated results. Right now, a maximum of 20 results are shown.
- Do marker clustering so the marker labels doesn't overlap. This is functionality provided by the Google Maps API, so that when zoomed out a single marker is shown with a count indicating how many markers it represents, which can then be seen by zooming further into the map.
- Implementing a more mobile friendly layout. In the current form, the map is always shown beside the list of results, which requires a min width to be set on the page, and which means the page might scroll horizontally on mobile devices. For a more mobile friendly layout, after a certain width, the map and list of results can align vertically instead of being shown side by side.