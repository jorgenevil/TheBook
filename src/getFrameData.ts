import {
  Group,
  Rect,
  Geo,
  SpineProps,
  OuterProps,
  InnerProps,
  DocumentProps
} from "./types/types"


export function getFrameData(
  props: {
    document: DocumentProps;
    spine: SpineProps;
    outer: OuterProps;
    inner: InnerProps;
  }): Geo {
  
  const {
    gutter,
    line_spacing,
    width,
    height,
    margin
  } = props.document;

  const { spine, outer, inner } = props;

  const start_x = gutter + spine.width + line_spacing*2;
  const start_y = margin + outer.margin;
  const start_width = width - start_x - outer.margin - margin;
  const start_height = height - margin*2 - outer.margin*2;

  let geo : Geo = {
    frame: {
      groups: [],
      helpers: [],
      geometry: []
    }
  };

  const group: Group = {
    type: "g",
    transform: `translate(${start_x},${start_y})`
  }
  geo.frame.groups.push(group)

  let rect1: Rect = {
    group: 0,
    type: "rect",
    x: 0,
    y: 0,
    width: start_width,
    height: start_height,
    class: "frame-style"
  }
  geo.frame.geometry.push(rect1)

  let rect2: Rect = {
    group: 0,
    type: "rect",
    x: line_spacing,
    y: line_spacing,
    width: rect1.width - line_spacing*2,
    height: rect1.height - line_spacing*2,
    class: "frame-style"
  }
  geo.frame.geometry.push(rect2)

  let rect3: Rect = {
    group: 0,
    type: "rect",
    x: inner.width - line_spacing,
    y: inner.width - line_spacing,
    width: rect2.width - inner.width*2 + line_spacing*2,
    height: rect2.height - inner.width*2 + line_spacing*2,
    class: "frame-style"
  }
  geo.frame.geometry.push(rect3)

  let rect4: Rect = {
    group: 0,
    type: "rect",
    x: inner.width,
    y: inner.width,
    width: rect3.width - line_spacing*2,
    height: rect3.height - line_spacing*2,
    class: "frame-style"
  }
  geo.frame.geometry.push(rect4)

  return geo
}