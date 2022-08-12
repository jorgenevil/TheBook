import { layers } from "./layers/layers";
import { addLayer } from "./createData";

export default function addLayersToData() {
  layers.forEach((_layer, index) => {
    addLayer({..._layer, id: `layer-${index}`})
  })
}
