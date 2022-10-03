# Datavizs

Datavizs is yet another open source tools to create data visualizations with simple UI. Datavizs is client side apps (no server or login required), and all processing is done in the browser, so your data stays private. For now, the available features only maps (GeoJSON) editor, and more will be added in the future like chart editor.

## Features

### Maps Editor

![geojson-editor](./docs/maps-editor.png)

This feature let you create beautiful choropleth maps with your own data. Maps editor has a lot customization including legend, data editor, label, color, base maps, proportional maps, etc. You can import your GeoJSON file or use from available example, and edit, delete, or add a new data to your GeoJSON file. With maps editor, you can colorize each features on the maps or use legend generator to generate beautiful color gradient based on your data. Maps editor provides basemaps (OpenStreetMap and CartoDB) to make your maps more beautiful.


## Project

Datavizs was made with typescript using these tools:
- [Next.js](https://nextjs.org) ([React.js](https://reactjs.org/))
- [Mantine.dev](https://mantine.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
- [React-Leaflet](https://react-leaflet.js.org/)


And thanks to OpenStreetMap contributors [OpenStreetMap](https://www.openstreetmap.org/copyright) and [Carto](https://carto.com/attribution/)

### Linked Project

Datavizs has connection to [datavizs-geojson](https://github.com/jfraziz/datavizs-geojson) project, a collection of GeoJSON data and API. We need more contributors to add more GeoJSON data.

### Contribution

You can contribute to this project by creating a new issue with bug or feature request, or you can submit PR.
