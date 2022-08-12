import {
  Group,
  Rect,
  Line,
  Path
} from "./types/types"

export const draw = {

  g: (d: Group, parent: any) => (
    parent.append('g')
      .attr("transform", d.transform)
  ),
  
  line: (d: Line, parent: any) => (
    parent.append('line')
      .classed(d.class, !!d.class)
      .attr("x1", d.x1)
      .attr("x2", d.x2)
      .attr("y1", d.y1)
      .attr("y2", d.y2)
  ),

  rect: (d: Rect, parent: any) => (
    parent.append('rect')
      .classed(d.class, !!d.class)
      .attr("x", d.x)
      .attr("y", d.y)
      .attr("width", d.width)
      .attr("height", d.height)
  ),

  path: (data: Path, parent: any) => (
    parent.append('path')
      .attr("d", data.d)
      .attr("transform", data.transform)
      .classed(data.class, !!data.class)
  )


}

