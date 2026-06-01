export interface BarcodeBar {
  x: number;
  width: number;
}

export function encodePseudoCode128(value: string): BarcodeBar[] {
  const bars: BarcodeBar[] = [];
  let x = 0;

  for (const char of value) {
    const code = char.charCodeAt(0);

    for (let bit = 0; bit < 7; bit++) {
      const on = (code >> bit) & 1;
      const width = on ? 2 : 1;

      if (on) {
        bars.push({
          x,
          width,
        });
      }

      x += width + 1;
    }
  }

  return bars;
}
