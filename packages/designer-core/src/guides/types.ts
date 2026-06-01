export interface DesignerGuide {
  id: string;
  type: "vertical" | "horizontal";
  position: number;
}

export interface CreateGuideInput {
  type: "vertical" | "horizontal";
  position: number;
}

export function createGuide(input: CreateGuideInput): DesignerGuide {
  return {
    id: `guide_${Math.random().toString(36).slice(2, 8)}`,
    type: input.type,
    position: input.position,
  };
}

export function removeGuide(
  guides: DesignerGuide[],
  id: string,
): DesignerGuide[] {
  return guides.filter((guide) => guide.id !== id);
}
