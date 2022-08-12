import {
  Group,
  Rect,
  Path,
  Geo,
  OuterProps,
  SpineProps,
  DocumentProps,
  TransformGeometry, ObjectGeometry, GeoPropsInput
} from "./types/types"

import * as objects from "./json/objects.json";

function getTransformGeometry(
    props: {
      top_cell_width: number;
      right_cell_width: number;
      outer_margin: number;
      geo_props_input: GeoPropsInput;
      fill_geometry: ObjectGeometry;
    }): TransformGeometry {


  // DOCUMENT PROPERTIES
  let {
    top_cell_width,
    right_cell_width,
    outer_margin,
    geo_props_input,
    fill_geometry
  } = props;



  // Default properties
  let transform_geometry: TransformGeometry = {
    h: {
      render: geo_props_input.h.render,
      flip: geo_props_input.h.flip,
      rotate: geo_props_input.h.rotate,
      reflect: geo_props_input.h.reflect,
      scale: [1, 1],
      translate: [0, 0]
    },
    v: {
      render: geo_props_input.v.render,
      flip: geo_props_input.v.flip,
      rotate: geo_props_input.v.rotate,
      reflect: geo_props_input.v.reflect,
      scale: [1, 1],
      translate: [0, 0]      
    }
  }



  // *******************************
  // * HORIZONTAL (TOP AND BOTTOM) *
  // *******************************

  // –––––––
  // SCALE X
  // –––––––

  // If custom scale
  if (geo_props_input.h.scale.x) {
    transform_geometry.h.scale[0] = geo_props_input.h.scale.x
  }

  // If "fit to box" (overrides scale)
  if (geo_props_input.h.fit.x) {
    transform_geometry.h.scale[0] = top_cell_width/fill_geometry.width
  }

  // –––––––
  // SCALE Y
  // –––––––

  // If custom scale
  if (geo_props_input.h.scale.y) {
    transform_geometry.h.scale[1] = geo_props_input.h.scale.y
  }

  // If "fit to box" (overrides scale)
  if (geo_props_input.h.fit.y) {
    transform_geometry.h.scale[1] = outer_margin/fill_geometry.height
  }

  // ––––––––––––––––––
  // TRANSLATE (OFFSET)
  // ––––––––––––––––––
  transform_geometry.h.translate[0] = top_cell_width - top_cell_width + geo_props_input.h.offset.x;
  transform_geometry.h.translate[1] = geo_props_input.h.offset.y;



  // *****************************
  // * VERTICAL (LEFT AND RIGHT) *
  // *****************************

  // –––––––
  // SCALE X
  // –––––––

  // If custom scale
  if (geo_props_input.v.scale.x) {
    transform_geometry.v.scale[0] = geo_props_input.v.scale.x
  }

  // If "fit to box" (overrides scale)
  if (geo_props_input.v.fit.x) {
    transform_geometry.v.scale[0] = right_cell_width/fill_geometry.width
  }

  // –––––––
  // SCALE Y
  // –––––––

  // If custom scale
  if (geo_props_input.v.scale.y) {
    transform_geometry.v.scale[1] = geo_props_input.v.scale.y
  }

  // If "fit to box" (overrides scale)
  if (geo_props_input.v.fit.y) {
    transform_geometry.v.scale[1] = outer_margin/fill_geometry.height;
  }

  // ––––––––––––––––––
  // TRANSLATE (OFFSET)
  // ––––––––––––––––––
  transform_geometry.v.translate[0] = right_cell_width + geo_props_input.v.offset.x - right_cell_width;
  transform_geometry.v.translate[1] = -outer_margin + geo_props_input.v.offset.y


  return transform_geometry

}


export function getOuterFrameCells(
  props: {
    document: DocumentProps;
    spine: SpineProps;
    outer: OuterProps;
    geo_props_input: GeoPropsInput;
    fill_geometry: ObjectGeometry
  }): Geo {
  
  const {
    gutter,
    line_spacing,
    width,
    height,
    margin,
    helpers
  } = props.document;

  const {
    spine,
    outer,
    geo_props_input,
    fill_geometry
  } = props;


  // Calculate all the cell properties
  const left_x = gutter + spine.width + line_spacing*2;
  const right_x = width - margin - outer.margin;
  const top_y = margin + outer.margin;
  const bottom_y = height - margin - outer.margin;
  const frame_width = right_x - left_x;
  const frame_height = bottom_y - top_y;
  const top_cell_width = frame_width / outer.top_sections;
  const right_cell_width = frame_height / outer.right_sections;
  const cell_height = outer.margin / outer.v_sections;

  // Get the geometry properties
  let transform_geometry: TransformGeometry = getTransformGeometry(
    {
      top_cell_width,
      right_cell_width,
      outer_margin: outer.margin,
      geo_props_input,
      fill_geometry
    }
  )


  // To store geometric objects (to return)
  let geo: Geo = {
    top: {
      groups: [],
      helpers: [],
      geometry: []
    },
    bottom: {
      groups: [],
      helpers: [],
      geometry: []
    },
    right: {
      groups: [],
      helpers: [],
      geometry: []
    },
    top_corner: {
      groups: [],
      helpers: [],
      geometry: []
    },
    bottom_corner: {
      groups: [],
      helpers: [],
      geometry: []
    }
  };


  // If we are rendering horizontal (top and bottom)
  if (transform_geometry.h.render) {

    // Top cells
    for (let i = 0; i<outer.top_sections; i++) {

      let translate_x = transform_geometry.h.flip 
        ? i % 2 ? 0 : top_cell_width
        : i % 2 ? top_cell_width : 0

      let scale_x = transform_geometry.h.flip
        ? i % 2 ? 1 : -1
        : i % 2 ? -1 : 1

      let translate = {
        x: left_x + top_cell_width*i + (transform_geometry.h.reflect ? translate_x : 0),
        y: margin 
      }

      // Flip even
      let scale = {
        x: transform_geometry.h.reflect ? scale_x : 1,
        y: 1
      }

      // Group
      let group: Group = {
        type: "g",
        transform: `translate(${translate.x},${translate.y}) scale(${scale.x}, ${scale.y})`
      }
      geo.top.groups.push(group)

      // Helpers
      if (helpers) {

        let helper: Rect = {
          group: i,
          type: "rect",
          class: "help_cell",
          x: 0,
          y: 0,
          width: top_cell_width,
          height: outer.margin
        }
        geo.top.helpers.push(helper)

      }    

      // Geometry
      fill_geometry.geometry.forEach(({type, data}) => {
        if (type === "path") {
          let _geometry: Path = {
            group: i,
            type: "path",
            d: data,
            class: "line-class",
            transform: `
            rotate(${transform_geometry.h.rotate})
            translate(${transform_geometry.h.translate.join(',')})
            scale(${transform_geometry.h.scale.join(',')})
          `
          }
          geo.top.geometry.push(_geometry)
        }
      })
    }


    // Bottom cells
    for (let i = 0; i<outer.top_sections; i++) {

      let translate_x = transform_geometry.h.flip 
        ? i % 2 ? 0 : top_cell_width
        : i % 2 ? top_cell_width : 0 

      let scale_x = transform_geometry.h.flip
        ? i % 2 ? 1 : -1
        : i % 2 ? -1 : 1

      let translate = {
        x: left_x + top_cell_width*i + (transform_geometry.h.reflect ? translate_x : 0),
        y: bottom_y + outer.margin  
      }
      // Flip even
      let scale = {
        x: transform_geometry.h.reflect ? scale_x : 1,
        y: -1
      }

      // Group
      let group: Group = {
        type: "g",
        transform: `translate(${translate.x},${translate.y}) scale(${scale.x}, ${scale.y})`
      }
      geo.bottom.groups.push(group)


      // Helpers
      if (helpers) {
        let helper: Rect = {
          group: i,
          type: "rect",
          class: "help_cell",
          x: 0,
          y: 0,
          width: top_cell_width,
          height: outer.margin
        }
        geo.bottom.helpers.push(helper)
      }

      // Geometry
      fill_geometry.geometry.forEach(({data: path}) => {

        let _geometry: Path = {
          group: i,
          type: "path",
          d: path,
          class: "line-class",
          transform: `
            rotate(${transform_geometry.h.rotate})
            translate(${transform_geometry.h.translate.join(',')})
            scale(${transform_geometry.h.scale.join(',')})
          `
        }

        geo.bottom.geometry.push(_geometry)
      })
    }    

  }

  // If we are rendering vertical (left and right)
  if (transform_geometry.v.render) {

    // Right cells
    for (let i = 0; i<outer.right_sections; i++) {

      let translate_y = transform_geometry.v.flip
        ? i % 2 ? right_cell_width : 0
        : i % 2 ? 0 : right_cell_width

      let scale_y = transform_geometry.v.flip
        ? i % 2 ? -1 : 1
        : i % 2 ? 1 : -1


      let translate = {
        x: right_x,
        y: margin + outer.margin + right_cell_width*i + (transform_geometry.v.reflect ? translate_y : 0)
      }

      // Flip even
      let scale = {
        x: 1,
        y: transform_geometry.v.reflect ? scale_y : 1
      }    

      // Group
      let group: Group = {
        type: "g",
        transform: `translate(${translate.x},${translate.y}) scale(${scale.x}, ${scale.y})`
      }
      geo.right.groups.push(group)

      // Helpers
      if (helpers) {
        
        let helper: Rect = {
          group: i,
          type: "rect",
          class: "help_cell",
          x: 0,
          y: 0,
          width: outer.margin,
          height: right_cell_width
        }
        geo.right.helpers.push(helper)
      }

      // Geometry
      fill_geometry.geometry.forEach(({data: path}) => {
        
        let _geometry: Path = {
          group: i,
          type: "path",
          d: path,
          class: "line-class",
          transform: `
            rotate(${transform_geometry.v.rotate})
            translate(${transform_geometry.v.translate.join(',')})
            scale(${transform_geometry.v.scale.join(',')})
          `
        }
        geo.right.geometry.push(_geometry)

      })


    }

  }


  // Top right corner
  let group_top: Group = {
    type: "g",
    transform: `translate(${right_x},${margin})`
  }
  geo.top_corner.groups.push(group_top)

  let rect_top: Rect = {
    group: 0,
    type: "rect",
    class: "help_cell",
    x: 0,
    y: 0,
    width: width - right_x - margin,
    height: width - right_x - margin
  }
  geo.top_corner.geometry.push(rect_top)


  // Bottom right corner
  let group_bottom: Group = {
    type: "g",
    transform: `translate(${right_x},${bottom_y})`
  }
  geo.bottom_corner.groups.push(group_bottom)

  let rect_bottom: Rect = {
    group: 0,
    type: "rect",
    class: "help_cell",
    x: 0,
    y: 0,
    width: width - right_x - margin,
    height: width - right_x - margin
  }
  geo.bottom_corner.geometry.push(rect_bottom)

  return geo;
}
