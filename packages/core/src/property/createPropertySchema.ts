import type {
  ElementPropertySchema,
  PropertyFieldSchema,
  PropertyGroupSchema,
} from "./types";

export function createPropertySchema(input: {
  groups?: PropertyGroupSchema[];
  fields: PropertyFieldSchema[];
}): ElementPropertySchema {
  return {
    groups: input.groups ?? inferGroups(input.fields),
    fields: input.fields,
  };
}

function inferGroups(fields: PropertyFieldSchema[]): PropertyGroupSchema[] {
  const groups = new Map<string, PropertyGroupSchema>();

  for (const field of fields) {
    const key = field.group ?? "base";

    if (!groups.has(key)) {
      groups.set(key, {
        key,
        label: key,
      });
    }
  }

  return [...groups.values()];
}
