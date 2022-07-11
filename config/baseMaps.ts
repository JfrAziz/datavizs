export interface BaseMap {
  name: string;
  attribution: string | undefined;
  baseMap: string
};

const baseMaps: BaseMap[] = [
  {
    name: "Open Street Maps",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    baseMap: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  },
  {
    name: "OSM Mapnik",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    baseMap: "https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
  },
  {
    name: "CartoDB Positron No Labels",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    baseMap: "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
  },
  {
    name: "CartoDB Dark Matter No Labels",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    baseMap: "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png"
  },
  {
    name: "CartoDB Voyager No Labels",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    baseMap: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png"
  },
  {
    name: "No Base Maps",
    baseMap: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: undefined
  }
]

export { baseMaps }