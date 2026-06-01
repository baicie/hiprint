import type {
  MeasureTextInput,
  MeasureTextResult,
  TextMeasurer,
} from "./types";

export class DefaultTextMeasurer implements TextMeasurer {
  measure(input: MeasureTextInput): MeasureTextResult {
    const fontSize = input.fontSize || 12;
    const lineHeight = input.lineHeight || fontSize * 1.2;
    const text = input.text || "";

    const charWidth = estimateCharWidth(fontSize);
    const maxWidth = input.maxWidth;

    const lines =
      maxWidth && maxWidth > 0
        ? wrapText(text, maxWidth, charWidth)
        : splitLines(text);

    const width = maxWidth
      ? Math.min(
          maxWidth,
          Math.max(...lines.map((line) => line.length * charWidth), 0),
        )
      : Math.max(...lines.map((line) => line.length * charWidth), 0);

    return {
      width,
      height: lines.length * lineHeight,
      lines,
      lineHeight,
    };
  }
}

export function createDefaultTextMeasurer(): TextMeasurer {
  return new DefaultTextMeasurer();
}

function estimateCharWidth(fontSize: number): number {
  return fontSize * 0.55;
}

function splitLines(text: string): string[] {
  const lines = text.split(/\r?\n/);
  return lines.length > 0 ? lines : [""];
}

function wrapText(text: string, maxWidth: number, charWidth: number): string[] {
  const rawLines = splitLines(text);
  const result: string[] = [];
  const maxCharsPerLine = Math.max(1, Math.floor(maxWidth / charWidth));

  for (const rawLine of rawLines) {
    if (rawLine.length <= maxCharsPerLine) {
      result.push(rawLine);
      continue;
    }

    let rest = rawLine;

    while (rest.length > maxCharsPerLine) {
      result.push(rest.slice(0, maxCharsPerLine));
      rest = rest.slice(maxCharsPerLine);
    }

    if (rest) {
      result.push(rest);
    }
  }

  return result.length > 0 ? result : [""];
}
