import * as layer_1_props from "./layer_1_props.json";
// import * as layer_2_props from "./layer_2_props.json";
import * as objects from "../json/objects.json";

export const layers = [
  {
    geo_props_input: layer_1_props,
    fill_geometry: objects["001"]
  },
  // {
  //   geo_props_input: layer_2_props,
  //   fill_geometry: objects["002"]
  // },
]

