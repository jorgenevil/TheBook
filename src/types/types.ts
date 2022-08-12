export interface Group {
  type: string;
  transform: string;
}

interface ProtoGeo {
  type: "rect" | "line" | "path";
  group?: number;
  class?: string;
}

export interface Line extends ProtoGeo {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export interface Rect extends ProtoGeo {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Path extends ProtoGeo {
  d: string;
  class?: string;
  transform: string  
}


export type Groups = Array<Group>;
export type Helpers = Array<any>;
export type Geometries = Array<any>;

export interface Layer {
  groups: Groups
  helpers: Helpers;
  geometry: Geometries;
}

export interface Geo {
  [key: string]: Layer;
}


export interface ObjectGeometry {
  id: string;
  name: string;
  width: number;
  height: number,
  geometry: Array<{type: string, data: string}>
}


export interface DocumentProps {
  helpers: boolean;
  width: number;
  height: number;
  margin: number;
  gutter: number;
  line_spacing: number;
}

export interface SpineProps {
  width: number;
}

export interface InnerProps {
  width: number;
  v_sections: number;
  top_sections: number;
  right_sections: number;
}

export interface OuterProps {
  margin: number;
  v_sections: number;
  top_sections: number;
  right_sections: number;
}

export interface GeoProps {
  render: boolean;
  flip: boolean;
  rotate: number;
  reflect: boolean
  scale: [number, number],
  translate: [number, number]
}

export interface TransformGeometry {
  h: GeoProps;
  v: GeoProps;
}


interface GeoPropsEach {
  flip: boolean;
  render: boolean;
  reflect: boolean;
  fit: {
    x: boolean;
    y: boolean;
  },
  scale: {
    x: number;
    y: number;
  },
  offset: {
    x: number;
    y: number;
  },
  rotate: number;
}

export interface GeoPropsInput {
  h: GeoPropsEach;
  v: GeoPropsEach;
}

export interface InputLayer {
  id: string;
  geo_props_input: GeoPropsInput;
  fill_geometry: ObjectGeometry;
}

