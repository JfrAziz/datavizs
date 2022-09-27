// default color for each features
export const DEFAULT_FEATURE_COLOR = "#aaaaaa";

// default color for proportional circle
export const DEFAULT_CIRCLE_BORDER_COLOR = "#1FCFB7";
export const DEFAULT_CIRCLE_FILL_COLOR = "rgba(31, 207, 183, 0.54)";

// defautl basemap color
export const DEFAULT_BASEMAP_COLOR = "#d5e8eb";

// css variable name for base map color
export const LEAFLET_CUSTOM_COLOR_VAR = "--leaflet-custom-bg-color";

// basemaps
export interface BaseMap {
  name: string;
  attribution: string;
  baseMap: string
};

export const baseMaps: BaseMap[] = [
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
  }
]

// maps container
export const DEFAULT_MAPS_WIDTH = 800

export const DEFAULT_MAPS_HEIGHT = 600

export const MAPS_MAX_WIDTH = 2048

export const MAPS_MAX_HEIGHT = 2048