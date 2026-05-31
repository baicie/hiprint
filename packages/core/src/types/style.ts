export interface PrintStyle {
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string | number;
  color?: string;
  backgroundColor?: string;

  textAlign?: "left" | "center" | "right";
  verticalAlign?: "top" | "middle" | "bottom";

  borderColor?: string;
  borderWidth?: number;
  borderStyle?: "solid" | "dashed" | "dotted" | "none";

  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;

  lineHeight?: number;
}
