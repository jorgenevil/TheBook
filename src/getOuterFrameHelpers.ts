import {
  Line,
  Geo,
  DocumentProps,
  SpineProps,
  OuterProps
} from "./types/types"


export function getOuterFrameHelpers(
  props: {
    document: DocumentProps;
    spine: SpineProps;
    outer: OuterProps;
  }): Geo {

  const {
    gutter,
    line_spacing,
    width,
    height,
    margin,
    helpers
  } = props.document;

  const { spine, outer } = props;

  if (!helpers) {
    return {}
  }

  const left_x = gutter + spine.width + line_spacing*2;
  const right_x = width - margin - outer.margin;
  const top_y = margin + outer.margin;
  const bottom_y = height - margin - outer.margin;
  const frame_width = right_x - left_x;
  const frame_height = bottom_y - top_y;
  const top_cell_width = frame_width / outer.top_sections;
  const right_cell_width = frame_height / outer.right_sections;
  const cell_height = outer.margin / outer.v_sections;

  
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



  // Top lines
  for (let i = 0; i<outer.top_sections+1; i++) {

    let line: Line = {
      type: "line",
      x1: left_x + top_cell_width*i,
      x2: left_x + top_cell_width*i,
      y1: margin,
      y2: top_y,
      class: "helper-style-1"
    }
    geo.top.helpers.push(line)

  }

  // Top lines - offset
  for (let i = 0; i<outer.top_sections; i++) {
    
    let line: Line = {
      type: "line",
      x1: left_x + top_cell_width*i + top_cell_width/2,
      x2: left_x + top_cell_width*i + top_cell_width/2,
      y1: margin,
      y2: top_y,
      class: "helper-style-2"
    }
    geo.top.helpers.push(line)

  }

  // Bottom lines
  for (let i = 0; i<outer.top_sections+1; i++) {
    
    let line: Line = {
      type: "line",
      x1: left_x + top_cell_width*i,
      x2: left_x + top_cell_width*i,
      y1: bottom_y,
      y2: height - margin,
      class: "helper-style-1"
    }
    geo.bottom.helpers.push(line)

  }

  // Bottom lines - offset
  for (let i = 0; i<outer.top_sections; i++) {
    
    let line: Line = {
      type: "line",
      x1: left_x + top_cell_width*i + top_cell_width/2,
      x2: left_x + top_cell_width*i + top_cell_width/2,
      y1: bottom_y,
      y2: height - margin,
      class: "helper-style-2"
    }
    geo.bottom.helpers.push(line)

  }  

  // Right lines
  for (let i = 0; i<outer.right_sections+1; i++) {

    let line: Line = {
      type: "line",
      x1: right_x,
      x2: width - margin,
      y1: top_y + right_cell_width*i,
      y2: top_y + right_cell_width*i,
      class: "helper-style-1"
    }
    geo.right.helpers.push(line)

  }

  // Right offset
  for (let i = 0; i<outer.right_sections; i++) {

    let line: Line = {
      type: "line",
      x1: right_x,
      x2: width - margin,
      y1: top_y + right_cell_width*i + right_cell_width/2,
      y2: top_y + right_cell_width*i + right_cell_width/2,
      class: "helper-style-2"
    }
    geo.right.helpers.push(line)

  }


  // Horizontal: top
  for (let i = 0; i<outer.v_sections+1; i++) {

    let line: Line = {
      type: "line",
      x1: left_x,
      x2: width - margin,
      y1: margin + cell_height*i,
      y2: margin + cell_height*i,
      class: "helper-style-3"
    }
    geo.top.helpers.push(line)

  }

  // Horizontal: bottom
  for (let i = 0; i<outer.v_sections+1; i++) {

    let line: Line = {
      type: "line",
      x1: left_x,
      x2: width - margin,
      y1: bottom_y + cell_height*i,
      y2: bottom_y + cell_height*i,
      class: "helper-style-3"
    }
    geo.bottom.helpers.push(line)

  }

  // Horizontal: right
  for (let i = 0; i<outer.v_sections+1; i++) {

    let line: Line = {
      type: "line",
      x1: right_x + cell_height*i,
      x2: right_x + cell_height*i,
      y1: margin,
      y2: height - margin,
      class: "helper-style-3"
    }
    geo.right.helpers.push(line)

  }

  return geo
}