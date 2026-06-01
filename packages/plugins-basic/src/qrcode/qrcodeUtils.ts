export function createPseudoQrSvg(doc: Document, value: string): SVGSVGElement {
  const size = 21;
  const svg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");

  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", `0 0 ${size} ${size}`);

  const bg = doc.createElementNS("http://www.w3.org/2000/svg", "rect");
  bg.setAttribute("x", "0");
  bg.setAttribute("y", "0");
  bg.setAttribute("width", String(size));
  bg.setAttribute("height", String(size));
  bg.setAttribute("fill", "#fff");
  svg.appendChild(bg);

  const seed = hash(value);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (isFinder(x, y, size) || shouldFill(seed, x, y)) {
        const rect = doc.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", String(x));
        rect.setAttribute("y", String(y));
        rect.setAttribute("width", "1");
        rect.setAttribute("height", "1");
        rect.setAttribute("fill", "#000");
        svg.appendChild(rect);
      }
    }
  }

  return svg;
}

function hash(value: string): number {
  let result = 0;

  for (const char of value) {
    result = (result * 31 + char.charCodeAt(0)) >>> 0;
  }

  return result;
}

function shouldFill(seed: number, x: number, y: number): boolean {
  return (seed + x * 17 + y * 31) % 5 < 2;
}

function isFinder(x: number, y: number, size: number): boolean {
  return (
    inFinder(x, y, 0, 0) ||
    inFinder(x, y, size - 7, 0) ||
    inFinder(x, y, 0, size - 7)
  );
}

function inFinder(
  x: number,
  y: number,
  startX: number,
  startY: number,
): boolean {
  const localX = x - startX;
  const localY = y - startY;

  if (localX < 0 || localY < 0 || localX >= 7 || localY >= 7) {
    return false;
  }

  return (
    localX === 0 ||
    localY === 0 ||
    localX === 6 ||
    localY === 6 ||
    (localX >= 2 && localX <= 4 && localY >= 2 && localY <= 4)
  );
}
