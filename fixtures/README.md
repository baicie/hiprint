# Fixtures

This directory contains print templates and corresponding data used for regression testing
of the hiprint legacy layer.

## Templates

| Fixture         | Source          | Covers                                  |
| --------------- | --------------- | --------------------------------------- |
| basic-text      | legacy exported | text + image + shape elements           |
| image           | hand-crafted    | single image element                    |
| table-basic     | legacy exported | table element with columns               |
| complex-order   | legacy exported | real business template (CV/resume style) |

## Data Files

Each template has a corresponding data file in `data/` with the same base name.

## Adding Fixtures

When adding a new fixture:

1. Export the template JSON from the legacy playground via **Get JSON**
2. Save it to `templates/<name>.json`
3. Create `data/<name>.data.json` with realistic test data
4. Update this table with the source and coverage info

Do not commit real business data — use synthetic but realistic data.
