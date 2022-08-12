import {
  Group,
  Line,
  Geo,
  SpineProps,
  DocumentProps
} from "./types/types"

export function getSpineData(
  props: {
    document: DocumentProps;
    spine: SpineProps;
  }): Geo {


  const {
    height,
    margin,
    gutter,
    line_spacing,
  } = props.document;

  const { spine } = props;

  let geo: Geo = {
    spine: {
      groups: [],
      helpers: [],
      geometry: []
    }
  };

  const group: Group = {
    type: "g",
    transform: `translate(${gutter},${margin})`
  }
  geo.spine.groups.push(group)

  const line1: Line = {
    group: 0,
    type: "line",
    x1: 0,
    x2: 0,
    y1: 0,
    y2: height - margin*2,
    class: "spine-style"
  }
  geo.spine.geometry.push(line1)

  const line2: Line = {
    group: 0,
    type: "line",
    x1: line_spacing,
    x2: line_spacing,
    y1: line_spacing,
    y2: height - margin*2 - line_spacing,
    class: "spine-style"
  }
  geo.spine.geometry.push(line2)

  const line3: Line = {
    group: 0,
    type: "line",
    x1: line_spacing + spine.width,
    x2: line_spacing + spine.width,
    y1: line_spacing + spine.width/2,
    y2: height - margin*2 - line_spacing - spine.width/2,
    class: "spine-style"
  }
  geo.spine.geometry.push(line3)

  const line4: Line = {
    group: 0,
    type: "line",
    x1: line_spacing*2 + spine.width,
    x2: line_spacing*2 + spine.width,
    y1: line_spacing*2 + spine.width/2,
    y2: height - margin*2 - line_spacing*2 - spine.width/2,
    class: "spine-style"
  }
  geo.spine.geometry.push(line4)

  return geo
}