import {
  AsyncSettings,
  ButtonsProps,
  ColorPicker,
  ColorRangeData,
  ErrorOption,
  FilesProp,
  FormValidator,
  Input,
  LabelPosition,
  LimitData,
  MaskUndo,
  MaskedTextBox,
  NumericTextBox,
  PrecisionType,
  Rating,
  Signature,
  SignatureBase,
  Slider,
  TextBox,
  TicksData,
  TooltipData,
  Uploader,
  applyMask,
  bindClearEvent,
  createMask,
  escapeRegExp,
  getMaskedVal,
  getVal,
  maskInput,
  maskInputBlurHandler,
  maskInputDropHandler,
  maskInputFocusHandler,
  maskInputMouseDownHandler,
  maskInputMouseUpHandler,
  mobileRemoveFunction,
  regex,
  regularExpressions,
  setElementValue,
  setMaskValue,
  strippedValue,
  triggerFocus,
  unstrippedValue,
  unwireEvents,
  wireEvents
} from "./chunk-MEYCFX4N.js";
import {
  ArrayBase,
  ComplexBase,
  ComponentBase,
  ComponentMixins,
  FormBase,
  Template,
  setValue
} from "./chunk-BSLNYTC7.js";
import "./chunk-Z7QDVKRA.js";
import {
  NG_VALUE_ACCESSOR
} from "./chunk-VDR3N3IZ.js";
import {
  CommonModule
} from "./chunk-6F3I3J3X.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  Injector,
  NgModule,
  Renderer2,
  ViewContainerRef,
  forwardRef,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵloadQuery,
  ɵɵqueryRefresh
} from "./chunk-7S7LMAAM.js";
import "./chunk-QOAHSALO.js";
import "./chunk-GFVJDENN.js";
import {
  __decorate
} from "./chunk-LOA65BFQ.js";
import "./chunk-J4B6MK7R.js";

// node_modules/@syncfusion/ej2-angular-inputs/fesm2020/syncfusion-ej2-angular-inputs.mjs
var _c0 = ["template"];
var _c1 = ["ejs-colorpicker", ""];
var _c2 = ["ejs-signature", ""];
var _c3 = ["fullTemplate"];
var _c4 = ["emptyTemplate"];
var _c5 = ["tooltipTemplate"];
var _c6 = ["labelTemplate"];
var _c7 = ["ejs-rating", ""];
var TextBoxComponent_1;
var inputs$7 = ["autocomplete", "cssClass", "enablePersistence", "enableRtl", "enabled", "floatLabelType", "htmlAttributes", "locale", "multiline", "placeholder", "readonly", "showClearButton", "type", "value", "width"];
var outputs$8 = ["blur", "change", "created", "destroyed", "focus", "input", "valueChange"];
var twoWays$7 = ["value"];
var TextBoxComponent = TextBoxComponent_1 = class TextBoxComponent2 extends TextBox {
  constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.cdr = cdr;
    this.skipFromEvent = true;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$8);
    this.addTwoWay.call(this, twoWays$7);
    setValue("currentInstance", this, this.viewContainerRef);
    this.formContext = new FormBase();
    this.formCompContext = new ComponentBase();
  }
  registerOnChange(registerFunction) {
  }
  registerOnTouched(registerFunction) {
  }
  writeValue(value) {
  }
  setDisabledState(disabled) {
  }
  ngOnInit() {
    this.formCompContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.formContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.formCompContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.formCompContext.ngAfterContentChecked(this);
  }
};
TextBoxComponent.ɵfac = function TextBoxComponent_Factory(t) {
  return new (t || TextBoxComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ChangeDetectorRef));
};
TextBoxComponent.ɵcmp = ɵɵdefineComponent({
  type: TextBoxComponent,
  selectors: [["ejs-textbox"]],
  inputs: {
    autocomplete: "autocomplete",
    cssClass: "cssClass",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    enabled: "enabled",
    floatLabelType: "floatLabelType",
    htmlAttributes: "htmlAttributes",
    locale: "locale",
    multiline: "multiline",
    placeholder: "placeholder",
    readonly: "readonly",
    showClearButton: "showClearButton",
    type: "type",
    value: "value",
    width: "width"
  },
  outputs: {
    blur: "blur",
    change: "change",
    created: "created",
    destroyed: "destroyed",
    focus: "focus",
    input: "input",
    valueChange: "valueChange"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextBoxComponent_1),
    multi: true
  }]), ɵɵInheritDefinitionFeature],
  decls: 0,
  vars: 0,
  template: function TextBoxComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
TextBoxComponent = TextBoxComponent_1 = __decorate([ComponentMixins([ComponentBase, FormBase])], TextBoxComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextBoxComponent, [{
    type: Component,
    args: [{
      selector: "ejs-textbox",
      inputs: inputs$7,
      outputs: outputs$8,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TextBoxComponent),
        multi: true
      }],
      queries: {}
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }, {
      type: ChangeDetectorRef
    }];
  }, null);
})();
var TextBoxModule = class {
};
TextBoxModule.ɵfac = function TextBoxModule_Factory(t) {
  return new (t || TextBoxModule)();
};
TextBoxModule.ɵmod = ɵɵdefineNgModule({
  type: TextBoxModule,
  declarations: [TextBoxComponent],
  imports: [CommonModule],
  exports: [TextBoxComponent]
});
TextBoxModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextBoxModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [TextBoxComponent],
      exports: [TextBoxComponent]
    }]
  }], null, null);
})();
var TextBoxAllModule = class {
};
TextBoxAllModule.ɵfac = function TextBoxAllModule_Factory(t) {
  return new (t || TextBoxAllModule)();
};
TextBoxAllModule.ɵmod = ɵɵdefineNgModule({
  type: TextBoxAllModule,
  imports: [CommonModule, TextBoxModule],
  exports: [TextBoxModule]
});
TextBoxAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, TextBoxModule], TextBoxModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextBoxAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, TextBoxModule],
      exports: [TextBoxModule],
      providers: []
    }]
  }], null, null);
})();
var NumericTextBoxComponent_1;
var inputs$6 = ["cssClass", "currency", "currencyCode", "decimals", "enablePersistence", "enableRtl", "enabled", "floatLabelType", "format", "htmlAttributes", "locale", "max", "min", "placeholder", "readonly", "showClearButton", "showSpinButton", "step", "strictMode", "validateDecimalOnType", "value", "width"];
var outputs$7 = ["blur", "change", "created", "destroyed", "focus", "valueChange"];
var twoWays$6 = ["value"];
var NumericTextBoxComponent = NumericTextBoxComponent_1 = class NumericTextBoxComponent2 extends NumericTextBox {
  constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.cdr = cdr;
    this.skipFromEvent = true;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$7);
    this.addTwoWay.call(this, twoWays$6);
    setValue("currentInstance", this, this.viewContainerRef);
    this.formContext = new FormBase();
    this.formCompContext = new ComponentBase();
  }
  registerOnChange(registerFunction) {
  }
  registerOnTouched(registerFunction) {
  }
  writeValue(value) {
  }
  setDisabledState(disabled) {
  }
  ngOnInit() {
    this.formCompContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.formContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.formCompContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.formCompContext.ngAfterContentChecked(this);
  }
};
NumericTextBoxComponent.ɵfac = function NumericTextBoxComponent_Factory(t) {
  return new (t || NumericTextBoxComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ChangeDetectorRef));
};
NumericTextBoxComponent.ɵcmp = ɵɵdefineComponent({
  type: NumericTextBoxComponent,
  selectors: [["ejs-numerictextbox"]],
  inputs: {
    cssClass: "cssClass",
    currency: "currency",
    currencyCode: "currencyCode",
    decimals: "decimals",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    enabled: "enabled",
    floatLabelType: "floatLabelType",
    format: "format",
    htmlAttributes: "htmlAttributes",
    locale: "locale",
    max: "max",
    min: "min",
    placeholder: "placeholder",
    readonly: "readonly",
    showClearButton: "showClearButton",
    showSpinButton: "showSpinButton",
    step: "step",
    strictMode: "strictMode",
    validateDecimalOnType: "validateDecimalOnType",
    value: "value",
    width: "width"
  },
  outputs: {
    blur: "blur",
    change: "change",
    created: "created",
    destroyed: "destroyed",
    focus: "focus",
    valueChange: "valueChange"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumericTextBoxComponent_1),
    multi: true
  }]), ɵɵInheritDefinitionFeature],
  decls: 0,
  vars: 0,
  template: function NumericTextBoxComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
NumericTextBoxComponent = NumericTextBoxComponent_1 = __decorate([ComponentMixins([ComponentBase, FormBase])], NumericTextBoxComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NumericTextBoxComponent, [{
    type: Component,
    args: [{
      selector: "ejs-numerictextbox",
      inputs: inputs$6,
      outputs: outputs$7,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NumericTextBoxComponent),
        multi: true
      }],
      queries: {}
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }, {
      type: ChangeDetectorRef
    }];
  }, null);
})();
var NumericTextBoxModule = class {
};
NumericTextBoxModule.ɵfac = function NumericTextBoxModule_Factory(t) {
  return new (t || NumericTextBoxModule)();
};
NumericTextBoxModule.ɵmod = ɵɵdefineNgModule({
  type: NumericTextBoxModule,
  declarations: [NumericTextBoxComponent],
  imports: [CommonModule],
  exports: [NumericTextBoxComponent]
});
NumericTextBoxModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NumericTextBoxModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [NumericTextBoxComponent],
      exports: [NumericTextBoxComponent]
    }]
  }], null, null);
})();
var NumericTextBoxAllModule = class {
};
NumericTextBoxAllModule.ɵfac = function NumericTextBoxAllModule_Factory(t) {
  return new (t || NumericTextBoxAllModule)();
};
NumericTextBoxAllModule.ɵmod = ɵɵdefineNgModule({
  type: NumericTextBoxAllModule,
  imports: [CommonModule, NumericTextBoxModule],
  exports: [NumericTextBoxModule]
});
NumericTextBoxAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, NumericTextBoxModule], NumericTextBoxModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NumericTextBoxAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, NumericTextBoxModule],
      exports: [NumericTextBoxModule],
      providers: []
    }]
  }], null, null);
})();
var MaskedTextBoxComponent_1;
var inputs$5 = ["cssClass", "customCharacters", "enablePersistence", "enableRtl", "enabled", "floatLabelType", "htmlAttributes", "locale", "mask", "placeholder", "promptChar", "readonly", "showClearButton", "value", "width"];
var outputs$6 = ["blur", "change", "created", "destroyed", "focus", "valueChange"];
var twoWays$5 = ["value"];
var MaskedTextBoxComponent = MaskedTextBoxComponent_1 = class MaskedTextBoxComponent2 extends MaskedTextBox {
  constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.cdr = cdr;
    this.skipFromEvent = true;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$6);
    this.addTwoWay.call(this, twoWays$5);
    setValue("currentInstance", this, this.viewContainerRef);
    this.formContext = new FormBase();
    this.formCompContext = new ComponentBase();
  }
  registerOnChange(registerFunction) {
  }
  registerOnTouched(registerFunction) {
  }
  writeValue(value) {
  }
  setDisabledState(disabled) {
  }
  ngOnInit() {
    this.formCompContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.formContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.formCompContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.formCompContext.ngAfterContentChecked(this);
  }
};
MaskedTextBoxComponent.ɵfac = function MaskedTextBoxComponent_Factory(t) {
  return new (t || MaskedTextBoxComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ChangeDetectorRef));
};
MaskedTextBoxComponent.ɵcmp = ɵɵdefineComponent({
  type: MaskedTextBoxComponent,
  selectors: [["ejs-maskedtextbox"]],
  inputs: {
    cssClass: "cssClass",
    customCharacters: "customCharacters",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    enabled: "enabled",
    floatLabelType: "floatLabelType",
    htmlAttributes: "htmlAttributes",
    locale: "locale",
    mask: "mask",
    placeholder: "placeholder",
    promptChar: "promptChar",
    readonly: "readonly",
    showClearButton: "showClearButton",
    value: "value",
    width: "width"
  },
  outputs: {
    blur: "blur",
    change: "change",
    created: "created",
    destroyed: "destroyed",
    focus: "focus",
    valueChange: "valueChange"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MaskedTextBoxComponent_1),
    multi: true
  }]), ɵɵInheritDefinitionFeature],
  decls: 0,
  vars: 0,
  template: function MaskedTextBoxComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
MaskedTextBoxComponent = MaskedTextBoxComponent_1 = __decorate([ComponentMixins([ComponentBase, FormBase])], MaskedTextBoxComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaskedTextBoxComponent, [{
    type: Component,
    args: [{
      selector: "ejs-maskedtextbox",
      inputs: inputs$5,
      outputs: outputs$6,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MaskedTextBoxComponent),
        multi: true
      }],
      queries: {}
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }, {
      type: ChangeDetectorRef
    }];
  }, null);
})();
var MaskedTextBoxModule = class {
};
MaskedTextBoxModule.ɵfac = function MaskedTextBoxModule_Factory(t) {
  return new (t || MaskedTextBoxModule)();
};
MaskedTextBoxModule.ɵmod = ɵɵdefineNgModule({
  type: MaskedTextBoxModule,
  declarations: [MaskedTextBoxComponent],
  imports: [CommonModule],
  exports: [MaskedTextBoxComponent]
});
MaskedTextBoxModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaskedTextBoxModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [MaskedTextBoxComponent],
      exports: [MaskedTextBoxComponent]
    }]
  }], null, null);
})();
var MaskedTextBoxAllModule = class {
};
MaskedTextBoxAllModule.ɵfac = function MaskedTextBoxAllModule_Factory(t) {
  return new (t || MaskedTextBoxAllModule)();
};
MaskedTextBoxAllModule.ɵmod = ɵɵdefineNgModule({
  type: MaskedTextBoxAllModule,
  imports: [CommonModule, MaskedTextBoxModule],
  exports: [MaskedTextBoxModule]
});
MaskedTextBoxAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, MaskedTextBoxModule], MaskedTextBoxModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaskedTextBoxAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, MaskedTextBoxModule],
      exports: [MaskedTextBoxModule],
      providers: []
    }]
  }], null, null);
})();
var SliderComponent_1;
var inputs$4 = ["colorRange", "cssClass", "customValues", "enableAnimation", "enableHtmlSanitizer", "enablePersistence", "enableRtl", "enabled", "limits", "locale", "max", "min", "orientation", "readonly", "showButtons", "step", "ticks", "tooltip", "type", "value", "width"];
var outputs$5 = ["focus", "blur", "change", "changed", "created", "renderedTicks", "renderingTicks", "tooltipChange", "valueChange"];
var twoWays$4 = ["value"];
var SliderComponent = SliderComponent_1 = class SliderComponent2 extends Slider {
  constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.cdr = cdr;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$5);
    this.addTwoWay.call(this, twoWays$4);
    setValue("currentInstance", this, this.viewContainerRef);
    this.formContext = new FormBase();
    this.formCompContext = new ComponentBase();
  }
  registerOnChange(registerFunction) {
  }
  registerOnTouched(registerFunction) {
  }
  writeValue(value) {
  }
  setDisabledState(disabled) {
  }
  ngOnInit() {
    this.formCompContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.formContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.formCompContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.formCompContext.ngAfterContentChecked(this);
  }
};
SliderComponent.ɵfac = function SliderComponent_Factory(t) {
  return new (t || SliderComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ChangeDetectorRef));
};
SliderComponent.ɵcmp = ɵɵdefineComponent({
  type: SliderComponent,
  selectors: [["ejs-slider"]],
  inputs: {
    colorRange: "colorRange",
    cssClass: "cssClass",
    customValues: "customValues",
    enableAnimation: "enableAnimation",
    enableHtmlSanitizer: "enableHtmlSanitizer",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    enabled: "enabled",
    limits: "limits",
    locale: "locale",
    max: "max",
    min: "min",
    orientation: "orientation",
    readonly: "readonly",
    showButtons: "showButtons",
    step: "step",
    ticks: "ticks",
    tooltip: "tooltip",
    type: "type",
    value: "value",
    width: "width"
  },
  outputs: {
    focus: "focus",
    blur: "blur",
    change: "change",
    changed: "changed",
    created: "created",
    renderedTicks: "renderedTicks",
    renderingTicks: "renderingTicks",
    tooltipChange: "tooltipChange",
    valueChange: "valueChange"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderComponent_1),
    multi: true
  }]), ɵɵInheritDefinitionFeature],
  decls: 0,
  vars: 0,
  template: function SliderComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
SliderComponent = SliderComponent_1 = __decorate([ComponentMixins([ComponentBase, FormBase])], SliderComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SliderComponent, [{
    type: Component,
    args: [{
      selector: "ejs-slider",
      inputs: inputs$4,
      outputs: outputs$5,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SliderComponent),
        multi: true
      }],
      queries: {}
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }, {
      type: ChangeDetectorRef
    }];
  }, null);
})();
var SliderModule = class {
};
SliderModule.ɵfac = function SliderModule_Factory(t) {
  return new (t || SliderModule)();
};
SliderModule.ɵmod = ɵɵdefineNgModule({
  type: SliderModule,
  declarations: [SliderComponent],
  imports: [CommonModule],
  exports: [SliderComponent]
});
SliderModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SliderModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [SliderComponent],
      exports: [SliderComponent]
    }]
  }], null, null);
})();
var SliderAllModule = class {
};
SliderAllModule.ɵfac = function SliderAllModule_Factory(t) {
  return new (t || SliderAllModule)();
};
SliderAllModule.ɵmod = ɵɵdefineNgModule({
  type: SliderAllModule,
  imports: [CommonModule, SliderModule],
  exports: [SliderModule]
});
SliderAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, SliderModule], SliderModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SliderAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, SliderModule],
      exports: [SliderModule],
      providers: []
    }]
  }], null, null);
})();
var input = ["name", "size", "type"];
var outputs$4 = [];
var UploadedFilesDirective = class extends ComplexBase {
  constructor(viewContainerRef) {
    super();
    this.viewContainerRef = viewContainerRef;
    setValue("currentInstance", this, this.viewContainerRef);
    this.registerEvents(outputs$4);
    this.directivePropList = input;
  }
};
UploadedFilesDirective.ɵfac = function UploadedFilesDirective_Factory(t) {
  return new (t || UploadedFilesDirective)(ɵɵdirectiveInject(ViewContainerRef));
};
UploadedFilesDirective.ɵdir = ɵɵdefineDirective({
  type: UploadedFilesDirective,
  selectors: [["e-uploadedfiles"]],
  inputs: {
    name: "name",
    size: "size",
    type: "type"
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UploadedFilesDirective, [{
    type: Directive,
    args: [{
      selector: "e-files>e-uploadedfiles",
      inputs: input,
      outputs: outputs$4,
      queries: {}
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }];
  }, null);
})();
var FilesDirective = class extends ArrayBase {
  constructor() {
    super("files");
  }
};
FilesDirective.ɵfac = function FilesDirective_Factory(t) {
  return new (t || FilesDirective)();
};
FilesDirective.ɵdir = ɵɵdefineDirective({
  type: FilesDirective,
  selectors: [["e-files"]],
  contentQueries: function FilesDirective_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, UploadedFilesDirective, 4);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.children = _t);
    }
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FilesDirective, [{
    type: Directive,
    args: [{
      selector: "ejs-uploader>e-files",
      queries: {
        children: new ContentChildren(UploadedFilesDirective)
      }
    }]
  }], function() {
    return [];
  }, null);
})();
var UploaderComponent_1;
var inputs$3 = ["allowedExtensions", "asyncSettings", "autoUpload", "buttons", "cssClass", "directoryUpload", "dropArea", "dropEffect", "enableHtmlSanitizer", "enablePersistence", "enableRtl", "enabled", "files", "htmlAttributes", "locale", "maxFileSize", "minFileSize", "multiple", "sequentialUpload", "showFileList", "template"];
var outputs$3 = ["focus", "blur", "actionComplete", "beforeRemove", "beforeUpload", "canceling", "change", "chunkFailure", "chunkSuccess", "chunkUploading", "clearing", "created", "failure", "fileListRendering", "pausing", "progress", "removing", "rendering", "resuming", "selected", "success", "uploading"];
var twoWays$3 = [];
var UploaderComponent = UploaderComponent_1 = class UploaderComponent2 extends Uploader {
  constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.cdr = cdr;
    this.tags = ["files"];
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$3);
    this.addTwoWay.call(this, twoWays$3);
    setValue("currentInstance", this, this.viewContainerRef);
    this.formContext = new FormBase();
    this.formCompContext = new ComponentBase();
  }
  registerOnChange(registerFunction) {
  }
  registerOnTouched(registerFunction) {
  }
  writeValue(value) {
  }
  setDisabledState(disabled) {
  }
  ngOnInit() {
    this.formCompContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.formContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.formCompContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.tagObjects[0].instance = this.childFiles;
    this.formCompContext.ngAfterContentChecked(this);
  }
};
UploaderComponent.ɵfac = function UploaderComponent_Factory(t) {
  return new (t || UploaderComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ChangeDetectorRef));
};
UploaderComponent.ɵcmp = ɵɵdefineComponent({
  type: UploaderComponent,
  selectors: [["ejs-uploader"]],
  contentQueries: function UploaderComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, _c0, 5);
      ɵɵcontentQuery(dirIndex, FilesDirective, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.template = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.childFiles = _t.first);
    }
  },
  inputs: {
    allowedExtensions: "allowedExtensions",
    asyncSettings: "asyncSettings",
    autoUpload: "autoUpload",
    buttons: "buttons",
    cssClass: "cssClass",
    directoryUpload: "directoryUpload",
    dropArea: "dropArea",
    dropEffect: "dropEffect",
    enableHtmlSanitizer: "enableHtmlSanitizer",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    enabled: "enabled",
    files: "files",
    htmlAttributes: "htmlAttributes",
    locale: "locale",
    maxFileSize: "maxFileSize",
    minFileSize: "minFileSize",
    multiple: "multiple",
    sequentialUpload: "sequentialUpload",
    showFileList: "showFileList",
    template: "template"
  },
  outputs: {
    focus: "focus",
    blur: "blur",
    actionComplete: "actionComplete",
    beforeRemove: "beforeRemove",
    beforeUpload: "beforeUpload",
    canceling: "canceling",
    change: "change",
    chunkFailure: "chunkFailure",
    chunkSuccess: "chunkSuccess",
    chunkUploading: "chunkUploading",
    clearing: "clearing",
    created: "created",
    failure: "failure",
    fileListRendering: "fileListRendering",
    pausing: "pausing",
    progress: "progress",
    removing: "removing",
    rendering: "rendering",
    resuming: "resuming",
    selected: "selected",
    success: "success",
    uploading: "uploading"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UploaderComponent_1),
    multi: true
  }]), ɵɵInheritDefinitionFeature],
  decls: 0,
  vars: 0,
  template: function UploaderComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
__decorate([Template()], UploaderComponent.prototype, "template", void 0);
UploaderComponent = UploaderComponent_1 = __decorate([ComponentMixins([ComponentBase, FormBase])], UploaderComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UploaderComponent, [{
    type: Component,
    args: [{
      selector: "ejs-uploader",
      inputs: inputs$3,
      outputs: outputs$3,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => UploaderComponent),
        multi: true
      }],
      queries: {
        childFiles: new ContentChild(FilesDirective)
      }
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }, {
      type: ChangeDetectorRef
    }];
  }, {
    template: [{
      type: ContentChild,
      args: ["template"]
    }]
  });
})();
var UploaderModule = class {
};
UploaderModule.ɵfac = function UploaderModule_Factory(t) {
  return new (t || UploaderModule)();
};
UploaderModule.ɵmod = ɵɵdefineNgModule({
  type: UploaderModule,
  declarations: [UploaderComponent, UploadedFilesDirective, FilesDirective],
  imports: [CommonModule],
  exports: [UploaderComponent, UploadedFilesDirective, FilesDirective]
});
UploaderModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UploaderModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [UploaderComponent, UploadedFilesDirective, FilesDirective],
      exports: [UploaderComponent, UploadedFilesDirective, FilesDirective]
    }]
  }], null, null);
})();
var UploaderAllModule = class {
};
UploaderAllModule.ɵfac = function UploaderAllModule_Factory(t) {
  return new (t || UploaderAllModule)();
};
UploaderAllModule.ɵmod = ɵɵdefineNgModule({
  type: UploaderAllModule,
  imports: [CommonModule, UploaderModule],
  exports: [UploaderModule]
});
UploaderAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, UploaderModule], UploaderModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UploaderAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, UploaderModule],
      exports: [UploaderModule],
      providers: []
    }]
  }], null, null);
})();
var ColorPickerComponent_1;
var inputs$2 = ["columns", "createPopupOnClick", "cssClass", "disabled", "enableOpacity", "enablePersistence", "enableRtl", "inline", "locale", "mode", "modeSwitcher", "noColor", "presetColors", "showButtons", "value"];
var outputs$2 = ["focus", "blur", "beforeClose", "beforeModeSwitch", "beforeOpen", "beforeTileRender", "change", "created", "onModeSwitch", "open", "select", "valueChange"];
var twoWays$2 = ["value"];
var ColorPickerComponent = ColorPickerComponent_1 = class ColorPickerComponent2 extends ColorPicker {
  constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.cdr = cdr;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$2);
    this.addTwoWay.call(this, twoWays$2);
    setValue("currentInstance", this, this.viewContainerRef);
    this.formContext = new FormBase();
    this.formCompContext = new ComponentBase();
  }
  registerOnChange(registerFunction) {
  }
  registerOnTouched(registerFunction) {
  }
  writeValue(value) {
  }
  setDisabledState(disabled) {
  }
  ngOnInit() {
    this.formCompContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.formContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.formCompContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.formCompContext.ngAfterContentChecked(this);
  }
};
ColorPickerComponent.ɵfac = function ColorPickerComponent_Factory(t) {
  return new (t || ColorPickerComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ChangeDetectorRef));
};
ColorPickerComponent.ɵcmp = ɵɵdefineComponent({
  type: ColorPickerComponent,
  selectors: [["", "ejs-colorpicker", ""]],
  inputs: {
    columns: "columns",
    createPopupOnClick: "createPopupOnClick",
    cssClass: "cssClass",
    disabled: "disabled",
    enableOpacity: "enableOpacity",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    inline: "inline",
    locale: "locale",
    mode: "mode",
    modeSwitcher: "modeSwitcher",
    noColor: "noColor",
    presetColors: "presetColors",
    showButtons: "showButtons",
    value: "value"
  },
  outputs: {
    focus: "focus",
    blur: "blur",
    beforeClose: "beforeClose",
    beforeModeSwitch: "beforeModeSwitch",
    beforeOpen: "beforeOpen",
    beforeTileRender: "beforeTileRender",
    change: "change",
    created: "created",
    onModeSwitch: "onModeSwitch",
    open: "open",
    select: "select",
    valueChange: "valueChange"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ColorPickerComponent_1),
    multi: true
  }]), ɵɵInheritDefinitionFeature],
  attrs: _c1,
  decls: 0,
  vars: 0,
  template: function ColorPickerComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
ColorPickerComponent = ColorPickerComponent_1 = __decorate([ComponentMixins([ComponentBase, FormBase])], ColorPickerComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ColorPickerComponent, [{
    type: Component,
    args: [{
      selector: "[ejs-colorpicker]",
      inputs: inputs$2,
      outputs: outputs$2,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ColorPickerComponent),
        multi: true
      }],
      queries: {}
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }, {
      type: ChangeDetectorRef
    }];
  }, null);
})();
var ColorPickerModule = class {
};
ColorPickerModule.ɵfac = function ColorPickerModule_Factory(t) {
  return new (t || ColorPickerModule)();
};
ColorPickerModule.ɵmod = ɵɵdefineNgModule({
  type: ColorPickerModule,
  declarations: [ColorPickerComponent],
  imports: [CommonModule],
  exports: [ColorPickerComponent]
});
ColorPickerModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ColorPickerModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [ColorPickerComponent],
      exports: [ColorPickerComponent]
    }]
  }], null, null);
})();
var ColorPickerAllModule = class {
};
ColorPickerAllModule.ɵfac = function ColorPickerAllModule_Factory(t) {
  return new (t || ColorPickerAllModule)();
};
ColorPickerAllModule.ɵmod = ɵɵdefineNgModule({
  type: ColorPickerAllModule,
  imports: [CommonModule, ColorPickerModule],
  exports: [ColorPickerModule]
});
ColorPickerAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, ColorPickerModule], ColorPickerModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ColorPickerAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, ColorPickerModule],
      exports: [ColorPickerModule],
      providers: []
    }]
  }], null, null);
})();
var SignatureComponent_1;
var inputs$1 = ["backgroundColor", "backgroundImage", "disabled", "enablePersistence", "enableRtl", "isReadOnly", "locale", "maxStrokeWidth", "minStrokeWidth", "saveWithBackground", "strokeColor", "velocity"];
var outputs$1 = ["focus", "blur", "beforeSave", "change", "created"];
var twoWays$1 = [];
var SignatureComponent = SignatureComponent_1 = class SignatureComponent2 extends Signature {
  constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.cdr = cdr;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$1);
    this.addTwoWay.call(this, twoWays$1);
    setValue("currentInstance", this, this.viewContainerRef);
    this.formContext = new FormBase();
    this.formCompContext = new ComponentBase();
  }
  registerOnChange(registerFunction) {
  }
  registerOnTouched(registerFunction) {
  }
  writeValue(value) {
  }
  setDisabledState(disabled) {
  }
  ngOnInit() {
    this.formCompContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.formContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.formCompContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.formCompContext.ngAfterContentChecked(this);
  }
};
SignatureComponent.ɵfac = function SignatureComponent_Factory(t) {
  return new (t || SignatureComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ChangeDetectorRef));
};
SignatureComponent.ɵcmp = ɵɵdefineComponent({
  type: SignatureComponent,
  selectors: [["", "ejs-signature", ""]],
  inputs: {
    backgroundColor: "backgroundColor",
    backgroundImage: "backgroundImage",
    disabled: "disabled",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    isReadOnly: "isReadOnly",
    locale: "locale",
    maxStrokeWidth: "maxStrokeWidth",
    minStrokeWidth: "minStrokeWidth",
    saveWithBackground: "saveWithBackground",
    strokeColor: "strokeColor",
    velocity: "velocity"
  },
  outputs: {
    focus: "focus",
    blur: "blur",
    beforeSave: "beforeSave",
    change: "change",
    created: "created"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SignatureComponent_1),
    multi: true
  }]), ɵɵInheritDefinitionFeature],
  attrs: _c2,
  decls: 0,
  vars: 0,
  template: function SignatureComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
SignatureComponent = SignatureComponent_1 = __decorate([ComponentMixins([ComponentBase, FormBase])], SignatureComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SignatureComponent, [{
    type: Component,
    args: [{
      selector: "[ejs-signature]",
      inputs: inputs$1,
      outputs: outputs$1,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SignatureComponent),
        multi: true
      }],
      queries: {}
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }, {
      type: ChangeDetectorRef
    }];
  }, null);
})();
var SignatureModule = class {
};
SignatureModule.ɵfac = function SignatureModule_Factory(t) {
  return new (t || SignatureModule)();
};
SignatureModule.ɵmod = ɵɵdefineNgModule({
  type: SignatureModule,
  declarations: [SignatureComponent],
  imports: [CommonModule],
  exports: [SignatureComponent]
});
SignatureModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SignatureModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [SignatureComponent],
      exports: [SignatureComponent]
    }]
  }], null, null);
})();
var SignatureAllModule = class {
};
SignatureAllModule.ɵfac = function SignatureAllModule_Factory(t) {
  return new (t || SignatureAllModule)();
};
SignatureAllModule.ɵmod = ɵɵdefineNgModule({
  type: SignatureAllModule,
  imports: [CommonModule, SignatureModule],
  exports: [SignatureModule]
});
SignatureAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, SignatureModule], SignatureModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SignatureAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, SignatureModule],
      exports: [SignatureModule],
      providers: []
    }]
  }], null, null);
})();
var RatingComponent_1;
var inputs = ["allowReset", "cssClass", "disabled", "emptyTemplate", "enableAnimation", "enablePersistence", "enableRtl", "enableSingleSelection", "fullTemplate", "itemsCount", "labelPosition", "labelTemplate", "locale", "min", "precision", "readOnly", "showLabel", "showTooltip", "tooltipTemplate", "value", "visible"];
var outputs = ["focus", "blur", "beforeItemRender", "created", "onItemHover", "valueChanged", "valueChange"];
var twoWays = ["value"];
var RatingComponent = RatingComponent_1 = class RatingComponent2 extends Rating {
  constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.cdr = cdr;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs);
    this.addTwoWay.call(this, twoWays);
    setValue("currentInstance", this, this.viewContainerRef);
    this.formContext = new FormBase();
    this.formCompContext = new ComponentBase();
  }
  registerOnChange(registerFunction) {
  }
  registerOnTouched(registerFunction) {
  }
  writeValue(value) {
  }
  setDisabledState(disabled) {
  }
  ngOnInit() {
    this.formCompContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.formContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.formCompContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.formCompContext.ngAfterContentChecked(this);
  }
};
RatingComponent.ɵfac = function RatingComponent_Factory(t) {
  return new (t || RatingComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ChangeDetectorRef));
};
RatingComponent.ɵcmp = ɵɵdefineComponent({
  type: RatingComponent,
  selectors: [["", "ejs-rating", ""]],
  contentQueries: function RatingComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, _c3, 5);
      ɵɵcontentQuery(dirIndex, _c4, 5);
      ɵɵcontentQuery(dirIndex, _c5, 5);
      ɵɵcontentQuery(dirIndex, _c6, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.fullTemplate = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.emptyTemplate = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.tooltipTemplate = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.labelTemplate = _t.first);
    }
  },
  inputs: {
    allowReset: "allowReset",
    cssClass: "cssClass",
    disabled: "disabled",
    emptyTemplate: "emptyTemplate",
    enableAnimation: "enableAnimation",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    enableSingleSelection: "enableSingleSelection",
    fullTemplate: "fullTemplate",
    itemsCount: "itemsCount",
    labelPosition: "labelPosition",
    labelTemplate: "labelTemplate",
    locale: "locale",
    min: "min",
    precision: "precision",
    readOnly: "readOnly",
    showLabel: "showLabel",
    showTooltip: "showTooltip",
    tooltipTemplate: "tooltipTemplate",
    value: "value",
    visible: "visible"
  },
  outputs: {
    focus: "focus",
    blur: "blur",
    beforeItemRender: "beforeItemRender",
    created: "created",
    onItemHover: "onItemHover",
    valueChanged: "valueChanged",
    valueChange: "valueChange"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RatingComponent_1),
    multi: true
  }]), ɵɵInheritDefinitionFeature],
  attrs: _c7,
  decls: 0,
  vars: 0,
  template: function RatingComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
__decorate([Template()], RatingComponent.prototype, "fullTemplate", void 0);
__decorate([Template()], RatingComponent.prototype, "emptyTemplate", void 0);
__decorate([Template()], RatingComponent.prototype, "tooltipTemplate", void 0);
__decorate([Template()], RatingComponent.prototype, "labelTemplate", void 0);
RatingComponent = RatingComponent_1 = __decorate([ComponentMixins([ComponentBase, FormBase])], RatingComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RatingComponent, [{
    type: Component,
    args: [{
      selector: "[ejs-rating]",
      inputs,
      outputs,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RatingComponent),
        multi: true
      }],
      queries: {}
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }, {
      type: ChangeDetectorRef
    }];
  }, {
    fullTemplate: [{
      type: ContentChild,
      args: ["fullTemplate"]
    }],
    emptyTemplate: [{
      type: ContentChild,
      args: ["emptyTemplate"]
    }],
    tooltipTemplate: [{
      type: ContentChild,
      args: ["tooltipTemplate"]
    }],
    labelTemplate: [{
      type: ContentChild,
      args: ["labelTemplate"]
    }]
  });
})();
var RatingModule = class {
};
RatingModule.ɵfac = function RatingModule_Factory(t) {
  return new (t || RatingModule)();
};
RatingModule.ɵmod = ɵɵdefineNgModule({
  type: RatingModule,
  declarations: [RatingComponent],
  imports: [CommonModule],
  exports: [RatingComponent]
});
RatingModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RatingModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [RatingComponent],
      exports: [RatingComponent]
    }]
  }], null, null);
})();
var RatingAllModule = class {
};
RatingAllModule.ɵfac = function RatingAllModule_Factory(t) {
  return new (t || RatingAllModule)();
};
RatingAllModule.ɵmod = ɵɵdefineNgModule({
  type: RatingAllModule,
  imports: [CommonModule, RatingModule],
  exports: [RatingModule]
});
RatingAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, RatingModule], RatingModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RatingAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, RatingModule],
      exports: [RatingModule],
      providers: []
    }]
  }], null, null);
})();
var FormValidators = class {
  //max validation
  static max(number) {
    let max = number;
    return (control) => {
      let result = FormValidator.checkValidator.max({
        value: control.value,
        param: max
      });
      if (result === true) {
        return null;
      } else {
        return {
          "max": true
        };
      }
    };
  }
  // min validation
  static min(number) {
    let min = number;
    return (control) => {
      let result = FormValidator.checkValidator.min({
        value: control.value,
        param: min
      });
      if (result === true) {
        return null;
      } else {
        return {
          "min": true
        };
      }
    };
  }
  // Credit card validation
  static creditcard(control) {
    let result = FormValidator.checkValidator.creditcard({
      value: control.value
    });
    if (result === true) {
      return null;
    } else {
      return {
        "cardno": true
      };
    }
  }
  // date validation
  static date(control) {
    let result = FormValidator.checkValidator.date({
      value: control.value
    });
    if (result === true) {
      return null;
    } else {
      return {
        "date": true
      };
    }
  }
  // Date-ISO validation
  static dateIso(control) {
    let result = FormValidator.checkValidator.dateIso({
      value: control.value
    });
    if (result === true) {
      return null;
    } else {
      return {
        "dateiso": true
      };
    }
  }
  // Digit validation
  static digits(control) {
    let result = FormValidator.checkValidator.digits({
      value: control.value
    });
    if (result === true) {
      return null;
    } else {
      return {
        "digit": true
      };
    }
  }
  // Email validation
  static email(control) {
    let result = FormValidator.checkValidator.email({
      value: control.value
    });
    if (result === true) {
      return null;
    } else {
      return {
        "email": true
      };
    }
  }
  //maxlength validation
  static maxLength(number) {
    let maxlength = number;
    return (control) => {
      let result = FormValidator.checkValidator.maxLength({
        value: control.value,
        param: maxlength
      });
      if (result === true) {
        return null;
      } else {
        return {
          "maxlength": true
        };
      }
    };
  }
  //minlength validation
  static minLength(number) {
    let minlength = number;
    return (control) => {
      let result = FormValidator.checkValidator.minLength({
        value: control.value,
        param: minlength
      });
      if (result === true) {
        return null;
      } else {
        return {
          "minlength": true
        };
      }
    };
  }
  //number validation
  static number(control) {
    let result = FormValidator.checkValidator.number({
      value: control.value
    });
    if (result === true) {
      return null;
    } else {
      return {
        "number": true
      };
    }
  }
  // required validation
  static required(control) {
    let result = control.value === null ? false : FormValidator.checkValidator.required({
      value: control.value
    });
    if (result === true) {
      return null;
    } else {
      return {
        "required": true
      };
    }
  }
  // Telephone number validation
  static tel(control) {
    let result = FormValidator.checkValidator.tel({
      value: control.value
    });
    if (result === true) {
      return null;
    } else {
      return {
        "telno": true
      };
    }
  }
  // Url validation
  static url(control) {
    let result = FormValidator.checkValidator.url({
      value: control.value
    });
    if (result === true) {
      return null;
    } else {
      return {
        "url": true
      };
    }
  }
  // RangeLength validation
  static rangeLength(number1, number2) {
    let minRL = number1;
    let maxRL = number2;
    let param = [minRL, maxRL];
    return (control) => {
      let result = FormValidator.checkValidator.rangeLength({
        value: control.value,
        param
      });
      if (result === true) {
        return null;
      } else {
        return {
          "rangelength": true
        };
      }
    };
  }
  // Range validation
  static range(number1, number2) {
    let minR = number1;
    let maxR = number2;
    let param1 = [minR, maxR];
    return (control) => {
      let result = FormValidator.checkValidator.range({
        value: control.value,
        param: param1
      });
      if (result === true) {
        return null;
      } else {
        return {
          "range": true
        };
      }
    };
  }
};
export {
  AsyncSettings,
  ButtonsProps,
  ColorPicker,
  ColorPickerAllModule,
  ColorPickerComponent,
  ColorPickerModule,
  ColorRangeData,
  ErrorOption,
  FilesDirective,
  FilesProp,
  FormValidator,
  FormValidators,
  Input,
  LabelPosition,
  LimitData,
  MaskUndo,
  MaskedTextBox,
  MaskedTextBoxAllModule,
  MaskedTextBoxComponent,
  MaskedTextBoxModule,
  NumericTextBox,
  NumericTextBoxAllModule,
  NumericTextBoxComponent,
  NumericTextBoxModule,
  PrecisionType,
  Rating,
  RatingAllModule,
  RatingComponent,
  RatingModule,
  Signature,
  SignatureAllModule,
  SignatureBase,
  SignatureComponent,
  SignatureModule,
  Slider,
  SliderAllModule,
  SliderComponent,
  SliderModule,
  TextBox,
  TextBoxAllModule,
  TextBoxComponent,
  TextBoxModule,
  TicksData,
  TooltipData,
  UploadedFilesDirective,
  Uploader,
  UploaderAllModule,
  UploaderComponent,
  UploaderModule,
  applyMask,
  bindClearEvent,
  createMask,
  escapeRegExp,
  getMaskedVal,
  getVal,
  maskInput,
  maskInputBlurHandler,
  maskInputDropHandler,
  maskInputFocusHandler,
  maskInputMouseDownHandler,
  maskInputMouseUpHandler,
  mobileRemoveFunction,
  regex,
  regularExpressions,
  setElementValue,
  setMaskValue,
  strippedValue,
  triggerFocus,
  unstrippedValue,
  unwireEvents,
  wireEvents
};
//# sourceMappingURL=@syncfusion_ej2-angular-inputs.js.map
