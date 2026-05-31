# Reverse Audit Report

Generated at: 2026-05-31T06:09:58.466Z

Source root:

```txt
packages/legacy/vendor
```

## Summary

| Type | Count |
| --- | ---: |
| Files | 3 |
| Globals | 34 |
| Constructors | 35 |
| Prototypes | 311 |
| Strings | 500 |
| DOM usages | 7 |
| jQuery usages | 16 |
| Risks | 3 |
| Module candidates | 36 |

## Files

- `packages/legacy/vendor/hiprint.bundle.js` - 430328 bytes, 7566 lines, hash `fbeea87a6f461157`
- `packages/legacy/vendor/hiprint.config.js` - 18974 bytes, 755 lines, hash `78a3943330fa26ef`
- `packages/legacy/vendor/polyfill.min.js` - 99131 bytes, 1 lines, hash `eb9338bcec2f8bdf`

## Global usages

| Name |Kind |Member |Count |
| --- | --- | --- | --- |
| $ | read |  | 236 |
| $ | call |  | 216 |
| document | read |  | 29 |
| window | read |  | 19 |
| $ | member | extend | 14 |
| document | member | createElement | 7 |
| jQuery | read |  | 6 |
| document | member | body | 5 |
| URL | read |  | 5 |
| URL | member | revokeObjectURL | 3 |
| document | member | createTextNode | 3 |
| navigator | read |  | 3 |
| $ | member | each | 2 |
| window | member | HIPRINT_CONFIG | 2 |
| window | member | HTMLIFrameElement | 2 |
| URL | member | createObjectURL | 2 |
| window | member | location | 2 |
| location | read |  | 2 |
| window | write | hinnn | 1 |
| window | member | hinnn | 1 |
| window | write | hiwebSocket | 1 |
| window | member | hiwebSocket | 1 |
| window | member | io | 1 |
| window | member | WebSocket | 1 |
| document | member | all | 1 |
| window | member | atob | 1 |
| document | member | querySelector | 1 |
| Blob | read |  | 1 |
| window | write | hiLocalStorage | 1 |
| window | member | hiLocalStorage | 1 |
| window | member | localStorage | 1 |
| localStorage | read |  | 1 |
| window | write | HIPRINT_CONFIG | 1 |
| window | member | Math | 1 |

## Constructor candidates

| Name |Kind |Count |
| --- | --- | --- |
| AsyncIterator | function | 1 |
| At | variable-function | 1 |
| BasePrintElement | function | 1 |
| Bt | variable-function | 1 |
| C | variable-function | 1 |
| Context | function | 1 |
| D | variable-function | 1 |
| F | function | 2 |
| G | variable-function | 1 |
| Generator | function | 1 |
| GeneratorFunction | function | 1 |
| GeneratorFunctionPrototype | function | 1 |
| Gt | variable-function | 1 |
| H | variable-function | 1 |
| J | variable-function | 1 |
| L | variable-function | 1 |
| Lt | variable-function | 1 |
| M | variable-function | 2 |
| Mt | variable-function | 1 |
| Nt | variable-function | 1 |
| PromiseCapability | function | 1 |
| Q | variable-function | 1 |
| R | variable-function | 1 |
| Rt | variable-function | 1 |
| S | variable-function | 2 |
| T | function | 1 |
| T | variable-function | 1 |
| TableExcelHelper | function | 1 |
| TablePrintElement | function | 1 |
| Tt | variable-function | 1 |
| Ut | variable-function | 1 |
| Wt | variable-function | 1 |
| X | variable-function | 1 |
| Y | variable-function | 1 |
| Z | variable-function | 1 |

## Prototype methods

| Owner |Method |Count |
| --- | --- | --- |
| AsyncIterator | r | 1 |
| BasePrintElement | bingCopyEvent | 1 |
| BasePrintElement | bingKeyboardMoveEvent | 1 |
| BasePrintElement | createLineOfPosition | 1 |
| BasePrintElement | createTempContainer | 1 |
| BasePrintElement | css | 1 |
| BasePrintElement | delete | 1 |
| BasePrintElement | design | 1 |
| BasePrintElement | filterOptionItems | 1 |
| BasePrintElement | getBeginPrintTopInPaperByReferenceElement | 1 |
| BasePrintElement | getConfigOptionsByName | 1 |
| BasePrintElement | getData | 1 |
| BasePrintElement | getDesignTarget | 1 |
| BasePrintElement | getField | 1 |
| BasePrintElement | getFields | 1 |
| BasePrintElement | getFormatter | 1 |
| BasePrintElement | getHtml | 1 |
| BasePrintElement | getHtml2 | 1 |
| BasePrintElement | getOrderIndex | 1 |
| BasePrintElement | getPrintElementEntity | 1 |
| BasePrintElement | getPrintElementOptionItems | 1 |
| BasePrintElement | getPrintElementOptionItemsByName | 1 |
| BasePrintElement | getPrintElementSelectEventKey | 1 |
| BasePrintElement | getProxyTarget | 1 |
| BasePrintElement | getReizeableShowPoints | 1 |
| BasePrintElement | getStyler | 1 |
| BasePrintElement | getTempContainer | 1 |
| BasePrintElement | getTitle | 1 |
| BasePrintElement | initSizeByHtml | 1 |
| BasePrintElement | inRect | 1 |
| BasePrintElement | isFixed | 1 |
| BasePrintElement | isHeaderOrFooter | 1 |
| BasePrintElement | multipleSelect | 1 |
| BasePrintElement | onRendered | 1 |
| BasePrintElement | onResize | 1 |
| BasePrintElement | removeLineOfPosition | 1 |
| BasePrintElement | removeTempContainer | 1 |
| BasePrintElement | setCurrenttemplateData | 1 |
| BasePrintElement | setPanel | 1 |
| BasePrintElement | SetProxyTargetOption | 1 |
| BasePrintElement | setTemplateId | 1 |
| BasePrintElement | showInPage | 1 |
| BasePrintElement | stylerCss | 1 |
| BasePrintElement | submitOption | 1 |
| BasePrintElement | updatePositionByMultipleSelect | 1 |
| BasePrintElement | updateSizeAndPositionOptions | 1 |
| BasePrintElement | updateTargetSize | 1 |
| BasePrintElement | updateTargetWidth | 1 |
| e | autoCompletion | 1 |
| e | BinarySearch | 1 |
| e | createPrintElement | 2 |
| e | createTarget | 9 |
| e | css | 1 |
| e | design | 1 |
| e | getbarcodeMode | 1 |
| e | getColumnByColumnId | 1 |
| e | getConfigOptions | 9 |
| e | getData | 4 |
| e | getDesignTarget | 3 |
| e | getEmptyRowTarget | 1 |
| e | getFontSize | 1 |
| e | getGridColumns | 1 |
| e | getHeightByData | 1 |
| e | getHideTitle | 2 |
| e | getHtml | 8 |
| e | getLongTextIndent | 1 |
| e | getPaperHtmlResult | 2 |
| e | getPrintElementOptionEntity | 3 |
| e | getPrintElementTypeEntity | 1 |
| e | getProxyTarget | 2 |
| e | getReizeableShowPoints | 4 |
| e | getRowsInSpecificHeight | 1 |
| e | getStringBySpecificHeight | 1 |
| e | getTableHtml | 1 |
| e | getText | 1 |
| e | getTextType | 1 |
| e | getTitle | 2 |
| e | initSizeByHtml | 1 |
| e | IsPaginationIndex | 1 |
| e | makeColumnObj | 1 |
| e | onResize | 2 |
| e | setHiReizeable | 1 |
| e | updateDesignViewFromOptions | 9 |
| e | updateTargetHtml | 1 |
| e | updateTargetImage | 1 |
| e | updateTargetText | 2 |
| t | addPrintElementTypes | 1 |
| t | addPrintHline | 1 |
| t | addPrintHtml | 1 |
| t | addPrintImage | 1 |
| t | addPrintLongText | 1 |
| t | addPrintOval | 1 |
| t | addPrintPanel | 1 |
| t | addPrintRect | 1 |
| t | addPrintTable | 1 |
| t | addPrintText | 1 |
| t | addPrintVline | 1 |
| t | addResizerHeadRow | 1 |
| t | addResizeRowAndColumn | 1 |
| t | append | 1 |
| t | appendDesignPrintElement | 1 |
| t | beginEdit | 2 |
| t | bindBatchMoveElement | 1 |
| t | bingKeyboardMoveEvent | 1 |
| t | buildData | 1 |
| t | buildPagination | 1 |
| t | buildSetting | 1 |
| t | buildSettingByCustomOptions | 1 |
| t | clear | 3 |
| t | clientIsOpened | 1 |
| t | copyDesignTopFromTop | 1 |
| t | createColumnGrips | 1 |
| t | createContainer | 1 |
| t | createDefaultPanel | 1 |
| t | createEditor | 1 |
| t | createFooterLine | 1 |
| t | createHeaderLine | 1 |
| t | createNewPage | 1 |
| t | createPaperNumber | 1 |
| t | createPrintElement | 2 |
| t | createPrintElementTypeHtml | 1 |
| t | createRowGrips | 1 |
| t | createRuler | 1 |
| t | createTableCell | 1 |
| t | createTableColumnArray | 1 |
| t | createTarget | 77 |
| t | createTempContainer | 1 |
| t | css | 37 |
| t | deleteColums | 1 |
| t | deletePanel | 1 |
| t | deletePrintElement | 2 |
| t | deleteRow | 1 |
| t | design | 3 |
| t | destroy | 76 |
| t | disable | 1 |
| t | disableEdit | 2 |
| t | displayHeight | 2 |
| t | displayLeft | 1 |
| t | displayTop | 1 |
| t | displayWidth | 2 |
| t | dragHeadLineOrFootLine | 1 |
| t | droppablePaper | 1 |
| t | enable | 1 |
| t | enableEidt | 2 |
| t | endEdit | 2 |
| t | fillPaperHeaderAndFooter | 1 |
| t | formatPaperNumber | 1 |
| t | formatterModule | 1 |
| t | getBuildCustomOptionSettingEventKey | 1 |
| t | getByIndex | 1 |
| t | getCellByXY | 1 |
| t | getCellGrid | 1 |
| t | getColumnByColumnId | 1 |
| t | getColumnStep | 1 |
| t | getContentHeight | 1 |
| t | getData | 2 |
| t | getDisplayHtml | 1 |
| t | getDragingPrintElement | 1 |
| t | getElementByName | 2 |
| t | getElementByTid | 2 |
| t | getElementInRect | 1 |
| t | getElementType | 1 |
| t | getElementTypeGroups | 1 |
| t | getEntity | 1 |
| t | getFields | 3 |
| t | getFieldsInPanel | 2 |
| t | getHeight | 1 |
| t | getHtml | 2 |
| t | getJointHtml | 1 |
| t | getJson | 1 |
| t | getJsonTid | 1 |
| t | getLeft | 1 |
| t | getOptions | 2 |
| t | getOrient | 1 |
| t | getPanel | 1 |
| t | getPanelEntity | 1 |
| t | getPanelTarget | 1 |
| t | getPaneltotal | 1 |
| t | getPaperFooter | 1 |
| t | getPaperType | 1 |
| t | getPrintElementOptionEntity | 2 |
| t | getPrintElementSelectEventKey | 1 |
| t | getPrintElementTypeByEntity | 1 |
| t | getPrintElementTypeEntity | 2 |
| t | getPrinterList | 1 |
| t | getPrintSizeStyle | 1 |
| t | getPrintStyle | 2 |
| t | getPrintTemplateById | 1 |
| t | getSelectedCells | 1 |
| t | getSimpleHtml | 1 |
| t | getSingleSelect | 1 |
| t | getTableRect | 1 |
| t | getTableWidth | 1 |
| t | getTarget | 4 |
| t | getTempContainer | 1 |
| t | getText | 2 |
| t | getTop | 1 |
| t | getTopInDesign | 1 |
| t | getValue | 77 |
| t | getValueByOptionItems | 1 |

## DOM usages

| API |Count |
| --- | --- |
| style | 56 |
| createElement | 9 |
| appendChild | 8 |
| removeChild | 5 |
| querySelector | 2 |
| outerHTML | 2 |
| addEventListener | 2 |

## jQuery usages

| API |Count |
| --- | --- |
| find | 359 |
| $ | 216 |
| css | 208 |
| remove | 98 |
| append | 89 |
| attr | 53 |
| html | 46 |
| on | 33 |
| offset | 26 |
| data | 26 |
| each | 16 |
| height | 13 |
| width | 10 |
| parent | 6 |
| children | 2 |
| position | 1 |

## Risks

### HIGH - global-state

Detected 4 global write patterns. These should be wrapped or patched before core extraction.

### MEDIUM - dom-coupling

Detected 7 DOM API usage groups. DOM logic should not move into core.

### MEDIUM - jquery-coupling

Detected 16 jQuery API usage groups. jQuery dependency should stay in legacy/dom layer.


## Module candidates

| Name |Target |Reason |
| --- | --- | --- |
| AsyncIterator | unknown | Unknown module ownership. |
| At | unknown | Unknown module ownership. |
| BasePrintElement | core | Looks like template/model/schema related symbol. |
| Bt | unknown | Unknown module ownership. |
| C | unknown | Unknown module ownership. |
| Context | unknown | Unknown module ownership. |
| D | unknown | Unknown module ownership. |
| e | unknown | Unknown module ownership. |
| F | unknown | Unknown module ownership. |
| G | unknown | Unknown module ownership. |
| Generator | unknown | Unknown module ownership. |
| GeneratorFunction | unknown | Unknown module ownership. |
| GeneratorFunctionPrototype | unknown | Unknown module ownership. |
| Gt | unknown | Unknown module ownership. |
| H | unknown | Unknown module ownership. |
| J | unknown | Unknown module ownership. |
| L | unknown | Unknown module ownership. |
| Lt | unknown | Unknown module ownership. |
| M | unknown | Unknown module ownership. |
| Mt | unknown | Unknown module ownership. |
| Nt | unknown | Unknown module ownership. |
| PromiseCapability | unknown | Unknown module ownership. |
| Q | unknown | Unknown module ownership. |
| R | unknown | Unknown module ownership. |
| Rt | unknown | Unknown module ownership. |
| S | unknown | Unknown module ownership. |
| t | unknown | Unknown module ownership. |
| T | unknown | Unknown module ownership. |
| TableExcelHelper | unknown | Unknown module ownership. |
| TablePrintElement | core | Looks like template/model/schema related symbol. |
| Tt | unknown | Unknown module ownership. |
| Ut | unknown | Unknown module ownership. |
| Wt | unknown | Unknown module ownership. |
| X | unknown | Unknown module ownership. |
| Y | unknown | Unknown module ownership. |
| Z | unknown | Unknown module ownership. |
