import { draw } from "./draw";
import * as d3 from "d3";
import { Geo, Layer, Group} from "./types/types";
import * as proto_data from "./createData";
import * as document_props from "./json/document_props.json";
import addLayersToData from "./addLayersToData";
import createSettingsMenu from "./createSettingsMenu";


function renderAll(data: any) {

  const svg = d3.select("#takeme")
    .append('svg')
    .attr('width', document_props.width)
    .attr('height', document_props.height)
    .style('background-color', 'white');

  let rendered_data: any = {}

  for (const part in data) { // part: spine, frame : should create groups on this level

    rendered_data[part] = {};

    let geo: Geo = data[part];

    for (const obj_name in geo) { // obj_name: rect2, line6, etc

      rendered_data[part][obj_name] = {};

      const layer: Layer = geo[obj_name]

      // CREATE GROUP
      if (layer.groups.length !== 0) {

        if (!rendered_data[part][obj_name]['groups']) {
          rendered_data[part][obj_name]['groups'] = []
        }

        layer.groups.forEach((gData: any) => {
          let group = draw["g"](gData, svg)
          rendered_data[part][obj_name]['groups'].push(group)
        })
      }

      Object.keys(layer).forEach(key => {

        // Skip if we are creating a group
        // (groups has to be created first, then helpers, then geometry
        if (key !== "groups") {
          if (!rendered_data[part][obj_name][key]) {
            rendered_data[part][obj_name][key] = []
          }

          layer.groups.forEach((group: Group) => {
            let item = draw.g(group, svg)
            rendered_data[part][obj_name][key].push(item)
          })

          layer.helpers.forEach((helper) => {
            let appendTo = helper.group !== undefined
              ? rendered_data[part][obj_name]['groups'][helper.group]
              : svg
            let item;
            switch (helper.type) {
              case "line":
                item = draw.line(helper, appendTo)
                break
              case "rect":
                item = draw.rect(helper, appendTo)
                break
              case "path":
                item = draw.path(helper, appendTo)
                break
            }
            rendered_data[part][obj_name][key].push(item)
          })

          layer.geometry.forEach((geometry) => {
            let appendTo = geometry.group !== undefined
              ? rendered_data[part][obj_name]['groups'][geometry.group]
              : svg
            let item;
            switch (geometry.type) {
              case "line":
                item = draw.line(geometry, appendTo)
                break
              case "rect":
                item = draw.rect(geometry, appendTo)
                break
              case "path":
                item = draw.path(geometry, appendTo)
                break
            }
            rendered_data[part][obj_name][key].push(item)
          })

        }
      })
    }
  }

  if (document_props.mirror) {
    const svg2: any = document.getElementById("takeme2")
    const prevSvg: any = svg;
    svg2.appendChild(prevSvg.node().cloneNode(true))
  }

  return rendered_data;

}


// function updateAll(rendered_data: any, input_properties: any) {
//
//   console.log('input_properties', )
//
//
//   console.log('update all')
//   let spine = rendered_data.spine.spine;
//   console.log('spine', spine)
// }
//


(function init() {

  let body = document.getElementsByTagName("body")[0];
  let div1 = document.createElement("div");
  let div2 = document.createElement("div");
  body.appendChild(div1);
  body.appendChild(div2);

  addLayersToData()
  let input_properties = proto_data.data;
  let rendered_data = renderAll(input_properties);

  // createSettingsMenu()

  // updateAll(rendered_data, input_properties)

  console.log('rendered_data', rendered_data)


})()


