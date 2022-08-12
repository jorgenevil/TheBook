import { getOuterFrameHelpers } from "./getOuterFrameHelpers";
import { getOuterFrameCells } from "./getOuterFrameCells";
import { getSpineData } from "./getSpineData";
import { getFrameData } from "./getFrameData";
import {Geo, InputLayer} from "./types/types";

import * as document from "./json/document_props.json";
import * as spine from "./json/spine_props.json";
import * as inner from "./json/inner_props.json";
import * as outer from "./json/outer_props.json";

export let data: {[key: string]: Geo} = {
  outer_frame_helpers: getOuterFrameHelpers({ document, spine, outer }),
  spine: getSpineData({ document, spine }),
  frame: getFrameData({ document, spine, outer, inner }),
}

export function addLayer(layer: InputLayer) {
  const {
    geo_props_input,
    fill_geometry,
    id
  } = layer;
  data[id] = getOuterFrameCells({ document, spine, outer, geo_props_input, fill_geometry })
}
