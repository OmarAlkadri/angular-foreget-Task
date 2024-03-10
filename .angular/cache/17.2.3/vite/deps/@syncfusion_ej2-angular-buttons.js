import {
  ArrayBase,
  Button,
  CheckBox,
  Chip,
  ChipList,
  ComplexBase,
  ComponentBase,
  ComponentMixins,
  Fab,
  FabPosition,
  FormBase,
  IconPosition,
  LinearDirection,
  RadialDirection,
  RadialSettings,
  RadioButton,
  SpeedDial,
  SpeedDialAnimationEffect,
  SpeedDialAnimationSettings,
  SpeedDialItem,
  SpeedDialMode,
  Switch,
  Template,
  buttonObserver,
  classNames,
  createCheckBox,
  destroy,
  getTextNode,
  preRender,
  rippleMouseHandler,
  setHiddenInput,
  setValue,
  wrapperInitialize
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
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵqueryRefresh
} from "./chunk-7S7LMAAM.js";
import "./chunk-GFVJDENN.js";
import "./chunk-QOAHSALO.js";
import {
  __decorate
} from "./chunk-LOA65BFQ.js";
import "./chunk-J4B6MK7R.js";

// node_modules/@syncfusion/ej2-angular-buttons/fesm2020/syncfusion-ej2-angular-buttons.mjs
var _c0 = ["ejs-button", ""];
var _c1 = ["*"];
var _c2 = ["ejs-fab", ""];
var _c3 = ["itemTemplate"];
var _c4 = ["popupTemplate"];
var _c5 = ["ejs-speeddial", ""];
var inputs$6 = ["content", "cssClass", "disabled", "enableHtmlSanitizer", "enablePersistence", "enableRtl", "iconCss", "iconPosition", "isPrimary", "isToggle", "locale"];
var outputs$8 = ["created"];
var twoWays$6 = [];
var ButtonComponent = class ButtonComponent2 extends Button {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$8);
    this.addTwoWay.call(this, twoWays$6);
    setValue("currentInstance", this, this.viewContainerRef);
    this.containerContext = new ComponentBase();
  }
  ngOnInit() {
    this.containerContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.containerContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.containerContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.containerContext.ngAfterContentChecked(this);
  }
};
ButtonComponent.ɵfac = function ButtonComponent_Factory(t) {
  return new (t || ButtonComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
ButtonComponent.ɵcmp = ɵɵdefineComponent({
  type: ButtonComponent,
  selectors: [["", "ejs-button", ""]],
  inputs: {
    content: "content",
    cssClass: "cssClass",
    disabled: "disabled",
    enableHtmlSanitizer: "enableHtmlSanitizer",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    iconCss: "iconCss",
    iconPosition: "iconPosition",
    isPrimary: "isPrimary",
    isToggle: "isToggle",
    locale: "locale"
  },
  outputs: {
    created: "created"
  },
  features: [ɵɵInheritDefinitionFeature],
  attrs: _c0,
  ngContentSelectors: _c1,
  decls: 1,
  vars: 0,
  template: function ButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
ButtonComponent = __decorate([ComponentMixins([ComponentBase])], ButtonComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonComponent, [{
    type: Component,
    args: [{
      selector: "[ejs-button]",
      inputs: inputs$6,
      outputs: outputs$8,
      template: `<ng-content ></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
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
    }];
  }, null);
})();
var ButtonModule = class {
};
ButtonModule.ɵfac = function ButtonModule_Factory(t) {
  return new (t || ButtonModule)();
};
ButtonModule.ɵmod = ɵɵdefineNgModule({
  type: ButtonModule,
  declarations: [ButtonComponent],
  imports: [CommonModule],
  exports: [ButtonComponent]
});
ButtonModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [ButtonComponent],
      exports: [ButtonComponent]
    }]
  }], null, null);
})();
var ButtonAllModule = class {
};
ButtonAllModule.ɵfac = function ButtonAllModule_Factory(t) {
  return new (t || ButtonAllModule)();
};
ButtonAllModule.ɵmod = ɵɵdefineNgModule({
  type: ButtonAllModule,
  imports: [CommonModule, ButtonModule],
  exports: [ButtonModule]
});
ButtonAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, ButtonModule], ButtonModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, ButtonModule],
      exports: [ButtonModule],
      providers: []
    }]
  }], null, null);
})();
var CheckBoxComponent_1;
var inputs$5 = ["checked", "cssClass", "disabled", "enableHtmlSanitizer", "enablePersistence", "enableRtl", "htmlAttributes", "indeterminate", "label", "labelPosition", "locale", "name", "value"];
var outputs$7 = ["focus", "blur", "change", "created", "checkedChange", "indeterminateChange"];
var twoWays$5 = ["checked", "indeterminate"];
var CheckBoxComponent = CheckBoxComponent_1 = class CheckBoxComponent2 extends CheckBox {
  constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.cdr = cdr;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$7);
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
CheckBoxComponent.ɵfac = function CheckBoxComponent_Factory(t) {
  return new (t || CheckBoxComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ChangeDetectorRef));
};
CheckBoxComponent.ɵcmp = ɵɵdefineComponent({
  type: CheckBoxComponent,
  selectors: [["ejs-checkbox"]],
  inputs: {
    checked: "checked",
    cssClass: "cssClass",
    disabled: "disabled",
    enableHtmlSanitizer: "enableHtmlSanitizer",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    htmlAttributes: "htmlAttributes",
    indeterminate: "indeterminate",
    label: "label",
    labelPosition: "labelPosition",
    locale: "locale",
    name: "name",
    value: "value"
  },
  outputs: {
    focus: "focus",
    blur: "blur",
    change: "change",
    created: "created",
    checkedChange: "checkedChange",
    indeterminateChange: "indeterminateChange"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckBoxComponent_1),
    multi: true
  }]), ɵɵInheritDefinitionFeature],
  decls: 0,
  vars: 0,
  template: function CheckBoxComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
CheckBoxComponent = CheckBoxComponent_1 = __decorate([ComponentMixins([ComponentBase, FormBase])], CheckBoxComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckBoxComponent, [{
    type: Component,
    args: [{
      selector: "ejs-checkbox",
      inputs: inputs$5,
      outputs: outputs$7,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckBoxComponent),
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
var CheckBoxModule = class {
};
CheckBoxModule.ɵfac = function CheckBoxModule_Factory(t) {
  return new (t || CheckBoxModule)();
};
CheckBoxModule.ɵmod = ɵɵdefineNgModule({
  type: CheckBoxModule,
  declarations: [CheckBoxComponent],
  imports: [CommonModule],
  exports: [CheckBoxComponent]
});
CheckBoxModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckBoxModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [CheckBoxComponent],
      exports: [CheckBoxComponent]
    }]
  }], null, null);
})();
var CheckBoxAllModule = class {
};
CheckBoxAllModule.ɵfac = function CheckBoxAllModule_Factory(t) {
  return new (t || CheckBoxAllModule)();
};
CheckBoxAllModule.ɵmod = ɵɵdefineNgModule({
  type: CheckBoxAllModule,
  imports: [CommonModule, CheckBoxModule],
  exports: [CheckBoxModule]
});
CheckBoxAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, CheckBoxModule], CheckBoxModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckBoxAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, CheckBoxModule],
      exports: [CheckBoxModule],
      providers: []
    }]
  }], null, null);
})();
var RadioButtonComponent_1;
var inputs$4 = ["checked", "cssClass", "disabled", "enableHtmlSanitizer", "enablePersistence", "enableRtl", "htmlAttributes", "label", "labelPosition", "locale", "name", "value"];
var outputs$6 = ["focus", "blur", "change", "created", "valueChange"];
var twoWays$4 = ["value"];
var RadioButtonComponent = RadioButtonComponent_1 = class RadioButtonComponent2 extends RadioButton {
  constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.cdr = cdr;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$6);
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
RadioButtonComponent.ɵfac = function RadioButtonComponent_Factory(t) {
  return new (t || RadioButtonComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ChangeDetectorRef));
};
RadioButtonComponent.ɵcmp = ɵɵdefineComponent({
  type: RadioButtonComponent,
  selectors: [["ejs-radiobutton"]],
  inputs: {
    checked: "checked",
    cssClass: "cssClass",
    disabled: "disabled",
    enableHtmlSanitizer: "enableHtmlSanitizer",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    htmlAttributes: "htmlAttributes",
    label: "label",
    labelPosition: "labelPosition",
    locale: "locale",
    name: "name",
    value: "value"
  },
  outputs: {
    focus: "focus",
    blur: "blur",
    change: "change",
    created: "created",
    valueChange: "valueChange"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButtonComponent_1),
    multi: true
  }]), ɵɵInheritDefinitionFeature],
  decls: 0,
  vars: 0,
  template: function RadioButtonComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
RadioButtonComponent = RadioButtonComponent_1 = __decorate([ComponentMixins([ComponentBase, FormBase])], RadioButtonComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RadioButtonComponent, [{
    type: Component,
    args: [{
      selector: "ejs-radiobutton",
      inputs: inputs$4,
      outputs: outputs$6,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RadioButtonComponent),
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
var RadioButtonModule = class {
};
RadioButtonModule.ɵfac = function RadioButtonModule_Factory(t) {
  return new (t || RadioButtonModule)();
};
RadioButtonModule.ɵmod = ɵɵdefineNgModule({
  type: RadioButtonModule,
  declarations: [RadioButtonComponent],
  imports: [CommonModule],
  exports: [RadioButtonComponent]
});
RadioButtonModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RadioButtonModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [RadioButtonComponent],
      exports: [RadioButtonComponent]
    }]
  }], null, null);
})();
var RadioButtonAllModule = class {
};
RadioButtonAllModule.ɵfac = function RadioButtonAllModule_Factory(t) {
  return new (t || RadioButtonAllModule)();
};
RadioButtonAllModule.ɵmod = ɵɵdefineNgModule({
  type: RadioButtonAllModule,
  imports: [CommonModule, RadioButtonModule],
  exports: [RadioButtonModule]
});
RadioButtonAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, RadioButtonModule], RadioButtonModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RadioButtonAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, RadioButtonModule],
      exports: [RadioButtonModule],
      providers: []
    }]
  }], null, null);
})();
var SwitchComponent_1;
var inputs$3 = ["checked", "cssClass", "disabled", "enablePersistence", "enableRtl", "htmlAttributes", "locale", "name", "offLabel", "onLabel", "value"];
var outputs$5 = ["focus", "blur", "change", "created", "checkedChange"];
var twoWays$3 = ["checked"];
var SwitchComponent = SwitchComponent_1 = class SwitchComponent2 extends Switch {
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
    this.formCompContext.ngAfterContentChecked(this);
  }
};
SwitchComponent.ɵfac = function SwitchComponent_Factory(t) {
  return new (t || SwitchComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ChangeDetectorRef));
};
SwitchComponent.ɵcmp = ɵɵdefineComponent({
  type: SwitchComponent,
  selectors: [["ejs-switch"]],
  inputs: {
    checked: "checked",
    cssClass: "cssClass",
    disabled: "disabled",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    htmlAttributes: "htmlAttributes",
    locale: "locale",
    name: "name",
    offLabel: "offLabel",
    onLabel: "onLabel",
    value: "value"
  },
  outputs: {
    focus: "focus",
    blur: "blur",
    change: "change",
    created: "created",
    checkedChange: "checkedChange"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SwitchComponent_1),
    multi: true
  }]), ɵɵInheritDefinitionFeature],
  decls: 0,
  vars: 0,
  template: function SwitchComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
SwitchComponent = SwitchComponent_1 = __decorate([ComponentMixins([ComponentBase, FormBase])], SwitchComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SwitchComponent, [{
    type: Component,
    args: [{
      selector: "ejs-switch",
      inputs: inputs$3,
      outputs: outputs$5,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SwitchComponent),
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
var SwitchModule = class {
};
SwitchModule.ɵfac = function SwitchModule_Factory(t) {
  return new (t || SwitchModule)();
};
SwitchModule.ɵmod = ɵɵdefineNgModule({
  type: SwitchModule,
  declarations: [SwitchComponent],
  imports: [CommonModule],
  exports: [SwitchComponent]
});
SwitchModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SwitchModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [SwitchComponent],
      exports: [SwitchComponent]
    }]
  }], null, null);
})();
var SwitchAllModule = class {
};
SwitchAllModule.ɵfac = function SwitchAllModule_Factory(t) {
  return new (t || SwitchAllModule)();
};
SwitchAllModule.ɵmod = ɵɵdefineNgModule({
  type: SwitchAllModule,
  imports: [CommonModule, SwitchModule],
  exports: [SwitchModule]
});
SwitchAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, SwitchModule], SwitchModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SwitchAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, SwitchModule],
      exports: [SwitchModule],
      providers: []
    }]
  }], null, null);
})();
var input$1 = ["avatarIconCss", "avatarText", "cssClass", "enabled", "htmlAttributes", "leadingIconCss", "leadingIconUrl", "text", "trailingIconCss", "trailingIconUrl", "value"];
var outputs$4 = [];
var ChipDirective = class extends ComplexBase {
  constructor(viewContainerRef) {
    super();
    this.viewContainerRef = viewContainerRef;
    setValue("currentInstance", this, this.viewContainerRef);
    this.registerEvents(outputs$4);
    this.directivePropList = input$1;
  }
};
ChipDirective.ɵfac = function ChipDirective_Factory(t) {
  return new (t || ChipDirective)(ɵɵdirectiveInject(ViewContainerRef));
};
ChipDirective.ɵdir = ɵɵdefineDirective({
  type: ChipDirective,
  selectors: [["e-chip"]],
  inputs: {
    avatarIconCss: "avatarIconCss",
    avatarText: "avatarText",
    cssClass: "cssClass",
    enabled: "enabled",
    htmlAttributes: "htmlAttributes",
    leadingIconCss: "leadingIconCss",
    leadingIconUrl: "leadingIconUrl",
    text: "text",
    trailingIconCss: "trailingIconCss",
    trailingIconUrl: "trailingIconUrl",
    value: "value"
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChipDirective, [{
    type: Directive,
    args: [{
      selector: "e-chips>e-chip",
      inputs: input$1,
      outputs: outputs$4,
      queries: {}
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }];
  }, null);
})();
var ChipsDirective = class extends ArrayBase {
  constructor() {
    super("chips");
  }
};
ChipsDirective.ɵfac = function ChipsDirective_Factory(t) {
  return new (t || ChipsDirective)();
};
ChipsDirective.ɵdir = ɵɵdefineDirective({
  type: ChipsDirective,
  selectors: [["e-chips"]],
  contentQueries: function ChipsDirective_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, ChipDirective, 4);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.children = _t);
    }
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChipsDirective, [{
    type: Directive,
    args: [{
      selector: "ejs-chiplist>e-chips",
      queries: {
        children: new ContentChildren(ChipDirective)
      }
    }]
  }], function() {
    return [];
  }, null);
})();
var inputs$2 = ["avatarIconCss", "avatarText", "chips", "cssClass", "enableDelete", "enablePersistence", "enableRtl", "enabled", "htmlAttributes", "leadingIconCss", "leadingIconUrl", "locale", "selectedChips", "selection", "text", "trailingIconCss", "trailingIconUrl"];
var outputs$3 = ["beforeClick", "click", "created", "delete", "deleted"];
var twoWays$2 = [""];
var ChipListComponent = class ChipListComponent2 extends ChipList {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.tags = ["chips"];
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$3);
    this.addTwoWay.call(this, twoWays$2);
    setValue("currentInstance", this, this.viewContainerRef);
    this.context = new ComponentBase();
  }
  ngOnInit() {
    this.context.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.context.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.context.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.tagObjects[0].instance = this.childChips;
    this.context.ngAfterContentChecked(this);
  }
};
ChipListComponent.ɵfac = function ChipListComponent_Factory(t) {
  return new (t || ChipListComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
ChipListComponent.ɵcmp = ɵɵdefineComponent({
  type: ChipListComponent,
  selectors: [["ejs-chiplist"]],
  contentQueries: function ChipListComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, ChipsDirective, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.childChips = _t.first);
    }
  },
  inputs: {
    avatarIconCss: "avatarIconCss",
    avatarText: "avatarText",
    chips: "chips",
    cssClass: "cssClass",
    enableDelete: "enableDelete",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    enabled: "enabled",
    htmlAttributes: "htmlAttributes",
    leadingIconCss: "leadingIconCss",
    leadingIconUrl: "leadingIconUrl",
    locale: "locale",
    selectedChips: "selectedChips",
    selection: "selection",
    text: "text",
    trailingIconCss: "trailingIconCss",
    trailingIconUrl: "trailingIconUrl"
  },
  outputs: {
    beforeClick: "beforeClick",
    click: "click",
    created: "created",
    delete: "delete",
    deleted: "deleted"
  },
  features: [ɵɵInheritDefinitionFeature],
  decls: 0,
  vars: 0,
  template: function ChipListComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
ChipListComponent = __decorate([ComponentMixins([ComponentBase])], ChipListComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChipListComponent, [{
    type: Component,
    args: [{
      selector: "ejs-chiplist",
      inputs: inputs$2,
      outputs: outputs$3,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {
        childChips: new ContentChild(ChipsDirective)
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
    }];
  }, null);
})();
var ChipListModule = class {
};
ChipListModule.ɵfac = function ChipListModule_Factory(t) {
  return new (t || ChipListModule)();
};
ChipListModule.ɵmod = ɵɵdefineNgModule({
  type: ChipListModule,
  declarations: [ChipListComponent, ChipDirective, ChipsDirective],
  imports: [CommonModule],
  exports: [ChipListComponent, ChipDirective, ChipsDirective]
});
ChipListModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChipListModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [ChipListComponent, ChipDirective, ChipsDirective],
      exports: [ChipListComponent, ChipDirective, ChipsDirective]
    }]
  }], null, null);
})();
var ChipListAllModule = class {
};
ChipListAllModule.ɵfac = function ChipListAllModule_Factory(t) {
  return new (t || ChipListAllModule)();
};
ChipListAllModule.ɵmod = ɵɵdefineNgModule({
  type: ChipListAllModule,
  imports: [CommonModule, ChipListModule],
  exports: [ChipListModule]
});
ChipListAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, ChipListModule], ChipListModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChipListAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, ChipListModule],
      exports: [ChipListModule],
      providers: []
    }]
  }], null, null);
})();
var inputs$1 = ["content", "cssClass", "disabled", "enableHtmlSanitizer", "enablePersistence", "enableRtl", "iconCss", "iconPosition", "isPrimary", "isToggle", "locale", "position", "target", "visible"];
var outputs$2 = ["created"];
var twoWays$1 = [];
var FabComponent = class FabComponent2 extends Fab {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$2);
    this.addTwoWay.call(this, twoWays$1);
    setValue("currentInstance", this, this.viewContainerRef);
    this.containerContext = new ComponentBase();
  }
  ngOnInit() {
    this.containerContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.containerContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.containerContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.containerContext.ngAfterContentChecked(this);
  }
};
FabComponent.ɵfac = function FabComponent_Factory(t) {
  return new (t || FabComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
FabComponent.ɵcmp = ɵɵdefineComponent({
  type: FabComponent,
  selectors: [["", "ejs-fab", ""]],
  inputs: {
    content: "content",
    cssClass: "cssClass",
    disabled: "disabled",
    enableHtmlSanitizer: "enableHtmlSanitizer",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    iconCss: "iconCss",
    iconPosition: "iconPosition",
    isPrimary: "isPrimary",
    isToggle: "isToggle",
    locale: "locale",
    position: "position",
    target: "target",
    visible: "visible"
  },
  outputs: {
    created: "created"
  },
  features: [ɵɵInheritDefinitionFeature],
  attrs: _c2,
  ngContentSelectors: _c1,
  decls: 1,
  vars: 0,
  template: function FabComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
FabComponent = __decorate([ComponentMixins([ComponentBase])], FabComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FabComponent, [{
    type: Component,
    args: [{
      selector: "[ejs-fab]",
      inputs: inputs$1,
      outputs: outputs$2,
      template: `<ng-content ></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
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
    }];
  }, null);
})();
var FabModule = class {
};
FabModule.ɵfac = function FabModule_Factory(t) {
  return new (t || FabModule)();
};
FabModule.ɵmod = ɵɵdefineNgModule({
  type: FabModule,
  declarations: [FabComponent],
  imports: [CommonModule],
  exports: [FabComponent]
});
FabModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FabModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [FabComponent],
      exports: [FabComponent]
    }]
  }], null, null);
})();
var FabAllModule = class {
};
FabAllModule.ɵfac = function FabAllModule_Factory(t) {
  return new (t || FabAllModule)();
};
FabAllModule.ɵmod = ɵɵdefineNgModule({
  type: FabAllModule,
  imports: [CommonModule, FabModule],
  exports: [FabModule]
});
FabAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, FabModule], FabModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FabAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, FabModule],
      exports: [FabModule],
      providers: []
    }]
  }], null, null);
})();
var input = ["disabled", "iconCss", "id", "text", "title"];
var outputs$1 = [];
var SpeedDialItemDirective = class extends ComplexBase {
  constructor(viewContainerRef) {
    super();
    this.viewContainerRef = viewContainerRef;
    setValue("currentInstance", this, this.viewContainerRef);
    this.registerEvents(outputs$1);
    this.directivePropList = input;
  }
};
SpeedDialItemDirective.ɵfac = function SpeedDialItemDirective_Factory(t) {
  return new (t || SpeedDialItemDirective)(ɵɵdirectiveInject(ViewContainerRef));
};
SpeedDialItemDirective.ɵdir = ɵɵdefineDirective({
  type: SpeedDialItemDirective,
  selectors: [["e-speeddial-item"]],
  inputs: {
    disabled: "disabled",
    iconCss: "iconCss",
    id: "id",
    text: "text",
    title: "title"
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SpeedDialItemDirective, [{
    type: Directive,
    args: [{
      selector: "e-speeddial-item",
      inputs: input,
      outputs: outputs$1,
      queries: {}
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }];
  }, null);
})();
var SpeedDialItemsDirective = class extends ArrayBase {
  constructor() {
    super("items");
  }
};
SpeedDialItemsDirective.ɵfac = function SpeedDialItemsDirective_Factory(t) {
  return new (t || SpeedDialItemsDirective)();
};
SpeedDialItemsDirective.ɵdir = ɵɵdefineDirective({
  type: SpeedDialItemsDirective,
  selectors: [["e-speeddial-items"]],
  contentQueries: function SpeedDialItemsDirective_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, SpeedDialItemDirective, 4);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.children = _t);
    }
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SpeedDialItemsDirective, [{
    type: Directive,
    args: [{
      selector: "e-speeddial-items",
      queries: {
        children: new ContentChildren(SpeedDialItemDirective)
      }
    }]
  }], function() {
    return [];
  }, null);
})();
var inputs = ["animation", "closeIconCss", "content", "cssClass", "direction", "disabled", "enablePersistence", "enableRtl", "iconPosition", "isPrimary", "itemTemplate", "items", "locale", "modal", "mode", "openIconCss", "opensOnHover", "popupTemplate", "position", "radialSettings", "target", "visible"];
var outputs = ["beforeClose", "beforeItemRender", "beforeOpen", "clicked", "created", "onClose", "onOpen", "visibleChange"];
var twoWays = ["visible"];
var SpeedDialComponent = class SpeedDialComponent2 extends SpeedDial {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.tags = ["items"];
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs);
    this.addTwoWay.call(this, twoWays);
    setValue("currentInstance", this, this.viewContainerRef);
    this.containerContext = new ComponentBase();
  }
  ngOnInit() {
    this.containerContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.containerContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.containerContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.tagObjects[0].instance = this.childItems;
    this.containerContext.ngAfterContentChecked(this);
  }
};
SpeedDialComponent.ɵfac = function SpeedDialComponent_Factory(t) {
  return new (t || SpeedDialComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
SpeedDialComponent.ɵcmp = ɵɵdefineComponent({
  type: SpeedDialComponent,
  selectors: [["", "ejs-speeddial", ""]],
  contentQueries: function SpeedDialComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, _c3, 5);
      ɵɵcontentQuery(dirIndex, _c4, 5);
      ɵɵcontentQuery(dirIndex, SpeedDialItemsDirective, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemTemplate = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.popupTemplate = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.childItems = _t.first);
    }
  },
  inputs: {
    animation: "animation",
    closeIconCss: "closeIconCss",
    content: "content",
    cssClass: "cssClass",
    direction: "direction",
    disabled: "disabled",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    iconPosition: "iconPosition",
    isPrimary: "isPrimary",
    itemTemplate: "itemTemplate",
    items: "items",
    locale: "locale",
    modal: "modal",
    mode: "mode",
    openIconCss: "openIconCss",
    opensOnHover: "opensOnHover",
    popupTemplate: "popupTemplate",
    position: "position",
    radialSettings: "radialSettings",
    target: "target",
    visible: "visible"
  },
  outputs: {
    beforeClose: "beforeClose",
    beforeItemRender: "beforeItemRender",
    beforeOpen: "beforeOpen",
    clicked: "clicked",
    created: "created",
    onClose: "onClose",
    onOpen: "onOpen",
    visibleChange: "visibleChange"
  },
  features: [ɵɵInheritDefinitionFeature],
  attrs: _c5,
  ngContentSelectors: _c1,
  decls: 1,
  vars: 0,
  template: function SpeedDialComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
__decorate([Template()], SpeedDialComponent.prototype, "itemTemplate", void 0);
__decorate([Template()], SpeedDialComponent.prototype, "popupTemplate", void 0);
SpeedDialComponent = __decorate([ComponentMixins([ComponentBase])], SpeedDialComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SpeedDialComponent, [{
    type: Component,
    args: [{
      selector: "[ejs-speeddial]",
      inputs,
      outputs,
      template: `<ng-content ></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {
        childItems: new ContentChild(SpeedDialItemsDirective)
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
    }];
  }, {
    itemTemplate: [{
      type: ContentChild,
      args: ["itemTemplate"]
    }],
    popupTemplate: [{
      type: ContentChild,
      args: ["popupTemplate"]
    }]
  });
})();
var SpeedDialModule = class {
};
SpeedDialModule.ɵfac = function SpeedDialModule_Factory(t) {
  return new (t || SpeedDialModule)();
};
SpeedDialModule.ɵmod = ɵɵdefineNgModule({
  type: SpeedDialModule,
  declarations: [SpeedDialComponent, SpeedDialItemDirective, SpeedDialItemsDirective],
  imports: [CommonModule],
  exports: [SpeedDialComponent, SpeedDialItemDirective, SpeedDialItemsDirective]
});
SpeedDialModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SpeedDialModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [SpeedDialComponent, SpeedDialItemDirective, SpeedDialItemsDirective],
      exports: [SpeedDialComponent, SpeedDialItemDirective, SpeedDialItemsDirective]
    }]
  }], null, null);
})();
var SpeedDialAllModule = class {
};
SpeedDialAllModule.ɵfac = function SpeedDialAllModule_Factory(t) {
  return new (t || SpeedDialAllModule)();
};
SpeedDialAllModule.ɵmod = ɵɵdefineNgModule({
  type: SpeedDialAllModule,
  imports: [CommonModule, SpeedDialModule],
  exports: [SpeedDialModule]
});
SpeedDialAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, SpeedDialModule], SpeedDialModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SpeedDialAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, SpeedDialModule],
      exports: [SpeedDialModule],
      providers: []
    }]
  }], null, null);
})();
export {
  Button,
  ButtonAllModule,
  ButtonComponent,
  ButtonModule,
  CheckBox,
  CheckBoxAllModule,
  CheckBoxComponent,
  CheckBoxModule,
  Chip,
  ChipDirective,
  ChipList,
  ChipListAllModule,
  ChipListComponent,
  ChipListModule,
  ChipsDirective,
  Fab,
  FabAllModule,
  FabComponent,
  FabModule,
  FabPosition,
  IconPosition,
  LinearDirection,
  RadialDirection,
  RadialSettings,
  RadioButton,
  RadioButtonAllModule,
  RadioButtonComponent,
  RadioButtonModule,
  SpeedDial,
  SpeedDialAllModule,
  SpeedDialAnimationEffect,
  SpeedDialAnimationSettings,
  SpeedDialComponent,
  SpeedDialItem,
  SpeedDialItemDirective,
  SpeedDialItemsDirective,
  SpeedDialMode,
  SpeedDialModule,
  Switch,
  SwitchAllModule,
  SwitchComponent,
  SwitchModule,
  buttonObserver,
  classNames,
  createCheckBox,
  destroy,
  getTextNode,
  preRender,
  rippleMouseHandler,
  setHiddenInput,
  wrapperInitialize
};
//# sourceMappingURL=@syncfusion_ej2-angular-buttons.js.map
