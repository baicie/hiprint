import type { LayoutElement, LayoutPage } from "./types";

export interface PageBuilderOptions {
  width: number;
  height: number;
}

export class PageBuilder {
  private pages: LayoutPage[] = [];

  constructor(private options: PageBuilderOptions) {
    this.ensurePage(0);
  }

  getPages(): LayoutPage[] {
    return this.pages;
  }

  getPage(index: number): LayoutPage {
    return this.ensurePage(index);
  }

  addElement(pageIndex: number, element: LayoutElement): void {
    const page = this.ensurePage(pageIndex);

    page.elements.push({
      ...element,
      pageIndex,
    });
  }

  private ensurePage(index: number): LayoutPage {
    while (this.pages.length <= index) {
      this.pages.push({
        index: this.pages.length,
        width: this.options.width,
        height: this.options.height,
        elements: [],
      });
    }

    return this.pages[index]!;
  }
}
