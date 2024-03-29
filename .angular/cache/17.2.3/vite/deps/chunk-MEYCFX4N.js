import {
  Button
} from "./chunk-BSLNYTC7.js";
import {
  Ajax,
  Animation,
  Base,
  Browser,
  ChildProperty,
  Collection,
  Complex,
  Component,
  Draggable,
  Event,
  EventHandler,
  Internationalization,
  KeyboardEvents,
  L10n,
  NotifyPropertyChanges,
  Property,
  SanitizeHtmlHelper,
  Touch,
  addClass,
  animationMode,
  append,
  attributes,
  classList,
  closest,
  compile,
  createElement,
  deleteObject,
  detach,
  extend,
  formatUnit,
  getComponent,
  getInstance,
  getNumericObject,
  getUniqueID,
  getValue,
  initializeCSPTemplate,
  isBlazor,
  isNullOrUndefined,
  isRippleEnabled,
  merge,
  onIntlChange,
  prepend,
  remove,
  removeClass,
  rippleEffect,
  select,
  selectAll,
  setStyleAttribute,
  setValue
} from "./chunk-Z7QDVKRA.js";

// node_modules/@syncfusion/ej2-inputs/src/input/input.js
var CLASSNAMES = {
  RTL: "e-rtl",
  DISABLE: "e-disabled",
  INPUT: "e-input",
  TEXTAREA: "e-multi-line-input",
  INPUTGROUP: "e-input-group",
  FLOATINPUT: "e-float-input",
  FLOATLINE: "e-float-line",
  FLOATTEXT: "e-float-text",
  FLOATTEXTCONTENT: "e-float-text-content",
  CLEARICON: "e-clear-icon",
  CLEARICONHIDE: "e-clear-icon-hide",
  LABELTOP: "e-label-top",
  LABELBOTTOM: "e-label-bottom",
  NOFLOATLABEL: "e-no-float-label",
  INPUTCUSTOMTAG: "e-input-custom-tag",
  FLOATCUSTOMTAG: "e-float-custom-tag"
};
var Input;
(function(Input2) {
  var privateInputObj = {
    container: null,
    buttons: [],
    clearButton: null
  };
  var floatType;
  var isBindClearAction = true;
  function createInput(args, internalCreateElement) {
    var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
    var inputObject = { container: null, buttons: [], clearButton: null };
    floatType = args.floatLabelType;
    isBindClearAction = args.bindClearAction;
    if (isNullOrUndefined(args.floatLabelType) || args.floatLabelType === "Never") {
      inputObject.container = createInputContainer(args, CLASSNAMES.INPUTGROUP, CLASSNAMES.INPUTCUSTOMTAG, "span", makeElement);
      args.element.parentNode.insertBefore(inputObject.container, args.element);
      addClass([args.element], CLASSNAMES.INPUT);
      inputObject.container.appendChild(args.element);
    } else {
      createFloatingInput(args, inputObject, makeElement);
    }
    bindInitialEvent(args);
    if (!isNullOrUndefined(args.properties) && !isNullOrUndefined(args.properties.showClearButton) && args.properties.showClearButton) {
      setClearButton(args.properties.showClearButton, args.element, inputObject, true, makeElement);
      inputObject.clearButton.setAttribute("role", "button");
      if (inputObject.container.classList.contains(CLASSNAMES.FLOATINPUT)) {
        addClass([inputObject.container], CLASSNAMES.INPUTGROUP);
      }
    }
    if (!isNullOrUndefined(args.buttons)) {
      for (var i = 0; i < args.buttons.length; i++) {
        inputObject.buttons.push(appendSpan(args.buttons[i], inputObject.container, makeElement));
      }
    }
    if (!isNullOrUndefined(args.element) && args.element.tagName === "TEXTAREA") {
      addClass([inputObject.container], CLASSNAMES.TEXTAREA);
    }
    validateInputType(inputObject.container, args.element);
    inputObject = setPropertyValue(args, inputObject);
    createSpanElement(inputObject.container, makeElement);
    privateInputObj = inputObject;
    return inputObject;
  }
  Input2.createInput = createInput;
  function bindInitialEvent(args) {
    checkInputValue(args.floatLabelType, args.element);
    args.element.addEventListener("focus", function() {
      var parent = getParentNode(this);
      if (parent.classList.contains("e-input-group") || parent.classList.contains("e-outline") || parent.classList.contains("e-filled")) {
        parent.classList.add("e-input-focus");
      }
      if (args.floatLabelType === "Auto") {
        setTimeout(function() {
          Input2.calculateWidth(args.element, parent);
        }, 80);
      }
    });
    args.element.addEventListener("blur", function() {
      var parent = getParentNode(this);
      if (parent.classList.contains("e-input-group") || parent.classList.contains("e-outline") || parent.classList.contains("e-filled")) {
        parent.classList.remove("e-input-focus");
      }
      if (args.floatLabelType === "Auto" && args.element.value === "") {
        setTimeout(function() {
          Input2.calculateWidth(args.element, parent);
        }, 80);
      }
    });
    args.element.addEventListener("input", function() {
      checkInputValue(floatType, args.element);
    });
  }
  Input2.bindInitialEvent = bindInitialEvent;
  function checkInputValue(floatLabelType, inputElement) {
    var inputValue = inputElement.value;
    var inputParent = inputElement.parentElement;
    var grandParent = inputParent.parentElement;
    if (inputValue !== "" && !isNullOrUndefined(inputValue)) {
      if (inputParent && inputParent.classList.contains("e-input-group")) {
        inputParent.classList.add("e-valid-input");
      } else if (grandParent && grandParent.classList.contains("e-input-group")) {
        grandParent.classList.add("e-valid-input");
      }
    } else if (floatLabelType !== "Always") {
      if (inputParent && inputParent.classList.contains("e-input-group")) {
        inputParent.classList.remove("e-valid-input");
      } else if (grandParent && grandParent.classList.contains("e-input-group")) {
        grandParent.classList.remove("e-valid-input");
      }
    }
  }
  function _focusFn() {
    var label = getParentNode(this).getElementsByClassName("e-float-text")[0];
    if (!isNullOrUndefined(label)) {
      addClass([label], CLASSNAMES.LABELTOP);
      if (label.classList.contains(CLASSNAMES.LABELBOTTOM)) {
        removeClass([label], CLASSNAMES.LABELBOTTOM);
      }
    }
  }
  function _blurFn() {
    var parent = getParentNode(this);
    if (parent.getElementsByTagName("textarea")[0] ? parent.getElementsByTagName("textarea")[0].value === "" : parent.getElementsByTagName("input")[0].value === "") {
      var label = parent.getElementsByClassName("e-float-text")[0];
      if (!isNullOrUndefined(label)) {
        if (label.classList.contains(CLASSNAMES.LABELTOP)) {
          removeClass([label], CLASSNAMES.LABELTOP);
        }
        addClass([label], CLASSNAMES.LABELBOTTOM);
      }
    }
  }
  function wireFloatingEvents(element2) {
    element2.addEventListener("focus", _focusFn);
    element2.addEventListener("blur", _blurFn);
  }
  Input2.wireFloatingEvents = wireFloatingEvents;
  function unwireFloatingEvents(element2) {
    element2.removeEventListener("focus", _focusFn);
    element2.removeEventListener("blur", _blurFn);
  }
  function createFloatingInput(args, inputObject, internalCreateElement) {
    var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
    if (args.floatLabelType === "Auto") {
      wireFloatingEvents(args.element);
    }
    if (isNullOrUndefined(inputObject.container)) {
      inputObject.container = createInputContainer(args, CLASSNAMES.FLOATINPUT, CLASSNAMES.FLOATCUSTOMTAG, "div", makeElement);
      inputObject.container.classList.add(CLASSNAMES.INPUTGROUP);
      if (args.element.parentNode) {
        args.element.parentNode.insertBefore(inputObject.container, args.element);
      }
    } else {
      if (!isNullOrUndefined(args.customTag)) {
        inputObject.container.classList.add(CLASSNAMES.FLOATCUSTOMTAG);
      }
      inputObject.container.classList.add(CLASSNAMES.FLOATINPUT);
    }
    var floatLinelement = makeElement("span", { className: CLASSNAMES.FLOATLINE });
    var floatLabelElement = makeElement("label", { className: CLASSNAMES.FLOATTEXT });
    if (!isNullOrUndefined(args.element.id) && args.element.id !== "") {
      floatLabelElement.id = "label_" + args.element.id.replace(/ /g, "_");
      attributes(args.element, { "aria-labelledby": floatLabelElement.id });
    }
    if (!isNullOrUndefined(args.element.placeholder) && args.element.placeholder !== "") {
      floatLabelElement.innerText = encodePlaceHolder(args.element.placeholder);
      args.element.removeAttribute("placeholder");
    }
    if (!isNullOrUndefined(args.properties) && !isNullOrUndefined(args.properties.placeholder) && args.properties.placeholder !== "") {
      floatLabelElement.innerText = encodePlaceHolder(args.properties.placeholder);
    }
    if (!floatLabelElement.innerText) {
      inputObject.container.classList.add(CLASSNAMES.NOFLOATLABEL);
    }
    if (inputObject.container.classList.contains("e-float-icon-left")) {
      var inputWrap = inputObject.container.querySelector(".e-input-in-wrap");
      inputWrap.appendChild(args.element);
      inputWrap.appendChild(floatLinelement);
      inputWrap.appendChild(floatLabelElement);
    } else {
      inputObject.container.appendChild(args.element);
      inputObject.container.appendChild(floatLinelement);
      inputObject.container.appendChild(floatLabelElement);
    }
    updateLabelState(args.element.value, floatLabelElement);
    if (args.floatLabelType === "Always") {
      if (floatLabelElement.classList.contains(CLASSNAMES.LABELBOTTOM)) {
        removeClass([floatLabelElement], CLASSNAMES.LABELBOTTOM);
      }
      addClass([floatLabelElement], CLASSNAMES.LABELTOP);
    }
    if (args.floatLabelType === "Auto") {
      args.element.addEventListener("input", function(event) {
        validateLabel(args.element, args.floatLabelType);
      });
      args.element.addEventListener("blur", function(event) {
        validateLabel(args.element, args.floatLabelType);
      });
    }
    if (!isNullOrUndefined(args.element.getAttribute("id"))) {
      floatLabelElement.setAttribute("for", args.element.getAttribute("id"));
    }
  }
  function checkFloatLabelType(type, container) {
    if (type === "Always" && container.classList.contains("e-outline")) {
      container.classList.add("e-valid-input");
    }
  }
  function setPropertyValue(args, inputObject) {
    if (!isNullOrUndefined(args.properties)) {
      for (var _i = 0, _a = Object.keys(args.properties); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "cssClass":
            setCssClass(args.properties.cssClass, [inputObject.container]);
            checkFloatLabelType(args.floatLabelType, inputObject.container);
            break;
          case "enabled":
            setEnabled(args.properties.enabled, args.element, args.floatLabelType, inputObject.container);
            break;
          case "enableRtl":
            setEnableRtl(args.properties.enableRtl, [inputObject.container]);
            break;
          case "placeholder":
            setPlaceholder(args.properties.placeholder, args.element);
            break;
          case "readonly":
            setReadonly(args.properties.readonly, args.element);
            break;
        }
      }
    }
    return inputObject;
  }
  function updateIconState(value, button, readonly) {
    if (!isNullOrUndefined(button)) {
      if (value && !readonly) {
        removeClass([button], CLASSNAMES.CLEARICONHIDE);
      } else {
        addClass([button], CLASSNAMES.CLEARICONHIDE);
      }
    }
  }
  function updateLabelState(value, label, element2) {
    if (element2 === void 0) {
      element2 = null;
    }
    if (value) {
      addClass([label], CLASSNAMES.LABELTOP);
      if (label.classList.contains(CLASSNAMES.LABELBOTTOM)) {
        removeClass([label], CLASSNAMES.LABELBOTTOM);
      }
    } else {
      var isNotFocused = element2 != null ? element2 !== document.activeElement : true;
      if (isNotFocused) {
        if (label.classList.contains(CLASSNAMES.LABELTOP)) {
          removeClass([label], CLASSNAMES.LABELTOP);
        }
        addClass([label], CLASSNAMES.LABELBOTTOM);
      }
    }
  }
  function getParentNode(element2) {
    var parentNode = isNullOrUndefined(element2.parentNode) ? element2 : element2.parentNode;
    if (parentNode && parentNode.classList.contains("e-input-in-wrap")) {
      parentNode = parentNode.parentNode;
    }
    return parentNode;
  }
  function createClearButton(element2, inputObject, initial, internalCreateElement) {
    var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
    var button = makeElement("span", { className: CLASSNAMES.CLEARICON });
    var container = inputObject.container;
    if (!isNullOrUndefined(initial)) {
      container.appendChild(button);
    } else {
      var baseElement = inputObject.container.classList.contains(CLASSNAMES.FLOATINPUT) ? inputObject.container.querySelector("." + CLASSNAMES.FLOATTEXT) : element2;
      baseElement.insertAdjacentElement("afterend", button);
    }
    addClass([button], CLASSNAMES.CLEARICONHIDE);
    wireClearBtnEvents(element2, button, container);
    button.setAttribute("aria-label", "close");
    return button;
  }
  function wireClearBtnEvents(element2, button, container) {
    if (isBindClearAction === void 0 || isBindClearAction) {
      button.addEventListener("click", function(event) {
        if (!(element2.classList.contains(CLASSNAMES.DISABLE) || element2.readOnly)) {
          event.preventDefault();
          if (element2 !== document.activeElement) {
            element2.focus();
          }
          element2.value = "";
          addClass([button], CLASSNAMES.CLEARICONHIDE);
        }
      });
    }
    element2.addEventListener("input", function(event) {
      updateIconState(element2.value, button);
    });
    element2.addEventListener("focus", function(event) {
      updateIconState(element2.value, button, element2.readOnly);
    });
    element2.addEventListener("blur", function(event) {
      setTimeout(function() {
        if (!isNullOrUndefined(button)) {
          addClass([button], CLASSNAMES.CLEARICONHIDE);
          button = !isNullOrUndefined(element2) && element2.classList.contains("e-combobox") ? null : button;
        }
      }, 200);
    });
  }
  Input2.wireClearBtnEvents = wireClearBtnEvents;
  function destroy() {
    privateInputObj = null;
  }
  Input2.destroy = destroy;
  function validateLabel(element2, floatLabelType) {
    var parent = getParentNode(element2);
    if (parent.classList.contains(CLASSNAMES.FLOATINPUT) && floatLabelType === "Auto") {
      var label = getParentNode(element2).getElementsByClassName("e-float-text")[0];
      updateLabelState(element2.value, label, element2);
    }
  }
  function createInputContainer(args, className, tagClass, tag, internalCreateElement) {
    var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
    var container;
    if (!isNullOrUndefined(args.customTag)) {
      container = makeElement(args.customTag, { className });
      container.classList.add(tagClass);
    } else {
      container = makeElement(tag, { className });
    }
    container.classList.add("e-control-wrapper");
    return container;
  }
  function encodePlaceHolder(placeholder) {
    var result = "";
    if (!isNullOrUndefined(placeholder) && placeholder !== "") {
      var spanEle = document.createElement("span");
      spanEle.innerHTML = '<input  placeholder="' + placeholder + '"/>';
      var hiddenInput = spanEle.children[0];
      result = hiddenInput.placeholder;
    }
    return result;
  }
  function setValue2(value, element2, floatLabelType, clearButton) {
    element2.value = value;
    if (floatLabelType === "Auto" && value === "") {
      calculateWidth(element2, element2.parentElement);
    }
    if (!isNullOrUndefined(floatLabelType) && floatLabelType === "Auto") {
      validateLabel(element2, floatLabelType);
    }
    if (!isNullOrUndefined(clearButton) && clearButton) {
      var parentElement = getParentNode(element2);
      if (!isNullOrUndefined(parentElement)) {
        var button = parentElement.getElementsByClassName(CLASSNAMES.CLEARICON)[0];
        if (!isNullOrUndefined(button)) {
          if (element2.value && !isNullOrUndefined(parentElement) && parentElement.classList.contains("e-input-focus")) {
            removeClass([button], CLASSNAMES.CLEARICONHIDE);
          } else {
            addClass([button], CLASSNAMES.CLEARICONHIDE);
          }
        }
      }
    }
    checkInputValue(floatLabelType, element2);
  }
  Input2.setValue = setValue2;
  function setCssClass(cssClass, elements, oldClass) {
    if (!isNullOrUndefined(oldClass) && oldClass !== "") {
      removeClass(elements, oldClass.split(" "));
    }
    if (!isNullOrUndefined(cssClass) && cssClass !== "") {
      addClass(elements, cssClass.split(" "));
    }
  }
  Input2.setCssClass = setCssClass;
  function calculateWidth(element2, container, moduleName) {
    var elementWidth = moduleName === "multiselect" ? element2 : element2.clientWidth - parseInt(getComputedStyle(element2, null).getPropertyValue("padding-left"), 10);
    if (!isNullOrUndefined(container.getElementsByClassName("e-float-text-content")[0])) {
      if (container.getElementsByClassName("e-float-text-content")[0].classList.contains("e-float-text-overflow")) {
        container.getElementsByClassName("e-float-text-content")[0].classList.remove("e-float-text-overflow");
      }
      if (elementWidth < container.getElementsByClassName("e-float-text-content")[0].clientWidth || elementWidth === container.getElementsByClassName("e-float-text-content")[0].clientWidth) {
        container.getElementsByClassName("e-float-text-content")[0].classList.add("e-float-text-overflow");
      }
    }
  }
  Input2.calculateWidth = calculateWidth;
  function setWidth2(width, container) {
    if (typeof width === "number") {
      container.style.width = formatUnit(width);
    } else if (typeof width === "string") {
      container.style.width = width.match(/px|%|em/) ? width : formatUnit(width);
    }
    calculateWidth(container.firstChild, container);
  }
  Input2.setWidth = setWidth2;
  function setPlaceholder(placeholder, element2) {
    placeholder = encodePlaceHolder(placeholder);
    var parentElement = getParentNode(element2);
    if (parentElement.classList.contains(CLASSNAMES.FLOATINPUT)) {
      if (!isNullOrUndefined(placeholder) && placeholder !== "") {
        parentElement.getElementsByClassName("e-float-text-content")[0] ? parentElement.getElementsByClassName(CLASSNAMES.FLOATTEXT)[0].children[0].textContent = placeholder : parentElement.getElementsByClassName(CLASSNAMES.FLOATTEXT)[0].textContent = placeholder;
        parentElement.classList.remove(CLASSNAMES.NOFLOATLABEL);
        element2.removeAttribute("placeholder");
      } else {
        parentElement.classList.add(CLASSNAMES.NOFLOATLABEL);
        parentElement.getElementsByClassName("e-float-text-content")[0] ? parentElement.getElementsByClassName(CLASSNAMES.FLOATTEXT)[0].children[0].textContent = "" : parentElement.getElementsByClassName(CLASSNAMES.FLOATTEXT)[0].textContent = "";
      }
    } else {
      if (!isNullOrUndefined(placeholder) && placeholder !== "") {
        attributes(element2, { "placeholder": placeholder });
      } else {
        element2.removeAttribute("placeholder");
      }
    }
  }
  Input2.setPlaceholder = setPlaceholder;
  function setReadonly(isReadonly, element2, floatLabelType) {
    if (isReadonly) {
      attributes(element2, { readonly: "" });
    } else {
      element2.removeAttribute("readonly");
    }
    if (!isNullOrUndefined(floatLabelType)) {
      validateLabel(element2, floatLabelType);
    }
  }
  Input2.setReadonly = setReadonly;
  function setEnableRtl(isRtl, elements) {
    if (isRtl) {
      addClass(elements, CLASSNAMES.RTL);
    } else {
      removeClass(elements, CLASSNAMES.RTL);
    }
  }
  Input2.setEnableRtl = setEnableRtl;
  function setEnabled(isEnable, element2, floatLabelType, inputContainer) {
    var disabledAttrs = { "disabled": "disabled", "aria-disabled": "true" };
    var considerWrapper = isNullOrUndefined(inputContainer) ? false : true;
    if (isEnable) {
      element2.classList.remove(CLASSNAMES.DISABLE);
      removeAttributes(disabledAttrs, element2);
      if (considerWrapper) {
        removeClass([inputContainer], CLASSNAMES.DISABLE);
      }
    } else {
      element2.classList.add(CLASSNAMES.DISABLE);
      addAttributes(disabledAttrs, element2);
      if (considerWrapper) {
        addClass([inputContainer], CLASSNAMES.DISABLE);
      }
    }
    if (!isNullOrUndefined(floatLabelType)) {
      validateLabel(element2, floatLabelType);
    }
  }
  Input2.setEnabled = setEnabled;
  function setClearButton(isClear, element2, inputObject, initial, internalCreateElement) {
    var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
    if (isClear) {
      inputObject.clearButton = createClearButton(element2, inputObject, initial, makeElement);
    } else {
      remove(inputObject.clearButton);
      inputObject.clearButton = null;
    }
  }
  Input2.setClearButton = setClearButton;
  function removeAttributes(attrs, element2) {
    for (var _i = 0, _a = Object.keys(attrs); _i < _a.length; _i++) {
      var key = _a[_i];
      var parentElement = getParentNode(element2);
      if (key === "disabled") {
        element2.classList.remove(CLASSNAMES.DISABLE);
      }
      if (key === "disabled" && parentElement.classList.contains(CLASSNAMES.INPUTGROUP)) {
        parentElement.classList.remove(CLASSNAMES.DISABLE);
      }
      if (key === "placeholder" && parentElement.classList.contains(CLASSNAMES.FLOATINPUT)) {
        parentElement.getElementsByClassName(CLASSNAMES.FLOATTEXT)[0].textContent = "";
      } else {
        element2.removeAttribute(key);
      }
    }
  }
  Input2.removeAttributes = removeAttributes;
  function addAttributes(attrs, element2) {
    for (var _i = 0, _a = Object.keys(attrs); _i < _a.length; _i++) {
      var key = _a[_i];
      var parentElement = getParentNode(element2);
      if (key === "disabled") {
        element2.classList.add(CLASSNAMES.DISABLE);
      }
      if (key === "disabled" && parentElement.classList.contains(CLASSNAMES.INPUTGROUP)) {
        parentElement.classList.add(CLASSNAMES.DISABLE);
      }
      if (key === "placeholder" && parentElement.classList.contains(CLASSNAMES.FLOATINPUT)) {
        parentElement.getElementsByClassName(CLASSNAMES.FLOATTEXT)[0].textContent = attrs["" + key];
      } else {
        element2.setAttribute(key, attrs["" + key]);
      }
    }
  }
  Input2.addAttributes = addAttributes;
  function removeFloating(input) {
    var container = input.container;
    if (!isNullOrUndefined(container) && container.classList.contains(CLASSNAMES.FLOATINPUT)) {
      var inputEle = container.querySelector("textarea") ? container.querySelector("textarea") : container.querySelector("input");
      var placeholder = container.querySelector("." + CLASSNAMES.FLOATTEXT).textContent;
      var clearButton = container.querySelector(".e-clear-icon") !== null;
      detach(container.querySelector("." + CLASSNAMES.FLOATLINE));
      detach(container.querySelector("." + CLASSNAMES.FLOATTEXT));
      classList(container, [CLASSNAMES.INPUTGROUP], [CLASSNAMES.FLOATINPUT]);
      unwireFloatingEvents(inputEle);
      attributes(inputEle, { "placeholder": placeholder });
      inputEle.classList.add(CLASSNAMES.INPUT);
      if (!clearButton && inputEle.tagName === "INPUT") {
        inputEle.removeAttribute("required");
      }
    }
  }
  Input2.removeFloating = removeFloating;
  function addFloating(input, type, placeholder, internalCreateElement) {
    var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
    var container = closest(input, "." + CLASSNAMES.INPUTGROUP);
    floatType = type;
    if (type !== "Never") {
      var customTag = container.tagName;
      customTag = customTag !== "DIV" && customTag !== "SPAN" ? customTag : null;
      var args = {
        element: input,
        floatLabelType: type,
        customTag,
        properties: { placeholder }
      };
      var iconEle = container.querySelector(".e-clear-icon");
      var inputObj = { container };
      input.classList.remove(CLASSNAMES.INPUT);
      createFloatingInput(args, inputObj, makeElement);
      createSpanElement(inputObj.container, makeElement);
      calculateWidth(args.element, inputObj.container);
      var isPrependIcon = container.classList.contains("e-float-icon-left");
      if (isNullOrUndefined(iconEle)) {
        if (isPrependIcon) {
          var inputWrap = container.querySelector(".e-input-in-wrap");
          iconEle = inputWrap.querySelector(".e-input-group-icon");
        } else {
          iconEle = container.querySelector(".e-input-group-icon");
        }
      }
      if (isNullOrUndefined(iconEle)) {
        if (isPrependIcon) {
          iconEle = container.querySelector(".e-input-group-icon");
        }
      } else {
        var floatLine = container.querySelector("." + CLASSNAMES.FLOATLINE);
        var floatText = container.querySelector("." + CLASSNAMES.FLOATTEXT);
        var wrapper = isPrependIcon ? container.querySelector(".e-input-in-wrap") : container;
        wrapper.insertBefore(input, iconEle);
        wrapper.insertBefore(floatLine, iconEle);
        wrapper.insertBefore(floatText, iconEle);
      }
    }
    checkFloatLabelType(type, input.parentElement);
  }
  Input2.addFloating = addFloating;
  function createSpanElement(inputObject, makeElement) {
    if (inputObject.classList.contains("e-outline") && inputObject.getElementsByClassName("e-float-text")[0]) {
      var labelSpanElement = makeElement("span", { className: CLASSNAMES.FLOATTEXTCONTENT });
      labelSpanElement.innerHTML = inputObject.getElementsByClassName("e-float-text")[0].innerHTML;
      inputObject.getElementsByClassName("e-float-text")[0].innerHTML = "";
      inputObject.getElementsByClassName("e-float-text")[0].appendChild(labelSpanElement);
    }
  }
  Input2.createSpanElement = createSpanElement;
  function setRipple(isRipple, inputObj) {
    for (var i = 0; i < inputObj.length; i++) {
      _internalRipple(isRipple, inputObj[parseInt(i.toString())].container);
    }
  }
  Input2.setRipple = setRipple;
  function _internalRipple(isRipple, container, button) {
    var argsButton = [];
    argsButton.push(button);
    var buttons = isNullOrUndefined(button) ? container.querySelectorAll(".e-input-group-icon") : argsButton;
    if (isRipple && buttons.length > 0) {
      for (var index = 0; index < buttons.length; index++) {
        buttons[parseInt(index.toString())].addEventListener("mousedown", _onMouseDownRipple, false);
        buttons[parseInt(index.toString())].addEventListener("mouseup", _onMouseUpRipple, false);
      }
    } else if (buttons.length > 0) {
      for (var index = 0; index < buttons.length; index++) {
        buttons[parseInt(index.toString())].removeEventListener("mousedown", _onMouseDownRipple, this);
        buttons[parseInt(index.toString())].removeEventListener("mouseup", _onMouseUpRipple, this);
      }
    }
  }
  function _onMouseRipple(container, button) {
    if (!container.classList.contains("e-disabled") && !container.querySelector("input").readOnly) {
      button.classList.add("e-input-btn-ripple");
    }
  }
  function _onMouseDownRipple() {
    var ele = this;
    var parentEle = this.parentElement;
    while (!parentEle.classList.contains("e-input-group")) {
      parentEle = parentEle.parentElement;
    }
    _onMouseRipple(parentEle, ele);
  }
  function _onMouseUpRipple() {
    var ele = this;
    setTimeout(function() {
      ele.classList.remove("e-input-btn-ripple");
    }, 500);
  }
  function createIconEle(iconClass, makeElement) {
    var button = makeElement("span", { className: iconClass });
    button.classList.add("e-input-group-icon");
    return button;
  }
  function addIcon(position, icons, container, input, internalCreate) {
    var result = typeof icons === "string" ? icons.split(",") : icons;
    if (position.toLowerCase() === "append") {
      for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
        var icon = result_1[_i];
        appendSpan(icon, container, internalCreate);
      }
    } else {
      for (var _a = 0, result_2 = result; _a < result_2.length; _a++) {
        var icon = result_2[_a];
        prependSpan(icon, container, input, internalCreate);
      }
    }
    if (container.getElementsByClassName("e-input-group-icon")[0] && container.getElementsByClassName("e-float-text-overflow")[0]) {
      container.getElementsByClassName("e-float-text-overflow")[0].classList.add("e-icon");
    }
  }
  Input2.addIcon = addIcon;
  function prependSpan(iconClass, container, inputElement, internalCreateElement) {
    var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
    var button = createIconEle(iconClass, makeElement);
    container.classList.add("e-float-icon-left");
    var innerWrapper = container.querySelector(".e-input-in-wrap");
    if (isNullOrUndefined(innerWrapper)) {
      innerWrapper = makeElement("span", { className: "e-input-in-wrap" });
      inputElement.parentNode.insertBefore(innerWrapper, inputElement);
      var result = container.querySelectorAll(inputElement.tagName + " ~ *");
      innerWrapper.appendChild(inputElement);
      for (var i = 0; i < result.length; i++) {
        var element2 = result[parseInt(i.toString())];
        var parentElement = innerWrapper.parentElement;
        if (!element2.classList.contains("e-float-line") || !(parentElement && parentElement.classList.contains("e-filled")) && parentElement) {
          innerWrapper.appendChild(element2);
        }
      }
    }
    innerWrapper.parentNode.insertBefore(button, innerWrapper);
    _internalRipple(true, container, button);
    return button;
  }
  Input2.prependSpan = prependSpan;
  function appendSpan(iconClass, container, internalCreateElement) {
    var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
    var button = createIconEle(iconClass, makeElement);
    var wrap = container.classList.contains("e-float-icon-left") ? container.querySelector(".e-input-in-wrap") : container;
    wrap.appendChild(button);
    _internalRipple(true, container, button);
    return button;
  }
  Input2.appendSpan = appendSpan;
  function validateInputType(containerElement2, input) {
    if (input.type === "hidden") {
      containerElement2.classList.add("e-hidden");
    } else if (containerElement2.classList.contains("e-hidden")) {
      containerElement2.classList.remove("e-hidden");
    }
  }
  Input2.validateInputType = validateInputType;
})(Input || (Input = {}));

// node_modules/@syncfusion/ej2-inputs/src/numerictextbox/numerictextbox.js
var __extends = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ROOT = "e-control-wrapper e-numeric";
var SPINICON = "e-input-group-icon";
var SPINUP = "e-spin-up";
var SPINDOWN = "e-spin-down";
var ERROR = "e-error";
var INCREMENT = "increment";
var DECREMENT = "decrement";
var INTREGEXP = new RegExp("^(-)?(\\d*)$");
var DECIMALSEPARATOR = ".";
var COMPONENT = "e-numerictextbox";
var CONTROL = "e-control";
var NUMERIC_FOCUS = "e-input-focus";
var HIDDENELEMENT = "e-numeric-hidden";
var wrapperAttributes = ["title", "style", "class"];
var selectionTimeOut = 0;
var NumericTextBox = (
  /** @class */
  function(_super) {
    __extends(NumericTextBox2, _super);
    function NumericTextBox2(options, element2) {
      var _this = _super.call(this, options, element2) || this;
      _this.isVue = false;
      _this.preventChange = false;
      _this.isAngular = false;
      _this.isDynamicChange = false;
      _this.numericOptions = options;
      return _this;
    }
    NumericTextBox2.prototype.preRender = function() {
      this.isPrevFocused = false;
      this.decimalSeparator = ".";
      this.intRegExp = new RegExp("/^(-)?(d*)$/");
      this.isCalled = false;
      var ejInstance = getValue("ej2_instances", this.element);
      this.cloneElement = this.element.cloneNode(true);
      removeClass([this.cloneElement], [CONTROL, COMPONENT, "e-lib"]);
      this.angularTagName = null;
      this.formEle = closest(this.element, "form");
      if (this.element.tagName === "EJS-NUMERICTEXTBOX") {
        this.angularTagName = this.element.tagName;
        var input = this.createElement("input");
        var index = 0;
        for (index; index < this.element.attributes.length; index++) {
          var attributeName = this.element.attributes[index].nodeName;
          if (attributeName !== "id" && attributeName !== "class") {
            input.setAttribute(this.element.attributes[index].nodeName, this.element.attributes[index].nodeValue);
            input.innerHTML = this.element.innerHTML;
          } else if (attributeName === "class") {
            input.setAttribute(attributeName, this.element.className.split(" ").filter(function(item) {
              return item.indexOf("ng-") !== 0;
            }).join(" "));
          }
        }
        if (this.element.hasAttribute("name")) {
          this.element.removeAttribute("name");
        }
        this.element.classList.remove("e-control", "e-numerictextbox");
        this.element.appendChild(input);
        this.element = input;
        setValue("ej2_instances", ejInstance, this.element);
      }
      attributes(this.element, { "role": "spinbutton", "tabindex": "0", "autocomplete": "off" });
      var localeText = {
        incrementTitle: "Increment value",
        decrementTitle: "Decrement value",
        placeholder: this.placeholder
      };
      this.l10n = new L10n("numerictextbox", localeText, this.locale);
      if (this.l10n.getConstant("placeholder") !== "") {
        this.setProperties({ placeholder: this.placeholder || this.l10n.getConstant("placeholder") }, true);
      }
      if (!this.element.hasAttribute("id")) {
        this.element.setAttribute("id", getUniqueID("numerictextbox"));
      }
      this.isValidState = true;
      this.inputStyle = null;
      this.inputName = null;
      this.cultureInfo = {};
      this.initCultureInfo();
      this.initCultureFunc();
      this.prevValue = this.value;
      this.updateHTMLAttrToElement();
      this.checkAttributes(false);
      if (this.formEle) {
        this.inputEleValue = this.value;
      }
      this.validateMinMax();
      this.validateStep();
      if (this.placeholder === null) {
        this.updatePlaceholder();
      }
    };
    NumericTextBox2.prototype.render = function() {
      if (this.element.tagName.toLowerCase() === "input") {
        this.createWrapper();
        if (this.showSpinButton) {
          this.spinBtnCreation();
        }
        this.setElementWidth(this.width);
        if (!this.container.classList.contains("e-input-group")) {
          this.container.classList.add("e-input-group");
        }
        this.changeValue(this.value === null || isNaN(this.value) ? null : this.strictMode ? this.trimValue(this.value) : this.value);
        this.wireEvents();
        if (this.value !== null && !isNaN(this.value)) {
          if (this.decimals) {
            this.setProperties({ value: this.roundNumber(this.value, this.decimals) }, true);
          }
        }
        if (this.element.getAttribute("value") || this.value) {
          this.element.setAttribute("value", this.element.value);
          this.hiddenInput.setAttribute("value", this.hiddenInput.value);
        }
        this.elementPrevValue = this.element.value;
        if (this.element.hasAttribute("data-val")) {
          this.element.setAttribute("data-val", "false");
        }
        if (!isNullOrUndefined(closest(this.element, "fieldset")) && closest(this.element, "fieldset").disabled) {
          this.enabled = false;
        }
        this.renderComplete();
      }
    };
    NumericTextBox2.prototype.checkAttributes = function(isDynamic) {
      var attributes2 = isDynamic ? isNullOrUndefined(this.htmlAttributes) ? [] : Object.keys(this.htmlAttributes) : ["value", "min", "max", "step", "disabled", "readonly", "style", "name", "placeholder"];
      for (var _i = 0, attributes_1 = attributes2; _i < attributes_1.length; _i++) {
        var prop = attributes_1[_i];
        if (!isNullOrUndefined(this.element.getAttribute(prop))) {
          switch (prop) {
            case "disabled":
              if (isNullOrUndefined(this.numericOptions) || this.numericOptions["enabled"] === void 0 || isDynamic) {
                var enabled = this.element.getAttribute(prop) === "disabled" || this.element.getAttribute(prop) === "" || this.element.getAttribute(prop) === "true" ? false : true;
                this.setProperties({ enabled }, !isDynamic);
              }
              break;
            case "readonly":
              if (isNullOrUndefined(this.numericOptions) || this.numericOptions["readonly"] === void 0 || isDynamic) {
                var readonly = this.element.getAttribute(prop) === "readonly" || this.element.getAttribute(prop) === "" || this.element.getAttribute(prop) === "true" ? true : false;
                this.setProperties({ readonly }, !isDynamic);
              }
              break;
            case "placeholder":
              if (isNullOrUndefined(this.numericOptions) || this.numericOptions["placeholder"] === void 0 || isDynamic) {
                this.setProperties({ placeholder: this.element.placeholder }, !isDynamic);
              }
              break;
            case "value":
              if (isNullOrUndefined(this.numericOptions) || this.numericOptions["value"] === void 0 || isDynamic) {
                var setNumber = this.instance.getNumberParser({ format: "n" })(this.element.getAttribute(prop));
                this.setProperties(setValue(prop, setNumber, {}), !isDynamic);
              }
              break;
            case "min":
              if (isNullOrUndefined(this.numericOptions) || this.numericOptions["min"] === void 0 || isDynamic) {
                var minValue = this.instance.getNumberParser({ format: "n" })(this.element.getAttribute(prop));
                if (minValue !== null && !isNaN(minValue)) {
                  this.setProperties(setValue(prop, minValue, {}), !isDynamic);
                }
              }
              break;
            case "max":
              if (isNullOrUndefined(this.numericOptions) || this.numericOptions["max"] === void 0 || isDynamic) {
                var maxValue = this.instance.getNumberParser({ format: "n" })(this.element.getAttribute(prop));
                if (maxValue !== null && !isNaN(maxValue)) {
                  this.setProperties(setValue(prop, maxValue, {}), !isDynamic);
                }
              }
              break;
            case "step":
              if (isNullOrUndefined(this.numericOptions) || this.numericOptions["step"] === void 0 || isDynamic) {
                var stepValue = this.instance.getNumberParser({ format: "n" })(this.element.getAttribute(prop));
                if (stepValue !== null && !isNaN(stepValue)) {
                  this.setProperties(setValue(prop, stepValue, {}), !isDynamic);
                }
              }
              break;
            case "style":
              this.inputStyle = this.element.getAttribute(prop);
              break;
            case "name":
              this.inputName = this.element.getAttribute(prop);
              break;
            default:
              {
                var value = this.instance.getNumberParser({ format: "n" })(this.element.getAttribute(prop));
                if (value !== null && !isNaN(value) || prop === "value") {
                  this.setProperties(setValue(prop, value, {}), true);
                }
              }
              break;
          }
        }
      }
    };
    NumericTextBox2.prototype.updatePlaceholder = function() {
      this.setProperties({ placeholder: this.l10n.getConstant("placeholder") }, true);
    };
    NumericTextBox2.prototype.initCultureFunc = function() {
      this.instance = new Internationalization(this.locale);
    };
    NumericTextBox2.prototype.initCultureInfo = function() {
      this.cultureInfo.format = this.format;
      if (getValue("currency", this) !== null) {
        setValue("currency", this.currency, this.cultureInfo);
        this.setProperties({ currencyCode: this.currency }, true);
      }
    };
    NumericTextBox2.prototype.createWrapper = function() {
      var updatedCssClassValue = this.cssClass;
      if (!isNullOrUndefined(this.cssClass) && this.cssClass !== "") {
        updatedCssClassValue = this.getNumericValidClassList(this.cssClass);
      }
      var inputObj = Input.createInput({
        element: this.element,
        floatLabelType: this.floatLabelType,
        properties: {
          readonly: this.readonly,
          placeholder: this.placeholder,
          cssClass: updatedCssClassValue,
          enableRtl: this.enableRtl,
          showClearButton: this.showClearButton,
          enabled: this.enabled
        }
      }, this.createElement);
      this.inputWrapper = inputObj;
      this.container = inputObj.container;
      this.container.setAttribute("class", ROOT + " " + this.container.getAttribute("class"));
      this.updateHTMLAttrToWrapper();
      if (this.readonly) {
        attributes(this.element, { "aria-readonly": "true" });
      }
      this.hiddenInput = this.createElement("input", { attrs: {
        type: "text",
        "validateHidden": "true",
        "aria-label": "hidden",
        "class": HIDDENELEMENT
      } });
      this.inputName = this.inputName !== null ? this.inputName : this.element.id;
      this.element.removeAttribute("name");
      if (this.isAngular && this.angularTagName === "EJS-NUMERICTEXTBOX" && this.cloneElement.id.length > 0) {
        attributes(this.hiddenInput, { "name": this.cloneElement.id });
      } else {
        attributes(this.hiddenInput, { "name": this.inputName });
      }
      this.container.insertBefore(this.hiddenInput, this.container.childNodes[1]);
      this.updateDataAttribute(false);
      if (this.inputStyle !== null) {
        attributes(this.container, { "style": this.inputStyle });
      }
    };
    NumericTextBox2.prototype.updateDataAttribute = function(isDynamic) {
      var attr = {};
      if (!isDynamic) {
        for (var a = 0; a < this.element.attributes.length; a++) {
          attr[this.element.attributes[a].name] = this.element.getAttribute(this.element.attributes[a].name);
        }
      } else {
        attr = this.htmlAttributes;
      }
      for (var _i = 0, _a = Object.keys(attr); _i < _a.length; _i++) {
        var key = _a[_i];
        if (key.indexOf("data") === 0) {
          this.hiddenInput.setAttribute(key, attr["" + key]);
        }
      }
    };
    NumericTextBox2.prototype.updateHTMLAttrToElement = function() {
      if (!isNullOrUndefined(this.htmlAttributes)) {
        for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
          var pro = _a[_i];
          if (wrapperAttributes.indexOf(pro) < 0) {
            this.element.setAttribute(pro, this.htmlAttributes["" + pro]);
          }
        }
      }
    };
    NumericTextBox2.prototype.updateCssClass = function(newClass, oldClass) {
      Input.setCssClass(this.getNumericValidClassList(newClass), [this.container], this.getNumericValidClassList(oldClass));
    };
    NumericTextBox2.prototype.getNumericValidClassList = function(numericClassName) {
      var result = numericClassName;
      if (!isNullOrUndefined(numericClassName) && numericClassName !== "") {
        result = numericClassName.replace(/\s+/g, " ").trim();
      }
      return result;
    };
    NumericTextBox2.prototype.updateHTMLAttrToWrapper = function() {
      if (!isNullOrUndefined(this.htmlAttributes)) {
        for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
          var pro = _a[_i];
          if (wrapperAttributes.indexOf(pro) > -1) {
            if (pro === "class") {
              var updatedClassValue = this.getNumericValidClassList(this.htmlAttributes["" + pro]);
              if (updatedClassValue !== "") {
                addClass([this.container], updatedClassValue.split(" "));
              }
            } else if (pro === "style") {
              var numericStyle = this.container.getAttribute(pro);
              numericStyle = !isNullOrUndefined(numericStyle) ? numericStyle + this.htmlAttributes["" + pro] : this.htmlAttributes["" + pro];
              this.container.setAttribute(pro, numericStyle);
            } else {
              this.container.setAttribute(pro, this.htmlAttributes["" + pro]);
            }
          }
        }
      }
    };
    NumericTextBox2.prototype.setElementWidth = function(width) {
      if (!isNullOrUndefined(width)) {
        if (typeof width === "number") {
          this.container.style.width = formatUnit(width);
        } else if (typeof width === "string") {
          this.container.style.width = width.match(/px|%|em/) ? width : formatUnit(width);
        }
      }
    };
    NumericTextBox2.prototype.spinBtnCreation = function() {
      this.spinDown = Input.appendSpan(SPINICON + " " + SPINDOWN, this.container, this.createElement);
      attributes(this.spinDown, {
        "title": this.l10n.getConstant("decrementTitle")
      });
      this.spinUp = Input.appendSpan(SPINICON + " " + SPINUP, this.container, this.createElement);
      attributes(this.spinUp, {
        "title": this.l10n.getConstant("incrementTitle")
      });
      this.wireSpinBtnEvents();
    };
    NumericTextBox2.prototype.validateMinMax = function() {
      if (!(typeof this.min === "number" && !isNaN(this.min))) {
        this.setProperties({ min: -Number.MAX_VALUE }, true);
      }
      if (!(typeof this.max === "number" && !isNaN(this.max))) {
        this.setProperties({ max: Number.MAX_VALUE }, true);
      }
      if (this.decimals !== null) {
        if (this.min !== -Number.MAX_VALUE) {
          this.setProperties({ min: this.instance.getNumberParser({ format: "n" })(this.formattedValue(this.decimals, this.min)) }, true);
        }
        if (this.max !== Number.MAX_VALUE) {
          this.setProperties({ max: this.instance.getNumberParser({ format: "n" })(this.formattedValue(this.decimals, this.max)) }, true);
        }
      }
      this.setProperties({ min: this.min > this.max ? this.max : this.min }, true);
      if (this.min !== -Number.MAX_VALUE) {
        attributes(this.element, { "aria-valuemin": this.min.toString() });
      }
      if (this.max !== Number.MAX_VALUE) {
        attributes(this.element, { "aria-valuemax": this.max.toString() });
      }
    };
    NumericTextBox2.prototype.formattedValue = function(decimals, value) {
      return this.instance.getNumberFormat({
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
        useGrouping: false
      })(value);
    };
    NumericTextBox2.prototype.validateStep = function() {
      if (this.decimals !== null) {
        this.setProperties({ step: this.instance.getNumberParser({ format: "n" })(this.formattedValue(this.decimals, this.step)) }, true);
      }
    };
    NumericTextBox2.prototype.action = function(operation, event) {
      this.isInteract = true;
      var value = this.isFocused ? this.instance.getNumberParser({ format: "n" })(this.element.value) : this.value;
      this.changeValue(this.performAction(value, this.step, operation));
      this.raiseChangeEvent(event);
    };
    NumericTextBox2.prototype.checkErrorClass = function() {
      if (this.isValidState) {
        removeClass([this.container], ERROR);
      } else {
        addClass([this.container], ERROR);
      }
      attributes(this.element, { "aria-invalid": this.isValidState ? "false" : "true" });
    };
    NumericTextBox2.prototype.bindClearEvent = function() {
      if (this.showClearButton) {
        EventHandler.add(this.inputWrapper.clearButton, "mousedown touchstart", this.resetHandler, this);
      }
    };
    NumericTextBox2.prototype.resetHandler = function(e) {
      e.preventDefault();
      if (!this.inputWrapper.clearButton.classList.contains("e-clear-icon-hide") || this.inputWrapper.container.classList.contains("e-static-clear")) {
        this.clear(e);
      }
      this.isInteract = true;
      this.raiseChangeEvent(e);
    };
    NumericTextBox2.prototype.clear = function(event) {
      this.setProperties({ value: null }, true);
      this.setElementValue("");
      this.hiddenInput.value = "";
      var formElement = closest(this.element, "form");
      if (formElement) {
        var element2 = this.element.nextElementSibling;
        var keyupEvent = document.createEvent("KeyboardEvent");
        keyupEvent.initEvent("keyup", false, true);
        element2.dispatchEvent(keyupEvent);
      }
    };
    NumericTextBox2.prototype.resetFormHandler = function() {
      if (this.element.tagName === "EJS-NUMERICTEXTBOX") {
        this.updateValue(null);
      } else {
        this.updateValue(this.inputEleValue);
      }
    };
    NumericTextBox2.prototype.setSpinButton = function() {
      if (!isNullOrUndefined(this.spinDown)) {
        attributes(this.spinDown, {
          "title": this.l10n.getConstant("decrementTitle"),
          "aria-label": this.l10n.getConstant("decrementTitle")
        });
      }
      if (!isNullOrUndefined(this.spinUp)) {
        attributes(this.spinUp, {
          "title": this.l10n.getConstant("incrementTitle"),
          "aria-label": this.l10n.getConstant("incrementTitle")
        });
      }
    };
    NumericTextBox2.prototype.wireEvents = function() {
      EventHandler.add(this.element, "focus", this.focusHandler, this);
      EventHandler.add(this.element, "blur", this.focusOutHandler, this);
      EventHandler.add(this.element, "keydown", this.keyDownHandler, this);
      EventHandler.add(this.element, "keyup", this.keyUpHandler, this);
      EventHandler.add(this.element, "input", this.inputHandler, this);
      EventHandler.add(this.element, "keypress", this.keyPressHandler, this);
      EventHandler.add(this.element, "change", this.changeHandler, this);
      EventHandler.add(this.element, "paste", this.pasteHandler, this);
      if (this.enabled) {
        this.bindClearEvent();
        if (this.formEle) {
          EventHandler.add(this.formEle, "reset", this.resetFormHandler, this);
        }
      }
    };
    NumericTextBox2.prototype.wireSpinBtnEvents = function() {
      EventHandler.add(this.spinUp, Browser.touchStartEvent, this.mouseDownOnSpinner, this);
      EventHandler.add(this.spinDown, Browser.touchStartEvent, this.mouseDownOnSpinner, this);
      EventHandler.add(this.spinUp, Browser.touchEndEvent, this.mouseUpOnSpinner, this);
      EventHandler.add(this.spinDown, Browser.touchEndEvent, this.mouseUpOnSpinner, this);
      EventHandler.add(this.spinUp, Browser.touchMoveEvent, this.touchMoveOnSpinner, this);
      EventHandler.add(this.spinDown, Browser.touchMoveEvent, this.touchMoveOnSpinner, this);
    };
    NumericTextBox2.prototype.unwireEvents = function() {
      EventHandler.remove(this.element, "focus", this.focusHandler);
      EventHandler.remove(this.element, "blur", this.focusOutHandler);
      EventHandler.remove(this.element, "keyup", this.keyUpHandler);
      EventHandler.remove(this.element, "input", this.inputHandler);
      EventHandler.remove(this.element, "keydown", this.keyDownHandler);
      EventHandler.remove(this.element, "keypress", this.keyPressHandler);
      EventHandler.remove(this.element, "change", this.changeHandler);
      EventHandler.remove(this.element, "paste", this.pasteHandler);
      if (this.formEle) {
        EventHandler.remove(this.formEle, "reset", this.resetFormHandler);
      }
    };
    NumericTextBox2.prototype.unwireSpinBtnEvents = function() {
      EventHandler.remove(this.spinUp, Browser.touchStartEvent, this.mouseDownOnSpinner);
      EventHandler.remove(this.spinDown, Browser.touchStartEvent, this.mouseDownOnSpinner);
      EventHandler.remove(this.spinUp, Browser.touchEndEvent, this.mouseUpOnSpinner);
      EventHandler.remove(this.spinDown, Browser.touchEndEvent, this.mouseUpOnSpinner);
      EventHandler.remove(this.spinUp, Browser.touchMoveEvent, this.touchMoveOnSpinner);
      EventHandler.remove(this.spinDown, Browser.touchMoveEvent, this.touchMoveOnSpinner);
    };
    NumericTextBox2.prototype.changeHandler = function(event) {
      event.stopPropagation();
      if (!this.element.value.length) {
        this.setProperties({ value: null }, true);
      }
      var parsedInput = this.instance.getNumberParser({ format: "n" })(this.element.value);
      this.updateValue(parsedInput, event);
    };
    NumericTextBox2.prototype.raiseChangeEvent = function(event) {
      this.inputValue = isNullOrUndefined(this.inputValue) || isNaN(this.inputValue) ? null : this.inputValue;
      if (this.prevValue !== this.value || this.prevValue !== this.inputValue) {
        var eventArgs = {};
        this.changeEventArgs = {
          value: this.value,
          previousValue: this.prevValue,
          isInteracted: this.isInteract,
          isInteraction: this.isInteract,
          event
        };
        if (event) {
          this.changeEventArgs.event = event;
        }
        if (this.changeEventArgs.event === void 0) {
          this.changeEventArgs.isInteracted = false;
          this.changeEventArgs.isInteraction = false;
        }
        merge(eventArgs, this.changeEventArgs);
        this.prevValue = this.value;
        this.isInteract = false;
        this.elementPrevValue = this.element.value;
        this.preventChange = false;
        this.trigger("change", eventArgs);
      }
    };
    NumericTextBox2.prototype.pasteHandler = function() {
      var _this = this;
      if (!this.enabled || this.readonly) {
        return;
      }
      var beforeUpdate = this.element.value;
      setTimeout(function() {
        if (!_this.numericRegex().test(_this.element.value)) {
          _this.setElementValue(beforeUpdate);
        }
      });
    };
    NumericTextBox2.prototype.preventHandler = function() {
      var _this = this;
      var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
      setTimeout(function() {
        if (_this.element.selectionStart > 0) {
          var currentPos = _this.element.selectionStart;
          var prevPos = _this.element.selectionStart - 1;
          var start = 0;
          var valArray = _this.element.value.split("");
          var numericObject = getNumericObject(_this.locale);
          var decimalSeparator = getValue("decimal", numericObject);
          var ignoreKeyCode = decimalSeparator.charCodeAt(0);
          if (_this.element.value[prevPos] === " " && _this.element.selectionStart > 0 && !iOS) {
            if (isNullOrUndefined(_this.prevVal)) {
              _this.element.value = _this.element.value.trim();
            } else if (prevPos !== 0) {
              _this.element.value = _this.prevVal;
            } else if (prevPos === 0) {
              _this.element.value = _this.element.value.trim();
            }
            _this.element.setSelectionRange(prevPos, prevPos);
          } else if (isNaN(parseFloat(_this.element.value[_this.element.selectionStart - 1])) && _this.element.value[_this.element.selectionStart - 1].charCodeAt(0) !== 45) {
            if (valArray.indexOf(_this.element.value[_this.element.selectionStart - 1]) !== valArray.lastIndexOf(_this.element.value[_this.element.selectionStart - 1]) && _this.element.value[_this.element.selectionStart - 1].charCodeAt(0) === ignoreKeyCode || _this.element.value[_this.element.selectionStart - 1].charCodeAt(0) !== ignoreKeyCode) {
              _this.element.value = _this.element.value.substring(0, prevPos) + _this.element.value.substring(currentPos, _this.element.value.length);
              _this.element.setSelectionRange(prevPos, prevPos);
              if (isNaN(parseFloat(_this.element.value[_this.element.selectionStart - 1])) && _this.element.selectionStart > 0 && _this.element.value.length) {
                _this.preventHandler();
              }
            }
          } else if (isNaN(parseFloat(_this.element.value[_this.element.selectionStart - 2])) && _this.element.selectionStart > 1 && _this.element.value[_this.element.selectionStart - 2].charCodeAt(0) !== 45) {
            if (valArray.indexOf(_this.element.value[_this.element.selectionStart - 2]) !== valArray.lastIndexOf(_this.element.value[_this.element.selectionStart - 2]) && _this.element.value[_this.element.selectionStart - 2].charCodeAt(0) === ignoreKeyCode || _this.element.value[_this.element.selectionStart - 2].charCodeAt(0) !== ignoreKeyCode) {
              _this.element.setSelectionRange(prevPos, prevPos);
              _this.nextEle = _this.element.value[_this.element.selectionStart];
              _this.cursorPosChanged = true;
              _this.preventHandler();
            }
          }
          if (_this.cursorPosChanged === true && _this.element.value[_this.element.selectionStart] === _this.nextEle && isNaN(parseFloat(_this.element.value[_this.element.selectionStart - 1]))) {
            _this.element.setSelectionRange(_this.element.selectionStart + 1, _this.element.selectionStart + 1);
            _this.cursorPosChanged = false;
            _this.nextEle = null;
          }
          if (_this.element.value.trim() === "") {
            _this.element.setSelectionRange(start, start);
          }
          if (_this.element.selectionStart > 0) {
            if (_this.element.value[_this.element.selectionStart - 1].charCodeAt(0) === 45 && _this.element.selectionStart > 1) {
              if (isNullOrUndefined(_this.prevVal)) {
                _this.element.value = _this.element.value;
              } else {
                _this.element.value = _this.prevVal;
              }
              _this.element.setSelectionRange(_this.element.selectionStart, _this.element.selectionStart);
            }
            if (_this.element.value[_this.element.selectionStart - 1] === decimalSeparator && _this.decimals === 0 && _this.validateDecimalOnType) {
              _this.element.value = _this.element.value.substring(0, prevPos) + _this.element.value.substring(currentPos, _this.element.value.length);
            }
          }
          _this.prevVal = _this.element.value;
        }
      });
    };
    NumericTextBox2.prototype.keyUpHandler = function() {
      if (!this.enabled || this.readonly) {
        return;
      }
      var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
      if (!iOS && Browser.isDevice) {
        this.preventHandler();
      }
      var parseValue = this.instance.getNumberParser({ format: "n" })(this.element.value);
      parseValue = parseValue === null || isNaN(parseValue) ? null : parseValue;
      this.hiddenInput.value = parseValue || parseValue === 0 ? parseValue.toString() : null;
      var formElement = closest(this.element, "form");
      if (formElement) {
        var element2 = this.element.nextElementSibling;
        var keyupEvent = document.createEvent("KeyboardEvent");
        keyupEvent.initEvent("keyup", false, true);
        element2.dispatchEvent(keyupEvent);
      }
    };
    NumericTextBox2.prototype.inputHandler = function(event) {
      var numerictextboxObj = this;
      if (!this.enabled || this.readonly) {
        return;
      }
      var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
      var fireFox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
      if ((fireFox || iOS) && Browser.isDevice) {
        this.preventHandler();
      }
      if (this.isAngular && this.element.value !== getValue("decimal", getNumericObject(this.locale)) && this.element.value !== getValue("minusSign", getNumericObject(this.locale))) {
        var parsedValue = this.instance.getNumberParser({ format: "n" })(this.element.value);
        parsedValue = isNaN(parsedValue) ? null : parsedValue;
        numerictextboxObj.localChange({ value: parsedValue });
        this.preventChange = true;
      }
      if (this.isVue) {
        var current = this.instance.getNumberParser({ format: "n" })(this.element.value);
        var previous = this.instance.getNumberParser({ format: "n" })(this.elementPrevValue);
        var nonZeroRegex = new RegExp("[^0-9]+$");
        if (nonZeroRegex.test(this.element.value) || (this.elementPrevValue.indexOf(".") !== -1 || this.elementPrevValue.indexOf("-") !== -1) && this.element.value[this.element.value.length - 1] === "0") {
          current = this.value;
        }
        var eventArgs = {
          event,
          value: current === null || isNaN(current) ? null : current,
          previousValue: previous === null || isNaN(previous) ? null : previous
        };
        this.preventChange = true;
        this.elementPrevValue = this.element.value;
        this.trigger("input", eventArgs);
      }
    };
    NumericTextBox2.prototype.keyDownHandler = function(event) {
      if (!this.readonly) {
        switch (event.keyCode) {
          case 38:
            event.preventDefault();
            this.action(INCREMENT, event);
            break;
          case 40:
            event.preventDefault();
            this.action(DECREMENT, event);
            break;
          default:
            break;
        }
      }
    };
    NumericTextBox2.prototype.performAction = function(value, step, operation) {
      if (value === null || isNaN(value)) {
        value = 0;
      }
      var updatedValue = operation === INCREMENT ? value + step : value - step;
      updatedValue = this.correctRounding(value, step, updatedValue);
      return this.strictMode ? this.trimValue(updatedValue) : updatedValue;
    };
    NumericTextBox2.prototype.correctRounding = function(value, step, result) {
      var floatExp = new RegExp("[,.](.*)");
      var floatValue = floatExp.test(value.toString());
      var floatStep = floatExp.test(step.toString());
      if (floatValue || floatStep) {
        var valueCount = floatValue ? floatExp.exec(value.toString())[0].length : 0;
        var stepCount = floatStep ? floatExp.exec(step.toString())[0].length : 0;
        var max = Math.max(valueCount, stepCount);
        return value = this.roundValue(result, max);
      }
      return result;
    };
    NumericTextBox2.prototype.roundValue = function(result, precision) {
      precision = precision || 0;
      var divide = Math.pow(10, precision);
      return result *= divide, result = Math.round(result) / divide;
    };
    NumericTextBox2.prototype.updateValue = function(value, event) {
      if (event) {
        this.isInteract = true;
      }
      if (value !== null && !isNaN(value)) {
        if (this.decimals) {
          value = this.roundNumber(value, this.decimals);
        }
      }
      this.inputValue = value;
      this.changeValue(value === null || isNaN(value) ? null : this.strictMode ? this.trimValue(value) : value);
      if (!this.isDynamicChange) {
        this.raiseChangeEvent(event);
      }
    };
    NumericTextBox2.prototype.updateCurrency = function(prop, propVal) {
      setValue(prop, propVal, this.cultureInfo);
      this.updateValue(this.value);
    };
    NumericTextBox2.prototype.changeValue = function(value) {
      if (!(value || value === 0)) {
        value = null;
        this.setProperties({ value }, true);
      } else {
        var numberOfDecimals = this.getNumberOfDecimals(value);
        this.setProperties({ value: this.roundNumber(value, numberOfDecimals) }, true);
      }
      this.modifyText();
      if (!this.strictMode) {
        this.validateState();
      }
    };
    NumericTextBox2.prototype.modifyText = function() {
      if (this.value || this.value === 0) {
        var value = this.formatNumber();
        var elementValue = this.isFocused ? value : this.instance.getNumberFormat(this.cultureInfo)(this.value);
        this.setElementValue(elementValue);
        attributes(this.element, { "aria-valuenow": value });
        this.hiddenInput.value = this.value.toString();
        if (this.value !== null && this.serverDecimalSeparator) {
          this.hiddenInput.value = this.hiddenInput.value.replace(".", this.serverDecimalSeparator);
        }
      } else {
        this.setElementValue("");
        this.element.removeAttribute("aria-valuenow");
        this.hiddenInput.value = null;
      }
    };
    NumericTextBox2.prototype.setElementValue = function(val, element2) {
      Input.setValue(val, element2 ? element2 : this.element, this.floatLabelType, this.showClearButton);
    };
    NumericTextBox2.prototype.validateState = function() {
      this.isValidState = true;
      if (this.value || this.value === 0) {
        this.isValidState = !(this.value > this.max || this.value < this.min);
      }
      this.checkErrorClass();
    };
    NumericTextBox2.prototype.getNumberOfDecimals = function(value) {
      var numberOfDecimals;
      var EXPREGEXP = new RegExp("[eE][-+]?([0-9]+)");
      var valueString = value.toString();
      if (EXPREGEXP.test(valueString)) {
        var result = EXPREGEXP.exec(valueString);
        if (!isNullOrUndefined(result)) {
          valueString = value.toFixed(Math.min(parseInt(result[1], 10), 20));
        }
      }
      var decimalPart = valueString.split(".")[1];
      numberOfDecimals = !decimalPart || !decimalPart.length ? 0 : decimalPart.length;
      if (this.decimals !== null) {
        numberOfDecimals = numberOfDecimals < this.decimals ? numberOfDecimals : this.decimals;
      }
      return numberOfDecimals;
    };
    NumericTextBox2.prototype.formatNumber = function() {
      var numberOfDecimals = this.getNumberOfDecimals(this.value);
      return this.instance.getNumberFormat({
        maximumFractionDigits: numberOfDecimals,
        minimumFractionDigits: numberOfDecimals,
        useGrouping: false
      })(this.value);
    };
    NumericTextBox2.prototype.trimValue = function(value) {
      if (value > this.max) {
        return this.max;
      }
      if (value < this.min) {
        return this.min;
      }
      return value;
    };
    NumericTextBox2.prototype.roundNumber = function(value, precision) {
      var result = value;
      var decimals = precision || 0;
      var result1 = result.toString().split("e");
      result = Math.round(Number(result1[0] + "e" + (result1[1] ? Number(result1[1]) + decimals : decimals)));
      var result2 = result.toString().split("e");
      result = Number(result2[0] + "e" + (result2[1] ? Number(result2[1]) - decimals : -decimals));
      return Number(result.toFixed(decimals));
    };
    NumericTextBox2.prototype.cancelEvent = function(event) {
      event.preventDefault();
      return false;
    };
    NumericTextBox2.prototype.keyPressHandler = function(event) {
      if (!this.enabled || this.readonly) {
        return true;
      }
      if (!Browser.isDevice && Browser.info.version === "11.0" && event.keyCode === 13) {
        var parsedInput = this.instance.getNumberParser({ format: "n" })(this.element.value);
        this.updateValue(parsedInput, event);
        return true;
      }
      if (event.which === 0 || event.metaKey || event.ctrlKey || event.keyCode === 8 || event.keyCode === 13) {
        return true;
      }
      var currentChar = String.fromCharCode(event.which);
      var decimalSeparator = getValue("decimal", getNumericObject(this.locale));
      var isAlterNumPadDecimalChar = event.code === "NumpadDecimal" && currentChar !== decimalSeparator;
      if (isAlterNumPadDecimalChar) {
        currentChar = decimalSeparator;
      }
      var text = this.element.value;
      text = text.substring(0, this.element.selectionStart) + currentChar + text.substring(this.element.selectionEnd);
      if (!this.numericRegex().test(text)) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      } else {
        if (isAlterNumPadDecimalChar) {
          var start = this.element.selectionStart + 1;
          this.element.value = text;
          this.element.setSelectionRange(start, start);
          event.preventDefault();
          event.stopPropagation();
        }
        return true;
      }
    };
    NumericTextBox2.prototype.numericRegex = function() {
      var numericObject = getNumericObject(this.locale);
      var decimalSeparator = getValue("decimal", numericObject);
      var fractionRule = "*";
      if (decimalSeparator === DECIMALSEPARATOR) {
        decimalSeparator = "\\" + decimalSeparator;
      }
      if (this.decimals === 0 && this.validateDecimalOnType) {
        return INTREGEXP;
      }
      if (this.decimals && this.validateDecimalOnType) {
        fractionRule = "{0," + this.decimals + "}";
      }
      return new RegExp("^(-)?(((\\d+(" + decimalSeparator + "\\d" + fractionRule + ")?)|(" + decimalSeparator + "\\d" + fractionRule + ")))?$");
    };
    NumericTextBox2.prototype.mouseWheel = function(event) {
      event.preventDefault();
      var delta;
      var rawEvent = event;
      if (rawEvent.wheelDelta) {
        delta = rawEvent.wheelDelta / 120;
      } else if (rawEvent.detail) {
        delta = -rawEvent.detail / 3;
      }
      if (delta > 0) {
        this.action(INCREMENT, event);
      } else if (delta < 0) {
        this.action(DECREMENT, event);
      }
      this.cancelEvent(event);
    };
    NumericTextBox2.prototype.focusHandler = function(event) {
      var _this = this;
      clearTimeout(selectionTimeOut);
      this.focusEventArgs = { event, value: this.value, container: this.container };
      this.trigger("focus", this.focusEventArgs);
      if (!this.enabled || this.readonly) {
        return;
      }
      this.isFocused = true;
      removeClass([this.container], ERROR);
      this.prevValue = this.value;
      if (this.value || this.value === 0) {
        var formatValue_1 = this.formatNumber();
        this.setElementValue(formatValue_1);
        if (!this.isPrevFocused) {
          if (!Browser.isDevice && Browser.info.version === "11.0") {
            this.element.setSelectionRange(0, formatValue_1.length);
          } else {
            var delay = Browser.isDevice && Browser.isIos ? 600 : 0;
            selectionTimeOut = setTimeout(function() {
              _this.element.setSelectionRange(0, formatValue_1.length);
            }, delay);
          }
        }
      }
      if (!Browser.isDevice) {
        EventHandler.add(this.element, "mousewheel DOMMouseScroll", this.mouseWheel, this);
      }
    };
    NumericTextBox2.prototype.focusOutHandler = function(event) {
      var _this = this;
      this.blurEventArgs = { event, value: this.value, container: this.container };
      this.trigger("blur", this.blurEventArgs);
      if (!this.enabled || this.readonly) {
        return;
      }
      if (this.isPrevFocused) {
        event.preventDefault();
        if (Browser.isDevice) {
          var value_1 = this.element.value;
          this.element.focus();
          this.isPrevFocused = false;
          var ele_1 = this.element;
          setTimeout(function() {
            _this.setElementValue(value_1, ele_1);
          }, 200);
        }
      } else {
        this.isFocused = false;
        if (!this.element.value.length) {
          this.setProperties({ value: null }, true);
        }
        var parsedInput = this.instance.getNumberParser({ format: "n" })(this.element.value);
        this.updateValue(parsedInput);
        if (!Browser.isDevice) {
          EventHandler.remove(this.element, "mousewheel DOMMouseScroll", this.mouseWheel);
        }
      }
      var formElement = closest(this.element, "form");
      if (formElement) {
        var element2 = this.element.nextElementSibling;
        var focusEvent = document.createEvent("FocusEvent");
        focusEvent.initEvent("focusout", false, true);
        element2.dispatchEvent(focusEvent);
      }
    };
    NumericTextBox2.prototype.mouseDownOnSpinner = function(event) {
      var _this = this;
      if (this.isFocused) {
        this.isPrevFocused = true;
        event.preventDefault();
      }
      if (!this.getElementData(event)) {
        return;
      }
      var result = this.getElementData(event);
      var target = event.currentTarget;
      var action = target.classList.contains(SPINUP) ? INCREMENT : DECREMENT;
      EventHandler.add(target, "mouseleave", this.mouseUpClick, this);
      this.timeOut = setInterval(function() {
        _this.isCalled = true;
        _this.action(action, event);
      }, 150);
      EventHandler.add(document, "mouseup", this.mouseUpClick, this);
    };
    NumericTextBox2.prototype.touchMoveOnSpinner = function(event) {
      var target;
      if (event.type === "touchmove") {
        var touchEvent = event.touches;
        target = touchEvent.length && document.elementFromPoint(touchEvent[0].pageX, touchEvent[0].pageY);
      } else {
        target = document.elementFromPoint(event.clientX, event.clientY);
      }
      if (!target.classList.contains(SPINICON)) {
        clearInterval(this.timeOut);
      }
    };
    NumericTextBox2.prototype.mouseUpOnSpinner = function(event) {
      this.prevValue = this.value;
      if (this.isPrevFocused) {
        this.element.focus();
        if (!Browser.isDevice) {
          this.isPrevFocused = false;
        }
      }
      if (!Browser.isDevice) {
        event.preventDefault();
      }
      if (!this.getElementData(event)) {
        return;
      }
      var target = event.currentTarget;
      var action = target.classList.contains(SPINUP) ? INCREMENT : DECREMENT;
      EventHandler.remove(target, "mouseleave", this.mouseUpClick);
      if (!this.isCalled) {
        this.action(action, event);
      }
      this.isCalled = false;
      EventHandler.remove(document, "mouseup", this.mouseUpClick);
      var formElement = closest(this.element, "form");
      if (formElement) {
        var element2 = this.element.nextElementSibling;
        var keyupEvent = document.createEvent("KeyboardEvent");
        keyupEvent.initEvent("keyup", false, true);
        element2.dispatchEvent(keyupEvent);
      }
    };
    NumericTextBox2.prototype.getElementData = function(event) {
      if (event.which && event.which === 3 || event.button && event.button === 2 || !this.enabled || this.readonly) {
        return false;
      }
      clearInterval(this.timeOut);
      return true;
    };
    NumericTextBox2.prototype.floatLabelTypeUpdate = function() {
      Input.removeFloating(this.inputWrapper);
      var hiddenInput = this.hiddenInput;
      this.hiddenInput.remove();
      Input.addFloating(this.element, this.floatLabelType, this.placeholder, this.createElement);
      this.container.insertBefore(hiddenInput, this.container.childNodes[1]);
    };
    NumericTextBox2.prototype.mouseUpClick = function(event) {
      event.stopPropagation();
      clearInterval(this.timeOut);
      this.isCalled = false;
      if (this.spinUp) {
        EventHandler.remove(this.spinUp, "mouseleave", this.mouseUpClick);
      }
      if (this.spinDown) {
        EventHandler.remove(this.spinDown, "mouseleave", this.mouseUpClick);
      }
    };
    NumericTextBox2.prototype.increment = function(step) {
      if (step === void 0) {
        step = this.step;
      }
      this.isInteract = false;
      this.changeValue(this.performAction(this.value, step, INCREMENT));
      this.raiseChangeEvent();
    };
    NumericTextBox2.prototype.decrement = function(step) {
      if (step === void 0) {
        step = this.step;
      }
      this.isInteract = false;
      this.changeValue(this.performAction(this.value, step, DECREMENT));
      this.raiseChangeEvent();
    };
    NumericTextBox2.prototype.destroy = function() {
      this.unwireEvents();
      detach(this.hiddenInput);
      if (this.showSpinButton) {
        this.unwireSpinBtnEvents();
        detach(this.spinUp);
        detach(this.spinDown);
      }
      var attrArray = [
        "aria-labelledby",
        "role",
        "autocomplete",
        "aria-readonly",
        "aria-disabled",
        "autocapitalize",
        "spellcheck",
        "aria-autocomplete",
        "tabindex",
        "aria-valuemin",
        "aria-valuemax",
        "aria-valuenow",
        "aria-invalid"
      ];
      for (var i = 0; i < attrArray.length; i++) {
        this.element.removeAttribute(attrArray[i]);
      }
      this.element.classList.remove("e-input");
      this.container.insertAdjacentElement("afterend", this.element);
      detach(this.container);
      this.spinUp = null;
      this.spinDown = null;
      this.container = null;
      this.hiddenInput = null;
      this.changeEventArgs = null;
      this.blurEventArgs = null;
      this.focusEventArgs = null;
      this.inputWrapper = null;
      Input.destroy();
      _super.prototype.destroy.call(this);
    };
    NumericTextBox2.prototype.getText = function() {
      return this.element.value;
    };
    NumericTextBox2.prototype.focusIn = function() {
      if (document.activeElement !== this.element && this.enabled) {
        this.element.focus();
        addClass([this.container], [NUMERIC_FOCUS]);
      }
    };
    NumericTextBox2.prototype.focusOut = function() {
      if (document.activeElement === this.element && this.enabled) {
        this.element.blur();
        removeClass([this.container], [NUMERIC_FOCUS]);
      }
    };
    NumericTextBox2.prototype.getPersistData = function() {
      var keyEntity = ["value"];
      return this.addOnPersist(keyEntity);
    };
    NumericTextBox2.prototype.onPropertyChanged = function(newProp, oldProp) {
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "width":
            this.setElementWidth(newProp.width);
            Input.calculateWidth(this.element, this.container);
            break;
          case "cssClass":
            this.updateCssClass(newProp.cssClass, oldProp.cssClass);
            break;
          case "enabled":
            Input.setEnabled(newProp.enabled, this.element);
            this.bindClearEvent();
            break;
          case "enableRtl":
            Input.setEnableRtl(newProp.enableRtl, [this.container]);
            break;
          case "readonly":
            Input.setReadonly(newProp.readonly, this.element);
            if (this.readonly) {
              attributes(this.element, { "aria-readonly": "true" });
            } else {
              this.element.removeAttribute("aria-readonly");
            }
            break;
          case "htmlAttributes":
            this.updateHTMLAttrToElement();
            this.updateHTMLAttrToWrapper();
            this.updateDataAttribute(true);
            this.checkAttributes(true);
            Input.validateInputType(this.container, this.element);
            break;
          case "placeholder":
            Input.setPlaceholder(newProp.placeholder, this.element);
            Input.calculateWidth(this.element, this.container);
            break;
          case "step":
            this.step = newProp.step;
            this.validateStep();
            break;
          case "showSpinButton":
            this.updateSpinButton(newProp);
            break;
          case "showClearButton":
            this.updateClearButton(newProp);
            break;
          case "floatLabelType":
            this.floatLabelType = newProp.floatLabelType;
            this.floatLabelTypeUpdate();
            break;
          case "value":
            this.isDynamicChange = (this.isAngular || this.isVue) && this.preventChange;
            this.updateValue(newProp.value);
            if (this.isDynamicChange) {
              this.preventChange = false;
              this.isDynamicChange = false;
            }
            break;
          case "min":
          case "max":
            setValue(prop, getValue(prop, newProp), this);
            this.validateMinMax();
            this.updateValue(this.value);
            break;
          case "strictMode":
            this.strictMode = newProp.strictMode;
            this.updateValue(this.value);
            this.validateState();
            break;
          case "locale":
            this.initCultureFunc();
            this.l10n.setLocale(this.locale);
            this.setSpinButton();
            this.updatePlaceholder();
            Input.setPlaceholder(this.placeholder, this.element);
            this.updateValue(this.value);
            break;
          case "currency":
            {
              var propVal = getValue(prop, newProp);
              this.setProperties({ currencyCode: propVal }, true);
              this.updateCurrency(prop, propVal);
            }
            break;
          case "currencyCode":
            {
              var propValue = getValue(prop, newProp);
              this.setProperties({ currency: propValue }, true);
              this.updateCurrency("currency", propValue);
            }
            break;
          case "format":
            setValue(prop, getValue(prop, newProp), this);
            this.initCultureInfo();
            this.updateValue(this.value);
            break;
          case "decimals":
            this.decimals = newProp.decimals;
            this.updateValue(this.value);
        }
      }
    };
    NumericTextBox2.prototype.updateClearButton = function(newProp) {
      Input.setClearButton(newProp.showClearButton, this.element, this.inputWrapper, void 0, this.createElement);
      this.bindClearEvent();
    };
    NumericTextBox2.prototype.updateSpinButton = function(newProp) {
      if (newProp.showSpinButton) {
        this.spinBtnCreation();
      } else {
        detach(this.spinUp);
        detach(this.spinDown);
      }
    };
    NumericTextBox2.prototype.getModuleName = function() {
      return "numerictextbox";
    };
    __decorate([
      Property("")
    ], NumericTextBox2.prototype, "cssClass", void 0);
    __decorate([
      Property(null)
    ], NumericTextBox2.prototype, "value", void 0);
    __decorate([
      Property(-Number.MAX_VALUE)
    ], NumericTextBox2.prototype, "min", void 0);
    __decorate([
      Property(Number.MAX_VALUE)
    ], NumericTextBox2.prototype, "max", void 0);
    __decorate([
      Property(1)
    ], NumericTextBox2.prototype, "step", void 0);
    __decorate([
      Property(null)
    ], NumericTextBox2.prototype, "width", void 0);
    __decorate([
      Property(null)
    ], NumericTextBox2.prototype, "placeholder", void 0);
    __decorate([
      Property({})
    ], NumericTextBox2.prototype, "htmlAttributes", void 0);
    __decorate([
      Property(true)
    ], NumericTextBox2.prototype, "showSpinButton", void 0);
    __decorate([
      Property(false)
    ], NumericTextBox2.prototype, "readonly", void 0);
    __decorate([
      Property(true)
    ], NumericTextBox2.prototype, "enabled", void 0);
    __decorate([
      Property(false)
    ], NumericTextBox2.prototype, "showClearButton", void 0);
    __decorate([
      Property(false)
    ], NumericTextBox2.prototype, "enablePersistence", void 0);
    __decorate([
      Property("n2")
    ], NumericTextBox2.prototype, "format", void 0);
    __decorate([
      Property(null)
    ], NumericTextBox2.prototype, "decimals", void 0);
    __decorate([
      Property(null)
    ], NumericTextBox2.prototype, "currency", void 0);
    __decorate([
      Property(null)
    ], NumericTextBox2.prototype, "currencyCode", void 0);
    __decorate([
      Property(true)
    ], NumericTextBox2.prototype, "strictMode", void 0);
    __decorate([
      Property(false)
    ], NumericTextBox2.prototype, "validateDecimalOnType", void 0);
    __decorate([
      Property("Never")
    ], NumericTextBox2.prototype, "floatLabelType", void 0);
    __decorate([
      Event()
    ], NumericTextBox2.prototype, "created", void 0);
    __decorate([
      Event()
    ], NumericTextBox2.prototype, "destroyed", void 0);
    __decorate([
      Event()
    ], NumericTextBox2.prototype, "change", void 0);
    __decorate([
      Event()
    ], NumericTextBox2.prototype, "focus", void 0);
    __decorate([
      Event()
    ], NumericTextBox2.prototype, "blur", void 0);
    NumericTextBox2 = __decorate([
      NotifyPropertyChanges
    ], NumericTextBox2);
    return NumericTextBox2;
  }(Component)
);

// node_modules/@syncfusion/ej2-inputs/src/maskedtextbox/base/mask-base.js
var ERROR2 = "e-error";
var INPUTGROUP = "e-input-group";
var FLOATINPUT = "e-float-input";
var UTILMASK = "e-utility-mask";
var TOPLABEL = "e-label-top";
var BOTTOMLABEL = "e-label-bottom";
var regularExpressions = {
  "0": "[0-9]",
  "9": "[0-9 ]",
  "#": "[0-9 +-]",
  "L": "[A-Za-z]",
  "?": "[A-Za-z ]",
  "&": "[^ ]+",
  "C": "[^]+",
  "A": "[A-Za-z0-9]",
  "a": "[A-Za-z0-9 ]"
};
function createMask() {
  attributes(this.element, {
    "role": "textbox",
    "autocomplete": "off",
    "autocapitalize": "off",
    "spellcheck": "false",
    "aria-live": "assertive"
  });
  if (this.mask) {
    var splitMask = this.mask.split("]");
    for (var i = 0; i < splitMask.length; i++) {
      if (splitMask[i][splitMask[i].length - 1] === "\\") {
        splitMask[i] = splitMask[i] + "]";
        var splitInnerMask = splitMask[i].split("[");
        for (var j = 0; j < splitInnerMask.length; j++) {
          if (splitInnerMask[j][splitInnerMask[j].length - 1] === "\\") {
            splitInnerMask[j] = splitInnerMask[j] + "[";
          }
          pushIntoRegExpCollec.call(this, splitInnerMask[j]);
        }
      } else {
        var splitInnerMask = splitMask[i].split("[");
        if (splitInnerMask.length > 1) {
          var chkSpace = false;
          for (var j = 0; j < splitInnerMask.length; j++) {
            if (splitInnerMask[j] === "\\") {
              this.customRegExpCollec.push("[");
              this.hiddenMask += splitInnerMask[j] + "[";
            } else if (splitInnerMask[j] === "") {
              chkSpace = true;
            } else if (splitInnerMask[j] !== "" && chkSpace || j === splitInnerMask.length - 1) {
              this.customRegExpCollec.push("[" + splitInnerMask[j] + "]");
              this.hiddenMask += this.promptChar;
              chkSpace = false;
            } else {
              pushIntoRegExpCollec.call(this, splitInnerMask[j]);
            }
          }
        } else {
          pushIntoRegExpCollec.call(this, splitInnerMask[0]);
        }
      }
    }
    this.escapeMaskValue = this.hiddenMask;
    this.promptMask = this.hiddenMask.replace(/[09?LCAa#&]/g, this.promptChar);
    if (!isNullOrUndefined(this.customCharacters)) {
      for (var i = 0; i < this.promptMask.length; i++) {
        if (!isNullOrUndefined(this.customCharacters[this.promptMask[i]])) {
          this.promptMask = this.promptMask.replace(new RegExp(this.promptMask[i], "g"), this.promptChar);
        }
      }
    }
    var escapeNumber = 0;
    if (this.hiddenMask.match(new RegExp(/\\/))) {
      for (var i = 0; i < this.hiddenMask.length; i++) {
        var j = 0;
        if (i >= 1) {
          j = i;
        }
        escapeNumber = this.hiddenMask.length - this.promptMask.length;
        j = j - escapeNumber;
        if (i > 0 && this.hiddenMask[i - 1] !== "\\" && (this.hiddenMask[i] === ">" || this.hiddenMask[i] === "<" || this.hiddenMask[i] === "|")) {
          this.promptMask = this.promptMask.substring(0, j) + this.promptMask.substring(i + 1 - escapeNumber, this.promptMask.length);
          this.escapeMaskValue = this.escapeMaskValue.substring(0, j) + this.escapeMaskValue.substring(i + 1 - escapeNumber, this.escapeMaskValue.length);
        }
        if (this.hiddenMask[i] === "\\") {
          this.promptMask = this.promptMask.substring(0, j) + this.hiddenMask[i + 1] + this.promptMask.substring(i + 2 - escapeNumber, this.promptMask.length);
          this.escapeMaskValue = this.escapeMaskValue.substring(0, j) + this.escapeMaskValue[i + 1] + this.escapeMaskValue.substring(i + 2 - escapeNumber, this.escapeMaskValue.length);
        }
      }
    } else {
      this.promptMask = this.promptMask.replace(/[>|<]/g, "");
      this.escapeMaskValue = this.hiddenMask.replace(/[>|<]/g, "");
    }
    attributes(this.element, { "aria-invalid": "false" });
  }
}
function applyMask() {
  setElementValue.call(this, this.promptMask);
  setMaskValue.call(this, this.value);
}
function wireEvents() {
  EventHandler.add(this.element, "keydown", maskInputKeyDownHandler, this);
  EventHandler.add(this.element, "keypress", maskInputKeyPressHandler, this);
  EventHandler.add(this.element, "keyup", maskInputKeyUpHandler, this);
  EventHandler.add(this.element, "input", maskInputHandler, this);
  EventHandler.add(this.element, "focus", maskInputFocusHandler, this);
  EventHandler.add(this.element, "blur", maskInputBlurHandler, this);
  EventHandler.add(this.element, "paste", maskInputPasteHandler, this);
  EventHandler.add(this.element, "cut", maskInputCutHandler, this);
  EventHandler.add(this.element, "drop", maskInputDropHandler, this);
  EventHandler.add(this.element, "mousedown", maskInputMouseDownHandler, this);
  EventHandler.add(this.element, "mouseup", maskInputMouseUpHandler, this);
  if (this.enabled) {
    bindClearEvent.call(this);
    if (this.formElement) {
      EventHandler.add(this.formElement, "reset", resetFormHandler, this);
    }
  }
}
function unwireEvents() {
  EventHandler.remove(this.element, "keydown", maskInputKeyDownHandler);
  EventHandler.remove(this.element, "keypress", maskInputKeyPressHandler);
  EventHandler.remove(this.element, "keyup", maskInputKeyUpHandler);
  EventHandler.remove(this.element, "input", maskInputHandler);
  EventHandler.remove(this.element, "focus", maskInputFocusHandler);
  EventHandler.remove(this.element, "blur", maskInputBlurHandler);
  EventHandler.remove(this.element, "paste", maskInputPasteHandler);
  EventHandler.remove(this.element, "cut", maskInputCutHandler);
  EventHandler.remove(this.element, "mousedown", maskInputMouseDownHandler);
  EventHandler.remove(this.element, "mouseup", maskInputMouseUpHandler);
  if (this.formElement) {
    EventHandler.remove(this.formElement, "reset", resetFormHandler);
  }
}
function bindClearEvent() {
  if (this.showClearButton) {
    EventHandler.add(this.inputObj.clearButton, "mousedown touchstart", resetHandler, this);
  }
}
function resetHandler(e) {
  e.preventDefault();
  if (!this.inputObj.clearButton.classList.contains("e-clear-icon-hide") || this.inputObj.container.classList.contains("e-static-clear")) {
    clear.call(this, e);
    this.value = "";
  }
}
function clear(event) {
  var value = this.element.value;
  setElementValue.call(this, this.promptMask);
  this.redoCollec.unshift({
    value: this.promptMask,
    startIndex: this.element.selectionStart,
    endIndex: this.element.selectionEnd
  });
  triggerMaskChangeEvent.call(this, event, value);
  this.element.setSelectionRange(0, 0);
}
function resetFormHandler() {
  if (this.element.tagName === "EJS-MASKEDTEXTBOX") {
    setElementValue.call(this, this.promptMask);
  } else {
    this.value = this.initInputValue;
  }
}
function unstrippedValue(element2) {
  return element2.value;
}
function strippedValue(element2, maskValues) {
  var value = "";
  var k = 0;
  var checkMask = false;
  var maskValue = !isNullOrUndefined(maskValues) ? maskValues : !isNullOrUndefined(element2) && !isNullOrUndefined(this) ? element2.value : maskValues;
  if (maskValue !== this.promptMask) {
    for (var i = 0; i < this.customRegExpCollec.length; i++) {
      if (checkMask) {
        checkMask = false;
      }
      if (this.customRegExpCollec[k] === ">" || this.customRegExpCollec[k] === "<" || this.customRegExpCollec[k] === "|" || this.customRegExpCollec[k] === "\\") {
        --i;
        checkMask = true;
      }
      if (!checkMask) {
        if (maskValue[i] !== this.promptChar && (!isNullOrUndefined(this.customRegExpCollec[k]) && (this._callPasteHandler || !isNullOrUndefined(this.regExpCollec[this.customRegExpCollec[k]]) || this.customRegExpCollec[k].length > 2 && this.customRegExpCollec[k][0] === "[" && this.customRegExpCollec[k][this.customRegExpCollec[k].length - 1] === "]" || !isNullOrUndefined(this.customCharacters) && !isNullOrUndefined(this.customCharacters[this.customRegExpCollec[k]]))) && maskValue !== "") {
          value += maskValue[i];
        }
      }
      ++k;
    }
  }
  if (this.mask === null || this.mask === "" && this.value !== void 0) {
    value = maskValue;
  }
  return value;
}
function pushIntoRegExpCollec(value) {
  for (var k = 0; k < value.length; k++) {
    this.hiddenMask += value[k];
    if (value[k] !== "\\") {
      this.customRegExpCollec.push(value[k]);
    }
  }
}
function maskInputMouseDownHandler() {
  this.isClicked = true;
}
function maskInputMouseUpHandler() {
  this.isClicked = false;
}
function maskInputFocusHandler(event) {
  var _this = this;
  var inputElement = this.element;
  var startIndex = 0;
  var modelValue = strippedValue.call(this, inputElement);
  var toAllowForward = false;
  var toAllowBackward = false;
  var eventArgs = {
    selectionStart: inputElement.selectionStart,
    event,
    value: this.value,
    maskedValue: inputElement.value,
    container: !isNullOrUndefined(this.inputObj) ? this.inputObj.container : this.inputObj,
    selectionEnd: inputElement.selectionEnd
  };
  if (!this.isClicked) {
    triggerFocus.call(this, eventArgs, inputElement);
  }
  if (this.mask) {
    if (!(!(modelValue === null || modelValue === "") || this.floatLabelType === "Always" || this.placeholder === null || this.placeholder === "")) {
      inputElement.value = this.promptMask;
    }
    setTimeout(function() {
      if (inputElement.selectionStart === _this.promptMask.length || inputElement.value[inputElement.selectionStart] === _this.promptChar) {
        toAllowForward = true;
      } else {
        for (var i = inputElement.selectionStart; i < _this.promptMask.length; i++) {
          if (inputElement.value[i] !== _this.promptChar) {
            if (inputElement.value[i] !== _this.promptMask[i]) {
              toAllowForward = false;
              break;
            }
          } else {
            toAllowForward = true;
            break;
          }
        }
      }
    });
    setTimeout(function() {
      var backSelectionStart = inputElement.selectionStart - 1;
      if (backSelectionStart === _this.promptMask.length - 1 || inputElement.value[backSelectionStart] === _this.promptChar) {
        toAllowBackward = true;
      } else {
        for (var i = backSelectionStart; i >= 0; i--) {
          if (inputElement.value[i] !== _this.promptChar) {
            if (inputElement.value[i] !== _this.promptMask[i]) {
              toAllowBackward = false;
              break;
            }
          } else {
            toAllowBackward = true;
            break;
          }
        }
      }
    });
    if (this.isClicked || this.floatLabelType !== "Always" && ((modelValue === null || modelValue === "") && (this.placeholder !== null && this.placeholder !== ""))) {
      for (startIndex = 0; startIndex < this.promptMask.length; startIndex++) {
        if (inputElement.value[startIndex] === this.promptChar) {
          setTimeout(function() {
            if (toAllowForward || toAllowBackward) {
              inputElement.selectionEnd = startIndex;
              inputElement.selectionStart = startIndex;
            }
            eventArgs = {
              selectionStart: inputElement.selectionStart,
              event,
              value: _this.value,
              maskedValue: inputElement.value,
              container: !isNullOrUndefined(_this.inputObj) ? _this.inputObj.container : _this.inputObj,
              selectionEnd: inputElement.selectionEnd
            };
            triggerFocus.call(_this, eventArgs, inputElement);
          }, 110);
          break;
        }
      }
      if (isNullOrUndefined(inputElement.value.match(escapeRegExp(this.promptChar)))) {
        eventArgs = {
          selectionStart: inputElement.selectionStart,
          event,
          value: this.value,
          maskedValue: inputElement.value,
          container: !isNullOrUndefined(this.inputObj) ? this.inputObj.container : this.inputObj,
          selectionEnd: inputElement.selectionEnd
        };
        triggerFocus.call(this, eventArgs, inputElement);
      }
      this.isClicked = false;
    }
  }
}
function triggerFocus(eventArgs, inputElement) {
  this.trigger("focus", eventArgs, function(eventArgs2) {
    inputElement.selectionStart = eventArgs2.selectionStart;
    inputElement.selectionEnd = eventArgs2.selectionEnd;
  });
}
function escapeRegExp(text) {
  return !isNullOrUndefined(text) ? text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") : text;
}
function maskInputBlurHandler(event) {
  this.blurEventArgs = {
    event,
    value: this.value,
    maskedValue: this.element.value,
    container: !isNullOrUndefined(this.inputObj) ? this.inputObj.container : this.inputObj
  };
  this.trigger("blur", this.blurEventArgs);
  if (this.mask) {
    this.isFocus = false;
    if (this.placeholder && this.element.value === this.promptMask && this.floatLabelType !== "Always") {
      setElementValue.call(this, "");
      var labelElement = this.element.parentNode.querySelector(".e-float-text");
      if (this.floatLabelType === "Auto" && !isNullOrUndefined(labelElement) && labelElement.classList.contains(TOPLABEL)) {
        removeClass([labelElement], TOPLABEL);
      }
    }
  }
}
function maskInputPasteHandler(event) {
  var _this = this;
  if (this.mask && !this.readonly) {
    var sIndex_1 = this.element.selectionStart;
    var eIndex_1 = this.element.selectionEnd;
    var oldValue_1 = this.element.value;
    setElementValue.call(this, "");
    this._callPasteHandler = true;
    setTimeout(function() {
      var value = _this.element.value.replace(/ /g, "");
      if (_this.redoCollec.length > 0 && _this.redoCollec[0].value === _this.element.value) {
        value = strippedValue.call(_this, _this.element);
      }
      setElementValue.call(_this, oldValue_1);
      _this.element.selectionStart = sIndex_1;
      _this.element.selectionEnd = eIndex_1;
      var i = 0;
      _this.maskKeyPress = true;
      do {
        validateValue.call(_this, value[i], false, null);
        ++i;
      } while (i < value.length);
      _this.maskKeyPress = false;
      _this._callPasteHandler = false;
      if (_this.element.value === oldValue_1) {
        var i_1 = 0;
        _this.maskKeyPress = true;
        do {
          validateValue.call(_this, value[i_1], false, null);
          ++i_1;
        } while (i_1 < value.length);
        _this.maskKeyPress = false;
      } else {
        triggerMaskChangeEvent.call(_this, event, oldValue_1);
      }
    }, 1);
  }
}
function maskInputCutHandler(event) {
  var _this = this;
  if (this.mask && !this.readonly) {
    var preValue_1 = this.element.value;
    var sIndex_2 = this.element.selectionStart;
    var eIndex = this.element.selectionEnd;
    this.undoCollec.push({ value: this.element.value, startIndex: this.element.selectionStart, endIndex: this.element.selectionEnd });
    var value_1 = this.element.value.substring(0, sIndex_2) + this.promptMask.substring(sIndex_2, eIndex) + this.element.value.substring(eIndex);
    setTimeout(function() {
      setElementValue.call(_this, value_1);
      _this.element.selectionStart = _this.element.selectionEnd = sIndex_2;
      if (_this.element.value !== preValue_1) {
        triggerMaskChangeEvent.call(_this, event, null);
      }
    }, 0);
  }
}
function maskInputDropHandler(event) {
  event.preventDefault();
}
function maskInputHandler(event) {
  if (Browser.isIE === true && this.element.value === "" && this.floatLabelType === "Never") {
    return;
  }
  var eventArgs = { ctrlKey: false, keyCode: 229 };
  extend(event, eventArgs);
  if (this.mask) {
    if (this.element.value === "") {
      this.redoCollec.unshift({
        value: this.promptMask,
        startIndex: this.element.selectionStart,
        endIndex: this.element.selectionEnd
      });
    }
    if (this.element.value.length === 1) {
      this.element.value = this.element.value + this.promptMask;
      this.element.setSelectionRange(1, 1);
    }
    if (!this._callPasteHandler) {
      removeMaskInputValues.call(this, event);
    }
    if (this.element.value.length > this.promptMask.length) {
      var startIndex = this.element.selectionStart;
      var addedValues = this.element.value.length - this.promptMask.length;
      var value = this.element.value.substring(startIndex - addedValues, startIndex);
      this.maskKeyPress = false;
      var i = 0;
      do {
        validateValue.call(this, value[i], event.ctrlKey, event);
        ++i;
      } while (i < value.length);
      if (this.element.value !== this.preEleVal) {
        triggerMaskChangeEvent.call(this, event, null);
      }
    }
    var val = strippedValue.call(this, this.element);
    this.prevValue = val;
    this.value = val;
    if (val === "") {
      setElementValue.call(this, this.promptMask);
      this.element.setSelectionRange(0, 0);
    }
  }
}
function maskInputKeyDownHandler(event) {
  if (this.mask && !this.readonly) {
    if (event.keyCode !== 229) {
      if (event.ctrlKey && (event.keyCode === 89 || event.keyCode === 90)) {
        event.preventDefault();
      }
      removeMaskInputValues.call(this, event);
    }
    var startValue = this.element.value;
    if (event.ctrlKey && (event.keyCode === 89 || event.keyCode === 90)) {
      var collec = void 0;
      if (event.keyCode === 90 && this.undoCollec.length > 0 && startValue !== this.undoCollec[this.undoCollec.length - 1].value) {
        collec = this.undoCollec[this.undoCollec.length - 1];
        this.redoCollec.unshift({
          value: this.element.value,
          startIndex: this.element.selectionStart,
          endIndex: this.element.selectionEnd
        });
        setElementValue.call(this, collec.value);
        this.element.selectionStart = collec.startIndex;
        this.element.selectionEnd = collec.endIndex;
        this.undoCollec.splice(this.undoCollec.length - 1, 1);
      } else if (event.keyCode === 89 && this.redoCollec.length > 0 && startValue !== this.redoCollec[0].value) {
        collec = this.redoCollec[0];
        this.undoCollec.push({
          value: this.element.value,
          startIndex: this.element.selectionStart,
          endIndex: this.element.selectionEnd
        });
        setElementValue.call(this, collec.value);
        this.element.selectionStart = collec.startIndex;
        this.element.selectionEnd = collec.endIndex;
        this.redoCollec.splice(0, 1);
      }
    }
  }
}
function mobileRemoveFunction() {
  var collec;
  var sIndex = this.element.selectionStart;
  var eIndex = this.element.selectionEnd;
  if (this.redoCollec.length > 0) {
    collec = this.redoCollec[0];
    setElementValue.call(this, collec.value);
    if (collec.startIndex - sIndex === 1) {
      this.element.selectionStart = collec.startIndex;
      this.element.selectionEnd = collec.endIndex;
    } else {
      this.element.selectionStart = sIndex + 1;
      this.element.selectionEnd = eIndex + 1;
    }
  } else {
    setElementValue.call(this, this.promptMask);
    this.element.selectionStart = this.element.selectionEnd = sIndex;
  }
}
function autoFillMaskInputValues(isRemove, oldEventVal, event) {
  if (event.type === "input") {
    isRemove = false;
    oldEventVal = this.element.value;
    setElementValue.call(this, this.promptMask);
    setMaskValue.call(this, oldEventVal);
  }
  return isRemove;
}
function removeMaskInputValues(event) {
  var isRemove = false;
  var oldEventVal;
  var isDeleted = false;
  if (this.element.value.length < this.promptMask.length) {
    isRemove = true;
    oldEventVal = this.element.value;
    isRemove = autoFillMaskInputValues.call(this, isRemove, oldEventVal, event);
    mobileRemoveFunction.call(this);
  }
  if (this.element.value.length >= this.promptMask.length && event.type === "input") {
    isRemove = autoFillMaskInputValues.call(this, isRemove, oldEventVal, event);
  }
  var initStartIndex = this.element.selectionStart;
  var initEndIndex = this.element.selectionEnd;
  var startIndex = this.element.selectionStart;
  var endIndex = this.element.selectionEnd;
  var maskValue = this.hiddenMask.replace(/[>|\\<]/g, "");
  var curMask = maskValue[startIndex - 1];
  var deleteEndIndex = this.element.selectionEnd;
  if (isRemove || event.keyCode === 8 || event.keyCode === 46) {
    this.undoCollec.push({ value: this.element.value, startIndex: this.element.selectionStart, endIndex });
    var multipleDel = false;
    var preValue = this.element.value;
    if (startIndex > 0 || (event.keyCode === 8 || event.keyCode === 46) && startIndex < this.element.value.length && this.element.selectionEnd - startIndex !== this.element.value.length) {
      var index = startIndex;
      if (startIndex !== endIndex) {
        startIndex = endIndex;
        if (event.keyCode === 46) {
          multipleDel = true;
        }
      } else if (event.keyCode === 46) {
        ++index;
      } else {
        --index;
      }
      for (var k = startIndex; event.keyCode === 8 || isRemove || multipleDel ? k > index : k < index; event.keyCode === 8 || isRemove || multipleDel ? k-- : k++) {
        for (var i = startIndex; event.keyCode === 8 || isRemove || multipleDel ? i > 0 : i < this.element.value.length; event.keyCode === 8 || isRemove || multipleDel ? i-- : i++) {
          var sIndex = void 0;
          if ((event.keyCode === 8 || multipleDel) && (initStartIndex !== initEndIndex && initStartIndex !== startIndex || initStartIndex === initEndIndex) || isRemove) {
            curMask = maskValue[i - 1];
            sIndex = startIndex - 1;
          } else {
            curMask = maskValue[i];
            sIndex = startIndex;
            ++startIndex;
          }
          var oldValue = this.element.value[sIndex];
          if (isNullOrUndefined(this.regExpCollec["" + curMask]) && (!isNullOrUndefined(this.customCharacters) && isNullOrUndefined(this.customCharacters["" + curMask])) && (this.hiddenMask[sIndex] !== this.promptChar && this.customRegExpCollec[sIndex][0] !== "[" && this.customRegExpCollec[sIndex][this.customRegExpCollec[sIndex].length - 1] !== "]") || this.promptMask[sIndex] !== this.promptChar && isNullOrUndefined(this.customCharacters)) {
            this.element.selectionStart = this.element.selectionEnd = sIndex;
            event.preventDefault();
            if (event.keyCode === 46 && !multipleDel) {
              ++this.element.selectionStart;
            }
          } else {
            var value = this.element.value;
            var prompt_1 = this.promptChar;
            var elementValue = value.substring(0, sIndex) + prompt_1 + value.substring(startIndex, value.length);
            setElementValue.call(this, elementValue);
            event.preventDefault();
            if (event.keyCode === 46 && !multipleDel) {
              sIndex++;
            }
            this.element.selectionStart = this.element.selectionEnd = sIndex;
            isDeleted = true;
          }
          startIndex = this.element.selectionStart;
          if (!isDeleted && event.keyCode === 8 || multipleDel || !isDeleted && !(event.keyCode === 46)) {
            sIndex = startIndex - 1;
          } else {
            sIndex = startIndex;
            isDeleted = false;
          }
          oldValue = this.element.value[sIndex];
          if (initStartIndex !== initEndIndex && this.element.selectionStart === initStartIndex || this.promptMask[sIndex] === this.promptChar || oldValue !== this.promptMask[sIndex] && this.promptMask[sIndex] !== this.promptChar && !isNullOrUndefined(this.customCharacters)) {
            break;
          }
        }
      }
    }
    if (event.keyCode === 46 && multipleDel && isDeleted) {
      this.element.selectionStart = this.element.selectionEnd = deleteEndIndex;
    }
    if (this.element.selectionStart === 0 && this.element.selectionEnd === this.element.value.length) {
      setElementValue.call(this, this.promptMask);
      event.preventDefault();
      this.element.selectionStart = this.element.selectionEnd = startIndex;
    }
    this.redoCollec.unshift({
      value: this.element.value,
      startIndex: this.element.selectionStart,
      endIndex: this.element.selectionEnd
    });
    if (this.element.value !== preValue) {
      triggerMaskChangeEvent.call(this, event, oldEventVal);
    }
  }
}
function maskInputKeyPressHandler(event) {
  if (this.mask && !this.readonly) {
    var oldValue = this.element.value;
    if (!(event.ctrlKey || event.metaKey) || (event.ctrlKey || event.metaKey) && event.code !== "KeyA" && event.code !== "KeyY" && event.code !== "KeyZ" && event.code !== "KeyX" && event.code !== "KeyC" && event.code !== "KeyV") {
      this.maskKeyPress = true;
      var key = event.key;
      if (key === "Spacebar") {
        key = String.fromCharCode(event.keyCode);
      }
      if (!key) {
        this.isIosInvalid = true;
        validateValue.call(this, String.fromCharCode(event.keyCode), event.ctrlKey, event);
        event.preventDefault();
        this.isIosInvalid = false;
      } else if (key && key.length === 1) {
        validateValue.call(this, key, event.ctrlKey, event);
        event.preventDefault();
      }
      if (event.keyCode === 32 && key === " " && this.promptChar === " ") {
        this.element.selectionStart = this.element.selectionEnd = this.element.selectionStart - key.length;
      }
    }
    if (this.element.value !== oldValue) {
      triggerMaskChangeEvent.call(this, event, oldValue);
    }
  }
}
function triggerMaskChangeEvent(event, oldValue) {
  var prevOnChange = this.isProtectedOnChange;
  if (!isNullOrUndefined(this.changeEventArgs) && !this.isInitial) {
    var eventArgs = {};
    this.changeEventArgs = { value: this.element.value, maskedValue: this.element.value, isInteraction: false, isInteracted: false };
    if (this.mask) {
      this.changeEventArgs.value = strippedValue.call(this, this.element);
    }
    if (!isNullOrUndefined(event)) {
      this.changeEventArgs.isInteracted = true;
      this.changeEventArgs.isInteraction = true;
      this.changeEventArgs.event = event;
    }
    this.isProtectedOnChange = true;
    this.value = this.changeEventArgs.value;
    this.isProtectedOnChange = prevOnChange;
    merge(eventArgs, this.changeEventArgs);
    if (this.isAngular && this.preventChange) {
      this.preventChange = false;
    } else {
      this.trigger("change", eventArgs);
    }
  }
  this.preEleVal = this.element.value;
  this.prevValue = strippedValue.call(this, this.element);
}
function maskInputKeyUpHandler(event) {
  if (this.mask && !this.readonly) {
    var collec = void 0;
    if (!this.maskKeyPress && event.keyCode === 229) {
      var oldEventVal = void 0;
      if (this.element.value.length === 1) {
        this.element.value = this.element.value + this.promptMask;
        this.element.setSelectionRange(1, 1);
      }
      if (this.element.value.length > this.promptMask.length) {
        var startIndex = this.element.selectionStart;
        var addedValues = this.element.value.length - this.promptMask.length;
        var val_1 = this.element.value.substring(startIndex - addedValues, startIndex);
        if (this.undoCollec.length > 0) {
          collec = this.undoCollec[this.undoCollec.length - 1];
          var startIndex_1 = this.element.selectionStart;
          oldEventVal = collec.value;
          var oldVal = collec.value.substring(startIndex_1 - addedValues, startIndex_1);
          collec = this.redoCollec[0];
          val_1 = val_1.trim();
          var isSpace = Browser.isAndroid && val_1 === "";
          if (!isSpace && oldVal !== val_1 && collec.value.substring(startIndex_1 - addedValues, startIndex_1) !== val_1) {
            validateValue.call(this, val_1, event.ctrlKey, event);
          } else if (isSpace) {
            preventUnsupportedValues.call(this, event, startIndex_1 - 1, this.element.selectionEnd - 1, val_1, event.ctrlKey, false);
          }
        } else {
          oldEventVal = this.promptMask;
          validateValue.call(this, val_1, event.ctrlKey, event);
        }
        this.maskKeyPress = false;
        triggerMaskChangeEvent.call(this, event, oldEventVal);
      }
    } else {
      removeMaskError.call(this);
    }
    var val = strippedValue.call(this, this.element);
    if (!(this.element.selectionStart === 0 && this.promptMask === this.element.value && val === "") || val === "" && this.value !== val) {
      this.prevValue = val;
      this.value = val;
    }
  } else {
    triggerMaskChangeEvent.call(this, event);
  }
  if (this.element.selectionStart === 0 && this.element.selectionEnd === 0) {
    var temp_1 = this.element;
    setTimeout(function() {
      temp_1.setSelectionRange(0, 0);
    }, 0);
  }
}
function mobileSwipeCheck(key) {
  if (key.length > 1 && this.promptMask.length + key.length < this.element.value.length) {
    var elementValue = this.redoCollec[0].value.substring(0, this.redoCollec[0].startIndex) + key + this.redoCollec[0].value.substring(this.redoCollec[0].startIndex, this.redoCollec[0].value.length);
    setElementValue.call(this, elementValue);
    this.element.selectionStart = this.element.selectionEnd = this.redoCollec[0].startIndex + key.length;
  }
  this.element.selectionStart = this.element.selectionStart - key.length;
  this.element.selectionEnd = this.element.selectionEnd - key.length;
}
function mobileValidation(key) {
  if (!this.maskKeyPress) {
    mobileSwipeCheck.call(this, key);
  }
}
function validateValue(key, isCtrlKey, event) {
  mobileValidation.call(this, key);
  if (isNullOrUndefined(this) || isNullOrUndefined(key)) {
    return;
  }
  var startIndex = this.element.selectionStart;
  var initStartIndex = startIndex;
  var curMask;
  var allowText = false;
  var value = this.element.value;
  var eventOldVal;
  var prevSupport = false;
  var isEqualVal = false;
  for (var k = 0; k < key.length; k++) {
    var keyValue = key[k];
    startIndex = this.element.selectionStart;
    if (!this.maskKeyPress && initStartIndex === startIndex) {
      startIndex = startIndex + k;
    }
    if (!this.maskKeyPress || startIndex < this.promptMask.length) {
      for (var i = startIndex; i < this.promptMask.length; i++) {
        var maskValue = this.escapeMaskValue;
        curMask = maskValue[startIndex];
        if (this.hiddenMask[startIndex] === "\\" && this.hiddenMask[startIndex + 1] === key) {
          isEqualVal = true;
        }
        if (isNullOrUndefined(this.regExpCollec["" + curMask]) && (isNullOrUndefined(this.customCharacters) || !isNullOrUndefined(this.customCharacters) && isNullOrUndefined(this.customCharacters["" + curMask])) && (this.hiddenMask[startIndex] !== this.promptChar && this.customRegExpCollec[startIndex][0] !== "[" && this.customRegExpCollec[startIndex][this.customRegExpCollec[startIndex].length - 1] !== "]") || this.promptMask[startIndex] !== this.promptChar && isNullOrUndefined(this.customCharacters) || this.promptChar === curMask && this.escapeMaskValue === this.mask) {
          this.element.selectionStart = this.element.selectionEnd = startIndex + 1;
          startIndex = this.element.selectionStart;
          curMask = this.hiddenMask[startIndex];
        }
      }
      if (!isNullOrUndefined(this.customCharacters) && !isNullOrUndefined(this.customCharacters["" + curMask])) {
        var customValStr = this.customCharacters["" + curMask];
        var customValArr = customValStr.split(",");
        for (var i = 0; i < customValArr.length; i++) {
          if (keyValue.match(new RegExp("[" + customValArr[i] + "]"))) {
            allowText = true;
            break;
          }
        }
      } else if (!isNullOrUndefined(this.regExpCollec["" + curMask]) && keyValue.match(new RegExp(this.regExpCollec["" + curMask])) && this.promptMask[startIndex] === this.promptChar) {
        allowText = true;
      } else if (this.promptMask[startIndex] === this.promptChar && this.customRegExpCollec[startIndex][0] === "[" && this.customRegExpCollec[startIndex][this.customRegExpCollec[startIndex].length - 1] === "]" && keyValue.match(new RegExp(this.customRegExpCollec[startIndex]))) {
        allowText = true;
      }
      if ((!this.maskKeyPress || startIndex < this.hiddenMask.length) && allowText) {
        if (k === 0) {
          if (this.maskKeyPress) {
            this.undoCollec.push({ value, startIndex, endIndex: startIndex });
          } else {
            var sIndex = this.element.selectionStart;
            var eIndex = this.element.selectionEnd;
            if (this.redoCollec.length > 0) {
              eventOldVal = this.redoCollec[0].value;
              setElementValue.call(this, eventOldVal);
              this.undoCollec.push(this.redoCollec[0]);
            } else {
              this.undoCollec.push({ value: this.promptMask, startIndex, endIndex: startIndex });
              eventOldVal = this.promptMask;
              setElementValue.call(this, eventOldVal);
            }
            this.element.selectionStart = sIndex;
            this.element.selectionEnd = eIndex;
          }
        }
        startIndex = this.element.selectionStart;
        applySupportedValues.call(this, event, startIndex, keyValue, eventOldVal, isEqualVal);
        prevSupport = true;
        if (k === key.length - 1) {
          this.redoCollec.unshift({
            value: this.element.value,
            startIndex: this.element.selectionStart,
            endIndex: this.element.selectionEnd
          });
        }
        allowText = false;
      } else {
        startIndex = this.element.selectionStart;
        preventUnsupportedValues.call(this, event, startIndex, initStartIndex, key, isCtrlKey, prevSupport);
      }
      if (k === key.length - 1 && !allowText) {
        if (!Browser.isAndroid || Browser.isAndroid && startIndex < this.promptMask.length) {
          this.redoCollec.unshift({
            value: this.element.value,
            startIndex: this.element.selectionStart,
            endIndex: this.element.selectionEnd
          });
        }
      }
    } else {
      if (key.length === 1 && !isCtrlKey && !isNullOrUndefined(event)) {
        addMaskErrorClass.call(this);
      }
    }
  }
}
function applySupportedValues(event, startIndex, keyValue, eventOldVal, isEqualVal) {
  if (this.hiddenMask.length > this.promptMask.length) {
    keyValue = changeToLowerUpperCase.call(this, keyValue, this.element.value);
  }
  if (!isEqualVal) {
    var value = this.element.value;
    var elementValue = value.substring(0, startIndex) + keyValue + value.substring(startIndex + 1, value.length);
    setElementValue.call(this, elementValue);
    this.element.selectionStart = this.element.selectionEnd = startIndex + 1;
  }
}
function preventUnsupportedValues(event, sIdx, idx, key, ctrl, chkSupport) {
  if (!this.maskKeyPress) {
    var value = this.element.value;
    if (sIdx >= this.promptMask.length) {
      setElementValue.call(this, value.substring(0, sIdx));
    } else {
      if (idx === sIdx) {
        setElementValue.call(this, value.substring(0, sIdx) + value.substring(sIdx + 1, value.length));
      } else {
        if (this.promptMask.length === this.element.value.length) {
          setElementValue.call(this, value.substring(0, sIdx) + value.substring(sIdx, value.length));
        } else {
          setElementValue.call(this, value.substring(0, idx) + value.substring(idx + 1, value.length));
        }
      }
      this.element.selectionStart = this.element.selectionEnd = chkSupport || this.element.value[idx] !== this.promptChar ? sIdx : idx;
    }
    addMaskErrorClass.call(this);
  }
  if (key.length === 1 && !ctrl && !isNullOrUndefined(event)) {
    addMaskErrorClass.call(this);
  }
}
function addMaskErrorClass() {
  var _this = this;
  var parentElement = this.element.parentNode;
  var timer = 200;
  if (parentElement.classList.contains(INPUTGROUP) || parentElement.classList.contains(FLOATINPUT)) {
    addClass([parentElement], ERROR2);
  } else {
    addClass([this.element], ERROR2);
  }
  if (this.isIosInvalid === true) {
    timer = 400;
  }
  attributes(this.element, { "aria-invalid": "true" });
  setTimeout(function() {
    if (!_this.maskKeyPress) {
      removeMaskError.call(_this);
    }
  }, timer);
}
function removeMaskError() {
  var parentElement = this.element.parentNode;
  if (!isNullOrUndefined(parentElement)) {
    removeClass([parentElement], ERROR2);
  }
  removeClass([this.element], ERROR2);
  attributes(this.element, { "aria-invalid": "false" });
}
function changeToLowerUpperCase(key, value) {
  var promptMask;
  var i;
  var curVal = value;
  var caseCount = 0;
  for (i = 0; i < this.hiddenMask.length; i++) {
    if (this.hiddenMask[i] === "\\") {
      promptMask = curVal.substring(0, i) + "\\" + curVal.substring(i, curVal.length);
    }
    if (this.hiddenMask[i] === ">" || this.hiddenMask[i] === "<" || this.hiddenMask[i] === "|") {
      if (this.hiddenMask[i] !== curVal[i]) {
        promptMask = curVal.substring(0, i) + this.hiddenMask[i] + curVal.substring(i, curVal.length);
      }
      ++caseCount;
    }
    if (promptMask) {
      if (promptMask[i] === this.promptChar && i > this.element.selectionStart || this.element.value.indexOf(this.promptChar) < 0 && this.element.selectionStart + caseCount === i) {
        caseCount = 0;
        break;
      }
      curVal = promptMask;
    }
  }
  while (i >= 0 && promptMask) {
    if (i === 0 || promptMask[i - 1] !== "\\") {
      if (promptMask[i] === ">") {
        key = key.toUpperCase();
        break;
      } else if (promptMask[i] === "<") {
        key = key.toLowerCase();
        break;
      } else if (promptMask[i] === "|") {
        break;
      }
    }
    --i;
  }
  return key;
}
function setMaskValue(val) {
  if (this.mask && val !== void 0 && (this.prevValue === void 0 || this.prevValue !== val)) {
    this.maskKeyPress = true;
    setElementValue.call(this, this.promptMask);
    if (val !== "" && !(val === null && this.floatLabelType === "Never" && this.placeholder)) {
      this.element.selectionStart = 0;
      this.element.selectionEnd = 0;
    }
    if (val !== null) {
      for (var i = 0; i < val.length; i++) {
        validateValue.call(this, val[i], false, null);
      }
    }
    var newVal = strippedValue.call(this, this.element);
    this.prevValue = newVal;
    this.value = newVal;
    triggerMaskChangeEvent.call(this, null, null);
    this.maskKeyPress = false;
    var labelElement = this.element.parentNode.querySelector(".e-float-text");
    if (this.element.value === this.promptMask && this.floatLabelType === "Auto" && this.placeholder && !isNullOrUndefined(labelElement) && labelElement.classList.contains(TOPLABEL) && !this.isFocus) {
      removeClass([labelElement], TOPLABEL);
      addClass([labelElement], BOTTOMLABEL);
      setElementValue.call(this, "");
    }
  }
  if (this.mask === null || this.mask === "" && this.value !== void 0) {
    setElementValue.call(this, this.value);
  }
}
function setElementValue(val, element2) {
  if (!this.isFocus && this.floatLabelType === "Auto" && this.placeholder && isNullOrUndefined(this.value)) {
    val = "";
  }
  var value = strippedValue.call(this, element2 ? element2 : this.element, val);
  if (value === null || value === "") {
    Input.setValue(val, element2 ? element2 : this.element, this.floatLabelType, false);
    if (this.showClearButton) {
      this.inputObj.clearButton.classList.add("e-clear-icon-hide");
    }
  } else {
    Input.setValue(val, element2 ? element2 : this.element, this.floatLabelType, this.showClearButton);
  }
}
function maskInput(args) {
  var inputEle = getMaskInput(args);
  applyMask.call(inputEle);
  var val = strippedValue.call(this, this.element);
  this.prevValue = val;
  this.value = val;
  if (args.mask) {
    unwireEvents.call(inputEle);
    wireEvents.call(inputEle);
  }
}
function getMaskInput(args) {
  addClass([args.element], UTILMASK);
  var inputEle = {
    element: args.element,
    mask: args.mask,
    promptMask: "",
    hiddenMask: "",
    escapeMaskValue: "",
    promptChar: args.promptChar ? args.promptChar.length > 1 ? args.promptChar = args.promptChar[0] : args.promptChar : "_",
    value: args.value ? args.value : null,
    regExpCollec: regularExpressions,
    customRegExpCollec: [],
    customCharacters: args.customCharacters,
    undoCollec: [],
    redoCollec: [],
    maskKeyPress: false,
    prevValue: ""
  };
  createMask.call(inputEle);
  return inputEle;
}
function getVal(args) {
  return strippedValue.call(getUtilMaskEle(args), args.element);
}
function getMaskedVal(args) {
  return unstrippedValue.call(getUtilMaskEle(args), args.element);
}
function getUtilMaskEle(args) {
  var inputEle;
  if (!isNullOrUndefined(args) && args.element.classList.contains(UTILMASK)) {
    inputEle = getMaskInput(args);
  }
  return inputEle;
}
var MaskUndo = (
  /** @class */
  /* @__PURE__ */ function() {
    function MaskUndo2() {
    }
    return MaskUndo2;
  }()
);
var maskUndo = new MaskUndo();

// node_modules/@syncfusion/ej2-inputs/src/maskedtextbox/maskedtextbox/maskedtextbox.js
var __extends2 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate2 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ROOT2 = "e-control-wrapper e-mask";
var INPUT = "e-input";
var COMPONENT2 = "e-maskedtextbox";
var CONTROL2 = "e-control";
var MASKINPUT_FOCUS = "e-input-focus";
var wrapperAttr = ["title", "style", "class"];
var MaskedTextBox = (
  /** @class */
  function(_super) {
    __extends2(MaskedTextBox2, _super);
    function MaskedTextBox2(options, element2) {
      var _this = _super.call(this, options, element2) || this;
      _this.initInputValue = "";
      _this.isAngular = false;
      _this.preventChange = false;
      _this.isClicked = false;
      _this.maskOptions = options;
      return _this;
    }
    MaskedTextBox2.prototype.getModuleName = function() {
      return "maskedtextbox";
    };
    MaskedTextBox2.prototype.preRender = function() {
      this.promptMask = "";
      this.hiddenMask = "";
      this.escapeMaskValue = "";
      this.regExpCollec = regularExpressions;
      this.customRegExpCollec = [];
      this.undoCollec = [];
      this.redoCollec = [];
      this.changeEventArgs = {};
      this.focusEventArgs = {};
      this.blurEventArgs = {};
      this.maskKeyPress = false;
      this.isFocus = false;
      this.isInitial = false;
      this.isIosInvalid = false;
      var ejInstance = getValue("ej2_instances", this.element);
      this.cloneElement = this.element.cloneNode(true);
      removeClass([this.cloneElement], [CONTROL2, COMPONENT2, "e-lib"]);
      this.angularTagName = null;
      this.formElement = closest(this.element, "form");
      if (this.element.tagName === "EJS-MASKEDTEXTBOX") {
        this.angularTagName = this.element.tagName;
        var input = this.createElement("input");
        for (var i = 0; i < this.element.attributes.length; i++) {
          input.setAttribute(this.element.attributes[i].nodeName, this.element.attributes[i].nodeValue);
          input.innerHTML = this.element.innerHTML;
        }
        if (this.element.hasAttribute("id")) {
          this.element.removeAttribute("id");
        }
        if (this.element.hasAttribute("name")) {
          this.element.removeAttribute("name");
        }
        this.element.classList.remove("e-control", "e-maskedtextbox");
        this.element.classList.add("e-mask-container");
        this.element.appendChild(input);
        this.element = input;
        setValue("ej2_instances", ejInstance, this.element);
      }
      this.updateHTMLAttrToElement();
      this.checkHtmlAttributes(false);
      if (this.formElement) {
        this.initInputValue = this.value;
      }
    };
    MaskedTextBox2.prototype.getPersistData = function() {
      var keyEntity = ["value"];
      return this.addOnPersist(keyEntity);
    };
    MaskedTextBox2.prototype.render = function() {
      if (this.element.tagName.toLowerCase() === "input") {
        if (this.floatLabelType === "Never") {
          addClass([this.element], INPUT);
        }
        this.createWrapper();
        this.updateHTMLAttrToWrapper();
        if (this.element.name === "") {
          this.element.setAttribute("name", this.element.id);
        }
        this.isInitial = true;
        this.resetMaskedTextBox();
        this.isInitial = false;
        this.setMaskPlaceholder(true, false);
        this.setWidth(this.width);
        this.preEleVal = this.element.value;
        if (!Browser.isDevice && (Browser.info.version === "11.0" || Browser.info.name === "edge")) {
          this.element.blur();
        }
        if (Browser.isDevice && Browser.isIos) {
          this.element.blur();
        }
        if (this.element.getAttribute("value") || this.value) {
          this.element.setAttribute("value", this.element.value);
        }
        if (!isNullOrUndefined(closest(this.element, "fieldset")) && closest(this.element, "fieldset").disabled) {
          this.enabled = false;
        }
        this.renderComplete();
      }
    };
    MaskedTextBox2.prototype.updateHTMLAttrToElement = function() {
      if (!isNullOrUndefined(this.htmlAttributes)) {
        for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
          var key = _a[_i];
          if (wrapperAttr.indexOf(key) < 0) {
            this.element.setAttribute(key, this.htmlAttributes["" + key]);
          }
        }
      }
    };
    MaskedTextBox2.prototype.updateCssClass = function(newClass, oldClass) {
      Input.setCssClass(this.getValidClassList(newClass), [this.inputObj.container], this.getValidClassList(oldClass));
    };
    MaskedTextBox2.prototype.getValidClassList = function(maskClassName) {
      var result = maskClassName;
      if (!isNullOrUndefined(maskClassName) && maskClassName !== "") {
        result = maskClassName.replace(/\s+/g, " ").trim();
      }
      return result;
    };
    MaskedTextBox2.prototype.updateHTMLAttrToWrapper = function() {
      if (!isNullOrUndefined(this.htmlAttributes)) {
        for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
          var key = _a[_i];
          if (wrapperAttr.indexOf(key) > -1) {
            if (key === "class") {
              var updatedClassValues = this.htmlAttributes["" + key].replace(/\s+/g, " ").trim();
              if (updatedClassValues !== "") {
                addClass([this.inputObj.container], updatedClassValues.split(" "));
              }
            } else if (key === "style") {
              var maskStyle = this.inputObj.container.getAttribute(key);
              maskStyle = !isNullOrUndefined(maskStyle) ? maskStyle + this.htmlAttributes["" + key] : this.htmlAttributes["" + key];
              this.inputObj.container.setAttribute(key, maskStyle);
            } else {
              this.inputObj.container.setAttribute(key, this.htmlAttributes["" + key]);
            }
          }
        }
      }
    };
    MaskedTextBox2.prototype.resetMaskedTextBox = function() {
      this.promptMask = "";
      this.hiddenMask = "";
      this.escapeMaskValue = "";
      this.customRegExpCollec = [];
      this.undoCollec = [];
      this.redoCollec = [];
      if (this.promptChar.length > 1) {
        this.promptChar = this.promptChar[0];
      }
      createMask.call(this);
      applyMask.call(this);
      if (this.mask === null || this.mask === "" && this.value !== void 0) {
        setElementValue.call(this, this.value);
      }
      var val = strippedValue.call(this, this.element);
      this.prevValue = val;
      this.value = val;
      if (!this.isInitial) {
        unwireEvents.call(this);
      }
      wireEvents.call(this);
    };
    MaskedTextBox2.prototype.setMaskPlaceholder = function(setVal, dynamicPlaceholder) {
      if (dynamicPlaceholder || this.placeholder) {
        Input.setPlaceholder(this.placeholder, this.element);
        if (this.element.value === this.promptMask && setVal && this.floatLabelType !== "Always" || this.element.value === this.promptMask && this.floatLabelType === "Never") {
          setElementValue.call(this, "");
        }
      }
    };
    MaskedTextBox2.prototype.setWidth = function(width) {
      if (!isNullOrUndefined(width)) {
        if (typeof width === "number") {
          this.inputObj.container.style.width = formatUnit(width);
          this.element.style.width = formatUnit(width);
        } else if (typeof width === "string") {
          var elementWidth = width.match(/px|%|em/) ? width : formatUnit(width);
          this.inputObj.container.style.width = elementWidth;
          this.element.style.width = elementWidth;
        }
      }
    };
    MaskedTextBox2.prototype.checkHtmlAttributes = function(isDynamic) {
      var attributes2 = isDynamic ? isNullOrUndefined(this.htmlAttributes) ? [] : Object.keys(this.htmlAttributes) : ["placeholder", "disabled", "value", "readonly"];
      for (var _i = 0, attributes_1 = attributes2; _i < attributes_1.length; _i++) {
        var key = attributes_1[_i];
        if (!isNullOrUndefined(this.element.getAttribute(key))) {
          switch (key) {
            case "placeholder":
              if (isNullOrUndefined(this.maskOptions) || this.maskOptions["placeholder"] === void 0 || isDynamic) {
                this.setProperties({ placeholder: this.element.placeholder }, !isDynamic);
              }
              break;
            case "disabled":
              if (isNullOrUndefined(this.maskOptions) || this.maskOptions["enabled"] === void 0 || isDynamic) {
                var isEnabled = this.element.getAttribute(key) === "disabled" || this.element.getAttribute(key) === "" || this.element.getAttribute(key) === "true" ? false : true;
                this.setProperties({ enabled: isEnabled }, !isDynamic);
              }
              break;
            case "value":
              if (isNullOrUndefined(this.maskOptions) || this.maskOptions["value"] === void 0 || isDynamic) {
                this.setProperties({ value: this.element.value }, !isDynamic);
              }
              break;
            case "readonly":
              if (isNullOrUndefined(this.maskOptions) || this.maskOptions["readonly"] === void 0 || isDynamic) {
                var isReadonly = this.element.getAttribute(key) === "readonly" || this.element.getAttribute(key) === "" || this.element.getAttribute(key) === "true" ? true : false;
                this.setProperties({ readonly: isReadonly }, !isDynamic);
              }
              break;
          }
        }
      }
    };
    MaskedTextBox2.prototype.createWrapper = function() {
      var updatedCssClassValues = this.cssClass;
      if (!isNullOrUndefined(this.cssClass) && this.cssClass !== "") {
        updatedCssClassValues = this.getValidClassList(this.cssClass);
      }
      this.inputObj = Input.createInput({
        element: this.element,
        floatLabelType: this.floatLabelType,
        properties: {
          enableRtl: this.enableRtl,
          cssClass: updatedCssClassValues,
          enabled: this.enabled,
          readonly: this.readonly,
          placeholder: this.placeholder,
          showClearButton: this.showClearButton
        }
      }, this.createElement);
      this.inputObj.container.setAttribute("class", ROOT2 + " " + this.inputObj.container.getAttribute("class"));
    };
    MaskedTextBox2.prototype.onPropertyChanged = function(newProp, oldProp) {
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "value":
            setMaskValue.call(this, this.value);
            if (this.placeholder && !this.isFocus) {
              this.setMaskPlaceholder(false, false);
            }
            if (this.value === "") {
              this.element.selectionStart = 0;
              this.element.selectionEnd = 0;
            }
            break;
          case "placeholder":
            this.setMaskPlaceholder(true, true);
            break;
          case "width":
            this.setWidth(newProp.width);
            Input.calculateWidth(this.element, this.inputObj.container);
            break;
          case "cssClass":
            this.updateCssClass(newProp.cssClass, oldProp.cssClass);
            break;
          case "enabled":
            Input.setEnabled(newProp.enabled, this.element, this.floatLabelType, this.inputObj.container);
            break;
          case "readonly":
            Input.setReadonly(newProp.readonly, this.element);
            break;
          case "enableRtl":
            Input.setEnableRtl(newProp.enableRtl, [this.inputObj.container]);
            break;
          case "customCharacters":
            this.customCharacters = newProp.customCharacters;
            this.resetMaskedTextBox();
            break;
          case "showClearButton":
            Input.setClearButton(newProp.showClearButton, this.element, this.inputObj, void 0, this.createElement);
            bindClearEvent.call(this);
            break;
          case "floatLabelType":
            this.floatLabelType = newProp.floatLabelType;
            Input.removeFloating(this.inputObj);
            Input.addFloating(this.element, this.floatLabelType, this.placeholder, this.createElement);
            break;
          case "htmlAttributes":
            this.updateHTMLAttrToElement();
            this.updateHTMLAttrToWrapper();
            this.checkHtmlAttributes(true);
            break;
          case "mask":
            {
              var strippedValue_1 = this.value;
              this.mask = newProp.mask;
              this.updateValue(strippedValue_1);
            }
            break;
          case "promptChar": {
            if (newProp.promptChar.length > 1) {
              newProp.promptChar = newProp.promptChar[0];
            }
            if (newProp.promptChar) {
              this.promptChar = newProp.promptChar;
            } else {
              this.promptChar = "_";
            }
            var value = this.element.value.replace(new RegExp("[" + oldProp.promptChar + "]", "g"), this.promptChar);
            if (this.promptMask === this.element.value) {
              value = this.promptMask.replace(new RegExp("[" + oldProp.promptChar + "]", "g"), this.promptChar);
            }
            this.promptMask = this.promptMask.replace(new RegExp("[" + oldProp.promptChar + "]", "g"), this.promptChar);
            this.undoCollec = this.redoCollec = [];
            setElementValue.call(this, value);
            break;
          }
        }
      }
      this.preventChange = this.isAngular && this.preventChange ? !this.preventChange : this.preventChange;
    };
    MaskedTextBox2.prototype.updateValue = function(strippedVal) {
      this.resetMaskedTextBox();
      setMaskValue.call(this, strippedVal);
    };
    MaskedTextBox2.prototype.getMaskedValue = function() {
      return unstrippedValue.call(this, this.element);
    };
    MaskedTextBox2.prototype.focusIn = function() {
      if (document.activeElement !== this.element && this.enabled) {
        this.isFocus = true;
        this.element.focus();
        addClass([this.inputObj.container], [MASKINPUT_FOCUS]);
      }
    };
    MaskedTextBox2.prototype.focusOut = function() {
      if (document.activeElement === this.element && this.enabled) {
        this.isFocus = false;
        this.element.blur();
        removeClass([this.inputObj.container], [MASKINPUT_FOCUS]);
      }
    };
    MaskedTextBox2.prototype.destroy = function() {
      unwireEvents.call(this);
      var attrArray = [
        "aria-labelledby",
        "role",
        "autocomplete",
        "aria-readonly",
        "aria-disabled",
        "autocapitalize",
        "spellcheck",
        "aria-autocomplete",
        "aria-live",
        "aria-invalid"
      ];
      for (var i = 0; i < attrArray.length; i++) {
        this.element.removeAttribute(attrArray[i]);
      }
      this.element.classList.remove("e-input");
      if (this.inputObj) {
        this.inputObj.container.insertAdjacentElement("afterend", this.element);
        detach(this.inputObj.container);
      }
      this.blurEventArgs = null;
      Input.destroy();
      this.changeEventArgs = null;
      this.inputObj = null;
      _super.prototype.destroy.call(this);
    };
    __decorate2([
      Property(null)
    ], MaskedTextBox2.prototype, "cssClass", void 0);
    __decorate2([
      Property(null)
    ], MaskedTextBox2.prototype, "width", void 0);
    __decorate2([
      Property(null)
    ], MaskedTextBox2.prototype, "placeholder", void 0);
    __decorate2([
      Property("Never")
    ], MaskedTextBox2.prototype, "floatLabelType", void 0);
    __decorate2([
      Property({})
    ], MaskedTextBox2.prototype, "htmlAttributes", void 0);
    __decorate2([
      Property(true)
    ], MaskedTextBox2.prototype, "enabled", void 0);
    __decorate2([
      Property(false)
    ], MaskedTextBox2.prototype, "readonly", void 0);
    __decorate2([
      Property(false)
    ], MaskedTextBox2.prototype, "showClearButton", void 0);
    __decorate2([
      Property(false)
    ], MaskedTextBox2.prototype, "enablePersistence", void 0);
    __decorate2([
      Property(null)
    ], MaskedTextBox2.prototype, "mask", void 0);
    __decorate2([
      Property("_")
    ], MaskedTextBox2.prototype, "promptChar", void 0);
    __decorate2([
      Property(null)
    ], MaskedTextBox2.prototype, "value", void 0);
    __decorate2([
      Property(null)
    ], MaskedTextBox2.prototype, "customCharacters", void 0);
    __decorate2([
      Event()
    ], MaskedTextBox2.prototype, "created", void 0);
    __decorate2([
      Event()
    ], MaskedTextBox2.prototype, "destroyed", void 0);
    __decorate2([
      Event()
    ], MaskedTextBox2.prototype, "change", void 0);
    __decorate2([
      Event()
    ], MaskedTextBox2.prototype, "focus", void 0);
    __decorate2([
      Event()
    ], MaskedTextBox2.prototype, "blur", void 0);
    MaskedTextBox2 = __decorate2([
      NotifyPropertyChanges
    ], MaskedTextBox2);
    return MaskedTextBox2;
  }(Component)
);

// node_modules/@syncfusion/ej2-popups/src/common/position.js
var elementRect;
var popupRect;
var element;
var parentDocument;
var fixedParent = false;
function calculateRelativeBasedPosition(anchor, element2) {
  var fixedElement = false;
  var anchorPos = { left: 0, top: 0 };
  var tempAnchor = anchor;
  if (!anchor || !element2) {
    return anchorPos;
  }
  if (isNullOrUndefined(element2.offsetParent) && element2.style.position === "fixed") {
    fixedElement = true;
  }
  while ((element2.offsetParent || fixedElement) && anchor && element2.offsetParent !== anchor) {
    anchorPos.left += anchor.offsetLeft;
    anchorPos.top += anchor.offsetTop;
    anchor = anchor.offsetParent;
  }
  anchor = tempAnchor;
  while ((element2.offsetParent || fixedElement) && anchor && element2.offsetParent !== anchor) {
    anchorPos.left -= anchor.scrollLeft;
    anchorPos.top -= anchor.scrollTop;
    anchor = anchor.parentElement;
  }
  return anchorPos;
}
function calculatePosition(currentElement, positionX, positionY, parentElement, targetValues) {
  popupRect = void 0;
  popupRect = targetValues;
  fixedParent = parentElement ? true : false;
  if (!currentElement) {
    return { left: 0, top: 0 };
  }
  if (!positionX) {
    positionX = "left";
  }
  if (!positionY) {
    positionY = "top";
  }
  parentDocument = currentElement.ownerDocument;
  element = currentElement;
  var pos = { left: 0, top: 0 };
  return updatePosition(positionX.toLowerCase(), positionY.toLowerCase(), pos);
}
function setPosx(value, pos) {
  pos.left = value;
}
function setPosy(value, pos) {
  pos.top = value;
}
function updatePosition(posX, posY, pos) {
  elementRect = element.getBoundingClientRect();
  switch (posY + posX) {
    case "topcenter":
      setPosx(getElementHCenter(), pos);
      setPosy(getElementTop(), pos);
      break;
    case "topright":
      setPosx(getElementRight(), pos);
      setPosy(getElementTop(), pos);
      break;
    case "centercenter":
      setPosx(getElementHCenter(), pos);
      setPosy(getElementVCenter(), pos);
      break;
    case "centerright":
      setPosx(getElementRight(), pos);
      setPosy(getElementVCenter(), pos);
      break;
    case "centerleft":
      setPosx(getElementLeft(), pos);
      setPosy(getElementVCenter(), pos);
      break;
    case "bottomcenter":
      setPosx(getElementHCenter(), pos);
      setPosy(getElementBottom(), pos);
      break;
    case "bottomright":
      setPosx(getElementRight(), pos);
      setPosy(getElementBottom(), pos);
      break;
    case "bottomleft":
      setPosx(getElementLeft(), pos);
      setPosy(getElementBottom(), pos);
      break;
    default:
    case "topleft":
      setPosx(getElementLeft(), pos);
      setPosy(getElementTop(), pos);
      break;
  }
  element = null;
  return pos;
}
function getBodyScrollTop() {
  return parentDocument.documentElement.scrollTop || parentDocument.body.scrollTop;
}
function getBodyScrollLeft() {
  return parentDocument.documentElement.scrollLeft || parentDocument.body.scrollLeft;
}
function getElementBottom() {
  return fixedParent ? elementRect.bottom : elementRect.bottom + getBodyScrollTop();
}
function getElementVCenter() {
  return getElementTop() + elementRect.height / 2;
}
function getElementTop() {
  return fixedParent ? elementRect.top : elementRect.top + getBodyScrollTop();
}
function getElementLeft() {
  return elementRect.left + getBodyScrollLeft();
}
function getElementRight() {
  var popupWidth = element && (element.classList.contains("e-date-wrapper") || element.classList.contains("e-datetime-wrapper") || element.classList.contains("e-date-range-wrapper") || element.classList.contains("e-multiselect")) ? popupRect ? popupRect.width : 0 : popupRect && elementRect.width >= popupRect.width ? popupRect.width : 0;
  return elementRect.right + getBodyScrollLeft() - popupWidth;
}
function getElementHCenter() {
  return getElementLeft() + elementRect.width / 2;
}

// node_modules/@syncfusion/ej2-popups/src/common/collision.js
var parentDocument2;
var targetContainer;
function fit(element2, viewPortElement, axis, position) {
  if (viewPortElement === void 0) {
    viewPortElement = null;
  }
  if (axis === void 0) {
    axis = { X: false, Y: false };
  }
  if (!axis.Y && !axis.X) {
    return { left: 0, top: 0 };
  }
  var elemData = element2.getBoundingClientRect();
  targetContainer = viewPortElement;
  parentDocument2 = element2.ownerDocument;
  if (!position) {
    position = calculatePosition(element2, "left", "top");
  }
  if (axis.X) {
    var containerWidth = targetContainer ? getTargetContainerWidth() : getViewPortWidth();
    var containerLeft = ContainerLeft();
    var containerRight = ContainerRight();
    var overLeft = containerLeft - position.left;
    var overRight = position.left + elemData.width - containerRight;
    if (elemData.width > containerWidth) {
      if (overLeft > 0 && overRight <= 0) {
        position.left = containerRight - elemData.width;
      } else if (overRight > 0 && overLeft <= 0) {
        position.left = containerLeft;
      } else {
        position.left = overLeft > overRight ? containerRight - elemData.width : containerLeft;
      }
    } else if (overLeft > 0) {
      position.left += overLeft;
    } else if (overRight > 0) {
      position.left -= overRight;
    }
  }
  if (axis.Y) {
    var containerHeight = targetContainer ? getTargetContainerHeight() : getViewPortHeight();
    var containerTop = ContainerTop();
    var containerBottom = ContainerBottom();
    var overTop = containerTop - position.top;
    var overBottom = position.top + elemData.height - containerBottom;
    if (elemData.height > containerHeight) {
      if (overTop > 0 && overBottom <= 0) {
        position.top = containerBottom - elemData.height;
      } else if (overBottom > 0 && overTop <= 0) {
        position.top = containerTop;
      } else {
        position.top = overTop > overBottom ? containerBottom - elemData.height : containerTop;
      }
    } else if (overTop > 0) {
      position.top += overTop;
    } else if (overBottom > 0) {
      position.top -= overBottom;
    }
  }
  return position;
}
function isCollide(element2, viewPortElement, x, y) {
  if (viewPortElement === void 0) {
    viewPortElement = null;
  }
  var elemOffset = calculatePosition(element2, "left", "top");
  if (x) {
    elemOffset.left = x;
  }
  if (y) {
    elemOffset.top = y;
  }
  var data = [];
  targetContainer = viewPortElement;
  parentDocument2 = element2.ownerDocument;
  var elementRect2 = element2.getBoundingClientRect();
  var top = elemOffset.top;
  var left = elemOffset.left;
  var right = elemOffset.left + elementRect2.width;
  var bottom = elemOffset.top + elementRect2.height;
  var topData = "", leftData = "";
  var yAxis = topCollideCheck(top, bottom);
  var xAxis = leftCollideCheck(left, right);
  if (yAxis.topSide) {
    data.push("top");
  }
  if (xAxis.rightSide) {
    data.push("right");
  }
  if (xAxis.leftSide) {
    data.push("left");
  }
  if (yAxis.bottomSide) {
    data.push("bottom");
  }
  return data;
}
function flip(element2, target, offsetX, offsetY, positionX, positionY, viewPortElement, axis, fixedParent2) {
  if (viewPortElement === void 0) {
    viewPortElement = null;
  }
  if (axis === void 0) {
    axis = { X: true, Y: true };
  }
  if (!target || !element2 || !positionX || !positionY || !axis.X && !axis.Y) {
    return;
  }
  var tEdge = {
    TL: null,
    TR: null,
    BL: null,
    BR: null
  }, eEdge = {
    TL: null,
    TR: null,
    BL: null,
    BR: null
    /* eslint-enable */
  };
  var elementRect2;
  if (window.getComputedStyle(element2).display === "none") {
    var oldVisibility = element2.style.visibility;
    element2.style.visibility = "hidden";
    element2.style.display = "block";
    elementRect2 = element2.getBoundingClientRect();
    element2.style.removeProperty("display");
    element2.style.visibility = oldVisibility;
  } else {
    elementRect2 = element2.getBoundingClientRect();
  }
  var pos = {
    posX: positionX,
    posY: positionY,
    offsetX,
    offsetY,
    position: { left: 0, top: 0 }
  };
  targetContainer = viewPortElement;
  parentDocument2 = target.ownerDocument;
  updateElementData(target, tEdge, pos, fixedParent2, elementRect2);
  setPosition(eEdge, pos, elementRect2);
  if (axis.X) {
    leftFlip(target, eEdge, tEdge, pos, elementRect2, true);
  }
  if (axis.Y && tEdge.TL.top > -1) {
    topFlip(target, eEdge, tEdge, pos, elementRect2, true);
  }
  setPopup(element2, pos, elementRect2);
}
function setPopup(element2, pos, elementRect2) {
  var left = 0, top = 0;
  if (element2.offsetParent != null && (getComputedStyle(element2.offsetParent).position === "absolute" || getComputedStyle(element2.offsetParent).position === "relative")) {
    var data = calculatePosition(element2.offsetParent, "left", "top", false, elementRect2);
    left = data.left;
    top = data.top;
  }
  var scaleX = 1;
  var scaleY = 1;
  if (element2.offsetParent) {
    var transformStyle = getComputedStyle(element2.offsetParent).transform;
    if (transformStyle !== "none") {
      var matrix = new DOMMatrix(transformStyle);
      scaleX = matrix.a;
      scaleY = matrix.d;
    }
  }
  element2.style.top = pos.position.top / scaleY + pos.offsetY - top + "px";
  element2.style.left = pos.position.left / scaleX + pos.offsetX - left + "px";
}
function updateElementData(target, edge, pos, fixedParent2, elementRect2) {
  pos.position = calculatePosition(target, pos.posX, pos.posY, fixedParent2, elementRect2);
  edge.TL = calculatePosition(target, "left", "top", fixedParent2, elementRect2);
  edge.TR = calculatePosition(target, "right", "top", fixedParent2, elementRect2);
  edge.BR = calculatePosition(target, "left", "bottom", fixedParent2, elementRect2);
  edge.BL = calculatePosition(target, "right", "bottom", fixedParent2, elementRect2);
}
function setPosition(eStatus, pos, elementRect2) {
  eStatus.TL = { top: pos.position.top + pos.offsetY, left: pos.position.left + pos.offsetX };
  eStatus.TR = { top: eStatus.TL.top, left: eStatus.TL.left + elementRect2.width };
  eStatus.BL = {
    top: eStatus.TL.top + elementRect2.height,
    left: eStatus.TL.left
  };
  eStatus.BR = {
    top: eStatus.TL.top + elementRect2.height,
    left: eStatus.TL.left + elementRect2.width
  };
}
function leftCollideCheck(left, right) {
  var leftSide = false, rightSide = false;
  if (left - getBodyScrollLeft2() < ContainerLeft()) {
    leftSide = true;
  }
  if (right > ContainerRight()) {
    rightSide = true;
  }
  return { leftSide, rightSide };
}
function leftFlip(target, edge, tEdge, pos, elementRect2, deepCheck) {
  var collideSide = leftCollideCheck(edge.TL.left, edge.TR.left);
  if (tEdge.TL.left - getBodyScrollLeft2() <= ContainerLeft()) {
    collideSide.leftSide = false;
  }
  if (tEdge.TR.left > ContainerRight()) {
    collideSide.rightSide = false;
  }
  if (collideSide.leftSide && !collideSide.rightSide || !collideSide.leftSide && collideSide.rightSide) {
    if (pos.posX === "right") {
      pos.posX = "left";
    } else {
      pos.posX = "right";
    }
    pos.offsetX = pos.offsetX + elementRect2.width;
    pos.offsetX = -1 * pos.offsetX;
    pos.position = calculatePosition(target, pos.posX, pos.posY, false);
    setPosition(edge, pos, elementRect2);
    if (deepCheck) {
      leftFlip(target, edge, tEdge, pos, elementRect2, false);
    }
  }
}
function topFlip(target, edge, tEdge, pos, elementRect2, deepCheck) {
  var collideSide = topCollideCheck(edge.TL.top, edge.BL.top);
  if (tEdge.TL.top - getBodyScrollTop2() <= ContainerTop()) {
    collideSide.topSide = false;
  }
  if (tEdge.BL.top >= ContainerBottom() && target.getBoundingClientRect().bottom < window.innerHeight) {
    collideSide.bottomSide = false;
  }
  if (collideSide.topSide && !collideSide.bottomSide || !collideSide.topSide && collideSide.bottomSide) {
    if (pos.posY === "top") {
      pos.posY = "bottom";
    } else {
      pos.posY = "top";
    }
    pos.offsetY = pos.offsetY + elementRect2.height;
    pos.offsetY = -1 * pos.offsetY;
    pos.position = calculatePosition(target, pos.posX, pos.posY, false, elementRect2);
    setPosition(edge, pos, elementRect2);
    if (deepCheck) {
      topFlip(target, edge, tEdge, pos, elementRect2, false);
    }
  }
}
function topCollideCheck(top, bottom) {
  var topSide = false, bottomSide = false;
  if (top - getBodyScrollTop2() < ContainerTop()) {
    topSide = true;
  }
  if (bottom > ContainerBottom()) {
    bottomSide = true;
  }
  return { topSide, bottomSide };
}
function getTargetContainerWidth() {
  return targetContainer.getBoundingClientRect().width;
}
function getTargetContainerHeight() {
  return targetContainer.getBoundingClientRect().height;
}
function getTargetContainerLeft() {
  return targetContainer.getBoundingClientRect().left;
}
function getTargetContainerTop() {
  return targetContainer.getBoundingClientRect().top;
}
function ContainerTop() {
  if (targetContainer) {
    return getTargetContainerTop();
  }
  return 0;
}
function ContainerLeft() {
  if (targetContainer) {
    return getTargetContainerLeft();
  }
  return 0;
}
function ContainerRight() {
  if (targetContainer) {
    return getBodyScrollLeft2() + getTargetContainerLeft() + getTargetContainerWidth();
  }
  return getBodyScrollLeft2() + getViewPortWidth();
}
function ContainerBottom() {
  if (targetContainer) {
    return getBodyScrollTop2() + getTargetContainerTop() + getTargetContainerHeight();
  }
  return getBodyScrollTop2() + getViewPortHeight();
}
function getBodyScrollTop2() {
  return parentDocument2.documentElement.scrollTop || parentDocument2.body.scrollTop;
}
function getBodyScrollLeft2() {
  return parentDocument2.documentElement.scrollLeft || parentDocument2.body.scrollLeft;
}
function getViewPortHeight() {
  return window.innerHeight;
}
function getViewPortWidth() {
  var windowWidth = window.innerWidth;
  var documentReact = document.documentElement.getBoundingClientRect();
  var offsetWidth = isNullOrUndefined(document.documentElement) ? 0 : documentReact.width;
  return windowWidth - (windowWidth - offsetWidth);
}

// node_modules/@syncfusion/ej2-popups/src/popup/popup.js
var __extends3 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate3 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PositionData = (
  /** @class */
  function(_super) {
    __extends3(PositionData2, _super);
    function PositionData2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate3([
      Property("left")
    ], PositionData2.prototype, "X", void 0);
    __decorate3([
      Property("top")
    ], PositionData2.prototype, "Y", void 0);
    return PositionData2;
  }(ChildProperty)
);
var CLASSNAMES2 = {
  ROOT: "e-popup",
  RTL: "e-rtl",
  OPEN: "e-popup-open",
  CLOSE: "e-popup-close"
};
var Popup = (
  /** @class */
  function(_super) {
    __extends3(Popup2, _super);
    function Popup2(element2, options) {
      return _super.call(this, options, element2) || this;
    }
    Popup2.prototype.onPropertyChanged = function(newProp, oldProp) {
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "width":
            setStyleAttribute(this.element, { "width": formatUnit(newProp.width) });
            break;
          case "height":
            setStyleAttribute(this.element, { "height": formatUnit(newProp.height) });
            break;
          case "zIndex":
            setStyleAttribute(this.element, { "zIndex": newProp.zIndex });
            break;
          case "enableRtl":
            this.setEnableRtl();
            break;
          case "position":
          case "relateTo":
            this.refreshPosition();
            break;
          case "offsetX":
            var x = newProp.offsetX - oldProp.offsetX;
            this.element.style.left = (parseInt(this.element.style.left, 10) + x).toString() + "px";
            break;
          case "offsetY":
            var y = newProp.offsetY - oldProp.offsetY;
            this.element.style.top = (parseInt(this.element.style.top, 10) + y).toString() + "px";
            break;
          case "content":
            this.setContent();
            break;
          case "actionOnScroll":
            if (newProp.actionOnScroll !== "none") {
              this.wireScrollEvents();
            } else {
              this.unwireScrollEvents();
            }
            break;
        }
      }
    };
    Popup2.prototype.getModuleName = function() {
      return "popup";
    };
    Popup2.prototype.resolveCollision = function() {
      this.checkCollision();
    };
    Popup2.prototype.getPersistData = function() {
      return this.addOnPersist([]);
    };
    Popup2.prototype.destroy = function() {
      if (this.element.classList.contains("e-popup-open")) {
        this.unwireEvents();
      }
      this.element.classList.remove(CLASSNAMES2.ROOT, CLASSNAMES2.RTL, CLASSNAMES2.OPEN, CLASSNAMES2.CLOSE);
      this.content = null;
      this.relateTo = null;
      _super.prototype.destroy.call(this);
    };
    Popup2.prototype.render = function() {
      this.element.classList.add(CLASSNAMES2.ROOT);
      var styles = {};
      if (this.zIndex !== 1e3) {
        styles.zIndex = this.zIndex;
      }
      if (this.width !== "auto") {
        styles.width = formatUnit(this.width);
      }
      if (this.height !== "auto") {
        styles.height = formatUnit(this.height);
      }
      setStyleAttribute(this.element, styles);
      this.fixedParent = false;
      this.setEnableRtl();
      this.setContent();
    };
    Popup2.prototype.wireEvents = function() {
      if (Browser.isDevice) {
        EventHandler.add(window, "orientationchange", this.orientationOnChange, this);
      }
      if (this.actionOnScroll !== "none") {
        this.wireScrollEvents();
      }
    };
    Popup2.prototype.wireScrollEvents = function() {
      if (this.getRelateToElement()) {
        for (var _i = 0, _a = this.getScrollableParent(this.getRelateToElement()); _i < _a.length; _i++) {
          var parent_1 = _a[_i];
          EventHandler.add(parent_1, "scroll", this.scrollRefresh, this);
        }
      }
    };
    Popup2.prototype.unwireEvents = function() {
      if (Browser.isDevice) {
        EventHandler.remove(window, "orientationchange", this.orientationOnChange);
      }
      if (this.actionOnScroll !== "none") {
        this.unwireScrollEvents();
      }
    };
    Popup2.prototype.unwireScrollEvents = function() {
      if (this.getRelateToElement()) {
        for (var _i = 0, _a = this.getScrollableParent(this.getRelateToElement()); _i < _a.length; _i++) {
          var parent_2 = _a[_i];
          EventHandler.remove(parent_2, "scroll", this.scrollRefresh);
        }
      }
    };
    Popup2.prototype.getRelateToElement = function() {
      var relateToElement = this.relateTo === "" || isNullOrUndefined(this.relateTo) ? document.body : this.relateTo;
      this.setProperties({ relateTo: relateToElement }, true);
      return typeof this.relateTo === "string" ? document.querySelector(this.relateTo) : this.relateTo;
    };
    Popup2.prototype.scrollRefresh = function(e) {
      if (this.actionOnScroll === "reposition") {
        if (!isNullOrUndefined(this.element) && !(this.element.offsetParent === e.target || this.element.offsetParent && this.element.offsetParent.tagName === "BODY" && e.target.parentElement == null)) {
          this.refreshPosition();
        }
      } else if (this.actionOnScroll === "hide") {
        this.hide();
      }
      if (this.actionOnScroll !== "none") {
        if (this.getRelateToElement()) {
          var targetVisible = this.isElementOnViewport(this.getRelateToElement(), e.target);
          if (!targetVisible && !this.targetInvisibleStatus) {
            this.trigger("targetExitViewport");
            this.targetInvisibleStatus = true;
          } else if (targetVisible) {
            this.targetInvisibleStatus = false;
          }
        }
      }
    };
    Popup2.prototype.isElementOnViewport = function(relateToElement, scrollElement) {
      var scrollParents = this.getScrollableParent(relateToElement);
      for (var parent_3 = 0; parent_3 < scrollParents.length; parent_3++) {
        if (this.isElementVisible(relateToElement, scrollParents[parent_3])) {
          continue;
        } else {
          return false;
        }
      }
      return true;
    };
    Popup2.prototype.isElementVisible = function(relateToElement, scrollElement) {
      var rect = this.checkGetBoundingClientRect(relateToElement);
      if (!rect.height || !rect.width) {
        return false;
      }
      if (!isNullOrUndefined(this.checkGetBoundingClientRect(scrollElement))) {
        var parent_4 = scrollElement.getBoundingClientRect();
        return !(rect.bottom < parent_4.top) && (!(rect.bottom > parent_4.bottom) && (!(rect.right > parent_4.right) && !(rect.left < parent_4.left)));
      } else {
        var win = window;
        var windowView = {
          top: win.scrollY,
          left: win.scrollX,
          right: win.scrollX + win.outerWidth,
          bottom: win.scrollY + win.outerHeight
        };
        var off = calculatePosition(relateToElement);
        var ele = {
          top: off.top,
          left: off.left,
          right: off.left + rect.width,
          bottom: off.top + rect.height
        };
        var elementView = {
          top: windowView.bottom - ele.top,
          left: windowView.right - ele.left,
          bottom: ele.bottom - windowView.top,
          right: ele.right - windowView.left
        };
        return elementView.top > 0 && elementView.left > 0 && elementView.right > 0 && elementView.bottom > 0;
      }
    };
    Popup2.prototype.preRender = function() {
    };
    Popup2.prototype.setEnableRtl = function() {
      this.reposition();
      this.enableRtl ? this.element.classList.add(CLASSNAMES2.RTL) : this.element.classList.remove(CLASSNAMES2.RTL);
    };
    Popup2.prototype.setContent = function() {
      if (!isNullOrUndefined(this.content)) {
        this.element.innerHTML = "";
        if (typeof this.content === "string") {
          this.element.textContent = this.content;
        } else {
          var relateToElem = this.getRelateToElement();
          var props = this.content.props;
          if (!relateToElem.classList.contains("e-dropdown-btn") || isNullOrUndefined(props)) {
            this.element.appendChild(this.content);
          }
        }
      }
    };
    Popup2.prototype.orientationOnChange = function() {
      var _this = this;
      setTimeout(function() {
        _this.refreshPosition();
      }, 200);
    };
    Popup2.prototype.refreshPosition = function(target, collision) {
      if (!isNullOrUndefined(target)) {
        this.checkFixedParent(target);
      }
      this.reposition();
      if (!collision) {
        this.checkCollision();
      }
    };
    Popup2.prototype.reposition = function() {
      var pos;
      var position;
      var relateToElement = this.getRelateToElement();
      if (typeof this.position.X === "number" && typeof this.position.Y === "number") {
        pos = { left: this.position.X, top: this.position.Y };
      } else if (typeof this.position.X === "string" && typeof this.position.Y === "number" || typeof this.position.X === "number" && typeof this.position.Y === "string") {
        var parentDisplay = void 0;
        var display = this.element.style.display;
        this.element.style.display = "block";
        if (this.element.classList.contains("e-dlg-modal")) {
          parentDisplay = this.element.parentElement.style.display;
          this.element.parentElement.style.display = "block";
        }
        position = this.getAnchorPosition(relateToElement, this.element, this.position, this.offsetX, this.offsetY);
        if (typeof this.position.X === "string") {
          pos = { left: position.left, top: this.position.Y };
        } else {
          pos = { left: this.position.X, top: position.top };
        }
        this.element.style.display = display;
        if (this.element.classList.contains("e-dlg-modal")) {
          this.element.parentElement.style.display = parentDisplay;
        }
      } else if (relateToElement) {
        var height = this.element.clientHeight;
        var display = this.element.style.display;
        this.element.style.display = "block";
        pos = this.getAnchorPosition(relateToElement, this.element, this.position, this.offsetX, this.offsetY, height);
        this.element.style.display = display;
      } else {
        pos = { left: 0, top: 0 };
      }
      if (!isNullOrUndefined(pos)) {
        this.element.style.left = pos.left + "px";
        this.element.style.top = pos.top + "px";
      }
    };
    Popup2.prototype.checkGetBoundingClientRect = function(ele) {
      var eleRect;
      try {
        eleRect = ele.getBoundingClientRect();
        return eleRect;
      } catch (error) {
        return null;
      }
    };
    Popup2.prototype.getAnchorPosition = function(anchorEle, ele, position, offsetX, offsetY, height) {
      if (height === void 0) {
        height = 0;
      }
      var eleRect = this.checkGetBoundingClientRect(ele);
      var anchorRect = this.checkGetBoundingClientRect(anchorEle);
      if (isNullOrUndefined(eleRect) || isNullOrUndefined(anchorRect)) {
        return null;
      }
      var anchor = anchorEle;
      var anchorPos = { left: 0, top: 0 };
      if (ele.offsetParent && ele.offsetParent.tagName === "BODY" && anchorEle.tagName === "BODY") {
        anchorPos = calculatePosition(anchorEle);
      } else {
        if (ele.classList.contains("e-dlg-modal") && anchor.tagName !== "BODY") {
          ele = ele.parentElement;
        }
        anchorPos = calculateRelativeBasedPosition(anchor, ele);
      }
      switch (position.X) {
        default:
        case "left":
          break;
        case "center":
          if (ele.classList.contains("e-dlg-modal") && anchor.tagName === "BODY" && this.targetType === "container") {
            anchorPos.left += window.innerWidth / 2 - eleRect.width / 2;
          } else if (this.targetType === "container") {
            anchorPos.left += anchorRect.width / 2 - eleRect.width / 2;
          } else {
            anchorPos.left += anchorRect.width / 2;
          }
          break;
        case "right":
          if (ele.classList.contains("e-dlg-modal") && anchor.tagName === "BODY" && this.targetType === "container") {
            anchorPos.left += window.innerWidth - eleRect.width;
          } else if (this.targetType === "container") {
            anchorPos.left += anchorRect.width - eleRect.width;
          } else {
            anchorPos.left += anchorRect.width;
          }
          break;
      }
      switch (position.Y) {
        default:
        case "top":
          break;
        case "center":
          if (ele.classList.contains("e-dlg-modal") && anchor.tagName === "BODY" && this.targetType === "container") {
            anchorPos.top += window.innerHeight / 2 - eleRect.height / 2;
          } else if (this.targetType === "container") {
            anchorPos.top += anchorRect.height / 2 - eleRect.height / 2;
          } else {
            anchorPos.top += anchorRect.height / 2;
          }
          break;
        case "bottom":
          if (ele.classList.contains("e-dlg-modal") && anchor.tagName === "BODY" && this.targetType === "container") {
            anchorPos.top += window.innerHeight - eleRect.height;
          } else if (this.targetType === "container" && !ele.classList.contains("e-dialog")) {
            anchorPos.top += anchorRect.height - eleRect.height;
          } else if (this.targetType === "container" && ele.classList.contains("e-dialog")) {
            anchorPos.top += anchorRect.height - height;
          } else {
            anchorPos.top += anchorRect.height;
          }
          break;
      }
      anchorPos.left += offsetX;
      anchorPos.top += offsetY;
      return anchorPos;
    };
    Popup2.prototype.callFlip = function(param) {
      var relateToElement = this.getRelateToElement();
      flip(this.element, relateToElement, this.offsetX, this.offsetY, this.position.X, this.position.Y, this.viewPortElement, param, this.fixedParent);
    };
    Popup2.prototype.callFit = function(param) {
      if (isCollide(this.element, this.viewPortElement).length !== 0) {
        if (isNullOrUndefined(this.viewPortElement)) {
          var data = fit(this.element, this.viewPortElement, param);
          if (param.X) {
            this.element.style.left = data.left + "px";
          }
          if (param.Y) {
            this.element.style.top = data.top + "px";
          }
        } else {
          var elementRect2 = this.checkGetBoundingClientRect(this.element);
          var viewPortRect = this.checkGetBoundingClientRect(this.viewPortElement);
          if (isNullOrUndefined(elementRect2) || isNullOrUndefined(viewPortRect)) {
            return null;
          }
          if (param && param.Y === true) {
            if (viewPortRect.top > elementRect2.top) {
              this.element.style.top = "0px";
            } else if (viewPortRect.bottom < elementRect2.bottom) {
              this.element.style.top = parseInt(this.element.style.top, 10) - (elementRect2.bottom - viewPortRect.bottom) + "px";
            }
          }
          if (param && param.X === true) {
            if (viewPortRect.right < elementRect2.right) {
              this.element.style.left = parseInt(this.element.style.left, 10) - (elementRect2.right - viewPortRect.right) + "px";
            } else if (viewPortRect.left > elementRect2.left) {
              this.element.style.left = parseInt(this.element.style.left, 10) + (viewPortRect.left - elementRect2.left) + "px";
            }
          }
        }
      }
    };
    Popup2.prototype.checkCollision = function() {
      var horz = this.collision.X;
      var vert = this.collision.Y;
      if (horz === "none" && vert === "none") {
        return;
      }
      if (horz === "flip" && vert === "flip") {
        this.callFlip({ X: true, Y: true });
      } else if (horz === "fit" && vert === "fit") {
        this.callFit({ X: true, Y: true });
      } else {
        if (horz === "flip") {
          this.callFlip({ X: true, Y: false });
        } else if (vert === "flip") {
          this.callFlip({ Y: true, X: false });
        }
        if (horz === "fit") {
          this.callFit({ X: true, Y: false });
        } else if (vert === "fit") {
          this.callFit({ X: false, Y: true });
        }
      }
    };
    Popup2.prototype.show = function(animationOptions, relativeElement) {
      var _this = this;
      var relateToElement = this.getRelateToElement();
      if (relateToElement.classList.contains("e-filemanager")) {
        this.fmDialogContainer = this.element.getElementsByClassName("e-file-select-wrap")[0];
      }
      this.wireEvents();
      if (!isNullOrUndefined(this.fmDialogContainer) && Browser.isIos) {
        this.fmDialogContainer.style.display = "block";
      }
      if (this.zIndex === 1e3 || !isNullOrUndefined(relativeElement)) {
        var zIndexElement = isNullOrUndefined(relativeElement) ? this.element : relativeElement;
        this.zIndex = getZindexPartial(zIndexElement);
        setStyleAttribute(this.element, { "zIndex": this.zIndex });
      }
      animationOptions = !isNullOrUndefined(animationOptions) && typeof animationOptions === "object" ? animationOptions : this.showAnimation;
      if (this.collision.X !== "none" || this.collision.Y !== "none") {
        removeClass([this.element], CLASSNAMES2.CLOSE);
        addClass([this.element], CLASSNAMES2.OPEN);
        this.checkCollision();
        removeClass([this.element], CLASSNAMES2.OPEN);
        addClass([this.element], CLASSNAMES2.CLOSE);
      }
      if (!isNullOrUndefined(animationOptions)) {
        animationOptions.begin = function() {
          if (!_this.isDestroyed) {
            removeClass([_this.element], CLASSNAMES2.CLOSE);
            addClass([_this.element], CLASSNAMES2.OPEN);
          }
        };
        animationOptions.end = function() {
          if (!_this.isDestroyed) {
            _this.trigger("open");
          }
        };
        new Animation(animationOptions).animate(this.element);
      } else {
        removeClass([this.element], CLASSNAMES2.CLOSE);
        addClass([this.element], CLASSNAMES2.OPEN);
        this.trigger("open");
      }
    };
    Popup2.prototype.hide = function(animationOptions) {
      var _this = this;
      animationOptions = !isNullOrUndefined(animationOptions) && typeof animationOptions === "object" ? animationOptions : this.hideAnimation;
      if (!isNullOrUndefined(animationOptions)) {
        animationOptions.end = function() {
          if (!_this.isDestroyed) {
            removeClass([_this.element], CLASSNAMES2.OPEN);
            addClass([_this.element], CLASSNAMES2.CLOSE);
            _this.trigger("close");
          }
        };
        new Animation(animationOptions).animate(this.element);
      } else {
        removeClass([this.element], CLASSNAMES2.OPEN);
        addClass([this.element], CLASSNAMES2.CLOSE);
        this.trigger("close");
      }
      this.unwireEvents();
    };
    Popup2.prototype.getScrollableParent = function(element2) {
      this.checkFixedParent(element2);
      return getScrollableParent(element2, this.fixedParent);
    };
    Popup2.prototype.checkFixedParent = function(element2) {
      var parent = element2.parentElement;
      while (parent && parent.tagName !== "HTML") {
        var parentStyle = getComputedStyle(parent);
        if (parentStyle.position === "fixed" && !isNullOrUndefined(this.element) && this.element.offsetParent && this.element.offsetParent.tagName === "BODY" && getComputedStyle(this.element.offsetParent).overflow !== "hidden") {
          this.element.style.top = window.scrollY > parseInt(this.element.style.top, 10) ? formatUnit(window.scrollY - parseInt(this.element.style.top, 10)) : formatUnit(parseInt(this.element.style.top, 10) - window.scrollY);
          this.element.style.position = "fixed";
          this.fixedParent = true;
        }
        parent = parent.parentElement;
        if (!isNullOrUndefined(this.element) && isNullOrUndefined(this.element.offsetParent) && parentStyle.position === "fixed" && this.element.style.position === "fixed") {
          this.fixedParent = true;
        }
      }
    };
    __decorate3([
      Property("auto")
    ], Popup2.prototype, "height", void 0);
    __decorate3([
      Property("auto")
    ], Popup2.prototype, "width", void 0);
    __decorate3([
      Property(null)
    ], Popup2.prototype, "content", void 0);
    __decorate3([
      Property("container")
    ], Popup2.prototype, "targetType", void 0);
    __decorate3([
      Property(null)
    ], Popup2.prototype, "viewPortElement", void 0);
    __decorate3([
      Property({ X: "none", Y: "none" })
    ], Popup2.prototype, "collision", void 0);
    __decorate3([
      Property("")
    ], Popup2.prototype, "relateTo", void 0);
    __decorate3([
      Complex({}, PositionData)
    ], Popup2.prototype, "position", void 0);
    __decorate3([
      Property(0)
    ], Popup2.prototype, "offsetX", void 0);
    __decorate3([
      Property(0)
    ], Popup2.prototype, "offsetY", void 0);
    __decorate3([
      Property(1e3)
    ], Popup2.prototype, "zIndex", void 0);
    __decorate3([
      Property(false)
    ], Popup2.prototype, "enableRtl", void 0);
    __decorate3([
      Property("reposition")
    ], Popup2.prototype, "actionOnScroll", void 0);
    __decorate3([
      Property(null)
    ], Popup2.prototype, "showAnimation", void 0);
    __decorate3([
      Property(null)
    ], Popup2.prototype, "hideAnimation", void 0);
    __decorate3([
      Event()
    ], Popup2.prototype, "open", void 0);
    __decorate3([
      Event()
    ], Popup2.prototype, "close", void 0);
    __decorate3([
      Event()
    ], Popup2.prototype, "targetExitViewport", void 0);
    Popup2 = __decorate3([
      NotifyPropertyChanges
    ], Popup2);
    return Popup2;
  }(Component)
);
function getScrollableParent(element2, fixedParent2) {
  var eleStyle = getComputedStyle(element2);
  var scrollParents = [];
  var overflowRegex = /(auto|scroll)/;
  var parent = element2.parentElement;
  while (parent && parent.tagName !== "HTML") {
    var parentStyle = getComputedStyle(parent);
    if (!(eleStyle.position === "absolute" && parentStyle.position === "static") && overflowRegex.test(parentStyle.overflow + parentStyle.overflowY + parentStyle.overflowX)) {
      scrollParents.push(parent);
    }
    parent = parent.parentElement;
  }
  if (!fixedParent2) {
    scrollParents.push(document);
  }
  return scrollParents;
}
function getZindexPartial(element2) {
  var parent = element2.parentElement;
  var parentZindex = [];
  while (parent) {
    if (parent.tagName !== "BODY") {
      var index = document.defaultView.getComputedStyle(parent, null).getPropertyValue("z-index");
      var position = document.defaultView.getComputedStyle(parent, null).getPropertyValue("position");
      if (index !== "auto" && position !== "static") {
        parentZindex.push(index);
      }
      parent = parent.parentElement;
    } else {
      break;
    }
  }
  var childrenZindex = [];
  for (var i = 0; i < document.body.children.length; i++) {
    if (!element2.isEqualNode(document.body.children[i])) {
      var index = document.defaultView.getComputedStyle(document.body.children[i], null).getPropertyValue("z-index");
      var position = document.defaultView.getComputedStyle(document.body.children[i], null).getPropertyValue("position");
      if (index !== "auto" && position !== "static") {
        childrenZindex.push(index);
      }
    }
  }
  childrenZindex.push("999");
  var siblingsZindex = [];
  if (!isNullOrUndefined(element2.parentElement) && element2.parentElement.tagName !== "BODY") {
    var childNodes = [].slice.call(element2.parentElement.children);
    for (var i = 0; i < childNodes.length; i++) {
      if (!element2.isEqualNode(childNodes[i])) {
        var index = document.defaultView.getComputedStyle(childNodes[i], null).getPropertyValue("z-index");
        var position = document.defaultView.getComputedStyle(childNodes[i], null).getPropertyValue("position");
        if (index !== "auto" && position !== "static") {
          siblingsZindex.push(index);
        }
      }
    }
  }
  var finalValue = parentZindex.concat(childrenZindex, siblingsZindex);
  var currentZindexValue = Math.max.apply(Math, finalValue) + 1;
  return currentZindexValue > 2147483647 ? 2147483647 : currentZindexValue;
}

// node_modules/@syncfusion/ej2-popups/src/common/resize.js
var elementClass = ["north-west", "north", "north-east", "west", "east", "south-west", "south", "south-east"];
var RESIZE_HANDLER = "e-resize-handle";
var FOCUSED_HANDLER = "e-focused-handle";
var DIALOG_RESIZABLE = "e-dlg-resizable";
var RESTRICT_LEFT = ["e-restrict-left"];
var RESIZE_WITHIN_VIEWPORT = "e-resize-viewport";
var dialogBorderResize = ["north", "west", "east", "south"];
var targetElement;
var selectedHandler;
var originalWidth = 0;
var originalHeight = 0;
var originalX = 0;
var originalY = 0;
var originalMouseX = 0;
var originalMouseY = 0;
var minHeight;
var maxHeight;
var minWidth;
var maxWidth;
var containerElement;
var resizeStart = null;
var resize = null;
var resizeEnd = null;
var resizeWestWidth;
var setLeft = true;
var previousWidth = 0;
var setWidth = true;
var proxy;
function createResize(args) {
  resizeStart = args.resizeBegin;
  resize = args.resizing;
  resizeEnd = args.resizeComplete;
  targetElement = getDOMElement(args.element);
  containerElement = getDOMElement(args.boundary);
  var directions = args.direction.split(" ");
  for (var i = 0; i < directions.length; i++) {
    if (dialogBorderResize.indexOf(directions[i]) >= 0 && directions[i]) {
      setBorderResizeElm(directions[i]);
    } else if (directions[i].trim() !== "") {
      var resizeHandler = createElement("div", { className: "e-icons " + RESIZE_HANDLER + " e-" + directions[i] });
      targetElement.appendChild(resizeHandler);
    }
  }
  minHeight = args.minHeight;
  minWidth = args.minWidth;
  maxWidth = args.maxWidth;
  maxHeight = args.maxHeight;
  if (args.proxy && args.proxy.element && args.proxy.element.classList.contains("e-dialog")) {
    wireEvents2(args.proxy);
  } else {
    wireEvents2();
  }
}
function setBorderResizeElm(direction) {
  calculateValues();
  var borderBottom = createElement("span", {
    attrs: {
      "unselectable": "on",
      "contenteditable": "false"
    }
  });
  borderBottom.setAttribute("class", "e-dialog-border-resize e-" + direction);
  if (direction === "south") {
    borderBottom.style.height = "2px";
    borderBottom.style.width = "100%";
    borderBottom.style.bottom = "0px";
    borderBottom.style.left = "0px";
  }
  if (direction === "north") {
    borderBottom.style.height = "2px";
    borderBottom.style.width = "100%";
    borderBottom.style.top = "0px";
    borderBottom.style.left = "0px";
  }
  if (direction === "east") {
    borderBottom.style.height = "100%";
    borderBottom.style.width = "2px";
    borderBottom.style.right = "0px";
    borderBottom.style.top = "0px";
  }
  if (direction === "west") {
    borderBottom.style.height = "100%";
    borderBottom.style.width = "2px";
    borderBottom.style.left = "0px";
    borderBottom.style.top = "0px";
  }
  targetElement.appendChild(borderBottom);
}
function getDOMElement(element2) {
  var domElement;
  if (!isNullOrUndefined(element2)) {
    if (typeof element2 === "string") {
      domElement = document.querySelector(element2);
    } else {
      domElement = element2;
    }
  }
  return domElement;
}
function wireEvents2(args) {
  if (isNullOrUndefined(args)) {
    args = this;
  }
  var resizers = targetElement.querySelectorAll("." + RESIZE_HANDLER);
  for (var i = 0; i < resizers.length; i++) {
    selectedHandler = resizers[i];
    EventHandler.add(selectedHandler, "mousedown", onMouseDown, args);
    var eventName = Browser.info.name === "msie" ? "pointerdown" : "touchstart";
    EventHandler.add(selectedHandler, eventName, onTouchStart, args);
  }
  var borderResizers = targetElement.querySelectorAll(".e-dialog-border-resize");
  if (!isNullOrUndefined(borderResizers)) {
    for (var i = 0; i < borderResizers.length; i++) {
      selectedHandler = borderResizers[i];
      EventHandler.add(selectedHandler, "mousedown", onMouseDown, args);
      var eventName = Browser.info.name === "msie" ? "pointerdown" : "touchstart";
      EventHandler.add(selectedHandler, eventName, onTouchStart, args);
    }
  }
}
function getEventType(e) {
  return e.indexOf("mouse") > -1 ? "mouse" : "touch";
}
function onMouseDown(e) {
  e.preventDefault();
  targetElement = e.target.parentElement;
  calculateValues();
  originalMouseX = e.pageX;
  originalMouseY = e.pageY;
  e.target.classList.add(FOCUSED_HANDLER);
  if (!isNullOrUndefined(resizeStart)) {
    proxy = this;
    if (resizeStart(e, proxy) === true) {
      return;
    }
  }
  if (this.targetEle && targetElement && targetElement.querySelector("." + DIALOG_RESIZABLE)) {
    containerElement = this.target === "body" ? null : this.targetEle;
    maxWidth = this.targetEle.clientWidth;
    maxHeight = this.targetEle.clientHeight;
  }
  var target = isNullOrUndefined(containerElement) ? document : containerElement;
  EventHandler.add(target, "mousemove", onMouseMove, this);
  EventHandler.add(document, "mouseup", onMouseUp, this);
  for (var i = 0; i < RESTRICT_LEFT.length; i++) {
    if (targetElement.classList.contains(RESTRICT_LEFT[i])) {
      setLeft = false;
    } else {
      setLeft = true;
    }
  }
}
function onMouseUp(e) {
  var touchMoveEvent = Browser.info.name === "msie" ? "pointermove" : "touchmove";
  var touchEndEvent = Browser.info.name === "msie" ? "pointerup" : "touchend";
  var target = isNullOrUndefined(containerElement) ? document : containerElement;
  var eventName = Browser.info.name === "msie" ? "pointerdown" : "touchstart";
  EventHandler.remove(target, "mousemove", onMouseMove);
  EventHandler.remove(target, touchMoveEvent, onMouseMove);
  EventHandler.remove(target, eventName, onMouseMove);
  if (!isNullOrUndefined(document.body.querySelector("." + FOCUSED_HANDLER))) {
    document.body.querySelector("." + FOCUSED_HANDLER).classList.remove(FOCUSED_HANDLER);
  }
  if (!isNullOrUndefined(resizeEnd)) {
    proxy = this;
    resizeEnd(e, proxy);
  }
  EventHandler.remove(document, "mouseup", onMouseUp);
  EventHandler.remove(document, touchEndEvent, onMouseUp);
}
function calculateValues() {
  originalWidth = parseFloat(getComputedStyle(targetElement, null).getPropertyValue("width").replace("px", ""));
  originalHeight = parseFloat(getComputedStyle(targetElement, null).getPropertyValue("height").replace("px", ""));
  originalX = targetElement.getBoundingClientRect().left;
  originalY = targetElement.getBoundingClientRect().top;
}
function onTouchStart(e) {
  targetElement = e.target.parentElement;
  calculateValues();
  var dialogResizeElement = targetElement.classList.contains("e-dialog");
  if ((e.target.classList.contains(RESIZE_HANDLER) || e.target.classList.contains("e-dialog-border-resize")) && dialogResizeElement) {
    e.target.classList.add(FOCUSED_HANDLER);
  }
  var coordinates = e.touches ? e.changedTouches[0] : e;
  originalMouseX = coordinates.pageX;
  originalMouseY = coordinates.pageY;
  if (!isNullOrUndefined(resizeStart)) {
    proxy = this;
    if (resizeStart(e, proxy) === true) {
      return;
    }
  }
  var touchMoveEvent = Browser.info.name === "msie" ? "pointermove" : "touchmove";
  var touchEndEvent = Browser.info.name === "msie" ? "pointerup" : "touchend";
  var target = isNullOrUndefined(containerElement) ? document : containerElement;
  EventHandler.add(target, touchMoveEvent, onMouseMove, this);
  EventHandler.add(document, touchEndEvent, onMouseUp, this);
}
function onMouseMove(e) {
  if (e.target.classList.contains(RESIZE_HANDLER) && e.target.classList.contains(FOCUSED_HANDLER)) {
    selectedHandler = e.target;
  } else if (!isNullOrUndefined(document.body.querySelector("." + FOCUSED_HANDLER))) {
    selectedHandler = document.body.querySelector("." + FOCUSED_HANDLER);
  }
  if (!isNullOrUndefined(selectedHandler)) {
    var resizeTowards = "";
    for (var i = 0; i < elementClass.length; i++) {
      if (selectedHandler.classList.contains("e-" + elementClass[i])) {
        resizeTowards = elementClass[i];
      }
    }
    if (!isNullOrUndefined(resize)) {
      proxy = this;
      resize(e, proxy);
    }
    switch (resizeTowards) {
      case "south":
        resizeSouth(e);
        break;
      case "north":
        resizeNorth(e);
        break;
      case "west":
        resizeWest(e);
        break;
      case "east":
        resizeEast(e);
        break;
      case "south-east":
        resizeSouth(e);
        resizeEast(e);
        break;
      case "south-west":
        resizeSouth(e);
        resizeWest(e);
        break;
      case "north-east":
        resizeNorth(e);
        resizeEast(e);
        break;
      case "north-west":
        resizeNorth(e);
        resizeWest(e);
        break;
      default:
        break;
    }
  }
}
function getClientRectValues(element2) {
  return element2.getBoundingClientRect();
}
function resizeSouth(e) {
  var documentHeight = document.documentElement.clientHeight;
  var calculateValue = false;
  var coordinates = e.touches ? e.changedTouches[0] : e;
  var currentpageY = coordinates.pageY;
  var targetRectValues = getClientRectValues(targetElement);
  var containerRectValues;
  if (!isNullOrUndefined(containerElement)) {
    containerRectValues = getClientRectValues(containerElement);
  }
  if (!isNullOrUndefined(containerElement)) {
    calculateValue = true;
  } else if (isNullOrUndefined(containerElement) && (documentHeight - currentpageY >= 0 || targetRectValues.top < 0)) {
    calculateValue = true;
  }
  var calculatedHeight = originalHeight + (currentpageY - originalMouseY);
  calculatedHeight = calculatedHeight > minHeight ? calculatedHeight : minHeight;
  var containerTop = 0;
  if (!isNullOrUndefined(containerElement)) {
    containerTop = containerRectValues.top;
  }
  var borderValue = isNullOrUndefined(containerElement) ? 0 : containerElement.offsetHeight - containerElement.clientHeight;
  var topWithoutborder = targetRectValues.top - containerTop - borderValue / 2;
  topWithoutborder = topWithoutborder < 0 ? 0 : topWithoutborder;
  if (targetRectValues.top > 0 && topWithoutborder + calculatedHeight > maxHeight) {
    calculateValue = false;
    if (targetElement.classList.contains(RESIZE_WITHIN_VIEWPORT)) {
      return;
    }
    targetElement.style.height = maxHeight - parseInt(topWithoutborder.toString(), 10) + "px";
    return;
  }
  var targetTop = 0;
  if (calculateValue) {
    if (targetRectValues.top < 0 && documentHeight + (targetRectValues.height + targetRectValues.top) > 0) {
      targetTop = targetRectValues.top;
      if (calculatedHeight + targetTop <= 30) {
        calculatedHeight = targetRectValues.height - (targetRectValues.height + targetRectValues.top) + 30;
      }
    }
    if (calculatedHeight + targetRectValues.top >= maxHeight) {
      targetElement.style.height = targetRectValues.height + (documentHeight - (targetRectValues.height + targetRectValues.top)) + "px";
    }
    var calculatedTop = isNullOrUndefined(containerElement) ? targetTop : topWithoutborder;
    if (calculatedHeight >= minHeight && calculatedHeight + calculatedTop <= maxHeight) {
      targetElement.style.height = calculatedHeight + "px";
    }
  }
}
function resizeNorth(e) {
  var calculateValue = false;
  var boundaryRectValues;
  var pageY = getEventType(e.type) === "mouse" ? e.pageY : e.touches[0].pageY;
  var targetRectValues = getClientRectValues(targetElement);
  if (!isNullOrUndefined(containerElement)) {
    boundaryRectValues = getClientRectValues(containerElement);
  }
  if (!isNullOrUndefined(containerElement) && targetRectValues.top - boundaryRectValues.top > 0) {
    calculateValue = true;
  } else if (isNullOrUndefined(containerElement) && pageY > 0) {
    calculateValue = true;
  }
  var currentHeight = originalHeight - (pageY - originalMouseY);
  if (calculateValue) {
    if (currentHeight >= minHeight && currentHeight <= maxHeight) {
      var containerTop = 0;
      if (!isNullOrUndefined(containerElement)) {
        containerTop = boundaryRectValues.top;
      }
      var top_1 = originalY - containerTop + (pageY - originalMouseY);
      top_1 = top_1 > 0 ? top_1 : 1;
      targetElement.style.height = currentHeight + "px";
      targetElement.style.top = top_1 + "px";
    }
  }
}
function resizeWest(e) {
  var documentWidth = document.documentElement.clientWidth;
  var calculateValue = false;
  var rectValues;
  if (!isNullOrUndefined(containerElement)) {
    rectValues = getClientRectValues(containerElement);
  }
  var pageX = getEventType(e.type) === "mouse" ? e.pageX : e.touches[0].pageX;
  var targetRectValues = getClientRectValues(targetElement);
  var borderValue = isNullOrUndefined(containerElement) ? 0 : containerElement.offsetWidth - containerElement.clientWidth;
  var left = isNullOrUndefined(containerElement) ? 0 : rectValues.left;
  var containerWidth = isNullOrUndefined(containerElement) ? 0 : rectValues.width;
  if (isNullOrUndefined(resizeWestWidth)) {
    if (!isNullOrUndefined(containerElement)) {
      resizeWestWidth = targetRectValues.left - left - borderValue / 2 + targetRectValues.width;
      resizeWestWidth = resizeWestWidth + (containerWidth - borderValue - resizeWestWidth);
    } else {
      resizeWestWidth = documentWidth;
    }
  }
  if (!isNullOrUndefined(containerElement) && Math.floor(targetRectValues.left - rectValues.left + targetRectValues.width + (rectValues.right - targetRectValues.right)) - borderValue <= maxWidth) {
    calculateValue = true;
  } else if (isNullOrUndefined(containerElement) && pageX >= 0) {
    calculateValue = true;
  }
  var calculatedWidth = originalWidth - (pageX - originalMouseX);
  if (setLeft) {
    calculatedWidth = calculatedWidth > resizeWestWidth ? resizeWestWidth : calculatedWidth;
  }
  if (calculateValue) {
    if (calculatedWidth >= minWidth && calculatedWidth <= maxWidth) {
      var containerLeft = 0;
      if (!isNullOrUndefined(containerElement)) {
        containerLeft = rectValues.left;
      }
      var left_1 = originalX - containerLeft + (pageX - originalMouseX);
      left_1 = left_1 > 0 ? left_1 : 1;
      if (calculatedWidth !== previousWidth && setWidth) {
        targetElement.style.width = calculatedWidth + "px";
      }
      if (setLeft) {
        targetElement.style.left = left_1 + "px";
        if (left_1 === 1) {
          setWidth = false;
        } else {
          setWidth = true;
        }
      }
    }
  }
  previousWidth = calculatedWidth;
}
function resizeEast(e) {
  var documentWidth = document.documentElement.clientWidth;
  var calculateValue = false;
  var containerRectValues;
  if (!isNullOrUndefined(containerElement)) {
    containerRectValues = getClientRectValues(containerElement);
  }
  var coordinates = e.touches ? e.changedTouches[0] : e;
  var pageX = coordinates.pageX;
  var targetRectValues = getClientRectValues(targetElement);
  if (!isNullOrUndefined(containerElement) && (targetRectValues.left - containerRectValues.left + targetRectValues.width <= maxWidth || targetRectValues.right - containerRectValues.left >= targetRectValues.width)) {
    calculateValue = true;
  } else if (isNullOrUndefined(containerElement) && documentWidth - pageX > 0) {
    calculateValue = true;
  }
  var calculatedWidth = originalWidth + (pageX - originalMouseX);
  var containerLeft = 0;
  if (!isNullOrUndefined(containerElement)) {
    containerLeft = containerRectValues.left;
  }
  if (targetRectValues.left - containerLeft + calculatedWidth > maxWidth) {
    calculateValue = false;
    if (targetElement.classList.contains(RESIZE_WITHIN_VIEWPORT)) {
      return;
    }
    targetElement.style.width = maxWidth - (targetRectValues.left - containerLeft) + "px";
  }
  if (calculateValue) {
    if (calculatedWidth >= minWidth && calculatedWidth <= maxWidth) {
      targetElement.style.width = calculatedWidth + "px";
    }
  }
}
function setMinHeight(minimumHeight) {
  minHeight = minimumHeight;
}
function setMaxWidth(value) {
  maxWidth = value;
}
function setMaxHeight(value) {
  maxHeight = value;
}
function removeResize() {
  var handlers = targetElement.querySelectorAll("." + RESIZE_HANDLER);
  for (var i = 0; i < handlers.length; i++) {
    detach(handlers[i]);
  }
  var borderResizers = targetElement.querySelectorAll(".e-dialog-border-resize");
  if (!isNullOrUndefined(borderResizers)) {
    for (var i = 0; i < borderResizers.length; i++) {
      detach(borderResizers[i]);
    }
  }
}

// node_modules/@syncfusion/ej2-popups/src/dialog/dialog.js
var __extends4 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate4 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ButtonProps = (
  /** @class */
  function(_super) {
    __extends4(ButtonProps2, _super);
    function ButtonProps2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate4([
      Property(true)
    ], ButtonProps2.prototype, "isFlat", void 0);
    __decorate4([
      Property()
    ], ButtonProps2.prototype, "buttonModel", void 0);
    __decorate4([
      Property("Button")
    ], ButtonProps2.prototype, "type", void 0);
    __decorate4([
      Event()
    ], ButtonProps2.prototype, "click", void 0);
    return ButtonProps2;
  }(ChildProperty)
);
var AnimationSettings = (
  /** @class */
  function(_super) {
    __extends4(AnimationSettings3, _super);
    function AnimationSettings3() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate4([
      Property("Fade")
    ], AnimationSettings3.prototype, "effect", void 0);
    __decorate4([
      Property(400)
    ], AnimationSettings3.prototype, "duration", void 0);
    __decorate4([
      Property(0)
    ], AnimationSettings3.prototype, "delay", void 0);
    return AnimationSettings3;
  }(ChildProperty)
);
var ROOT3 = "e-dialog";
var RTL = "e-rtl";
var DLG_HEADER_CONTENT = "e-dlg-header-content";
var DLG_HEADER = "e-dlg-header";
var DLG_FOOTER_CONTENT = "e-footer-content";
var MODAL_DLG = "e-dlg-modal";
var DLG_CONTENT = "e-dlg-content";
var DLG_CLOSE_ICON = "e-icon-dlg-close";
var DLG_OVERLAY = "e-dlg-overlay";
var DLG_TARGET = "e-dlg-target";
var DLG_CONTAINER = "e-dlg-container";
var SCROLL_DISABLED = "e-scroll-disabled";
var DLG_PRIMARY_BUTTON = "e-primary";
var ICON = "e-icons";
var POPUP_ROOT = "e-popup";
var DEVICE = "e-device";
var FULLSCREEN = "e-dlg-fullscreen";
var DLG_CLOSE_ICON_BTN = "e-dlg-closeicon-btn";
var DLG_HIDE = "e-popup-close";
var DLG_SHOW = "e-popup-open";
var DLG_UTIL_DEFAULT_TITLE = "Information";
var DLG_UTIL_ROOT = "e-scroll-disabled";
var DLG_UTIL_ALERT = "e-alert-dialog";
var DLG_UTIL_CONFIRM = "e-confirm-dialog";
var DLG_RESIZABLE = "e-dlg-resizable";
var DLG_RESTRICT_LEFT_VALUE = "e-restrict-left";
var DLG_RESTRICT_WIDTH_VALUE = "e-resize-viewport";
var DLG_REF_ELEMENT = "e-dlg-ref-element";
var DLG_USER_ACTION_CLOSED = "user action";
var DLG_CLOSE_ICON_CLOSED = "close icon";
var DLG_ESCAPE_CLOSED = "escape";
var DLG_OVERLAYCLICK_CLOSED = "overlayClick";
var DLG_DRAG = "e-draggable";
var Dialog = (
  /** @class */
  function(_super) {
    __extends4(Dialog2, _super);
    function Dialog2(options, element2) {
      var _this = _super.call(this, options, element2) || this;
      _this.needsID = true;
      return _this;
    }
    Dialog2.prototype.render = function() {
      this.initialize();
      this.initRender();
      this.wireEvents();
      if (this.width === "100%") {
        this.element.style.width = "";
      }
      if (this.minHeight !== "") {
        this.element.style.minHeight = formatUnit(this.minHeight);
      }
      if (this.enableResize) {
        this.setResize();
        if (this.animationSettings.effect === "None") {
          this.getMinHeight();
        }
      }
      this.renderComplete();
    };
    Dialog2.prototype.initializeValue = function() {
      this.dlgClosedBy = DLG_USER_ACTION_CLOSED;
    };
    Dialog2.prototype.preRender = function() {
      var _this = this;
      this.initializeValue();
      this.headerContent = null;
      this.allowMaxHeight = true;
      this.preventVisibility = true;
      this.clonedEle = this.element.cloneNode(true);
      this.closeIconClickEventHandler = function(event) {
        _this.dlgClosedBy = DLG_CLOSE_ICON_CLOSED;
        _this.hide(event);
      };
      this.dlgOverlayClickEventHandler = function(event) {
        _this.dlgClosedBy = DLG_OVERLAYCLICK_CLOSED;
        event.preventFocus = false;
        _this.trigger("overlayClick", event, function(overlayClickEventArgs) {
          if (!overlayClickEventArgs.preventFocus) {
            _this.focusContent();
          }
          _this.dlgClosedBy = DLG_USER_ACTION_CLOSED;
        });
      };
      var localeText = { close: "Close" };
      this.l10n = new L10n("dialog", localeText, this.locale);
      this.checkPositionData();
      if (isNullOrUndefined(this.target)) {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.target = document.body;
        this.isProtectedOnChange = prevOnChange;
      }
    };
    Dialog2.prototype.updatePersistData = function() {
      if (this.enablePersistence) {
        this.setProperties({
          width: parseFloat(this.element.style.width),
          height: parseFloat(this.element.style.height),
          position: { X: parseFloat(this.dragObj.element.style.left), Y: parseFloat(this.dragObj.element.style.top) }
        }, true);
      }
    };
    Dialog2.prototype.isNumberValue = function(value) {
      var isNumber = /^[-+]?\d*\.?\d+$/.test(value);
      return isNumber;
    };
    Dialog2.prototype.checkPositionData = function() {
      if (!isNullOrUndefined(this.position)) {
        if (!isNullOrUndefined(this.position.X) && typeof this.position.X !== "number") {
          var isNumber = this.isNumberValue(this.position.X);
          if (isNumber) {
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.position.X = parseFloat(this.position.X);
            this.isProtectedOnChange = prevOnChange;
          }
        }
        if (!isNullOrUndefined(this.position.Y) && typeof this.position.Y !== "number") {
          var isNumber = this.isNumberValue(this.position.Y);
          if (isNumber) {
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.position.Y = parseFloat(this.position.Y);
            this.isProtectedOnChange = prevOnChange;
          }
        }
      }
    };
    Dialog2.prototype.getEle = function(list, selector) {
      var element2 = void 0;
      for (var i = 0; i < list.length; i++) {
        if (list[i].classList.contains(selector)) {
          element2 = list[i];
          break;
        }
      }
      return element2;
    };
    Dialog2.prototype.getMinHeight = function() {
      var computedHeaderHeight = "0px";
      var computedFooterHeight = "0px";
      if (!isNullOrUndefined(this.element.querySelector("." + DLG_HEADER_CONTENT))) {
        computedHeaderHeight = getComputedStyle(this.headerContent).height;
      }
      var footerEle = this.getEle(this.element.children, DLG_FOOTER_CONTENT);
      if (!isNullOrUndefined(footerEle)) {
        computedFooterHeight = getComputedStyle(footerEle).height;
      }
      var headerHeight = parseInt(computedHeaderHeight.slice(0, computedHeaderHeight.indexOf("p")), 10);
      var footerHeight = parseInt(computedFooterHeight.slice(0, computedFooterHeight.indexOf("p")), 10);
      setMinHeight(headerHeight + 30 + (isNaN(footerHeight) ? 0 : footerHeight));
      return headerHeight + 30 + footerHeight;
    };
    Dialog2.prototype.onResizeStart = function(args, dialogObj) {
      dialogObj.trigger("resizeStart", args);
      return args.cancel;
    };
    Dialog2.prototype.onResizing = function(args, dialogObj) {
      dialogObj.trigger("resizing", args);
    };
    Dialog2.prototype.onResizeComplete = function(args, dialogObj) {
      dialogObj.trigger("resizeStop", args);
      this.updatePersistData();
    };
    Dialog2.prototype.setResize = function() {
      if (this.enableResize) {
        if (this.isBlazorServerRender() && !isNullOrUndefined(this.element.querySelector(".e-icons.e-resize-handle"))) {
          return;
        }
        this.element.classList.add(DLG_RESIZABLE);
        var computedHeight = getComputedStyle(this.element).minHeight;
        var computedWidth = getComputedStyle(this.element).minWidth;
        var direction = "";
        for (var i = 0; i < this.resizeHandles.length; i++) {
          if (this.resizeHandles[i] === "All") {
            direction = "south north east west north-east north-west south-east south-west";
            break;
          } else {
            var directionValue = "";
            switch (this.resizeHandles[i].toString()) {
              case "SouthEast":
                directionValue = "south-east";
                break;
              case "SouthWest":
                directionValue = "south-west";
                break;
              case "NorthEast":
                directionValue = "north-east";
                break;
              case "NorthWest":
                directionValue = "north-west";
                break;
              default:
                directionValue = this.resizeHandles[i].toString();
                break;
            }
            direction += directionValue.toLocaleLowerCase() + " ";
          }
        }
        if (this.enableRtl && direction.trim() === "south-east") {
          direction = "south-west";
        } else if (this.enableRtl && direction.trim() === "south-west") {
          direction = "south-east";
        }
        if (this.isModal && this.enableRtl) {
          this.element.classList.add(DLG_RESTRICT_LEFT_VALUE);
        } else if (this.isModal && this.target === document.body) {
          this.element.classList.add(DLG_RESTRICT_WIDTH_VALUE);
        }
        createResize({
          element: this.element,
          direction,
          minHeight: parseInt(computedHeight.slice(0, computedWidth.indexOf("p")), 10),
          maxHeight: this.targetEle.clientHeight,
          minWidth: parseInt(computedWidth.slice(0, computedWidth.indexOf("p")), 10),
          maxWidth: this.targetEle.clientWidth,
          boundary: this.target === document.body ? null : this.targetEle,
          resizeBegin: this.onResizeStart.bind(this),
          resizeComplete: this.onResizeComplete.bind(this),
          resizing: this.onResizing.bind(this),
          proxy: this
        });
        this.wireWindowResizeEvent();
      } else {
        removeResize();
        this.unWireWindowResizeEvent();
        if (this.isModal) {
          this.element.classList.remove(DLG_RESTRICT_LEFT_VALUE);
        } else {
          this.element.classList.remove(DLG_RESTRICT_WIDTH_VALUE);
        }
        this.element.classList.remove(DLG_RESIZABLE);
      }
    };
    Dialog2.prototype.getFocusElement = function(target) {
      var value = 'input,select,textarea,button:enabled,a,[contenteditable="true"],[tabindex]';
      var items = target.querySelectorAll(value);
      return { element: items[items.length - 1] };
    };
    Dialog2.prototype.keyDown = function(event) {
      var _this = this;
      if (event.keyCode === 9) {
        if (this.isModal) {
          var buttonObj = void 0;
          if (!isNullOrUndefined(this.btnObj)) {
            buttonObj = this.btnObj[this.btnObj.length - 1];
          }
          if (isNullOrUndefined(this.btnObj) && !isNullOrUndefined(this.ftrTemplateContent)) {
            buttonObj = this.getFocusElement(this.ftrTemplateContent);
          }
          if (isNullOrUndefined(this.btnObj) && isNullOrUndefined(this.ftrTemplateContent) && !isNullOrUndefined(this.contentEle)) {
            buttonObj = this.getFocusElement(this.contentEle);
          }
          if (!isNullOrUndefined(buttonObj) && document.activeElement === buttonObj.element && !event.shiftKey) {
            event.preventDefault();
            this.focusableElements(this.element).focus();
          }
          if (document.activeElement === this.focusableElements(this.element) && event.shiftKey) {
            event.preventDefault();
            if (!isNullOrUndefined(buttonObj)) {
              buttonObj.element.focus();
            }
          }
        }
      }
      var element2 = document.activeElement;
      var isTagName = ["input", "textarea"].indexOf(element2.tagName.toLowerCase()) > -1;
      var isContentEdit = false;
      if (!isTagName) {
        isContentEdit = element2.hasAttribute("contenteditable") && element2.getAttribute("contenteditable") === "true";
      }
      if (event.keyCode === 27 && this.closeOnEscape) {
        this.dlgClosedBy = DLG_ESCAPE_CLOSED;
        var query = document.querySelector(".e-popup-open:not(.e-dialog)");
        if (!(!isNullOrUndefined(query) && !query.classList.contains("e-toolbar-pop"))) {
          this.hide(event);
        }
      }
      if (event.keyCode === 13 && !event.ctrlKey && element2.tagName.toLowerCase() !== "textarea" && isTagName && !isNullOrUndefined(this.primaryButtonEle) || event.keyCode === 13 && event.ctrlKey && (element2.tagName.toLowerCase() === "textarea" || isContentEdit) && !isNullOrUndefined(this.primaryButtonEle)) {
        var buttonIndex_1;
        var firstPrimary = this.buttons.some(function(data, index) {
          buttonIndex_1 = index;
          var buttonModel = data.buttonModel;
          return !isNullOrUndefined(buttonModel) && buttonModel.isPrimary === true;
        });
        if (firstPrimary && typeof this.buttons[buttonIndex_1].click === "function") {
          setTimeout(function() {
            _this.buttons[buttonIndex_1].click.call(_this, event);
          });
        }
      }
    };
    Dialog2.prototype.initialize = function() {
      if (!isNullOrUndefined(this.target)) {
        this.targetEle = typeof this.target === "string" ? document.querySelector(this.target) : this.target;
      }
      if (!this.isBlazorServerRender()) {
        addClass([this.element], ROOT3);
      }
      if (Browser.isDevice) {
        addClass([this.element], DEVICE);
      }
      if (!this.isBlazorServerRender()) {
        this.setCSSClass();
      }
      this.setMaxHeight();
    };
    Dialog2.prototype.initRender = function() {
      var _this = this;
      this.initialRender = true;
      if (!this.isBlazorServerRender()) {
        attributes(this.element, { role: "dialog" });
      }
      if (this.zIndex === 1e3) {
        this.setzIndex(this.element, false);
        this.calculatezIndex = true;
      } else {
        this.calculatezIndex = false;
      }
      if (this.isBlazorServerRender() && isNullOrUndefined(this.headerContent)) {
        this.headerContent = this.element.getElementsByClassName("e-dlg-header-content")[0];
      }
      if (this.isBlazorServerRender() && isNullOrUndefined(this.contentEle)) {
        this.contentEle = this.element.querySelector("#" + this.element.id + "_dialog-content");
      }
      if (!this.isBlazorServerRender()) {
        this.setTargetContent();
        if (this.header !== "" && !isNullOrUndefined(this.header)) {
          this.setHeader();
        }
        this.renderCloseIcon();
        this.setContent();
        if (this.footerTemplate !== "" && !isNullOrUndefined(this.footerTemplate)) {
          this.setFooterTemplate();
        } else if (!isNullOrUndefined(this.buttons[0].buttonModel)) {
          this.setButton();
        }
      }
      if (this.isBlazorServerRender()) {
        if (!isNullOrUndefined(this.buttons[0].buttonModel) && this.footerTemplate === "") {
          this.setButton();
        }
      }
      if (this.allowDragging && !isNullOrUndefined(this.headerContent)) {
        this.setAllowDragging();
      }
      if (!this.isBlazorServerRender()) {
        attributes(this.element, { "aria-modal": this.isModal ? "true" : "false" });
        if (this.isModal) {
          this.setIsModal();
        }
      }
      if (this.isBlazorServerRender() && isNullOrUndefined(this.dlgContainer)) {
        this.dlgContainer = this.element.parentElement;
        for (var i = 0, childNodes = this.dlgContainer.children; i < childNodes.length; i++) {
          if (childNodes[i].classList.contains("e-dlg-overlay")) {
            this.dlgOverlay = childNodes[i];
          }
        }
      }
      if (this.element.classList.contains(DLG_UTIL_ALERT) !== true && this.element.classList.contains(DLG_UTIL_CONFIRM) !== true && !isNullOrUndefined(this.element.parentElement)) {
        var parentEle = this.isModal ? this.dlgContainer.parentElement : this.element.parentElement;
        this.refElement = this.createElement("div", { className: DLG_REF_ELEMENT });
        parentEle.insertBefore(this.refElement, this.isModal ? this.dlgContainer : this.element);
      }
      if (!isNullOrUndefined(this.targetEle)) {
        this.isModal ? this.targetEle.appendChild(this.dlgContainer) : this.targetEle.appendChild(this.element);
      }
      this.popupObj = new Popup(this.element, {
        height: this.height,
        width: this.width,
        zIndex: this.zIndex,
        relateTo: this.target,
        actionOnScroll: "none",
        enableRtl: this.enableRtl,
        // eslint-disable-next-line
        open: function(event) {
          var eventArgs = {
            container: _this.isModal ? _this.dlgContainer : _this.element,
            element: _this.element,
            target: _this.target,
            preventFocus: false
          };
          if (_this.enableResize) {
            _this.resetResizeIcon();
          }
          _this.trigger("open", eventArgs, function(openEventArgs) {
            if (!openEventArgs.preventFocus) {
              _this.focusContent();
            }
          });
        },
        // eslint-disable-next-line
        close: function(event) {
          if (_this.isModal) {
            addClass([_this.dlgOverlay], "e-fade");
          }
          _this.unBindEvent(_this.element);
          if (_this.isModal) {
            _this.dlgContainer.style.display = "none";
          }
          _this.trigger("close", _this.closeArgs);
          var activeEle = document.activeElement;
          if (!isNullOrUndefined(activeEle) && !isNullOrUndefined(activeEle.blur)) {
            activeEle.blur();
          }
          if (!isNullOrUndefined(_this.storeActiveElement) && !isNullOrUndefined(_this.storeActiveElement.focus)) {
            _this.storeActiveElement.focus();
          }
        }
      });
      this.positionChange();
      this.setEnableRTL();
      if (!this.isBlazorServerRender()) {
        addClass([this.element], DLG_HIDE);
        if (this.isModal) {
          this.setOverlayZindex();
        }
      }
      if (this.visible) {
        this.show();
        if (this.isModal) {
          var targetType = this.getTargetContainer(this.target);
          if (targetType instanceof Element) {
            var computedStyle = window.getComputedStyle(targetType);
            if (computedStyle.getPropertyValue("direction") === "rtl") {
              this.setPopupPosition();
            }
          }
        }
      } else {
        if (this.isModal) {
          this.dlgOverlay.style.display = "none";
        }
      }
      this.initialRender = false;
    };
    Dialog2.prototype.getTargetContainer = function(targetValue) {
      var targetElement2 = null;
      if (typeof targetValue === "string") {
        if (targetValue.startsWith("#")) {
          targetElement2 = document.getElementById(targetValue.substring(1));
        } else if (targetValue.startsWith(".")) {
          var elements = document.getElementsByClassName(targetValue.substring(1));
          targetElement2 = elements.length > 0 ? elements[0] : null;
        } else {
          if (!(targetValue instanceof HTMLElement) && targetValue !== document.body) {
            targetElement2 = document.querySelector(targetValue);
          }
        }
      } else if (targetValue instanceof HTMLElement) {
        targetElement2 = targetValue;
      }
      return targetElement2;
    };
    Dialog2.prototype.resetResizeIcon = function() {
      var dialogConHeight = this.getMinHeight();
      if (this.targetEle.offsetHeight < dialogConHeight) {
        var className = this.enableRtl ? "e-south-west" : "e-south-east";
        var resizeIcon = this.element.querySelector("." + className);
        if (!isNullOrUndefined(resizeIcon)) {
          resizeIcon.style.bottom = "-" + dialogConHeight.toString() + "px";
        }
      }
    };
    Dialog2.prototype.setOverlayZindex = function(zIndexValue) {
      var zIndex;
      if (isNullOrUndefined(zIndexValue)) {
        zIndex = parseInt(this.element.style.zIndex, 10) ? parseInt(this.element.style.zIndex, 10) : this.zIndex;
      } else {
        zIndex = zIndexValue;
      }
      this.dlgOverlay.style.zIndex = (zIndex - 1).toString();
      this.dlgContainer.style.zIndex = zIndex.toString();
    };
    Dialog2.prototype.positionChange = function() {
      if (this.isModal) {
        if (!isNaN(parseFloat(this.position.X)) && !isNaN(parseFloat(this.position.Y))) {
          this.setPopupPosition();
        } else if (!isNaN(parseFloat(this.position.X)) && isNaN(parseFloat(this.position.Y)) || isNaN(parseFloat(this.position.X)) && !isNaN(parseFloat(this.position.Y))) {
          this.setPopupPosition();
        } else {
          this.element.style.top = "0px";
          this.element.style.left = "0px";
          this.dlgContainer.classList.add("e-dlg-" + this.position.X + "-" + this.position.Y);
        }
      } else {
        this.setPopupPosition();
      }
    };
    Dialog2.prototype.setPopupPosition = function() {
      this.popupObj.setProperties({
        position: {
          X: this.position.X,
          Y: this.position.Y
        }
      });
    };
    Dialog2.prototype.setAllowDragging = function() {
      var _this = this;
      var handleContent = "." + DLG_HEADER_CONTENT;
      if (!this.element.classList.contains(DLG_DRAG)) {
        this.dragObj = new Draggable(this.element, {
          clone: false,
          isDragScroll: true,
          abort: ".e-dlg-closeicon-btn",
          handle: handleContent,
          dragStart: function(event) {
            _this.trigger("dragStart", event, function(dragEventArgs) {
              if (isBlazor()) {
                dragEventArgs.bindEvents(event.dragElement);
              }
            });
          },
          dragStop: function(event) {
            if (_this.isModal) {
              if (!isNullOrUndefined(_this.position)) {
                _this.dlgContainer.classList.remove("e-dlg-" + _this.position.X + "-" + _this.position.Y);
              }
              var targetType = _this.getTargetContainer(_this.target);
              if (targetType instanceof Element) {
                var computedStyle = window.getComputedStyle(targetType);
                if (computedStyle.getPropertyValue("direction") === "rtl") {
                  _this.element.style.position = "absolute";
                } else {
                  _this.element.style.position = "relative";
                }
              } else {
                _this.element.style.position = "relative";
              }
            }
            _this.trigger("dragStop", event);
            _this.element.classList.remove(DLG_RESTRICT_LEFT_VALUE);
            _this.updatePersistData();
          },
          drag: function(event) {
            _this.trigger("drag", event);
          }
        });
        if (!isNullOrUndefined(this.targetEle)) {
          this.dragObj.dragArea = this.targetEle;
        }
      }
    };
    Dialog2.prototype.setButton = function() {
      if (!this.isBlazorServerRender()) {
        this.buttonContent = [];
        this.btnObj = [];
        var primaryBtnFlag = true;
        for (var i = 0; i < this.buttons.length; i++) {
          var buttonType = !isNullOrUndefined(this.buttons[i].type) ? this.buttons[i].type.toLowerCase() : "button";
          var btn = this.createElement("button", { className: this.cssClass, attrs: { type: buttonType } });
          this.buttonContent.push(btn.outerHTML);
        }
        this.setFooterTemplate();
      }
      var footerBtn;
      for (var i = 0, childNodes = this.element.children; i < childNodes.length; i++) {
        if (childNodes[i].classList.contains(DLG_FOOTER_CONTENT)) {
          footerBtn = childNodes[i].querySelectorAll("button");
        }
      }
      for (var i = 0; i < this.buttons.length; i++) {
        if (!this.isBlazorServerRender()) {
          this.btnObj[i] = new Button(this.buttons[i].buttonModel);
        }
        if (this.isBlazorServerRender()) {
          this.ftrTemplateContent = this.element.querySelector("." + DLG_FOOTER_CONTENT);
        }
        if (!isNullOrUndefined(this.ftrTemplateContent) && footerBtn.length > 0) {
          if (typeof this.buttons[i].click === "function") {
            EventHandler.add(footerBtn[i], "click", this.buttons[i].click, this);
          }
          if (typeof this.buttons[i].click === "object") {
            EventHandler.add(footerBtn[i], "click", this.buttonClickHandler.bind(this, i), this);
          }
        }
        if (!this.isBlazorServerRender() && !isNullOrUndefined(this.ftrTemplateContent)) {
          this.btnObj[i].appendTo(this.ftrTemplateContent.children[i]);
          if (this.buttons[i].isFlat) {
            this.btnObj[i].element.classList.add("e-flat");
          }
          this.primaryButtonEle = this.element.getElementsByClassName("e-primary")[0];
        }
      }
    };
    Dialog2.prototype.buttonClickHandler = function(index) {
      this.trigger("buttons[" + index + "].click", {});
    };
    Dialog2.prototype.setContent = function() {
      this.contentEle = this.createElement("div", { className: DLG_CONTENT, id: this.element.id + "_dialog-content" });
      if (this.headerEle) {
        attributes(this.element, { "aria-describedby": this.element.id + "_title " + this.element.id + "_dialog-content" });
      } else {
        attributes(this.element, { "aria-describedby": this.element.id + "_dialog-content" });
      }
      if (this.innerContentElement) {
        this.contentEle.appendChild(this.innerContentElement);
      } else if (!isNullOrUndefined(this.content) && this.content !== "" || !this.initialRender) {
        var blazorContain = Object.keys(window);
        if (typeof this.content === "string" && !isBlazor()) {
          this.setTemplate(this.content, this.contentEle, "content");
        } else if (this.content instanceof HTMLElement) {
          this.contentEle.appendChild(this.content);
        } else {
          this.setTemplate(this.content, this.contentEle, "content");
        }
      }
      if (!isNullOrUndefined(this.headerContent)) {
        this.element.insertBefore(this.contentEle, this.element.children[1]);
      } else {
        this.element.insertBefore(this.contentEle, this.element.children[0]);
      }
      if (this.height === "auto") {
        if (!this.isBlazorServerRender() && Browser.isIE && this.element.style.width === "" && !isNullOrUndefined(this.width)) {
          this.element.style.width = formatUnit(this.width);
        }
        this.setMaxHeight();
      }
    };
    Dialog2.prototype.setTemplate = function(template, toElement, prop) {
      var templateFn;
      var templateProps;
      var blazorContain = Object.keys(window);
      if (toElement.classList.contains(DLG_HEADER)) {
        templateProps = this.element.id + "header";
      } else if (toElement.classList.contains(DLG_FOOTER_CONTENT)) {
        templateProps = this.element.id + "footerTemplate";
      } else {
        templateProps = this.element.id + "content";
      }
      var templateValue;
      if (!isNullOrUndefined(template.outerHTML)) {
        toElement.appendChild(template);
      } else if (typeof template === "string" || typeof template !== "string" || isBlazor() && !this.isStringTemplate) {
        if (typeof template === "string") {
          template = this.sanitizeHelper(template);
        }
        if (this.isVue || typeof template !== "string") {
          templateFn = compile(template);
          templateValue = template;
        } else {
          toElement.innerHTML = template;
        }
      }
      var fromElements = [];
      if (!isNullOrUndefined(templateFn)) {
        var isString = isBlazor() && !this.isStringTemplate && templateValue.indexOf("<div>Blazor") === 0 ? this.isStringTemplate : true;
        for (var _i = 0, _a = templateFn({}, this, prop, templateProps, isString); _i < _a.length; _i++) {
          var item = _a[_i];
          fromElements.push(item);
        }
        append([].slice.call(fromElements), toElement);
      }
    };
    Dialog2.prototype.sanitizeHelper = function(value) {
      if (this.enableHtmlSanitizer) {
        var dialogItem = SanitizeHtmlHelper.beforeSanitize();
        var beforeEvent = {
          cancel: false,
          helper: null
        };
        extend(dialogItem, dialogItem, beforeEvent);
        this.trigger("beforeSanitizeHtml", dialogItem);
        if (dialogItem.cancel && !isNullOrUndefined(dialogItem.helper)) {
          value = dialogItem.helper(value);
        } else if (!dialogItem.cancel) {
          value = SanitizeHtmlHelper.serializeValue(dialogItem, value);
        }
      }
      return value;
    };
    Dialog2.prototype.setMaxHeight = function() {
      if (!this.allowMaxHeight) {
        return;
      }
      var display = this.element.style.display;
      this.element.style.display = "none";
      this.element.style.maxHeight = !isNullOrUndefined(this.target) && this.targetEle.offsetHeight < window.innerHeight ? this.targetEle.offsetHeight - 20 + "px" : window.innerHeight - 20 + "px";
      this.element.style.display = display;
      if (Browser.isIE && this.height === "auto" && !isNullOrUndefined(this.contentEle) && this.element.offsetHeight < this.contentEle.offsetHeight) {
        this.element.style.height = "inherit";
      }
    };
    Dialog2.prototype.setEnableRTL = function() {
      if (!this.isBlazorServerRender()) {
        this.enableRtl ? addClass([this.element], RTL) : removeClass([this.element], RTL);
      }
      if (!isNullOrUndefined(this.element.querySelector(".e-resize-handle"))) {
        removeResize();
        this.setResize();
      }
    };
    Dialog2.prototype.setTargetContent = function() {
      var _this = this;
      if (isNullOrUndefined(this.content) || this.content === "") {
        var isContent = this.element.innerHTML.replace(/\s|<(\/?|\/?)(!--!--)>/g, "") !== "";
        if (this.element.children.length > 0 || isContent) {
          this.innerContentElement = document.createDocumentFragment();
          [].slice.call(this.element.childNodes).forEach(function(el) {
            if (el.nodeType !== 8) {
              _this.innerContentElement.appendChild(el);
            }
          });
        }
      }
    };
    Dialog2.prototype.setHeader = function() {
      if (this.headerEle) {
        this.headerEle.innerHTML = "";
      } else {
        this.headerEle = this.createElement("div", { id: this.element.id + "_title", className: DLG_HEADER });
      }
      this.createHeaderContent();
      this.headerContent.appendChild(this.headerEle);
      this.setTemplate(this.header, this.headerEle, "header");
      attributes(this.element, { "aria-describedby": this.element.id + "_title" });
      attributes(this.element, { "aria-label": "dialog" });
      this.element.insertBefore(this.headerContent, this.element.children[0]);
      if (this.allowDragging && !isNullOrUndefined(this.headerContent)) {
        this.setAllowDragging();
      }
    };
    Dialog2.prototype.setFooterTemplate = function() {
      if (this.ftrTemplateContent) {
        this.ftrTemplateContent.innerHTML = "";
      } else {
        this.ftrTemplateContent = this.createElement("div", {
          className: DLG_FOOTER_CONTENT
        });
      }
      if (this.footerTemplate !== "" && !isNullOrUndefined(this.footerTemplate)) {
        this.setTemplate(this.footerTemplate, this.ftrTemplateContent, "footerTemplate");
      } else {
        this.ftrTemplateContent.innerHTML = this.buttonContent.join("");
      }
      this.element.appendChild(this.ftrTemplateContent);
    };
    Dialog2.prototype.createHeaderContent = function() {
      if (isNullOrUndefined(this.headerContent)) {
        this.headerContent = this.createElement("div", { id: this.element.id + "_dialog-header", className: DLG_HEADER_CONTENT });
      }
    };
    Dialog2.prototype.renderCloseIcon = function() {
      if (this.showCloseIcon) {
        this.closeIcon = this.createElement("button", { className: DLG_CLOSE_ICON_BTN, attrs: { type: "button" } });
        this.closeIconBtnObj = new Button({ cssClass: "e-flat", iconCss: DLG_CLOSE_ICON + " " + ICON });
        this.closeIconTitle();
        if (!isNullOrUndefined(this.headerContent)) {
          prepend([this.closeIcon], this.headerContent);
        } else {
          this.createHeaderContent();
          prepend([this.closeIcon], this.headerContent);
          this.element.insertBefore(this.headerContent, this.element.children[0]);
        }
        this.closeIconBtnObj.appendTo(this.closeIcon);
      }
    };
    Dialog2.prototype.closeIconTitle = function() {
      this.l10n.setLocale(this.locale);
      var closeIconTitle = this.l10n.getConstant("close");
      this.closeIcon.setAttribute("title", closeIconTitle);
      this.closeIcon.setAttribute("aria-label", closeIconTitle);
    };
    Dialog2.prototype.setCSSClass = function(oldCSSClass) {
      if (oldCSSClass) {
        removeClass([this.element], oldCSSClass.split(" "));
        if (this.isModal && !isNullOrUndefined(this.dlgContainer)) {
          removeClass([this.dlgContainer], oldCSSClass.split(" "));
        }
      }
      if (this.cssClass) {
        addClass([this.element], this.cssClass.split(" "));
        if (this.isModal && !isNullOrUndefined(this.dlgContainer)) {
          addClass([this.dlgContainer], this.cssClass.split(" "));
        }
      }
    };
    Dialog2.prototype.setIsModal = function() {
      this.dlgContainer = this.createElement("div", { className: DLG_CONTAINER });
      this.setCSSClass();
      this.element.classList.remove(DLG_SHOW);
      this.element.parentNode.insertBefore(this.dlgContainer, this.element);
      this.dlgContainer.appendChild(this.element);
      addClass([this.element], MODAL_DLG);
      this.dlgOverlay = this.createElement("div", { className: DLG_OVERLAY });
      this.dlgOverlay.style.zIndex = (this.zIndex - 1).toString();
      this.dlgContainer.appendChild(this.dlgOverlay);
    };
    Dialog2.prototype.getValidFocusNode = function(items) {
      var node;
      for (var u = 0; u < items.length; u++) {
        node = items[u];
        if ((node.clientHeight > 0 || node.tagName.toLowerCase() === "a" && node.hasAttribute("href")) && node.tabIndex > -1 && !node.disabled && !this.disableElement(node, '[disabled],[aria-disabled="true"],[type="hidden"]')) {
          return node;
        } else {
          node = null;
        }
      }
      return node;
    };
    Dialog2.prototype.focusableElements = function(content) {
      if (!isNullOrUndefined(content)) {
        var value = 'input,select,textarea,button,a,[contenteditable="true"],[tabindex]';
        var items = content.querySelectorAll(value);
        return this.getValidFocusNode(items);
      }
      return null;
    };
    Dialog2.prototype.getAutoFocusNode = function(container) {
      var node = container.querySelector("." + DLG_CLOSE_ICON_BTN);
      var value = "[autofocus]";
      var items = container.querySelectorAll(value);
      var validNode = this.getValidFocusNode(items);
      if (isBlazor()) {
        this.primaryButtonEle = this.element.getElementsByClassName("e-primary")[0];
      }
      if (!isNullOrUndefined(validNode)) {
        node = validNode;
      } else {
        validNode = this.focusableElements(this.contentEle);
        if (!isNullOrUndefined(validNode)) {
          return node = validNode;
        } else if (!isNullOrUndefined(this.primaryButtonEle)) {
          return this.element.querySelector("." + DLG_PRIMARY_BUTTON);
        }
      }
      return node;
    };
    Dialog2.prototype.disableElement = function(element2, t) {
      var elementMatch = element2 ? element2.matches || element2.webkitMatchesSelector || element2.msGetRegionContent : null;
      if (elementMatch) {
        for (; element2; element2 = element2.parentNode) {
          if (element2 instanceof Element && elementMatch.call(element2, t)) {
            return element2;
          }
        }
      }
      return null;
    };
    Dialog2.prototype.focusContent = function() {
      var element2 = this.getAutoFocusNode(this.element);
      var node = !isNullOrUndefined(element2) ? element2 : this.element;
      var userAgent = Browser.userAgent;
      if (userAgent.indexOf("MSIE ") > 0 || userAgent.indexOf("Trident/") > 0) {
        this.element.focus();
      }
      node.focus();
      this.unBindEvent(this.element);
      this.bindEvent(this.element);
    };
    Dialog2.prototype.bindEvent = function(element2) {
      EventHandler.add(element2, "keydown", this.keyDown, this);
    };
    Dialog2.prototype.unBindEvent = function(element2) {
      EventHandler.remove(element2, "keydown", this.keyDown);
    };
    Dialog2.prototype.updateSanitizeContent = function() {
      if (!this.isBlazorServerRender()) {
        this.contentEle.innerHTML = this.sanitizeHelper(this.content);
      }
    };
    Dialog2.prototype.isBlazorServerRender = function() {
      return isBlazor() && this.isServerRendered;
    };
    Dialog2.prototype.getModuleName = function() {
      return "dialog";
    };
    Dialog2.prototype.onPropertyChanged = function(newProp, oldProp) {
      if (!this.element.classList.contains(ROOT3)) {
        return;
      }
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "content":
            if (!isNullOrUndefined(this.content) && this.content !== "") {
              if (this.isBlazorServerRender()) {
                this.contentEle = this.element.querySelector(".e-dlg-content");
              }
              if (!isNullOrUndefined(this.contentEle) && this.contentEle.getAttribute("role") !== "dialog") {
                if (!this.isBlazorServerRender()) {
                  this.contentEle.innerHTML = "";
                }
                if (typeof this.content === "function") {
                  this.clearTemplate(["content"]);
                  detach(this.contentEle);
                  this.contentEle = null;
                  this.setContent();
                } else {
                  typeof this.content === "string" ? this.isBlazorServerRender() && this.contentEle.innerText === "" ? this.contentEle.insertAdjacentHTML("beforeend", this.sanitizeHelper(this.content)) : this.updateSanitizeContent() : this.contentEle.appendChild(this.content);
                }
                this.setMaxHeight();
              } else {
                if (!this.isBlazorServerRender() || isNullOrUndefined(this.element.querySelector(".e-dlg-content"))) {
                  this.setContent();
                }
              }
            } else if (!isNullOrUndefined(this.contentEle)) {
              detach(this.contentEle);
              this.contentEle = null;
            }
            break;
          case "header":
            if (this.header === "" || isNullOrUndefined(this.header)) {
              if (this.headerEle) {
                detach(this.headerEle);
                this.headerEle = null;
              }
            } else {
              if (!this.isBlazorServerRender() || isNullOrUndefined(this.element.querySelector(".e-dlg-header-content"))) {
                this.setHeader();
              }
            }
            break;
          case "footerTemplate":
            if (this.footerTemplate === "" || isNullOrUndefined(this.footerTemplate)) {
              if (!this.ftrTemplateContent) {
                return;
              }
              detach(this.ftrTemplateContent);
              this.ftrTemplateContent = null;
              this.buttons = [{}];
            } else {
              if (!this.isBlazorServerRender() || isNullOrUndefined(this.element.querySelector(".e-footer-content"))) {
                this.setFooterTemplate();
              }
              this.buttons = [{}];
            }
            break;
          case "showCloseIcon":
            if (this.element.getElementsByClassName(DLG_CLOSE_ICON).length > 0) {
              if (!this.showCloseIcon && (this.header === "" || isNullOrUndefined(this.header))) {
                detach(this.headerContent);
                this.headerContent = null;
              } else if (!this.showCloseIcon) {
                detach(this.closeIcon);
              } else {
                if (this.isBlazorServerRender()) {
                  this.wireEvents();
                }
              }
            } else {
              if (!this.isBlazorServerRender()) {
                this.renderCloseIcon();
              }
              this.wireEvents();
            }
            break;
          case "locale":
            if (this.showCloseIcon) {
              this.closeIconTitle();
            }
            break;
          case "visible":
            this.visible ? this.show() : this.hide();
            break;
          case "isModal":
            this.updateIsModal();
            break;
          case "height":
            setStyleAttribute(this.element, { "height": formatUnit(newProp.height) });
            this.updatePersistData();
            break;
          case "width":
            setStyleAttribute(this.element, { "width": formatUnit(newProp.width) });
            this.updatePersistData();
            break;
          case "zIndex":
            this.popupObj.zIndex = this.zIndex;
            if (this.isModal) {
              this.setOverlayZindex(this.zIndex);
            }
            if (this.element.style.zIndex !== this.zIndex.toString()) {
              this.calculatezIndex = false;
            }
            break;
          case "cssClass":
            this.setCSSClass(oldProp.cssClass);
            break;
          case "buttons": {
            var buttonCount = this.buttons.length;
            if (!isNullOrUndefined(this.ftrTemplateContent) && !this.isBlazorServerRender()) {
              detach(this.ftrTemplateContent);
              this.ftrTemplateContent = null;
            }
            for (var i = 0; i < buttonCount; i++) {
              if (!isNullOrUndefined(this.buttons[i].buttonModel)) {
                this.footerTemplate = "";
                this.setButton();
              }
            }
            break;
          }
          case "allowDragging":
            if (this.allowDragging && !isNullOrUndefined(this.headerContent)) {
              this.setAllowDragging();
            } else {
              this.dragObj.destroy();
            }
            break;
          case "target":
            this.setTarget(newProp.target);
            break;
          case "position":
            this.checkPositionData();
            if (this.isModal) {
              var positionX = !isNullOrUndefined(oldProp.position) && !isNullOrUndefined(oldProp.position.X) ? oldProp.position.X : this.position.X;
              var positionY = !isNullOrUndefined(oldProp.position) && !isNullOrUndefined(oldProp.position.Y) ? oldProp.position.Y : this.position.Y;
              if (this.dlgContainer.classList.contains("e-dlg-" + positionX + "-" + positionY)) {
                this.dlgContainer.classList.remove("e-dlg-" + positionX + "-" + positionY);
              }
            }
            this.positionChange();
            this.updatePersistData();
            break;
          case "enableRtl":
            this.setEnableRTL();
            break;
          case "enableResize":
            this.setResize();
            break;
          case "minHeight":
            if (this.minHeight !== "") {
              this.element.style.minHeight = formatUnit(this.minHeight);
            }
            break;
        }
      }
    };
    Dialog2.prototype.setTarget = function(target) {
      this.popupObj.relateTo = target;
      this.target = target;
      this.targetEle = typeof this.target === "string" ? document.querySelector(this.target) : this.target;
      if (this.dragObj) {
        this.dragObj.dragArea = this.targetEle;
      }
      this.setMaxHeight();
      if (this.isModal) {
        this.updateIsModal();
      }
      if (this.enableResize) {
        this.setResize();
      }
    };
    Dialog2.prototype.updateIsModal = function() {
      this.element.setAttribute("aria-modal", this.isModal ? "true" : "false");
      if (this.isModal) {
        if (isNullOrUndefined(this.dlgOverlay)) {
          this.setIsModal();
          this.element.style.top = "0px";
          this.element.style.left = "0px";
          if (!isNullOrUndefined(this.targetEle)) {
            this.targetEle.appendChild(this.dlgContainer);
          }
        }
      } else {
        removeClass([this.element], MODAL_DLG);
        removeClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
        detach(this.dlgOverlay);
        while (this.dlgContainer.firstChild) {
          this.dlgContainer.parentElement.insertBefore(this.dlgContainer.firstChild, this.dlgContainer);
        }
        this.dlgContainer.parentElement.removeChild(this.dlgContainer);
      }
      if (this.visible) {
        this.show();
      }
      this.positionChange();
      if (this.isModal && this.dlgOverlay) {
        EventHandler.add(this.dlgOverlay, "click", this.dlgOverlayClickEventHandler, this);
      }
    };
    Dialog2.prototype.setzIndex = function(zIndexElement, setPopupZindex) {
      var prevOnChange = this.isProtectedOnChange;
      this.isProtectedOnChange = true;
      var currentzIndex = getZindexPartial(zIndexElement);
      this.zIndex = currentzIndex > this.zIndex ? currentzIndex : this.zIndex;
      this.isProtectedOnChange = prevOnChange;
      if (setPopupZindex) {
        this.popupObj.zIndex = this.zIndex;
      }
    };
    Dialog2.prototype.windowResizeHandler = function() {
      setMaxWidth(this.targetEle.clientWidth);
      setMaxHeight(this.targetEle.clientHeight);
      this.setMaxHeight();
    };
    Dialog2.prototype.getPersistData = function() {
      return this.addOnPersist(["width", "height", "position"]);
    };
    Dialog2.prototype.destroy = function() {
      if (this.isDestroyed) {
        return;
      }
      var classArray = [RTL, MODAL_DLG, DLG_RESIZABLE, DLG_RESTRICT_LEFT_VALUE, FULLSCREEN, DEVICE];
      var attrs = ["role", "aria-modal", "aria-labelledby", "aria-describedby", "aria-grabbed", "tabindex", "style"];
      removeClass([this.targetEle], [DLG_TARGET, SCROLL_DISABLED]);
      if (!isNullOrUndefined(this.element) && this.element.classList.contains(FULLSCREEN)) {
        removeClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
      }
      if (this.isModal) {
        removeClass([!isNullOrUndefined(this.targetEle) ? this.targetEle : document.body], SCROLL_DISABLED);
      }
      this.unWireEvents();
      if (!isNullOrUndefined(this.btnObj)) {
        for (var i = 0; i < this.btnObj.length; i++) {
          this.btnObj[i].destroy();
        }
      }
      if (!isNullOrUndefined(this.closeIconBtnObj)) {
        this.closeIconBtnObj.destroy();
      }
      if (!isNullOrUndefined(this.dragObj)) {
        this.dragObj.destroy();
      }
      if (!isNullOrUndefined(this.popupObj.element) && this.popupObj.element.classList.contains(POPUP_ROOT)) {
        this.popupObj.destroy();
      }
      removeClass([this.element], classArray);
      if (!isNullOrUndefined(this.cssClass) && this.cssClass !== "") {
        removeClass([this.element], this.cssClass.split(" "));
      }
      if (!isNullOrUndefined(this.refElement) && !isNullOrUndefined(this.refElement.parentElement)) {
        this.refElement.parentElement.insertBefore(this.isModal ? this.dlgContainer : this.element, this.refElement);
        detach(this.refElement);
        this.refElement = void 0;
      }
      if (this.isModal && !this.isBlazorServerRender()) {
        detach(this.dlgOverlay);
        this.dlgContainer.parentNode.insertBefore(this.element, this.dlgContainer);
        detach(this.dlgContainer);
      }
      if (!this.isBlazorServerRender()) {
        this.element.innerHTML = this.clonedEle.innerHTML;
      }
      if (this.isBlazorServerRender()) {
        if (!isNullOrUndefined(this.element.children)) {
          for (var i = 0; i <= this.element.children.length; i++) {
            i = i - i;
            detach(this.element.children[i]);
          }
        }
      }
      for (var i = 0; i < attrs.length; i++) {
        this.element.removeAttribute(attrs[i]);
      }
      this.ftrTemplateContent = null;
      this.headerContent = null;
      this.contentEle = null;
      if (!this.isBlazorServerRender()) {
        _super.prototype.destroy.call(this);
      } else {
        this.isDestroyed = true;
      }
      if (this.isReact) {
        this.clearTemplate();
      }
    };
    Dialog2.prototype.wireWindowResizeEvent = function() {
      this.boundWindowResizeHandler = this.windowResizeHandler.bind(this);
      window.addEventListener("resize", this.boundWindowResizeHandler);
    };
    Dialog2.prototype.unWireWindowResizeEvent = function() {
      window.removeEventListener("resize", this.boundWindowResizeHandler);
      this.boundWindowResizeHandler = null;
    };
    Dialog2.prototype.wireEvents = function() {
      if (this.isBlazorServerRender() && this.showCloseIcon) {
        this.closeIcon = this.element.getElementsByClassName("e-dlg-closeicon-btn")[0];
      }
      if (this.showCloseIcon) {
        EventHandler.add(this.closeIcon, "click", this.closeIconClickEventHandler, this);
      }
      if (this.isModal && this.dlgOverlay) {
        EventHandler.add(this.dlgOverlay, "click", this.dlgOverlayClickEventHandler, this);
      }
    };
    Dialog2.prototype.unWireEvents = function() {
      if (this.showCloseIcon) {
        EventHandler.remove(this.closeIcon, "click", this.closeIconClickEventHandler);
      }
      if (this.isModal) {
        EventHandler.remove(this.dlgOverlay, "click", this.dlgOverlayClickEventHandler);
      }
      if (this.buttons.length > 0 && !isNullOrUndefined(this.buttons[0].buttonModel) && this.footerTemplate === "") {
        for (var i = 0; i < this.buttons.length; i++) {
          if (typeof this.buttons[i].click === "function") {
            EventHandler.remove(this.ftrTemplateContent.children[i], "click", this.buttons[i].click);
          }
        }
      }
    };
    Dialog2.prototype.refreshPosition = function() {
      this.popupObj.refreshPosition();
      if (this.element.classList.contains(MODAL_DLG)) {
        this.positionChange();
      }
    };
    Dialog2.prototype.getDimension = function() {
      var dialogWidth = this.element.offsetWidth;
      var dialogHeight = this.element.offsetHeight;
      return { width: dialogWidth, height: dialogHeight };
    };
    Dialog2.prototype.show = function(isFullScreen) {
      var _this = this;
      if (!this.element.classList.contains(ROOT3)) {
        return;
      }
      if (!this.element.classList.contains(DLG_SHOW) || !isNullOrUndefined(isFullScreen)) {
        if (!isNullOrUndefined(isFullScreen)) {
          this.fullScreen(isFullScreen);
        }
        var eventArgs_1 = isBlazor() ? {
          cancel: false,
          element: this.element,
          container: this.isModal ? this.dlgContainer : this.element,
          maxHeight: this.element.style.maxHeight
        } : {
          cancel: false,
          element: this.element,
          container: this.isModal ? this.dlgContainer : this.element,
          target: this.target,
          maxHeight: this.element.style.maxHeight
        };
        this.trigger("beforeOpen", eventArgs_1, function(beforeOpenArgs) {
          if (!beforeOpenArgs.cancel) {
            if (_this.element.style.maxHeight !== eventArgs_1.maxHeight) {
              _this.allowMaxHeight = false;
              _this.element.style.maxHeight = eventArgs_1.maxHeight;
            }
            if (_this.enableResize && _this.boundWindowResizeHandler == null && !_this.initialRender) {
              _this.wireWindowResizeEvent();
            }
            _this.storeActiveElement = document.activeElement;
            _this.element.tabIndex = -1;
            if (_this.isModal && !isNullOrUndefined(_this.dlgOverlay)) {
              _this.dlgOverlay.style.display = "block";
              _this.dlgContainer.style.display = "flex";
              removeClass([_this.dlgOverlay], "e-fade");
              if (!isNullOrUndefined(_this.targetEle)) {
                if (_this.targetEle === document.body) {
                  _this.dlgContainer.style.position = "fixed";
                } else {
                  _this.dlgContainer.style.position = "absolute";
                }
                _this.dlgOverlay.style.position = "absolute";
                var targetType = _this.getTargetContainer(_this.target);
                if (targetType instanceof Element) {
                  var computedStyle = window.getComputedStyle(targetType);
                  if (computedStyle.getPropertyValue("direction") === "rtl") {
                    _this.element.style.position = "absolute";
                  } else {
                    _this.element.style.position = "relative";
                  }
                } else {
                  _this.element.style.position = "relative";
                }
                addClass([_this.targetEle], [DLG_TARGET, SCROLL_DISABLED]);
              } else {
                addClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
              }
            }
            var openAnimation = {
              name: _this.animationSettings.effect === "None" && animationMode === "Enable" ? "ZoomIn" : _this.animationSettings.effect + "In",
              duration: _this.animationSettings.duration,
              delay: _this.animationSettings.delay
            };
            var zIndexElement = _this.isModal ? _this.element.parentElement : _this.element;
            if (_this.calculatezIndex) {
              _this.setzIndex(zIndexElement, true);
              setStyleAttribute(_this.element, { "zIndex": _this.zIndex });
              if (_this.isModal) {
                _this.setOverlayZindex(_this.zIndex);
              }
            }
            _this.animationSettings.effect === "None" && animationMode === "Enable" ? _this.popupObj.show(openAnimation) : _this.animationSettings.effect === "None" ? _this.popupObj.show() : _this.popupObj.show(openAnimation);
            _this.dialogOpen = true;
            var prevOnChange = _this.isProtectedOnChange;
            _this.isProtectedOnChange = true;
            _this.visible = true;
            _this.preventVisibility = true;
            _this.isProtectedOnChange = prevOnChange;
          }
        });
      }
      if (this.isReact) {
        this.renderReactTemplates();
      }
    };
    Dialog2.prototype.hide = function(event) {
      var _this = this;
      if (!this.element.classList.contains(ROOT3)) {
        return;
      }
      if (this.preventVisibility) {
        var eventArgs = isBlazor() ? {
          cancel: false,
          isInteracted: event ? true : false,
          element: this.element,
          container: this.isModal ? this.dlgContainer : this.element,
          event
        } : {
          cancel: false,
          isInteracted: event ? true : false,
          element: this.element,
          target: this.target,
          container: this.isModal ? this.dlgContainer : this.element,
          event,
          closedBy: this.dlgClosedBy
        };
        this.closeArgs = eventArgs;
        this.trigger("beforeClose", eventArgs, function(beforeCloseArgs) {
          if (!beforeCloseArgs.cancel) {
            if (_this.isModal) {
              if (!isNullOrUndefined(_this.targetEle)) {
                removeClass([_this.targetEle], [DLG_TARGET, SCROLL_DISABLED]);
              }
            }
            if (_this.enableResize) {
              _this.unWireWindowResizeEvent();
            }
            if (document.body.classList.contains(DLG_TARGET) && document.body.classList.contains(SCROLL_DISABLED)) {
              removeClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
            }
            var closeAnimation = {
              name: _this.animationSettings.effect === "None" && animationMode === "Enable" ? "ZoomOut" : _this.animationSettings.effect + "Out",
              duration: _this.animationSettings.duration,
              delay: _this.animationSettings.delay
            };
            _this.animationSettings.effect === "None" && animationMode === "Enable" ? _this.popupObj.hide(closeAnimation) : _this.animationSettings.effect === "None" ? _this.popupObj.hide() : _this.popupObj.hide(closeAnimation);
            _this.dialogOpen = false;
            var prevOnChange = _this.isProtectedOnChange;
            _this.isProtectedOnChange = true;
            _this.visible = false;
            _this.preventVisibility = false;
            _this.isProtectedOnChange = prevOnChange;
          }
          _this.dlgClosedBy = DLG_USER_ACTION_CLOSED;
        });
      }
    };
    Dialog2.prototype.fullScreen = function(args) {
      var top = this.element.offsetTop;
      var left = this.element.offsetLeft;
      if (args) {
        if (!this.isModal) {
          this.element.style.top = document.scrollingElement.scrollTop + "px";
        }
        addClass([this.element], FULLSCREEN);
        var display = this.element.style.display;
        this.element.style.display = "none";
        this.element.style.maxHeight = !isNullOrUndefined(this.target) ? this.targetEle.offsetHeight + "px" : window.innerHeight + "px";
        this.element.style.display = display;
        addClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
        if (this.allowDragging && !isNullOrUndefined(this.dragObj)) {
          this.dragObj.destroy();
        }
      } else {
        removeClass([this.element], FULLSCREEN);
        removeClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
        if (this.allowDragging && !isNullOrUndefined(this.headerContent)) {
          this.setAllowDragging();
        }
      }
      return args;
    };
    Dialog2.prototype.getButtons = function(index) {
      if (!isNullOrUndefined(index)) {
        return this.btnObj[index];
      }
      return this.btnObj;
    };
    __decorate4([
      Property("")
    ], Dialog2.prototype, "content", void 0);
    __decorate4([
      Property(true)
    ], Dialog2.prototype, "enableHtmlSanitizer", void 0);
    __decorate4([
      Property(false)
    ], Dialog2.prototype, "enablePersistence", void 0);
    __decorate4([
      Property(false)
    ], Dialog2.prototype, "showCloseIcon", void 0);
    __decorate4([
      Property(false)
    ], Dialog2.prototype, "isModal", void 0);
    __decorate4([
      Property("")
    ], Dialog2.prototype, "header", void 0);
    __decorate4([
      Property(true)
    ], Dialog2.prototype, "visible", void 0);
    __decorate4([
      Property(false)
    ], Dialog2.prototype, "enableResize", void 0);
    __decorate4([
      Property(["South-East"])
    ], Dialog2.prototype, "resizeHandles", void 0);
    __decorate4([
      Property("auto")
    ], Dialog2.prototype, "height", void 0);
    __decorate4([
      Property("")
    ], Dialog2.prototype, "minHeight", void 0);
    __decorate4([
      Property("100%")
    ], Dialog2.prototype, "width", void 0);
    __decorate4([
      Property("")
    ], Dialog2.prototype, "cssClass", void 0);
    __decorate4([
      Property(1e3)
    ], Dialog2.prototype, "zIndex", void 0);
    __decorate4([
      Property(null)
    ], Dialog2.prototype, "target", void 0);
    __decorate4([
      Property("")
    ], Dialog2.prototype, "footerTemplate", void 0);
    __decorate4([
      Property(false)
    ], Dialog2.prototype, "allowDragging", void 0);
    __decorate4([
      Collection([{}], ButtonProps)
    ], Dialog2.prototype, "buttons", void 0);
    __decorate4([
      Property(true)
    ], Dialog2.prototype, "closeOnEscape", void 0);
    __decorate4([
      Complex({}, AnimationSettings)
    ], Dialog2.prototype, "animationSettings", void 0);
    __decorate4([
      Complex({ X: "center", Y: "center" }, PositionData)
    ], Dialog2.prototype, "position", void 0);
    __decorate4([
      Event()
    ], Dialog2.prototype, "created", void 0);
    __decorate4([
      Event()
    ], Dialog2.prototype, "open", void 0);
    __decorate4([
      Event()
    ], Dialog2.prototype, "beforeSanitizeHtml", void 0);
    __decorate4([
      Event()
    ], Dialog2.prototype, "beforeOpen", void 0);
    __decorate4([
      Event()
    ], Dialog2.prototype, "close", void 0);
    __decorate4([
      Event()
    ], Dialog2.prototype, "beforeClose", void 0);
    __decorate4([
      Event()
    ], Dialog2.prototype, "dragStart", void 0);
    __decorate4([
      Event()
    ], Dialog2.prototype, "dragStop", void 0);
    __decorate4([
      Event()
    ], Dialog2.prototype, "drag", void 0);
    __decorate4([
      Event()
    ], Dialog2.prototype, "overlayClick", void 0);
    __decorate4([
      Event()
    ], Dialog2.prototype, "resizeStart", void 0);
    __decorate4([
      Event()
    ], Dialog2.prototype, "resizing", void 0);
    __decorate4([
      Event()
    ], Dialog2.prototype, "resizeStop", void 0);
    __decorate4([
      Event()
    ], Dialog2.prototype, "destroyed", void 0);
    Dialog2 = __decorate4([
      NotifyPropertyChanges
    ], Dialog2);
    return Dialog2;
  }(Component)
);
var DialogUtility;
(function(DialogUtility2) {
  function alert(args) {
    var dialogComponent;
    var dialogElement = createElement("div", { "className": DLG_UTIL_ALERT });
    document.body.appendChild(dialogElement);
    var alertDialogObj;
    var okButtonModel = [{
      buttonModel: { isPrimary: true, content: "OK" },
      click: function() {
        this.hide();
      }
    }];
    if (typeof args === "string") {
      alertDialogObj = createDialog({
        content: args,
        position: { X: "center", Y: "top" },
        isModal: true,
        header: DLG_UTIL_DEFAULT_TITLE,
        buttons: okButtonModel
      }, dialogElement);
    } else {
      alertDialogObj = createDialog(alertOptions(args), dialogElement);
    }
    alertDialogObj.close = function() {
      if (args && args.close) {
        args.close.apply(alertDialogObj);
      }
      alertDialogObj.destroy();
      if (alertDialogObj.element.classList.contains("e-dlg-modal")) {
        alertDialogObj.element.parentElement.remove();
        alertDialogObj.target.classList.remove(DLG_UTIL_ROOT);
      } else {
        alertDialogObj.element.remove();
      }
    };
    return alertDialogObj;
  }
  DialogUtility2.alert = alert;
  function confirm(args) {
    var dialogComponent;
    var dialogElement = createElement("div", { "className": DLG_UTIL_CONFIRM });
    document.body.appendChild(dialogElement);
    var confirmDialogObj;
    var okCancelButtonModel = [{
      buttonModel: { isPrimary: true, content: "OK" },
      click: function() {
        this.hide();
      }
    }, {
      buttonModel: { content: "Cancel" },
      click: function() {
        this.hide();
      }
    }];
    if (typeof args === "string") {
      confirmDialogObj = createDialog({
        position: { X: "center", Y: "top" },
        content: args,
        isModal: true,
        header: DLG_UTIL_DEFAULT_TITLE,
        buttons: okCancelButtonModel
      }, dialogElement);
    } else {
      confirmDialogObj = createDialog(confirmOptions(args), dialogElement);
    }
    confirmDialogObj.close = function() {
      if (args && args.close) {
        args.close.apply(confirmDialogObj);
      }
      confirmDialogObj.destroy();
      if (confirmDialogObj.element.classList.contains("e-dlg-modal")) {
        confirmDialogObj.element.parentElement.remove();
        confirmDialogObj.target.classList.remove(DLG_UTIL_ROOT);
      } else {
        confirmDialogObj.element.remove();
      }
    };
    return confirmDialogObj;
  }
  DialogUtility2.confirm = confirm;
  function createDialog(options, element2) {
    var dialogObject = new Dialog(options);
    dialogObject.appendTo(element2);
    return dialogObject;
  }
  function alertOptions(option) {
    var options = {};
    options.buttons = [];
    options = formOptions(options, option);
    options = setAlertButtonModel(options, option);
    return options;
  }
  function confirmOptions(option) {
    var options = {};
    options.buttons = [];
    options = formOptions(options, option);
    options = setConfirmButtonModel(options, option);
    return options;
  }
  function formOptions(options, option) {
    options.header = !isNullOrUndefined(option.title) ? option.title : null;
    options.content = !isNullOrUndefined(option.content) ? option.content : "";
    options.isModal = !isNullOrUndefined(option.isModal) ? option.isModal : true;
    options.showCloseIcon = !isNullOrUndefined(option.showCloseIcon) ? option.showCloseIcon : false;
    options.allowDragging = !isNullOrUndefined(option.isDraggable) ? option.isDraggable : false;
    options.closeOnEscape = !isNullOrUndefined(option.closeOnEscape) ? option.closeOnEscape : false;
    options.position = !isNullOrUndefined(option.position) ? option.position : { X: "center", Y: "top" };
    options.animationSettings = !isNullOrUndefined(option.animationSettings) ? option.animationSettings : { effect: "Fade", duration: 400, delay: 0 };
    options.cssClass = !isNullOrUndefined(option.cssClass) ? option.cssClass : "";
    options.zIndex = !isNullOrUndefined(option.zIndex) ? option.zIndex : 1e3;
    options.open = !isNullOrUndefined(option.open) ? option.open : null;
    options.width = !isNullOrUndefined(option.width) ? option.width : "auto";
    options.height = !isNullOrUndefined(option.height) ? option.height : "auto";
    return options;
  }
  function setAlertButtonModel(options, option) {
    var alertButtonModel = [{
      buttonModel: { isPrimary: true, content: "OK" },
      click: function() {
        this.hide();
      }
    }];
    if (!isNullOrUndefined(option.okButton)) {
      options.buttons[0] = formButtonModel(options.buttons[0], option.okButton, alertButtonModel[0]);
    } else {
      options.buttons = alertButtonModel;
    }
    return options;
  }
  function setConfirmButtonModel(options, option) {
    var okButtonModel = {
      buttonModel: { isPrimary: true, content: "OK" },
      click: function() {
        this.hide();
      }
    };
    var cancelButtonModel = {
      buttonModel: { content: "Cancel" },
      click: function() {
        this.hide();
      }
    };
    if (!isNullOrUndefined(option.okButton)) {
      options.buttons[0] = formButtonModel(options.buttons[0], option.okButton, okButtonModel);
    } else {
      options.buttons[0] = okButtonModel;
    }
    if (!isNullOrUndefined(option.cancelButton)) {
      options.buttons[1] = formButtonModel(options.buttons[1], option.cancelButton, cancelButtonModel);
    } else {
      options.buttons[1] = cancelButtonModel;
    }
    return options;
  }
  function formButtonModel(buttonModel, option, buttonPropModel) {
    var buttonProps = buttonPropModel;
    if (!isNullOrUndefined(option.text)) {
      buttonProps.buttonModel.content = option.text;
    }
    if (!isNullOrUndefined(option.icon)) {
      buttonProps.buttonModel.iconCss = option.icon;
    }
    if (!isNullOrUndefined(option.cssClass)) {
      buttonProps.buttonModel.cssClass = option.cssClass;
    }
    if (!isNullOrUndefined(option.click)) {
      buttonProps.click = option.click;
    }
    if (!isNullOrUndefined(option.isFlat)) {
      buttonProps.isFlat = option.isFlat;
    }
    return buttonProps;
  }
})(DialogUtility || (DialogUtility = {}));

// node_modules/@syncfusion/ej2-popups/src/tooltip/tooltip.js
var __extends5 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate5 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TOUCHEND_HIDE_DELAY = 1500;
var TAPHOLD_THRESHOLD = 500;
var SHOW_POINTER_TIP_GAP = 0;
var HIDE_POINTER_TIP_GAP = 8;
var MOUSE_TRAIL_GAP = 2;
var POINTER_ADJUST = 2;
var ROOT4 = "e-tooltip";
var RTL2 = "e-rtl";
var DEVICE2 = "e-bigger";
var ICON2 = "e-icons";
var CLOSE = "e-tooltip-close";
var TOOLTIP_WRAP = "e-tooltip-wrap";
var CONTENT = "e-tip-content";
var ARROW_TIP = "e-arrow-tip";
var ARROW_TIP_OUTER = "e-arrow-tip-outer";
var ARROW_TIP_INNER = "e-arrow-tip-inner";
var TIP_BOTTOM = "e-tip-bottom";
var TIP_TOP = "e-tip-top";
var TIP_LEFT = "e-tip-left";
var TIP_RIGHT = "e-tip-right";
var POPUP_ROOT2 = "e-popup";
var POPUP_OPEN = "e-popup-open";
var POPUP_CLOSE = "e-popup-close";
var POPUP_LIB = "e-lib";
var HIDE_POPUP = "e-hidden";
var POPUP_CONTAINER = "e-tooltip-popup-container";
var Animation2 = (
  /** @class */
  function(_super) {
    __extends5(Animation3, _super);
    function Animation3() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate5([
      Property({ effect: "FadeIn", duration: 150, delay: 0 })
    ], Animation3.prototype, "open", void 0);
    __decorate5([
      Property({ effect: "FadeOut", duration: 150, delay: 0 })
    ], Animation3.prototype, "close", void 0);
    return Animation3;
  }(ChildProperty)
);
var Tooltip = (
  /** @class */
  function(_super) {
    __extends5(Tooltip2, _super);
    function Tooltip2(options, element2) {
      var _this = _super.call(this, options, element2) || this;
      _this.mouseMoveEvent = null;
      _this.mouseMoveTarget = null;
      _this.containerElement = null;
      _this.isBodyContainer = true;
      return _this;
    }
    Tooltip2.prototype.initialize = function() {
      this.formatPosition();
      addClass([this.element], ROOT4);
    };
    Tooltip2.prototype.formatPosition = function() {
      var _a, _b;
      if (this.position.indexOf("Top") === 0 || this.position.indexOf("Bottom") === 0) {
        _a = this.position.split(/(?=[A-Z])/), this.tooltipPositionY = _a[0], this.tooltipPositionX = _a[1];
      } else {
        _b = this.position.split(/(?=[A-Z])/), this.tooltipPositionX = _b[0], this.tooltipPositionY = _b[1];
      }
    };
    Tooltip2.prototype.renderArrow = function() {
      this.setTipClass(this.position);
      var tip = this.createElement("div", { className: ARROW_TIP + " " + this.tipClass });
      tip.appendChild(this.createElement("div", { className: ARROW_TIP_OUTER + " " + this.tipClass }));
      tip.appendChild(this.createElement("div", { className: ARROW_TIP_INNER + " " + this.tipClass }));
      this.tooltipEle.appendChild(tip);
    };
    Tooltip2.prototype.setTipClass = function(position) {
      if (position.indexOf("Right") === 0) {
        this.tipClass = TIP_LEFT;
      } else if (position.indexOf("Bottom") === 0) {
        this.tipClass = TIP_TOP;
      } else if (position.indexOf("Left") === 0) {
        this.tipClass = TIP_RIGHT;
      } else {
        this.tipClass = TIP_BOTTOM;
      }
    };
    Tooltip2.prototype.renderPopup = function(target) {
      var elePos = this.mouseTrail ? { top: 0, left: 0 } : this.getTooltipPosition(target);
      this.tooltipEle.classList.remove(POPUP_LIB);
      this.popupObj = new Popup(this.tooltipEle, {
        height: this.height,
        width: this.width,
        position: { X: elePos.left, Y: elePos.top },
        enableRtl: this.enableRtl,
        open: this.openPopupHandler.bind(this),
        close: this.closePopupHandler.bind(this)
      });
    };
    Tooltip2.prototype.getScalingFactor = function(target) {
      if (!target) {
        return { x: 1, y: 1 };
      }
      var scalingFactors = { x: 1, y: 1 };
      var elementsWithTransform = target.closest('[style*="transform: scale"]');
      if (elementsWithTransform && elementsWithTransform != this.tooltipEle && elementsWithTransform.contains(this.tooltipEle)) {
        var computedStyle = window.getComputedStyle(elementsWithTransform);
        var transformValue = computedStyle.getPropertyValue("transform");
        var matrixValues = transformValue.match(/matrix\(([^)]+)\)/)[1].split(",").map(parseFloat);
        scalingFactors.x = matrixValues[0];
        scalingFactors.y = matrixValues[3];
      }
      return scalingFactors;
    };
    Tooltip2.prototype.getTooltipPosition = function(target) {
      this.tooltipEle.style.display = "block";
      var parentWithZoomStyle = this.element.closest('[style*="zoom"]');
      if (parentWithZoomStyle) {
        if (!parentWithZoomStyle.contains(this.tooltipEle)) {
          this.tooltipEle.style.zoom = getComputedStyle(parentWithZoomStyle).zoom;
        }
      }
      var pos = calculatePosition(target, this.tooltipPositionX, this.tooltipPositionY, !this.isBodyContainer, this.isBodyContainer ? null : this.containerElement.getBoundingClientRect());
      var scalingFactors = this.getScalingFactor(target);
      var offsetPos = this.calculateTooltipOffset(this.position, scalingFactors.x, scalingFactors.y);
      var collisionPosition = this.calculateElementPosition(pos, offsetPos);
      var collisionLeft = collisionPosition[0];
      var collisionTop = collisionPosition[1];
      var elePos = this.collisionFlipFit(target, collisionLeft, collisionTop);
      if (!this.isBodyContainer) {
        elePos.top -= this.containerElement.getBoundingClientRect().top;
      }
      elePos.left = elePos.left / scalingFactors.x;
      elePos.top = elePos.top / scalingFactors.y;
      this.tooltipEle.style.display = "";
      return elePos;
    };
    Tooltip2.prototype.windowResize = function() {
      this.reposition(this.findTarget());
    };
    Tooltip2.prototype.reposition = function(target) {
      if (this.popupObj && target) {
        var elePos = this.getTooltipPosition(target);
        this.popupObj.position = { X: elePos.left, Y: elePos.top };
        this.popupObj.dataBind();
      }
    };
    Tooltip2.prototype.openPopupHandler = function() {
      if (!this.mouseTrail && this.needTemplateReposition()) {
        this.reposition(this.findTarget());
      }
      this.trigger("afterOpen", this.tooltipEventArgs);
      this.tooltipEventArgs = null;
    };
    Tooltip2.prototype.closePopupHandler = function() {
      if (this.isReact && !(this.opensOn === "Click" && typeof this.content === "function")) {
        this.clearTemplate(["content"]);
      }
      this.clear();
      this.trigger("afterClose", this.tooltipEventArgs);
      this.tooltipEventArgs = null;
    };
    Tooltip2.prototype.calculateTooltipOffset = function(position, xScalingFactor, yScalingFactor) {
      if (xScalingFactor === void 0) {
        xScalingFactor = 1;
      }
      if (yScalingFactor === void 0) {
        yScalingFactor = 1;
      }
      var pos = { top: 0, left: 0 };
      var tipWidth, tipHeight, tooltipEleWidth, tooltipEleHeight, arrowEle;
      var tipAdjust, tipHeightAdjust, tipWidthAdjust;
      if (xScalingFactor != 1 || yScalingFactor != 1) {
        var tooltipEleRect = this.tooltipEle.getBoundingClientRect();
        var arrowEleRect = void 0;
        tooltipEleWidth = Math.round(tooltipEleRect.width);
        tooltipEleHeight = Math.round(tooltipEleRect.height);
        arrowEle = select("." + ARROW_TIP, this.tooltipEle);
        if (arrowEle) {
          arrowEleRect = arrowEle.getBoundingClientRect();
        }
        tipWidth = arrowEle ? Math.round(arrowEleRect.width) : 0;
        tipHeight = arrowEle ? Math.round(arrowEleRect.height) : 0;
        tipAdjust = this.showTipPointer ? SHOW_POINTER_TIP_GAP : HIDE_POINTER_TIP_GAP;
        tipHeightAdjust = tipHeight / 2 + POINTER_ADJUST + (tooltipEleHeight - this.tooltipEle.clientHeight * yScalingFactor);
        tipWidthAdjust = tipWidth / 2 + POINTER_ADJUST + (tooltipEleWidth - this.tooltipEle.clientWidth * xScalingFactor);
      } else {
        tooltipEleWidth = this.tooltipEle.offsetWidth;
        tooltipEleHeight = this.tooltipEle.offsetHeight;
        arrowEle = select("." + ARROW_TIP, this.tooltipEle);
        tipWidth = arrowEle ? arrowEle.offsetWidth : 0;
        tipHeight = arrowEle ? arrowEle.offsetHeight : 0;
        tipAdjust = this.showTipPointer ? SHOW_POINTER_TIP_GAP : HIDE_POINTER_TIP_GAP;
        tipHeightAdjust = tipHeight / 2 + POINTER_ADJUST + (this.tooltipEle.offsetHeight - this.tooltipEle.clientHeight);
        tipWidthAdjust = tipWidth / 2 + POINTER_ADJUST + (this.tooltipEle.offsetWidth - this.tooltipEle.clientWidth);
      }
      if (this.mouseTrail) {
        tipAdjust += MOUSE_TRAIL_GAP;
      }
      switch (position) {
        case "RightTop":
          pos.left += tipWidth + tipAdjust;
          pos.top -= tooltipEleHeight - tipHeightAdjust;
          break;
        case "RightCenter":
          pos.left += tipWidth + tipAdjust;
          pos.top -= tooltipEleHeight / 2;
          break;
        case "RightBottom":
          pos.left += tipWidth + tipAdjust;
          pos.top -= tipHeightAdjust;
          break;
        case "BottomRight":
          pos.top += tipHeight + tipAdjust;
          pos.left -= tipWidthAdjust;
          break;
        case "BottomCenter":
          pos.top += tipHeight + tipAdjust;
          pos.left -= tooltipEleWidth / 2;
          break;
        case "BottomLeft":
          pos.top += tipHeight + tipAdjust;
          pos.left -= tooltipEleWidth - tipWidthAdjust;
          break;
        case "LeftBottom":
          pos.left -= tipWidth + tooltipEleWidth + tipAdjust;
          pos.top -= tipHeightAdjust;
          break;
        case "LeftCenter":
          pos.left -= tipWidth + tooltipEleWidth + tipAdjust;
          pos.top -= tooltipEleHeight / 2;
          break;
        case "LeftTop":
          pos.left -= tipWidth + tooltipEleWidth + tipAdjust;
          pos.top -= tooltipEleHeight - tipHeightAdjust;
          break;
        case "TopLeft":
          pos.top -= tooltipEleHeight + tipHeight + tipAdjust;
          pos.left -= tooltipEleWidth - tipWidthAdjust;
          break;
        case "TopRight":
          pos.top -= tooltipEleHeight + tipHeight + tipAdjust;
          pos.left -= tipWidthAdjust;
          break;
        default:
          pos.top -= tooltipEleHeight + tipHeight + tipAdjust;
          pos.left -= tooltipEleWidth / 2;
          break;
      }
      pos.left += this.offsetX;
      pos.top += this.offsetY;
      return pos;
    };
    Tooltip2.prototype.updateTipPosition = function(position) {
      var selEle = selectAll("." + ARROW_TIP + ",." + ARROW_TIP_OUTER + ",." + ARROW_TIP_INNER, this.tooltipEle);
      var removeList = [TIP_BOTTOM, TIP_TOP, TIP_LEFT, TIP_RIGHT];
      removeClass(selEle, removeList);
      this.setTipClass(position);
      addClass(selEle, this.tipClass);
    };
    Tooltip2.prototype.adjustArrow = function(target, position, tooltipPositionX, tooltipPositionY) {
      var arrowEle = select("." + ARROW_TIP, this.tooltipEle);
      if (this.showTipPointer === false || arrowEle === null) {
        return;
      }
      this.updateTipPosition(position);
      var leftValue;
      var topValue;
      this.tooltipEle.style.display = "block";
      var tooltipWidth = this.tooltipEle.clientWidth;
      var tooltipHeight = this.tooltipEle.clientHeight;
      var arrowInnerELe = select("." + ARROW_TIP_INNER, this.tooltipEle);
      var tipWidth = arrowEle.offsetWidth;
      var tipHeight = arrowEle.offsetHeight;
      this.tooltipEle.style.display = "";
      if (this.tipClass === TIP_BOTTOM || this.tipClass === TIP_TOP) {
        if (this.tipClass === TIP_BOTTOM) {
          topValue = "99.9%";
          arrowInnerELe.style.top = "-" + (tipHeight - 2) + "px";
        } else {
          topValue = -(tipHeight - 1) + "px";
          arrowInnerELe.style.top = "-" + (tipHeight - 6) + "px";
        }
        if (target) {
          var tipPosExclude = tooltipPositionX !== "Center" || tooltipWidth > target.offsetWidth || this.mouseTrail;
          if (tipPosExclude && tooltipPositionX === "Left" || !tipPosExclude && this.tipPointerPosition === "End") {
            leftValue = tooltipWidth - tipWidth - POINTER_ADJUST + "px";
          } else if (tipPosExclude && tooltipPositionX === "Right" || !tipPosExclude && this.tipPointerPosition === "Start") {
            leftValue = POINTER_ADJUST + "px";
          } else if (tipPosExclude && (this.tipPointerPosition === "End" || this.tipPointerPosition === "Start")) {
            leftValue = this.tipPointerPosition === "End" ? target.offsetWidth + (this.tooltipEle.offsetWidth - target.offsetWidth) / 2 - tipWidth / 2 - POINTER_ADJUST + "px" : (this.tooltipEle.offsetWidth - target.offsetWidth) / 2 - tipWidth / 2 + POINTER_ADJUST + "px";
          } else {
            leftValue = tooltipWidth / 2 - tipWidth / 2 + "px";
          }
        }
      } else {
        if (this.tipClass === TIP_RIGHT) {
          leftValue = "99.9%";
          arrowInnerELe.style.left = "-" + (tipWidth - 2) + "px";
        } else {
          leftValue = -(tipWidth - 1) + "px";
          arrowInnerELe.style.left = -tipWidth + (tipWidth - 2) + "px";
        }
        var tipPosExclude = tooltipPositionY !== "Center" || tooltipHeight > target.offsetHeight || this.mouseTrail;
        if (tipPosExclude && tooltipPositionY === "Top" || !tipPosExclude && this.tipPointerPosition === "End") {
          topValue = tooltipHeight - tipHeight - POINTER_ADJUST + "px";
        } else if (tipPosExclude && tooltipPositionY === "Bottom" || !tipPosExclude && this.tipPointerPosition === "Start") {
          topValue = POINTER_ADJUST + "px";
        } else {
          topValue = tooltipHeight / 2 - tipHeight / 2 + "px";
        }
      }
      arrowEle.style.top = topValue;
      arrowEle.style.left = leftValue;
    };
    Tooltip2.prototype.renderContent = function(target) {
      var tooltipContent = select("." + CONTENT, this.tooltipEle);
      if (this.cssClass) {
        addClass([this.tooltipEle], this.cssClass.split(" "));
      }
      if (target && !isNullOrUndefined(target.getAttribute("title"))) {
        target.setAttribute("data-content", target.getAttribute("title"));
        target.removeAttribute("title");
      }
      if (!isNullOrUndefined(this.content)) {
        tooltipContent.innerHTML = "";
        if (this.content instanceof HTMLElement) {
          tooltipContent.appendChild(this.content);
        } else if (typeof this.content === "string") {
          if (this.enableHtmlSanitizer) {
            this.setProperties({ content: SanitizeHtmlHelper.sanitize(this.content) }, true);
          }
          if (this.enableHtmlParse) {
            var tempFunction = compile(this.content);
            var tempArr = tempFunction({}, this, "content", this.element.id + "content", void 0, void 0, tooltipContent, this.root);
            if (tempArr) {
              append(tempArr, tooltipContent);
            }
          } else {
            tooltipContent["textContent"] = this.content;
          }
        } else {
          var templateFunction = compile(this.content);
          var tempArr = templateFunction({}, this, "content", this.element.id + "content", void 0, void 0, tooltipContent);
          if (tempArr) {
            append(tempArr, tooltipContent);
          }
          this.renderReactTemplates();
        }
      } else {
        if (target && !isNullOrUndefined(target.getAttribute("data-content"))) {
          tooltipContent.innerHTML = target.getAttribute("data-content");
        }
      }
    };
    Tooltip2.prototype.renderCloseIcon = function() {
      if (!this.isSticky) {
        var existingCloseIcon = this.tooltipEle.querySelector("." + ICON2 + "." + CLOSE);
        if (existingCloseIcon) {
          remove(existingCloseIcon);
        }
        return;
      }
      var tipClose = this.createElement("div", { className: ICON2 + " " + CLOSE });
      this.tooltipEle.appendChild(tipClose);
      EventHandler.add(tipClose, Browser.touchStartEvent, this.onStickyClose, this);
    };
    Tooltip2.prototype.addDescribedBy = function(target, id) {
      var describedby = (target.getAttribute("aria-describedby") || "").split(/\s+/);
      if (describedby.indexOf(id) < 0) {
        describedby.push(id);
      }
      attributes(target, { "aria-describedby": describedby.join(" ").trim(), "data-tooltip-id": id });
    };
    Tooltip2.prototype.removeDescribedBy = function(target) {
      var id = target.getAttribute("data-tooltip-id");
      var describedby = (target.getAttribute("aria-describedby") || "").split(/\s+/);
      var index = describedby.indexOf(id);
      if (index !== -1) {
        describedby.splice(index, 1);
      }
      target.removeAttribute("data-tooltip-id");
      var orgdescribedby = describedby.join(" ").trim();
      if (orgdescribedby) {
        target.setAttribute("aria-describedby", orgdescribedby);
      } else {
        target.removeAttribute("aria-describedby");
      }
    };
    Tooltip2.prototype.tapHoldHandler = function(evt) {
      clearTimeout(this.autoCloseTimer);
      this.targetHover(evt.originalEvent);
    };
    Tooltip2.prototype.touchEndHandler = function(e) {
      var _this = this;
      if (this.isSticky) {
        return;
      }
      var close = function() {
        _this.close();
      };
      this.autoCloseTimer = setTimeout(close, TOUCHEND_HIDE_DELAY);
    };
    Tooltip2.prototype.targetClick = function(e) {
      var target;
      if (this.target) {
        target = closest(e.target, this.target);
      } else {
        target = this.element;
      }
      if (isNullOrUndefined(target)) {
        return;
      }
      if (target.getAttribute("data-tooltip-id") === null) {
        this.targetHover(e);
      } else if (!this.isSticky) {
        this.hideTooltip(this.animation.close, e, target);
      }
    };
    Tooltip2.prototype.targetHover = function(e) {
      var target;
      if (this.target) {
        target = closest(e.target, this.target);
      } else {
        target = this.element;
      }
      if (isNullOrUndefined(target) || target.getAttribute("data-tooltip-id") !== null && this.closeDelay === 0) {
        return;
      }
      var targetList = [].slice.call(selectAll('[data-tooltip-id= "' + this.ctrlId + '_content"]', document));
      for (var _i = 0, targetList_1 = targetList; _i < targetList_1.length; _i++) {
        var target_1 = targetList_1[_i];
        this.restoreElement(target_1);
      }
      this.showTooltip(target, this.animation.open, e);
    };
    Tooltip2.prototype.mouseMoveBeforeOpen = function(e) {
      this.mouseMoveEvent = e;
    };
    Tooltip2.prototype.mouseMoveBeforeRemove = function() {
      if (this.mouseMoveTarget) {
        EventHandler.remove(this.mouseMoveTarget, "mousemove touchstart", this.mouseMoveBeforeOpen);
      }
    };
    Tooltip2.prototype.showTooltip = function(target, showAnimation, e) {
      var _this = this;
      clearTimeout(this.showTimer);
      clearTimeout(this.hideTimer);
      if (this.openDelay && this.mouseTrail) {
        this.mouseMoveBeforeRemove();
        this.mouseMoveTarget = target;
        EventHandler.add(this.mouseMoveTarget, "mousemove touchstart", this.mouseMoveBeforeOpen, this);
      }
      this.tooltipEventArgs = {
        type: e ? e.type : null,
        cancel: false,
        target,
        event: e ? e : null,
        element: this.tooltipEle,
        isInteracted: !isNullOrUndefined(e)
      };
      var observeCallback = function(beforeRenderArgs) {
        _this.beforeRenderCallback(beforeRenderArgs, target, e, showAnimation);
      };
      this.trigger("beforeRender", this.tooltipEventArgs, observeCallback.bind(this));
    };
    Tooltip2.prototype.beforeRenderCallback = function(beforeRenderArgs, target, e, showAnimation) {
      if (beforeRenderArgs.cancel) {
        this.isHidden = true;
        this.clear();
        this.mouseMoveBeforeRemove();
      } else {
        this.isHidden = false;
        if (isNullOrUndefined(this.tooltipEle)) {
          this.ctrlId = this.element.getAttribute("id") ? getUniqueID(this.element.getAttribute("id")) : getUniqueID("tooltip");
          this.tooltipEle = this.createElement("div", {
            className: TOOLTIP_WRAP + " " + POPUP_ROOT2 + " " + POPUP_LIB,
            attrs: {
              role: "tooltip",
              "aria-hidden": "false",
              "id": this.ctrlId + "_content"
            },
            styles: "width:" + formatUnit(this.width) + ";height:" + formatUnit(this.height) + ";position:absolute;"
          });
          this.tooltipBeforeRender(target, this);
          this.tooltipAfterRender(target, e, showAnimation, this);
        } else {
          if (target) {
            this.adjustArrow(target, this.position, this.tooltipPositionX, this.tooltipPositionY);
            this.addDescribedBy(target, this.ctrlId + "_content");
            this.renderContent(target);
            Animation.stop(this.tooltipEle);
            this.reposition(target);
            this.tooltipAfterRender(target, e, showAnimation, this);
          }
        }
      }
    };
    Tooltip2.prototype.appendContainer = function(ctrlObj) {
      if (typeof this.container == "string") {
        if (this.container === "body") {
          this.containerElement = document.body;
        } else {
          this.isBodyContainer = false;
          this.containerElement = select(this.container, document);
        }
      } else if (this.container instanceof HTMLElement) {
        this.containerElement = this.container;
        this.isBodyContainer = this.containerElement.tagName === "BODY";
      }
      if (!this.isBodyContainer) {
        addClass([this.containerElement], POPUP_CONTAINER);
      }
      this.containerElement.appendChild(ctrlObj.tooltipEle);
    };
    Tooltip2.prototype.tooltipBeforeRender = function(target, ctrlObj) {
      if (target) {
        if (Browser.isDevice) {
          addClass([ctrlObj.tooltipEle], DEVICE2);
        }
        if (ctrlObj.width !== "auto") {
          ctrlObj.tooltipEle.style.maxWidth = formatUnit(ctrlObj.width);
        }
        ctrlObj.tooltipEle.appendChild(ctrlObj.createElement("div", { className: CONTENT }));
        this.appendContainer(ctrlObj);
        removeClass([ctrlObj.tooltipEle], HIDE_POPUP);
        ctrlObj.addDescribedBy(target, ctrlObj.ctrlId + "_content");
        ctrlObj.renderContent(target);
        addClass([ctrlObj.tooltipEle], POPUP_OPEN);
        if (ctrlObj.showTipPointer) {
          ctrlObj.renderArrow();
        }
        ctrlObj.renderCloseIcon();
        ctrlObj.renderPopup(target);
        ctrlObj.adjustArrow(target, ctrlObj.position, ctrlObj.tooltipPositionX, ctrlObj.tooltipPositionY);
        Animation.stop(ctrlObj.tooltipEle);
        ctrlObj.reposition(target);
      }
    };
    Tooltip2.prototype.tooltipAfterRender = function(target, e, showAnimation, ctrlObj) {
      if (target) {
        removeClass([ctrlObj.tooltipEle], POPUP_OPEN);
        addClass([ctrlObj.tooltipEle], POPUP_CLOSE);
        ctrlObj.tooltipEventArgs = {
          type: e ? e.type : null,
          cancel: false,
          target,
          event: e ? e : null,
          element: ctrlObj.tooltipEle,
          isInteracted: !isNullOrUndefined(e)
        };
        if (ctrlObj.needTemplateReposition() && !ctrlObj.mouseTrail) {
          ctrlObj.tooltipEle.style.display = "none";
        }
        var observeCallback = function(observedArgs) {
          ctrlObj.beforeOpenCallback(observedArgs, target, showAnimation, e);
        };
        ctrlObj.trigger("beforeOpen", ctrlObj.tooltipEventArgs, observeCallback.bind(ctrlObj));
      }
    };
    Tooltip2.prototype.beforeOpenCallback = function(observedArgs, target, showAnimation, e) {
      var _this = this;
      if (observedArgs.cancel) {
        this.isHidden = true;
        this.clear();
        this.mouseMoveBeforeRemove();
        this.restoreElement(target);
      } else {
        var openAnimation_1 = {
          name: showAnimation.effect === "None" && animationMode === "Enable" ? "FadeIn" : this.animation.open.effect,
          duration: showAnimation.duration,
          delay: showAnimation.delay,
          timingFunction: "easeOut"
        };
        if (showAnimation.effect === "None") {
          openAnimation_1 = void 0;
        }
        if (this.openDelay > 0) {
          var show = function() {
            if (_this.mouseTrail) {
              EventHandler.add(target, "mousemove touchstart mouseenter", _this.onMouseMove, _this);
            }
            if (_this.popupObj) {
              _this.popupObj.show(openAnimation_1, target);
              if (_this.mouseMoveEvent && _this.mouseTrail) {
                _this.onMouseMove(_this.mouseMoveEvent);
              }
            }
          };
          this.showTimer = setTimeout(show, this.openDelay);
        } else {
          if (this.popupObj) {
            this.popupObj.show(openAnimation_1, target);
          }
        }
      }
      if (e) {
        this.wireMouseEvents(e, target);
      }
    };
    Tooltip2.prototype.needTemplateReposition = function() {
      var tooltip = this;
      return !isNullOrUndefined(tooltip.viewContainerRef) && typeof tooltip.viewContainerRef !== "string" || this.isReact;
    };
    Tooltip2.prototype.checkCollision = function(target, x, y) {
      var elePos = {
        left: x,
        top: y,
        position: this.position,
        horizontal: this.tooltipPositionX,
        vertical: this.tooltipPositionY
      };
      var affectedPos = isCollide(this.tooltipEle, this.checkCollideTarget(), x, y);
      if (affectedPos.length > 0) {
        elePos.horizontal = affectedPos.indexOf("left") >= 0 ? "Right" : affectedPos.indexOf("right") >= 0 ? "Left" : this.tooltipPositionX;
        elePos.vertical = affectedPos.indexOf("top") >= 0 ? "Bottom" : affectedPos.indexOf("bottom") >= 0 ? "Top" : this.tooltipPositionY;
      }
      return elePos;
    };
    Tooltip2.prototype.calculateElementPosition = function(pos, offsetPos) {
      return [
        this.isBodyContainer ? pos.left + offsetPos.left : pos.left - this.containerElement.offsetLeft + offsetPos.left + window.pageXOffset + this.containerElement.scrollLeft,
        this.isBodyContainer ? pos.top + offsetPos.top : pos.top - this.containerElement.offsetTop + offsetPos.top + window.pageYOffset + this.containerElement.scrollTop
      ];
    };
    Tooltip2.prototype.collisionFlipFit = function(target, x, y) {
      var elePos = this.checkCollision(target, x, y);
      var newpos = elePos.position;
      if (this.tooltipPositionY !== elePos.vertical) {
        newpos = this.position.indexOf("Bottom") === 0 || this.position.indexOf("Top") === 0 ? elePos.vertical + this.tooltipPositionX : this.tooltipPositionX + elePos.vertical;
      }
      if (this.tooltipPositionX !== elePos.horizontal) {
        if (newpos.indexOf("Left") === 0) {
          elePos.vertical = newpos === "LeftTop" || newpos === "LeftCenter" ? "Top" : "Bottom";
          newpos = elePos.vertical + "Left";
        }
        if (newpos.indexOf("Right") === 0) {
          elePos.vertical = newpos === "RightTop" || newpos === "RightCenter" ? "Top" : "Bottom";
          newpos = elePos.vertical + "Right";
        }
        elePos.horizontal = this.tooltipPositionX;
      }
      this.tooltipEventArgs = {
        type: null,
        cancel: false,
        target,
        event: null,
        element: this.tooltipEle,
        collidedPosition: newpos
      };
      this.trigger("beforeCollision", this.tooltipEventArgs);
      if (this.tooltipEventArgs.cancel) {
        newpos = this.position;
      } else {
        var elePosVertical = elePos.vertical;
        var elePosHorizontal = elePos.horizontal;
        if (elePos.position !== newpos) {
          var pos = calculatePosition(target, elePosHorizontal, elePosVertical, !this.isBodyContainer, this.isBodyContainer ? null : this.containerElement.getBoundingClientRect());
          this.adjustArrow(target, newpos, elePosHorizontal, elePosVertical);
          var scalingFactors = this.getScalingFactor(target);
          var offsetPos = this.calculateTooltipOffset(newpos, scalingFactors.x, scalingFactors.y);
          offsetPos.top -= this.getOffSetPosition("TopBottom", newpos, this.offsetY);
          offsetPos.left -= this.getOffSetPosition("RightLeft", newpos, this.offsetX);
          elePos.position = newpos;
          var elePosition = this.calculateElementPosition(pos, offsetPos);
          elePos.left = elePosition[0];
          elePos.top = elePosition[1];
        } else {
          this.adjustArrow(target, newpos, elePosHorizontal, elePosVertical);
        }
      }
      var eleOffset = { left: elePos.left, top: elePos.top };
      var position = fit(this.tooltipEle, this.checkCollideTarget(), { X: true, Y: this.windowCollision }, eleOffset);
      this.tooltipEle.style.display = "block";
      var arrowEle = select("." + ARROW_TIP, this.tooltipEle);
      if (this.showTipPointer && arrowEle != null && (newpos.indexOf("Bottom") === 0 || newpos.indexOf("Top") === 0)) {
        var arrowleft = parseInt(arrowEle.style.left, 10) - (position.left - elePos.left);
        if (arrowleft < 0) {
          arrowleft = 0;
        } else if (arrowleft + arrowEle.offsetWidth > this.tooltipEle.clientWidth) {
          arrowleft = this.tooltipEle.clientWidth - arrowEle.offsetWidth;
        }
        arrowEle.style.left = arrowleft.toString() + "px";
      }
      this.tooltipEle.style.display = "";
      eleOffset.left = position.left;
      eleOffset.top = position.top;
      return eleOffset;
    };
    Tooltip2.prototype.getOffSetPosition = function(positionString, newPos, offsetType) {
      return positionString.indexOf(this.position.split(/(?=[A-Z])/)[0]) !== -1 && positionString.indexOf(newPos.split(/(?=[A-Z])/)[0]) !== -1 ? 2 * offsetType : 0;
    };
    Tooltip2.prototype.checkCollideTarget = function() {
      return !this.windowCollision && this.target ? this.element : null;
    };
    Tooltip2.prototype.hideTooltip = function(hideAnimation, e, targetElement2) {
      var _this = this;
      if (this.closeDelay > 0) {
        clearTimeout(this.hideTimer);
        clearTimeout(this.showTimer);
        var hide = function() {
          if (_this.closeDelay && _this.tooltipEle && _this.isTooltipOpen) {
            return;
          }
          _this.tooltipHide(hideAnimation, e, targetElement2);
        };
        this.hideTimer = setTimeout(hide, this.closeDelay);
      } else {
        this.tooltipHide(hideAnimation, e, targetElement2);
      }
    };
    Tooltip2.prototype.tooltipHide = function(hideAnimation, e, targetElement2) {
      var _this = this;
      var target;
      if (e) {
        target = this.target ? targetElement2 || e.target : this.element;
      } else {
        target = select('[data-tooltip-id= "' + this.ctrlId + '_content"]', document);
      }
      this.tooltipEventArgs = {
        type: e ? e.type : null,
        cancel: false,
        target,
        event: e ? e : null,
        element: this.tooltipEle,
        isInteracted: !isNullOrUndefined(e)
      };
      this.trigger("beforeClose", this.tooltipEventArgs, function(observedArgs) {
        if (!observedArgs.cancel) {
          _this.mouseMoveBeforeRemove();
          _this.popupHide(hideAnimation, target, e);
        } else {
          _this.isHidden = false;
        }
      });
      this.tooltipEventArgs = null;
    };
    Tooltip2.prototype.popupHide = function(hideAnimation, target, e) {
      if (target && e) {
        this.restoreElement(target);
      }
      this.isHidden = true;
      var closeAnimation = {
        name: hideAnimation.effect === "None" && animationMode === "Enable" ? "FadeOut" : this.animation.close.effect,
        duration: hideAnimation.duration,
        delay: hideAnimation.delay,
        timingFunction: "easeIn"
      };
      if (hideAnimation.effect === "None") {
        closeAnimation = void 0;
      }
      if (this.popupObj) {
        this.popupObj.hide(closeAnimation);
      }
    };
    Tooltip2.prototype.restoreElement = function(target) {
      this.unwireMouseEvents(target);
      if (!isNullOrUndefined(target.getAttribute("data-content"))) {
        target.setAttribute("title", target.getAttribute("data-content"));
        target.removeAttribute("data-content");
      }
      this.removeDescribedBy(target);
    };
    Tooltip2.prototype.clear = function() {
      var target = this.findTarget();
      if (target) {
        this.restoreElement(target);
      }
      if (this.tooltipEle) {
        removeClass([this.tooltipEle], POPUP_CLOSE);
        addClass([this.tooltipEle], POPUP_OPEN);
      }
      if (this.isHidden) {
        if (this.popupObj) {
          this.popupObj.destroy();
        }
        if (this.tooltipEle) {
          remove(this.tooltipEle);
        }
        this.tooltipEle = null;
        this.popupObj = null;
      }
    };
    Tooltip2.prototype.tooltipHover = function(e) {
      if (this.tooltipEle) {
        this.isTooltipOpen = true;
      }
    };
    Tooltip2.prototype.tooltipMouseOut = function(e) {
      this.isTooltipOpen = false;
      this.hideTooltip(this.animation.close, e, this.findTarget());
    };
    Tooltip2.prototype.onMouseOut = function(e) {
      var enteredElement = e.relatedTarget;
      if (enteredElement && !this.mouseTrail) {
        var checkForTooltipElement = closest(enteredElement, "." + TOOLTIP_WRAP + "." + POPUP_LIB + "." + POPUP_ROOT2);
        if (checkForTooltipElement) {
          EventHandler.add(checkForTooltipElement, "mouseleave", this.tooltipElementMouseOut, this);
        } else {
          this.hideTooltip(this.animation.close, e, this.findTarget());
          if (this.closeDelay === 0) {
            this.clear();
          }
        }
      } else {
        this.hideTooltip(this.animation.close, e, this.findTarget());
        this.clear();
      }
    };
    Tooltip2.prototype.tooltipElementMouseOut = function(e) {
      this.hideTooltip(this.animation.close, e, this.findTarget());
      EventHandler.remove(this.element, "mouseleave", this.tooltipElementMouseOut);
      this.clear();
    };
    Tooltip2.prototype.onStickyClose = function(e) {
      this.close();
    };
    Tooltip2.prototype.onMouseMove = function(event) {
      var eventPageX = 0;
      var eventPageY = 0;
      if (event.type.indexOf("touch") > -1) {
        event.preventDefault();
        eventPageX = event.touches[0].pageX;
        eventPageY = event.touches[0].pageY;
      } else {
        eventPageX = event.pageX;
        eventPageY = event.pageY;
      }
      Animation.stop(this.tooltipEle);
      removeClass([this.tooltipEle], POPUP_CLOSE);
      addClass([this.tooltipEle], POPUP_OPEN);
      this.adjustArrow(event.target, this.position, this.tooltipPositionX, this.tooltipPositionY);
      var scalingFactors = this.getScalingFactor(event.target);
      var pos = this.calculateTooltipOffset(this.position, scalingFactors.x, scalingFactors.y);
      var x = eventPageX + pos.left + this.offsetX;
      var y = eventPageY + pos.top + this.offsetY;
      var elePos = this.checkCollision(event.target, x, y);
      if (this.tooltipPositionX !== elePos.horizontal || this.tooltipPositionY !== elePos.vertical) {
        var newpos = this.position.indexOf("Bottom") === 0 || this.position.indexOf("Top") === 0 ? elePos.vertical + elePos.horizontal : elePos.horizontal + elePos.vertical;
        elePos.position = newpos;
        this.adjustArrow(event.target, elePos.position, elePos.horizontal, elePos.vertical);
        var colpos = this.calculateTooltipOffset(elePos.position, scalingFactors.x, scalingFactors.y);
        elePos.left = eventPageX + colpos.left - this.offsetX;
        elePos.top = eventPageY + colpos.top - this.offsetY;
      }
      this.tooltipEle.style.left = elePos.left + "px";
      this.tooltipEle.style.top = elePos.top + "px";
    };
    Tooltip2.prototype.keyDown = function(event) {
      if (this.tooltipEle && event.keyCode === 27) {
        this.close();
      }
    };
    Tooltip2.prototype.touchEnd = function(e) {
      if (this.tooltipEle && closest(e.target, "." + ROOT4) === null && !this.isSticky) {
        this.close();
      }
    };
    Tooltip2.prototype.scrollHandler = function(e) {
      if (this.tooltipEle && !this.isSticky) {
        if (!closest(e.target, "." + TOOLTIP_WRAP + "." + POPUP_LIB + "." + POPUP_ROOT2)) {
          this.close();
        }
      }
    };
    Tooltip2.prototype.render = function() {
      this.initialize();
      this.wireEvents(this.opensOn);
      this.renderComplete();
    };
    Tooltip2.prototype.preRender = function() {
      this.tipClass = TIP_BOTTOM;
      this.tooltipPositionX = "Center";
      this.tooltipPositionY = "Top";
      this.isHidden = true;
    };
    Tooltip2.prototype.wireEvents = function(trigger) {
      var triggerList = this.getTriggerList(trigger);
      for (var _i = 0, triggerList_1 = triggerList; _i < triggerList_1.length; _i++) {
        var opensOn = triggerList_1[_i];
        if (opensOn === "Custom") {
          return;
        }
        if (opensOn === "Focus") {
          this.wireFocusEvents();
        }
        if (opensOn === "Click") {
          EventHandler.add(this.element, Browser.touchStartEvent, this.targetClick, this);
        }
        if (opensOn === "Hover") {
          if (Browser.isDevice) {
            this.touchModule = new Touch(this.element, {
              tapHoldThreshold: TAPHOLD_THRESHOLD,
              tapHold: this.tapHoldHandler.bind(this)
            });
            EventHandler.add(this.element, Browser.touchEndEvent, this.touchEndHandler, this);
          } else {
            EventHandler.add(this.element, "mouseover", this.targetHover, this);
          }
        }
      }
      EventHandler.add(document, "touchend", this.touchEnd, this);
      EventHandler.add(document, "scroll wheel", this.scrollHandler, this);
      EventHandler.add(window, "resize", this.windowResize, this);
      EventHandler.add(document, "keydown", this.keyDown, this);
    };
    Tooltip2.prototype.getTriggerList = function(trigger) {
      if (trigger === "Auto") {
        trigger = Browser.isDevice ? "Hover" : "Hover Focus";
      }
      return trigger.split(" ");
    };
    Tooltip2.prototype.wireFocusEvents = function() {
      if (!isNullOrUndefined(this.target)) {
        var targetList = [].slice.call(selectAll(this.target, this.element));
        this.targetsList = targetList;
        for (var _i = 0, targetList_2 = targetList; _i < targetList_2.length; _i++) {
          var target = targetList_2[_i];
          EventHandler.add(target, "focus", this.targetHover, this);
        }
      } else {
        EventHandler.add(this.element, "focusin", this.targetHover, this);
      }
    };
    Tooltip2.prototype.wireMouseEvents = function(e, target) {
      if (this.tooltipEle) {
        if (!this.isSticky) {
          if (e.type === "focus") {
            EventHandler.add(target, "blur", this.onMouseOut, this);
          }
          if (e.type === "focusin") {
            EventHandler.add(target, "focusout", this.onMouseOut, this);
          }
          if (e.type === "mouseover") {
            EventHandler.add(target, "mouseleave", this.onMouseOut, this);
          }
          if (this.closeDelay) {
            EventHandler.add(this.tooltipEle, "mouseenter", this.tooltipHover, this);
            EventHandler.add(this.tooltipEle, "mouseleave", this.tooltipMouseOut, this);
          }
        }
        if (this.mouseTrail && this.openDelay === 0) {
          EventHandler.add(target, "mousemove touchstart mouseenter", this.onMouseMove, this);
        }
      }
    };
    Tooltip2.prototype.unwireEvents = function(trigger) {
      var triggerList = this.getTriggerList(trigger);
      for (var _i = 0, triggerList_2 = triggerList; _i < triggerList_2.length; _i++) {
        var opensOn = triggerList_2[_i];
        if (opensOn === "Custom") {
          return;
        }
        if (opensOn === "Focus") {
          this.unwireFocusEvents();
        }
        if (opensOn === "Click") {
          EventHandler.remove(this.element, Browser.touchStartEvent, this.targetClick);
        }
        if (opensOn === "Hover") {
          if (Browser.isDevice) {
            if (this.touchModule) {
              this.touchModule.destroy();
            }
            EventHandler.remove(this.element, Browser.touchEndEvent, this.touchEndHandler);
          } else {
            EventHandler.remove(this.element, "mouseover", this.targetHover);
          }
        }
      }
      EventHandler.remove(document, "touchend", this.touchEnd);
      EventHandler.remove(document, "scroll wheel", this.scrollHandler);
      EventHandler.remove(window, "resize", this.windowResize);
      EventHandler.remove(document, "keydown", this.keyDown);
    };
    Tooltip2.prototype.unwireFocusEvents = function() {
      if (!isNullOrUndefined(this.target)) {
        var targetList = [].slice.call(selectAll(this.target, this.element));
        for (var _i = 0, targetList_3 = targetList; _i < targetList_3.length; _i++) {
          var target = targetList_3[_i];
          EventHandler.remove(target, "focus", this.targetHover);
        }
      } else {
        EventHandler.remove(this.element, "focusin", this.targetHover);
      }
    };
    Tooltip2.prototype.unwireMouseEvents = function(target) {
      if (!this.isSticky) {
        var triggerList = this.getTriggerList(this.opensOn);
        for (var _i = 0, triggerList_3 = triggerList; _i < triggerList_3.length; _i++) {
          var opensOn = triggerList_3[_i];
          if (opensOn === "Focus") {
            EventHandler.remove(target, "blur", this.onMouseOut);
            EventHandler.remove(target, "focusout", this.onMouseOut);
          }
          if (opensOn === "Hover" && !Browser.isDevice) {
            EventHandler.remove(target, "mouseleave", this.onMouseOut);
          }
        }
        if (this.closeDelay) {
          EventHandler.remove(target, "mouseenter", this.tooltipHover);
          EventHandler.remove(target, "mouseleave", this.tooltipMouseOut);
        }
      }
      if (this.mouseTrail) {
        EventHandler.remove(target, "mousemove touchstart mouseenter", this.onMouseMove);
      }
    };
    Tooltip2.prototype.findTarget = function() {
      var target = select('[data-tooltip-id= "' + this.ctrlId + '_content"]', document);
      return target;
    };
    Tooltip2.prototype.getModuleName = function() {
      return "tooltip";
    };
    Tooltip2.prototype.getPersistData = function() {
      return this.addOnPersist([]);
    };
    Tooltip2.prototype.onPropertyChanged = function(newProp, oldProp) {
      var targetElement2 = this.findTarget();
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "width":
            if (this.tooltipEle && targetElement2) {
              this.tooltipEle.style.width = this.tooltipEle.style.maxWidth = formatUnit(newProp.width);
              this.reposition(targetElement2);
            }
            break;
          case "height":
            if (this.tooltipEle && targetElement2) {
              this.tooltipEle.style.height = formatUnit(newProp.height);
              this.reposition(targetElement2);
            }
            break;
          case "content":
            if (this.tooltipEle) {
              this.renderContent();
            }
            break;
          case "opensOn":
            this.unwireEvents(oldProp.opensOn);
            this.wireEvents(newProp.opensOn);
            break;
          case "position":
            this.formatPosition();
            if (this.tooltipEle && targetElement2) {
              var arrowInnerELe = select("." + ARROW_TIP_INNER, this.tooltipEle);
              if (arrowInnerELe) {
                arrowInnerELe.style.top = arrowInnerELe.style.left = null;
              }
              this.reposition(targetElement2);
            }
            break;
          case "tipPointerPosition":
            if (this.tooltipEle && targetElement2) {
              this.reposition(targetElement2);
            }
            break;
          case "offsetX":
            if (this.tooltipEle) {
              var x = newProp.offsetX - oldProp.offsetX;
              this.tooltipEle.style.left = (parseInt(this.tooltipEle.style.left, 10) + x).toString() + "px";
            }
            break;
          case "offsetY":
            if (this.tooltipEle) {
              var y = newProp.offsetY - oldProp.offsetY;
              this.tooltipEle.style.top = (parseInt(this.tooltipEle.style.top, 10) + y).toString() + "px";
            }
            break;
          case "cssClass":
            if (this.tooltipEle) {
              if (oldProp.cssClass) {
                removeClass([this.tooltipEle], oldProp.cssClass.split(" "));
              }
              if (newProp.cssClass) {
                addClass([this.tooltipEle], newProp.cssClass.split(" "));
              }
            }
            break;
          case "enableRtl":
            if (this.tooltipEle) {
              if (this.enableRtl) {
                addClass([this.tooltipEle], RTL2);
              } else {
                removeClass([this.tooltipEle], RTL2);
              }
            }
            break;
          case "isSticky":
            if (this.tooltipEle && targetElement2) {
              this.renderCloseIcon();
              this.reposition(targetElement2);
            }
            break;
          case "container":
            if (!isNullOrUndefined(this.containerElement)) {
              removeClass([this.containerElement], POPUP_CONTAINER);
            }
            this.container = newProp.container;
            if (this.tooltipEle && targetElement2) {
              this.appendContainer(this);
              this.reposition(targetElement2);
            }
        }
      }
    };
    Tooltip2.prototype.open = function(element2, animation) {
      if (isNullOrUndefined(animation)) {
        animation = this.animation.open;
      }
      if (isNullOrUndefined(element2)) {
        element2 = this.element;
      }
      if (element2.style.display === "none") {
        return;
      }
      this.showTooltip(element2, animation);
    };
    Tooltip2.prototype.close = function(animation) {
      if (!animation) {
        animation = this.animation.close;
      }
      this.hideTooltip(animation);
    };
    Tooltip2.prototype.refresh = function(target) {
      if (this.tooltipEle) {
        this.renderContent(target);
      }
      if (this.popupObj && target) {
        this.reposition(target);
      }
      if (!isNullOrUndefined(this.targetsList) && !isNullOrUndefined(this.target)) {
        var target_2 = selectAll(this.target, this.element);
        if (target_2.length !== this.targetsList.length) {
          this.unwireEvents(this.opensOn);
          this.wireEvents(this.opensOn);
        }
      }
    };
    Tooltip2.prototype.destroy = function() {
      _super.prototype.destroy.call(this);
      if (this.tooltipEle) {
        remove(this.tooltipEle);
      }
      if (this.popupObj) {
        this.popupObj.destroy();
      }
      removeClass([this.element], ROOT4);
      this.unwireEvents(this.opensOn);
      this.unwireMouseEvents(this.element);
      this.tooltipEle = null;
      this.popupObj = null;
      var currentTarget = selectAll('[data-tooltip-id= "' + this.ctrlId + '_content"]', this.element);
      for (var _i = 0, currentTarget_1 = currentTarget; _i < currentTarget_1.length; _i++) {
        var target = currentTarget_1[_i];
        this.restoreElement(target);
      }
    };
    __decorate5([
      Property("auto")
    ], Tooltip2.prototype, "width", void 0);
    __decorate5([
      Property("auto")
    ], Tooltip2.prototype, "height", void 0);
    __decorate5([
      Property()
    ], Tooltip2.prototype, "content", void 0);
    __decorate5([
      Property("body")
    ], Tooltip2.prototype, "container", void 0);
    __decorate5([
      Property()
    ], Tooltip2.prototype, "target", void 0);
    __decorate5([
      Property("TopCenter")
    ], Tooltip2.prototype, "position", void 0);
    __decorate5([
      Property(0)
    ], Tooltip2.prototype, "offsetX", void 0);
    __decorate5([
      Property(0)
    ], Tooltip2.prototype, "offsetY", void 0);
    __decorate5([
      Property(true)
    ], Tooltip2.prototype, "showTipPointer", void 0);
    __decorate5([
      Property(true)
    ], Tooltip2.prototype, "enableHtmlParse", void 0);
    __decorate5([
      Property(false)
    ], Tooltip2.prototype, "windowCollision", void 0);
    __decorate5([
      Property("Auto")
    ], Tooltip2.prototype, "tipPointerPosition", void 0);
    __decorate5([
      Property("Auto")
    ], Tooltip2.prototype, "opensOn", void 0);
    __decorate5([
      Property(false)
    ], Tooltip2.prototype, "mouseTrail", void 0);
    __decorate5([
      Property(false)
    ], Tooltip2.prototype, "isSticky", void 0);
    __decorate5([
      Complex({}, Animation2)
    ], Tooltip2.prototype, "animation", void 0);
    __decorate5([
      Property(0)
    ], Tooltip2.prototype, "openDelay", void 0);
    __decorate5([
      Property(0)
    ], Tooltip2.prototype, "closeDelay", void 0);
    __decorate5([
      Property()
    ], Tooltip2.prototype, "cssClass", void 0);
    __decorate5([
      Property(false)
    ], Tooltip2.prototype, "enableHtmlSanitizer", void 0);
    __decorate5([
      Property("")
    ], Tooltip2.prototype, "htmlAttributes", void 0);
    __decorate5([
      Event()
    ], Tooltip2.prototype, "beforeRender", void 0);
    __decorate5([
      Event()
    ], Tooltip2.prototype, "beforeOpen", void 0);
    __decorate5([
      Event()
    ], Tooltip2.prototype, "afterOpen", void 0);
    __decorate5([
      Event()
    ], Tooltip2.prototype, "beforeClose", void 0);
    __decorate5([
      Event()
    ], Tooltip2.prototype, "afterClose", void 0);
    __decorate5([
      Event()
    ], Tooltip2.prototype, "beforeCollision", void 0);
    __decorate5([
      Event()
    ], Tooltip2.prototype, "created", void 0);
    __decorate5([
      Event()
    ], Tooltip2.prototype, "destroyed", void 0);
    Tooltip2 = __decorate5([
      NotifyPropertyChanges
    ], Tooltip2);
    return Tooltip2;
  }(Component)
);

// node_modules/@syncfusion/ej2-popups/src/spinner/spinner.js
var globalTimeOut = {};
var DEFT_MAT_WIDTH = 30;
var DEFT_MAT3_WIDTH = 30;
var DEFT_FAB_WIDTH = 30;
var DEFT_FLUENT_WIDTH = 30;
var DEFT_BOOT_WIDTH = 30;
var DEFT_BOOT4_WIDTH = 36;
var DEFT_BOOT5_WIDTH = 36;
var CLS_SHOWSPIN = "e-spin-show";
var CLS_HIDESPIN = "e-spin-hide";
var CLS_MATERIALSPIN = "e-spin-material";
var CLS_MATERIAL3SPIN = "e-spin-material3";
var CLS_FABRICSPIN = "e-spin-fabric";
var CLS_FLUENTSPIN = "e-spin-fluent";
var CLS_TAILWINDSPIN = "e-spin-tailwind";
var CLS_BOOTSPIN = "e-spin-bootstrap";
var CLS_BOOT4SPIN = "e-spin-bootstrap4";
var CLS_BOOT5SPIN = "e-spin-bootstrap5";
var CLS_HIGHCONTRASTSPIN = "e-spin-high-contrast";
var CLS_SPINWRAP = "e-spinner-pane";
var CLS_SPININWRAP = "e-spinner-inner";
var CLS_SPINCIRCLE = "e-path-circle";
var CLS_SPINARC = "e-path-arc";
var CLS_SPINLABEL = "e-spin-label";
var CLS_SPINTEMPLATE = "e-spin-template";
var spinTemplate = null;
var spinCSSClass = null;
function createSpinner(args, internalCreateElement) {
  var _a;
  if (!args.target) {
    return;
  }
  var radius;
  var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
  var container = create_spinner_container(args.target, makeElement);
  if (!isNullOrUndefined(args.cssClass)) {
    var classNames3 = args.cssClass.split(" ").filter(function(className) {
      return className.trim() !== "";
    });
    (_a = container.wrap.classList).add.apply(_a, classNames3);
  }
  if (!isNullOrUndefined(args.template) || !isNullOrUndefined(spinTemplate)) {
    var template = !isNullOrUndefined(args.template) ? args.template : spinTemplate;
    container.wrap.classList.add(CLS_SPINTEMPLATE);
    replaceContent(container.wrap, template, spinCSSClass);
  } else {
    var theme = !isNullOrUndefined(args.type) ? args.type : getTheme(container.wrap);
    var width = !isNullOrUndefined(args.width) ? args.width : void 0;
    radius = calculateRadius(width, theme);
    setTheme(theme, container.wrap, radius, makeElement);
    if (!isNullOrUndefined(args.label)) {
      createLabel(container.inner_wrap, args.label, makeElement);
    }
  }
  container.wrap.classList.add(CLS_HIDESPIN);
  container = null;
}
function createLabel(container, label, makeElement) {
  var labelEle = makeElement("div", {});
  labelEle.classList.add(CLS_SPINLABEL);
  labelEle.innerHTML = label;
  container.appendChild(labelEle);
  return labelEle;
}
function createMaterialSpinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Material", radius };
  create_material_element(container, uniqueID, makeElement, CLS_MATERIALSPIN);
  mat_calculate_attributes(radius, container, "Material", CLS_MATERIALSPIN);
}
function createMaterial3Spinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Material3", radius };
  create_material_element(container, uniqueID, makeElement, CLS_MATERIAL3SPIN);
  mat_calculate_attributes(radius, container, "Material3", CLS_MATERIAL3SPIN);
}
function createBootstrap4Spinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Bootstrap4", radius };
  create_material_element(container, uniqueID, makeElement, CLS_BOOT4SPIN);
  mat_calculate_attributes(radius, container, "Bootstrap4", CLS_BOOT4SPIN);
}
function createBootstrap5Spinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Bootstrap5", radius };
  create_material_element(container, uniqueID, makeElement, CLS_BOOT5SPIN);
  mat_calculate_attributes(radius, container, "Bootstrap5", CLS_BOOT5SPIN);
}
function startMatAnimate(container, uniqueID, radius) {
  var globalObject = {};
  var timeOutVar = 0;
  globalTimeOut["" + uniqueID].timeOut = 0;
  globalObject["" + uniqueID] = globalVariables(uniqueID, radius, 0, 0);
  var spinnerInfo = { uniqueID, container, globalInfo: globalObject, timeOutVar };
  animateMaterial(spinnerInfo);
}
function createFabricSpinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Fabric", radius };
  create_fabric_element(container, uniqueID, CLS_FABRICSPIN, makeElement);
  fb_calculate_attributes(radius, container, CLS_FABRICSPIN);
}
function createFluentSinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Fluent", radius };
  create_fabric_element(container, uniqueID, CLS_FLUENTSPIN, makeElement);
  fb_calculate_attributes(radius, container, CLS_FLUENTSPIN);
}
function createTailwindSpinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Tailwind", radius };
  create_fabric_element(container, uniqueID, CLS_TAILWINDSPIN, makeElement);
  fb_calculate_attributes(radius, container, CLS_TAILWINDSPIN);
}
function createHighContrastSpinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "HighContrast", radius };
  create_fabric_element(container, uniqueID, CLS_HIGHCONTRASTSPIN, makeElement);
  fb_calculate_attributes(radius, container, CLS_HIGHCONTRASTSPIN);
}
function getTheme(container) {
  var theme = window.getComputedStyle(container, ":after").getPropertyValue("content");
  return theme.replace(/['"]+/g, "");
}
function setTheme(theme, container, radius, makeElement) {
  var innerContainer = container.querySelector("." + CLS_SPININWRAP);
  var svg = innerContainer.querySelector("svg");
  if (!isNullOrUndefined(svg)) {
    innerContainer.removeChild(svg);
  }
  switch (theme) {
    case "Material":
      createMaterialSpinner(innerContainer, radius, makeElement);
      break;
    case "Material3":
      createMaterial3Spinner(innerContainer, radius, makeElement);
      break;
    case "Fabric":
      createFabricSpinner(innerContainer, radius, makeElement);
      break;
    case "Fluent":
      createFluentSinner(innerContainer, radius, makeElement);
      break;
    case "Bootstrap":
      createBootstrapSpinner(innerContainer, radius, makeElement);
      break;
    case "HighContrast":
      createHighContrastSpinner(innerContainer, radius, makeElement);
      break;
    case "Bootstrap4":
      createBootstrap4Spinner(innerContainer, radius, makeElement);
      break;
    case "Bootstrap5":
      createBootstrap5Spinner(innerContainer, radius, makeElement);
      break;
    case "Tailwind":
    case "Tailwind-dark":
      createTailwindSpinner(innerContainer, radius, makeElement);
      break;
  }
}
function createBootstrapSpinner(innerContainer, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Bootstrap", radius };
  create_bootstrap_element(innerContainer, uniqueID, makeElement);
  boot_calculate_attributes(innerContainer, radius);
}
function create_bootstrap_element(innerContainer, uniqueID, makeElement) {
  var svgBoot = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  var viewBoxValue = 64;
  var trans = 32;
  var defaultRadius = 2;
  svgBoot.setAttribute("id", uniqueID);
  svgBoot.setAttribute("class", CLS_BOOTSPIN);
  svgBoot.setAttribute("viewBox", "0 0 " + viewBoxValue + " " + viewBoxValue);
  innerContainer.insertBefore(svgBoot, innerContainer.firstChild);
  for (var item = 0; item <= 7; item++) {
    var bootCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    bootCircle.setAttribute("class", CLS_SPINCIRCLE + "_" + item);
    bootCircle.setAttribute("r", defaultRadius + "");
    bootCircle.setAttribute("transform", "translate(" + trans + "," + trans + ")");
    svgBoot.appendChild(bootCircle);
  }
}
function boot_calculate_attributes(innerContainer, radius) {
  var svg = innerContainer.querySelector("svg.e-spin-bootstrap");
  var x = 0;
  var y = 0;
  var rad = 24;
  svg.style.width = svg.style.height = radius + "px";
  var startArc = 90;
  for (var item = 0; item <= 7; item++) {
    var start = defineArcPoints(x, y, rad, startArc);
    var circleEle = svg.querySelector("." + CLS_SPINCIRCLE + "_" + item);
    circleEle.setAttribute("cx", start.x + "");
    circleEle.setAttribute("cy", start.y + "");
    startArc = startArc >= 360 ? 0 : startArc;
    startArc = startArc + 45;
  }
}
function generateSeries(begin, stop) {
  var series = [];
  var start = begin;
  var end = stop;
  var increment = false, count = 1;
  formSeries(start);
  function formSeries(i) {
    series.push(i);
    if (i !== end || count === 1) {
      if (i <= start && i > 1 && !increment) {
        i = parseFloat((i - 0.2).toFixed(2));
      } else if (i === 1) {
        i = 7;
        i = parseFloat((i + 0.2).toFixed(2));
        increment = true;
      } else if (i < 8 && increment) {
        i = parseFloat((i + 0.2).toFixed(2));
        if (i === 8) {
          increment = false;
        }
      } else if (i <= 8 && !increment) {
        i = parseFloat((i - 0.2).toFixed(2));
      }
      ++count;
      formSeries(i);
    }
  }
  return series;
}
function animateBootstrap(innerContainer) {
  var svg = innerContainer.querySelector("svg.e-spin-bootstrap");
  var id = svg.getAttribute("id");
  for (var i = 1; i <= 8; i++) {
    var circleEle = innerContainer.getElementsByClassName("e-path-circle_" + (i === 8 ? 0 : i))[0];
    rotation(circleEle, i, i, generateSeries(i, i), id);
  }
  function rotation(circle, start, end, series, id2) {
    var count = 0;
    boot_animate(start);
    function boot_animate(radius) {
      if (globalTimeOut["" + id2].isAnimate) {
        ++count;
        circle.setAttribute("r", radius + "");
        if (count >= series.length) {
          count = 0;
        }
        globalTimeOut[id2].timeOut = setTimeout(boot_animate.bind(null, series[count]), 18);
      }
    }
  }
}
function replaceContent(container, template, cssClass) {
  if (!isNullOrUndefined(cssClass)) {
    container.classList.add(cssClass);
  }
  var inner = container.querySelector(".e-spinner-inner");
  inner.innerHTML = template;
}
function calculateRadius(width, theme) {
  var defaultSize;
  switch (theme) {
    case "Material":
      defaultSize = DEFT_MAT_WIDTH;
      break;
    case "Material3":
      defaultSize = DEFT_MAT3_WIDTH;
      break;
    case "Fabric":
      defaultSize = DEFT_FAB_WIDTH;
      break;
    case "Tailwind":
    case "Tailwind-dark":
      defaultSize = DEFT_FAB_WIDTH;
      break;
    case "Fluent":
      defaultSize = DEFT_FLUENT_WIDTH;
      break;
    case "Bootstrap4":
      defaultSize = DEFT_BOOT4_WIDTH;
      break;
    case "Bootstrap5":
      defaultSize = DEFT_BOOT5_WIDTH;
      break;
    default:
      defaultSize = DEFT_BOOT_WIDTH;
  }
  width = width ? parseFloat(width + "") : defaultSize;
  return theme === "Bootstrap" ? width : width / 2;
}
function globalVariables(id, radius, count, previousId) {
  return {
    radius,
    count,
    previousId
  };
}
function random_generator() {
  var random = "";
  var combine = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++) {
    random += combine.charAt(Math.floor(Math.random() * combine.length));
  }
  return random;
}
function create_fabric_element(innerCon, uniqueID, themeClass, makeElement) {
  var svgFabric = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgFabric.setAttribute("id", uniqueID);
  svgFabric.setAttribute("class", themeClass);
  var fabricCirclePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  fabricCirclePath.setAttribute("class", CLS_SPINCIRCLE);
  var fabricCircleArc = document.createElementNS("http://www.w3.org/2000/svg", "path");
  fabricCircleArc.setAttribute("class", CLS_SPINARC);
  innerCon.insertBefore(svgFabric, innerCon.firstChild);
  svgFabric.appendChild(fabricCirclePath);
  svgFabric.appendChild(fabricCircleArc);
}
function create_material_element(innerContainer, uniqueID, makeElement, cls) {
  var svgMaterial = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  var matCirclePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  svgMaterial.setAttribute("class", cls);
  svgMaterial.setAttribute("id", uniqueID);
  matCirclePath.setAttribute("class", CLS_SPINCIRCLE);
  innerContainer.insertBefore(svgMaterial, innerContainer.firstChild);
  svgMaterial.appendChild(matCirclePath);
}
function create_spinner_container(target, makeElement) {
  var spinnerContainer = makeElement("div", {});
  var spinnerInnerContainer = makeElement("div", {});
  spinnerContainer.classList.add(CLS_SPINWRAP);
  spinnerInnerContainer.classList.add(CLS_SPININWRAP);
  spinnerInnerContainer.setAttribute("aria-disabled", "true");
  target.appendChild(spinnerContainer);
  spinnerContainer.appendChild(spinnerInnerContainer);
  return { wrap: spinnerContainer, inner_wrap: spinnerInnerContainer };
}
function animateMaterial(spinnerInfo) {
  var start = 1;
  var end = 149;
  var duration = 1333;
  var max = 75;
  createCircle(start, end, easeAnimation, duration, spinnerInfo.globalInfo[spinnerInfo.uniqueID].count, max, spinnerInfo);
  spinnerInfo.globalInfo[spinnerInfo.uniqueID].count = ++spinnerInfo.globalInfo[spinnerInfo.uniqueID].count % 4;
}
function createCircle(start, end, easing, duration, count, max, spinnerInfo) {
  var id = ++spinnerInfo.globalInfo[spinnerInfo.uniqueID].previousId;
  var startTime = (/* @__PURE__ */ new Date()).getTime();
  var change = end - start;
  var diameter = getSize(spinnerInfo.globalInfo[spinnerInfo.uniqueID].radius * 2 + "");
  var strokeSize = getStrokeSize(diameter);
  var rotate = -90 * (spinnerInfo.globalInfo[spinnerInfo.uniqueID].count || 0);
  mat_animation(spinnerInfo);
  function mat_animation(spinnerInfo2) {
    var currentTime = Math.max(0, Math.min((/* @__PURE__ */ new Date()).getTime() - startTime, duration));
    updatePath(easing(currentTime, start, change, duration), spinnerInfo2.container);
    if (id === spinnerInfo2.globalInfo[spinnerInfo2.uniqueID].previousId && currentTime < duration) {
      globalTimeOut[spinnerInfo2.uniqueID].timeOut = setTimeout(mat_animation.bind(null, spinnerInfo2), 1);
    } else {
      animateMaterial(spinnerInfo2);
    }
  }
  function updatePath(value, container) {
    if (!isNullOrUndefined(container.querySelector("svg.e-spin-material")) || !isNullOrUndefined(container.querySelector("svg.e-spin-material3"))) {
      var svg = void 0;
      if (!isNullOrUndefined(container.querySelector("svg.e-spin-material")) && !isNullOrUndefined(container.querySelector("svg.e-spin-material").querySelector("path.e-path-circle"))) {
        svg = container.querySelector("svg.e-spin-material");
      } else if (!isNullOrUndefined(container.querySelector("svg.e-spin-material3")) && !isNullOrUndefined(container.querySelector("svg.e-spin-material3").querySelector("path.e-path-circle"))) {
        svg = container.querySelector("svg.e-spin-material3");
      }
      if (!isNullOrUndefined(svg)) {
        var path = svg.querySelector("path.e-path-circle");
        path.setAttribute("stroke-dashoffset", getDashOffset(diameter, strokeSize, value, max) + "");
        path.setAttribute("transform", "rotate(" + rotate + " " + diameter / 2 + " " + diameter / 2 + ")");
      }
    }
  }
}
function mat_calculate_attributes(radius, container, type, cls) {
  var diameter = radius * 2;
  var svg = container.querySelector("svg." + cls);
  var path = svg.querySelector("path.e-path-circle");
  var strokeSize = getStrokeSize(diameter);
  var transformOrigin = diameter / 2 + "px";
  svg.setAttribute("viewBox", "0 0 " + diameter + " " + diameter);
  svg.style.width = svg.style.height = diameter + "px";
  svg.style.transformOrigin = transformOrigin + " " + transformOrigin + " " + transformOrigin;
  path.setAttribute("d", drawArc(diameter, strokeSize));
  if (type === "Material" || type === "Material3") {
    path.setAttribute("stroke-width", strokeSize + "");
    path.setAttribute("stroke-dasharray", (diameter - strokeSize) * Math.PI * 0.75 + "");
    path.setAttribute("stroke-dashoffset", getDashOffset(diameter, strokeSize, 1, 75) + "");
  }
}
function getSize(value) {
  var parsed = parseFloat(value);
  return parsed;
}
function drawArc(diameter, strokeSize) {
  var radius = diameter / 2;
  var offset = strokeSize / 2;
  return "M" + radius + "," + offset + "A" + (radius - offset) + "," + (radius - offset) + " 0 1 1 " + offset + "," + radius;
}
function getStrokeSize(diameter) {
  return 10 / 100 * diameter;
}
function getDashOffset(diameter, strokeSize, value, max) {
  return (diameter - strokeSize) * Math.PI * (3 * max / 100 - value / 100);
}
function easeAnimation(current, start, change, duration) {
  var timestamp = (current /= duration) * current;
  var timecount = timestamp * current;
  return start + change * (6 * timecount * timestamp + -15 * timestamp * timestamp + 10 * timecount);
}
function fb_calculate_attributes(radius, innerConainer, trgClass) {
  var centerX = radius;
  var centerY = radius;
  var diameter = radius * 2;
  var startArc = 315, endArc = 45;
  var svg = innerConainer.querySelector("." + trgClass);
  var circle = svg.querySelector(".e-path-circle");
  var path = svg.querySelector(".e-path-arc");
  var transformOrigin = diameter / 2 + "px";
  circle.setAttribute("d", defineCircle(centerX, centerY, radius));
  path.setAttribute("d", defineArc(centerX, centerY, radius, startArc, endArc));
  svg.setAttribute("viewBox", "0 0 " + diameter + " " + diameter);
  svg.style.transformOrigin = transformOrigin + " " + transformOrigin + " " + transformOrigin;
  svg.style.width = svg.style.height = diameter + "px";
}
function defineArcPoints(centerX, centerY, radius, angle) {
  var radians = (angle - 90) * Math.PI / 180;
  return {
    x: centerX + radius * Math.cos(radians),
    y: centerY + radius * Math.sin(radians)
  };
}
function defineArc(x, y, radius, startArc, endArc) {
  var start = defineArcPoints(x, y, radius, endArc);
  var end = defineArcPoints(x, y, radius, startArc);
  var d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    0,
    0,
    end.x,
    end.y
  ].join(" ");
  return d;
}
function defineCircle(x, y, radius) {
  var d = [
    "M",
    x,
    y,
    "m",
    -radius,
    0,
    "a",
    radius,
    radius,
    0,
    1,
    0,
    radius * 2,
    0,
    "a",
    radius,
    radius,
    0,
    1,
    0,
    -radius * 2,
    0
  ].join(" ");
  return d;
}
function showSpinner(container) {
  showHideSpinner(container, false);
  container = null;
}
function showHideSpinner(container, isHide) {
  var spinnerWrap;
  if (container) {
    if (container.classList.contains(CLS_SPINWRAP)) {
      spinnerWrap = container;
    } else {
      var spinWrapCollection = container.querySelectorAll("." + CLS_SPINWRAP);
      if (Browser.isIE) {
        for (var i = 0; i < spinWrapCollection.length; i++) {
          if (spinWrapCollection[i].parentElement && spinWrapCollection[i].parentElement === container) {
            spinnerWrap = spinWrapCollection[i];
            break;
          }
        }
      } else {
        spinnerWrap = Array.from(spinWrapCollection).find(function(wrap) {
          return wrap.parentElement === container;
        }) || null;
      }
    }
  }
  if (container && spinnerWrap) {
    var inner = spinnerWrap.querySelector("." + CLS_SPININWRAP);
    var spinCheck = void 0;
    spinCheck = isHide ? !spinnerWrap.classList.contains(CLS_SPINTEMPLATE) && !spinnerWrap.classList.contains(CLS_HIDESPIN) : !spinnerWrap.classList.contains(CLS_SPINTEMPLATE) && !spinnerWrap.classList.contains(CLS_SHOWSPIN);
    if (spinCheck) {
      var svgEle = spinnerWrap.querySelector("svg");
      if (isNullOrUndefined(svgEle)) {
        return;
      }
      var id = svgEle.getAttribute("id");
      globalTimeOut["" + id].isAnimate = !isHide;
      switch (globalTimeOut["" + id].type) {
        case "Material":
        case "Material3":
          isHide ? clearTimeout(globalTimeOut[id].timeOut) : startMatAnimate(inner, id, globalTimeOut[id].radius);
          break;
        case "Bootstrap":
          isHide ? clearTimeout(globalTimeOut[id].timeOut) : animateBootstrap(inner);
          break;
      }
    }
    isHide ? classList(spinnerWrap, [CLS_HIDESPIN], [CLS_SHOWSPIN]) : classList(spinnerWrap, [CLS_SHOWSPIN], [CLS_HIDESPIN]);
    container = null;
  }
}
function hideSpinner(container) {
  showHideSpinner(container, true);
  container = null;
}

// node_modules/@syncfusion/ej2-inputs/src/slider/slider.js
var __extends6 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate6 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TicksData = (
  /** @class */
  function(_super) {
    __extends6(TicksData2, _super);
    function TicksData2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate6([
      Property("None")
    ], TicksData2.prototype, "placement", void 0);
    __decorate6([
      Property(10)
    ], TicksData2.prototype, "largeStep", void 0);
    __decorate6([
      Property(1)
    ], TicksData2.prototype, "smallStep", void 0);
    __decorate6([
      Property(false)
    ], TicksData2.prototype, "showSmallTicks", void 0);
    __decorate6([
      Property(null)
    ], TicksData2.prototype, "format", void 0);
    return TicksData2;
  }(ChildProperty)
);
var ColorRangeData = (
  /** @class */
  function(_super) {
    __extends6(ColorRangeData2, _super);
    function ColorRangeData2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate6([
      Property(null)
    ], ColorRangeData2.prototype, "color", void 0);
    __decorate6([
      Property(null)
    ], ColorRangeData2.prototype, "start", void 0);
    __decorate6([
      Property(null)
    ], ColorRangeData2.prototype, "end", void 0);
    return ColorRangeData2;
  }(ChildProperty)
);
var LimitData = (
  /** @class */
  function(_super) {
    __extends6(LimitData2, _super);
    function LimitData2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate6([
      Property(false)
    ], LimitData2.prototype, "enabled", void 0);
    __decorate6([
      Property(null)
    ], LimitData2.prototype, "minStart", void 0);
    __decorate6([
      Property(null)
    ], LimitData2.prototype, "minEnd", void 0);
    __decorate6([
      Property(null)
    ], LimitData2.prototype, "maxStart", void 0);
    __decorate6([
      Property(null)
    ], LimitData2.prototype, "maxEnd", void 0);
    __decorate6([
      Property(false)
    ], LimitData2.prototype, "startHandleFixed", void 0);
    __decorate6([
      Property(false)
    ], LimitData2.prototype, "endHandleFixed", void 0);
    return LimitData2;
  }(ChildProperty)
);
var TooltipData = (
  /** @class */
  function(_super) {
    __extends6(TooltipData2, _super);
    function TooltipData2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate6([
      Property("")
    ], TooltipData2.prototype, "cssClass", void 0);
    __decorate6([
      Property("Before")
    ], TooltipData2.prototype, "placement", void 0);
    __decorate6([
      Property("Focus")
    ], TooltipData2.prototype, "showOn", void 0);
    __decorate6([
      Property(false)
    ], TooltipData2.prototype, "isVisible", void 0);
    __decorate6([
      Property(null)
    ], TooltipData2.prototype, "format", void 0);
    return TooltipData2;
  }(ChildProperty)
);
var bootstrapTooltipOffset = 6;
var bootstrap4TooltipOffset = 3;
var classNames = {
  root: "e-slider",
  rtl: "e-rtl",
  sliderHiddenInput: "e-slider-input",
  controlWrapper: "e-control-wrapper",
  sliderHandle: "e-handle",
  rangeBar: "e-range",
  sliderButton: "e-slider-button",
  firstButton: "e-first-button",
  secondButton: "e-second-button",
  scale: "e-scale",
  tick: "e-tick",
  large: "e-large",
  tickValue: "e-tick-value",
  sliderTooltip: "e-slider-tooltip",
  sliderHover: "e-slider-hover",
  sliderFirstHandle: "e-handle-first",
  sliderSecondHandle: "e-handle-second",
  sliderDisabled: "e-disabled",
  sliderContainer: "e-slider-container",
  horizontalTooltipBefore: "e-slider-horizontal-before",
  horizontalTooltipAfter: "e-slider-horizontal-after",
  verticalTooltipBefore: "e-slider-vertical-before",
  verticalTooltipAfter: "e-slider-vertical-after",
  materialTooltip: "e-material-tooltip",
  materialTooltipOpen: "e-material-tooltip-open",
  materialTooltipActive: "e-tooltip-active",
  materialSlider: "e-material-slider",
  sliderTrack: "e-slider-track",
  sliderHorizantalColor: "e-slider-horizantal-color",
  sliderVerticalColor: "e-slider-vertical-color",
  sliderHandleFocused: "e-handle-focused",
  verticalSlider: "e-vertical",
  horizontalSlider: "e-horizontal",
  sliderHandleStart: "e-handle-start",
  sliderTooltipStart: "e-material-tooltip-start",
  sliderTabHandle: "e-tab-handle",
  sliderButtonIcon: "e-button-icon",
  sliderSmallSize: "e-small-size",
  sliderTickPosition: "e-tick-pos",
  sliderFirstTick: "e-first-tick",
  sliderLastTick: "e-last-tick",
  sliderButtonClass: "e-slider-btn",
  sliderTooltipWrapper: "e-tooltip-wrap",
  sliderTabTrack: "e-tab-track",
  sliderTabRange: "e-tab-range",
  sliderActiveHandle: "e-handle-active",
  sliderMaterialHandle: "e-material-handle",
  sliderMaterialRange: "e-material-range",
  sliderMaterialDefault: "e-material-default",
  materialTooltipShow: "e-material-tooltip-show",
  materialTooltipHide: "e-material-tooltip-hide",
  readonly: "e-read-only",
  limits: "e-limits",
  limitBarDefault: "e-limit-bar",
  limitBarFirst: "e-limit-first",
  limitBarSecond: "e-limit-second",
  dragHorizontal: "e-drag-horizontal",
  dragVertical: "e-drag-vertical"
};
var Slider = (
  /** @class */
  function(_super) {
    __extends6(Slider2, _super);
    function Slider2(options, element2) {
      var _this = _super.call(this, options, element2) || this;
      _this.horDir = "left";
      _this.verDir = "bottom";
      _this.transition = {
        handle: "left .4s cubic-bezier(.25, .8, .25, 1), right .4s cubic-bezier(.25, .8, .25, 1), top .4s cubic-bezier(.25, .8, .25, 1) , bottom .4s cubic-bezier(.25, .8, .25, 1)",
        rangeBar: "all .4s cubic-bezier(.25, .8, .25, 1)"
      };
      _this.transitionOnMaterialTooltip = {
        handle: "left 1ms ease-out, right 1ms ease-out, bottom 1ms ease-out, top 1ms ease-out",
        rangeBar: "left 1ms ease-out, right 1ms ease-out, bottom 1ms ease-out, width 1ms ease-out, height 1ms ease-out"
      };
      _this.scaleTransform = "transform .4s cubic-bezier(.25, .8, .25, 1)";
      _this.customAriaText = null;
      _this.drag = true;
      _this.isDragComplete = false;
      _this.initialTooltip = true;
      return _this;
    }
    Slider2.prototype.preRender = function() {
      var localeText = { incrementTitle: "Increase", decrementTitle: "Decrease" };
      this.l10n = new L10n("slider", localeText, this.locale);
      this.isElementFocused = false;
      this.tickElementCollection = [];
      this.tooltipFormatInfo = {};
      this.ticksFormatInfo = {};
      this.initCultureInfo();
      this.initCultureFunc();
      this.formChecker();
    };
    Slider2.prototype.formChecker = function() {
      var formElement = closest(this.element, "form");
      if (formElement) {
        this.isForm = true;
        if (!isNullOrUndefined(this.formResetValue)) {
          this.setProperties({ "value": this.formResetValue }, true);
        }
        this.formResetValue = this.value;
        if (this.type === "Range" && (isNullOrUndefined(this.formResetValue) || typeof this.formResetValue !== "object")) {
          this.formResetValue = [parseFloat(formatUnit(this.min)), parseFloat(formatUnit(this.max))];
        } else if (isNullOrUndefined(this.formResetValue)) {
          this.formResetValue = parseFloat(formatUnit(this.min));
        }
        this.formElement = formElement;
      } else {
        this.isForm = false;
      }
    };
    Slider2.prototype.initCultureFunc = function() {
      this.internationalization = new Internationalization(this.locale);
    };
    Slider2.prototype.initCultureInfo = function() {
      this.tooltipFormatInfo.format = !isNullOrUndefined(this.tooltip.format) ? this.tooltip.format : null;
      this.ticksFormatInfo.format = !isNullOrUndefined(this.ticks.format) ? this.ticks.format : null;
    };
    Slider2.prototype.formatString = function(value, formatInfo) {
      var formatValue = null;
      var formatString = null;
      if (value || value === 0) {
        formatValue = this.formatNumber(value);
        var numberOfDecimals = this.numberOfDecimals(value);
        formatString = this.internationalization.getNumberFormat(formatInfo)(this.makeRoundNumber(value, numberOfDecimals));
      }
      return { elementVal: formatValue, formatString };
    };
    Slider2.prototype.formatNumber = function(value) {
      var numberOfDecimals = this.numberOfDecimals(value);
      return this.internationalization.getNumberFormat({
        maximumFractionDigits: numberOfDecimals,
        minimumFractionDigits: numberOfDecimals,
        useGrouping: false
      })(value);
    };
    Slider2.prototype.numberOfDecimals = function(value) {
      var decimalPart = value.toString().split(".")[1];
      var numberOfDecimals = !decimalPart || !decimalPart.length ? 0 : decimalPart.length;
      return numberOfDecimals;
    };
    Slider2.prototype.makeRoundNumber = function(value, precision) {
      var decimals = precision || 0;
      return Number(value.toFixed(decimals));
    };
    Slider2.prototype.fractionalToInteger = function(value) {
      value = this.numberOfDecimals(value) === 0 ? Number(value).toFixed(this.noOfDecimals) : value;
      var tens = 1;
      for (var i = 0; i < this.noOfDecimals; i++) {
        tens *= 10;
      }
      value = Number((value * tens).toFixed(0));
      return value;
    };
    Slider2.prototype.render = function() {
      var _this = this;
      this.initialize();
      this.initRender();
      this.wireEvents();
      this.setZindex();
      this.renderComplete();
      if (this.element.tagName === "EJS-SLIDER") {
        if (this.getTheme(this.sliderContainer) == "none") {
          setTimeout(function() {
            _this.refresh();
          }, 0);
        }
      }
    };
    Slider2.prototype.initialize = function() {
      addClass([this.element], classNames.root);
      this.setCSSClass();
    };
    Slider2.prototype.setElementWidth = function(width) {
      if (!isNullOrUndefined(width) && !isNullOrUndefined(this.sliderContainer)) {
        if (typeof width === "number") {
          this.sliderContainer.style.width = formatUnit(width);
        } else if (typeof width === "string") {
          this.sliderContainer.style.width = width.match(/px|%|em/) ? width : formatUnit(width);
        }
      }
    };
    Slider2.prototype.setCSSClass = function(oldCSSClass) {
      if (oldCSSClass) {
        removeClass([this.element], oldCSSClass.split(" "));
      }
      if (this.cssClass) {
        addClass([this.element], this.cssClass.split(" "));
      }
    };
    Slider2.prototype.setEnabled = function() {
      if (!this.enabled) {
        addClass([this.sliderContainer], [classNames.sliderDisabled]);
        if (this.tooltip.isVisible && this.tooltipElement && this.tooltip.showOn === "Always") {
          this.tooltipElement.classList.add(classNames.sliderDisabled);
        }
        this.unwireEvents();
      } else {
        removeClass([this.sliderContainer], [classNames.sliderDisabled]);
        if (this.tooltip.isVisible && this.tooltipElement && this.tooltip.showOn === "Always") {
          this.tooltipElement.classList.remove(classNames.sliderDisabled);
        }
        this.wireEvents();
      }
    };
    Slider2.prototype.getTheme = function(container) {
      var theme = window.getComputedStyle(container, ":after").getPropertyValue("content");
      return theme.replace(/['"]+/g, "");
    };
    Slider2.prototype.initRender = function() {
      this.sliderContainer = this.createElement("div", { className: classNames.sliderContainer + " " + classNames.controlWrapper });
      this.element.parentNode.insertBefore(this.sliderContainer, this.element);
      this.sliderContainer.appendChild(this.element);
      this.sliderTrack = this.createElement("div", { className: classNames.sliderTrack });
      this.element.appendChild(this.sliderTrack);
      this.setElementWidth(this.width);
      this.element.tabIndex = -1;
      this.getThemeInitialization();
      this.setHandler();
      this.createRangeBar();
      if (this.limits.enabled) {
        this.createLimitBar();
      }
      this.setOrientClass();
      this.hiddenInput = this.createElement("input", {
        attrs: {
          type: "hidden",
          value: isNullOrUndefined(this.value) ? this.min.toString() : this.value.toString(),
          name: this.element.getAttribute("name") || this.element.getAttribute("id") || "_" + (Math.random() * 1e3).toFixed(0) + "slider",
          class: classNames.sliderHiddenInput
        }
      });
      this.hiddenInput.tabIndex = -1;
      this.sliderContainer.appendChild(this.hiddenInput);
      if (this.showButtons) {
        this.setButtons();
      }
      this.setEnableRTL();
      if (this.type === "Range") {
        this.rangeValueUpdate();
      } else {
        this.value = isNullOrUndefined(this.value) ? parseFloat(formatUnit(this.min.toString())) : this.value;
      }
      this.previousVal = this.type !== "Range" ? this.checkHandleValue(parseFloat(formatUnit(this.value.toString()))) : [
        this.checkHandleValue(parseFloat(formatUnit(this.value[0].toString()))),
        this.checkHandleValue(parseFloat(formatUnit(this.value[1].toString())))
      ];
      this.previousChanged = this.previousVal;
      if (!isNullOrUndefined(this.element.hasAttribute("name"))) {
        this.element.removeAttribute("name");
      }
      this.setValue();
      if (this.limits.enabled) {
        this.setLimitBar();
      }
      if (this.ticks.placement !== "None") {
        this.renderScale();
      }
      if (this.tooltip.isVisible) {
        this.renderTooltip();
      }
      if (!this.enabled) {
        addClass([this.sliderContainer], [classNames.sliderDisabled]);
      } else {
        removeClass([this.sliderContainer], [classNames.sliderDisabled]);
      }
      if (this.readonly) {
        addClass([this.sliderContainer], [classNames.readonly]);
      } else {
        removeClass([this.sliderContainer], [classNames.readonly]);
      }
    };
    Slider2.prototype.getThemeInitialization = function() {
      this.isMaterial = this.getTheme(this.sliderContainer) === "material" || this.getTheme(this.sliderContainer) === "material-dark";
      this.isMaterial3 = this.getTheme(this.sliderContainer) === "Material3" || this.getTheme(this.sliderContainer) === "Material3-dark";
      this.isBootstrap = this.getTheme(this.sliderContainer) === "bootstrap" || this.getTheme(this.sliderContainer) === "bootstrap-dark";
      this.isBootstrap4 = this.getTheme(this.sliderContainer) === "bootstrap4";
      this.isTailwind = this.getTheme(this.sliderContainer) === "tailwind" || this.getTheme(this.sliderContainer) === "tailwind-dark";
      this.isBootstrap5 = this.getTheme(this.sliderContainer) === "bootstrap5";
      this.isFluent = this.getTheme(this.sliderContainer) === "FluentUI";
      this.isMaterialTooltip = (this.isMaterial || this.isMaterial3) && this.type !== "Range" && this.tooltip.isVisible;
    };
    Slider2.prototype.createRangeBar = function() {
      if (this.type !== "Default") {
        this.rangeBar = this.createElement("div", { attrs: { class: classNames.rangeBar } });
        this.element.appendChild(this.rangeBar);
        if (this.drag && this.type === "Range") {
          if (this.orientation === "Horizontal") {
            this.rangeBar.classList.add(classNames.dragHorizontal);
          } else {
            this.rangeBar.classList.add(classNames.dragVertical);
          }
        }
      }
    };
    Slider2.prototype.createLimitBar = function() {
      var firstElementClassName = this.type !== "Range" ? classNames.limitBarDefault : classNames.limitBarFirst;
      firstElementClassName += " " + classNames.limits;
      this.limitBarFirst = this.createElement("div", {
        attrs: { class: firstElementClassName }
      });
      this.element.appendChild(this.limitBarFirst);
      if (this.type === "Range") {
        this.limitBarSecond = this.createElement("div", {
          attrs: {
            class: classNames.limitBarSecond + " " + classNames.limits
          }
        });
        this.element.appendChild(this.limitBarSecond);
      }
    };
    Slider2.prototype.setOrientClass = function() {
      if (this.orientation !== "Vertical") {
        this.sliderContainer.classList.remove(classNames.verticalSlider);
        this.sliderContainer.classList.add(classNames.horizontalSlider);
        this.firstHandle.setAttribute("aria-orientation", "horizontal");
        if (this.type === "Range") {
          this.secondHandle.setAttribute("aria-orientation", "horizontal");
        }
      } else {
        this.sliderContainer.classList.remove(classNames.horizontalSlider);
        this.sliderContainer.classList.add(classNames.verticalSlider);
        this.firstHandle.setAttribute("aria-orientation", "vertical");
        if (this.type === "Range") {
          this.secondHandle.setAttribute("aria-orientation", "vertical");
        }
      }
    };
    Slider2.prototype.setAriaAttributes = function(element2) {
      var _this = this;
      var min = this.min;
      var max = this.max;
      if (!isNullOrUndefined(this.customValues) && this.customValues.length > 0) {
        min = this.customValues[0];
        max = this.customValues[this.customValues.length - 1];
      }
      if (this.type !== "Range") {
        attributes(element2, {
          "aria-valuemin": min.toString(),
          "aria-valuemax": max.toString()
        });
      } else {
        var range = !isNullOrUndefined(this.customValues) && this.customValues.length > 0 ? [
          [min.toString(), this.customValues[this.value[1]].toString()],
          [this.customValues[this.value[0]].toString(), max.toString()]
        ] : [[min.toString(), this.value[1].toString()], [this.value[0].toString(), max.toString()]];
        range.forEach(function(range2, index) {
          var element3 = index === 0 ? _this.firstHandle : _this.secondHandle;
          if (element3) {
            attributes(element3, {
              "aria-valuemin": range2[0],
              "aria-valuemax": range2[1]
            });
          }
        });
      }
    };
    Slider2.prototype.createSecondHandle = function() {
      this.secondHandle = this.createElement("div", {
        attrs: {
          class: classNames.sliderHandle,
          "role": "slider",
          tabIndex: "0",
          "aria-label": "slider"
        }
      });
      this.secondHandle.classList.add(classNames.sliderSecondHandle);
      this.element.appendChild(this.secondHandle);
    };
    Slider2.prototype.createFirstHandle = function() {
      this.firstHandle = this.createElement("div", {
        attrs: {
          class: classNames.sliderHandle,
          "role": "slider",
          tabIndex: "0",
          "aria-label": "slider"
        }
      });
      this.firstHandle.classList.add(classNames.sliderFirstHandle);
      this.element.appendChild(this.firstHandle);
      if (this.isMaterialTooltip) {
        this.materialHandle = this.createElement("div", {
          attrs: {
            class: classNames.sliderHandle + " " + classNames.sliderMaterialHandle
          }
        });
        this.element.appendChild(this.materialHandle);
      }
    };
    Slider2.prototype.wireFirstHandleEvt = function(destroy) {
      if (!destroy) {
        EventHandler.add(this.firstHandle, "mousedown touchstart", this.handleFocus, this);
        EventHandler.add(this.firstHandle, "transitionend", this.transitionEnd, this);
        EventHandler.add(this.firstHandle, "mouseenter touchenter", this.handleOver, this);
        EventHandler.add(this.firstHandle, "mouseleave touchend", this.handleLeave, this);
      } else {
        EventHandler.remove(this.firstHandle, "mousedown touchstart", this.handleFocus);
        EventHandler.remove(this.firstHandle, "transitionend", this.transitionEnd);
        EventHandler.remove(this.firstHandle, "mouseenter touchenter", this.handleOver);
        EventHandler.remove(this.firstHandle, "mouseleave touchend", this.handleLeave);
      }
    };
    Slider2.prototype.wireSecondHandleEvt = function(destroy) {
      if (!destroy) {
        EventHandler.add(this.secondHandle, "mousedown touchstart", this.handleFocus, this);
        EventHandler.add(this.secondHandle, "transitionend", this.transitionEnd, this);
        EventHandler.add(this.secondHandle, "mouseenter touchenter", this.handleOver, this);
        EventHandler.add(this.secondHandle, "mouseleave touchend", this.handleLeave, this);
      } else {
        EventHandler.remove(this.secondHandle, "mousedown touchstart", this.handleFocus);
        EventHandler.remove(this.secondHandle, "transitionend", this.transitionEnd);
        EventHandler.remove(this.secondHandle, "mouseenter touchenter", this.handleOver);
        EventHandler.remove(this.secondHandle, "mouseleave touchend", this.handleLeave);
      }
    };
    Slider2.prototype.handleStart = function() {
      if (this.type !== "Range") {
        this.firstHandle.classList[this.handlePos1 === 0 ? "add" : "remove"](classNames.sliderHandleStart);
        if (this.isMaterialTooltip) {
          this.materialHandle.classList[this.handlePos1 === 0 ? "add" : "remove"](classNames.sliderHandleStart);
          if (this.tooltipElement) {
            this.tooltipElement.classList[this.handlePos1 === 0 ? "add" : "remove"](classNames.sliderTooltipStart);
          }
        }
      }
    };
    Slider2.prototype.transitionEnd = function(e) {
      if (e.propertyName !== "transform") {
        this.handleStart();
        if (!this.enableAnimation) {
          this.getHandle().style.transition = "none";
        }
        if (this.type !== "Default") {
          this.rangeBar.style.transition = "none";
        }
        if ((this.isMaterial || this.isMaterial3) && this.tooltip.isVisible && this.type === "Default") {
          this.tooltipElement.style.transition = this.transition.handle;
        }
        this.tooltipToggle(this.getHandle());
        this.closeTooltip();
      }
    };
    Slider2.prototype.handleFocusOut = function() {
      if (this.firstHandle.classList.contains(classNames.sliderHandleFocused)) {
        this.firstHandle.classList.remove(classNames.sliderHandleFocused);
      }
      if (this.type === "Range") {
        if (this.secondHandle.classList.contains(classNames.sliderHandleFocused)) {
          this.secondHandle.classList.remove(classNames.sliderHandleFocused);
        }
      }
    };
    Slider2.prototype.handleFocus = function(e) {
      this.focusSliderElement();
      this.sliderBarClick(e);
      if (e.currentTarget === this.firstHandle) {
        this.firstHandle.classList.add(classNames.sliderHandleFocused);
        this.firstHandle.classList.add(classNames.sliderTabHandle);
      } else {
        this.secondHandle.classList.add(classNames.sliderHandleFocused);
        this.secondHandle.classList.add(classNames.sliderTabHandle);
      }
      EventHandler.add(document, "mousemove touchmove", this.sliderBarMove, this);
      EventHandler.add(document, "mouseup touchend", this.sliderBarUp, this);
    };
    Slider2.prototype.handleOver = function(e) {
      if (this.tooltip.isVisible && this.tooltip.showOn === "Hover") {
        this.tooltipToggle(e.currentTarget);
      }
      if (this.type === "Default") {
        this.tooltipToggle(this.getHandle());
      }
    };
    Slider2.prototype.handleLeave = function(e) {
      if (this.tooltip.isVisible && this.tooltip.showOn === "Hover" && !e.currentTarget.classList.contains(classNames.sliderHandleFocused) && !e.currentTarget.classList.contains(classNames.sliderTabHandle)) {
        this.closeTooltip();
      }
    };
    Slider2.prototype.setHandler = function() {
      this.createFirstHandle();
      if (this.type === "Range") {
        this.createSecondHandle();
      }
    };
    Slider2.prototype.setEnableRTL = function() {
      this.enableRtl && this.orientation !== "Vertical" ? addClass([this.sliderContainer], classNames.rtl) : removeClass([this.sliderContainer], classNames.rtl);
      var preDir = this.orientation !== "Vertical" ? this.horDir : this.verDir;
      if (this.enableRtl) {
        this.horDir = "right";
        this.verDir = "bottom";
      } else {
        this.horDir = "left";
        this.verDir = "bottom";
      }
      var currDir = this.orientation !== "Vertical" ? this.horDir : this.verDir;
      if (preDir !== currDir) {
        if (this.orientation === "Horizontal") {
          setStyleAttribute(this.firstHandle, { "right": "", "left": "auto" });
          if (this.type === "Range") {
            setStyleAttribute(this.secondHandle, { "top": "", "left": "auto" });
          }
        }
      }
      this.setBarColor();
    };
    Slider2.prototype.tooltipValue = function() {
      var _this = this;
      var text;
      var args = {
        value: this.value,
        text: ""
      };
      if (this.initialTooltip) {
        this.initialTooltip = false;
        this.setTooltipContent();
        args.text = text = typeof this.tooltipObj.content === "function" ? this.tooltipObj.content() : this.tooltipObj.content;
        this.trigger("tooltipChange", args, function(observedArgs) {
          _this.addTooltipClass(observedArgs.text);
          if (text !== observedArgs.text) {
            _this.customAriaText = observedArgs.text;
            if (_this.enableHtmlSanitizer) {
              observedArgs.text = SanitizeHtmlHelper.sanitize(observedArgs.text.toString());
            } else {
              observedArgs.text = observedArgs.text.toString();
            }
            var contentTemp = function() {
              return observedArgs.text;
            };
            _this.tooltipObj.content = initializeCSPTemplate(contentTemp);
            _this.setAriaAttrValue(_this.firstHandle);
            if (_this.type === "Range") {
              _this.setAriaAttrValue(_this.secondHandle);
            }
          }
        });
        if (this.isMaterialTooltip) {
          this.setPreviousVal("change", this.value);
        }
      }
    };
    Slider2.prototype.setTooltipContent = function() {
      var content;
      content = this.formatContent(this.tooltipFormatInfo, false);
      var contentTemp = function() {
        return content;
      };
      this.tooltipObj.content = initializeCSPTemplate(contentTemp);
    };
    Slider2.prototype.formatContent = function(formatInfo, ariaContent) {
      var content = "";
      var handle1 = this.handleVal1;
      var handle2 = this.handleVal2;
      if (!isNullOrUndefined(this.customValues) && this.customValues.length > 0) {
        handle1 = this.customValues[this.handleVal1];
        handle2 = this.customValues[this.handleVal2];
      }
      if (!ariaContent) {
        if (this.type === "Range") {
          if (this.enableRtl && this.orientation !== "Vertical") {
            content = !isNullOrUndefined(formatInfo.format) ? this.formatString(handle2, formatInfo).formatString + " - " + this.formatString(handle1, formatInfo).formatString : handle2.toString() + " - " + handle1.toString();
          } else {
            content = !isNullOrUndefined(formatInfo.format) ? this.formatString(handle1, formatInfo).formatString + " - " + this.formatString(handle2, formatInfo).formatString : handle1.toString() + " - " + handle2.toString();
          }
        } else {
          if (!isNullOrUndefined(handle1)) {
            content = !isNullOrUndefined(formatInfo.format) ? this.formatString(handle1, formatInfo).formatString : handle1.toString();
          }
        }
        return content;
      } else {
        if (this.type === "Range") {
          if (this.enableRtl && this.orientation !== "Vertical") {
            content = !isNullOrUndefined(this.tooltip) && !isNullOrUndefined(this.tooltip.format) ? this.formatString(handle2, formatInfo).elementVal + " - " + this.formatString(handle1, formatInfo).elementVal : handle2.toString() + " - " + handle1.toString();
          } else {
            content = !isNullOrUndefined(this.tooltip) && !isNullOrUndefined(this.tooltip.format) ? this.formatString(handle1, formatInfo).elementVal + " - " + this.formatString(handle2, formatInfo).elementVal : handle1.toString() + " - " + handle2.toString();
          }
        } else {
          if (!isNullOrUndefined(handle1)) {
            content = !isNullOrUndefined(this.tooltip) && !isNullOrUndefined(this.tooltip.format) ? this.formatString(handle1, formatInfo).elementVal : handle1.toString();
          }
        }
        return content;
      }
    };
    Slider2.prototype.addTooltipClass = function(content) {
      if (this.isMaterialTooltip) {
        var count = content.toString().length;
        if (!this.tooltipElement) {
          var cssClass = count > 4 ? classNames.sliderMaterialRange : classNames.sliderMaterialDefault;
          this.tooltipObj.cssClass = classNames.sliderTooltip + " " + cssClass;
        } else {
          var cssClass = count > 4 ? { oldCss: classNames.sliderMaterialDefault, newCss: classNames.sliderMaterialRange } : { oldCss: classNames.sliderMaterialRange, newCss: classNames.sliderMaterialDefault };
          this.tooltipElement.classList.remove(cssClass.oldCss);
          if (!this.tooltipElement.classList.contains(cssClass.newCss)) {
            this.tooltipElement.classList.add(cssClass.newCss);
            this.tooltipElement.style.transform = count > 4 ? "scale(1)" : this.getTooltipTransformProperties(this.previousTooltipClass).rotate;
          }
        }
      }
    };
    Slider2.prototype.tooltipPlacement = function() {
      return this.orientation === "Horizontal" ? this.tooltip.placement === "Before" ? "TopCenter" : "BottomCenter" : this.tooltip.placement === "Before" ? "LeftCenter" : "RightCenter";
    };
    Slider2.prototype.tooltipBeforeOpen = function(args) {
      this.tooltipElement = args.element;
      if (this.tooltip.cssClass) {
        addClass([this.tooltipElement], this.tooltip.cssClass.split(" ").filter(function(css) {
          return css;
        }));
      }
      args.target.removeAttribute("aria-describedby");
      if (this.isMaterialTooltip) {
        this.tooltipElement.firstElementChild.classList.add(classNames.materialTooltipHide);
        this.handleStart();
        this.setTooltipTransform();
      }
    };
    Slider2.prototype.tooltipCollision = function(position) {
      if (this.isBootstrap || this.isBootstrap4 || (this.isMaterial || this.isMaterial3) && !this.isMaterialTooltip) {
        var tooltipOffsetValue = this.isBootstrap4 ? bootstrap4TooltipOffset : bootstrapTooltipOffset;
        switch (position) {
          case "TopCenter":
            this.tooltipObj.setProperties({ "offsetY": -tooltipOffsetValue }, false);
            break;
          case "BottomCenter":
            this.tooltipObj.setProperties({ "offsetY": tooltipOffsetValue }, false);
            break;
          case "LeftCenter":
            this.tooltipObj.setProperties({ "offsetX": -tooltipOffsetValue }, false);
            break;
          case "RightCenter":
            this.tooltipObj.setProperties({ "offsetX": tooltipOffsetValue }, false);
            break;
        }
      }
    };
    Slider2.prototype.materialTooltipEventCallBack = function(event) {
      this.sliderBarClick(event);
      EventHandler.add(document, "mousemove touchmove", this.sliderBarMove, this);
      EventHandler.add(document, "mouseup touchend", this.sliderBarUp, this);
    };
    Slider2.prototype.wireMaterialTooltipEvent = function(destroy) {
      if (this.isMaterialTooltip) {
        if (!destroy) {
          EventHandler.add(this.tooltipElement, "mousedown touchstart", this.materialTooltipEventCallBack, this);
        } else {
          EventHandler.remove(this.tooltipElement, "mousedown touchstart", this.materialTooltipEventCallBack);
        }
      }
    };
    Slider2.prototype.tooltipPositionCalculation = function(position) {
      var cssClass;
      switch (position) {
        case "TopCenter":
          cssClass = classNames.horizontalTooltipBefore;
          break;
        case "BottomCenter":
          cssClass = classNames.horizontalTooltipAfter;
          break;
        case "LeftCenter":
          cssClass = classNames.verticalTooltipBefore;
          break;
        case "RightCenter":
          cssClass = classNames.verticalTooltipAfter;
          break;
      }
      return cssClass;
    };
    Slider2.prototype.getTooltipTransformProperties = function(className) {
      var transformProperties;
      if (this.tooltipElement) {
        var position = this.orientation === "Horizontal" ? this.tooltipElement.clientHeight + 14 - this.tooltipElement.clientHeight / 2 : this.tooltipElement.clientWidth + 14 - this.tooltipElement.clientWidth / 2;
        transformProperties = this.orientation === "Horizontal" ? className === classNames.horizontalTooltipBefore ? { rotate: "rotate(45deg)", translate: "translateY(" + position + "px)" } : { rotate: "rotate(225deg)", translate: "translateY(" + -position + "px)" } : className === classNames.verticalTooltipBefore ? { rotate: "rotate(-45deg)", translate: "translateX(" + position + "px)" } : { rotate: "rotate(-225deg)", translate: "translateX(" + -position + "px)" };
      }
      return transformProperties;
    };
    Slider2.prototype.openMaterialTooltip = function() {
      var _this = this;
      if (this.isMaterialTooltip) {
        this.refreshTooltip(this.firstHandle);
        var tooltipContentElement = this.tooltipElement.firstElementChild;
        tooltipContentElement.classList.remove(classNames.materialTooltipHide);
        tooltipContentElement.classList.add(classNames.materialTooltipShow);
        this.firstHandle.style.cursor = "default";
        this.tooltipElement.style.transition = this.scaleTransform;
        this.tooltipElement.classList.add(classNames.materialTooltipOpen);
        this.materialHandle.style.transform = "scale(0)";
        if (tooltipContentElement.innerText.length > 4) {
          this.tooltipElement.style.transform = "scale(1)";
        } else {
          this.tooltipElement.style.transform = this.getTooltipTransformProperties(this.previousTooltipClass).rotate;
        }
        if (this.type === "Default") {
          setTimeout(function() {
            if (_this.tooltipElement)
              _this.tooltipElement.style.transition = _this.transition.handle;
          }, 2500);
        } else {
          setTimeout(function() {
            if (_this.tooltipElement)
              _this.tooltipElement.style.transition = "none";
          }, 2500);
        }
      }
    };
    Slider2.prototype.closeMaterialTooltip = function() {
      var _this = this;
      if (this.isMaterialTooltip) {
        var tooltipContentElement = this.tooltipElement.firstElementChild;
        this.tooltipElement.style.transition = this.scaleTransform;
        tooltipContentElement.classList.remove(classNames.materialTooltipShow);
        tooltipContentElement.classList.add(classNames.materialTooltipHide);
        this.firstHandle.style.cursor = "-webkit-grab";
        this.firstHandle.style.cursor = "grab";
        if (this.materialHandle) {
          this.materialHandle.style.transform = "scale(1)";
        }
        this.tooltipElement.classList.remove(classNames.materialTooltipOpen);
        this.setTooltipTransform();
        this.tooltipTarget = void 0;
        setTimeout(function() {
          if (_this.tooltipElement)
            _this.tooltipElement.style.transition = "none";
        }, 2500);
      }
    };
    Slider2.prototype.checkTooltipPosition = function(args) {
      var tooltipClass = this.tooltipPositionCalculation(args.collidedPosition);
      if (this.tooltipCollidedPosition === void 0 || this.tooltipCollidedPosition !== args.collidedPosition || !args.element.classList.contains(tooltipClass)) {
        if (this.isMaterialTooltip) {
          if (tooltipClass !== void 0) {
            args.element.classList.remove(this.previousTooltipClass);
            args.element.classList.add(tooltipClass);
            this.previousTooltipClass = tooltipClass;
          }
          if (args.element.style.transform && args.element.classList.contains(classNames.materialTooltipOpen) && args.element.firstElementChild.innerText.length <= 4) {
            args.element.style.transform = this.getTooltipTransformProperties(this.previousTooltipClass).rotate;
          }
        }
        this.tooltipCollidedPosition = args.collidedPosition;
      }
      if (this.isMaterialTooltip && this.tooltipElement && this.tooltipElement.style.transform.indexOf("translate") !== -1) {
        this.setTooltipTransform();
      }
    };
    Slider2.prototype.setTooltipTransform = function() {
      var transformProperties = this.getTooltipTransformProperties(this.previousTooltipClass);
      if (isNullOrUndefined(this.tooltipElement))
        return;
      if (this.tooltipElement.firstElementChild.innerText.length > 4) {
        this.tooltipElement.style.transform = transformProperties.translate + " scale(0.01)";
      } else {
        this.tooltipElement.style.transform = transformProperties.translate + " " + transformProperties.rotate + " scale(0.01)";
      }
    };
    Slider2.prototype.renderTooltip = function() {
      this.tooltipObj = new Tooltip({
        showTipPointer: this.isBootstrap || this.isMaterial || this.isMaterial3 || this.isBootstrap4 || this.isTailwind || this.isBootstrap5 || this.isFluent,
        cssClass: classNames.sliderTooltip,
        height: this.isMaterial || this.isMaterial3 ? 30 : "auto",
        animation: { open: { effect: "None" }, close: { effect: "FadeOut", duration: 500 } },
        opensOn: "Custom",
        beforeOpen: this.tooltipBeforeOpen.bind(this),
        beforeCollision: this.checkTooltipPosition.bind(this),
        beforeClose: this.tooltipBeforeClose.bind(this),
        enableHtmlSanitizer: this.enableHtmlSanitizer
      });
      this.tooltipObj.appendTo(this.firstHandle);
      this.initializeTooltipProps();
    };
    Slider2.prototype.initializeTooltipProps = function() {
      var tooltipShowOn = this.tooltip.showOn === "Auto" ? "Hover" : this.tooltip.showOn;
      this.setProperties({ tooltip: { showOn: tooltipShowOn } }, true);
      this.tooltipObj.position = this.tooltipPlacement();
      this.tooltipCollision(this.tooltipObj.position);
      [this.firstHandle, this.rangeBar, this.secondHandle].forEach(function(handle) {
        if (!isNullOrUndefined(handle)) {
          handle.style.transition = "none";
        }
      });
      if (this.isMaterialTooltip) {
        this.sliderContainer.classList.add(classNames.materialSlider);
        this.tooltipValue();
        this.tooltipObj.animation.close.effect = "None";
        this.tooltipObj.open(this.firstHandle);
      }
    };
    Slider2.prototype.tooltipBeforeClose = function() {
      this.tooltipElement = void 0;
      this.tooltipCollidedPosition = void 0;
    };
    Slider2.prototype.setButtons = function() {
      this.firstBtn = this.createElement("div", { className: classNames.sliderButton + " " + classNames.firstButton });
      this.firstBtn.appendChild(this.createElement("span", { className: classNames.sliderButtonIcon }));
      if (this.isTailwind) {
        this.firstBtn.querySelector("span").classList.add("e-icons");
      }
      this.firstBtn.tabIndex = -1;
      this.secondBtn = this.createElement("div", { className: classNames.sliderButton + " " + classNames.secondButton });
      this.secondBtn.appendChild(this.createElement("span", { className: classNames.sliderButtonIcon }));
      if (this.isTailwind) {
        this.secondBtn.querySelector("span").classList.add("e-icons");
      }
      this.secondBtn.tabIndex = -1;
      this.sliderContainer.classList.add(classNames.sliderButtonClass);
      this.sliderContainer.appendChild(this.firstBtn);
      this.sliderContainer.appendChild(this.secondBtn);
      this.sliderContainer.appendChild(this.element);
      this.buttonTitle();
    };
    Slider2.prototype.buttonTitle = function() {
      var enabledRTL = this.enableRtl && this.orientation !== "Vertical";
      this.l10n.setLocale(this.locale);
      var decrementTitle = this.l10n.getConstant("decrementTitle");
      var incrementTitle = this.l10n.getConstant("incrementTitle");
      attributes(enabledRTL ? this.secondBtn : this.firstBtn, { "aria-label": decrementTitle, title: decrementTitle });
      attributes(enabledRTL ? this.firstBtn : this.secondBtn, { "aria-label": incrementTitle, title: incrementTitle });
    };
    Slider2.prototype.buttonFocusOut = function() {
      if (this.isMaterial || this.isMaterial3) {
        this.getHandle().classList.remove("e-large-thumb-size");
      }
    };
    Slider2.prototype.repeatButton = function(args) {
      var hVal = this.handleValueUpdate();
      var enabledRTL = this.enableRtl && this.orientation !== "Vertical";
      var value;
      if (args.target.parentElement.classList.contains(classNames.firstButton) || args.target.classList.contains(classNames.firstButton)) {
        enabledRTL ? value = this.add(hVal, parseFloat(this.step.toString()), true) : value = this.add(hVal, parseFloat(this.step.toString()), false);
      } else if (args.target.parentElement.classList.contains(classNames.secondButton) || args.target.classList.contains(classNames.secondButton)) {
        enabledRTL ? value = this.add(hVal, parseFloat(this.step.toString()), false) : value = this.add(hVal, parseFloat(this.step.toString()), true);
      }
      if (this.limits.enabled) {
        value = this.getLimitCorrectedValues(value);
      }
      if (value >= this.min && value <= this.max) {
        this.changeHandleValue(value);
        this.tooltipToggle(this.getHandle());
      }
    };
    Slider2.prototype.repeatHandlerMouse = function(args) {
      args.preventDefault();
      if (args.type === "mousedown" || args.type === "touchstart") {
        this.buttonClick(args);
        this.repeatInterval = setInterval(this.repeatButton.bind(this), 180, args);
      }
    };
    Slider2.prototype.materialChange = function() {
      if (!this.getHandle().classList.contains("e-large-thumb-size")) {
        this.getHandle().classList.add("e-large-thumb-size");
      }
    };
    Slider2.prototype.focusHandle = function() {
      if (!this.getHandle().classList.contains(classNames.sliderTabHandle)) {
        this.getHandle().classList.add(classNames.sliderTabHandle);
      }
    };
    Slider2.prototype.repeatHandlerUp = function(e) {
      this.changeEvent("changed", e);
      this.closeTooltip();
      clearInterval(this.repeatInterval);
      this.getHandle().focus();
    };
    Slider2.prototype.customTickCounter = function(bigNum) {
      var tickCount = 4;
      if (!isNullOrUndefined(this.customValues) && this.customValues.length > 0) {
        if (bigNum > 4) {
          tickCount = 3;
        }
        if (bigNum > 7) {
          tickCount = 2;
        }
        if (bigNum > 14) {
          tickCount = 1;
        }
        if (bigNum > 28) {
          tickCount = 0;
        }
      }
      return tickCount;
    };
    Slider2.prototype.renderScale = function() {
      var liElementPosition = 0;
      var orien = this.orientation === "Vertical" ? "v" : "h";
      var spanText;
      this.noOfDecimals = this.numberOfDecimals(this.step);
      this.ul = this.createElement("ul", {
        className: classNames.scale + " e-" + orien + "-scale " + classNames.tick + "-" + this.ticks.placement.toLowerCase(),
        attrs: { role: "presentation", tabIndex: "-1", "aria-hidden": "true" }
      });
      this.ul.style.zIndex = "-1";
      if (Browser.isAndroid && orien === "h") {
        this.ul.classList.add(classNames.sliderTickPosition);
      }
      var smallStep = this.ticks.smallStep;
      if (!this.ticks.showSmallTicks) {
        this.ticks.largeStep > 0 ? smallStep = this.ticks.largeStep : smallStep = parseFloat(formatUnit(this.max)) - parseFloat(formatUnit(this.min));
      } else if (smallStep <= 0) {
        smallStep = parseFloat(formatUnit(this.step));
      }
      var min = this.fractionalToInteger(this.min);
      var max = this.fractionalToInteger(this.max);
      var steps = this.fractionalToInteger(smallStep);
      var bigNum = !isNullOrUndefined(this.customValues) && this.customValues.length > 0 && this.customValues.length - 1;
      var customStep = this.customTickCounter(bigNum);
      var count = !isNullOrUndefined(this.customValues) && this.customValues.length > 0 ? bigNum * customStep + bigNum : Math.abs((max - min) / steps);
      this.element.appendChild(this.ul);
      var li;
      var start = parseFloat(this.min.toString());
      if (orien === "v") {
        start = parseFloat(this.max.toString());
      }
      var left = 0;
      var islargeTick;
      var tickWidth = 100 / count;
      if (tickWidth === Infinity) {
        tickWidth = 5;
      }
      for (var i = 0, y = !isNullOrUndefined(this.customValues) && this.customValues.length > 0 ? this.customValues.length - 1 : 0, k = 0; i <= count; i++) {
        li = this.createElement("li", {
          attrs: {
            class: classNames.tick,
            role: "presentation",
            tabIndex: "-1",
            "aria-hidden": "true"
          }
        });
        if (!isNullOrUndefined(this.customValues) && this.customValues.length > 0) {
          islargeTick = i % (customStep + 1) === 0;
          if (islargeTick) {
            if (orien === "h") {
              start = this.customValues[k];
              k++;
            } else {
              start = this.customValues[y];
              y--;
            }
            li.setAttribute("title", start.toString());
          }
        } else {
          li.setAttribute("title", start.toString());
          if (this.numberOfDecimals(this.max) === 0 && this.numberOfDecimals(this.min) === 0 && this.numberOfDecimals(this.step) === 0) {
            if (orien === "h") {
              islargeTick = (start - parseFloat(this.min.toString())) % this.ticks.largeStep === 0 ? true : false;
            } else {
              islargeTick = Math.abs(start - parseFloat(this.max.toString())) % this.ticks.largeStep === 0 ? true : false;
            }
          } else {
            var largestep = this.fractionalToInteger(this.ticks.largeStep);
            var startValue = this.fractionalToInteger(start);
            if (orien === "h") {
              islargeTick = (startValue - min) % largestep === 0 ? true : false;
            } else {
              islargeTick = Math.abs(startValue - parseFloat(max.toString())) % largestep === 0 ? true : false;
            }
          }
        }
        if (islargeTick) {
          li.classList.add(classNames.large);
        }
        orien === "h" ? li.style.width = tickWidth + "%" : li.style.height = tickWidth + "%";
        var repeat = islargeTick ? this.ticks.placement === "Both" ? 2 : 1 : 0;
        if (islargeTick) {
          for (var j = 0; j < repeat; j++) {
            this.createTick(li, start, tickWidth);
          }
        } else if (isNullOrUndefined(this.customValues)) {
          this.formatTicksValue(li, start);
        }
        this.ul.appendChild(li);
        this.tickElementCollection.push(li);
        var decimalPoints = void 0;
        if (isNullOrUndefined(this.customValues)) {
          if (this.numberOfDecimals(smallStep) > this.numberOfDecimals(start)) {
            decimalPoints = this.numberOfDecimals(smallStep);
          } else {
            decimalPoints = this.numberOfDecimals(start);
          }
          if (orien === "h") {
            start = this.makeRoundNumber(start + smallStep, decimalPoints);
          } else {
            if (this.min > this.max) {
              start = this.makeRoundNumber(start + smallStep, decimalPoints);
            } else {
              start = this.makeRoundNumber(start - smallStep, decimalPoints);
            }
          }
          left = this.makeRoundNumber(left + smallStep, decimalPoints);
        }
      }
      this.ticksAlignment(orien, tickWidth);
    };
    Slider2.prototype.ticksAlignment = function(orien, tickWidth, triggerEvent) {
      if (triggerEvent === void 0) {
        triggerEvent = true;
      }
      this.firstChild = this.ul.firstElementChild;
      this.lastChild = this.ul.lastElementChild;
      this.firstChild.classList.add(classNames.sliderFirstTick);
      this.lastChild.classList.add(classNames.sliderLastTick);
      this.sliderContainer.classList.add(classNames.scale + "-" + this.ticks.placement.toLowerCase());
      if (orien === "h") {
        this.firstChild.style.width = tickWidth / 2 + "%";
        this.lastChild.style.width = tickWidth / 2 + "%";
      } else {
        this.firstChild.style.height = tickWidth / 2 + "%";
        this.lastChild.style.height = tickWidth / 2 + "%";
      }
      var eventArgs = { ticksWrapper: this.ul, tickElements: this.tickElementCollection };
      if (triggerEvent) {
        this.trigger("renderedTicks", eventArgs);
      }
      this.scaleAlignment();
    };
    Slider2.prototype.createTick = function(li, start, tickWidth) {
      var span = this.createElement("span", {
        className: classNames.tickValue + " " + classNames.tick + "-" + this.ticks.placement.toLowerCase(),
        attrs: { role: "presentation", tabIndex: "-1", "aria-hidden": "true" }
      });
      li.appendChild(span);
      if (isNullOrUndefined(this.customValues)) {
        this.formatTicksValue(li, start, span, tickWidth);
      } else {
        if (this.enableHtmlSanitizer) {
          span.innerHTML = SanitizeHtmlHelper.sanitize(start.toString());
        } else {
          span.innerHTML = start.toString();
        }
      }
    };
    Slider2.prototype.formatTicksValue = function(li, start, spanElement, tickWidth) {
      var _this = this;
      var tickText = this.formatNumber(start);
      var text = !isNullOrUndefined(this.ticks) && !isNullOrUndefined(this.ticks.format) ? this.formatString(start, this.ticksFormatInfo).formatString : tickText;
      var eventArgs = { value: start, text, tickElement: li };
      this.trigger("renderingTicks", eventArgs, function(observedArgs) {
        li.setAttribute("title", observedArgs.text.toString());
        if (spanElement) {
          if (_this.enableHtmlSanitizer) {
            spanElement.innerHTML = SanitizeHtmlHelper.sanitize(observedArgs.text.toString());
          } else {
            spanElement.innerHTML = observedArgs.text.toString();
          }
        }
      });
    };
    Slider2.prototype.scaleAlignment = function() {
      this.tickValuePosition();
      var smallTick = 12;
      var largeTick = 20;
      var half = largeTick / 2;
      var orien = this.orientation === "Vertical" ? "v" : "h";
      if (this.orientation === "Vertical") {
        this.element.getBoundingClientRect().width <= 15 ? this.sliderContainer.classList.add(classNames.sliderSmallSize) : this.sliderContainer.classList.remove(classNames.sliderSmallSize);
      } else {
        this.element.getBoundingClientRect().height <= 15 ? this.sliderContainer.classList.add(classNames.sliderSmallSize) : this.sliderContainer.classList.remove(classNames.sliderSmallSize);
      }
    };
    Slider2.prototype.tickValuePosition = function() {
      this.firstChild = this.element.querySelector("ul").children[0];
      var first = this.firstChild.getBoundingClientRect();
      var firstChild;
      var otherChild;
      var smallStep = this.ticks.smallStep;
      var count = Math.abs(parseFloat(formatUnit(this.max)) - parseFloat(formatUnit(this.min))) / smallStep;
      if (this.firstChild.children.length > 0) {
        firstChild = this.firstChild.children[0].getBoundingClientRect();
      }
      var tickElements = [this.sliderContainer.querySelectorAll("." + classNames.tick + "." + classNames.large + " ." + classNames.tickValue)];
      var other;
      if (this.ticks.placement === "Both") {
        other = [].slice.call(tickElements[0], 2);
      } else {
        other = [].slice.call(tickElements[0], 1);
      }
      var tickWidth = this.orientation === "Vertical" ? first.height * 2 : first.width * 2;
      for (var i = 0; i < this.firstChild.children.length; i++) {
        if (this.orientation === "Vertical") {
          this.firstChild.children[i].style.top = -(firstChild.height / 2) + "px";
        } else {
          if (!this.enableRtl) {
            this.firstChild.children[i].style.left = -(firstChild.width / 2) + "px";
          } else {
            this.firstChild.children[i].style.left = (tickWidth - this.firstChild.children[i].getBoundingClientRect().width) / 2 + "px";
          }
        }
      }
      for (var i = 0; i < other.length; i++) {
        otherChild = other[i].getBoundingClientRect();
        if (this.orientation === "Vertical") {
          setStyleAttribute(other[i], { top: (tickWidth - otherChild.height) / 2 + "px" });
        } else {
          setStyleAttribute(other[i], { left: (tickWidth - otherChild.width) / 2 + "px" });
        }
      }
      if (this.enableRtl && this.lastChild.children.length && count !== 0) {
        this.lastChild.children[0].style.left = -(this.lastChild.getBoundingClientRect().width / 2) + "px";
        if (this.ticks.placement === "Both") {
          this.lastChild.children[1].style.left = -(this.lastChild.getBoundingClientRect().width / 2) + "px";
        }
      }
      if (count === 0) {
        if (this.orientation === "Horizontal") {
          if (!this.enableRtl) {
            this.firstChild.classList.remove(classNames.sliderLastTick);
            this.firstChild.style.left = this.firstHandle.style.left;
          } else {
            this.firstChild.classList.remove(classNames.sliderLastTick);
            this.firstChild.style.right = this.firstHandle.style.right;
            this.firstChild.children[0].style.left = this.firstChild.getBoundingClientRect().width / 2 + 2 + "px";
            if (this.ticks.placement === "Both") {
              this.firstChild.children[1].style.left = this.firstChild.getBoundingClientRect().width / 2 + 2 + "px";
            }
          }
        }
        if (this.orientation === "Vertical") {
          this.firstChild.classList.remove(classNames.sliderLastTick);
        }
      }
    };
    Slider2.prototype.setAriaAttrValue = function(element2) {
      var ariaValueText;
      var isTickFormatted = !isNullOrUndefined(this.ticks) && !isNullOrUndefined(this.ticks.format) ? true : false;
      var text = !isTickFormatted ? this.formatContent(this.ticksFormatInfo, false) : this.formatContent(this.tooltipFormatInfo, false);
      var valuenow = isTickFormatted ? this.formatContent(this.ticksFormatInfo, true) : this.formatContent(this.tooltipFormatInfo, true);
      text = !this.customAriaText ? text : this.customAriaText;
      if (text.split(" - ").length === 2) {
        ariaValueText = text.split(" - ");
      } else {
        ariaValueText = [text, text];
      }
      this.setAriaAttributes(element2);
      if (this.type !== "Range") {
        attributes(element2, { "aria-valuenow": valuenow, "aria-valuetext": text });
      } else {
        !this.enableRtl ? element2 === this.firstHandle ? attributes(element2, { "aria-valuenow": valuenow.split(" - ")[0], "aria-valuetext": ariaValueText[0] }) : attributes(element2, { "aria-valuenow": valuenow.split(" - ")[1], "aria-valuetext": ariaValueText[1] }) : element2 === this.firstHandle ? attributes(element2, { "aria-valuenow": valuenow.split(" - ")[1], "aria-valuetext": ariaValueText[1] }) : attributes(element2, { "aria-valuenow": valuenow.split(" - ")[0], "aria-valuetext": ariaValueText[0] });
      }
    };
    Slider2.prototype.handleValueUpdate = function() {
      var hVal;
      if (this.type === "Range") {
        if (this.activeHandle === 1) {
          hVal = this.handleVal1;
        } else {
          hVal = this.handleVal2;
        }
      } else {
        hVal = this.handleVal1;
      }
      return hVal;
    };
    Slider2.prototype.getLimitCorrectedValues = function(value) {
      if (this.type === "MinRange" || this.type === "Default") {
        value = this.getLimitValueAndPosition(value, this.limits.minStart, this.limits.minEnd)[0];
      } else {
        if (this.activeHandle === 1) {
          value = this.getLimitValueAndPosition(value, this.limits.minStart, this.limits.minEnd)[0];
        } else {
          value = this.getLimitValueAndPosition(value, this.limits.maxStart, this.limits.maxEnd)[0];
        }
      }
      return value;
    };
    Slider2.prototype.focusSliderElement = function() {
      if (!this.isElementFocused) {
        this.element.focus();
        this.isElementFocused = true;
      }
    };
    Slider2.prototype.buttonClick = function(args) {
      this.focusSliderElement();
      var value;
      var enabledRTL = this.enableRtl && this.orientation !== "Vertical";
      var hVal = this.handleValueUpdate();
      if (args.keyCode === 40 || args.keyCode === 37 || args.currentTarget.classList.contains(classNames.firstButton)) {
        enabledRTL ? value = this.add(hVal, parseFloat(this.step.toString()), true) : value = this.add(hVal, parseFloat(this.step.toString()), false);
      } else if (args.keyCode === 38 || args.keyCode === 39 || args.currentTarget.classList.contains(classNames.secondButton)) {
        enabledRTL ? value = this.add(hVal, parseFloat(this.step.toString()), false) : value = this.add(hVal, parseFloat(this.step.toString()), true);
      } else if (args.keyCode === 33 || args.currentTarget.classList.contains(classNames.firstButton)) {
        enabledRTL ? value = this.add(hVal, parseFloat(this.ticks.largeStep.toString()), false) : value = this.add(hVal, parseFloat(this.ticks.largeStep.toString()), true);
      } else if (args.keyCode === 34 || args.currentTarget.classList.contains(classNames.secondButton)) {
        enabledRTL ? value = this.add(hVal, parseFloat(this.ticks.largeStep.toString()), true) : value = this.add(hVal, parseFloat(this.ticks.largeStep.toString()), false);
      } else if (args.keyCode === 36) {
        value = parseFloat(this.min < this.max ? this.min.toString() : this.max.toString());
      } else if (args.keyCode === 35) {
        value = parseFloat(this.min < this.max ? this.max.toString() : this.min.toString());
      }
      if (this.limits.enabled) {
        value = this.getLimitCorrectedValues(value);
      }
      this.changeHandleValue(value);
      if ((this.isMaterial || this.isMaterial3) && !this.tooltip.isVisible && !this.getHandle().classList.contains(classNames.sliderTabHandle)) {
        this.materialChange();
      }
      this.tooltipToggle(this.getHandle());
      this.getHandle().focus();
      this.focusHandle();
      if (args.currentTarget.classList.contains(classNames.firstButton)) {
        EventHandler.add(this.firstBtn, "mouseup touchend", this.buttonUp, this);
      }
      if (args.currentTarget.classList.contains(classNames.secondButton)) {
        EventHandler.add(this.secondBtn, "mouseup touchend", this.buttonUp, this);
      }
    };
    Slider2.prototype.tooltipToggle = function(target) {
      if (this.isMaterialTooltip) {
        !this.tooltipElement.classList.contains(classNames.materialTooltipOpen) ? this.openMaterialTooltip() : this.refreshTooltip(this.firstHandle);
      } else {
        !this.tooltipElement ? this.openTooltip(target) : this.refreshTooltip(target);
      }
    };
    Slider2.prototype.buttonUp = function(args) {
      if (args.currentTarget.classList.contains(classNames.firstButton)) {
        EventHandler.remove(this.firstBtn, "mouseup touchend", this.buttonUp);
      }
      if (args.currentTarget.classList.contains(classNames.secondButton)) {
        EventHandler.remove(this.secondBtn, "mouseup touchend", this.buttonUp);
      }
    };
    Slider2.prototype.setRangeBar = function() {
      if (this.orientation === "Horizontal" && !isNullOrUndefined(this.rangeBar)) {
        if (this.type === "MinRange") {
          this.enableRtl ? this.rangeBar.style.right = "0px" : this.rangeBar.style.left = "0px";
          setStyleAttribute(this.rangeBar, { "width": isNullOrUndefined(this.handlePos1) ? 0 : this.handlePos1 + "px" });
        } else {
          this.enableRtl ? this.rangeBar.style.right = this.handlePos1 + "px" : this.rangeBar.style.left = this.handlePos1 + "px";
          setStyleAttribute(this.rangeBar, { "width": this.handlePos2 - this.handlePos1 + "px" });
        }
      } else if (!isNullOrUndefined(this.rangeBar)) {
        if (this.type === "MinRange") {
          this.rangeBar.style.bottom = this.min > this.max ? this.handlePos1 + "px" : "0px";
          setStyleAttribute(this.rangeBar, { "height": isNullOrUndefined(this.handlePos1) ? 0 : this.min > this.max ? this.element.clientHeight - this.handlePos1 + "px" : this.handlePos1 + "px" });
        } else {
          this.rangeBar.style.bottom = this.min > this.max ? this.handlePos2 + "px" : this.handlePos1 + "px";
          setStyleAttribute(this.rangeBar, { "height": this.min > this.max ? this.handlePos1 - this.handlePos2 + "px" : this.handlePos2 - this.handlePos1 + "px" });
        }
      }
    };
    Slider2.prototype.checkValidValueAndPos = function(value) {
      value = this.checkHandleValue(value);
      value = this.checkHandlePosition(value);
      return value;
    };
    Slider2.prototype.setLimitBarPositions = function(fromMinPostion, fromMaxpostion, toMinPostion, toMaxpostion) {
      if (this.orientation === "Horizontal") {
        if (!this.enableRtl) {
          this.limitBarFirst.style.left = fromMinPostion + "px";
          this.limitBarFirst.style.width = fromMaxpostion - fromMinPostion + "px";
        } else {
          this.limitBarFirst.style.right = fromMinPostion + "px";
          this.limitBarFirst.style.width = fromMaxpostion - fromMinPostion + "px";
        }
      } else {
        this.limitBarFirst.style.bottom = (this.min < this.max ? fromMinPostion : fromMaxpostion) + "px";
        this.limitBarFirst.style.height = (this.min < this.max ? fromMaxpostion - fromMinPostion : fromMinPostion - fromMaxpostion) + "px";
      }
      if (this.type === "Range") {
        if (this.orientation === "Horizontal") {
          if (!this.enableRtl) {
            this.limitBarSecond.style.left = toMinPostion + "px";
            this.limitBarSecond.style.width = toMaxpostion - toMinPostion + "px";
          } else {
            this.limitBarSecond.style.right = toMinPostion + "px";
            this.limitBarSecond.style.width = toMaxpostion - toMinPostion + "px";
          }
        } else {
          this.limitBarSecond.style.bottom = (this.min < this.max ? toMinPostion : toMaxpostion) + "px";
          this.limitBarSecond.style.height = (this.min < this.max ? toMaxpostion - toMinPostion : toMinPostion - toMaxpostion) + "px";
        }
      }
    };
    Slider2.prototype.setLimitBar = function() {
      if (this.type === "Default" || this.type === "MinRange") {
        var fromPosition = this.getLimitValueAndPosition(this.limits.minStart, this.limits.minStart, this.limits.minEnd, true)[0];
        fromPosition = this.checkValidValueAndPos(fromPosition);
        var toPosition = this.getLimitValueAndPosition(this.limits.minEnd, this.limits.minStart, this.limits.minEnd, true)[0];
        toPosition = this.checkValidValueAndPos(toPosition);
        this.setLimitBarPositions(fromPosition, toPosition);
      } else if (this.type === "Range") {
        var fromMinPostion = this.getLimitValueAndPosition(this.limits.minStart, this.limits.minStart, this.limits.minEnd, true)[0];
        fromMinPostion = this.checkValidValueAndPos(fromMinPostion);
        var fromMaxpostion = this.getLimitValueAndPosition(this.limits.minEnd, this.limits.minStart, this.limits.minEnd, true)[0];
        fromMaxpostion = this.checkValidValueAndPos(fromMaxpostion);
        var toMinPostion = this.getLimitValueAndPosition(this.limits.maxStart, this.limits.maxStart, this.limits.maxEnd, true)[0];
        toMinPostion = this.checkValidValueAndPos(toMinPostion);
        var toMaxpostion = this.getLimitValueAndPosition(this.limits.maxEnd, this.limits.maxStart, this.limits.maxEnd, true)[0];
        toMaxpostion = this.checkValidValueAndPos(toMaxpostion);
        this.setLimitBarPositions(fromMinPostion, fromMaxpostion, toMinPostion, toMaxpostion);
      }
    };
    Slider2.prototype.getLimitValueAndPosition = function(currentValue, minValue, maxValue, limitBar) {
      if (isNullOrUndefined(minValue)) {
        minValue = this.min < this.max ? this.min : this.max;
        if (isNullOrUndefined(currentValue) && limitBar) {
          currentValue = minValue;
        }
      }
      if (isNullOrUndefined(maxValue)) {
        maxValue = this.min < this.max ? this.max : this.min;
        if (isNullOrUndefined(currentValue) && limitBar) {
          currentValue = maxValue;
        }
      }
      if (currentValue < minValue) {
        currentValue = minValue;
      }
      if (currentValue > maxValue) {
        currentValue = maxValue;
      }
      return [currentValue, this.checkHandlePosition(currentValue)];
    };
    Slider2.prototype.setValue = function() {
      if (!isNullOrUndefined(this.customValues) && this.customValues.length > 0) {
        this.min = 0;
        this.max = this.customValues.length - 1;
        this.setBarColor();
      }
      this.setAriaAttributes(this.firstHandle);
      this.handleVal1 = isNullOrUndefined(this.value) ? this.checkHandleValue(parseFloat(this.min.toString())) : this.checkHandleValue(parseFloat(this.value.toString()));
      this.handlePos1 = this.checkHandlePosition(this.handleVal1);
      this.preHandlePos1 = this.handlePos1;
      isNullOrUndefined(this.activeHandle) ? this.type === "Range" ? this.activeHandle = 2 : this.activeHandle = 1 : (
        // eslint-disable-next-line no-self-assign
        this.activeHandle = this.activeHandle
      );
      if (this.type === "Default" || this.type === "MinRange") {
        if (this.limits.enabled) {
          var values = this.getLimitValueAndPosition(this.handleVal1, this.limits.minStart, this.limits.minEnd);
          this.handleVal1 = values[0];
          this.handlePos1 = values[1];
          this.preHandlePos1 = this.handlePos1;
        }
        this.setHandlePosition(null);
        this.handleStart();
        this.value = this.handleVal1;
        this.setAriaAttrValue(this.firstHandle);
        this.changeEvent("changed", null);
      } else {
        this.validateRangeValue();
      }
      if (this.type !== "Default") {
        this.setRangeBar();
      }
      if (this.limits.enabled) {
        this.setLimitBar();
      }
    };
    Slider2.prototype.rangeValueUpdate = function() {
      if (this.value === null || typeof this.value !== "object") {
        this.value = [parseFloat(formatUnit(this.min)), parseFloat(formatUnit(this.max))];
      }
    };
    Slider2.prototype.validateRangeValue = function() {
      this.rangeValueUpdate();
      this.setRangeValue();
    };
    Slider2.prototype.modifyZindex = function() {
      if (this.type === "Range" && !isNullOrUndefined(this.firstHandle) && !isNullOrUndefined(this.secondHandle)) {
        if (this.activeHandle === 1) {
          this.firstHandle.style.zIndex = this.zIndex + 4 + "";
          this.secondHandle.style.zIndex = this.zIndex + 3 + "";
        } else {
          this.firstHandle.style.zIndex = this.zIndex + 3 + "";
          this.secondHandle.style.zIndex = this.zIndex + 4 + "";
        }
      } else if (this.isMaterialTooltip && this.tooltipElement) {
        this.tooltipElement.style.zIndex = getZindexPartial(this.element) + "";
      }
    };
    Slider2.prototype.setHandlePosition = function(event) {
      var _this = this;
      var handle;
      var pos = this.activeHandle === 1 ? this.handlePos1 : this.handlePos2;
      if (this.isMaterialTooltip) {
        handle = [this.firstHandle, this.materialHandle];
      } else {
        handle = [this.getHandle()];
      }
      this.handleStart();
      handle.forEach(function(handle2) {
        if (_this.orientation === "Horizontal") {
          _this.enableRtl ? handle2.style.right = pos + "px" : handle2.style.left = pos + "px";
        } else {
          handle2.style.bottom = pos + "px";
        }
      });
      this.changeEvent("change", event);
    };
    Slider2.prototype.getHandle = function() {
      return this.activeHandle === 1 ? this.firstHandle : this.secondHandle;
    };
    Slider2.prototype.setRangeValue = function() {
      this.updateRangeValue();
      this.activeHandle = 1;
      this.setHandlePosition(null);
      this.activeHandle = 2;
      this.setHandlePosition(null);
      this.activeHandle = 1;
    };
    Slider2.prototype.changeEvent = function(eventName, e) {
      var previous = eventName === "change" ? this.previousVal : this.previousChanged;
      if (this.type !== "Range") {
        this.setProperties({ "value": this.handleVal1 }, true);
        if (previous !== this.value && (!this.isMaterialTooltip || !this.initialTooltip)) {
          this.trigger(eventName, this.changeEventArgs(eventName, e));
          this.initialTooltip = true;
          this.setPreviousVal(eventName, this.value);
        }
        this.setAriaAttrValue(this.firstHandle);
      } else {
        var value = this.value = [this.handleVal1, this.handleVal2];
        this.setProperties({ "value": value }, true);
        if (previous.length === this.value.length && this.value[0] !== previous[0] || this.value[1] !== previous[1]) {
          this.initialTooltip = false;
          this.trigger(eventName, this.changeEventArgs(eventName, e));
          this.initialTooltip = true;
          this.setPreviousVal(eventName, this.value);
        }
        this.setAriaAttrValue(this.getHandle());
      }
      this.hiddenInput.value = this.value.toString();
    };
    Slider2.prototype.changeEventArgs = function(eventName, e) {
      var eventArgs;
      if (this.tooltip.isVisible && this.tooltipObj && this.initialTooltip) {
        this.tooltipValue();
        eventArgs = {
          value: this.value,
          previousValue: eventName === "change" ? this.previousVal : this.previousChanged,
          action: eventName,
          text: typeof this.tooltipObj.content === "function" ? this.tooltipObj.content() : this.tooltipObj.content,
          isInteracted: isNullOrUndefined(e) ? false : true
        };
      } else {
        eventArgs = {
          value: this.value,
          previousValue: eventName === "change" ? this.previousVal : this.previousChanged,
          action: eventName,
          text: isNullOrUndefined(this.ticksFormatInfo.format) ? this.value.toString() : this.type !== "Range" ? this.formatString(this.value, this.ticksFormatInfo).formatString : this.formatString(this.value[0], this.ticksFormatInfo).formatString + " - " + this.formatString(this.value[1], this.ticksFormatInfo).formatString,
          isInteracted: isNullOrUndefined(e) ? false : true
        };
      }
      return eventArgs;
    };
    Slider2.prototype.setPreviousVal = function(eventName, value) {
      if (eventName === "change") {
        this.previousVal = value;
      } else {
        this.previousChanged = value;
      }
    };
    Slider2.prototype.updateRangeValue = function() {
      var values = this.value.toString().split(",").map(Number);
      if (this.enableRtl && this.orientation !== "Vertical" || this.rtl) {
        this.value = [values[1], values[0]];
      } else {
        this.value = [values[0], values[1]];
      }
      if (this.enableRtl && this.orientation !== "Vertical") {
        this.handleVal1 = this.checkHandleValue(this.value[1]);
        this.handleVal2 = this.checkHandleValue(this.value[0]);
      } else {
        this.handleVal1 = this.checkHandleValue(this.value[0]);
        this.handleVal2 = this.checkHandleValue(this.value[1]);
      }
      this.handlePos1 = this.checkHandlePosition(this.handleVal1);
      this.handlePos2 = this.checkHandlePosition(this.handleVal2);
      if (this.min < this.max && this.handlePos1 > this.handlePos2) {
        this.handlePos1 = this.handlePos2;
        this.handleVal1 = this.handleVal2;
      }
      if (this.min > this.max && this.handlePos1 < this.handlePos2) {
        this.handlePos2 = this.handlePos1;
        this.handleVal2 = this.handleVal1;
      }
      this.preHandlePos1 = this.handlePos1;
      this.preHandlePos2 = this.handlePos2;
      if (this.limits.enabled) {
        this.activeHandle = 1;
        var values_1 = this.getLimitValueAndPosition(this.handleVal1, this.limits.minStart, this.limits.minEnd);
        this.handleVal1 = values_1[0];
        this.handlePos1 = values_1[1];
        this.preHandlePos1 = this.handlePos1;
        this.activeHandle = 2;
        values_1 = this.getLimitValueAndPosition(this.handleVal2, this.limits.maxStart, this.limits.maxEnd);
        this.handleVal2 = values_1[0];
        this.handlePos2 = values_1[1];
        this.preHandlePos2 = this.handlePos2;
      }
    };
    Slider2.prototype.checkHandlePosition = function(value) {
      var pos;
      value = 100 * (value - parseFloat(formatUnit(this.min))) / (parseFloat(formatUnit(this.max)) - parseFloat(formatUnit(this.min)));
      if (this.orientation === "Horizontal") {
        pos = this.element.getBoundingClientRect().width * (value / 100);
      } else {
        pos = this.element.getBoundingClientRect().height * (value / 100);
      }
      if (parseFloat(formatUnit(this.max)) === parseFloat(formatUnit(this.min))) {
        if (this.orientation === "Horizontal") {
          pos = this.element.getBoundingClientRect().width;
        } else {
          pos = this.element.getBoundingClientRect().height;
        }
      }
      return pos;
    };
    Slider2.prototype.checkHandleValue = function(value) {
      if (this.min === this.max) {
        return parseFloat(formatUnit(this.max));
      }
      var handle = this.tempStartEnd();
      if (value < handle.start) {
        value = handle.start;
      } else if (value > handle.end) {
        value = handle.end;
      }
      return value;
    };
    Slider2.prototype.reposition = function() {
      var _this = this;
      if (!isNullOrUndefined(this.firstHandle))
        this.firstHandle.style.transition = "none";
      if (this.type !== "Default" && !isNullOrUndefined(this.rangeBar)) {
        this.rangeBar.style.transition = "none";
      }
      if (this.type === "Range" && !isNullOrUndefined(this.secondHandle)) {
        this.secondHandle.style.transition = "none";
      }
      this.handlePos1 = this.checkHandlePosition(this.handleVal1);
      if (this.handleVal2) {
        this.handlePos2 = this.checkHandlePosition(this.handleVal2);
      }
      if (this.orientation === "Horizontal") {
        this.enableRtl ? this.firstHandle.style.right = this.handlePos1 + "px" : this.firstHandle.style.left = this.handlePos1 + "px";
        if (this.isMaterialTooltip && !isNullOrUndefined(this.materialHandle)) {
          this.enableRtl ? this.materialHandle.style.right = this.handlePos1 + "px" : this.materialHandle.style.left = this.handlePos1 + "px";
        }
        if (this.type === "MinRange" && !isNullOrUndefined(this.rangeBar)) {
          this.enableRtl ? this.rangeBar.style.right = "0px" : this.rangeBar.style.left = "0px";
          setStyleAttribute(this.rangeBar, { "width": isNullOrUndefined(this.handlePos1) ? 0 : this.handlePos1 + "px" });
        } else if (this.type === "Range" && !isNullOrUndefined(this.secondHandle) && !isNullOrUndefined(this.rangeBar)) {
          this.enableRtl ? this.secondHandle.style.right = this.handlePos2 + "px" : this.secondHandle.style.left = this.handlePos2 + "px";
          this.enableRtl ? this.rangeBar.style.right = this.handlePos1 + "px" : this.rangeBar.style.left = this.handlePos1 + "px";
          setStyleAttribute(this.rangeBar, { "width": this.handlePos2 - this.handlePos1 + "px" });
        }
      } else {
        this.firstHandle.style.bottom = this.handlePos1 + "px";
        if (this.isMaterialTooltip) {
          this.materialHandle.style.bottom = this.handlePos1 + "px";
        }
        if (this.type === "MinRange") {
          this.rangeBar.style.bottom = this.min > this.max ? this.handlePos1 + "px" : "0px";
          setStyleAttribute(this.rangeBar, { "height": isNullOrUndefined(this.handlePos1) ? 0 : this.min > this.max ? this.element.clientHeight - this.handlePos1 + "px" : this.handlePos1 + "px" });
        } else if (this.type === "Range") {
          this.secondHandle.style.bottom = this.handlePos2 + "px";
          this.rangeBar.style.bottom = this.min > this.max ? this.handlePos2 + "px" : this.handlePos1 + "px";
          setStyleAttribute(this.rangeBar, { "height": this.min > this.max ? this.handlePos1 - this.handlePos2 + "px" : this.handlePos2 - this.handlePos1 + "px" });
        }
      }
      if (this.limits.enabled) {
        this.setLimitBar();
      }
      if (this.ticks.placement !== "None" && this.ul) {
        this.removeElement(this.ul);
        this.ul = void 0;
        this.renderScale();
      }
      this.handleStart();
      if (!this.tooltip.isVisible) {
        setTimeout(function() {
          if (!isNullOrUndefined(_this.firstHandle))
            _this.firstHandle.style.transition = _this.scaleTransform;
          if (_this.type === "Range" && !isNullOrUndefined(_this.secondHandle)) {
            _this.secondHandle.style.transition = _this.scaleTransform;
          }
        });
      }
      this.refreshTooltip(this.tooltipTarget);
      this.setBarColor();
    };
    Slider2.prototype.changeHandleValue = function(value) {
      var position = null;
      if (this.activeHandle === 1) {
        if (!(this.limits.enabled && this.limits.startHandleFixed)) {
          this.handleVal1 = this.checkHandleValue(value);
          this.handlePos1 = this.checkHandlePosition(this.handleVal1);
          if (this.type === "Range" && (this.handlePos1 > this.handlePos2 && this.min < this.max || this.handlePos1 < this.handlePos2 && this.min > this.max)) {
            this.handlePos1 = this.handlePos2;
            this.handleVal1 = this.handleVal2;
          }
          if (this.handlePos1 !== this.preHandlePos1) {
            position = this.preHandlePos1 = this.handlePos1;
          }
        }
        this.modifyZindex();
      } else {
        if (!(this.limits.enabled && this.limits.endHandleFixed)) {
          this.handleVal2 = this.checkHandleValue(value);
          this.handlePos2 = this.checkHandlePosition(this.handleVal2);
          if (this.type === "Range" && (this.handlePos2 < this.handlePos1 && this.min < this.max || this.handlePos2 > this.handlePos1 && this.min > this.max)) {
            this.handlePos2 = this.handlePos1;
            this.handleVal2 = this.handleVal1;
          }
          if (this.handlePos2 !== this.preHandlePos2) {
            position = this.preHandlePos2 = this.handlePos2;
          }
        }
        this.modifyZindex();
      }
      if (position !== null) {
        if (this.type !== "Default") {
          this.setRangeBar();
        }
        this.setHandlePosition(null);
      }
    };
    Slider2.prototype.tempStartEnd = function() {
      if (this.min > this.max) {
        return {
          start: this.max,
          end: this.min
        };
      } else {
        return {
          start: this.min,
          end: this.max
        };
      }
    };
    Slider2.prototype.xyToPosition = function(position) {
      var pos;
      if (this.min === this.max) {
        return 100;
      }
      if (this.orientation === "Horizontal") {
        var left = position.x - this.element.getBoundingClientRect().left;
        var num = this.element.offsetWidth / 100;
        this.val = left / num;
      } else {
        var top_1 = position.y - this.element.getBoundingClientRect().top;
        var num = this.element.offsetHeight / 100;
        this.val = 100 - top_1 / num;
      }
      var val = this.stepValueCalculation(this.val);
      if (val < 0) {
        val = 0;
      } else if (val > 100) {
        val = 100;
      }
      if (this.enableRtl && this.orientation !== "Vertical") {
        val = 100 - val;
      }
      if (this.orientation === "Horizontal") {
        pos = this.element.getBoundingClientRect().width * (val / 100);
      } else {
        pos = this.element.getBoundingClientRect().height * (val / 100);
      }
      return pos;
    };
    Slider2.prototype.stepValueCalculation = function(value) {
      if (this.step === 0) {
        this.step = 1;
      }
      var percentStep = parseFloat(formatUnit(this.step)) / ((parseFloat(formatUnit(this.max)) - parseFloat(formatUnit(this.min))) / 100);
      var remain = value % Math.abs(percentStep);
      if (remain !== 0) {
        if (percentStep / 2 > remain) {
          value -= remain;
        } else {
          value += Math.abs(percentStep) - remain;
        }
      }
      return value;
    };
    Slider2.prototype.add = function(a, b, addition) {
      var precision;
      var x = Math.pow(10, precision || 3);
      var val;
      if (addition) {
        val = (Math.round(a * x) + Math.round(b * x)) / x;
      } else {
        val = (Math.round(a * x) - Math.round(b * x)) / x;
      }
      return val;
    };
    Slider2.prototype.positionToValue = function(pos) {
      var val;
      var diff = parseFloat(formatUnit(this.max)) - parseFloat(formatUnit(this.min));
      if (this.orientation === "Horizontal") {
        val = pos / this.element.getBoundingClientRect().width * diff;
      } else {
        val = pos / this.element.getBoundingClientRect().height * diff;
      }
      var total = this.add(val, parseFloat(this.min.toString()), true);
      return total;
    };
    Slider2.prototype.sliderBarClick = function(evt) {
      evt.preventDefault();
      var pos;
      if (evt.type === "mousedown" || evt.type === "mouseup" || evt.type === "click") {
        pos = { x: evt.clientX, y: evt.clientY };
      } else if (evt.type === "touchend" || evt.type === "touchstart") {
        pos = { x: evt.changedTouches[0].clientX, y: evt.changedTouches[0].clientY };
      }
      var handlepos = this.xyToPosition(pos);
      var handleVal = this.positionToValue(handlepos);
      if (this.type === "Range" && (this.min < this.max && this.handlePos2 - handlepos < handlepos - this.handlePos1 || this.min > this.max && this.handlePos1 - handlepos > handlepos - this.handlePos2)) {
        this.activeHandle = 2;
        if (!(this.limits.enabled && this.limits.endHandleFixed)) {
          if (this.limits.enabled) {
            var value = this.getLimitValueAndPosition(handleVal, this.limits.maxStart, this.limits.maxEnd);
            handleVal = value[0];
            handlepos = value[1];
          }
          this.secondHandle.classList.add(classNames.sliderActiveHandle);
          this.handlePos2 = this.preHandlePos2 = handlepos;
          this.handleVal2 = handleVal;
        }
        this.modifyZindex();
        this.secondHandle.focus();
      } else {
        this.activeHandle = 1;
        if (!(this.limits.enabled && this.limits.startHandleFixed)) {
          if (this.limits.enabled) {
            var value = this.getLimitValueAndPosition(handleVal, this.limits.minStart, this.limits.minEnd);
            handleVal = value[0];
            handlepos = value[1];
          }
          this.firstHandle.classList.add(classNames.sliderActiveHandle);
          this.handlePos1 = this.preHandlePos1 = handlepos;
          this.handleVal1 = handleVal;
        }
        this.modifyZindex();
        this.firstHandle.focus();
      }
      if (this.isMaterialTooltip) {
        this.tooltipElement.classList.add(classNames.materialTooltipActive);
      }
      var focusedElement = this.element.querySelector("." + classNames.sliderTabHandle);
      if (focusedElement && this.getHandle() !== focusedElement) {
        focusedElement.classList.remove(classNames.sliderTabHandle);
      }
      var handle = this.activeHandle === 1 ? this.firstHandle : this.secondHandle;
      var behindElement;
      if ((evt.type === "click" || evt.type === "mousedown") && evt.target === handle) {
        var eventX = evt.clientX, eventY = evt.clientY;
        behindElement = document.elementFromPoint(eventX, eventY);
      }
      if (evt.target === handle && behindElement != handle) {
        if ((this.isMaterial || this.isMaterial3) && !this.tooltip.isVisible && !this.getHandle().classList.contains(classNames.sliderTabHandle)) {
          this.materialChange();
        }
        this.sliderBarUp(evt);
        this.tooltipToggle(this.getHandle());
        return;
      }
      if (!this.checkRepeatedValue(handleVal)) {
        return;
      }
      var transition = (this.isMaterial || this.isMaterial3) && this.tooltip.isVisible ? this.transitionOnMaterialTooltip : this.transition;
      this.getHandle().style.transition = transition.handle;
      if (this.type !== "Default") {
        this.rangeBar.style.transition = transition.rangeBar;
      }
      this.setHandlePosition(evt);
      if (this.isMaterialTooltip) {
        this.initialTooltip = false;
      }
      if (evt.target != handle) {
        this.changeEvent("changed", evt);
      }
      if (this.type !== "Default") {
        this.setRangeBar();
      }
    };
    Slider2.prototype.handleValueAdjust = function(handleValue, assignValue, handleNumber) {
      if (handleNumber === 1) {
        this.handleVal1 = assignValue;
        this.handleVal2 = this.handleVal1 + this.minDiff;
      } else if (handleNumber === 2) {
        this.handleVal2 = assignValue;
        this.handleVal1 = this.handleVal2 - this.minDiff;
      }
      this.handlePos1 = this.checkHandlePosition(this.handleVal1);
      this.handlePos2 = this.checkHandlePosition(this.handleVal2);
    };
    Slider2.prototype.dragRangeBarMove = function(event) {
      var _a, _b;
      if (event.type !== "touchmove") {
        event.preventDefault();
      }
      this.rangeBarDragged = true;
      var pos;
      this.rangeBar.style.transition = "none";
      this.firstHandle.style.transition = "none";
      this.secondHandle.style.transition = "none";
      var xPostion;
      var yPostion;
      if (event.type === "mousemove") {
        _a = [event.clientX, event.clientY], xPostion = _a[0], yPostion = _a[1];
      } else {
        _b = [event.changedTouches[0].clientX, event.changedTouches[0].clientY], xPostion = _b[0], yPostion = _b[1];
      }
      if (!(this.limits.enabled && this.limits.startHandleFixed) && !(this.limits.enabled && this.limits.endHandleFixed)) {
        if (!this.enableRtl) {
          pos = { x: xPostion - this.firstPartRemain, y: yPostion + this.secondPartRemain };
        } else {
          pos = { x: xPostion + this.secondPartRemain, y: yPostion + this.secondPartRemain };
        }
        if (this.min > this.max) {
          this.handlePos2 = this.xyToPosition(pos);
          this.handleVal2 = this.positionToValue(this.handlePos2);
        } else {
          this.handlePos1 = this.xyToPosition(pos);
          this.handleVal1 = this.positionToValue(this.handlePos1);
        }
        if (!this.enableRtl) {
          pos = { x: xPostion + this.secondPartRemain, y: yPostion - this.firstPartRemain };
        } else {
          pos = { x: xPostion - this.firstPartRemain, y: yPostion - this.firstPartRemain };
        }
        if (this.min > this.max) {
          this.handlePos1 = this.xyToPosition(pos);
          this.handleVal1 = this.positionToValue(this.handlePos1);
        } else {
          this.handlePos2 = this.xyToPosition(pos);
          this.handleVal2 = this.positionToValue(this.handlePos2);
        }
        if (this.limits.enabled) {
          var value = this.getLimitValueAndPosition(this.handleVal1, this.limits.minStart, this.limits.minEnd);
          this.handleVal1 = value[0];
          this.handlePos1 = value[1];
          if (this.handleVal1 === this.limits.minEnd) {
            this.handleValueAdjust(this.handleVal1, this.limits.minEnd, 1);
          }
          if (this.handleVal1 === this.limits.minStart) {
            this.handleValueAdjust(this.handleVal1, this.limits.minStart, 1);
          }
          value = this.getLimitValueAndPosition(this.handleVal2, this.limits.maxStart, this.limits.maxEnd);
          this.handleVal2 = value[0];
          this.handlePos2 = value[1];
          if (this.handleVal2 === this.limits.maxStart) {
            this.handleValueAdjust(this.handleVal2, this.limits.maxStart, 2);
          }
          if (this.handleVal2 === this.limits.maxEnd) {
            this.handleValueAdjust(this.handleVal2, this.limits.maxEnd, 2);
          }
        }
        if (this.handleVal2 === (this.min > this.max ? this.min : this.max)) {
          this.handleValueAdjust(this.handleVal2, this.min > this.max ? this.min : this.max, 2);
        }
        if (this.handleVal1 === (this.min > this.max ? this.max : this.min)) {
          this.handleValueAdjust(this.handleVal1, this.min > this.max ? this.max : this.min, 1);
        }
      }
      this.activeHandle = 1;
      this.setHandlePosition(event);
      this.activeHandle = 2;
      this.setHandlePosition(event);
      this.tooltipToggle(this.rangeBar);
      this.setRangeBar();
    };
    Slider2.prototype.sliderBarUp = function(event) {
      this.changeEvent("changed", event);
      this.handleFocusOut();
      this.firstHandle.classList.remove(classNames.sliderActiveHandle);
      if (this.type === "Range") {
        this.initialTooltip = false;
        this.secondHandle.classList.remove(classNames.sliderActiveHandle);
      }
      this.closeTooltip();
      if (this.isMaterial || this.isMaterial3) {
        this.getHandle().classList.remove("e-large-thumb-size");
        if (this.isMaterialTooltip) {
          this.tooltipElement.classList.remove(classNames.materialTooltipActive);
        }
      }
      EventHandler.remove(document, "mousemove touchmove", this.sliderBarMove);
      EventHandler.remove(document, "mouseup touchend", this.sliderBarUp);
    };
    Slider2.prototype.sliderBarMove = function(evt) {
      if (evt.type !== "touchmove") {
        evt.preventDefault();
      }
      var pos;
      if (evt.type === "mousemove") {
        pos = { x: evt.clientX, y: evt.clientY };
      } else {
        pos = { x: evt.changedTouches[0].clientX, y: evt.changedTouches[0].clientY };
      }
      var handlepos = this.xyToPosition(pos);
      var handleVal = this.positionToValue(handlepos);
      handlepos = Math.round(handlepos);
      if (this.type !== "Range" && this.activeHandle === 1) {
        if (!(this.limits.enabled && this.limits.startHandleFixed)) {
          if (this.limits.enabled) {
            var valueAndPostion = this.getLimitValueAndPosition(handleVal, this.limits.minStart, this.limits.minEnd);
            handlepos = valueAndPostion[1];
            handleVal = valueAndPostion[0];
          }
          this.handlePos1 = handlepos;
          this.handleVal1 = handleVal;
        }
        this.firstHandle.classList.add(classNames.sliderActiveHandle);
      }
      if (this.type === "Range") {
        if (this.activeHandle === 1) {
          this.firstHandle.classList.add(classNames.sliderActiveHandle);
          if (!(this.limits.enabled && this.limits.startHandleFixed)) {
            if (this.min < this.max && handlepos > this.handlePos2 || this.min > this.max && handlepos < this.handlePos2) {
              handlepos = this.handlePos2;
              handleVal = this.handleVal2;
            }
            if (handlepos !== this.preHandlePos1) {
              if (this.limits.enabled) {
                var value = this.getLimitValueAndPosition(handleVal, this.limits.minStart, this.limits.minEnd);
                handleVal = value[0];
                handlepos = value[1];
              }
              this.handlePos1 = this.preHandlePos1 = handlepos;
              this.handleVal1 = handleVal;
              this.activeHandle = 1;
            }
          }
        } else if (this.activeHandle === 2) {
          this.secondHandle.classList.add(classNames.sliderActiveHandle);
          if (!(this.limits.enabled && this.limits.endHandleFixed)) {
            if (this.min < this.max && handlepos < this.handlePos1 || this.min > this.max && handlepos > this.handlePos1) {
              handlepos = this.handlePos1;
              handleVal = this.handleVal1;
            }
            if (handlepos !== this.preHandlePos2) {
              if (this.limits.enabled) {
                var value = this.getLimitValueAndPosition(handleVal, this.limits.maxStart, this.limits.maxEnd);
                handleVal = value[0];
                handlepos = value[1];
              }
              this.handlePos2 = this.preHandlePos2 = handlepos;
              this.handleVal2 = handleVal;
              this.activeHandle = 2;
            }
          }
        }
      }
      if (!this.checkRepeatedValue(handleVal)) {
        return;
      }
      this.getHandle().style.transition = this.scaleTransform;
      if (this.type !== "Default") {
        this.rangeBar.style.transition = "none";
      }
      this.setHandlePosition(evt);
      if ((this.isMaterial || this.isMaterial3) && !this.tooltip.isVisible && !this.getHandle().classList.contains(classNames.sliderTabHandle)) {
        this.materialChange();
      }
      this.tooltipToggle(this.getHandle());
      if (this.type !== "Default") {
        this.setRangeBar();
      }
    };
    Slider2.prototype.dragRangeBarUp = function(event) {
      if (!this.rangeBarDragged) {
        this.focusSliderElement();
        this.sliderBarClick(event);
      } else {
        this.isDragComplete = true;
      }
      this.changeEvent("changed", event);
      this.closeTooltip();
      EventHandler.remove(document, "mousemove touchmove", this.dragRangeBarMove);
      EventHandler.remove(document, "mouseup touchend", this.dragRangeBarUp);
      this.rangeBarDragged = false;
    };
    Slider2.prototype.checkRepeatedValue = function(currentValue) {
      if (this.type === "Range") {
        var previousVal = this.enableRtl && this.orientation !== "Vertical" ? this.activeHandle === 1 ? this.previousVal[1] : this.previousVal[0] : this.activeHandle === 1 ? this.previousVal[0] : this.previousVal[1];
        if (currentValue === previousVal) {
          return 0;
        }
      } else {
        if (currentValue === this.previousVal) {
          return 0;
        }
      }
      return 1;
    };
    Slider2.prototype.refreshTooltip = function(target) {
      if (this.tooltip.isVisible && this.tooltipObj) {
        this.tooltipValue();
        if (target) {
          this.tooltipObj.refresh(target);
          this.tooltipTarget = target;
        }
      }
    };
    Slider2.prototype.openTooltip = function(target) {
      if (this.tooltip.isVisible && this.tooltipObj && !this.isMaterialTooltip) {
        this.tooltipValue();
        this.tooltipObj.open(target);
        this.tooltipTarget = target;
      }
    };
    Slider2.prototype.closeTooltip = function() {
      if (this.tooltip.isVisible && this.tooltipObj && this.tooltip.showOn !== "Always" && !this.isMaterialTooltip) {
        this.tooltipValue();
        this.tooltipObj.close();
        this.tooltipTarget = void 0;
      }
    };
    Slider2.prototype.keyDown = function(event) {
      switch (event.keyCode) {
        case 37:
        case 38:
        case 39:
        case 40:
        case 33:
        case 34:
        case 36:
        case 35:
          event.preventDefault();
          this.buttonClick(event);
          break;
      }
    };
    Slider2.prototype.wireButtonEvt = function(destroy) {
      if (!destroy) {
        EventHandler.add(this.firstBtn, "mouseleave touchleave", this.buttonFocusOut, this);
        EventHandler.add(this.secondBtn, "mouseleave touchleave", this.buttonFocusOut, this);
        EventHandler.add(this.firstBtn, "mousedown touchstart", this.repeatHandlerMouse, this);
        EventHandler.add(this.firstBtn, "mouseup mouseleave touchup touchend", this.repeatHandlerUp, this);
        EventHandler.add(this.secondBtn, "mousedown touchstart", this.repeatHandlerMouse, this);
        EventHandler.add(this.secondBtn, "mouseup mouseleave touchup touchend", this.repeatHandlerUp, this);
        EventHandler.add(this.firstBtn, "focusout", this.sliderFocusOut, this);
        EventHandler.add(this.secondBtn, "focusout", this.sliderFocusOut, this);
      } else {
        EventHandler.remove(this.firstBtn, "mouseleave touchleave", this.buttonFocusOut);
        EventHandler.remove(this.secondBtn, "mouseleave touchleave", this.buttonFocusOut);
        EventHandler.remove(this.firstBtn, "mousedown touchstart", this.repeatHandlerMouse);
        EventHandler.remove(this.firstBtn, "mouseup mouseleave touchup touchend", this.repeatHandlerUp);
        EventHandler.remove(this.secondBtn, "mousedown touchstart", this.repeatHandlerMouse);
        EventHandler.remove(this.secondBtn, "mouseup mouseleave touchup touchend", this.repeatHandlerUp);
        EventHandler.remove(this.firstBtn, "focusout", this.sliderFocusOut);
        EventHandler.remove(this.secondBtn, "focusout", this.sliderFocusOut);
      }
    };
    Slider2.prototype.rangeBarMousedown = function(event) {
      var _a, _b;
      event.preventDefault();
      this.focusSliderElement();
      if (this.type === "Range" && this.drag && event.target === this.rangeBar) {
        var xPostion = void 0;
        var yPostion = void 0;
        if (event.type === "mousedown") {
          _a = [event.clientX, event.clientY], xPostion = _a[0], yPostion = _a[1];
        } else if (event.type === "touchstart") {
          _b = [event.changedTouches[0].clientX, event.changedTouches[0].clientY], xPostion = _b[0], yPostion = _b[1];
        }
        if (this.orientation === "Horizontal") {
          this.firstPartRemain = xPostion - this.rangeBar.getBoundingClientRect().left;
          this.secondPartRemain = this.rangeBar.getBoundingClientRect().right - xPostion;
        } else {
          this.firstPartRemain = yPostion - this.rangeBar.getBoundingClientRect().top;
          this.secondPartRemain = this.rangeBar.getBoundingClientRect().bottom - yPostion;
        }
        this.minDiff = this.handleVal2 - this.handleVal1;
        this.tooltipToggle(this.rangeBar);
        var focusedElement = this.element.querySelector("." + classNames.sliderTabHandle);
        if (focusedElement) {
          focusedElement.classList.remove(classNames.sliderTabHandle);
        }
        EventHandler.add(document, "mousemove touchmove", this.dragRangeBarMove, this);
        EventHandler.add(document, "mouseup touchend", this.dragRangeBarUp, this);
      }
    };
    Slider2.prototype.elementClick = function(event) {
      if (this.isDragComplete) {
        this.isDragComplete = false;
        return;
      }
      event.preventDefault();
      this.focusSliderElement();
      this.sliderBarClick(event);
      this.focusHandle();
    };
    Slider2.prototype.wireEvents = function() {
      this.onresize = this.reposition.bind(this);
      window.addEventListener("resize", this.onresize);
      if (this.enabled && !this.readonly) {
        EventHandler.add(this.element, "click", this.elementClick, this);
        if (this.type === "Range" && this.drag) {
          EventHandler.add(this.rangeBar, "mousedown touchstart", this.rangeBarMousedown, this);
        }
        EventHandler.add(this.sliderContainer, "keydown", this.keyDown, this);
        EventHandler.add(this.sliderContainer, "keyup", this.keyUp, this);
        EventHandler.add(this.element, "focusout", this.sliderFocusOut, this);
        EventHandler.add(this.sliderContainer, "mouseover mouseout touchstart touchend", this.hover, this);
        this.wireFirstHandleEvt(false);
        if (this.type === "Range") {
          this.wireSecondHandleEvt(false);
        }
        if (this.showButtons) {
          this.wireButtonEvt(false);
        }
        this.wireMaterialTooltipEvent(false);
        if (this.isForm) {
          EventHandler.add(this.formElement, "reset", this.formResetHandler, this);
        }
      }
    };
    Slider2.prototype.unwireEvents = function() {
      EventHandler.remove(this.element, "click", this.elementClick);
      if (this.type === "Range" && this.drag) {
        EventHandler.remove(this.rangeBar, "mousedown touchstart", this.rangeBarMousedown);
      }
      EventHandler.remove(this.sliderContainer, "keydown", this.keyDown);
      EventHandler.remove(this.sliderContainer, "keyup", this.keyUp);
      EventHandler.remove(this.element, "focusout", this.sliderFocusOut);
      EventHandler.remove(this.sliderContainer, "mouseover mouseout touchstart touchend", this.hover);
      this.wireFirstHandleEvt(true);
      if (this.type === "Range") {
        this.wireSecondHandleEvt(true);
      }
      if (this.showButtons) {
        this.wireButtonEvt(true);
      }
      this.wireMaterialTooltipEvent(true);
      EventHandler.remove(this.element, "reset", this.formResetHandler);
    };
    Slider2.prototype.formResetHandler = function() {
      this.setProperties({ "value": this.formResetValue }, true);
      this.setValue();
    };
    Slider2.prototype.keyUp = function(event) {
      if (event.keyCode === 9 && event.target.classList.contains(classNames.sliderHandle)) {
        this.focusSliderElement();
        if (!event.target.classList.contains(classNames.sliderTabHandle)) {
          if (this.element.querySelector("." + classNames.sliderTabHandle)) {
            this.element.querySelector("." + classNames.sliderTabHandle).classList.remove(classNames.sliderTabHandle);
          }
          event.target.classList.add(classNames.sliderTabHandle);
          var parentElement = event.target.parentElement;
          if (parentElement === this.element) {
            parentElement.querySelector("." + classNames.sliderTrack).classList.add(classNames.sliderTabTrack);
            if (this.type === "Range" || this.type === "MinRange") {
              parentElement.querySelector("." + classNames.rangeBar).classList.add(classNames.sliderTabRange);
            }
          }
          if (this.type === "Range") {
            event.target.previousSibling.classList.contains(classNames.sliderHandle) ? this.activeHandle = 2 : this.activeHandle = 1;
          }
          this.getHandle().focus();
          this.tooltipToggle(this.getHandle());
        }
      }
      this.closeTooltip();
      this.changeEvent("changed", event);
    };
    Slider2.prototype.hover = function(event) {
      if (!isNullOrUndefined(event)) {
        if (event.type === "mouseover" || event.type === "touchmove" || event.type === "mousemove" || event.type === "pointermove" || event.type === "touchstart") {
          this.sliderContainer.classList.add(classNames.sliderHover);
        } else {
          this.sliderContainer.classList.remove(classNames.sliderHover);
          var curTarget = event.currentTarget;
          if (this.tooltip.isVisible && this.tooltip.showOn !== "Always" && this.tooltipObj && this.isMaterialTooltip && !curTarget.classList.contains(classNames.sliderHandleFocused) && !curTarget.classList.contains(classNames.sliderTabHandle)) {
            this.closeMaterialTooltip();
          }
        }
      }
    };
    Slider2.prototype.sliderFocusOut = function(event) {
      if (event.relatedTarget !== this.secondHandle && event.relatedTarget !== this.firstHandle && event.relatedTarget !== this.element && event.relatedTarget !== this.firstBtn && event.relatedTarget !== this.secondBtn) {
        this.closeMaterialTooltip();
        this.closeTooltip();
        if (this.element.querySelector("." + classNames.sliderTabHandle)) {
          this.element.querySelector("." + classNames.sliderTabHandle).classList.remove(classNames.sliderTabHandle);
        }
        if (this.element.querySelector("." + classNames.sliderTabTrack)) {
          this.element.querySelector("." + classNames.sliderTabTrack).classList.remove(classNames.sliderTabTrack);
          if ((this.type === "Range" || this.type === "MinRange") && this.element.querySelector("." + classNames.sliderTabRange)) {
            this.element.querySelector("." + classNames.sliderTabRange).classList.remove(classNames.sliderTabRange);
          }
        }
        this.hiddenInput.focus();
        this.hiddenInput.blur();
        this.isElementFocused = false;
      }
    };
    Slider2.prototype.removeElement = function(element2) {
      if (element2.parentNode) {
        element2.parentNode.removeChild(element2);
      }
    };
    Slider2.prototype.changeSliderType = function(type, args) {
      if (this.isMaterialTooltip && this.materialHandle) {
        this.sliderContainer.classList.remove(classNames.materialSlider);
        this.removeElement(this.materialHandle);
        this.materialHandle = void 0;
      }
      this.removeElement(this.firstHandle);
      this.firstHandle = void 0;
      if (type !== "Default") {
        if (type === "Range") {
          this.removeElement(this.secondHandle);
          this.secondHandle = void 0;
        }
        this.removeElement(this.rangeBar);
        this.rangeBar = void 0;
      }
      if (this.tooltip.isVisible && !isNullOrUndefined(this.tooltipObj)) {
        this.tooltipObj.destroy();
        this.tooltipElement = void 0;
        this.tooltipCollidedPosition = void 0;
      }
      if (this.limits.enabled) {
        if (type === "MinRange" || type === "Default") {
          if (!isNullOrUndefined(this.limitBarFirst)) {
            this.removeElement(this.limitBarFirst);
            this.limitBarFirst = void 0;
          }
        } else {
          if (!isNullOrUndefined(this.limitBarSecond)) {
            this.removeElement(this.limitBarSecond);
            this.limitBarSecond = void 0;
          }
        }
      }
      this.activeHandle = 1;
      this.getThemeInitialization();
      if (this.type === "Range") {
        this.rangeValueUpdate();
      }
      this.createRangeBar();
      if (this.limits.enabled) {
        this.createLimitBar();
      }
      this.setHandler();
      this.setOrientClass();
      this.wireFirstHandleEvt(false);
      if (this.type === "Range") {
        this.wireSecondHandleEvt(false);
      }
      this.setValue();
      if (this.tooltip.isVisible) {
        this.renderTooltip();
        this.wireMaterialTooltipEvent(false);
      }
      this.setBarColor();
      if (args !== "tooltip") {
        this.updateConfig();
      }
    };
    Slider2.prototype.changeRtl = function() {
      if (!this.enableRtl && this.type === "Range") {
        this.value = [this.handleVal2, this.handleVal1];
      }
      this.updateConfig();
      if (this.tooltip.isVisible) {
        this.tooltipObj.refresh(this.firstHandle);
      }
      if (this.showButtons) {
        var enabledRTL = this.enableRtl && this.orientation !== "Vertical";
        attributes(enabledRTL ? this.secondBtn : this.firstBtn, { "aria-label": "Decrease", title: "Decrease" });
        attributes(enabledRTL ? this.firstBtn : this.secondBtn, { "aria-label": "Increase", title: "Increase" });
      }
    };
    Slider2.prototype.changeOrientation = function() {
      this.changeSliderType(this.type, "null");
    };
    Slider2.prototype.updateConfig = function() {
      this.setEnableRTL();
      this.setValue();
      if (this.tooltip.isVisible) {
        this.refreshTooltip(this.tooltipTarget);
      }
      if (this.ticks.placement !== "None") {
        if (this.ul) {
          this.removeElement(this.ul);
          this.ul = void 0;
          this.renderScale();
        }
      }
      this.limitsPropertyChange();
    };
    Slider2.prototype.limitsPropertyChange = function() {
      if (this.limits.enabled) {
        if (isNullOrUndefined(this.limitBarFirst) && this.type !== "Range") {
          this.createLimitBar();
        }
        if (isNullOrUndefined(this.limitBarFirst) && isNullOrUndefined(this.limitBarSecond) && this.type === "Range") {
          this.createLimitBar();
        }
        this.setLimitBar();
        this.setValue();
      } else {
        if (!isNullOrUndefined(this.limitBarFirst)) {
          detach(this.limitBarFirst);
        }
        if (!isNullOrUndefined(this.limitBarSecond)) {
          detach(this.limitBarSecond);
        }
      }
    };
    Slider2.prototype.getPersistData = function() {
      var keyEntity = ["value"];
      return this.addOnPersist(keyEntity);
    };
    Slider2.prototype.destroy = function() {
      _super.prototype.destroy.call(this);
      this.unwireEvents();
      window.removeEventListener("resize", this.onresize);
      removeClass([this.sliderContainer], [classNames.sliderDisabled]);
      this.firstHandle.removeAttribute("aria-orientation");
      if (this.type === "Range") {
        this.secondHandle.removeAttribute("aria-orientation");
      }
      this.sliderContainer.parentNode.insertBefore(this.element, this.sliderContainer);
      detach(this.sliderContainer);
      if (this.tooltip.isVisible) {
        this.tooltipObj.destroy();
      }
      this.element.innerHTML = "";
      this.hiddenInput = null;
      this.sliderContainer = null;
      this.sliderTrack = null;
      this.rangeBar = null;
      this.firstHandle = null;
      this.secondHandle = null;
      this.tickElementCollection = null;
      this.ul = null;
      this.firstBtn = null;
      this.secondBtn = null;
      this.materialHandle = null;
      this.tooltipObj = null;
      this.tooltipTarget = null;
      this.limitBarFirst = null;
      this.limitBarSecond = null;
      this.firstChild = null;
      this.lastChild = null;
      this.tooltipElement = null;
    };
    Slider2.prototype.onPropertyChanged = function(newProp, oldProp) {
      var _this = this;
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "cssClass":
            this.setCSSClass(oldProp.cssClass);
            break;
          case "value":
            if (newProp && oldProp) {
              var value = isNullOrUndefined(newProp.value) ? this.type === "Range" ? [this.min, this.max] : this.min : newProp.value;
              this.setProperties({ "value": value }, true);
              if (!isNullOrUndefined(oldProp.value) && oldProp.value.toString() !== value.toString()) {
                this.setValue();
                this.refreshTooltip(this.tooltipTarget);
                if (this.type === "Range") {
                  if (isNullOrUndefined(newProp.value) || oldProp.value[1] === value[1]) {
                    this.activeHandle = 1;
                  } else {
                    this.activeHandle = 2;
                  }
                }
              }
            }
            break;
          case "min":
          case "step":
          case "max":
            this.setMinMaxValue();
            break;
          case "tooltip":
            if (!isNullOrUndefined(newProp.tooltip) && !isNullOrUndefined(oldProp.tooltip)) {
              this.setTooltip(prop);
              if (!this.showButtons) {
                this.wireEvents();
              }
            }
            break;
          case "type":
            if (!isNullOrUndefined(oldProp) && Object.keys(oldProp).length && !isNullOrUndefined(oldProp.type)) {
              this.changeSliderType(oldProp.type, prop);
              this.setZindex();
            }
            break;
          case "enableRtl":
            if (oldProp.enableRtl !== newProp.enableRtl && this.orientation !== "Vertical") {
              this.rtl = oldProp.enableRtl;
              this.changeRtl();
            }
            break;
          case "limits":
            this.limitsPropertyChange();
            break;
          case "orientation":
            this.changeOrientation();
            break;
          case "ticks":
            if (!isNullOrUndefined(this.sliderContainer.querySelector("." + classNames.scale))) {
              detach(this.ul);
              Array.prototype.forEach.call(this.sliderContainer.classList, function(className) {
                if (className.match(/e-scale-/)) {
                  _this.sliderContainer.classList.remove(className);
                }
              });
            }
            if (this.ticks.placement !== "None") {
              this.renderScale();
              this.setZindex();
            }
            break;
          case "locale":
            if (this.showButtons) {
              this.buttonTitle();
            }
            break;
          case "showButtons":
            if (newProp.showButtons) {
              this.setButtons();
              this.reposition();
              if (this.enabled && !this.readonly) {
                this.wireButtonEvt(false);
              }
            } else {
              if (this.firstBtn && this.secondBtn) {
                this.sliderContainer.removeChild(this.firstBtn);
                this.sliderContainer.removeChild(this.secondBtn);
                this.sliderContainer.classList.remove(classNames.sliderButtonClass);
                this.firstBtn = void 0;
                this.secondBtn = void 0;
                this.reposition();
              }
            }
            break;
          case "enabled":
            this.setEnabled();
            break;
          case "readonly":
            this.setReadOnly();
            break;
          case "customValues":
            this.setValue();
            this.reposition();
            break;
          case "colorRange":
            this.reposition();
            break;
          case "width":
            this.setElementWidth(newProp.width);
            this.setMinMaxValue();
            if (this.limits) {
              this.limitsPropertyChange();
            }
            break;
        }
      }
    };
    Slider2.prototype.setReadOnly = function() {
      if (this.readonly) {
        this.unwireEvents();
        this.sliderContainer.classList.add(classNames.readonly);
      } else {
        this.wireEvents();
        this.sliderContainer.classList.remove(classNames.readonly);
      }
    };
    Slider2.prototype.setMinMaxValue = function() {
      var _this = this;
      this.setValue();
      this.refreshTooltip(this.tooltipTarget);
      if (!isNullOrUndefined(this.sliderContainer.querySelector("." + classNames.scale))) {
        if (this.ul) {
          detach(this.ul);
          Array.prototype.forEach.call(this.sliderContainer.classList, function(className) {
            if (className.match(/e-scale-/)) {
              _this.sliderContainer.classList.remove(className);
            }
          });
        }
      }
      if (this.ticks.placement !== "None") {
        this.renderScale();
        this.setZindex();
      }
    };
    Slider2.prototype.setZindex = function() {
      this.zIndex = 6;
      if (!isNullOrUndefined(this.ticks) && this.ticks.placement !== "None" && !isNullOrUndefined(this.ul) && !isNullOrUndefined(this.element)) {
        this.ul.style.zIndex = this.zIndex + -7 + "";
        this.element.style.zIndex = this.zIndex + 2 + "";
      }
      if (!this.isMaterial && !this.isMaterial3 && !isNullOrUndefined(this.ticks) && this.ticks.placement === "Both") {
        this.element.style.zIndex = this.zIndex + 2 + "";
      }
      if (!isNullOrUndefined(this.firstHandle))
        this.firstHandle.style.zIndex = this.zIndex + 3 + "";
      if (this.type === "Range" && !isNullOrUndefined(this.secondHandle)) {
        this.secondHandle.style.zIndex = this.zIndex + 4 + "";
      }
    };
    Slider2.prototype.setTooltip = function(args) {
      this.changeSliderType(this.type, args);
    };
    Slider2.prototype.setBarColor = function() {
      var trackPosition;
      var trackClassName;
      var child = this.sliderTrack.lastElementChild;
      while (child) {
        this.sliderTrack.removeChild(child);
        child = this.sliderTrack.lastElementChild;
      }
      for (var i = 0; i < this.colorRange.length; i++) {
        if (!isNullOrUndefined(this.colorRange[i].start) && !isNullOrUndefined(this.colorRange[i].end)) {
          if (this.colorRange[i].end > this.colorRange[i].start) {
            if (this.colorRange[i].start < this.min) {
              this.colorRange[i].start = this.min;
            }
            if (this.colorRange[i].end > this.max) {
              this.colorRange[i].end = this.max;
            }
            var startingPosition = this.checkHandlePosition(this.colorRange[i].start);
            var endPosition = this.checkHandlePosition(this.colorRange[i].end);
            var trackContainer = this.createElement("div");
            trackContainer.style.backgroundColor = this.colorRange[i].color;
            trackContainer.style.border = "1px solid " + this.colorRange[i].color;
            if (this.orientation === "Horizontal") {
              trackClassName = classNames.sliderHorizantalColor;
              if (this.enableRtl) {
                if (isNullOrUndefined(this.customValues)) {
                  trackPosition = this.checkHandlePosition(this.max) - this.checkHandlePosition(this.colorRange[i].end);
                } else {
                  trackPosition = this.checkHandlePosition(this.customValues.length - this.colorRange[i].end - 1);
                }
              } else {
                trackPosition = this.checkHandlePosition(this.colorRange[i].start);
              }
              trackContainer.style.width = endPosition - startingPosition + "px";
              trackContainer.style.left = trackPosition + "px";
            } else {
              trackClassName = classNames.sliderVerticalColor;
              trackPosition = this.checkHandlePosition(this.colorRange[i].start);
              trackContainer.style.height = endPosition - startingPosition + "px";
              trackContainer.style.bottom = trackPosition + "px";
            }
            trackContainer.classList.add(trackClassName);
            this.sliderTrack.appendChild(trackContainer);
          }
        }
      }
    };
    Slider2.prototype.getModuleName = function() {
      return "slider";
    };
    __decorate6([
      Property(null)
    ], Slider2.prototype, "value", void 0);
    __decorate6([
      Property(null)
    ], Slider2.prototype, "customValues", void 0);
    __decorate6([
      Property(1)
    ], Slider2.prototype, "step", void 0);
    __decorate6([
      Property(null)
    ], Slider2.prototype, "width", void 0);
    __decorate6([
      Property(0)
    ], Slider2.prototype, "min", void 0);
    __decorate6([
      Property(100)
    ], Slider2.prototype, "max", void 0);
    __decorate6([
      Property(false)
    ], Slider2.prototype, "readonly", void 0);
    __decorate6([
      Property("Default")
    ], Slider2.prototype, "type", void 0);
    __decorate6([
      Collection([{}], ColorRangeData)
    ], Slider2.prototype, "colorRange", void 0);
    __decorate6([
      Complex({}, TicksData)
    ], Slider2.prototype, "ticks", void 0);
    __decorate6([
      Complex({}, LimitData)
    ], Slider2.prototype, "limits", void 0);
    __decorate6([
      Property(true)
    ], Slider2.prototype, "enabled", void 0);
    __decorate6([
      Complex({}, TooltipData)
    ], Slider2.prototype, "tooltip", void 0);
    __decorate6([
      Property(false)
    ], Slider2.prototype, "showButtons", void 0);
    __decorate6([
      Property(true)
    ], Slider2.prototype, "enableAnimation", void 0);
    __decorate6([
      Property("Horizontal")
    ], Slider2.prototype, "orientation", void 0);
    __decorate6([
      Property("")
    ], Slider2.prototype, "cssClass", void 0);
    __decorate6([
      Property(false)
    ], Slider2.prototype, "enableHtmlSanitizer", void 0);
    __decorate6([
      Event()
    ], Slider2.prototype, "created", void 0);
    __decorate6([
      Event()
    ], Slider2.prototype, "change", void 0);
    __decorate6([
      Event()
    ], Slider2.prototype, "changed", void 0);
    __decorate6([
      Event()
    ], Slider2.prototype, "renderingTicks", void 0);
    __decorate6([
      Event()
    ], Slider2.prototype, "renderedTicks", void 0);
    __decorate6([
      Event()
    ], Slider2.prototype, "tooltipChange", void 0);
    Slider2 = __decorate6([
      NotifyPropertyChanges
    ], Slider2);
    return Slider2;
  }(Component)
);

// node_modules/@syncfusion/ej2-inputs/src/form-validator/form-validator.js
var __extends7 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate7 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var regex = {
  /* eslint-disable no-useless-escape */
  EMAIL: new RegExp("^[A-Za-z0-9._%+-]{1,}@[A-Za-z0-9._%+-]{1,}([.]{1}[a-zA-Z0-9]{2,}|[.]{1}[a-zA-Z0-9]{2,4}[.]{1}[a-zA-Z0-9]{2,4})$"),
  /* eslint-disable-next-line security/detect-unsafe-regex */
  URL: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/m,
  DATE_ISO: new RegExp("^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$"),
  DIGITS: new RegExp("^[0-9]*$"),
  PHONE: new RegExp("^[+]?[0-9]{9,13}$"),
  CREDITCARD: new RegExp("^\\d{13,16}$")
  /* eslint-enable no-useless-escape */
};
var ErrorOption;
(function(ErrorOption2) {
  ErrorOption2[ErrorOption2["Message"] = 0] = "Message";
  ErrorOption2[ErrorOption2["Label"] = 1] = "Label";
})(ErrorOption || (ErrorOption = {}));
var FormValidator = (
  /** @class */
  function(_super) {
    __extends7(FormValidator2, _super);
    function FormValidator2(element2, options) {
      var _this = _super.call(this, options, element2) || this;
      _this.validated = [];
      _this.errorRules = [];
      _this.allowSubmit = false;
      _this.required = "required";
      _this.infoElement = null;
      _this.inputElement = null;
      _this.selectQuery = "input:not([type=reset]):not([type=button]), select, textarea";
      _this.localyMessage = {};
      _this.defaultMessages = {
        required: "This field is required.",
        email: "Please enter a valid email address.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateIso: "Please enter a valid date ( ISO ).",
        creditcard: "Please enter valid card number",
        number: "Please enter a valid number.",
        digits: "Please enter only digits.",
        maxLength: "Please enter no more than {0} characters.",
        minLength: "Please enter at least {0} characters.",
        rangeLength: "Please enter a value between {0} and {1} characters long.",
        range: "Please enter a value between {0} and {1}.",
        max: "Please enter a value less than or equal to {0}.",
        min: "Please enter a value greater than or equal to {0}.",
        regex: "Please enter a correct value.",
        tel: "Please enter a valid phone number.",
        pattern: "Please enter a correct pattern value.",
        equalTo: "Please enter the valid match text"
      };
      if (typeof _this.rules === "undefined") {
        _this.rules = {};
      }
      _this.l10n = new L10n("formValidator", _this.defaultMessages, _this.locale);
      if (_this.locale) {
        _this.localeFunc();
      }
      onIntlChange.on("notifyExternalChange", _this.afterLocalization, _this);
      element2 = typeof element2 === "string" ? select(element2, document) : element2;
      if (_this.element != null) {
        _this.element.setAttribute("novalidate", "");
        _this.inputElements = selectAll(_this.selectQuery, _this.element);
        _this.createHTML5Rules();
        _this.wireEvents();
      } else {
        return void 0;
      }
      return _this;
    }
    FormValidator_1 = FormValidator2;
    FormValidator2.prototype.addRules = function(name, rules) {
      if (name) {
        if (this.rules.hasOwnProperty(name)) {
          extend(this.rules["" + name], rules, {});
        } else {
          this.rules["" + name] = rules;
        }
      }
    };
    FormValidator2.prototype.removeRules = function(name, rules) {
      if (!name && !rules) {
        this.rules = {};
      } else if (this.rules["" + name] && !rules) {
        delete this.rules["" + name];
      } else if (!isNullOrUndefined(this.rules["" + name] && rules)) {
        for (var i = 0; i < rules.length; i++) {
          delete this.rules["" + name][rules[parseInt(i.toString())]];
        }
      } else {
        return;
      }
    };
    FormValidator2.prototype.validate = function(selected) {
      var rules = Object.keys(this.rules);
      if (selected && rules.length) {
        this.validateRules(selected);
        return rules.indexOf(selected) !== -1 && this.errorRules.filter(function(data) {
          return data.name === selected;
        }).length === 0;
      } else {
        this.errorRules = [];
        for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
          var name_1 = rules_1[_i];
          this.validateRules(name_1);
        }
        return this.errorRules.length === 0;
      }
    };
    FormValidator2.prototype.reset = function() {
      this.element.reset();
      this.clearForm();
    };
    FormValidator2.prototype.getInputElement = function(name) {
      this.inputElement = select('[name="' + name + '"]', this.element);
      return this.inputElement;
    };
    FormValidator2.prototype.destroy = function() {
      this.reset();
      this.unwireEvents();
      this.rules = {};
      var elements = selectAll("." + this.errorClass + ", ." + this.validClass, this.element);
      for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
        var element2 = elements_1[_i];
        detach(element2);
      }
      _super.prototype.destroy.call(this);
      this.infoElement = null;
      onIntlChange.off("notifyExternalChange", this.afterLocalization);
    };
    FormValidator2.prototype.onPropertyChanged = function(newProp, oldProp) {
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "locale":
            this.localeFunc();
            break;
        }
      }
    };
    FormValidator2.prototype.localeFunc = function() {
      for (var _i = 0, _a = Object.keys(this.defaultMessages); _i < _a.length; _i++) {
        var key = _a[_i];
        this.l10n.setLocale(this.locale);
        var value = this.l10n.getConstant(key);
        this.localyMessage["" + key] = value;
      }
    };
    FormValidator2.prototype.getModuleName = function() {
      return "formvalidator";
    };
    FormValidator2.prototype.afterLocalization = function(args) {
      this.locale = args.locale;
      this.localeFunc();
    };
    FormValidator2.prototype.refresh = function() {
      this.unwireEvents();
      this.inputElements = selectAll(this.selectQuery, this.element);
      this.wireEvents();
    };
    FormValidator2.prototype.clearForm = function() {
      this.errorRules = [];
      this.validated = [];
      var elements = selectAll(this.selectQuery, this.element);
      for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
        var element2 = elements_2[_i];
        var input = element2;
        input.removeAttribute("aria-invalid");
        var inputParent = input.parentElement;
        var grandParent = inputParent.parentElement;
        if (inputParent.classList.contains("e-control-wrapper") || inputParent.classList.contains("e-wrapper") || input.classList.contains("e-input") && inputParent.classList.contains("e-input-group")) {
          inputParent.classList.remove(this.errorClass);
        } else if (grandParent != null && (grandParent.classList.contains("e-control-wrapper") || grandParent.classList.contains("e-wrapper"))) {
          grandParent.classList.remove(this.errorClass);
        } else {
          input.classList.remove(this.errorClass);
        }
        if (input.name.length > 0) {
          this.getInputElement(input.name);
          this.getErrorElement(input.name);
          this.hideMessage(input.name);
        }
        if (inputParent.classList.contains("e-control-wrapper") || inputParent.classList.contains("e-wrapper") || input.classList.contains("e-input") && inputParent.classList.contains("e-input-group")) {
          inputParent.classList.remove(this.validClass);
        } else if (grandParent != null && (grandParent.classList.contains("e-control-wrapper") || grandParent.classList.contains("e-wrapper"))) {
          grandParent.classList.remove(this.validClass);
        } else {
          input.classList.remove(this.validClass);
        }
      }
    };
    FormValidator2.prototype.createHTML5Rules = function() {
      var defRules = [
        "required",
        "validateHidden",
        "regex",
        "rangeLength",
        "maxLength",
        "minLength",
        "dateIso",
        "digits",
        "pattern",
        "data-val-required",
        "type",
        "data-validation",
        "min",
        "max",
        "range",
        "equalTo",
        "data-val-minlength-min",
        "data-val-equalto-other",
        "data-val-maxlength-max",
        "data-val-range-min",
        "data-val-regex-pattern",
        "data-val-length-max",
        "data-val-creditcard",
        "data-val-phone"
      ];
      var acceptedTypes = ["hidden", "email", "url", "date", "number", "tel"];
      for (var _i = 0, _a = this.inputElements; _i < _a.length; _i++) {
        var input = _a[_i];
        var allRule = {};
        for (var _b = 0, defRules_1 = defRules; _b < defRules_1.length; _b++) {
          var rule = defRules_1[_b];
          if (input.getAttribute(rule) !== null) {
            switch (rule) {
              case "required":
                this.defRule(input, allRule, rule, input.required);
                break;
              case "data-validation":
                rule = input.getAttribute(rule);
                this.defRule(input, allRule, rule, true);
                break;
              case "type":
                if (acceptedTypes.indexOf(input.type) !== -1) {
                  this.defRule(input, allRule, input.type, true);
                }
                break;
              case "rangeLength":
              case "range":
                this.defRule(input, allRule, rule, JSON.parse(input.getAttribute(rule)));
                break;
              case "equalTo":
                {
                  var id = input.getAttribute(rule);
                  this.defRule(input, allRule, rule, id);
                }
                break;
              default:
                if (input.getAttribute("data-val") === "true") {
                  this.annotationRule(input, allRule, rule, input.getAttribute(rule));
                } else {
                  this.defRule(input, allRule, rule, input.getAttribute(rule));
                }
            }
          }
        }
        if (Object.keys(allRule).length !== 0) {
          this.addRules(input.name, allRule);
        }
      }
    };
    FormValidator2.prototype.annotationRule = function(input, ruleCon, ruleName, value) {
      var annotationRule = ruleName.split("-");
      var rulesList = ["required", "creditcard", "phone", "maxlength", "minlength", "range", "regex", "equalto"];
      var ruleFirstName = annotationRule[annotationRule.length - 1];
      var ruleSecondName = annotationRule[annotationRule.length - 2];
      if (rulesList.indexOf(ruleFirstName) !== -1) {
        switch (ruleFirstName) {
          case "required":
            this.defRule(input, ruleCon, "required", value);
            break;
          case "creditcard":
            this.defRule(input, ruleCon, "creditcard", value);
            break;
          case "phone":
            this.defRule(input, ruleCon, "tel", value);
            break;
        }
      } else if (rulesList.indexOf(ruleSecondName) !== -1) {
        switch (ruleSecondName) {
          case "maxlength":
            this.defRule(input, ruleCon, "maxLength", value);
            break;
          case "minlength":
            this.defRule(input, ruleCon, "minLength", value);
            break;
          case "range":
            {
              var minvalue = input.getAttribute("data-val-range-min");
              var maxvalue = input.getAttribute("data-val-range-max");
              this.defRule(input, ruleCon, "range", [minvalue, maxvalue]);
            }
            break;
          case "equalto":
            {
              var id = input.getAttribute(ruleName).split(".");
              this.defRule(input, ruleCon, "equalTo", id[id.length - 1]);
            }
            break;
          case "regex":
            this.defRule(input, ruleCon, "regex", value);
            break;
        }
      }
    };
    FormValidator2.prototype.defRule = function(input, ruleCon, ruleName, value) {
      var message = input.getAttribute("data-" + ruleName + "-message");
      var annotationMessage = input.getAttribute("data-val-" + ruleName);
      var customMessage;
      if (this.rules[input.name] && ruleName !== "validateHidden" && ruleName !== "hidden") {
        this.getInputElement(input.name);
        customMessage = this.getErrorMessage(this.rules[input.name]["" + ruleName], ruleName);
      }
      if (message) {
        value = [value, message];
      } else if (annotationMessage) {
        value = [value, annotationMessage];
      } else if (customMessage) {
        value = [value, customMessage];
      }
      ruleCon["" + ruleName] = value;
    };
    FormValidator2.prototype.wireEvents = function() {
      for (var _i = 0, _a = this.inputElements; _i < _a.length; _i++) {
        var input = _a[_i];
        if (FormValidator_1.isCheckable(input)) {
          EventHandler.add(input, "click", this.clickHandler, this);
        } else if (input.tagName === "SELECT") {
          EventHandler.add(input, "change", this.changeHandler, this);
        } else {
          EventHandler.add(input, "focusout", this.focusOutHandler, this);
          EventHandler.add(input, "keyup", this.keyUpHandler, this);
        }
      }
      EventHandler.add(this.element, "submit", this.submitHandler, this);
      EventHandler.add(this.element, "reset", this.resetHandler, this);
    };
    FormValidator2.prototype.unwireEvents = function() {
      for (var _i = 0, _a = this.inputElements; _i < _a.length; _i++) {
        var input = _a[_i];
        EventHandler.clearEvents(input);
      }
      EventHandler.remove(this.element, "submit", this.submitHandler);
      EventHandler.remove(this.element, "reset", this.resetHandler);
    };
    FormValidator2.prototype.focusOutHandler = function(e) {
      this.trigger("focusout", e);
      var element2 = e.target;
      if (this.rules[element2.name]) {
        if (this.rules[element2.name][this.required] || element2.value.length > 0) {
          this.validate(element2.name);
        } else if (this.validated.indexOf(element2.name) === -1) {
          this.validated.push(element2.name);
        }
      }
    };
    FormValidator2.prototype.keyUpHandler = function(e) {
      this.trigger("keyup", e);
      var element2 = e.target;
      var excludeKeys = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
      if (e.which === 9 && (!this.rules[element2.name] || this.rules[element2.name] && !this.rules[element2.name][this.required])) {
        return;
      }
      if (this.validated.indexOf(element2.name) !== -1 && this.rules[element2.name] && excludeKeys.indexOf(e.which) === -1) {
        this.validate(element2.name);
      }
    };
    FormValidator2.prototype.clickHandler = function(e) {
      this.trigger("click", e);
      var element2 = e.target;
      if (element2.type !== "submit") {
        this.validate(element2.name);
      } else if (element2.getAttribute("formnovalidate") !== null) {
        this.allowSubmit = true;
      }
    };
    FormValidator2.prototype.changeHandler = function(e) {
      this.trigger("change", e);
      var element2 = e.target;
      this.validate(element2.name);
    };
    FormValidator2.prototype.submitHandler = function(e) {
      this.trigger("submit", e);
      if (!this.allowSubmit && !this.validate()) {
        e.preventDefault();
      } else {
        this.allowSubmit = false;
      }
    };
    FormValidator2.prototype.resetHandler = function() {
      this.clearForm();
    };
    FormValidator2.prototype.validateRules = function(name) {
      if (!this.rules["" + name]) {
        return;
      }
      var rules = Object.keys(this.rules["" + name]);
      var hiddenType = false;
      var validateHiddenType = false;
      var vhPos = rules.indexOf("validateHidden");
      var hPos = rules.indexOf("hidden");
      this.getInputElement(name);
      if (hPos !== -1) {
        hiddenType = true;
      }
      if (vhPos !== -1) {
        validateHiddenType = true;
      }
      if (!hiddenType || hiddenType && validateHiddenType) {
        if (vhPos !== -1) {
          rules.splice(vhPos, 1);
        }
        if (hPos !== -1) {
          rules.splice(hPos - 1, 1);
        }
        this.getErrorElement(name);
        for (var _i = 0, rules_2 = rules; _i < rules_2.length; _i++) {
          var rule = rules_2[_i];
          var errorMessage = this.getErrorMessage(this.rules["" + name]["" + rule], rule);
          var errorRule = { name, message: errorMessage };
          var eventArgs = {
            inputName: name,
            element: this.inputElement,
            message: errorMessage
          };
          if (!this.isValid(name, rule) && !this.inputElement.classList.contains(this.ignore)) {
            this.removeErrorRules(name);
            this.errorRules.push(errorRule);
            this.inputElement.setAttribute("aria-invalid", "true");
            this.inputElement.setAttribute("aria-describedby", this.inputElement.id + "-info");
            var inputParent = this.inputElement.parentElement;
            var grandParent = inputParent.parentElement;
            if (inputParent.classList.contains("e-control-wrapper") || inputParent.classList.contains("e-wrapper") || this.inputElement.classList.contains("e-input") && inputParent.classList.contains("e-input-group")) {
              inputParent.classList.add(this.errorClass);
              inputParent.classList.remove(this.validClass);
            } else if (grandParent != null && (grandParent.classList.contains("e-control-wrapper") || grandParent.classList.contains("e-wrapper"))) {
              grandParent.classList.add(this.errorClass);
              grandParent.classList.remove(this.validClass);
            } else {
              this.inputElement.classList.add(this.errorClass);
              this.inputElement.classList.remove(this.validClass);
            }
            if (!this.infoElement) {
              this.createErrorElement(name, errorRule.message, this.inputElement);
            } else {
              this.showMessage(errorRule);
            }
            eventArgs.errorElement = this.infoElement;
            eventArgs.status = "failure";
            if (inputParent.classList.contains("e-control-wrapper") || inputParent.classList.contains("e-wrapper") || this.inputElement.classList.contains("e-input") && inputParent.classList.contains("e-input-group")) {
              inputParent.classList.add(this.errorClass);
              inputParent.classList.remove(this.validClass);
            } else if (grandParent != null && (grandParent.classList.contains("e-control-wrapper") || grandParent.classList.contains("e-wrapper"))) {
              grandParent.classList.add(this.errorClass);
              grandParent.classList.remove(this.validClass);
            } else {
              this.inputElement.classList.add(this.errorClass);
              this.inputElement.classList.remove(this.validClass);
            }
            this.optionalValidationStatus(name, eventArgs);
            this.trigger("validationComplete", eventArgs);
            if (rule === "required") {
              this.inputElement.setAttribute("aria-required", "true");
            }
            break;
          } else {
            this.hideMessage(name);
            eventArgs.status = "success";
            this.trigger("validationComplete", eventArgs);
          }
        }
      } else {
        return;
      }
    };
    FormValidator2.prototype.optionalValidationStatus = function(name, refer) {
      if (!this.rules["" + name][this.required] && !this.inputElement.value.length && !isNullOrUndefined(this.infoElement)) {
        this.infoElement.innerHTML = this.inputElement.value;
        this.infoElement.setAttribute("aria-invalid", "false");
        refer.status = "";
        this.hideMessage(name);
      }
    };
    FormValidator2.prototype.isValid = function(name, rule) {
      var params = this.rules["" + name]["" + rule];
      var param = params instanceof Array && typeof params[1] === "string" ? params[0] : params;
      var currentRule = this.rules["" + name]["" + rule];
      var args = { value: this.inputElement.value, param, element: this.inputElement, formElement: this.element };
      this.trigger("validationBegin", args);
      if (!args.param && rule === "required") {
        return true;
      }
      if (currentRule && typeof currentRule[0] === "function") {
        var fn = currentRule[0];
        return fn.call(this, { element: this.inputElement, value: this.inputElement.value });
      } else if (FormValidator_1.isCheckable(this.inputElement)) {
        if (rule !== "required") {
          return true;
        }
        return selectAll('input[name="' + name + '"]:checked', this.element).length > 0;
      } else {
        return FormValidator_1.checkValidator["" + rule](args);
      }
    };
    FormValidator2.prototype.getErrorMessage = function(ruleValue, rule) {
      var message = this.inputElement.getAttribute("data-" + rule + "-message") ? this.inputElement.getAttribute("data-" + rule + "-message") : ruleValue instanceof Array && typeof ruleValue[1] === "string" ? ruleValue[1] : Object.keys(this.localyMessage).length !== 0 ? this.localyMessage["" + rule] : this.defaultMessages["" + rule];
      var formats = message.match(/{(\d)}/g);
      if (!isNullOrUndefined(formats)) {
        for (var i = 0; i < formats.length; i++) {
          var value = ruleValue instanceof Array ? ruleValue[parseInt(i.toString())] : ruleValue;
          message = message.replace(formats[parseInt(i.toString())], value);
        }
      }
      return message;
    };
    FormValidator2.prototype.createErrorElement = function(name, message, input) {
      var errorElement = createElement(this.errorElement, {
        className: this.errorClass,
        innerHTML: message,
        attrs: { for: name }
      });
      if (this.errorOption === ErrorOption.Message) {
        errorElement.classList.remove(this.errorClass);
        errorElement.classList.add("e-message");
        errorElement = createElement(this.errorContainer, { className: this.errorClass, innerHTML: errorElement.outerHTML });
      }
      errorElement.id = this.inputElement.name + "-info";
      if (this.element.querySelector('[data-valmsg-for="' + input.id + '"]')) {
        this.element.querySelector('[data-valmsg-for="' + input.id + '"]').appendChild(errorElement);
      } else if (input.hasAttribute("data-msg-containerid") === true) {
        var containerId = input.getAttribute("data-msg-containerid");
        var divElement = select("#" + containerId, this.element);
        divElement.appendChild(errorElement);
      } else if (this.customPlacement != null) {
        this.customPlacement.call(this, this.inputElement, errorElement);
      } else {
        var inputParent = this.inputElement.parentElement;
        var grandParent = inputParent.parentElement;
        if (inputParent.classList.contains("e-control-wrapper") || inputParent.classList.contains("e-wrapper")) {
          grandParent.insertBefore(errorElement, inputParent.nextSibling);
        } else if (grandParent.classList.contains("e-control-wrapper") || grandParent.classList.contains("e-wrapper")) {
          grandParent.parentElement.insertBefore(errorElement, grandParent.nextSibling);
        } else {
          inputParent.insertBefore(errorElement, this.inputElement.nextSibling);
        }
      }
      errorElement.style.display = "block";
      this.getErrorElement(name);
      this.validated.push(name);
      this.checkRequired(name);
    };
    FormValidator2.prototype.getErrorElement = function(name) {
      this.infoElement = select(this.errorElement + "." + this.errorClass, this.inputElement.parentElement);
      if (!this.infoElement) {
        this.infoElement = select(this.errorElement + "." + this.errorClass + '[for="' + name + '"]', this.element);
      }
      return this.infoElement;
    };
    FormValidator2.prototype.removeErrorRules = function(name) {
      for (var i = 0; i < this.errorRules.length; i++) {
        var rule = this.errorRules[parseInt(i.toString())];
        if (rule.name === name) {
          this.errorRules.splice(i, 1);
        }
      }
    };
    FormValidator2.prototype.showMessage = function(errorRule) {
      this.infoElement.style.display = "block";
      this.infoElement.innerHTML = errorRule.message;
      this.checkRequired(errorRule.name);
    };
    FormValidator2.prototype.hideMessage = function(name) {
      if (this.infoElement) {
        this.infoElement.style.display = "none";
        this.removeErrorRules(name);
        var inputParent = this.inputElement.parentElement;
        var grandParent = inputParent.parentElement;
        if (inputParent.classList.contains("e-control-wrapper") || inputParent.classList.contains("e-wrapper") || this.inputElement.classList.contains("e-input") && inputParent.classList.contains("e-input-group")) {
          inputParent.classList.add(this.validClass);
          inputParent.classList.remove(this.errorClass);
        } else if (grandParent != null && (grandParent.classList.contains("e-control-wrapper") || grandParent.classList.contains("e-wrapper"))) {
          grandParent.classList.add(this.validClass);
          grandParent.classList.remove(this.errorClass);
        } else {
          this.inputElement.classList.add(this.validClass);
          this.inputElement.classList.remove(this.errorClass);
        }
        this.inputElement.setAttribute("aria-invalid", "false");
      }
    };
    FormValidator2.prototype.checkRequired = function(name) {
      if (!this.rules["" + name][this.required] && !this.inputElement.value.length && !isNullOrUndefined(this.infoElement)) {
        this.infoElement.innerHTML = this.inputElement.value;
        this.infoElement.setAttribute("aria-invalid", "false");
        this.hideMessage(name);
      }
    };
    FormValidator2.isCheckable = function(input) {
      var inputType = input.getAttribute("type");
      return inputType && (inputType === "checkbox" || inputType === "radio" || inputType === "submit");
    };
    var FormValidator_1;
    FormValidator2.checkValidator = {
      required: function(option) {
        return !isNaN(Date.parse(option.value)) ? !isNaN(new Date(option.value).getTime()) : option.value.toString().length > 0;
      },
      email: function(option) {
        return regex.EMAIL.test(option.value);
      },
      url: function(option) {
        return regex.URL.test(option.value);
      },
      dateIso: function(option) {
        return regex.DATE_ISO.test(option.value);
      },
      tel: function(option) {
        return regex.PHONE.test(option.value);
      },
      creditcard: function(option) {
        return regex.CREDITCARD.test(option.value);
      },
      number: function(option) {
        return !isNaN(Number(option.value)) && option.value.indexOf(" ") === -1;
      },
      digits: function(option) {
        return regex.DIGITS.test(option.value);
      },
      maxLength: function(option) {
        return option.value.length <= option.param;
      },
      minLength: function(option) {
        return option.value.length >= option.param;
      },
      rangeLength: function(option) {
        var param = option.param;
        return option.value.length >= param[0] && option.value.length <= param[1];
      },
      range: function(option) {
        var param = option.param;
        return !isNaN(Number(option.value)) && Number(option.value) >= param[0] && Number(option.value) <= param[1];
      },
      date: function(option) {
        if (!isNullOrUndefined(option.param) && (typeof option.param === "string" && option.param !== "")) {
          var globalize = new Internationalization();
          var dateOptions = { format: option.param.toString(), type: "dateTime", skeleton: "yMd" };
          var dateValue = globalize.parseDate(option.value, dateOptions);
          return !isNullOrUndefined(dateValue) && dateValue instanceof Date && !isNaN(+dateValue);
        } else {
          return !isNaN(new Date(option.value).getTime());
        }
      },
      max: function(option) {
        if (!isNaN(Number(option.value))) {
          return +option.value <= option.param;
        }
        return new Date(option.value).getTime() <= new Date(JSON.parse(JSON.stringify(option.param))).getTime();
      },
      min: function(option) {
        if (!isNaN(Number(option.value))) {
          return +option.value >= option.param;
        } else if (option.value.indexOf(",") !== -1) {
          var uNum = option.value.replace(/,/g, "");
          return parseFloat(uNum) >= option.param;
        } else {
          return new Date(option.value).getTime() >= new Date(JSON.parse(JSON.stringify(option.param))).getTime();
        }
      },
      regex: function(option) {
        return new RegExp(option.param).test(option.value);
      },
      equalTo: function(option) {
        var compareTo = option.formElement.querySelector("#" + option.param);
        option.param = compareTo.value;
        return option.param === option.value;
      }
    };
    __decorate7([
      Property("")
    ], FormValidator2.prototype, "locale", void 0);
    __decorate7([
      Property("e-hidden")
    ], FormValidator2.prototype, "ignore", void 0);
    __decorate7([
      Property()
    ], FormValidator2.prototype, "rules", void 0);
    __decorate7([
      Property("e-error")
    ], FormValidator2.prototype, "errorClass", void 0);
    __decorate7([
      Property("e-valid")
    ], FormValidator2.prototype, "validClass", void 0);
    __decorate7([
      Property("label")
    ], FormValidator2.prototype, "errorElement", void 0);
    __decorate7([
      Property("div")
    ], FormValidator2.prototype, "errorContainer", void 0);
    __decorate7([
      Property(ErrorOption.Label)
    ], FormValidator2.prototype, "errorOption", void 0);
    __decorate7([
      Event()
    ], FormValidator2.prototype, "focusout", void 0);
    __decorate7([
      Event()
    ], FormValidator2.prototype, "keyup", void 0);
    __decorate7([
      Event()
    ], FormValidator2.prototype, "click", void 0);
    __decorate7([
      Event()
    ], FormValidator2.prototype, "change", void 0);
    __decorate7([
      Event()
    ], FormValidator2.prototype, "submit", void 0);
    __decorate7([
      Event()
    ], FormValidator2.prototype, "validationBegin", void 0);
    __decorate7([
      Event()
    ], FormValidator2.prototype, "validationComplete", void 0);
    __decorate7([
      Event()
    ], FormValidator2.prototype, "customPlacement", void 0);
    FormValidator2 = FormValidator_1 = __decorate7([
      NotifyPropertyChanges
    ], FormValidator2);
    return FormValidator2;
  }(Base)
);

// node_modules/@syncfusion/ej2-inputs/src/uploader/uploader.js
var __extends8 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate8 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CONTROL_WRAPPER = "e-upload e-control-wrapper";
var INPUT_WRAPPER = "e-file-select";
var DROP_AREA = "e-file-drop";
var DROP_WRAPPER = "e-file-select-wrap";
var LIST_PARENT = "e-upload-files";
var FILE = "e-upload-file-list";
var STATUS = "e-file-status";
var ACTION_BUTTONS = "e-upload-actions";
var UPLOAD_BUTTONS = "e-file-upload-btn e-css e-btn e-flat e-primary";
var CLEAR_BUTTONS = "e-file-clear-btn e-css e-btn e-flat";
var FILE_NAME = "e-file-name";
var FILE_TYPE = "e-file-type";
var FILE_SIZE = "e-file-size";
var REMOVE_ICON = "e-file-remove-btn";
var DELETE_ICON = "e-file-delete-btn";
var SPINNER_PANE = "e-spinner-pane";
var ABORT_ICON = "e-file-abort-btn";
var RETRY_ICON = "e-file-reload-btn";
var DRAG_HOVER = "e-upload-drag-hover";
var PROGRESS_WRAPPER = "e-upload-progress-wrap";
var PROGRESSBAR = "e-upload-progress-bar";
var PROGRESSBAR_TEXT = "e-progress-bar-text";
var UPLOAD_INPROGRESS = "e-upload-progress";
var UPLOAD_SUCCESS = "e-upload-success";
var UPLOAD_FAILED = "e-upload-fails";
var TEXT_CONTAINER = "e-file-container";
var VALIDATION_FAILS = "e-validation-fails";
var RTL3 = "e-rtl";
var DISABLED = "e-disabled";
var RTL_CONTAINER = "e-rtl-container";
var ICON_FOCUSED = "e-clear-icon-focus";
var PROGRESS_INNER_WRAPPER = "e-progress-inner-wrap";
var PAUSE_UPLOAD = "e-file-pause-btn";
var RESUME_UPLOAD = "e-file-play-btn";
var RESTRICT_RETRY = "e-restrict-retry";
var wrapperAttr2 = ["title", "style", "class"];
var FORM_UPLOAD = "e-form-upload";
var HIDDEN_INPUT = "e-hidden-file-input";
var INVALID_FILE = "e-file-invalid";
var INFORMATION = "e-file-information";
var FilesProp = (
  /** @class */
  function(_super) {
    __extends8(FilesProp2, _super);
    function FilesProp2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate8([
      Property("")
    ], FilesProp2.prototype, "name", void 0);
    __decorate8([
      Property(null)
    ], FilesProp2.prototype, "size", void 0);
    __decorate8([
      Property("")
    ], FilesProp2.prototype, "type", void 0);
    return FilesProp2;
  }(ChildProperty)
);
var ButtonsProps = (
  /** @class */
  function(_super) {
    __extends8(ButtonsProps2, _super);
    function ButtonsProps2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate8([
      Property("Browse...")
    ], ButtonsProps2.prototype, "browse", void 0);
    __decorate8([
      Property("Upload")
    ], ButtonsProps2.prototype, "upload", void 0);
    __decorate8([
      Property("Clear")
    ], ButtonsProps2.prototype, "clear", void 0);
    return ButtonsProps2;
  }(ChildProperty)
);
var AsyncSettings = (
  /** @class */
  function(_super) {
    __extends8(AsyncSettings2, _super);
    function AsyncSettings2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate8([
      Property("")
    ], AsyncSettings2.prototype, "saveUrl", void 0);
    __decorate8([
      Property("")
    ], AsyncSettings2.prototype, "removeUrl", void 0);
    __decorate8([
      Property(0)
    ], AsyncSettings2.prototype, "chunkSize", void 0);
    __decorate8([
      Property(3)
    ], AsyncSettings2.prototype, "retryCount", void 0);
    __decorate8([
      Property(500)
    ], AsyncSettings2.prototype, "retryAfterDelay", void 0);
    return AsyncSettings2;
  }(ChildProperty)
);
var Uploader = (
  /** @class */
  function(_super) {
    __extends8(Uploader2, _super);
    function Uploader2(options, element2) {
      var _this = _super.call(this, options, element2) || this;
      _this.initialAttr = { accept: null, multiple: false, disabled: false };
      _this.uploadedFilesData = [];
      _this.base64String = [];
      _this.isForm = false;
      _this.allTypes = false;
      _this.pausedData = [];
      _this.uploadMetaData = [];
      _this.tabIndex = "0";
      _this.btnTabIndex = "0";
      _this.disableKeyboardNavigation = false;
      _this.count = -1;
      _this.actionCompleteCount = 0;
      _this.flag = true;
      _this.selectedFiles = [];
      _this.uploaderName = "UploadFiles";
      _this.fileStreams = [];
      _this.newFileRef = 0;
      _this.isFirstFileOnSelection = false;
      _this.dragCounter = 0;
      _this.isAngular = false;
      _this.fileList = [];
      _this.filesData = [];
      _this.uploaderOptions = options;
      return _this;
    }
    Uploader2.prototype.onPropertyChanged = function(newProp, oldProp) {
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "allowedExtensions":
            this.setExtensions(this.allowedExtensions);
            this.clearAll();
            break;
          case "enabled":
            this.setControlStatus();
            break;
          case "multiple":
            this.setMultipleSelection();
            break;
          case "enableRtl":
            this.setRTL();
            this.reRenderFileList();
            break;
          case "buttons":
            this.buttons.browse = isNullOrUndefined(this.buttons.browse) ? "" : this.buttons.browse;
            this.buttons.clear = isNullOrUndefined(this.buttons.clear) ? "" : this.buttons.clear;
            this.buttons.upload = isNullOrUndefined(this.buttons.upload) ? "" : this.buttons.upload;
            this.renderButtonTemplates();
            break;
          case "dropArea":
            this.unBindDropEvents();
            this.updateDropArea();
            break;
          case "htmlAttributes":
            this.updateHTMLAttrToElement();
            this.updateHTMLAttrToWrapper();
            this.checkHTMLAttributes(true);
            break;
          case "files":
            this.renderPreLoadFiles();
            break;
          case "directoryUpload":
            this.updateDirectoryAttributes();
            break;
          case "template":
            var ejInstance = getValue("ej2_instances", this.element);
            if (ejInstance[0].isReact) {
              this.reRenderFileList();
            } else {
              this.clearAll();
            }
            break;
          case "minFileSize":
          case "maxFileSize":
          case "autoUpload":
            this.clearAll();
            break;
          case "sequentialUpload":
            this.clearAll();
            break;
          case "locale":
            this.l10n.setLocale(this.locale);
            this.setLocalizedTexts();
            this.preLocaleObj = getValue("currentLocale", this.l10n);
            break;
          case "cssClass":
            this.setCSSClass(oldProp.cssClass);
            break;
        }
      }
    };
    Uploader2.prototype.setLocalizedTexts = function() {
      if (isNullOrUndefined(this.template)) {
        if (typeof this.buttons.browse === "string") {
          this.browseButton.innerText = this.buttons.browse === "Browse..." ? this.localizedTexts("Browse") : this.buttons.browse;
          this.browseButton.setAttribute("title", this.browseButton.innerText);
          if (this.uploadWrapper && !isNullOrUndefined(this.uploadWrapper.querySelector("." + DROP_AREA))) {
            this.uploadWrapper.querySelector("." + DROP_AREA).innerHTML = this.localizedTexts("dropFilesHint");
          }
        }
        this.updateFileList();
      }
    };
    Uploader2.prototype.getKeyValue = function(val) {
      var keyValue;
      for (var _i = 0, _a = Object.keys(this.preLocaleObj); _i < _a.length; _i++) {
        var key = _a[_i];
        if (this.preLocaleObj["" + key] === val) {
          keyValue = key;
        }
      }
      return keyValue;
    };
    Uploader2.prototype.updateFileList = function() {
      var element2;
      if (this.fileList.length > 0 && !isNullOrUndefined(this.uploadWrapper.querySelector("." + LIST_PARENT))) {
        for (var i = 0; i < this.fileList.length; i++) {
          element2 = this.fileList[i].querySelector(".e-file-status");
          element2.innerHTML = this.localizedTexts(this.getKeyValue(this.filesData[i].status));
          this.filesData[i].status = this.localizedTexts(this.getKeyValue(this.filesData[i].status));
          if (this.fileList[i].classList.contains(UPLOAD_SUCCESS)) {
            this.fileList[i].querySelector(".e-icons").setAttribute("title", this.localizedTexts("delete"));
          }
          if (this.fileList[i].querySelector(".e-file-play-btn")) {
            this.fileList[i].querySelector(".e-icons").setAttribute("title", this.localizedTexts("resume"));
          }
          if (this.fileList[i].querySelector(".e-file-remove-btn")) {
            this.fileList[i].querySelector(".e-icons").setAttribute("title", this.localizedTexts("remove"));
          }
          if (this.fileList[i].querySelector(".e-file-reload-btn")) {
            this.fileList[i].querySelector(".e-icons").setAttribute("title", this.localizedTexts("retry"));
          }
          if (!this.autoUpload) {
            this.uploadButton.innerText = this.buttons.upload === "Upload" ? this.localizedTexts("Upload") : this.buttons.upload;
            this.uploadButton.setAttribute("title", this.localizedTexts("Upload"));
            this.clearButton.innerText = this.buttons.clear === "Clear" ? this.localizedTexts("Clear") : this.buttons.clear;
            this.clearButton.setAttribute("title", this.localizedTexts("Clear"));
          }
        }
      }
    };
    Uploader2.prototype.reRenderFileList = function() {
      if (this.listParent) {
        detach(this.listParent);
        this.listParent = null;
        this.fileList = [];
        this.internalCreateFileList(this.filesData);
        if (this.actionButtons) {
          this.removeActionButtons();
          this.renderActionButtons();
          this.checkActionButtonStatus();
        }
      }
    };
    Uploader2.prototype.preRender = function() {
      this.localeText = {
        Browse: "Browse...",
        Clear: "Clear",
        Upload: "Upload",
        invalidFileName: "File Name is not allowed",
        dropFilesHint: "Or drop files here",
        invalidMaxFileSize: "File size is too large",
        invalidMinFileSize: "File size is too small",
        invalidFileType: "File type is not allowed",
        uploadFailedMessage: "File failed to upload",
        uploadSuccessMessage: "File uploaded successfully",
        removedSuccessMessage: "File removed successfully",
        removedFailedMessage: "Unable to remove file",
        inProgress: "Uploading",
        readyToUploadMessage: "Ready to upload",
        abort: "Abort",
        remove: "Remove",
        cancel: "Cancel",
        delete: "Delete file",
        pauseUpload: "File upload paused",
        pause: "Pause",
        resume: "Resume",
        retry: "Retry",
        fileUploadCancel: "File upload canceled",
        invalidFileSelection: "Invalid files selected",
        totalFiles: "Total files",
        size: "Size"
      };
      this.l10n = new L10n("uploader", this.localeText, this.locale);
      this.preLocaleObj = getValue("currentLocale", this.l10n);
      this.formRendered();
      this.updateHTMLAttrToElement();
      this.checkHTMLAttributes(false);
      var ejInstance = getValue("ej2_instances", this.element);
      if (this.element.tagName === "EJS-UPLOADER") {
        var inputElement = this.createElement("input", { attrs: { type: "file" } });
        var index = 0;
        for (index; index < this.element.attributes.length; index++) {
          if (this.element.attributes[index].nodeName !== "id") {
            inputElement.setAttribute(this.element.attributes[index].nodeName, this.element.attributes[index].nodeValue);
          } else if (this.element.attributes[index].nodeName === "id") {
            inputElement.setAttribute(this.element.attributes[index].nodeName, getUniqueID("uploader"));
          }
          inputElement.innerHTML = this.element.innerHTML;
        }
        if (!inputElement.hasAttribute("name")) {
          inputElement.setAttribute("name", "UploadFiles");
        }
        this.element.appendChild(inputElement);
        this.element = inputElement;
        setValue("ej2_instances", ejInstance, this.element);
      }
      if (ejInstance[0].isPureReactComponent) {
        if (!isNullOrUndefined(ejInstance[0].props.name)) {
          this.element.setAttribute("name", ejInstance[0].props.name);
        } else if (!isNullOrUndefined(ejInstance[0].props.id) && isNullOrUndefined(ejInstance[0].props.name)) {
          this.element.setAttribute("name", ejInstance[0].props.id);
        } else {
          this.element.setAttribute("name", "UploadFiles");
        }
      }
      if (isNullOrUndefined(this.element.getAttribute("name"))) {
        this.element.setAttribute("name", this.element.getAttribute("id"));
      }
      if (!this.element.hasAttribute("type")) {
        this.element.setAttribute("type", "file");
      }
      this.updateDirectoryAttributes();
      this.keyConfigs = {
        enter: "enter"
      };
      if (this.element.hasAttribute("tabindex")) {
        this.tabIndex = this.element.getAttribute("tabindex");
      }
      this.browserName = Browser.info.name;
      this.uploaderName = this.element.getAttribute("name");
    };
    Uploader2.prototype.formRendered = function() {
      var parentEle = closest(this.element, "form");
      if (!isNullOrUndefined(parentEle)) {
        for (; parentEle && parentEle !== document.documentElement; parentEle = parentEle.parentElement) {
          if (parentEle.tagName === "FORM") {
            this.isForm = true;
            this.formElement = parentEle;
            parentEle.setAttribute("enctype", "multipart/form-data");
            parentEle.setAttribute("encoding", "multipart/form-data");
          }
        }
      }
    };
    Uploader2.prototype.getPersistData = function() {
      return this.addOnPersist(["filesData"]);
    };
    Uploader2.prototype.getModuleName = function() {
      return "uploader";
    };
    Uploader2.prototype.updateDirectoryAttributes = function() {
      if (this.directoryUpload) {
        this.element.setAttribute("directory", "true");
        this.element.setAttribute("webkitdirectory", "true");
      } else {
        this.element.removeAttribute("directory");
        this.element.removeAttribute("webkitdirectory");
      }
    };
    Uploader2.prototype.render = function() {
      this.renderBrowseButton();
      this.initializeUpload();
      this.updateHTMLAttrToWrapper();
      this.wireEvents();
      this.setMultipleSelection();
      this.setExtensions(this.allowedExtensions);
      this.setRTL();
      this.renderPreLoadFiles();
      this.setControlStatus();
      this.setCSSClass();
    };
    Uploader2.prototype.renderBrowseButton = function() {
      this.browseButton = this.createElement("button", { className: "e-css e-btn", attrs: { "type": "button" } });
      this.browseButton.setAttribute("tabindex", this.tabIndex);
      if (typeof this.buttons.browse === "string") {
        this.browseButton.textContent = this.buttons.browse === "Browse..." ? this.localizedTexts("Browse") : this.buttons.browse;
        this.browseButton.setAttribute("title", this.browseButton.innerText);
      } else {
        this.browseButton.appendChild(this.buttons.browse);
      }
      this.element.setAttribute("aria-label", "Uploader");
    };
    Uploader2.prototype.renderActionButtons = function() {
      this.element.setAttribute("tabindex", "-1");
      this.actionButtons = this.createElement("div", { className: ACTION_BUTTONS });
      this.uploadButton = this.createElement("button", {
        className: UPLOAD_BUTTONS,
        attrs: { "type": "button", "tabindex": this.btnTabIndex }
      });
      this.clearButton = this.createElement("button", {
        className: CLEAR_BUTTONS,
        attrs: { "type": "button", "tabindex": this.btnTabIndex }
      });
      this.actionButtons.appendChild(this.clearButton);
      this.actionButtons.appendChild(this.uploadButton);
      this.renderButtonTemplates();
      this.uploadWrapper.appendChild(this.actionButtons);
      this.browseButton.blur();
      if (!this.isPreloadFiles) {
        this.uploadButton.focus();
      }
      this.wireActionButtonEvents();
    };
    Uploader2.prototype.serverActionButtonsEventBind = function(element2) {
      if (element2 && !this.isForm) {
        this.browseButton.blur();
        this.actionButtons = element2;
        this.uploadButton = this.actionButtons.querySelector(".e-file-upload-btn");
        this.clearButton = this.actionButtons.querySelector(".e-file-clear-btn");
        this.uploadButton.focus();
        this.unwireActionButtonEvents();
        this.wireActionButtonEvents();
        this.checkActionButtonStatus();
      }
    };
    Uploader2.prototype.wireActionButtonEvents = function() {
      EventHandler.add(this.uploadButton, "click", this.uploadButtonClick, this);
      EventHandler.add(this.clearButton, "click", this.clearButtonClick, this);
    };
    Uploader2.prototype.unwireActionButtonEvents = function() {
      EventHandler.remove(this.uploadButton, "click", this.uploadButtonClick);
      EventHandler.remove(this.clearButton, "click", this.clearButtonClick);
    };
    Uploader2.prototype.removeActionButtons = function() {
      if (this.actionButtons) {
        this.unwireActionButtonEvents();
        detach(this.actionButtons);
        this.actionButtons = null;
      }
    };
    Uploader2.prototype.renderButtonTemplates = function() {
      if (typeof this.buttons.browse === "string") {
        this.browseButton.textContent = this.buttons.browse === "Browse..." ? this.localizedTexts("Browse") : this.buttons.browse;
        this.browseButton.setAttribute("title", this.browseButton.textContent);
      } else {
        this.browseButton.innerHTML = "";
        this.browseButton.appendChild(this.buttons.browse);
      }
      if (this.uploadButton) {
        var uploadText = isNullOrUndefined(this.buttons.upload) ? "Upload" : this.buttons.upload;
        this.buttons.upload = uploadText;
        if (typeof this.buttons.upload === "string") {
          this.uploadButton.textContent = this.buttons.upload === "Upload" ? this.localizedTexts("Upload") : this.buttons.upload;
          this.uploadButton.setAttribute("title", this.uploadButton.textContent);
        } else {
          this.uploadButton.innerHTML = "";
          this.uploadButton.appendChild(this.buttons.upload);
        }
      }
      if (this.clearButton) {
        var clearText = isNullOrUndefined(this.buttons.clear) ? "Clear" : this.buttons.clear;
        this.buttons.clear = clearText;
        if (typeof this.buttons.clear === "string") {
          this.clearButton.textContent = this.buttons.clear === "Clear" ? this.localizedTexts("Clear") : this.buttons.clear;
          this.clearButton.setAttribute("title", this.clearButton.textContent);
        } else {
          this.clearButton.innerHTML = "";
          this.clearButton.appendChild(this.buttons.clear);
        }
      }
    };
    Uploader2.prototype.initializeUpload = function() {
      this.element.setAttribute("tabindex", "-1");
      var inputWrapper = this.createElement("span", { className: INPUT_WRAPPER });
      this.element.parentElement.insertBefore(inputWrapper, this.element);
      this.dropAreaWrapper = this.createElement("div", { className: DROP_WRAPPER });
      this.element.parentElement.insertBefore(this.dropAreaWrapper, this.element);
      inputWrapper.appendChild(this.element);
      this.dropAreaWrapper.appendChild(this.browseButton);
      this.dropAreaWrapper.appendChild(inputWrapper);
      this.uploadWrapper = this.createElement("div", { className: CONTROL_WRAPPER });
      this.dropAreaWrapper.parentElement.insertBefore(this.uploadWrapper, this.dropAreaWrapper);
      this.uploadWrapper.appendChild(this.dropAreaWrapper);
      this.setDropArea();
    };
    Uploader2.prototype.renderPreLoadFiles = function() {
      if (this.files.length) {
        if (this.enablePersistence && this.filesData.length) {
          this.internalCreateFileList(this.filesData);
          return;
        }
        if (isNullOrUndefined(this.files[0].size)) {
          return;
        }
        this.isPreloadFiles = true;
        var files = [].slice.call(this.files);
        var filesData = [];
        if (!this.multiple) {
          this.clearData();
          files = [files[0]];
        }
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
          var data = files_1[_i];
          var fileData = {
            name: data.name + "." + data.type.split(".")[data.type.split(".").length - 1],
            rawFile: "",
            size: data.size,
            status: this.localizedTexts("uploadSuccessMessage"),
            type: data.type,
            validationMessages: { minSize: "", maxSize: "" },
            statusCode: "2"
          };
          filesData.push(fileData);
          this.filesData.push(fileData);
        }
        this.internalCreateFileList(filesData);
        if (!this.autoUpload && this.listParent && !this.actionButtons && (!this.isForm || this.allowUpload()) && this.showFileList) {
          this.renderActionButtons();
        }
        this.checkActionButtonStatus();
        if (this.sequentialUpload) {
          this.count = this.filesData.length - 1;
        }
        this.isPreloadFiles = false;
      }
    };
    Uploader2.prototype.checkActionButtonStatus = function() {
      if (this.actionButtons) {
        var length_1 = this.uploadWrapper.querySelectorAll("." + VALIDATION_FAILS).length + this.uploadWrapper.querySelectorAll(".e-upload-fails:not(.e-upload-progress)").length + this.uploadWrapper.querySelectorAll("span." + UPLOAD_SUCCESS).length + this.uploadWrapper.querySelectorAll("span." + UPLOAD_INPROGRESS).length;
        if (length_1 > 0 && length_1 === this.uploadWrapper.querySelectorAll("li").length) {
          this.uploadButton.setAttribute("disabled", "disabled");
        } else {
          this.uploadButton.removeAttribute("disabled");
        }
      }
    };
    Uploader2.prototype.setDropArea = function() {
      var dropTextArea = this.dropAreaWrapper.querySelector(".e-file-drop");
      if (this.dropArea) {
        this.dropZoneElement = typeof this.dropArea !== "string" ? this.dropArea : select(this.dropArea, document);
        var element2 = this.element;
        var enableDropText = false;
        while (element2.parentNode) {
          element2 = element2.parentNode;
          if (element2 === this.dropZoneElement) {
            enableDropText = true;
            if (!dropTextArea) {
              this.createDropTextHint();
            } else {
              dropTextArea.innerHTML = this.localizedTexts("dropFilesHint");
            }
          }
        }
        if (!enableDropText && dropTextArea) {
          remove(dropTextArea);
        }
      } else if (!isNullOrUndefined(this.uploaderOptions) && this.uploaderOptions.dropArea === void 0) {
        this.createDropTextHint();
        this.dropZoneElement = this.uploadWrapper;
        this.setProperties({ dropArea: this.uploadWrapper }, true);
      }
      this.bindDropEvents();
    };
    Uploader2.prototype.updateDropArea = function() {
      if (this.dropArea) {
        this.setDropArea();
      } else {
        this.dropZoneElement = null;
        var dropTextArea = this.dropAreaWrapper.querySelector(".e-file-drop");
        if (dropTextArea) {
          remove(dropTextArea);
        }
      }
    };
    Uploader2.prototype.createDropTextHint = function() {
      var fileDropArea = this.createElement("span", { className: DROP_AREA });
      fileDropArea.innerHTML = this.localizedTexts("dropFilesHint");
      this.dropAreaWrapper.appendChild(fileDropArea);
    };
    Uploader2.prototype.updateHTMLAttrToElement = function() {
      if (!isNullOrUndefined(this.htmlAttributes)) {
        for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
          var pro = _a[_i];
          if (wrapperAttr2.indexOf(pro) < 0) {
            this.element.setAttribute(pro, this.htmlAttributes["" + pro]);
          }
        }
      }
    };
    Uploader2.prototype.updateHTMLAttrToWrapper = function() {
      if (!isNullOrUndefined(this.htmlAttributes)) {
        for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
          var pro = _a[_i];
          if (wrapperAttr2.indexOf(pro) > -1) {
            if (pro === "class") {
              var updatedClassValues = this.htmlAttributes["" + pro].replace(/\s+/g, " ").trim();
              if (updatedClassValues !== "") {
                addClass([this.uploadWrapper], updatedClassValues.split(" "));
              }
            } else if (pro === "style") {
              var uploadStyle = this.uploadWrapper.getAttribute(pro);
              uploadStyle = !isNullOrUndefined(uploadStyle) ? uploadStyle + this.htmlAttributes["" + pro] : this.htmlAttributes["" + pro];
              this.uploadWrapper.setAttribute(pro, uploadStyle);
            } else {
              this.uploadWrapper.setAttribute(pro, this.htmlAttributes["" + pro]);
            }
          }
        }
      }
    };
    Uploader2.prototype.setMultipleSelection = function() {
      if (this.multiple && !this.element.hasAttribute("multiple")) {
        var newAttr = document.createAttribute("multiple");
        newAttr.value = "multiple";
        this.element.setAttributeNode(newAttr);
      } else if (!this.multiple) {
        this.element.removeAttribute("multiple");
      }
    };
    Uploader2.prototype.checkAutoUpload = function(fileData) {
      if (this.autoUpload) {
        if (this.sequentialUpload) {
          this.sequenceUpload(fileData);
        } else {
          this.upload(fileData);
        }
        this.removeActionButtons();
      } else if (!this.actionButtons) {
        this.renderActionButtons();
      }
      this.checkActionButtonStatus();
    };
    Uploader2.prototype.sequenceUpload = function(fileData) {
      if (this.filesData.length - fileData.length === 0 || this.filesData[this.filesData.length - fileData.length - 1].statusCode !== "1") {
        if (this.multiple || this.count < 0) {
          ++this.count;
        }
        var isFileListCreated = this.showFileList ? false : true;
        if (typeof this.filesData[this.count] === "object") {
          this.isFirstFileOnSelection = false;
          this.upload(this.filesData[this.count], isFileListCreated);
          if (this.filesData[this.count].statusCode === "0") {
            this.sequenceUpload(fileData);
          }
        } else {
          --this.count;
        }
      }
    };
    Uploader2.prototype.setCSSClass = function(oldCSSClass) {
      var updatedOldCssClass = oldCSSClass;
      if (!isNullOrUndefined(oldCSSClass)) {
        updatedOldCssClass = oldCSSClass.replace(/\s+/g, " ").trim();
      }
      if (!isNullOrUndefined(oldCSSClass) && updatedOldCssClass !== "") {
        removeClass([this.uploadWrapper], updatedOldCssClass.split(" "));
      }
      var updatedCssClassValue = this.cssClass;
      if (!isNullOrUndefined(this.cssClass) && this.cssClass !== "") {
        updatedCssClassValue = this.cssClass.replace(/\s+/g, " ").trim();
      }
      if (!isNullOrUndefined(this.cssClass) && updatedCssClassValue !== "") {
        addClass([this.uploadWrapper], updatedCssClassValue.split(updatedCssClassValue.indexOf(",") > -1 ? "," : " "));
      }
    };
    Uploader2.prototype.wireEvents = function() {
      EventHandler.add(this.browseButton, "click", this.browseButtonClick, this);
      EventHandler.add(this.element, "change", this.onSelectFiles, this);
      EventHandler.add(document, "click", this.removeFocus, this);
      this.keyboardModule = new KeyboardEvents(this.uploadWrapper, {
        keyAction: this.keyActionHandler.bind(this),
        keyConfigs: this.keyConfigs,
        eventName: "keydown"
      });
      if (this.isForm) {
        EventHandler.add(this.formElement, "reset", this.resetForm, this);
      }
    };
    Uploader2.prototype.unWireEvents = function() {
      EventHandler.remove(this.browseButton, "click", this.browseButtonClick);
      EventHandler.remove(this.element, "change", this.onSelectFiles);
      EventHandler.remove(document, "click", this.removeFocus);
      if (this.isForm) {
        EventHandler.remove(this.formElement, "reset", this.resetForm);
      }
      if (this.keyboardModule) {
        this.keyboardModule.destroy();
      }
    };
    Uploader2.prototype.resetForm = function() {
      this.clearAll();
    };
    Uploader2.prototype.keyActionHandler = function(e) {
      var targetElement2 = e.target;
      switch (e.action) {
        case "enter":
          if (e.target === this.clearButton) {
            this.clearButtonClick();
          } else if (e.target === this.uploadButton) {
            this.uploadButtonClick();
          } else if (e.target === this.browseButton) {
            this.browseButtonClick();
          } else if (targetElement2.classList.contains(PAUSE_UPLOAD)) {
            var metaData = this.getCurrentMetaData(null, e);
            metaData.file.statusCode = "4";
            metaData.file.status = this.localizedTexts("pauseUpload");
            this.abortUpload(metaData, false);
          } else if (targetElement2.classList.contains(RESUME_UPLOAD)) {
            this.resumeUpload(this.getCurrentMetaData(null, e), e);
          } else if (targetElement2.classList.contains(RETRY_ICON)) {
            var metaData = this.getCurrentMetaData(null, e);
            if (!isNullOrUndefined(metaData)) {
              metaData.file.statusCode = "1";
              metaData.file.status = this.localizedTexts("readyToUploadMessage");
              this.chunkUpload(metaData.file);
            } else {
              var target = e.target.parentElement;
              var fileData = this.filesData[this.fileList.indexOf(target)];
              this.retry(fileData);
            }
          } else {
            this.removeFiles(e);
            if (!targetElement2.classList.contains(ABORT_ICON)) {
              this.browseButton.focus();
            }
          }
          e.preventDefault();
          e.stopPropagation();
          break;
      }
    };
    Uploader2.prototype.getCurrentMetaData = function(fileInfo, e) {
      var fileData;
      var targetMetaData;
      if (isNullOrUndefined(fileInfo)) {
        var target = e.target.parentElement;
        fileData = this.filesData[this.fileList.indexOf(target)];
      } else {
        fileData = fileInfo;
      }
      for (var i = 0; i < this.uploadMetaData.length; i++) {
        if (this.uploadMetaData[i].file.name === fileData.name) {
          targetMetaData = this.uploadMetaData[i];
        }
      }
      return targetMetaData;
    };
    Uploader2.prototype.removeFocus = function() {
      if (this.uploadWrapper && this.listParent && this.listParent.querySelector("." + ICON_FOCUSED)) {
        document.activeElement.blur();
        this.listParent.querySelector("." + ICON_FOCUSED).classList.remove(ICON_FOCUSED);
      }
    };
    Uploader2.prototype.browseButtonClick = function() {
      this.element.click();
    };
    Uploader2.prototype.uploadButtonClick = function() {
      if (this.sequentialUpload) {
        this.sequenceUpload(this.filesData);
      } else {
        this.upload(this.filesData);
      }
    };
    Uploader2.prototype.clearButtonClick = function() {
      this.clearAll();
      if (this.sequentialUpload) {
        this.count = -1;
      }
      this.actionCompleteCount = 0;
    };
    Uploader2.prototype.bindDropEvents = function() {
      if (this.dropZoneElement) {
        EventHandler.add(this.dropZoneElement, "drop", this.dropElement, this);
        EventHandler.add(this.dropZoneElement, "dragover", this.dragHover, this);
        EventHandler.add(this.dropZoneElement, "dragleave", this.onDragLeave, this);
        EventHandler.add(this.dropZoneElement, "paste", this.onPasteFile, this);
        EventHandler.add(this.dropZoneElement, "dragenter", this.onDragEnter, this);
      }
    };
    Uploader2.prototype.unBindDropEvents = function() {
      if (this.dropZoneElement) {
        EventHandler.remove(this.dropZoneElement, "drop", this.dropElement);
        EventHandler.remove(this.dropZoneElement, "dragover", this.dragHover);
        EventHandler.remove(this.dropZoneElement, "dragleave", this.onDragLeave);
        EventHandler.remove(this.dropZoneElement, "dragenter", this.onDragEnter);
      }
    };
    Uploader2.prototype.onDragEnter = function(e) {
      if (!this.enabled) {
        return;
      }
      this.dropZoneElement.classList.add(DRAG_HOVER);
      this.dragCounter = this.dragCounter + 1;
      e.preventDefault();
      e.stopPropagation();
    };
    Uploader2.prototype.onDragLeave = function() {
      if (!this.enabled) {
        return;
      }
      this.dragCounter = this.dragCounter - 1;
      if (!this.dragCounter) {
        this.dropZoneElement.classList.remove(DRAG_HOVER);
      }
    };
    Uploader2.prototype.dragHover = function(e) {
      if (!this.enabled) {
        return;
      }
      if (this.dropEffect !== "Default") {
        e.dataTransfer.dropEffect = this.dropEffect.toLowerCase();
      }
      e.preventDefault();
      e.stopPropagation();
    };
    Uploader2.prototype.dropElement = function(e) {
      this.dragCounter = 0;
      this.dropZoneElement.classList.remove(DRAG_HOVER);
      this.onSelectFiles(e);
      e.preventDefault();
      e.stopPropagation();
    };
    Uploader2.prototype.onPasteFile = function(event) {
      var item = event.clipboardData.items;
      if (event.type === "paste" && this.browserName !== "msie" && this.browserName !== "edge" && this.browserName !== "safari") {
        this.element.files = event.clipboardData.files;
      }
      if (item.length !== 1 && !this.multiple) {
        return;
      }
      for (var file = 0; file < item.length; file++) {
        var pasteFile = [].slice.call(item)[file];
        if (pasteFile.kind === "file" || pasteFile.type.match("^image/")) {
          this.renderSelectedFiles(event, [pasteFile.getAsFile()], false, true);
        }
      }
    };
    Uploader2.prototype.getSelectedFiles = function(index) {
      var data = [];
      var liElement = this.fileList[index];
      var allFiles = this.getFilesData();
      var nameElements = +liElement.getAttribute("data-files-count");
      var startIndex = 0;
      for (var i = 0; i < index; i++) {
        startIndex += +this.fileList[i].getAttribute("data-files-count");
      }
      for (var j = startIndex; j < startIndex + nameElements; j++) {
        data.push(allFiles[j]);
      }
      return data;
    };
    Uploader2.prototype.removeFiles = function(args) {
      if (!this.enabled) {
        return;
      }
      var selectedElement = args.target.parentElement;
      var index = this.fileList.indexOf(selectedElement);
      var liElement = this.fileList[index];
      var formUpload = this.isFormUpload();
      var fileData = formUpload ? this.getSelectedFiles(index) : this.getFilesInArray(this.filesData[index]);
      if (isNullOrUndefined(fileData)) {
        return;
      }
      if (args.target.classList.contains(ABORT_ICON) && !formUpload) {
        fileData[0].statusCode = "5";
        if (!isNullOrUndefined(liElement)) {
          var spinnerTarget = liElement.querySelector("." + ABORT_ICON);
          createSpinner({ target: spinnerTarget, width: "20px" });
          showSpinner(spinnerTarget);
        }
        if (this.sequentialUpload) {
          this.uploadSequential();
        }
        if (!liElement.classList.contains(RESTRICT_RETRY)) {
          this.checkActionComplete(true);
        }
      } else if (!closest(args.target, "." + SPINNER_PANE)) {
        this.remove(fileData, false, false, true, args);
      }
      this.checkActionButtonStatus();
    };
    Uploader2.prototype.removeFilesData = function(file, customTemplate) {
      var index;
      if (customTemplate) {
        if (!this.showFileList) {
          index = this.filesData.indexOf(file);
          this.filesData.splice(index, 1);
        }
        return;
      }
      var selectedElement = this.getLiElement(file);
      if (isNullOrUndefined(selectedElement)) {
        return;
      }
      this.element.value = "";
      detach(selectedElement);
      index = this.fileList.indexOf(selectedElement);
      this.fileList.splice(index, 1);
      this.filesData.splice(index, 1);
      if (this.fileList.length === 0 && !isNullOrUndefined(this.listParent)) {
        detach(this.listParent);
        this.listParent = null;
        this.removeActionButtons();
      }
      if (this.sequentialUpload) {
        if (index <= this.count) {
          --this.count;
        }
      }
    };
    Uploader2.prototype.removeUploadedFile = function(file, eventArgs, removeDirectly, custom) {
      var _this = this;
      var selectedFiles = file;
      var ajax = new Ajax(this.asyncSettings.removeUrl, "POST", true, null);
      ajax.emitError = false;
      var formData = new FormData();
      ajax.beforeSend = function(e) {
        eventArgs.currentRequest = ajax.httpRequest;
        if (!removeDirectly) {
          _this.trigger("removing", eventArgs, function(eventArgs2) {
            if (eventArgs2.cancel) {
              e.cancel = true;
            } else {
              _this.removingEventCallback(eventArgs2, formData, selectedFiles, file);
            }
          });
        } else {
          _this.removingEventCallback(eventArgs, formData, selectedFiles, file);
        }
      };
      ajax.onLoad = function(e) {
        _this.removeCompleted(e, selectedFiles, custom);
        return {};
      };
      ajax.onError = function(e) {
        _this.removeFailed(e, selectedFiles, custom);
        return {};
      };
      ajax.send(formData);
    };
    Uploader2.prototype.removingEventCallback = function(eventArgs, formData, selectedFiles, file) {
      var name = this.element.getAttribute("name");
      var liElement = this.getLiElement(file);
      if (!isNullOrUndefined(liElement) && (!isNullOrUndefined(liElement.querySelector("." + DELETE_ICON)) || !isNullOrUndefined(liElement.querySelector("." + REMOVE_ICON)))) {
        var spinnerTarget = liElement.querySelector("." + DELETE_ICON) ? liElement.querySelector("." + DELETE_ICON) : liElement.querySelector("." + REMOVE_ICON);
        createSpinner({ target: spinnerTarget, width: "20px" });
        showSpinner(spinnerTarget);
      }
      if (eventArgs.postRawFile && !isNullOrUndefined(selectedFiles.rawFile) && selectedFiles.rawFile !== "") {
        formData.append(name, selectedFiles.rawFile, selectedFiles.name);
      } else {
        formData.append(name, selectedFiles.name);
      }
      this.updateFormData(formData, eventArgs.customFormData);
    };
    Uploader2.prototype.updateFormData = function(formData, customData) {
      if (customData.length > 0 && customData[0]) {
        var _loop_1 = function(i2) {
          var data = customData[i2];
          var value = Object.keys(data).map(function(e) {
            return data["" + e];
          });
          formData.append(Object.keys(data)[0], value);
        };
        for (var i = 0; i < customData.length; i++) {
          _loop_1(i);
        }
      }
    };
    Uploader2.prototype.updateCustomheader = function(request, currentRequest) {
      if (currentRequest.length > 0 && currentRequest[0]) {
        var _loop_2 = function(i2) {
          var data = currentRequest[i2];
          var value = Object.keys(data).map(function(e) {
            return data["" + e];
          });
          request.setRequestHeader(Object.keys(data)[0], value);
        };
        for (var i = 0; i < currentRequest.length; i++) {
          _loop_2(i);
        }
      }
    };
    Uploader2.prototype.removeCompleted = function(e, files, customTemplate) {
      var response = e && e.currentTarget ? this.getResponse(e) : null;
      var status = e.target;
      if (status.readyState === 4 && status.status >= 200 && status.status <= 299) {
        var args = {
          e,
          response,
          operation: "remove",
          file: this.updateStatus(files, this.localizedTexts("removedSuccessMessage"), "2")
        };
        this.trigger("success", args);
        this.removeFilesData(files, customTemplate);
        var index = this.uploadedFilesData.indexOf(files);
        this.uploadedFilesData.splice(index, 1);
        this.trigger("change", { files: this.uploadedFilesData });
      } else {
        this.removeFailed(e, files, customTemplate);
      }
    };
    Uploader2.prototype.removeFailed = function(e, files, customTemplate) {
      var response = e && e.currentTarget ? this.getResponse(e) : null;
      var args = {
        e,
        response,
        operation: "remove",
        file: this.updateStatus(files, this.localizedTexts("removedFailedMessage"), "0")
      };
      if (!customTemplate) {
        var index = this.filesData.indexOf(files);
        var rootElement = this.fileList[index];
        if (rootElement) {
          rootElement.classList.remove(UPLOAD_SUCCESS);
          rootElement.classList.add(UPLOAD_FAILED);
          var statusElement = rootElement.querySelector("." + STATUS);
          if (statusElement) {
            statusElement.classList.remove(UPLOAD_SUCCESS);
            statusElement.classList.add(UPLOAD_FAILED);
          }
        }
        this.checkActionButtonStatus();
      }
      this.trigger("failure", args);
      var liElement = this.getLiElement(files);
      if (!isNullOrUndefined(liElement) && !isNullOrUndefined(liElement.querySelector("." + DELETE_ICON))) {
        var spinnerTarget = liElement.querySelector("." + DELETE_ICON);
        hideSpinner(spinnerTarget);
        detach(liElement.querySelector(".e-spinner-pane"));
      }
    };
    Uploader2.prototype.getFilesFromFolder = function(event) {
      this.filesEntries = [];
      var items = this.multiple ? event.dataTransfer.items : [event.dataTransfer.items[0]];
      var validDirectoryUpload = this.checkDirectoryUpload(items);
      if (!validDirectoryUpload) {
        return;
      }
      var _loop_3 = function(i2) {
        var item = items[i2].webkitGetAsEntry();
        if (item.isFile) {
          var files_2 = [];
          item.file(function(fileObj) {
            var path = item.fullPath;
            files_2.push({ "path": path, "file": fileObj });
          });
          this_1.renderSelectedFiles(event, files_2, true);
        } else if (item.isDirectory) {
          this_1.traverseFileTree(item, event);
        }
      };
      var this_1 = this;
      for (var i = 0; i < items.length; i++) {
        _loop_3(i);
      }
    };
    Uploader2.prototype.checkDirectoryUpload = function(items) {
      for (var i = 0; items && i < items.length; i++) {
        var item = items[i].webkitGetAsEntry();
        if (item.isDirectory) {
          return true;
        }
      }
      return false;
    };
    Uploader2.prototype.traverseFileTree = function(item, event) {
      if (item.isFile) {
        this.filesEntries.push(item);
      } else if (item.isDirectory) {
        var directoryReader = item.createReader();
        this.readFileFromDirectory(directoryReader, event);
      }
    };
    Uploader2.prototype.readFileFromDirectory = function(directoryReader, event) {
      var _this = this;
      directoryReader.readEntries(function(entries) {
        for (var i = 0; i < entries.length; i++) {
          _this.traverseFileTree(entries[i], event);
        }
        _this.pushFilesEntries(event);
        if (entries.length) {
          _this.readFileFromDirectory(directoryReader);
        }
      });
    };
    Uploader2.prototype.pushFilesEntries = function(event) {
      var _this = this;
      var files = [];
      var _loop_4 = function(i2) {
        this_2.filesEntries[i2].file(function(fileObj) {
          if (_this.filesEntries.length) {
            var path = _this.filesEntries[i2].fullPath;
            files.push({ "path": path, "file": fileObj });
            if (i2 === _this.filesEntries.length - 1) {
              _this.filesEntries = [];
              _this.renderSelectedFiles(event, files, true);
            }
          }
        });
      };
      var this_2 = this;
      for (var i = 0; i < this.filesEntries.length; i++) {
        _loop_4(i);
      }
    };
    Uploader2.prototype.onSelectFiles = function(args) {
      if (!this.enabled) {
        return;
      }
      var targetFiles;
      if (args.type === "drop") {
        if (this.directoryUpload) {
          this.getFilesFromFolder(args);
        } else {
          var files = this.sortFilesList = args.dataTransfer.files;
          if (this.browserName !== "msie" && this.browserName !== "edge" && this.browserName !== "safari") {
            this.element.files = files;
          }
          if (files.length > 0) {
            targetFiles = this.multiple ? this.sortFileList(files) : [files[0]];
            this.renderSelectedFiles(args, targetFiles);
          }
        }
      } else {
        targetFiles = [].slice.call(args.target.files);
        this.renderSelectedFiles(args, targetFiles);
      }
      if (this.isAngular || this.isReact) {
        args.stopPropagation();
      }
    };
    Uploader2.prototype.getBase64 = function(file) {
      return new Promise(function(resolve, reject) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function() {
          return resolve(fileReader.result);
        };
        fileReader.onerror = function(error) {
          return reject(error);
        };
      });
    };
    Uploader2.prototype.renderSelectedFiles = function(args, targetFiles, directory, paste) {
      var _this = this;
      this.base64String = [];
      var eventArgs = {
        event: args,
        cancel: false,
        filesData: [],
        isModified: false,
        modifiedFilesData: [],
        progressInterval: "",
        isCanceled: false,
        currentRequest: null,
        customFormData: null
      };
      if (targetFiles.length < 1) {
        eventArgs.isCanceled = true;
        this.trigger("selected", eventArgs);
        return;
      }
      this.flag = true;
      var fileData = [];
      if (!this.multiple) {
        this.clearData(true);
        this.actionCompleteCount = 0;
        targetFiles = [targetFiles[0]];
      }
      for (var i = 0; i < targetFiles.length; i++) {
        var file = directory ? targetFiles[i].file : targetFiles[i];
        this.updateInitialFileDetails(args, targetFiles, file, i, fileData, directory, paste);
      }
      eventArgs.filesData = fileData;
      if (this.allowedExtensions.indexOf("*") > -1) {
        this.allTypes = true;
      }
      if (this.enableHtmlSanitizer) {
        for (var i = 0; i < fileData.length; i++) {
          var sanitizeFile = SanitizeHtmlHelper.beforeSanitize();
          var sanitizeFileName = SanitizeHtmlHelper.serializeValue(sanitizeFile, fileData[parseInt(i.toString())].name);
          var currentFileName = fileData[parseInt(i.toString())].name;
          var isUTF8 = false;
          for (var i_1 = 0; i_1 < currentFileName.length; i_1++) {
            if (currentFileName.charCodeAt(i_1) > 127) {
              isUTF8 = true;
              break;
            }
          }
          var htmlTagRegex = /<([a-z][a-z0-9]*)\b[^>]*>(.*?)<\/\1>/i;
          var hasHTMLString = htmlTagRegex.test(currentFileName);
          if (sanitizeFileName !== fileData[parseInt(i.toString())].name && !(isUTF8 && !hasHTMLString)) {
            var encodedFileName = targetFiles[parseInt(i.toString())].name.replace(/[\u00A0-\u9999<>\&]/g, function(i2) {
              return "&#" + i2.charCodeAt(0) + ";";
            });
            fileData[parseInt(i.toString())].name = encodedFileName;
            fileData[parseInt(i.toString())].status = this.localizedTexts("invalidFileName");
            fileData[parseInt(i.toString())].statusCode = "0";
          }
        }
      }
      if (!this.allTypes) {
        fileData = this.checkExtension(fileData);
      }
      this.trigger("selected", eventArgs, function(eventArgs2) {
        _this._internalRenderSelect(eventArgs2, fileData);
      });
    };
    Uploader2.prototype.updateInitialFileDetails = function(args, targetFiles, file, i, fileData, directory, paste) {
      var fileName = directory ? targetFiles[i].path.substring(1, targetFiles[i].path.length) : paste ? getUniqueID(file.name.substring(0, file.name.lastIndexOf("."))) + "." + this.getFileType(file.name) : this.directoryUpload ? targetFiles[i].webkitRelativePath : file.name;
      var fileDetails = {
        name: fileName,
        rawFile: file,
        size: file.size,
        status: this.localizedTexts("readyToUploadMessage"),
        type: this.getFileType(file.name),
        validationMessages: this.validatedFileSize(file.size),
        statusCode: "1",
        id: getUniqueID(file.name.substring(0, file.name.lastIndexOf("."))) + "." + this.getFileType(file.name)
      };
      if (paste) {
        fileDetails.fileSource = "paste";
      }
      fileDetails.status = fileDetails.validationMessages.minSize !== "" ? this.localizedTexts("invalidMinFileSize") : fileDetails.validationMessages.maxSize !== "" ? this.localizedTexts("invalidMaxFileSize") : fileDetails.status;
      if (fileDetails.validationMessages.minSize !== "" || fileDetails.validationMessages.maxSize !== "") {
        fileDetails.statusCode = "0";
      }
      fileData.push(fileDetails);
    };
    Uploader2.prototype._internalRenderSelect = function(eventArgs, fileData) {
      if (!eventArgs.cancel) {
        this.selectedFiles = this.selectedFiles.concat(fileData);
        this.btnTabIndex = this.disableKeyboardNavigation ? "-1" : "0";
        if (this.showFileList) {
          if (eventArgs.isModified && eventArgs.modifiedFilesData.length > 0) {
            for (var j = 0; j < eventArgs.modifiedFilesData.length; j++) {
              for (var k = 0; k < fileData.length; k++) {
                if (eventArgs.modifiedFilesData[j].id === fileData[k].id) {
                  eventArgs.modifiedFilesData[j].rawFile = fileData[k].rawFile;
                }
              }
            }
            var dataFiles = this.allTypes ? eventArgs.modifiedFilesData : this.checkExtension(eventArgs.modifiedFilesData);
            this.updateSortedFileList(dataFiles);
            this.filesData = this.filesData.concat(dataFiles);
            if (!this.isForm || this.allowUpload()) {
              this.checkAutoUpload(dataFiles);
            }
          } else {
            this.internalCreateFileList(fileData);
            if (this.autoUpload && this.sequenceUpload && this.sequentialUpload && this.filesData.length > 0 && this.filesData[this.filesData.length - 1].statusCode !== "2" && this.filesData[this.filesData.length - 1].statusCode !== "0") {
              this.filesData = this.filesData.concat(fileData);
              return;
            }
            this.filesData = this.filesData.concat(fileData);
            if (!this.isForm || this.allowUpload()) {
              this.checkAutoUpload(fileData);
            }
          }
          if (!isNullOrUndefined(eventArgs.progressInterval) && eventArgs.progressInterval !== "") {
            this.progressInterval = eventArgs.progressInterval;
          }
        } else {
          this.filesData = this.filesData.concat(fileData);
          if (this.autoUpload) {
            this.upload(this.filesData, true);
          }
        }
        for (var item = 0; item < this.filesData.length; item++) {
          if (this.filesData[item].statusCode === "0") {
            this.checkActionComplete(true);
          }
        }
        this.isFirstFileOnSelection = true;
      }
    };
    Uploader2.prototype.allowUpload = function() {
      var allowFormUpload = false;
      if (this.isForm && (!isNullOrUndefined(this.asyncSettings.saveUrl) && this.asyncSettings.saveUrl !== "")) {
        allowFormUpload = true;
      }
      return allowFormUpload;
    };
    Uploader2.prototype.isFormUpload = function() {
      var isFormUpload = false;
      if (this.isForm && ((isNullOrUndefined(this.asyncSettings.saveUrl) || this.asyncSettings.saveUrl === "") && (isNullOrUndefined(this.asyncSettings.removeUrl) || this.asyncSettings.removeUrl === ""))) {
        isFormUpload = true;
      }
      return isFormUpload;
    };
    Uploader2.prototype.clearData = function(singleUpload) {
      if (!isNullOrUndefined(this.listParent)) {
        detach(this.listParent);
        this.listParent = null;
      }
      if (this.browserName !== "msie" && !singleUpload) {
        this.element.value = "";
      }
      this.fileList = [];
      this.filesData = [];
      this.removeActionButtons();
    };
    Uploader2.prototype.updateSortedFileList = function(filesData) {
      var previousListClone = this.createElement("div", { id: "clonewrapper" });
      var added = -1;
      var removedList;
      if (this.listParent) {
        for (var i = 0; i < this.listParent.querySelectorAll("li").length; i++) {
          var liElement = this.listParent.querySelectorAll("li")[i];
          previousListClone.appendChild(liElement.cloneNode(true));
        }
        this.removeActionButtons();
        var oldList = [].slice.call(previousListClone.childNodes);
        this.createParentUL();
        for (var index = 0; index < filesData.length; index++) {
          for (var j = 0; j < this.filesData.length; j++) {
            if (this.filesData[j].name === filesData[index].name) {
              this.listParent.appendChild(oldList[j]);
              EventHandler.add(oldList[j].querySelector(".e-icons"), "click", this.removeFiles, this);
              this.fileList.push(oldList[j]);
              added = index;
            }
          }
          if (added !== index) {
            this.internalCreateFileList([filesData[index]]);
          }
        }
      } else {
        this.internalCreateFileList(filesData);
      }
    };
    Uploader2.prototype.isBlank = function(str) {
      return !str || /^\s*$/.test(str);
    };
    Uploader2.prototype.checkExtension = function(files) {
      var dropFiles = files;
      if (!this.isBlank(this.allowedExtensions)) {
        var allowedExtensions = [];
        var extensions = this.allowedExtensions.split(",");
        for (var _i = 0, extensions_1 = extensions; _i < extensions_1.length; _i++) {
          var extension = extensions_1[_i];
          allowedExtensions.push(extension.trim().toLocaleLowerCase());
        }
        for (var i = 0; i < files.length; i++) {
          if (allowedExtensions.indexOf(("." + files[i].type).toLocaleLowerCase()) === -1) {
            files[i].status = this.localizedTexts("invalidFileType");
            files[i].statusCode = "0";
          }
        }
      }
      return dropFiles;
    };
    Uploader2.prototype.validatedFileSize = function(fileSize) {
      var minSizeError = "";
      var maxSizeError = "";
      if (fileSize < this.minFileSize) {
        minSizeError = this.localizedTexts("invalidMinFileSize");
      } else if (fileSize > this.maxFileSize) {
        maxSizeError = this.localizedTexts("invalidMaxFileSize");
      } else {
        minSizeError = "";
        maxSizeError = "";
      }
      var errorMessage = { minSize: minSizeError, maxSize: maxSizeError };
      return errorMessage;
    };
    Uploader2.prototype.isPreLoadFile = function(fileData) {
      var isPreload = false;
      for (var i = 0; i < this.files.length; i++) {
        if (this.files[i].name === fileData.name.slice(0, fileData.name.lastIndexOf(".")) && this.files[i].type === fileData.type) {
          isPreload = true;
        }
      }
      return isPreload;
    };
    Uploader2.prototype.createCustomfileList = function(fileData) {
      this.createParentUL();
      for (var _i = 0, fileData_1 = fileData; _i < fileData_1.length; _i++) {
        var listItem = fileData_1[_i];
        var listElement = this.createElement("li", { className: FILE, attrs: { "data-file-name": listItem.name } });
        this.uploadTemplateFn = this.templateComplier(this.template);
        var liTempCompiler = this.uploadTemplateFn(listItem, this, "template", this.element.id + "Template", this.isStringTemplate, null, listElement);
        if (liTempCompiler) {
          var fromElements = [].slice.call(liTempCompiler);
          append(fromElements, listElement);
        }
        var index = fileData.indexOf(listItem);
        var eventArgs = {
          element: listElement,
          fileInfo: listItem,
          index,
          isPreload: this.isPreLoadFile(listItem)
        };
        var eventsArgs = {
          element: listElement,
          fileInfo: listItem,
          index,
          isPreload: this.isPreLoadFile(listItem)
        };
        this.trigger("rendering", eventArgs);
        this.trigger("fileListRendering", eventsArgs);
        this.listParent.appendChild(listElement);
        this.fileList.push(listElement);
      }
      this.renderReactTemplates();
    };
    Uploader2.prototype.createParentUL = function() {
      if (isNullOrUndefined(this.listParent)) {
        this.listParent = this.createElement("ul", { className: LIST_PARENT });
        this.uploadWrapper.appendChild(this.listParent);
      }
    };
    Uploader2.prototype.formFileList = function(fileData, files) {
      var fileList = this.createElement("li", { className: FILE });
      fileList.setAttribute("data-files-count", fileData.length + "");
      var fileContainer = this.createElement("span", { className: TEXT_CONTAINER });
      var statusMessage;
      for (var _i = 0, fileData_2 = fileData; _i < fileData_2.length; _i++) {
        var listItem = fileData_2[_i];
        var fileNameEle = this.createElement("span", { className: FILE_NAME });
        fileNameEle.innerHTML = this.getFileNameOnly(listItem.name);
        var fileTypeEle = this.createElement("span", { className: FILE_TYPE });
        var fileType = this.getFileType(listItem.name);
        fileTypeEle.innerHTML = "." + fileType;
        if (!fileType) {
          fileTypeEle.classList.add("e-hidden");
        }
        if (!this.enableRtl) {
          fileContainer.appendChild(fileNameEle);
          fileContainer.appendChild(fileTypeEle);
        } else {
          var rtlContainer = this.createElement("span", { className: RTL_CONTAINER });
          rtlContainer.appendChild(fileTypeEle);
          rtlContainer.appendChild(fileNameEle);
          fileContainer.appendChild(rtlContainer);
        }
        this.truncateName(fileNameEle);
        statusMessage = this.formValidateFileInfo(listItem, fileList);
      }
      fileList.appendChild(fileContainer);
      this.setListToFileInfo(fileData, fileList);
      var index = this.listParent.querySelectorAll("li").length;
      var infoEle = this.createElement("span");
      if (fileList.classList.contains(INVALID_FILE)) {
        infoEle.classList.add(STATUS);
        infoEle.classList.add(INVALID_FILE);
        infoEle.innerText = fileData.length > 1 ? this.localizedTexts("invalidFileSelection") : statusMessage;
      } else {
        infoEle.classList.add(fileData.length > 1 ? INFORMATION : FILE_SIZE);
        infoEle.innerText = fileData.length > 1 ? this.localizedTexts("totalFiles") + ": " + fileData.length + " , " + this.localizedTexts("size") + ": " + this.bytesToSize(this.getFileSize(fileData)) : this.bytesToSize(fileData[0].size);
        this.createFormInput(fileData);
      }
      fileContainer.appendChild(infoEle);
      if (isNullOrUndefined(fileList.querySelector(".e-icons"))) {
        var iconElement = this.createElement("span", { className: "e-icons", attrs: { "tabindex": this.btnTabIndex } });
        if (this.browserName === "msie") {
          iconElement.classList.add("e-msie");
        }
        iconElement.setAttribute("title", this.localizedTexts("remove"));
        fileList.appendChild(fileContainer);
        fileList.appendChild(iconElement);
        EventHandler.add(iconElement, "click", this.removeFiles, this);
        iconElement.classList.add(REMOVE_ICON);
      }
      var eventArgs = {
        element: fileList,
        fileInfo: this.mergeFileInfo(fileData, fileList),
        index,
        isPreload: this.isPreLoadFile(this.mergeFileInfo(fileData, fileList))
      };
      var eventsArgs = {
        element: fileList,
        fileInfo: this.mergeFileInfo(fileData, fileList),
        index,
        isPreload: this.isPreLoadFile(this.mergeFileInfo(fileData, fileList))
      };
      this.trigger("rendering", eventArgs);
      this.trigger("fileListRendering", eventsArgs);
      this.listParent.appendChild(fileList);
      this.fileList.push(fileList);
    };
    Uploader2.prototype.formValidateFileInfo = function(listItem, fileList) {
      var statusMessage = listItem.status;
      var validationMessages = this.validatedFileSize(listItem.size);
      if (validationMessages.minSize !== "" || validationMessages.maxSize !== "") {
        this.addInvalidClass(fileList);
        statusMessage = validationMessages.minSize !== "" ? this.localizedTexts("invalidMinFileSize") : validationMessages.maxSize !== "" ? this.localizedTexts("invalidMaxFileSize") : statusMessage;
      }
      var typeValidationMessage = this.checkExtension(this.getFilesInArray(listItem))[0].status;
      if (typeValidationMessage === this.localizedTexts("invalidFileType")) {
        this.addInvalidClass(fileList);
        statusMessage = typeValidationMessage;
      }
      return statusMessage;
    };
    Uploader2.prototype.addInvalidClass = function(fileList) {
      fileList.classList.add(INVALID_FILE);
    };
    Uploader2.prototype.createFormInput = function(fileData) {
      if (this.browserName !== "safari") {
        var inputElement = this.element.cloneNode(true);
        inputElement.classList.add(HIDDEN_INPUT);
        for (var _i = 0, fileData_3 = fileData; _i < fileData_3.length; _i++) {
          var listItem = fileData_3[_i];
          listItem.input = inputElement;
        }
        inputElement.setAttribute("id", getUniqueID("hiddenUploader"));
        inputElement.setAttribute("name", this.uploaderName);
        this.uploadWrapper.querySelector("." + INPUT_WRAPPER).appendChild(inputElement);
        if (this.browserName !== "msie" && this.browserName !== "edge") {
          this.element.value = "";
        }
      }
    };
    Uploader2.prototype.getFileSize = function(fileData) {
      var fileSize = 0;
      for (var _i = 0, fileData_4 = fileData; _i < fileData_4.length; _i++) {
        var file = fileData_4[_i];
        fileSize += file.size;
      }
      return fileSize;
    };
    Uploader2.prototype.mergeFileInfo = function(fileData, fileList) {
      var result = {
        name: "",
        rawFile: "",
        size: 0,
        status: "",
        type: "",
        validationMessages: { minSize: "", maxSize: "" },
        statusCode: "1",
        list: fileList
      };
      var fileNames = [];
      var type = "";
      for (var _i = 0, fileData_5 = fileData; _i < fileData_5.length; _i++) {
        var listItem = fileData_5[_i];
        fileNames.push(listItem.name);
        type = listItem.type;
      }
      result.name = fileNames.join(", ");
      result.size = this.getFileSize(fileData);
      result.type = type;
      result.status = this.statusForFormUpload(fileData, fileList);
      return result;
    };
    Uploader2.prototype.statusForFormUpload = function(fileData, fileList) {
      var isValid = true;
      var statusMessage;
      for (var _i = 0, fileData_6 = fileData; _i < fileData_6.length; _i++) {
        var listItem = fileData_6[_i];
        statusMessage = listItem.status;
        var validationMessages = this.validatedFileSize(listItem.size);
        if (validationMessages.minSize !== "" || validationMessages.maxSize !== "") {
          isValid = false;
          statusMessage = validationMessages.minSize !== "" ? this.localizedTexts("invalidMinFileSize") : validationMessages.maxSize !== "" ? this.localizedTexts("invalidMaxFileSize") : statusMessage;
        }
        var typeValidationMessage = this.checkExtension(this.getFilesInArray(listItem))[0].status;
        if (typeValidationMessage === this.localizedTexts("invalidFileType")) {
          isValid = false;
          statusMessage = typeValidationMessage;
        }
      }
      if (!isValid) {
        fileList.classList.add(INVALID_FILE);
        statusMessage = fileData.length > 1 ? this.localizedTexts("invalidFileSelection") : statusMessage;
      } else {
        statusMessage = this.localizedTexts("totalFiles") + ": " + fileData.length + " , " + this.localizedTexts("size") + ": " + this.bytesToSize(this.getFileSize(fileData));
      }
      return statusMessage;
    };
    Uploader2.prototype.formCustomFileList = function(fileData, files) {
      this.createParentUL();
      var fileList = this.createElement("li", { className: FILE });
      fileList.setAttribute("data-files-count", fileData.length + "");
      this.setListToFileInfo(fileData, fileList);
      var result = this.mergeFileInfo(fileData, fileList);
      fileList.setAttribute("data-file-name", result.name);
      this.uploadTemplateFn = this.templateComplier(this.template);
      var liTempCompiler = this.uploadTemplateFn(result, this, "template", this.element.id + "Template", this.isStringTemplate, null, fileList);
      if (liTempCompiler) {
        var fromElements = [].slice.call(liTempCompiler);
        append(fromElements, fileList);
      }
      var index = this.listParent.querySelectorAll("li").length;
      if (!fileList.classList.contains(INVALID_FILE)) {
        this.createFormInput(fileData);
      }
      var eventArgs = {
        element: fileList,
        fileInfo: result,
        index,
        isPreload: this.isPreLoadFile(result)
      };
      var eventsArgs = {
        element: fileList,
        fileInfo: result,
        index,
        isPreload: this.isPreLoadFile(result)
      };
      this.trigger("rendering", eventArgs);
      this.trigger("fileListRendering", eventsArgs);
      this.listParent.appendChild(fileList);
      this.fileList.push(fileList);
      this.renderReactTemplates();
    };
    Uploader2.prototype.createFileList = function(fileData) {
      this.filesData = this.filesData && this.filesData.length > 0 ? this.filesData.concat(fileData) : fileData;
      this.internalCreateFileList(fileData);
    };
    Uploader2.prototype.internalCreateFileList = function(fileData) {
      this.createParentUL();
      if (this.template !== "" && !isNullOrUndefined(this.template)) {
        if (this.isFormUpload()) {
          this.uploadWrapper.classList.add(FORM_UPLOAD);
          this.formCustomFileList(fileData, this.element.files);
        } else {
          this.createCustomfileList(fileData);
        }
      } else if (this.isFormUpload()) {
        this.uploadWrapper.classList.add(FORM_UPLOAD);
        this.formFileList(fileData, this.element.files);
      } else {
        for (var _i = 0, fileData_7 = fileData; _i < fileData_7.length; _i++) {
          var listItem = fileData_7[_i];
          var liElement = this.createElement("li", {
            className: FILE,
            attrs: { "data-file-name": listItem.name, "data-files-count": "1" }
          });
          var textContainer = this.createElement("span", { className: TEXT_CONTAINER });
          var textElement = this.createElement("span", { className: FILE_NAME, attrs: { "title": listItem.name } });
          textElement.innerHTML = this.getFileNameOnly(listItem.name);
          var fileExtension = this.createElement("span", { className: FILE_TYPE });
          var fileType = this.getFileType(listItem.name);
          fileExtension.innerHTML = "." + fileType;
          if (!fileType) {
            fileExtension.classList.add("e-hidden");
          }
          if (!this.enableRtl) {
            textContainer.appendChild(textElement);
            textContainer.appendChild(fileExtension);
          } else {
            var rtlContainer = this.createElement("span", { className: RTL_CONTAINER });
            rtlContainer.appendChild(fileExtension);
            rtlContainer.appendChild(textElement);
            textContainer.appendChild(rtlContainer);
          }
          var fileSize = this.createElement("span", { className: FILE_SIZE });
          fileSize.innerHTML = this.bytesToSize(listItem.size);
          textContainer.appendChild(fileSize);
          var statusElement = this.createElement("span", { className: STATUS });
          textContainer.appendChild(statusElement);
          statusElement.innerHTML = listItem.status;
          liElement.appendChild(textContainer);
          var iconElement = this.createElement("span", {
            className: " e-icons",
            attrs: { "tabindex": this.btnTabIndex }
          });
          if (this.browserName === "msie") {
            iconElement.classList.add("e-msie");
          }
          iconElement.setAttribute("title", this.localizedTexts("remove"));
          liElement.appendChild(iconElement);
          EventHandler.add(iconElement, "click", this.removeFiles, this);
          if (listItem.statusCode === "2") {
            statusElement.classList.add(UPLOAD_SUCCESS);
            iconElement.classList.add(DELETE_ICON);
            iconElement.setAttribute("title", this.localizedTexts("delete"));
          } else if (listItem.statusCode !== "1") {
            statusElement.classList.remove(UPLOAD_SUCCESS);
            statusElement.classList.add(VALIDATION_FAILS);
          }
          if (this.autoUpload && listItem.statusCode === "1" && this.asyncSettings.saveUrl !== "") {
            statusElement.innerHTML = "";
          }
          if (!iconElement.classList.contains(DELETE_ICON)) {
            iconElement.classList.add(REMOVE_ICON);
          }
          var index = fileData.indexOf(listItem);
          var eventArgs = {
            element: liElement,
            fileInfo: listItem,
            index,
            isPreload: this.isPreLoadFile(listItem)
          };
          var eventsArgs = {
            element: liElement,
            fileInfo: listItem,
            index,
            isPreload: this.isPreLoadFile(listItem)
          };
          this.trigger("rendering", eventArgs);
          this.trigger("fileListRendering", eventsArgs);
          this.listParent.appendChild(liElement);
          this.fileList.push(liElement);
          this.truncateName(textElement);
          var preventActionComplete = this.flag;
          if (this.isPreLoadFile(listItem)) {
            this.flag = false;
            this.checkActionComplete(true);
            this.flag = preventActionComplete;
          }
        }
      }
    };
    Uploader2.prototype.getSlicedName = function(nameElement) {
      var text = nameElement.textContent;
      nameElement.dataset.tail = text.slice(text.length - 10);
    };
    Uploader2.prototype.setListToFileInfo = function(fileData, fileList) {
      for (var _i = 0, fileData_8 = fileData; _i < fileData_8.length; _i++) {
        var listItem = fileData_8[_i];
        listItem.list = fileList;
      }
    };
    Uploader2.prototype.truncateName = function(name) {
      var nameElement = name;
      if (this.browserName !== "edge" && nameElement.offsetWidth < nameElement.scrollWidth) {
        this.getSlicedName(nameElement);
      } else if (nameElement.offsetWidth + 1 < nameElement.scrollWidth) {
        this.getSlicedName(nameElement);
      }
    };
    Uploader2.prototype.getFileType = function(name) {
      var extension;
      var index = name.lastIndexOf(".");
      if (index >= 0) {
        extension = name.substring(index + 1);
      }
      return extension ? extension : "";
    };
    Uploader2.prototype.getFileNameOnly = function(name) {
      var type = this.getFileType(name);
      var names = name.split("." + type);
      return type = names[0];
    };
    Uploader2.prototype.setInitialAttributes = function() {
      if (this.initialAttr.accept) {
        this.element.setAttribute("accept", this.initialAttr.accept);
      }
      if (this.initialAttr.disabled) {
        this.element.setAttribute("disabled", "disabled");
      }
      if (this.initialAttr.multiple) {
        var newAttr = document.createAttribute("multiple");
        this.element.setAttributeNode(newAttr);
      }
    };
    Uploader2.prototype.filterfileList = function(files) {
      var filterFiles = [];
      var li;
      for (var i = 0; i < files.length; i++) {
        li = this.getLiElement(files[i]);
        if (!li.classList.contains(UPLOAD_SUCCESS)) {
          filterFiles.push(files[i]);
        }
      }
      return filterFiles;
    };
    Uploader2.prototype.updateStatus = function(files, status, statusCode, updateLiStatus) {
      if (updateLiStatus === void 0) {
        updateLiStatus = true;
      }
      if (!(status === "" || isNullOrUndefined(status)) && !(statusCode === "" || isNullOrUndefined(statusCode))) {
        files.status = status;
        files.statusCode = statusCode;
      }
      if (updateLiStatus) {
        var li = this.getLiElement(files);
        if (!isNullOrUndefined(li)) {
          if (!isNullOrUndefined(li.querySelector("." + STATUS)) && !(status === "" || isNullOrUndefined(status))) {
            li.querySelector("." + STATUS).textContent = status;
          }
        }
      }
      return files;
    };
    Uploader2.prototype.getLiElement = function(files) {
      var index;
      for (var i = 0; i < this.filesData.length; i++) {
        if (!isNullOrUndefined(files) && (!isNullOrUndefined(this.filesData[i].id) && !isNullOrUndefined(files.id) ? this.filesData[i].name === files.name && this.filesData[i].id === files.id : this.filesData[i].name === files.name)) {
          index = i;
        }
      }
      return this.fileList[index];
    };
    Uploader2.prototype.createProgressBar = function(liElement) {
      var progressbarWrapper = this.createElement("span", { className: PROGRESS_WRAPPER });
      var progressBar = this.createElement("progressbar", { className: PROGRESSBAR, attrs: { value: "0", max: "100" } });
      var progressbarInnerWrapper = this.createElement("span", { className: PROGRESS_INNER_WRAPPER });
      progressBar.setAttribute("style", "width: 0%");
      var progressbarText = this.createElement("span", { className: PROGRESSBAR_TEXT });
      progressbarText.textContent = "0%";
      progressbarInnerWrapper.appendChild(progressBar);
      progressbarWrapper.appendChild(progressbarInnerWrapper);
      progressbarWrapper.appendChild(progressbarText);
      liElement.querySelector("." + TEXT_CONTAINER).appendChild(progressbarWrapper);
    };
    Uploader2.prototype.updateProgressbar = function(e, li) {
      if (!isNaN(Math.round(e.loaded / e.total * 100)) && !isNullOrUndefined(li.querySelector("." + PROGRESSBAR))) {
        if (!isNullOrUndefined(this.progressInterval) && this.progressInterval !== "") {
          var value = Math.round(e.loaded / e.total * 100) % parseInt(this.progressInterval, 10);
          if (value === 0 || value === 100) {
            this.changeProgressValue(li, Math.round(e.loaded / e.total * 100).toString() + "%");
          }
        } else {
          this.changeProgressValue(li, Math.round(e.loaded / e.total * 100).toString() + "%");
        }
      }
    };
    Uploader2.prototype.changeProgressValue = function(li, progressValue) {
      li.querySelector("." + PROGRESSBAR).setAttribute("style", "width:" + progressValue);
      li.querySelector("." + PROGRESSBAR_TEXT).textContent = progressValue;
    };
    Uploader2.prototype.uploadInProgress = function(e, files, customUI, request) {
      var li = this.getLiElement(files);
      if (isNullOrUndefined(li) && !customUI) {
        return;
      }
      if (!isNullOrUndefined(li)) {
        if (files.statusCode === "5") {
          this.cancelUploadingFile(files, e, request, li);
        }
        if (!(li.querySelectorAll("." + PROGRESS_WRAPPER).length > 0) && li.querySelector("." + STATUS)) {
          li.querySelector("." + STATUS).classList.add(UPLOAD_INPROGRESS);
          this.createProgressBar(li);
          this.updateProgressBarClasses(li, UPLOAD_INPROGRESS);
          li.querySelector("." + STATUS).classList.remove(UPLOAD_FAILED);
        }
        this.updateProgressbar(e, li);
        var iconEle = li.querySelector("." + REMOVE_ICON);
        if (!isNullOrUndefined(iconEle)) {
          iconEle.classList.add(ABORT_ICON, UPLOAD_INPROGRESS);
          iconEle.setAttribute("title", this.localizedTexts("abort"));
          iconEle.classList.remove(REMOVE_ICON);
        }
      } else {
        this.cancelUploadingFile(files, e, request);
      }
      var args = { e, operation: "upload", file: this.updateStatus(files, this.localizedTexts("inProgress"), "3") };
      this.trigger("progress", args);
    };
    Uploader2.prototype.cancelUploadingFile = function(files, e, request, li) {
      var _this = this;
      if (files.statusCode === "5") {
        var eventArgs = {
          event: e,
          fileData: files,
          cancel: false,
          customFormData: [],
          currentRequest: null
        };
        this.trigger("canceling", eventArgs, function(eventArgs2) {
          if (eventArgs2.cancel) {
            files.statusCode = "3";
            if (!isNullOrUndefined(li)) {
              var spinnerTarget = li.querySelector("." + ABORT_ICON);
              if (!isNullOrUndefined(spinnerTarget)) {
                hideSpinner(spinnerTarget);
                detach(li.querySelector(".e-spinner-pane"));
              }
            }
          } else {
            request.emitError = false;
            request.httpRequest.abort();
            var formData = new FormData();
            if (files.statusCode === "5") {
              var name_1 = _this.element.getAttribute("name");
              formData.append(name_1, files.name);
              formData.append("cancel-uploading", files.name);
              _this.updateFormData(formData, eventArgs2.customFormData);
              var ajax_1 = new Ajax(_this.asyncSettings.removeUrl, "POST", true, null);
              ajax_1.emitError = false;
              ajax_1.beforeSend = function(e2) {
                if (eventArgs2.currentRequest) {
                  _this.updateCustomheader(ajax_1.httpRequest, eventArgs2.currentRequest);
                }
              };
              ajax_1.onLoad = function(e2) {
                _this.removecanceledFile(e2, files);
                return {};
              };
              ajax_1.send(formData);
            }
          }
        });
      }
    };
    Uploader2.prototype.removecanceledFile = function(e, file) {
      var liElement = this.getLiElement(file);
      if (isNullOrUndefined(liElement) || liElement.querySelector("." + RETRY_ICON) || isNullOrUndefined(liElement.querySelector("." + ABORT_ICON))) {
        return;
      }
      this.updateStatus(file, this.localizedTexts("fileUploadCancel"), "5");
      this.renderFailureState(e, file, liElement);
      var spinnerTarget = liElement.querySelector("." + REMOVE_ICON);
      if (!isNullOrUndefined(liElement)) {
        hideSpinner(spinnerTarget);
        if (!isNullOrUndefined(liElement.querySelector(".e-spinner-pane"))) {
          detach(liElement.querySelector(".e-spinner-pane"));
        }
      }
      var requestResponse = e && e.currentTarget ? this.getResponse(e) : null;
      var args = { event: e, response: requestResponse, operation: "cancel", file };
      this.trigger("success", args);
    };
    Uploader2.prototype.renderFailureState = function(e, file, liElement) {
      var _this = this;
      this.updateProgressBarClasses(liElement, UPLOAD_FAILED);
      this.removeProgressbar(liElement, "failure");
      if (!isNullOrUndefined(liElement.querySelector(".e-file-status"))) {
        liElement.querySelector(".e-file-status").classList.add(UPLOAD_FAILED);
      }
      var deleteIcon = liElement.querySelector("." + ABORT_ICON);
      if (isNullOrUndefined(deleteIcon)) {
        return;
      }
      deleteIcon.classList.remove(ABORT_ICON, UPLOAD_INPROGRESS);
      deleteIcon.classList.add(REMOVE_ICON);
      deleteIcon.setAttribute("title", this.localizedTexts("remove"));
      this.pauseButton = this.createElement("span", { className: "e-icons e-file-reload-btn", attrs: { "tabindex": this.btnTabIndex } });
      deleteIcon.parentElement.insertBefore(this.pauseButton, deleteIcon);
      this.pauseButton.setAttribute("title", this.localizedTexts("retry"));
      var retryElement = liElement.querySelector("." + RETRY_ICON);
      retryElement.addEventListener("click", function(e2) {
        _this.reloadcanceledFile(e2, file, liElement, false);
      }, false);
    };
    Uploader2.prototype.reloadcanceledFile = function(e, file, liElement, custom) {
      file.statusCode = "1";
      file.status = this.localizedTexts("readyToUploadMessage");
      if (!custom) {
        if (!isNullOrUndefined(liElement.querySelector("." + STATUS))) {
          liElement.querySelector("." + STATUS).classList.remove(UPLOAD_FAILED);
        }
        if (!isNullOrUndefined(liElement.querySelector("." + RETRY_ICON))) {
          detach(liElement.querySelector("." + RETRY_ICON));
        }
        this.pauseButton = null;
      }
      if (!isNullOrUndefined(liElement)) {
        liElement.classList.add(RESTRICT_RETRY);
      }
      this.upload([file]);
    };
    Uploader2.prototype.uploadComplete = function(e, file, customUI) {
      var status = e.target;
      if (status.readyState === 4 && status.status >= 200 && status.status <= 299) {
        var li = this.getLiElement(file);
        if (isNullOrUndefined(li) && (!customUI || isNullOrUndefined(customUI))) {
          return;
        }
        if (!isNullOrUndefined(li)) {
          this.updateProgressBarClasses(li, UPLOAD_SUCCESS);
          this.removeProgressbar(li, "success");
          var iconEle = li.querySelector("." + ABORT_ICON);
          if (!isNullOrUndefined(iconEle)) {
            iconEle.classList.add(DELETE_ICON);
            iconEle.setAttribute("title", this.localizedTexts("delete"));
            iconEle.classList.remove(ABORT_ICON);
            iconEle.classList.remove(UPLOAD_INPROGRESS);
          }
        }
        this.raiseSuccessEvent(e, file);
      } else {
        this.uploadFailed(e, file);
      }
    };
    Uploader2.prototype.getResponse = function(e) {
      var target = e.currentTarget;
      var response = {
        readyState: target.readyState,
        statusCode: target.status,
        statusText: target.statusText,
        headers: target.getAllResponseHeaders(),
        withCredentials: target.withCredentials
      };
      return response;
    };
    Uploader2.prototype.raiseSuccessEvent = function(e, file) {
      var _this = this;
      var response = e && e.currentTarget ? this.getResponse(e) : null;
      var statusMessage = this.localizedTexts("uploadSuccessMessage");
      var args = {
        e,
        response,
        operation: "upload",
        file: this.updateStatus(file, statusMessage, "2", false),
        statusText: statusMessage
      };
      var liElement = this.getLiElement(file);
      if (!isNullOrUndefined(liElement)) {
        var spinnerEle = liElement.querySelector("." + SPINNER_PANE);
        if (!isNullOrUndefined(spinnerEle)) {
          hideSpinner(liElement);
          detach(spinnerEle);
        }
      }
      this.trigger("success", args, function(args2) {
        _this.updateStatus(file, args2.statusText, "2");
        _this.uploadedFilesData.push(file);
        _this.trigger("change", { file: _this.uploadedFilesData });
        _this.checkActionButtonStatus();
        if (_this.fileList.length > 0) {
          if (!_this.getLiElement(file).classList.contains(RESTRICT_RETRY)) {
            _this.uploadSequential();
            _this.checkActionComplete(true);
          } else {
            _this.getLiElement(file).classList.remove(RESTRICT_RETRY);
          }
        } else if (!_this.showFileList) {
          _this.checkActionComplete(true);
        }
      });
    };
    Uploader2.prototype.uploadFailed = function(e, file) {
      var _this = this;
      var li = this.getLiElement(file);
      var response = e && e.currentTarget ? this.getResponse(e) : null;
      var statusMessage = this.localizedTexts("uploadFailedMessage");
      var args = {
        e,
        response,
        operation: "upload",
        file: this.updateStatus(file, statusMessage, "0", false),
        statusText: statusMessage
      };
      if (!isNullOrUndefined(li)) {
        this.renderFailureState(e, file, li);
      }
      this.trigger("failure", args, function(args2) {
        _this.updateStatus(file, args2.statusText, "0");
        _this.checkActionButtonStatus();
        _this.uploadSequential();
        _this.checkActionComplete(true);
      });
    };
    Uploader2.prototype.uploadSequential = function() {
      if (this.sequentialUpload) {
        if (this.autoUpload) {
          this.checkAutoUpload(this.filesData);
        } else {
          this.uploadButtonClick();
        }
      }
    };
    Uploader2.prototype.checkActionComplete = function(increment) {
      if (increment) {
        ++this.actionCompleteCount;
      } else {
        --this.actionCompleteCount;
      }
      this.raiseActionComplete();
    };
    Uploader2.prototype.raiseActionComplete = function() {
      if (this.filesData.length === this.actionCompleteCount && this.flag) {
        this.flag = false;
        var eventArgs = {
          fileData: []
        };
        eventArgs.fileData = this.getSelectedFileStatus(this.selectedFiles);
        this.trigger("actionComplete", eventArgs);
      }
    };
    Uploader2.prototype.getSelectedFileStatus = function(selectedFiles) {
      var matchFiles = [];
      var matchFilesIndex = 0;
      for (var selectFileIndex = 0; selectFileIndex < selectedFiles.length; selectFileIndex++) {
        var selectedFileData = selectedFiles[selectFileIndex];
        for (var fileDataIndex = 0; fileDataIndex < this.filesData.length; fileDataIndex++) {
          if (this.filesData[fileDataIndex].name === selectedFileData.name && this.filesData[fileDataIndex].status === selectedFileData.status) {
            matchFiles[matchFilesIndex] = this.filesData[fileDataIndex];
            ++matchFilesIndex;
          }
        }
      }
      return matchFiles;
    };
    Uploader2.prototype.updateProgressBarClasses = function(li, className) {
      var progressBar = li.querySelector("." + PROGRESSBAR);
      if (!isNullOrUndefined(progressBar)) {
        progressBar.classList.add(className);
      }
    };
    Uploader2.prototype.removeProgressbar = function(li, callType) {
      var _this = this;
      if (!isNullOrUndefined(li.querySelector("." + PROGRESS_WRAPPER))) {
        this.progressAnimation = new Animation({ duration: 1250 });
        this.progressAnimation.animate(li.querySelector("." + PROGRESS_WRAPPER), { name: "FadeOut" });
        this.progressAnimation.animate(li.querySelector("." + PROGRESSBAR_TEXT), { name: "FadeOut" });
        setTimeout(function() {
          _this.animateProgressBar(li, callType);
        }, 750);
      }
    };
    Uploader2.prototype.animateProgressBar = function(li, callType) {
      if (callType === "success") {
        li.classList.add(UPLOAD_SUCCESS);
        if (!isNullOrUndefined(li.querySelector("." + STATUS))) {
          li.querySelector("." + STATUS).classList.remove(UPLOAD_INPROGRESS);
          this.progressAnimation.animate(li.querySelector("." + STATUS), { name: "FadeIn" });
          li.querySelector("." + STATUS).classList.add(UPLOAD_SUCCESS);
        }
      } else {
        if (!isNullOrUndefined(li.querySelector("." + STATUS))) {
          li.querySelector("." + STATUS).classList.remove(UPLOAD_INPROGRESS);
          this.progressAnimation.animate(li.querySelector("." + STATUS), { name: "FadeIn" });
          li.querySelector("." + STATUS).classList.add(UPLOAD_FAILED);
        }
      }
      if (li.querySelector("." + PROGRESS_WRAPPER)) {
        detach(li.querySelector("." + PROGRESS_WRAPPER));
      }
    };
    Uploader2.prototype.setExtensions = function(extensions) {
      if (extensions !== "" && !isNullOrUndefined(extensions)) {
        this.element.setAttribute("accept", extensions);
      } else {
        this.element.removeAttribute("accept");
      }
    };
    Uploader2.prototype.templateComplier = function(uploadTemplate) {
      if (uploadTemplate) {
        try {
          if (typeof uploadTemplate !== "function" && selectAll(uploadTemplate, document).length) {
            return compile(select(uploadTemplate, document).innerHTML.trim());
          } else {
            return compile(uploadTemplate);
          }
        } catch (exception) {
          return compile(uploadTemplate);
        }
      }
      return void 0;
    };
    Uploader2.prototype.setRTL = function() {
      if (this.enableRtl) {
        addClass([this.uploadWrapper], RTL3);
      } else {
        removeClass([this.uploadWrapper], RTL3);
      }
    };
    Uploader2.prototype.localizedTexts = function(localeText) {
      this.l10n.setLocale(this.locale);
      return this.l10n.getConstant(localeText);
    };
    Uploader2.prototype.setControlStatus = function() {
      if (!this.enabled) {
        this.uploadWrapper.classList.add(DISABLED);
        this.element.setAttribute("disabled", "disabled");
        this.browseButton.setAttribute("disabled", "disabled");
        if (!isNullOrUndefined(this.clearButton)) {
          this.clearButton.setAttribute("disabled", "disabled");
        }
        if (!isNullOrUndefined(this.uploadButton)) {
          this.uploadButton.setAttribute("disabled", "disabled");
        }
      } else {
        if (this.uploadWrapper.classList.contains(DISABLED)) {
          this.uploadWrapper.classList.remove(DISABLED);
        }
        if (!isNullOrUndefined(this.browseButton) && this.element.hasAttribute("disabled")) {
          this.element.removeAttribute("disabled");
          this.browseButton.removeAttribute("disabled");
        }
        if (!isNullOrUndefined(this.clearButton) && this.clearButton.hasAttribute("disabled")) {
          this.clearButton.removeAttribute("disabled");
        }
        if (!isNullOrUndefined(this.uploadButton) && this.uploadButton.hasAttribute("disabled")) {
          this.uploadButton.hasAttribute("disabled");
        }
      }
    };
    Uploader2.prototype.checkHTMLAttributes = function(isDynamic) {
      var attributes2 = isDynamic ? isNullOrUndefined(this.htmlAttributes) ? [] : Object.keys(this.htmlAttributes) : ["accept", "multiple", "disabled"];
      for (var _i = 0, attributes_1 = attributes2; _i < attributes_1.length; _i++) {
        var prop = attributes_1[_i];
        if (!isNullOrUndefined(this.element.getAttribute(prop))) {
          switch (prop) {
            case "accept":
              if (isNullOrUndefined(this.uploaderOptions) || this.uploaderOptions["allowedExtensions"] === void 0 || isDynamic) {
                this.setProperties({ allowedExtensions: this.element.getAttribute("accept") }, !isDynamic);
                this.initialAttr.accept = this.allowedExtensions;
              }
              break;
            case "multiple":
              if (isNullOrUndefined(this.uploaderOptions) || this.uploaderOptions["multiple"] === void 0 || isDynamic) {
                var isMutiple = this.element.getAttribute(prop) === "multiple" || this.element.getAttribute(prop) === "" || this.element.getAttribute(prop) === "true" ? true : false;
                this.setProperties({ multiple: isMutiple }, !isDynamic);
                this.initialAttr.multiple = true;
              }
              break;
            case "disabled":
              if (isNullOrUndefined(this.uploaderOptions) || this.uploaderOptions["enabled"] === void 0 || isDynamic) {
                var isDisabled = this.element.getAttribute(prop) === "disabled" || this.element.getAttribute(prop) === "" || this.element.getAttribute(prop) === "true" ? false : true;
                this.setProperties({ enabled: isDisabled }, !isDynamic);
                this.initialAttr.disabled = true;
              }
          }
        }
      }
    };
    Uploader2.prototype.chunkUpload = function(file, custom, fileIndex) {
      var start = 0;
      var end = Math.min(this.asyncSettings.chunkSize, file.size);
      var index = 0;
      var blob = file.rawFile.slice(start, end);
      var metaData = { chunkIndex: index, blob, file, start, end, retryCount: 0, request: null };
      this.sendRequest(file, metaData, custom, fileIndex);
    };
    Uploader2.prototype.sendRequest = function(file, metaData, custom, fileIndex) {
      var _this = this;
      var formData = new FormData();
      var blob = file.rawFile.slice(metaData.start, metaData.end);
      formData.append(this.uploaderName, blob, file.name);
      formData.append("chunk-index", metaData.chunkIndex.toString());
      formData.append("chunkIndex", metaData.chunkIndex.toString());
      var totalChunk = Math.max(Math.ceil(file.size / this.asyncSettings.chunkSize), 1);
      formData.append("total-chunk", totalChunk.toString());
      formData.append("totalChunk", totalChunk.toString());
      var ajax = new Ajax({ url: this.asyncSettings.saveUrl, type: "POST", async: true, contentType: null });
      ajax.emitError = false;
      ajax.onLoad = function(e) {
        _this.chunkUploadComplete(e, metaData, custom);
        return {};
      };
      ajax.onUploadProgress = function(e) {
        _this.chunkUploadInProgress(e, metaData, custom);
        return {};
      };
      var eventArgs = {
        fileData: file,
        customFormData: [],
        cancel: false,
        chunkSize: this.asyncSettings.chunkSize === 0 ? null : this.asyncSettings.chunkSize
      };
      ajax.beforeSend = function(e) {
        eventArgs.currentRequest = ajax.httpRequest;
        eventArgs.currentChunkIndex = metaData.chunkIndex;
        if (eventArgs.currentChunkIndex === 0) {
          _this.trigger("uploading", eventArgs, function(eventArgs2) {
            _this.uploadingEventCallback(formData, eventArgs2, e, file);
          });
        } else {
          _this.trigger("chunkUploading", eventArgs, function(eventArgs2) {
            _this.uploadingEventCallback(formData, eventArgs2, e, file);
          });
        }
      };
      ajax.onError = function(e) {
        _this.chunkUploadFailed(e, metaData, custom);
        return {};
      };
      ajax.send(formData);
      metaData.request = ajax;
    };
    Uploader2.prototype.uploadingEventCallback = function(formData, eventArgs, e, file) {
      if (eventArgs.cancel) {
        this.eventCancelByArgs(e, eventArgs, file);
      } else {
        this.updateFormData(formData, eventArgs.customFormData);
      }
    };
    Uploader2.prototype.eventCancelByArgs = function(e, eventArgs, file) {
      var _this = this;
      e.cancel = true;
      if (eventArgs.fileData.statusCode === "5") {
        return;
      }
      eventArgs.fileData.statusCode = "5";
      eventArgs.fileData.status = this.localizedTexts("fileUploadCancel");
      var liElement = this.getLiElement(eventArgs.fileData);
      if (liElement) {
        if (!isNullOrUndefined(liElement.querySelector("." + STATUS))) {
          liElement.querySelector("." + STATUS).innerHTML = this.localizedTexts("fileUploadCancel");
          liElement.querySelector("." + STATUS).classList.add(UPLOAD_FAILED);
        }
        this.pauseButton = this.createElement("span", { className: "e-icons e-file-reload-btn", attrs: { "tabindex": this.btnTabIndex } });
        var removeIcon = liElement.querySelector("." + REMOVE_ICON);
        if (removeIcon) {
          removeIcon.parentElement.insertBefore(this.pauseButton, removeIcon);
        }
        this.pauseButton.setAttribute("title", this.localizedTexts("retry"));
        this.pauseButton.addEventListener("click", function(e2) {
          _this.reloadcanceledFile(e2, file, liElement);
        }, false);
        this.checkActionButtonStatus();
      }
    };
    Uploader2.prototype.checkChunkUpload = function() {
      return this.asyncSettings.chunkSize <= 0 || isNullOrUndefined(this.asyncSettings.chunkSize) ? false : true;
    };
    Uploader2.prototype.chunkUploadComplete = function(e, metaData, custom) {
      var _this = this;
      var response = e.target;
      var liElement;
      if (response.readyState === 4 && response.status >= 200 && response.status < 300) {
        var requestResponse = e && e.currentTarget ? this.getResponse(e) : null;
        var totalChunk = Math.max(Math.ceil(metaData.file.size / this.asyncSettings.chunkSize), 1);
        var eventArgs = {
          event: e,
          file: metaData.file,
          chunkIndex: metaData.chunkIndex,
          totalChunk,
          chunkSize: this.asyncSettings.chunkSize,
          response: requestResponse
        };
        this.trigger("chunkSuccess", eventArgs);
        if (isNullOrUndefined(custom) || !custom) {
          liElement = this.getLiElement(metaData.file);
        }
        this.updateMetaData(metaData);
        if (metaData.end === metaData.file.size) {
          metaData.file.statusCode = "3";
        }
        if (metaData.file.statusCode === "5") {
          var eventArgs_1 = { event: e, fileData: metaData.file, cancel: false, customFormData: [] };
          this.trigger("canceling", eventArgs_1, function(eventArgs2) {
            if (eventArgs2.cancel) {
              metaData.file.statusCode = "3";
              var spinnerTarget = liElement.querySelector("." + ABORT_ICON);
              if (!isNullOrUndefined(liElement) && !isNullOrUndefined(spinnerTarget)) {
                hideSpinner(spinnerTarget);
                detach(liElement.querySelector(".e-spinner-pane"));
              }
              _this.sendNextRequest(metaData);
            } else {
              metaData.request.emitError = false;
              response.abort();
              var formData = new FormData();
              var name_2 = _this.element.getAttribute("name");
              formData.append(name_2, metaData.file.name);
              formData.append("cancel-uploading", metaData.file.name);
              formData.append("cancelUploading", metaData.file.name);
              _this.updateFormData(formData, eventArgs2.customFormData);
              var ajax = new Ajax(_this.asyncSettings.removeUrl, "POST", true, null);
              ajax.emitError = false;
              ajax.onLoad = function(e2) {
                _this.removeChunkFile(e2, metaData, custom);
                return {};
              };
              ajax.send(formData);
            }
          });
        } else {
          if (totalChunk - 1 === metaData.chunkIndex && totalChunk > metaData.chunkIndex) {
            var index = this.pausedData.indexOf(metaData);
            if (index >= 0) {
              this.pausedData.splice(index, 1);
            }
            if (isNullOrUndefined(this.template) && (isNullOrUndefined(custom) || !custom) && liElement) {
              if (liElement && !isNullOrUndefined(liElement.querySelector("." + PAUSE_UPLOAD))) {
                detach(liElement.querySelector("." + PAUSE_UPLOAD));
              }
              this.removeChunkProgressBar(metaData);
            }
            this.raiseSuccessEvent(e, metaData.file);
            return;
          }
          if (metaData.file.statusCode !== "4") {
            this.sendNextRequest(metaData);
          }
        }
      } else {
        this.chunkUploadFailed(e, metaData);
      }
    };
    Uploader2.prototype.sendNextRequest = function(metaData) {
      metaData.start = metaData.end;
      metaData.end += this.asyncSettings.chunkSize;
      metaData.end = Math.min(metaData.end, metaData.file.size);
      metaData.chunkIndex += 1;
      this.sendRequest(metaData.file, metaData);
    };
    Uploader2.prototype.removeChunkFile = function(e, metaData, custom) {
      if (isNullOrUndefined(this.template) && (isNullOrUndefined(custom) && !custom)) {
        var liElement = this.getLiElement(metaData.file);
        var deleteIcon = liElement.querySelector("." + ABORT_ICON);
        var spinnerTarget = deleteIcon;
        this.updateStatus(metaData.file, this.localizedTexts("fileUploadCancel"), "5");
        this.updateProgressBarClasses(liElement, UPLOAD_FAILED);
        this.removeProgressbar(liElement, "failure");
        deleteIcon && deleteIcon.classList.remove(ABORT_ICON);
        deleteIcon && deleteIcon.classList.add(REMOVE_ICON);
        deleteIcon && deleteIcon.setAttribute("title", this.localizedTexts("remove"));
        var pauseIcon = liElement.querySelector("." + PAUSE_UPLOAD);
        pauseIcon && pauseIcon.classList.add(RETRY_ICON);
        pauseIcon && pauseIcon.classList.remove(PAUSE_UPLOAD);
        pauseIcon && pauseIcon.setAttribute("title", this.localizedTexts("retry"));
        if (!isNullOrUndefined(liElement) && !isNullOrUndefined(deleteIcon) && !isNullOrUndefined(liElement.querySelector(".e-spinner-pane"))) {
          hideSpinner(spinnerTarget);
          detach(liElement.querySelector(".e-spinner-pane"));
        }
      }
    };
    Uploader2.prototype.pauseUpload = function(metaData, e, custom) {
      metaData.file.statusCode = "4";
      metaData.file.status = this.localizedTexts("pause");
      this.updateMetaData(metaData);
      var eventArgs = {
        event: e ? e : null,
        file: metaData.file,
        chunkIndex: metaData.chunkIndex,
        chunkCount: Math.round(metaData.file.size / this.asyncSettings.chunkSize),
        chunkSize: this.asyncSettings.chunkSize
      };
      this.abortUpload(metaData, custom, eventArgs);
    };
    Uploader2.prototype.abortUpload = function(metaData, custom, eventArgs) {
      if (metaData.file.statusCode !== "4") {
        metaData.request.emitError = false;
        metaData.request.httpRequest.abort();
      }
      var liElement = this.getLiElement(metaData.file);
      if (isNullOrUndefined(this.template) && (isNullOrUndefined(custom) || !custom)) {
        var targetElement2 = liElement.querySelector("." + PAUSE_UPLOAD);
        targetElement2.classList.remove(PAUSE_UPLOAD);
        targetElement2.classList.add(RESUME_UPLOAD);
        targetElement2.setAttribute("title", this.localizedTexts("resume"));
        targetElement2.nextElementSibling.classList.add(REMOVE_ICON);
        targetElement2.nextElementSibling.classList.remove(ABORT_ICON);
        targetElement2.nextElementSibling.setAttribute("title", this.localizedTexts("remove"));
      }
      for (var i = 0; i < this.pausedData.length; i++) {
        if (this.pausedData[i].file.name === metaData.file.name) {
          this.pausedData.splice(i, 1);
        }
      }
      this.pausedData.push(metaData);
      this.trigger("pausing", eventArgs);
    };
    Uploader2.prototype.resumeUpload = function(metaData, e, custom) {
      var liElement = this.getLiElement(metaData.file);
      var targetElement2;
      if (!isNullOrUndefined(liElement)) {
        targetElement2 = liElement.querySelector("." + RESUME_UPLOAD);
      }
      if (!isNullOrUndefined(targetElement2) && (isNullOrUndefined(custom) || !custom)) {
        targetElement2.classList.remove(RESUME_UPLOAD);
        targetElement2.classList.add(PAUSE_UPLOAD);
        targetElement2.setAttribute("title", this.localizedTexts("pause"));
        targetElement2.nextElementSibling.classList.remove(REMOVE_ICON);
        targetElement2.nextElementSibling.classList.add(ABORT_ICON);
        targetElement2.nextElementSibling.setAttribute("title", this.localizedTexts("abort"));
      }
      metaData.file.status = this.localizedTexts("inProgress");
      metaData.file.statusCode = "3";
      this.updateMetaData(metaData);
      var eventArgs = {
        event: e ? e : null,
        file: metaData.file,
        chunkIndex: metaData.chunkIndex,
        chunkCount: Math.round(metaData.file.size / this.asyncSettings.chunkSize),
        chunkSize: this.asyncSettings.chunkSize
      };
      this.trigger("resuming", eventArgs);
      for (var i = 0; i < this.pausedData.length; i++) {
        if (this.pausedData[i].end === this.pausedData[i].file.size) {
          this.chunkUploadComplete(e, metaData, custom);
        } else {
          if (this.pausedData[i].file.name === metaData.file.name) {
            this.pausedData[i].start = this.pausedData[i].end;
            this.pausedData[i].end = this.pausedData[i].end + this.asyncSettings.chunkSize;
            this.pausedData[i].end = Math.min(this.pausedData[i].end, this.pausedData[i].file.size);
            this.pausedData[i].chunkIndex = this.pausedData[i].chunkIndex + 1;
            this.sendRequest(this.pausedData[i].file, this.pausedData[i], custom);
          }
        }
      }
    };
    Uploader2.prototype.updateMetaData = function(metaData) {
      if (this.uploadMetaData.indexOf(metaData) === -1) {
        this.uploadMetaData.push(metaData);
      } else {
        this.uploadMetaData.splice(this.uploadMetaData.indexOf(metaData), 1);
        this.uploadMetaData.push(metaData);
      }
    };
    Uploader2.prototype.removeChunkProgressBar = function(metaData) {
      var liElement = this.getLiElement(metaData.file);
      if (!isNullOrUndefined(liElement)) {
        this.updateProgressBarClasses(liElement, UPLOAD_SUCCESS);
        this.removeProgressbar(liElement, "success");
        var cancelButton = liElement.querySelector("." + ABORT_ICON);
        if (!isNullOrUndefined(cancelButton)) {
          cancelButton.classList.add(DELETE_ICON);
          cancelButton.setAttribute("title", this.localizedTexts("delete"));
          cancelButton.classList.remove(ABORT_ICON, UPLOAD_INPROGRESS);
        }
      }
    };
    Uploader2.prototype.chunkUploadFailed = function(e, metaData, custom) {
      var _this = this;
      var chunkCount = Math.max(Math.ceil(metaData.file.size / this.asyncSettings.chunkSize), 1);
      var liElement;
      if (isNullOrUndefined(this.template) && (isNullOrUndefined(custom) || !custom)) {
        liElement = this.getLiElement(metaData.file);
      }
      var requestResponse = e && e.currentTarget ? this.getResponse(e) : null;
      var eventArgs = {
        event: e,
        file: metaData.file,
        chunkIndex: metaData.chunkIndex,
        totalChunk: chunkCount,
        chunkSize: this.asyncSettings.chunkSize,
        cancel: false,
        response: requestResponse
      };
      this.trigger("chunkFailure", eventArgs, function(eventArgs2) {
        if (!eventArgs2.cancel) {
          if (metaData.retryCount < _this.asyncSettings.retryCount) {
            setTimeout(function() {
              _this.retryRequest(liElement, metaData, custom);
            }, _this.asyncSettings.retryAfterDelay);
          } else {
            if (!isNullOrUndefined(liElement)) {
              var pauseButton = liElement.querySelector("." + PAUSE_UPLOAD) ? liElement.querySelector("." + PAUSE_UPLOAD) : liElement.querySelector("." + RESUME_UPLOAD);
              if (!isNullOrUndefined(pauseButton)) {
                pauseButton.classList.add(RETRY_ICON);
                pauseButton.classList.remove(PAUSE_UPLOAD, RESUME_UPLOAD);
              }
              _this.updateProgressBarClasses(liElement, UPLOAD_FAILED);
              _this.removeProgressbar(liElement, "failure");
              liElement.querySelector(".e-icons").classList.remove(UPLOAD_INPROGRESS);
              var iconElement = liElement.querySelector("." + ABORT_ICON) ? liElement.querySelector("." + ABORT_ICON) : liElement.querySelector("." + REMOVE_ICON);
              iconElement.classList.remove(ABORT_ICON);
              if (!isNullOrUndefined(liElement.querySelector("." + PAUSE_UPLOAD))) {
                detach(liElement.querySelector("." + PAUSE_UPLOAD));
              }
              if (metaData.start > 0) {
                iconElement.classList.add(DELETE_ICON);
                iconElement.setAttribute("title", _this.localizedTexts("delete"));
              } else {
                iconElement.classList.add(REMOVE_ICON);
                iconElement.setAttribute("title", _this.localizedTexts("remove"));
              }
            }
            metaData.retryCount = 0;
            var file_1 = metaData.file;
            var failureMessage = _this.localizedTexts("uploadFailedMessage");
            var args = {
              e,
              response: requestResponse,
              operation: "upload",
              file: _this.updateStatus(file_1, failureMessage, "0", false),
              statusText: failureMessage
            };
            _this.trigger("failure", args, function(args2) {
              _this.updateStatus(file_1, args2.statusText, "0");
              _this.uploadSequential();
              _this.checkActionComplete(true);
            });
          }
        }
      });
    };
    Uploader2.prototype.retryRequest = function(liElement, metaData, custom) {
      if (isNullOrUndefined(this.template) && (isNullOrUndefined(custom) || !custom) && liElement) {
        this.updateProgressBarClasses(liElement, UPLOAD_FAILED);
      }
      metaData.retryCount += 1;
      this.sendRequest(metaData.file, metaData);
    };
    Uploader2.prototype.checkPausePlayAction = function(e) {
      var targetElement2 = e.target;
      var selectedElement = e.target.parentElement;
      var index = this.fileList.indexOf(selectedElement);
      var fileData = this.filesData[index];
      var metaData = this.getCurrentMetaData(fileData);
      if (targetElement2.classList.contains(PAUSE_UPLOAD)) {
        this.pauseUpload(metaData, e);
      } else if (targetElement2.classList.contains(RESUME_UPLOAD)) {
        this.resumeUpload(metaData, e);
      } else if (targetElement2.classList.contains(RETRY_ICON)) {
        if (metaData.file.status === this.localizedTexts("fileUploadCancel")) {
          this.retryUpload(metaData, false);
        } else {
          this.retryUpload(metaData, true);
        }
      }
    };
    Uploader2.prototype.retryUpload = function(metaData, fromcanceledStage) {
      if (fromcanceledStage) {
        metaData.end = metaData.end + this.asyncSettings.chunkSize;
        metaData.start = metaData.start + this.asyncSettings.chunkSize;
        this.sendRequest(metaData.file, metaData);
      } else {
        metaData.file.statusCode = "1";
        metaData.file.status = this.localizedTexts("readyToUploadMessage");
        this.chunkUpload(metaData.file);
      }
      this.getLiElement(metaData.file).classList.add(RESTRICT_RETRY);
    };
    Uploader2.prototype.chunkUploadInProgress = function(e, metaData, custom) {
      var _this = this;
      if (metaData.file.statusCode === "4") {
        return;
      }
      if (metaData.file.statusCode !== "4" && metaData.file.statusCode !== "5") {
        metaData.file.statusCode = "3";
        metaData.file.status = this.localizedTexts("inProgress");
      }
      this.updateMetaData(metaData);
      var liElement = this.getLiElement(metaData.file);
      if (isNullOrUndefined(liElement)) {
        return;
      }
      var retryElement = liElement.querySelector("." + RETRY_ICON);
      if (!isNullOrUndefined(retryElement)) {
        retryElement.classList.add(PAUSE_UPLOAD);
        retryElement.setAttribute("title", this.localizedTexts("pause"));
        retryElement.classList.remove(RETRY_ICON);
      }
      if (!isNullOrUndefined(liElement)) {
        if (!(liElement.querySelectorAll("." + PROGRESS_WRAPPER).length > 0)) {
          var statusElement = liElement.querySelector("." + STATUS);
          if (isNullOrUndefined(this.template)) {
            statusElement.classList.add(UPLOAD_INPROGRESS);
            statusElement.classList.remove(UPLOAD_FAILED);
            this.createProgressBar(liElement);
            this.updateProgressBarClasses(liElement, UPLOAD_INPROGRESS);
          }
          var clearIcon = liElement.querySelector("." + REMOVE_ICON) ? liElement.querySelector("." + REMOVE_ICON) : liElement.querySelector("." + DELETE_ICON);
          if (!isNullOrUndefined(clearIcon)) {
            clearIcon.classList.add(ABORT_ICON);
            clearIcon.setAttribute("title", this.localizedTexts("abort"));
            clearIcon.classList.remove(REMOVE_ICON);
          }
        }
        if (!isNaN(Math.round(e.loaded / e.total * 100)) && isNullOrUndefined(this.template) && metaData.file.statusCode !== "4") {
          var progressVal = void 0;
          var totalChunks = Math.ceil(metaData.file.size / this.asyncSettings.chunkSize) - 1;
          if (this.asyncSettings.chunkSize && totalChunks) {
            progressVal = Math.round(metaData.chunkIndex / totalChunks * 100);
            this.changeProgressValue(liElement, progressVal.toString() + "%");
          }
        }
        if (metaData.chunkIndex === 0) {
          this.checkActionButtonStatus();
        }
      }
      if (isNullOrUndefined(liElement.querySelector("." + PAUSE_UPLOAD)) && isNullOrUndefined(this.template) && isNullOrUndefined(liElement.querySelector("." + DELETE_ICON))) {
        this.pauseButton = this.createElement("span", { className: "e-icons e-file-pause-btn", attrs: { "tabindex": this.btnTabIndex } });
        if (this.browserName === "msie") {
          this.pauseButton.classList.add("e-msie");
        }
        var abortIcon = liElement.querySelector("." + ABORT_ICON);
        abortIcon.parentElement.insertBefore(this.pauseButton, abortIcon);
        this.pauseButton.setAttribute("title", this.localizedTexts("pause"));
        this.pauseButton.addEventListener("click", function(e2) {
          _this.checkPausePlayAction(e2);
        }, false);
      }
    };
    Uploader2.prototype.bytesToSize = function(bytes) {
      var i = -1;
      if (!bytes) {
        return "0.0 KB";
      }
      do {
        bytes = bytes / 1024;
        i++;
      } while (bytes > 99);
      if (i >= 2) {
        bytes = bytes * 1024;
        i = 1;
      }
      return Math.max(bytes, 0).toFixed(1) + " " + ["KB", "MB"][i];
    };
    Uploader2.prototype.sortFileList = function(filesData) {
      filesData = filesData ? filesData : this.sortFilesList;
      var files = filesData;
      var fileNames = [];
      for (var i = 0; i < files.length; i++) {
        fileNames.push(files[i].name);
      }
      var sortedFileNames = fileNames.sort();
      var sortedFilesData = [];
      for (var _i = 0, sortedFileNames_1 = sortedFileNames; _i < sortedFileNames_1.length; _i++) {
        var name_3 = sortedFileNames_1[_i];
        for (var i = 0; i < files.length; i++) {
          if (name_3 === files[i].name) {
            sortedFilesData.push(files[i]);
          }
        }
      }
      return sortedFilesData;
    };
    Uploader2.prototype.destroy = function() {
      this.element.value = null;
      this.clearTemplate();
      this.clearAll();
      this.unWireEvents();
      this.unBindDropEvents();
      if (this.multiple) {
        this.element.removeAttribute("multiple");
      }
      if (!this.enabled) {
        this.element.removeAttribute("disabled");
      }
      this.element.removeAttribute("accept");
      this.setInitialAttributes();
      var attributes2 = ["aria-label", "directory", "webkitdirectory", "tabindex"];
      for (var _i = 0, attributes_2 = attributes2; _i < attributes_2.length; _i++) {
        var key = attributes_2[_i];
        this.element.removeAttribute(key);
      }
      if (!isNullOrUndefined(this.uploadWrapper)) {
        this.uploadWrapper.parentElement.appendChild(this.element);
        detach(this.uploadWrapper);
      }
      this.uploadWrapper = null;
      this.uploadWrapper = null;
      this.browseButton = null;
      this.dropAreaWrapper = null;
      this.dropZoneElement = null;
      this.dropArea = null;
      this.keyboardModule = null;
      this.clearButton = null;
      this.uploadButton = null;
      _super.prototype.destroy.call(this);
    };
    Uploader2.prototype.upload = function(files, custom) {
      var _this = this;
      files = files ? files : this.filesData;
      if (this.sequentialUpload && (this.isFirstFileOnSelection || custom)) {
        this.sequenceUpload(files);
      } else {
        var uploadFiles_1 = this.getFilesInArray(files);
        var eventArgs = {
          customFormData: [],
          currentRequest: null,
          cancel: false
        };
        this.trigger("beforeUpload", eventArgs, function(eventArgs2) {
          if (!eventArgs2.cancel) {
            _this.uploadFiles(uploadFiles_1, custom);
          }
        });
      }
    };
    Uploader2.prototype.getFilesInArray = function(files) {
      var uploadFiles = [];
      if (files instanceof Array) {
        uploadFiles = files;
      } else {
        uploadFiles.push(files);
      }
      return uploadFiles;
    };
    Uploader2.prototype.serverReadFileBase64 = function(fileIndex, position, totalCount) {
      var _this = this;
      return new Promise(function(resolve, reject) {
        var file = _this.fileStreams[fileIndex].rawFile;
        try {
          var reader = new FileReader();
          reader.onload = /* @__PURE__ */ function(args) {
            return function() {
              try {
                var contents = args.result;
                var data = contents ? contents.split(";base64,")[1] : null;
                resolve(data);
              } catch (e) {
                reject(e);
              }
            };
          }(reader);
          reader.readAsDataURL(file.slice(position, position + totalCount));
        } catch (e) {
          reject(e);
        }
      });
    };
    Uploader2.prototype.uploadFileCount = function(ele) {
      var files = this.filesData;
      if (!files || files.length === 0) {
        return -1;
      }
      var result = files.length;
      return result;
    };
    Uploader2.prototype.getFileRead = function(index, ele) {
      var files = this.filesData;
      if (!files || files.length === 0) {
        return -1;
      }
      var file = files[index];
      var fileCount = this.newFileRef++;
      this.fileStreams[fileCount] = file;
      return fileCount;
    };
    Uploader2.prototype.getFileInfo = function(index, ele) {
      var files = this.filesData;
      if (!files || files.length === 0) {
        return null;
      }
      var file = files[index];
      if (!file) {
        return null;
      }
      return this.filesData[index];
    };
    Uploader2.prototype.uploadFiles = function(files, custom) {
      var selectedFiles = [];
      if (this.asyncSettings.saveUrl === "" || isNullOrUndefined(this.asyncSettings.saveUrl)) {
        return;
      }
      if (!custom || isNullOrUndefined(custom)) {
        if (!this.multiple) {
          var file = [];
          file.push(files[0]);
          selectedFiles = this.filterfileList(file);
        } else {
          selectedFiles = this.filterfileList(files);
        }
      } else {
        selectedFiles = files;
      }
      for (var i = 0; i < selectedFiles.length; i++) {
        this.uploadFilesRequest(selectedFiles, i, custom);
      }
    };
    Uploader2.prototype.uploadFilesRequest = function(selectedFiles, i, custom) {
      var _this = this;
      var cloneFiles = [];
      var chunkEnabled = this.checkChunkUpload();
      var ajax = new Ajax(this.asyncSettings.saveUrl, "POST", true, null);
      ajax.emitError = false;
      var getFileData;
      var eventArgs = {
        fileData: selectedFiles[i],
        customFormData: [],
        cancel: false
      };
      var formData = new FormData();
      ajax.beforeSend = function(e) {
        eventArgs.currentRequest = ajax.httpRequest;
        _this.trigger("uploading", eventArgs, function(eventArgs2) {
          if (eventArgs2.cancel) {
            _this.eventCancelByArgs(e, eventArgs2, selectedFiles[i]);
          }
          _this.updateFormData(formData, eventArgs2.customFormData);
        });
      };
      if (selectedFiles[i].statusCode === "1") {
        var name_4 = this.element.getAttribute("name");
        formData.append(name_4, selectedFiles[i].rawFile, selectedFiles[i].name);
        if (chunkEnabled && selectedFiles[i].size > this.asyncSettings.chunkSize) {
          this.chunkUpload(selectedFiles[i], custom, i);
        } else {
          ajax.onLoad = function(e) {
            if (eventArgs.cancel) {
              return {};
            } else {
              _this.uploadComplete(e, selectedFiles[i], custom);
              return {};
            }
          };
          ajax.onUploadProgress = function(e) {
            if (eventArgs.cancel) {
              return {};
            } else {
              _this.uploadInProgress(e, selectedFiles[i], custom, ajax);
              return {};
            }
          };
          ajax.onError = function(e) {
            _this.uploadFailed(e, selectedFiles[i]);
            return {};
          };
          ajax.send(formData);
        }
      }
    };
    Uploader2.prototype.spliceFiles = function(liIndex) {
      var liElement = this.fileList[liIndex];
      var allFiles = this.getFilesData();
      var nameElements = +liElement.getAttribute("data-files-count");
      var startIndex = 0;
      for (var i = 0; i < liIndex; i++) {
        startIndex += +this.fileList[i].getAttribute("data-files-count");
      }
      var endIndex = startIndex + nameElements - 1;
      for (var j = endIndex; j >= startIndex; j--) {
        allFiles.splice(j, 1);
      }
    };
    Uploader2.prototype.remove = function(fileData, customTemplate, removeDirectly, postRawFile, args) {
      var _this = this;
      if (isNullOrUndefined(postRawFile)) {
        postRawFile = true;
      }
      var eventArgs = {
        event: args,
        cancel: false,
        filesData: [],
        customFormData: [],
        postRawFile,
        currentRequest: null
      };
      var beforeEventArgs = {
        cancel: false,
        customFormData: [],
        currentRequest: null
      };
      this.trigger("beforeRemove", beforeEventArgs, function(beforeEventArgs2) {
        if (!beforeEventArgs2.cancel) {
          if (_this.isFormUpload()) {
            eventArgs.filesData = fileData;
            _this.trigger("removing", eventArgs, function(eventArgs2) {
              if (!eventArgs2.cancel) {
                var removingFiles = _this.getFilesInArray(fileData);
                var isLiRemoved = false;
                var liIndex = void 0;
                for (var _i2 = 0, removingFiles_1 = removingFiles; _i2 < removingFiles_1.length; _i2++) {
                  var data = removingFiles_1[_i2];
                  if (!isLiRemoved) {
                    liIndex = _this.fileList.indexOf(data.list);
                  }
                  if (liIndex > -1) {
                    var inputElement = !isNullOrUndefined(data.input) ? data.input : null;
                    if (inputElement) {
                      detach(inputElement);
                    }
                    _this.spliceFiles(liIndex);
                    detach(_this.fileList[liIndex]);
                    _this.fileList.splice(liIndex, 1);
                    isLiRemoved = true;
                    liIndex = -1;
                  }
                }
              }
            });
          } else if (_this.isForm && (isNullOrUndefined(_this.asyncSettings.removeUrl) || _this.asyncSettings.removeUrl === "")) {
            eventArgs.filesData = _this.getFilesData();
            _this.trigger("removing", eventArgs, function(eventArgs2) {
              if (!eventArgs2.cancel) {
                _this.clearAll();
              }
            });
          } else {
            var removeFiles = [];
            fileData = !isNullOrUndefined(fileData) ? fileData : _this.filesData;
            if (fileData instanceof Array) {
              removeFiles = fileData;
            } else {
              removeFiles.push(fileData);
            }
            eventArgs.filesData = removeFiles;
            var removeUrl = _this.asyncSettings.removeUrl;
            var validUrl = removeUrl === "" || isNullOrUndefined(removeUrl) ? false : true;
            var _loop_5 = function(files2) {
              var fileUploadedIndex = _this.uploadedFilesData.indexOf(files2);
              if ((files2.statusCode === "2" || files2.statusCode === "4" || files2.statusCode === "0" && fileUploadedIndex !== -1) && validUrl) {
                _this.removeUploadedFile(files2, eventArgs, removeDirectly, customTemplate);
              } else {
                if (!removeDirectly) {
                  _this.trigger("removing", eventArgs, function(eventArgs2) {
                    if (!eventArgs2.cancel) {
                      _this.removeFilesData(files2, customTemplate);
                    }
                  });
                } else {
                  _this.removeFilesData(files2, customTemplate);
                }
              }
              if (args && !args.target.classList.contains(REMOVE_ICON)) {
                _this.checkActionComplete(false);
              }
            };
            for (var _i = 0, removeFiles_1 = removeFiles; _i < removeFiles_1.length; _i++) {
              var files = removeFiles_1[_i];
              _loop_5(files);
            }
          }
        }
      });
    };
    Uploader2.prototype.clearAll = function() {
      var _this = this;
      if (isNullOrUndefined(this.listParent)) {
        if (this.browserName !== "msie") {
          this.element.value = "";
        }
        this.filesData = [];
        return;
      }
      var eventArgs = {
        cancel: false,
        filesData: this.filesData
      };
      this.trigger("clearing", eventArgs, function(eventArgs2) {
        if (!eventArgs2.cancel) {
          _this.clearData();
          _this.actionCompleteCount = 0;
          _this.count = -1;
        }
      });
    };
    Uploader2.prototype.getFilesData = function(index) {
      if (isNullOrUndefined(index)) {
        return this.filesData;
      } else {
        return this.getSelectedFiles(index);
      }
    };
    Uploader2.prototype.pause = function(fileData, custom) {
      fileData = fileData ? fileData : this.filesData;
      var fileDataFiles = this.getFilesInArray(fileData);
      this.pauseUploading(fileDataFiles, custom);
    };
    Uploader2.prototype.pauseUploading = function(fileData, custom) {
      var files = this.getFiles(fileData);
      for (var i = 0; i < files.length; i++) {
        if (files[i].statusCode === "3") {
          this.pauseUpload(this.getCurrentMetaData(files[i], null), null, custom);
        }
      }
    };
    Uploader2.prototype.getFiles = function(fileData) {
      var files = [];
      if (!isNullOrUndefined(fileData) && !(fileData instanceof Array)) {
        files.push(fileData);
      } else {
        files = fileData;
      }
      return files;
    };
    Uploader2.prototype.resume = function(fileData, custom) {
      fileData = fileData ? fileData : this.filesData;
      var fileDataFiles = this.getFilesInArray(fileData);
      this.resumeFiles(fileDataFiles, custom);
    };
    Uploader2.prototype.resumeFiles = function(fileData, custom) {
      var files = this.getFiles(fileData);
      for (var i = 0; i < files.length; i++) {
        if (files[i].statusCode === "4") {
          this.resumeUpload(this.getCurrentMetaData(files[i], null), null, custom);
        }
      }
    };
    Uploader2.prototype.retry = function(fileData, fromcanceledStage, custom) {
      fileData = fileData ? fileData : this.filesData;
      var fileDataFiles = this.getFilesInArray(fileData);
      if (this.sequentialUpload && this.isFirstFileOnSelection) {
        this.isFirstFileOnSelection = false;
      }
      this.retryFailedFiles(fileDataFiles, fromcanceledStage, custom);
    };
    Uploader2.prototype.retryFailedFiles = function(fileData, fromcanceledStage, custom) {
      var files = this.getFiles(fileData);
      for (var i = 0; i < files.length; i++) {
        if (files[i].statusCode === "5" || files[i].statusCode === "0") {
          if (this.asyncSettings.chunkSize > 0 && this.getCurrentMetaData(files[i], null)) {
            this.retryUpload(this.getCurrentMetaData(files[i], null), fromcanceledStage);
          } else {
            var liElement = void 0;
            if (!custom) {
              liElement = this.fileList[this.filesData.indexOf(files[i])];
            }
            this.reloadcanceledFile(null, files[i], liElement, custom);
          }
        }
      }
    };
    Uploader2.prototype.cancel = function(fileData) {
      fileData = fileData ? fileData : this.filesData;
      var cancelingFiles = this.getFilesInArray(fileData);
      this.cancelUpload(cancelingFiles);
    };
    Uploader2.prototype.cancelUpload = function(fileData) {
      var files = this.getFiles(fileData);
      if (this.asyncSettings.chunkSize > 0) {
        for (var i = 0; i < files.length; i++) {
          if (files[i].statusCode === "3") {
            var metaData = this.getCurrentMetaData(files[i], null);
            metaData.file.statusCode = "5";
            metaData.file.status = this.localizedTexts("fileUploadCancel");
            this.updateMetaData(metaData);
            this.showHideUploadSpinner(files[i]);
          }
        }
      } else {
        for (var i = 0; i < files.length; i++) {
          if (files[i].statusCode === "3") {
            files[i].statusCode = "5";
            files[i].status = this.localizedTexts("fileUploadCancel");
            this.showHideUploadSpinner(files[i]);
          }
        }
      }
    };
    Uploader2.prototype.showHideUploadSpinner = function(files) {
      var liElement = this.getLiElement(files);
      if (!isNullOrUndefined(liElement) && isNullOrUndefined(this.template)) {
        var spinnerTarget = liElement.querySelector("." + ABORT_ICON);
        createSpinner({ target: spinnerTarget, width: "20px" });
        showSpinner(spinnerTarget);
      }
    };
    __decorate8([
      Complex({ saveUrl: "", removeUrl: "" }, AsyncSettings)
    ], Uploader2.prototype, "asyncSettings", void 0);
    __decorate8([
      Property(false)
    ], Uploader2.prototype, "sequentialUpload", void 0);
    __decorate8([
      Property({})
    ], Uploader2.prototype, "htmlAttributes", void 0);
    __decorate8([
      Property("")
    ], Uploader2.prototype, "cssClass", void 0);
    __decorate8([
      Property(true)
    ], Uploader2.prototype, "enabled", void 0);
    __decorate8([
      Property(null)
    ], Uploader2.prototype, "template", void 0);
    __decorate8([
      Property(true)
    ], Uploader2.prototype, "multiple", void 0);
    __decorate8([
      Property(true)
    ], Uploader2.prototype, "autoUpload", void 0);
    __decorate8([
      Property(true)
    ], Uploader2.prototype, "enableHtmlSanitizer", void 0);
    __decorate8([
      Complex({}, ButtonsProps)
    ], Uploader2.prototype, "buttons", void 0);
    __decorate8([
      Property("")
    ], Uploader2.prototype, "allowedExtensions", void 0);
    __decorate8([
      Property(0)
    ], Uploader2.prototype, "minFileSize", void 0);
    __decorate8([
      Property(3e7)
    ], Uploader2.prototype, "maxFileSize", void 0);
    __decorate8([
      Property(null)
    ], Uploader2.prototype, "dropArea", void 0);
    __decorate8([
      Collection([{}], FilesProp)
    ], Uploader2.prototype, "files", void 0);
    __decorate8([
      Property(true)
    ], Uploader2.prototype, "showFileList", void 0);
    __decorate8([
      Property(false)
    ], Uploader2.prototype, "directoryUpload", void 0);
    __decorate8([
      Property("Default")
    ], Uploader2.prototype, "dropEffect", void 0);
    __decorate8([
      Event()
    ], Uploader2.prototype, "created", void 0);
    __decorate8([
      Event()
    ], Uploader2.prototype, "actionComplete", void 0);
    __decorate8([
      Event()
    ], Uploader2.prototype, "rendering", void 0);
    __decorate8([
      Event()
    ], Uploader2.prototype, "beforeUpload", void 0);
    __decorate8([
      Event()
    ], Uploader2.prototype, "fileListRendering", void 0);
    __decorate8([
      Event()
    ], Uploader2.prototype, "selected", void 0);
    __decorate8([
      Event()
    ], Uploader2.prototype, "uploading", void 0);
    __decorate8([
      Event()
    ], Uploader2.prototype, "success", void 0);
    __decorate8([
      Event()
    ], Uploader2.prototype, "failure", void 0);
    __decorate8([
      Event()
    ], Uploader2.prototype, "removing", void 0);
    __decorate8([
      Event()
    ], Uploader2.prototype, "beforeRemove", void 0);
    __decorate8([
      Event()
    ], Uploader2.prototype, "clearing", void 0);
    __decorate8([
      Event()
    ], Uploader2.prototype, "progress", void 0);
    __decorate8([
      Event()
    ], Uploader2.prototype, "change", void 0);
    __decorate8([
      Event()
    ], Uploader2.prototype, "chunkSuccess", void 0);
    __decorate8([
      Event()
    ], Uploader2.prototype, "chunkFailure", void 0);
    __decorate8([
      Event()
    ], Uploader2.prototype, "chunkUploading", void 0);
    __decorate8([
      Event()
    ], Uploader2.prototype, "canceling", void 0);
    __decorate8([
      Event()
    ], Uploader2.prototype, "pausing", void 0);
    __decorate8([
      Event()
    ], Uploader2.prototype, "resuming", void 0);
    Uploader2 = __decorate8([
      NotifyPropertyChanges
    ], Uploader2);
    return Uploader2;
  }(Component)
);

// node_modules/@syncfusion/ej2-splitbuttons/src/common/common.js
var __extends9 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate9 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function getModel(props, model) {
  var obj = extend({}, props);
  for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
    var prop = _a[_i];
    if (model.indexOf(prop) < 0) {
      deleteObject(obj, prop);
    }
  }
  return obj;
}
function upDownKeyHandler(ul, keyCode) {
  var defaultIdx = keyCode === 40 ? 0 : ul.childElementCount - 1;
  var liIdx = defaultIdx;
  var li;
  var selectedLi = ul.querySelector(".e-selected");
  if (selectedLi) {
    selectedLi.classList.remove("e-selected");
  }
  for (var i = 0, len = ul.children.length; i < len; i++) {
    if (ul.children[i].classList.contains("e-focused")) {
      li = ul.children[i];
      liIdx = i;
      li.classList.remove("e-focused");
      if (keyCode === 40) {
        liIdx++;
      } else {
        liIdx--;
      }
      if (liIdx === (keyCode === 40 ? ul.childElementCount : -1)) {
        liIdx = defaultIdx;
      }
    }
  }
  li = ul.children[liIdx];
  liIdx = isValidLI(ul, li, liIdx, keyCode);
  if (liIdx !== -1) {
    addClass([ul.children[liIdx]], "e-focused");
    ul.children[liIdx].focus();
  }
}
function isValidLI(ul, li, index, keyCode, count) {
  if (count === void 0) {
    count = 0;
  }
  if (li.classList.contains("e-separator") || li.classList.contains("e-disabled")) {
    if (index === (keyCode === 40 ? ul.childElementCount - 1 : 0)) {
      index = keyCode === 40 ? 0 : ul.childElementCount - 1;
    } else {
      if (keyCode === 40) {
        index++;
      } else {
        index--;
      }
    }
  }
  li = ul.children[index];
  if (li.classList.contains("e-separator") || li.classList.contains("e-disabled")) {
    count++;
    if (count === ul.childElementCount) {
      return index = -1;
    }
    index = isValidLI(ul, li, index, keyCode, count);
  }
  return index;
}
function setBlankIconStyle(popup, blankIcon) {
  var blankIconList = [].slice.call(popup.getElementsByClassName("e-blank-icon"));
  if (blankIcon) {
    var menuItem = [].slice.call(popup.getElementsByClassName("e-item"));
    menuItem.forEach(function(li) {
      if (li.style.paddingLeft || li.style.paddingRight) {
        li.removeAttribute("style");
      }
    });
  }
  if (!blankIconList.length) {
    return;
  }
  var iconLi = popup.querySelector(".e-item:not(.e-blank-icon):not(.e-separator)");
  if (isNullOrUndefined(iconLi)) {
    return;
  }
  if (iconLi.classList.contains("e-url")) {
    iconLi = iconLi.querySelector(".e-menu-url");
  }
  var icon = iconLi.querySelector(".e-menu-icon");
  var cssProp;
  var enableRtl = popup.classList.contains("e-rtl");
  if (enableRtl) {
    cssProp = { padding: "paddingRight", margin: "marginLeft" };
  } else {
    cssProp = { padding: "paddingLeft", margin: "marginRight" };
  }
  var size = parseInt(getComputedStyle(icon).fontSize, 10) + parseInt(enableRtl ? getComputedStyle(icon)[cssProp.margin] : getComputedStyle(icon)[cssProp.margin], 10) + parseInt(getComputedStyle(iconLi).paddingLeft, 10) + "px";
  blankIconList.forEach(function(li) {
    if (li.classList.contains("e-url")) {
      li.querySelector(".e-menu-url").style[cssProp.padding] = size;
    } else {
      li.style[cssProp.padding] = size;
    }
  });
}
var Item = (
  /** @class */
  function(_super) {
    __extends9(Item2, _super);
    function Item2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate9([
      Property("")
    ], Item2.prototype, "iconCss", void 0);
    __decorate9([
      Property("")
    ], Item2.prototype, "id", void 0);
    __decorate9([
      Property(false)
    ], Item2.prototype, "separator", void 0);
    __decorate9([
      Property("")
    ], Item2.prototype, "text", void 0);
    __decorate9([
      Property("")
    ], Item2.prototype, "url", void 0);
    __decorate9([
      Property(false)
    ], Item2.prototype, "disabled", void 0);
    return Item2;
  }(ChildProperty)
);

// node_modules/@syncfusion/ej2-splitbuttons/src/drop-down-button/drop-down-button.js
var __extends10 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate10 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var classNames2 = {
  DISABLED: "e-disabled",
  FOCUS: "e-focused",
  ICON: "e-menu-icon",
  ITEM: "e-item",
  POPUP: "e-dropdown-popup",
  RTL: "e-rtl",
  SEPARATOR: "e-separator",
  VERTICAL: "e-vertical"
};
var DropDownButton = (
  /** @class */
  function(_super) {
    __extends10(DropDownButton2, _super);
    function DropDownButton2(options, element2) {
      var _this = _super.call(this, options, element2) || this;
      _this.isPopupCreated = true;
      return _this;
    }
    DropDownButton2.prototype.preRender = function() {
    };
    DropDownButton2.prototype.getPersistData = function() {
      return this.addOnPersist([]);
    };
    DropDownButton2.prototype.toggle = function() {
      if (this.canOpen()) {
        this.openPopUp();
      } else if (this.createPopupOnClick && !this.isPopupCreated) {
        this.createPopup();
        this.openPopUp();
      } else {
        this.closePopup();
      }
    };
    DropDownButton2.prototype.render = function() {
      this.initialize();
      if (!this.disabled) {
        this.wireEvents();
      }
      this.renderComplete();
    };
    DropDownButton2.prototype.addItems = function(items, text) {
      var newItem;
      var idx = this.items.length;
      for (var j = 0, len = this.items.length; j < len; j++) {
        if (text === this.items[j].text) {
          idx = j;
          break;
        }
      }
      for (var i = items.length - 1; i >= 0; i--) {
        newItem = new Item(this, "items", items[i], true);
        this.items.splice(idx, 0, newItem);
      }
      if (!this.canOpen()) {
        this.createItems();
      }
    };
    DropDownButton2.prototype.removeItems = function(items, isUniqueId) {
      var refresh = false;
      for (var i = 0, len = items.length; i < len; i++) {
        for (var j = 0, len_1 = this.items.length; j < len_1; j++) {
          if (items[i] === (isUniqueId ? this.items[j].id : this.items[j].text)) {
            this.items.splice(j, 1);
            refresh = true;
            break;
          }
        }
      }
      if (refresh && this.getULElement()) {
        this.createItems();
      }
    };
    DropDownButton2.prototype.createPopup = function() {
      var _a;
      var div = this.createElement("div", {
        className: classNames2.POPUP,
        id: this.element.id + "-popup"
      });
      document.body.appendChild(div);
      this.dropDown = new Popup(div, {
        relateTo: this.element,
        collision: { X: "fit", Y: "flip" },
        position: { X: "left", Y: "bottom" },
        targetType: "relative",
        content: this.target ? this.getTargetElement() : "",
        enableRtl: this.enableRtl
      });
      this.dropDown.element.setAttribute("role", "dialog");
      this.dropDown.element.setAttribute("aria-label", "dropdown menu");
      if (!isNullOrUndefined(this.popupContent)) {
        this.popupContent.style.display = "";
      }
      if (this.dropDown.element.style.position === "fixed") {
        this.dropDown.refreshPosition(this.element);
      }
      this.dropDown.hide();
      attributes(this.element, (_a = {}, _a["aria-haspopup"] = this.items.length || this.target ? "true" : "false", _a["aria-expanded"] = "false", _a["type"] = "button", _a));
      if (this.cssClass) {
        addClass([div], this.cssClass.replace(/\s+/g, " ").trim().split(" "));
      }
      this.isPopupCreated = true;
    };
    DropDownButton2.prototype.getTargetElement = function() {
      if (this.createPopupOnClick && !this.isColorPicker() && !isNullOrUndefined(this.popupContent)) {
        return this.popupContent;
      }
      return typeof this.target === "string" ? select(this.target) : this.target;
    };
    DropDownButton2.prototype.createItems = function(appendItems) {
      var items = this.items;
      var showIcon = this.hasIcon(this.items, "iconCss");
      var span;
      var item;
      var li;
      var eventArgs;
      var ul = this.getULElement();
      if (ul) {
        ul.innerHTML = "";
      } else {
        ul = this.createElement("ul", {
          attrs: { "role": "menu", "tabindex": "0" }
        });
      }
      for (var i = 0; i < items.length; i++) {
        item = items[i];
        var tempItem = item.text;
        li = this.createElement("li", {
          innerHTML: item.url ? "" : tempItem,
          className: item.separator ? classNames2.ITEM + " " + classNames2.SEPARATOR : classNames2.ITEM,
          attrs: item.separator ? { "role": "separator", "tabindex": "-1", "aria-label": "separator", "aria-hidden": "true" } : { "role": "menuitem", "tabindex": "-1", "aria-label": tempItem },
          id: item.id ? item.id : getUniqueID("e-" + this.getModuleName() + "-item")
        });
        if (this.enableHtmlSanitizer) {
          li.textContent = item.url ? "" : tempItem;
        } else {
          li.innerHTML = item.url ? "" : tempItem;
        }
        if (item.url) {
          li.appendChild(this.createAnchor(item));
          li.classList.add("e-url");
        }
        if (item.iconCss) {
          span = this.createElement("span", { className: classNames2.ICON + " " + item.iconCss });
          if (item.url) {
            li.childNodes[0].appendChild(span);
          } else {
            li.insertBefore(span, li.childNodes[0]);
          }
        } else {
          if (showIcon && !item.separator) {
            li.classList.add("e-blank-icon");
          }
        }
        var beforeDisabled = item.disabled;
        if (item.disabled) {
          li.classList.add("e-disabled");
        }
        eventArgs = { item, element: li };
        this.trigger("beforeItemRender", eventArgs);
        var afterDisabled = eventArgs.item.disabled;
        if (beforeDisabled !== afterDisabled) {
          if (eventArgs.item.disabled) {
            li.classList.add("e-disabled");
          } else {
            li.classList.remove("e-disabled");
          }
        }
        ul.appendChild(li);
      }
      if (appendItems) {
        this.getPopUpElement().appendChild(ul);
      }
      if (showIcon) {
        setBlankIconStyle(this.getPopUpElement());
      }
    };
    DropDownButton2.prototype.hasIcon = function(items, field) {
      for (var i = 0, len = items.length; i < len; i++) {
        if (items[i]["" + field]) {
          return true;
        }
      }
      return false;
    };
    DropDownButton2.prototype.createAnchor = function(item) {
      var tempItem = this.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(item.text) : item.text;
      return this.createElement("a", { className: "e-menu-text e-menu-url", innerHTML: tempItem, attrs: { "href": item.url } });
    };
    DropDownButton2.prototype.initialize = function() {
      this.button = new Button({
        iconCss: this.iconCss,
        iconPosition: this.iconPosition,
        cssClass: this.cssClass,
        content: this.content,
        disabled: this.disabled,
        enableRtl: this.enableRtl,
        enablePersistence: this.enablePersistence
      });
      this.button.createElement = this.createElement;
      this.button.appendTo(this.element);
      if (!this.element.id) {
        this.element.id = getUniqueID("e-" + this.getModuleName());
      }
      this.appendArrowSpan();
      this.setActiveElem([this.element]);
      this.element.setAttribute("aria-label", this.element.textContent ? this.element.textContent : "dropdownbutton");
      if (this.target && !this.isColorPicker() && !this.createPopupOnClick || !this.createPopupOnClick) {
        this.createPopup();
      } else {
        this.isPopupCreated = false;
        if (this.target && !this.isColorPicker() && this.createPopupOnClick) {
          this.popupContent = this.getTargetElement();
          this.popupContent.style.display = "none";
        }
      }
    };
    DropDownButton2.prototype.isColorPicker = function() {
      if (!this.element) {
        return false;
      }
      var prevElem = this.element.previousSibling;
      if (prevElem && prevElem.classList && prevElem.classList.contains("e-split-colorpicker")) {
        return true;
      }
      return false;
    };
    DropDownButton2.prototype.appendArrowSpan = function() {
      this.element.appendChild(this.createElement("span", {
        className: "e-btn-icon e-icons e-icon-" + (this.cssClass.indexOf(classNames2.VERTICAL) > -1 ? "bottom" : "right") + " e-caret"
      }));
    };
    DropDownButton2.prototype.setActiveElem = function(elem) {
      this.activeElem = elem;
    };
    DropDownButton2.prototype.getModuleName = function() {
      return "dropdown-btn";
    };
    DropDownButton2.prototype.canOpen = function() {
      var val = false;
      if (this.isPopupCreated) {
        val = this.getPopUpElement().classList.contains("e-popup-close");
      }
      return val;
    };
    DropDownButton2.prototype.destroy = function() {
      var _this = this;
      _super.prototype.destroy.call(this);
      if (this.getModuleName() === "dropdown-btn") {
        var classList_1;
        if (this.element.querySelector("span.e-caret")) {
          detach(this.element.querySelector("span.e-caret"));
        }
        if (this.cssClass) {
          classList_1 = this.cssClass.split(" ");
        }
        this.button.destroy();
        if (classList_1) {
          removeClass([this.element], classList_1);
        }
        removeClass(this.activeElem, ["e-active"]);
        var attrList = this.element.getAttribute("class") ? ["aria-haspopup", "aria-expanded", "aria-owns", "type"] : ["aria-haspopup", "aria-expanded", "aria-owns", "type", "class"];
        attrList.forEach(function(key) {
          _this.element.removeAttribute(key);
        });
        this.popupUnWireEvents();
        this.destroyPopup();
        this.isPopupCreated = false;
        if (!this.disabled) {
          this.unWireEvents();
        }
      }
    };
    DropDownButton2.prototype.destroyPopup = function() {
      if (this.isPopupCreated) {
        this.dropDown.destroy();
        if (this.getPopUpElement()) {
          var popupEle = document.getElementById(this.getPopUpElement().id);
          if (popupEle) {
            removeClass([popupEle], ["e-popup-open", "e-popup-close"]);
            detach(popupEle);
          }
        }
        EventHandler.remove(this.getPopUpElement(), "click", this.clickHandler);
        EventHandler.remove(this.getPopUpElement(), "keydown", this.keyBoardHandler);
        if (this.isPopupCreated && this.dropDown) {
          this.dropDown.element = null;
          this.dropDown = void 0;
        }
      }
      this.isPopupCreated = false;
    };
    DropDownButton2.prototype.getPopUpElement = function() {
      var val = null;
      if (!this.dropDown && this.activeElem[0].classList.contains("e-split-btn")) {
        var dropDownBtn = getComponent(this.activeElem[1], "dropdown-btn");
        if (dropDownBtn) {
          this.dropDown = dropDownBtn.dropDown;
        }
      }
      if (this.dropDown) {
        val = this.dropDown.element;
      }
      return val;
    };
    DropDownButton2.prototype.getULElement = function() {
      var val = null;
      if (this.getPopUpElement()) {
        val = this.getPopUpElement().children[0];
      }
      return val;
    };
    DropDownButton2.prototype.wireEvents = function() {
      this.delegateMousedownHandler = this.mousedownHandler.bind(this);
      if (!this.createPopupOnClick) {
        EventHandler.add(document, "mousedown touchstart", this.delegateMousedownHandler, this);
      }
      EventHandler.add(this.element, "click", this.clickHandler, this);
      EventHandler.add(this.element, "keydown", this.keyBoardHandler, this);
      EventHandler.add(window, "resize", this.windowResize, this);
    };
    DropDownButton2.prototype.windowResize = function() {
      if (!this.canOpen() && this.dropDown) {
        this.dropDown.refreshPosition(this.element);
      }
    };
    DropDownButton2.prototype.popupWireEvents = function() {
      if (!this.delegateMousedownHandler) {
        this.delegateMousedownHandler = this.mousedownHandler.bind(this);
      }
      var popupElement = this.getPopUpElement();
      if (this.createPopupOnClick) {
        EventHandler.add(document, "mousedown touchstart", this.delegateMousedownHandler, this);
      }
      if (popupElement) {
        EventHandler.add(popupElement, "click", this.clickHandler, this);
        EventHandler.add(popupElement, "keydown", this.keyBoardHandler, this);
        if (this.closeActionEvents) {
          EventHandler.add(popupElement, this.closeActionEvents, this.focusoutHandler, this);
        }
      }
      this.rippleFn = rippleEffect(popupElement, { selector: "." + classNames2.ITEM });
    };
    DropDownButton2.prototype.popupUnWireEvents = function() {
      var popupElement = this.getPopUpElement();
      if (this.createPopupOnClick) {
        EventHandler.remove(document, "mousedown touchstart", this.delegateMousedownHandler);
      }
      if (popupElement && popupElement.parentElement) {
        EventHandler.remove(popupElement, "click", this.clickHandler);
        EventHandler.remove(popupElement, "keydown", this.keyBoardHandler);
        if (this.closeActionEvents) {
          EventHandler.remove(popupElement, this.closeActionEvents, this.focusoutHandler);
        }
      }
      if (isRippleEnabled && this.rippleFn) {
        this.rippleFn();
      }
    };
    DropDownButton2.prototype.keyBoardHandler = function(e) {
      if (e.target === this.element && (e.keyCode === 9 || !e.altKey && e.keyCode === 40 || e.keyCode === 38)) {
        return;
      }
      switch (e.keyCode) {
        case 38:
        case 40:
          if (e.altKey && (e.keyCode === 38 || e.keyCode === 40)) {
            this.keyEventHandler(e);
          } else {
            this.upDownKeyHandler(e);
          }
          break;
        case 9:
        case 13:
        case 27:
        case 32:
          this.keyEventHandler(e);
          break;
      }
    };
    DropDownButton2.prototype.upDownKeyHandler = function(e) {
      if (this.target && (e.keyCode === 38 || e.keyCode === 40)) {
        return;
      }
      e.preventDefault();
      upDownKeyHandler(this.getULElement(), e.keyCode);
    };
    DropDownButton2.prototype.keyEventHandler = function(e) {
      if (this.target && (e.keyCode === 13 || e.keyCode === 9)) {
        return;
      }
      if (e.keyCode === 13 && this.activeElem[0].classList.contains("e-split-btn")) {
        this.triggerSelect(e);
        this.activeElem[0].focus();
        return;
      }
      if (e.target && e.target.className.indexOf("e-edit-template") > -1 && e.keyCode === 32) {
        return;
      }
      if (e.keyCode !== 9) {
        e.preventDefault();
      }
      if (e.keyCode === 27 || e.keyCode === 38 || e.keyCode === 9) {
        if (!this.canOpen()) {
          this.closePopup(e, this.element);
        }
      } else {
        this.clickHandler(e);
      }
    };
    DropDownButton2.prototype.getLI = function(elem) {
      return elem.tagName === "LI" ? elem : closest(elem, "li");
    };
    DropDownButton2.prototype.mousedownHandler = function(e) {
      var trgt = e.target;
      if (this.dropDown && !this.canOpen() && !(closest(trgt, '[id="' + this.getPopUpElement().id + '"]') || closest(trgt, '[id="' + this.element.id + '"]'))) {
        this.closePopup(e);
      }
    };
    DropDownButton2.prototype.focusoutHandler = function(e) {
      if (this.isPopupCreated && !this.canOpen()) {
        var liTarget = e.relatedTarget;
        if (liTarget && liTarget.className.indexOf("e-item") > -1) {
          var li = this.getLI(liTarget);
          if (li) {
            var liIdx = Array.prototype.indexOf.call(this.getULElement().children, li);
            var item = this.items[liIdx];
            if (item) {
              var selectEventArgs = { element: li, item, event: e };
              this.trigger("select", selectEventArgs);
            }
          }
        }
        this.closePopup(e);
      }
    };
    DropDownButton2.prototype.clickHandler = function(e) {
      var trgt = e.target;
      if (closest(trgt, '[id="' + this.element.id + '"]')) {
        if (!this.createPopupOnClick || this.target && this.target !== "" && !this.isColorPicker() && !this.createPopupOnClick) {
          if (this.getPopUpElement().classList.contains("e-popup-close")) {
            this.openPopUp(e);
          } else {
            this.closePopup(e);
          }
        } else if (this.isPopupCreated) {
          this.closePopup(e, this.activeElem[0]);
        } else {
          this.createPopup();
          this.openPopUp(e);
        }
      } else {
        if (closest(trgt, '[id="' + this.getPopUpElement().id + '"]')) {
          var li = this.getLI(e.target);
          if (li) {
            this.triggerSelect(e);
            this.closePopup(e, this.activeElem[0]);
          }
        }
      }
    };
    DropDownButton2.prototype.triggerSelect = function(e) {
      var eventArgs;
      var liIdx;
      var item;
      var li = this.getLI(e.target);
      if (li) {
        liIdx = Array.prototype.indexOf.call(this.getULElement().children, li);
        item = this.items[liIdx];
        if (item) {
          eventArgs = { element: li, item, event: e };
          this.trigger("select", eventArgs);
        }
      }
    };
    DropDownButton2.prototype.openPopUp = function(e) {
      var _this = this;
      if (e === void 0) {
        e = null;
      }
      var isReact = false;
      var popupElem = this.getPopUpElement();
      if (!this.target) {
        this.createItems(true);
      } else {
        if (this.activeElem.length > 1) {
          var splitButton = getComponent(this.activeElem[0], "split-btn");
          if (splitButton.isReact && popupElem.childNodes.length < 1) {
            isReact = true;
            splitButton.appendReactElement(this.getTargetElement(), this.getPopUpElement());
            this.renderReactTemplates();
          }
        } else {
          if (this.isReact && popupElem.childNodes.length < 1) {
            isReact = true;
            this.appendReactElement(this.getTargetElement(), this.getPopUpElement());
            this.renderReactTemplates();
          }
        }
      }
      var ul = this.getULElement();
      this.popupWireEvents();
      var beforeOpenArgs = { element: ul, items: this.items, event: e, cancel: false };
      this.trigger("beforeOpen", beforeOpenArgs, function(observedArgs) {
        if (!observedArgs.cancel) {
          var ul_1 = _this.getULElement();
          _this.dropDown.show(null, _this.element);
          addClass([_this.element], "e-active");
          _this.element.setAttribute("aria-expanded", "true");
          _this.element.setAttribute("aria-owns", _this.getPopUpElement().id);
          if (ul_1) {
            ul_1.focus();
          }
          if (_this.enableRtl && ul_1.parentElement.style.left !== "0px") {
            var wrapperWidth = void 0;
            if (_this.element.parentElement && _this.element.parentElement.classList.contains("e-split-btn-wrapper")) {
              wrapperWidth = _this.element.parentElement.offsetWidth;
            } else {
              wrapperWidth = _this.element.offsetWidth;
            }
            var popupRect2 = ul_1.parentElement.offsetWidth - wrapperWidth;
            var popupLeft = parseFloat(ul_1.parentElement.style.left) - popupRect2;
            if (popupLeft < 0) {
              popupLeft = 0;
            }
            ul_1.parentElement.style.left = popupLeft + "px";
          }
          var openArgs = { element: ul_1, items: _this.items };
          _this.trigger("open", openArgs);
        }
      });
    };
    DropDownButton2.prototype.closePopup = function(e, focusEle) {
      var _this = this;
      if (e === void 0) {
        e = null;
      }
      var ul = this.getULElement();
      var beforeCloseArgs = { element: ul, items: this.items, event: e, cancel: false };
      this.trigger("beforeClose", beforeCloseArgs, function(observedArgs) {
        if (!observedArgs.cancel) {
          var popupElement = _this.getPopUpElement();
          if (popupElement) {
            EventHandler.remove(popupElement, "keydown", _this.keyBoardHandler);
          }
          _this.popupUnWireEvents();
          var ul_2 = _this.getULElement();
          var selectedLi = void 0;
          if (ul_2) {
            selectedLi = ul_2.querySelector(".e-selected");
          }
          if (selectedLi) {
            selectedLi.classList.remove("e-selected");
          }
          _this.dropDown.hide();
          removeClass(_this.activeElem, "e-active");
          _this.element.setAttribute("aria-expanded", "false");
          _this.element.removeAttribute("aria-owns");
          if (focusEle) {
            focusEle.focus();
          }
          var closeArgs = { element: ul_2, items: _this.items };
          _this.trigger("close", closeArgs);
          if (!_this.target && ul_2) {
            detach(ul_2);
          }
          if (!_this.target || _this.isColorPicker() || _this.target && !_this.isColorPicker()) {
            if (_this.createPopupOnClick) {
              _this.destroyPopup();
            }
          }
        } else {
          if (ul) {
            ul.focus();
          }
        }
      });
    };
    DropDownButton2.prototype.unWireEvents = function() {
      if (!this.createPopupOnClick) {
        EventHandler.remove(document, "mousedown touchstart", this.delegateMousedownHandler);
      }
      EventHandler.remove(this.element, "click", this.clickHandler);
      EventHandler.remove(this.element, "keydown", this.keyBoardHandler);
      if (this.isPopupCreated) {
        EventHandler.remove(this.getPopUpElement(), "click", this.clickHandler);
        EventHandler.remove(this.getPopUpElement(), "keydown", this.keyBoardHandler);
      }
      EventHandler.remove(window, "resize", this.windowResize);
    };
    DropDownButton2.prototype.onPropertyChanged = function(newProp, oldProp) {
      var btnModel = ["content", "cssClass", "iconCss", "iconPosition", "disabled", "enableRtl"];
      this.button.setProperties(getModel(newProp, btnModel));
      var popupElement;
      if (this.isPopupCreated) {
        popupElement = this.getPopUpElement();
        this.dropDown.setProperties(getModel(newProp, ["enableRtl"]));
      }
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "content":
            if (!this.element.querySelector("span.e-caret")) {
              this.appendArrowSpan();
            }
            break;
          case "disabled":
            if (newProp.disabled) {
              this.unWireEvents();
              if (this.isPopupCreated && !this.canOpen()) {
                this.closePopup();
              }
            } else {
              this.wireEvents();
            }
            break;
          case "cssClass":
            if (newProp.cssClass.indexOf(classNames2.VERTICAL) > -1 || oldProp.cssClass.indexOf(classNames2.VERTICAL) > -1) {
              if (!this.element.querySelector("span.e-caret")) {
                this.appendArrowSpan();
              }
              var arrowSpan = this.element.querySelector("span.e-caret");
              newProp.cssClass.indexOf(classNames2.VERTICAL) > -1 ? classList(arrowSpan, ["e-icon-bottom"], ["e-icon-right"]) : classList(arrowSpan, ["e-icon-right"], ["e-icon-bottom"]);
            }
            if (this.isPopupCreated) {
              if (oldProp.cssClass) {
                removeClass([popupElement], oldProp.cssClass.split(" "));
              }
              if (newProp.cssClass) {
                addClass([popupElement], newProp.cssClass.replace(/\s+/g, " ").trim().split(" "));
              }
            }
            break;
          case "target":
            this.dropDown.content = this.getTargetElement();
            this.dropDown.dataBind();
            break;
          case "items":
            if (this.isPopupCreated && this.getULElement()) {
              this.createItems();
            }
            break;
          case "createPopupOnClick":
            if (newProp.createPopupOnClick) {
              this.destroyPopup();
            } else {
              this.createPopup();
            }
            break;
        }
      }
    };
    DropDownButton2.prototype.focusIn = function() {
      this.element.focus();
    };
    __decorate10([
      Property("")
    ], DropDownButton2.prototype, "content", void 0);
    __decorate10([
      Property("")
    ], DropDownButton2.prototype, "cssClass", void 0);
    __decorate10([
      Property(false)
    ], DropDownButton2.prototype, "disabled", void 0);
    __decorate10([
      Property("")
    ], DropDownButton2.prototype, "iconCss", void 0);
    __decorate10([
      Property("Left")
    ], DropDownButton2.prototype, "iconPosition", void 0);
    __decorate10([
      Property(false)
    ], DropDownButton2.prototype, "enableHtmlSanitizer", void 0);
    __decorate10([
      Collection([], Item)
    ], DropDownButton2.prototype, "items", void 0);
    __decorate10([
      Property(false)
    ], DropDownButton2.prototype, "createPopupOnClick", void 0);
    __decorate10([
      Property("")
    ], DropDownButton2.prototype, "target", void 0);
    __decorate10([
      Property("")
    ], DropDownButton2.prototype, "closeActionEvents", void 0);
    __decorate10([
      Event()
    ], DropDownButton2.prototype, "beforeItemRender", void 0);
    __decorate10([
      Event()
    ], DropDownButton2.prototype, "beforeOpen", void 0);
    __decorate10([
      Event()
    ], DropDownButton2.prototype, "beforeClose", void 0);
    __decorate10([
      Event()
    ], DropDownButton2.prototype, "close", void 0);
    __decorate10([
      Event()
    ], DropDownButton2.prototype, "open", void 0);
    __decorate10([
      Event()
    ], DropDownButton2.prototype, "select", void 0);
    __decorate10([
      Event()
    ], DropDownButton2.prototype, "created", void 0);
    DropDownButton2 = __decorate10([
      NotifyPropertyChanges
    ], DropDownButton2);
    return DropDownButton2;
  }(Component)
);

// node_modules/@syncfusion/ej2-splitbuttons/src/split-button/split-button.js
var __extends11 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate11 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RTL4 = "e-rtl";
var TAGNAME = "EJS-SPLITBUTTON";
var SplitButton = (
  /** @class */
  function(_super) {
    __extends11(SplitButton2, _super);
    function SplitButton2(options, element2) {
      return _super.call(this, options, element2) || this;
    }
    SplitButton2.prototype.preRender = function() {
      var ele = this.element;
      if (ele.tagName === TAGNAME) {
        var ejInstance = getValue("ej2_instances", ele);
        var btn = this.createElement("button", { attrs: { "type": "button" } });
        var wrapper = this.createElement(TAGNAME, { className: "e-" + this.getModuleName() + "-wrapper" });
        for (var idx = 0, len = ele.attributes.length; idx < len; idx++) {
          btn.setAttribute(ele.attributes[idx].nodeName, ele.attributes[idx].nodeValue);
        }
        ele.parentNode.insertBefore(wrapper, ele);
        detach(ele);
        ele = btn;
        wrapper.appendChild(ele);
        setValue("ej2_instances", ejInstance, ele);
        this.wrapper = wrapper;
        this.element = ele;
      }
      if (!this.element.id) {
        this.element.id = getUniqueID("e-" + this.getModuleName());
      }
    };
    SplitButton2.prototype.render = function() {
      this.initWrapper();
      this.createPrimaryButton();
      this.renderControl();
    };
    SplitButton2.prototype.renderControl = function() {
      this.createSecondaryButton();
      this.setActiveElem([this.element, this.secondaryBtnObj.element]);
      this.setAria();
      this.wireEvents();
      this.renderComplete();
    };
    SplitButton2.prototype.addItems = function(items, text) {
      _super.prototype.addItems.call(this, items, text);
      this.secondaryBtnObj.items = this.items;
    };
    SplitButton2.prototype.removeItems = function(items, isUniqueId) {
      _super.prototype.removeItems.call(this, items, isUniqueId);
      this.secondaryBtnObj.items = this.items;
    };
    SplitButton2.prototype.initWrapper = function() {
      if (!this.wrapper) {
        this.wrapper = this.createElement("div", { className: "e-" + this.getModuleName() + "-wrapper" });
        this.element.parentNode.insertBefore(this.wrapper, this.element);
      }
      this.element.classList.remove("e-" + this.getModuleName());
      if (this.enableRtl) {
        this.wrapper.classList.add(RTL4);
      }
      if (this.cssClass) {
        addClass([this.wrapper], this.cssClass.replace(/\s+/g, " ").trim().split(" "));
      }
    };
    SplitButton2.prototype.createPrimaryButton = function() {
      var btnModel = {
        cssClass: this.cssClass,
        enableRtl: this.enableRtl,
        iconCss: this.iconCss,
        iconPosition: this.iconPosition,
        content: this.content,
        disabled: this.disabled
      };
      this.primaryBtnObj = new Button(btnModel);
      this.primaryBtnObj.createElement = this.createElement;
      this.primaryBtnObj.appendTo(this.element);
      this.element.classList.add("e-" + this.getModuleName());
      this.element.type = "button";
      this.wrapper.appendChild(this.element);
    };
    SplitButton2.prototype.createSecondaryButton = function() {
      var _this = this;
      var btnElem = this.createElement("button", {
        className: "e-icon-btn",
        attrs: { "tabindex": "-1" },
        id: this.element.id + "_dropdownbtn"
      });
      this.wrapper.appendChild(btnElem);
      var dropDownBtnModel = {
        cssClass: this.cssClass,
        disabled: this.disabled,
        enableRtl: this.enableRtl,
        items: this.items,
        target: this.target,
        createPopupOnClick: this.createPopupOnClick
      };
      dropDownBtnModel.beforeItemRender = function(args) {
        if (_this.createPopupOnClick) {
          _this.secondaryBtnObj.dropDown.relateTo = _this.wrapper;
          _this.dropDown = _this.secondaryBtnObj.dropDown;
        }
        _this.trigger("beforeItemRender", args);
      };
      dropDownBtnModel.open = function(args) {
        _this.trigger("open", args);
      };
      dropDownBtnModel.close = function(args) {
        _this.trigger("close", args);
      };
      dropDownBtnModel.select = function(args) {
        _this.trigger("select", args);
      };
      dropDownBtnModel.beforeOpen = function(args) {
        if (_this.createPopupOnClick && _this.items.length == 0) {
          _this.secondaryBtnObj.dropDown.relateTo = _this.wrapper;
          _this.dropDown = _this.secondaryBtnObj.dropDown;
        }
        var callBackPromise = new Deferred();
        _this.trigger("beforeOpen", args, function(observedArgs) {
          callBackPromise.resolve(observedArgs);
        });
        return callBackPromise;
      };
      dropDownBtnModel.beforeClose = function(args) {
        var callBackPromise = new Deferred();
        _this.trigger("beforeClose", args, function(observedArgs) {
          callBackPromise.resolve(observedArgs);
        });
        return callBackPromise;
      };
      this.secondaryBtnObj = new DropDownButton(dropDownBtnModel);
      this.secondaryBtnObj.createElement = this.createElement;
      this.secondaryBtnObj.appendTo(btnElem);
      if (!this.createPopupOnClick) {
        this.secondaryBtnObj.dropDown.relateTo = this.wrapper;
        this.dropDown = this.secondaryBtnObj.dropDown;
      }
      this.isPopupCreated = this.secondaryBtnObj.isPopupCreated;
      this.secondaryBtnObj.activeElem = [this.element, this.secondaryBtnObj.element];
      this.secondaryBtnObj.element.querySelector(".e-btn-icon").classList.remove("e-icon-right");
      if (this.disabled) {
        this.wrapper.classList.add("e-splitbtn-disabled");
      }
    };
    SplitButton2.prototype.setAria = function() {
      attributes(this.element, {
        "aria-expanded": "false",
        "aria-haspopup": "true",
        "aria-label": this.element.textContent ? this.element.textContent + " splitbutton" : "splitbutton",
        "aria-owns": this.element.id + "_dropdownbtn-popup"
      });
    };
    SplitButton2.prototype.getModuleName = function() {
      return "split-btn";
    };
    SplitButton2.prototype.toggle = function() {
      this.secondaryBtnObj.toggle();
    };
    SplitButton2.prototype.destroy = function() {
      var _this = this;
      var classList2 = [RTL4];
      if (this.cssClass) {
        classList2 = classList2.concat(this.cssClass.split(" "));
      }
      if (this.element) {
        var element2 = document.getElementById(this.element.id);
        if (element2 && element2.parentElement === this.wrapper) {
          if (this.wrapper.tagName === TAGNAME) {
            this.wrapper.innerHTML = "";
            removeClass([this.wrapper], ["e-rtl", "e-" + this.getModuleName() + "-wrapper"]);
            removeClass([this.wrapper], this.cssClass.split(" "));
          } else {
            removeClass([this.element], classList2);
            ["aria-label", "aria-haspopup", "aria-expanded", "aria-owns", "type"].forEach(function(key) {
              _this.element.removeAttribute(key);
            });
            this.wrapper.parentNode.insertBefore(this.element, this.wrapper);
            remove(this.wrapper);
          }
          this.unWireEvents();
        }
      }
      this.primaryBtnObj.destroy();
      this.secondaryBtnObj.destroy();
      _super.prototype.destroy.call(this);
      if (this.element && !this.element.getAttribute("class")) {
        this.element.removeAttribute("class");
      }
      if (this.refreshing && this.isAngular) {
        this.element = this.wrapper;
        ["e-control", "e-split-btn", "e-lib"].forEach(function(key) {
          _this.element.classList.add(key);
        });
        setValue("ej2_instances", [this], this.element);
      }
      this.wrapper = null;
    };
    SplitButton2.prototype.wireEvents = function() {
      EventHandler.add(this.element, "click", this.primaryBtnClickHandler, this);
      new KeyboardEvents(this.element, {
        keyAction: this.btnKeyBoardHandler.bind(this),
        keyConfigs: {
          altdownarrow: "alt+downarrow",
          enter: "enter"
        }
      });
    };
    SplitButton2.prototype.unWireEvents = function() {
      EventHandler.remove(this.element, "click", this.primaryBtnClickHandler);
      getInstance(this.element, KeyboardEvents).destroy();
    };
    SplitButton2.prototype.primaryBtnClickHandler = function() {
      this.trigger("click", { element: this.element });
    };
    SplitButton2.prototype.btnKeyBoardHandler = function(e) {
      switch (e.action) {
        case "altdownarrow":
          this.clickHandler(e);
          break;
        case "enter":
          this.clickHandler(e);
          if (this.getPopUpElement() && !this.getPopUpElement().classList.contains("e-popup-close")) {
            this.element.classList.remove("e-active");
            this.secondaryBtnObj.element.classList.add("e-active");
          } else {
            this.secondaryBtnObj.element.classList.remove("e-active");
          }
          break;
      }
    };
    SplitButton2.prototype.onPropertyChanged = function(newProp, oldProp) {
      var model = ["content", "iconCss", "iconPosition", "cssClass", "disabled", "enableRtl"];
      this.primaryBtnObj.setProperties(getModel(newProp, model));
      model = [
        "beforeOpen",
        "beforeItemRender",
        "select",
        "open",
        "close",
        "cssClass",
        "disabled",
        "enableRtl",
        "createPopupOnClick"
      ];
      if (Object.keys(newProp).indexOf("items") > -1) {
        this.secondaryBtnObj.items = newProp.items;
        this.secondaryBtnObj.dataBind();
      }
      this.secondaryBtnObj.setProperties(getModel(newProp, model));
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "cssClass":
            if (oldProp.cssClass) {
              removeClass([this.wrapper], oldProp.cssClass.split(" "));
            }
            addClass([this.wrapper], newProp.cssClass.replace(/\s+/g, " ").trim().split(" "));
            break;
          case "enableRtl":
            if (newProp.enableRtl) {
              addClass([this.wrapper], RTL4);
            } else {
              removeClass([this.wrapper], RTL4);
            }
            break;
          case "disabled":
            if (newProp.disabled) {
              addClass([this.wrapper], "e-splitbtn-disabled");
            } else {
              removeClass([this.wrapper], "e-splitbtn-disabled");
            }
        }
      }
    };
    SplitButton2.prototype.focusIn = function() {
      this.element.focus();
    };
    __decorate11([
      Property("")
    ], SplitButton2.prototype, "content", void 0);
    __decorate11([
      Property("")
    ], SplitButton2.prototype, "cssClass", void 0);
    __decorate11([
      Property(false)
    ], SplitButton2.prototype, "disabled", void 0);
    __decorate11([
      Property("")
    ], SplitButton2.prototype, "iconCss", void 0);
    __decorate11([
      Property("Left")
    ], SplitButton2.prototype, "iconPosition", void 0);
    __decorate11([
      Property(false)
    ], SplitButton2.prototype, "createPopupOnClick", void 0);
    __decorate11([
      Collection([], Item)
    ], SplitButton2.prototype, "items", void 0);
    __decorate11([
      Property("")
    ], SplitButton2.prototype, "target", void 0);
    __decorate11([
      Event()
    ], SplitButton2.prototype, "beforeItemRender", void 0);
    __decorate11([
      Event()
    ], SplitButton2.prototype, "beforeOpen", void 0);
    __decorate11([
      Event()
    ], SplitButton2.prototype, "beforeClose", void 0);
    __decorate11([
      Event()
    ], SplitButton2.prototype, "click", void 0);
    __decorate11([
      Event()
    ], SplitButton2.prototype, "close", void 0);
    __decorate11([
      Event()
    ], SplitButton2.prototype, "open", void 0);
    __decorate11([
      Event()
    ], SplitButton2.prototype, "select", void 0);
    __decorate11([
      Event()
    ], SplitButton2.prototype, "created", void 0);
    SplitButton2 = __decorate11([
      NotifyPropertyChanges
    ], SplitButton2);
    return SplitButton2;
  }(DropDownButton)
);
var Deferred = (
  /** @class */
  /* @__PURE__ */ function() {
    function Deferred2() {
      var _this = this;
      this.promise = new Promise(function(resolve, reject) {
        _this.resolve = resolve;
        _this.reject = reject;
      });
      this.catch = this.promise.catch.bind(this.promise);
      this.then = this.promise.then.bind(this.promise);
    }
    return Deferred2;
  }()
);

// node_modules/@syncfusion/ej2-splitbuttons/src/progress-button/progress-button.js
var __extends12 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate12 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HIDESPINNER = "e-hide-spinner";
var PROGRESS = "e-progress";
var PROGRESSACTIVE = "e-progress-active";
var CONTENTCLS = "e-btn-content";
var SpinSettings = (
  /** @class */
  function(_super) {
    __extends12(SpinSettings2, _super);
    function SpinSettings2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate12([
      Property(null)
    ], SpinSettings2.prototype, "template", void 0);
    __decorate12([
      Property(16)
    ], SpinSettings2.prototype, "width", void 0);
    __decorate12([
      Property("Left")
    ], SpinSettings2.prototype, "position", void 0);
    return SpinSettings2;
  }(ChildProperty)
);
var AnimationSettings2 = (
  /** @class */
  function(_super) {
    __extends12(AnimationSettings3, _super);
    function AnimationSettings3() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate12([
      Property(400)
    ], AnimationSettings3.prototype, "duration", void 0);
    __decorate12([
      Property("None")
    ], AnimationSettings3.prototype, "effect", void 0);
    __decorate12([
      Property("ease")
    ], AnimationSettings3.prototype, "easing", void 0);
    return AnimationSettings3;
  }(ChildProperty)
);
var ProgressButton = (
  /** @class */
  function(_super) {
    __extends12(ProgressButton2, _super);
    function ProgressButton2(options, element2) {
      var _this = _super.call(this, options, element2) || this;
      _this.step = 1;
      return _this;
    }
    ProgressButton2.prototype.preRender = function() {
      _super.prototype.preRender.call(this);
    };
    ProgressButton2.prototype.render = function() {
      _super.prototype.render.call(this);
      this.init();
      this.wireEvents();
      this.setAria();
      this.renderComplete();
    };
    ProgressButton2.prototype.start = function(percent) {
      this.isPaused = false;
      this.startProgress(percent ? percent : this.percent, this.progressTime);
    };
    ProgressButton2.prototype.stop = function() {
      this.isPaused = true;
      cancelAnimationFrame(this.timerId);
    };
    ProgressButton2.prototype.progressComplete = function() {
      this.isPaused = false;
      this.finishProgress();
    };
    ProgressButton2.prototype.getModuleName = function() {
      return "progress-btn";
    };
    ProgressButton2.prototype.destroy = function() {
      var _this = this;
      var classList2 = [
        HIDESPINNER,
        PROGRESSACTIVE,
        "e-round-corner",
        "e-" + _super.prototype.getModuleName.call(this),
        "e-spin-" + this.spinSettings.position.toLowerCase()
      ];
      _super.prototype.destroy.call(this);
      this.unWireEvents();
      this.element.innerHTML = "";
      if (this.cssClass) {
        classList2 = classList2.concat(this.cssClass.split(" "));
      }
      removeClass([this.element], classList2);
      var css = this.element.getAttribute("class") ? ["aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow"] : ["aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "class"];
      css.forEach(function(key) {
        _this.element.removeAttribute(key);
      });
      if (this.disabled) {
        this.element.removeAttribute("disabled");
      }
    };
    ProgressButton2.prototype.init = function() {
      this.element.classList.add("e-" + _super.prototype.getModuleName.call(this));
      this.setContent();
      this.createSpinner();
      if (this.enableProgress) {
        this.createProgress();
      }
    };
    ProgressButton2.prototype.createSpinner = function() {
      var spinner = this.createElement("span", { className: "e-spinner" });
      this.setSpinPosition(spinner);
      createSpinner({
        target: spinner,
        width: this.spinSettings.width || 16,
        template: this.spinSettings.template
      }, this.createElement);
    };
    ProgressButton2.prototype.getSpinner = function() {
      return this.element.getElementsByClassName("e-spinner")[0];
    };
    ProgressButton2.prototype.getProgress = function() {
      return this.element.getElementsByClassName(PROGRESS)[0];
    };
    ProgressButton2.prototype.setSpinPosition = function(ele) {
      var position = this.spinSettings.position || "Left";
      if (position === "Left" || position === "Top") {
        this.element.insertBefore(ele, this.element.getElementsByClassName(CONTENTCLS)[0]);
      } else {
        this.element.appendChild(ele);
      }
      this.element.classList.add("e-spin-" + position.toLowerCase());
    };
    ProgressButton2.prototype.createProgress = function() {
      this.element.appendChild(this.createElement("span", { className: PROGRESS }));
    };
    ProgressButton2.prototype.setContent = function() {
      var cont;
      cont = this.element.innerHTML;
      if (this.enableHtmlSanitizer) {
        cont = SanitizeHtmlHelper.sanitize(this.element.innerHTML);
      }
      this.element.innerHTML = "";
      this.element.appendChild(this.createElement("span", { className: CONTENTCLS, innerHTML: cont }));
    };
    ProgressButton2.prototype.setContentIcon = function(content) {
      var contElem = this.createElement("span", { className: CONTENTCLS, innerHTML: content });
      if (this.iconCss) {
        var span = this.createElement("span", { className: "e-btn-icon " + this.iconCss });
        if (!this.element.textContent.trim()) {
          this.element.classList.add("e-icon-btn");
        } else {
          span.classList.add("e-icon-" + this.iconPosition.toLowerCase());
          if (this.iconPosition === "Top" || this.iconPosition === "Bottom") {
            this.element.classList.add("e-" + this.iconPosition.toLowerCase() + "-icon-btn");
          }
        }
        var node = contElem.childNodes[0];
        if (node && (this.iconPosition === "Left" || this.iconPosition === "Top")) {
          contElem.insertBefore(span, node);
        } else {
          contElem.appendChild(span);
        }
      }
      this.element.appendChild(contElem);
    };
    ProgressButton2.prototype.clickHandler = function() {
      if (this.element.classList.contains(PROGRESSACTIVE)) {
        return;
      }
      this.startProgress();
    };
    ProgressButton2.prototype.startProgress = function(percent, progressTime) {
      var clsList = this.element.classList;
      var isVertical = clsList.contains("e-vertical");
      clsList.add(PROGRESSACTIVE);
      if (!clsList.contains(HIDESPINNER)) {
        showSpinner(this.element.querySelector(".e-spinner"));
      }
      this.startAnimate(Date.now(), progressTime ? progressTime : 0, progressTime ? Date.now() - this.duration * 1 / 100 : Date.now(), percent ? percent : 0, 0, this.step, 0, isVertical);
      this.startContAnimate();
    };
    ProgressButton2.prototype.startAnimate = function(timestamp, progressTime, prevTime, percent, prevPercent, step, prevProgressTime, isVertical) {
      var _this = this;
      try {
        var timeDiff = timestamp - prevTime;
        var stepTime = this.duration * step / 100;
        var timeDiffBuffer_1 = timeDiff ? timeDiff < stepTime ? timeDiff - stepTime : timeDiff % stepTime : 0;
        this.progressTime = progressTime = progressTime + timeDiff - timeDiffBuffer_1;
        prevTime = timestamp - timeDiffBuffer_1;
        percent = percent + (timeDiff - timeDiffBuffer_1) / this.duration * 100;
        prevPercent = (progressTime - prevProgressTime) % stepTime === 0 || percent === 100 ? percent : prevPercent;
        var args = { percent: prevPercent, currentDuration: progressTime, step };
        this.eIsVertical = isVertical;
        if (percent === 0) {
          this.trigger("begin", args, function(observedArgs) {
            _this.successCallback(observedArgs, percent, prevPercent, progressTime, prevProgressTime, timeDiffBuffer_1, prevTime);
          });
        } else if (percent === 100 || progressTime === this.duration) {
          this.trigger("end", args, function(observedArgs) {
            _this.successCallback(observedArgs, percent, prevPercent, progressTime, prevProgressTime, timeDiffBuffer_1, prevTime);
          });
        } else {
          this.trigger("progress", args, function(observedArgs) {
            _this.successCallback(observedArgs, percent, prevPercent, progressTime, prevProgressTime, timeDiffBuffer_1, prevTime);
          });
        }
      } catch (e) {
        cancelAnimationFrame(this.timerId);
        this.trigger("fail", e);
      }
    };
    ProgressButton2.prototype.successCallback = function(args, perc, pPerc, prgTim, pPrgTim, timDif, pTim) {
      var _this = this;
      var percent = perc;
      var prevPercent = pPerc;
      var timeDiffBuffer = timDif;
      var progressTime = prgTim;
      var prevProgressTime = pPrgTim;
      var prevTime = pTim;
      var isVertical = this.eIsVertical;
      if (percent !== args.percent && args.percent !== prevPercent) {
        percent = args.percent;
      }
      this.percent = percent;
      this.step = args.step;
      if ((progressTime - prevProgressTime) % (this.duration * args.step / 100) === 0 || percent === 100) {
        this.timerId = requestAnimationFrame(function() {
          if (_this.enableProgress && _this.getProgress()) {
            _this.getProgress().style[isVertical ? "height" : "width"] = percent + "%";
          }
          _this.element.setAttribute("aria-valuenow", percent.toString());
        });
        prevPercent = percent;
        prevProgressTime = progressTime;
      }
      if (!this.isPaused) {
        if (progressTime < this.duration && percent < 100) {
          this.interval = window.setTimeout(function() {
            _this.startAnimate(Date.now(), progressTime, prevTime, percent, prevPercent, args.step, prevProgressTime, isVertical);
          }, this.duration / 100 - timeDiffBuffer);
        } else {
          this.interval = window.setTimeout(function() {
            _this.progressTime = _this.percent = 0;
            if (_this.enableProgress && _this.getProgress()) {
              _this.getProgress().style[isVertical ? "height" : "width"] = "0%";
            }
            _this.element.setAttribute("aria-valuenow", "0");
            _this.hideSpin();
          }, 100);
        }
      }
    };
    ProgressButton2.prototype.startContAnimate = function() {
      var _this = this;
      var ele = this.element.getElementsByClassName(CONTENTCLS)[0];
      if (this.animationSettings.effect !== "None") {
        new Animation({}).animate(ele, {
          duration: this.animationSettings.duration === 0 && animationMode === "Enable" ? 400 : this.animationSettings.duration,
          name: "Progress" + this.animationSettings.effect,
          timingFunction: this.animationSettings.easing,
          begin: function() {
            if (_this.spinSettings.position === "Center") {
              _this.setSpinnerSize();
            }
          },
          end: function() {
            ele.classList.add("e-animate-end");
          }
        });
      } else if (this.spinSettings.position === "Center") {
        this.setSpinnerSize();
      }
    };
    ProgressButton2.prototype.finishProgress = function() {
      var clsList = this.element.classList;
      var isVertical = clsList.contains("e-vertical");
      clsList.add(PROGRESSACTIVE);
      var count = 100;
      for (var i = this.percent; i < count; i++) {
        i += 10;
        if (i > 100) {
          i = 100;
        }
        if (this.enableProgress && this.getProgress()) {
          this.getProgress().style[isVertical ? "height" : "width"] = this.percent < 100 ? i + "%" : "100%";
        }
      }
      this.element.setAttribute("aria-valuenow", "0");
      this.hideSpin();
      var args = { step: this.step, currentDuration: this.progressTime, percent: 100 };
      clearTimeout(this.interval);
      this.trigger("end", args);
      this.progressTime = this.percent = 0;
    };
    ProgressButton2.prototype.setSpinnerSize = function() {
      var ele = this.element.getElementsByClassName(CONTENTCLS)[0];
      var spinner = this.getSpinner();
      spinner.style.width = Math.max(spinner.offsetWidth, ele.offsetWidth) + "px";
      spinner.style.height = Math.max(spinner.offsetHeight, ele.offsetHeight) + "px";
      ele.classList.add("e-cont-animate");
    };
    ProgressButton2.prototype.hideSpin = function() {
      var cont = this.element.getElementsByClassName(CONTENTCLS)[0];
      if (!this.element.classList.contains(HIDESPINNER)) {
        hideSpinner(this.element.querySelector(".e-spinner"));
      }
      this.element.classList.remove(PROGRESSACTIVE);
      if (this.animationSettings.effect !== "None") {
        cont.classList.remove("e-animate-end");
      }
      if (this.spinSettings.position === "Center") {
        var ele = this.getSpinner();
        cont.classList.remove("e-cont-animate");
        ele.style.width = "auto";
        ele.style.height = "auto";
      }
    };
    ProgressButton2.prototype.setIconSpan = function() {
      var cont = this.element.getElementsByClassName(CONTENTCLS)[0];
      var iconSpan = this.element.getElementsByClassName("e-btn-icon")[0];
      if (cont.childNodes[0] && (this.iconPosition === "Left" || this.iconPosition === "Top")) {
        cont.insertBefore(iconSpan, cont.childNodes[0]);
      } else {
        cont.appendChild(iconSpan);
      }
    };
    ProgressButton2.prototype.setAria = function() {
      attributes(this.element, {
        "aria-label": this.element.textContent + " progress"
      });
    };
    ProgressButton2.prototype.wireEvents = function() {
      EventHandler.add(this.element, "click", this.clickHandler, this);
    };
    ProgressButton2.prototype.unWireEvents = function() {
      EventHandler.remove(this.element, "click", this.clickHandler);
    };
    ProgressButton2.prototype.onPropertyChanged = function(newProp, oldProp) {
      var ele = this.element;
      var isSpinning = false;
      var clsList = this.element.querySelector(".e-spinner-pane").classList;
      if (clsList.contains("e-spin-show")) {
        isSpinning = true;
      }
      _super.prototype.onPropertyChanged.call(this, newProp, oldProp);
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "content":
            this.setContent();
            this.createSpinner();
            if (isSpinning) {
              showSpinner(this.element.querySelector(".e-spinner"));
              isSpinning = false;
            }
            if (this.enableProgress) {
              this.createProgress();
            }
            ele.setAttribute("aria-label", ele.textContent + " progress");
            break;
          case "iconCss":
            if (!oldProp.iconCss) {
              this.setIconSpan();
            }
            break;
          case "iconPosition":
            this.setIconSpan();
            break;
          case "enableProgress":
            if (newProp.enableProgress) {
              this.createProgress();
            } else {
              remove(this.getProgress());
            }
            break;
          case "spinSettings":
            if (newProp.spinSettings.position) {
              ele.classList.remove("e-spin-" + oldProp.spinSettings.position.toLowerCase());
              this.setSpinPosition(this.getSpinner());
            }
            if (newProp.spinSettings.template || newProp.spinSettings.width) {
              ele.removeChild(this.getSpinner());
              this.createSpinner();
            }
            break;
        }
      }
    };
    ProgressButton2.prototype.focusIn = function() {
      this.element.focus();
    };
    __decorate12([
      Property(false)
    ], ProgressButton2.prototype, "enableProgress", void 0);
    __decorate12([
      Property(2e3)
    ], ProgressButton2.prototype, "duration", void 0);
    __decorate12([
      Property("Left")
    ], ProgressButton2.prototype, "iconPosition", void 0);
    __decorate12([
      Property("")
    ], ProgressButton2.prototype, "iconCss", void 0);
    __decorate12([
      Property(false)
    ], ProgressButton2.prototype, "disabled", void 0);
    __decorate12([
      Property(false)
    ], ProgressButton2.prototype, "isPrimary", void 0);
    __decorate12([
      Property("")
    ], ProgressButton2.prototype, "cssClass", void 0);
    __decorate12([
      Property("")
    ], ProgressButton2.prototype, "content", void 0);
    __decorate12([
      Property(false)
    ], ProgressButton2.prototype, "isToggle", void 0);
    __decorate12([
      Property(false)
    ], ProgressButton2.prototype, "enableHtmlSanitizer", void 0);
    __decorate12([
      Complex({}, SpinSettings)
    ], ProgressButton2.prototype, "spinSettings", void 0);
    __decorate12([
      Complex({}, AnimationSettings2)
    ], ProgressButton2.prototype, "animationSettings", void 0);
    __decorate12([
      Event()
    ], ProgressButton2.prototype, "created", void 0);
    __decorate12([
      Event()
    ], ProgressButton2.prototype, "begin", void 0);
    __decorate12([
      Event()
    ], ProgressButton2.prototype, "progress", void 0);
    __decorate12([
      Event()
    ], ProgressButton2.prototype, "end", void 0);
    __decorate12([
      Event()
    ], ProgressButton2.prototype, "fail", void 0);
    ProgressButton2 = __decorate12([
      NotifyPropertyChanges
    ], ProgressButton2);
    return ProgressButton2;
  }(Button)
);

// node_modules/@syncfusion/ej2-inputs/src/color-picker/color-picker.js
var __extends13 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate13 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var APPLY = "e-apply";
var CANCEL = "e-cancel";
var CURRENT = "e-current";
var CONTAINER = "e-container";
var CTRLBTN = "e-ctrl-btn";
var CTRLSWITCH = "e-switch-ctrl-btn";
var DISABLED2 = "e-disabled";
var FORMATSWITCH = "e-value-switch-btn";
var HANDLER = "e-handler";
var HEX = "e-hex";
var HIDEHEX = "e-hide-hex-value";
var HIDEOPACITY = "e-hide-opacity";
var HIDERGBA = "e-hide-switchable-value";
var HIDEVALUE = "e-hide-value";
var HIDEVALUESWITCH = "e-hide-valueswitcher";
var HSVAREA = "e-hsv-color";
var HSVCONTAINER = "e-hsv-container";
var INPUTWRAPPER = "e-selected-value";
var MODESWITCH = "e-mode-switch-btn";
var NOCOLOR = "e-nocolor-item";
var OPACITY = "e-opacity-value";
var PALETTES = "e-palette";
var PALETTECONTENT = "e-color-palette";
var PICKERCONTENT = "e-color-picker";
var PREVIEW = "e-preview-container";
var PREVIOUS = "e-previous";
var RTL5 = "e-rtl";
var SHOWVALUE = "e-show-value";
var SELECT = "e-selected";
var SPLITPREVIEW = "e-split-preview";
var TILE = "e-tile";
var presets = {
  default: [
    "#000000",
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#ffeb3b",
    "#ffffff",
    "#ffebee",
    "#fce4ec",
    "#f3e5f5",
    "#ede7f6",
    "#e3f2fd",
    "#e1f5fe",
    "#e0f7fa",
    "#e0f2f1",
    "#fffde7",
    "#f2f2f2",
    "#ffcdd2",
    "#f8bbd0",
    "#e1bee7",
    "#d1c4e9",
    "#bbdefb",
    "#b3e5fc",
    "#b2ebf2",
    "#b2dfdb",
    "#fff9c4",
    "#e6e6e6",
    "#ef9a9a",
    "#f48fb1",
    "#ce93d8",
    "#b39ddb",
    "#90caf9",
    "#81d4fa",
    "#80deea",
    "#80cbc4",
    "#fff59d",
    "#cccccc",
    "#e57373",
    "#f06292",
    "#ba68c8",
    "#9575cd",
    "#64b5f6",
    "#4fc3f7",
    "#4dd0e1",
    "#4db6ac",
    "#fff176",
    "#b3b3b3",
    "#ef5350",
    "#ec407a",
    "#ab47bc",
    "#7e57c2",
    "#42a5f5",
    "#29b6f6",
    "#26c6da",
    "#26a69a",
    "#ffee58",
    "#999999",
    "#e53935",
    "#d81b60",
    "#8e24aa",
    "#5e35b1",
    "#1e88e5",
    "#039be5",
    "#00acc1",
    "#00897b",
    "#fdd835",
    "#808080",
    "#d32f2f",
    "#c2185b",
    "#7b1fa2",
    "#512da8",
    "#1976d2",
    "#0288d1",
    "#0097a7",
    "#00796b",
    "#fbc02d",
    "#666666",
    "#c62828",
    "#ad1457",
    "#6a1b9a",
    "#4527a0",
    "#1565c0",
    "#0277bd",
    "#00838f",
    "#00695c",
    "#f9a825",
    "#4d4d4d",
    "#b71c1c",
    "#880e4f",
    "#4a148c",
    "#311b92",
    "#0d47a1",
    "#01579b",
    "#006064",
    "#004d40",
    "#f57f17"
  ]
};
var ColorPicker = (
  /** @class */
  function(_super) {
    __extends13(ColorPicker2, _super);
    function ColorPicker2(options, element2) {
      return _super.call(this, options, element2) || this;
    }
    ColorPicker2.prototype.preRender = function() {
      var ele = this.element;
      this.formElement = closest(this.element, "form");
      if (this.formElement) {
        EventHandler.add(this.formElement, "reset", this.formResetHandler, this);
      }
      var localeText = { Apply: "Apply", Cancel: "Cancel", ModeSwitcher: "Switch Mode" };
      this.l10n = new L10n("colorpicker", localeText, this.locale);
      if (ele.getAttribute("ejs-for") && !ele.getAttribute("name")) {
        ele.setAttribute("name", ele.id);
      }
    };
    ColorPicker2.prototype.render = function() {
      this.initWrapper();
      if (this.inline) {
        this.createWidget();
      } else {
        this.createSplitBtn();
      }
      if (!this.enableOpacity) {
        addClass([this.container.parentElement], HIDEOPACITY);
      }
      this.renderComplete();
    };
    ColorPicker2.prototype.initWrapper = function() {
      var wrapper = this.createElement("div", { className: "e-" + this.getModuleName() + "-wrapper" });
      this.element.parentNode.insertBefore(wrapper, this.element);
      wrapper.appendChild(this.element);
      attributes(this.element, { "tabindex": "-1", "spellcheck": "false", "aria-label": "colorpicker" });
      this.container = this.createElement("div", { className: CONTAINER });
      this.getWrapper().appendChild(this.container);
      var value = this.value ? this.roundValue(this.value).toLowerCase() : "#008000ff";
      if (this.noColor && this.mode === "Palette" && this.value === "") {
        value = "";
      }
      var slicedValue = value.slice(0, 7);
      if (isNullOrUndefined(this.initialInputValue)) {
        this.initialInputValue = slicedValue;
      }
      this.element.value = slicedValue;
      if (this.enableOpacity) {
        this.setProperties({ "value": value }, true);
      } else {
        this.setProperties({ "value": slicedValue }, true);
      }
      if (this.enableRtl) {
        wrapper.classList.add(RTL5);
      }
      if (this.cssClass) {
        addClass([wrapper], this.cssClass.replace(/\s+/g, " ").trim().split(" "));
      }
      this.tileRipple = rippleEffect(this.container, { selector: "." + TILE });
      this.ctrlBtnRipple = rippleEffect(this.container, { selector: ".e-btn" });
    };
    ColorPicker2.prototype.getWrapper = function() {
      return this.element.parentElement;
    };
    ColorPicker2.prototype.createWidget = function() {
      if (this.mode === "Palette") {
        this.createPalette();
        if (!this.inline) {
          this.firstPaletteFocus();
        }
      } else {
        this.createPicker();
        if (!this.inline) {
          this.getDragHandler().focus();
        }
      }
      this.isRgb = true;
      this.createInput();
      this.createCtrlBtn();
      if (!this.disabled) {
        this.wireEvents();
      }
      if (this.inline && this.disabled) {
        this.toggleDisabled(true);
      }
      if (Browser.isDevice) {
        this.refreshPopupPos();
      }
    };
    ColorPicker2.prototype.createSplitBtn = function() {
      var _this = this;
      var splitButton = this.createElement("button", { className: "e-split-colorpicker" });
      this.getWrapper().appendChild(splitButton);
      this.splitBtn = new SplitButton({
        iconCss: "e-selected-color",
        target: this.container,
        disabled: this.disabled,
        enableRtl: this.enableRtl,
        createPopupOnClick: this.createPopupOnClick,
        open: this.onOpen.bind(this),
        click: function() {
          _this.trigger("change", {
            currentValue: { hex: _this.value.slice(0, 7), rgba: _this.convertToRgbString(_this.hexToRgb(_this.value)) },
            previousValue: { hex: null, rgba: null },
            value: _this.value
          });
        }
      });
      this.splitBtn.createElement = this.createElement;
      this.splitBtn.appendTo(splitButton);
      var preview = this.createElement("span", { className: SPLITPREVIEW });
      select(".e-selected-color", splitButton).appendChild(preview);
      preview.style.backgroundColor = this.convertToRgbString(this.hexToRgb(this.value));
      var popupEle = this.getPopupEle();
      addClass([popupEle], "e-colorpicker-popup");
      if (this.cssClass) {
        addClass([popupEle], this.cssClass.replace(/\s+/g, " ").trim().split(" "));
      }
      if (Browser.isDevice && !this.createPopupOnClick) {
        var popupInst = this.getPopupInst();
        popupInst.relateTo = document.body;
        popupInst.position = { X: "center", Y: "center" };
        popupInst.targetType = "container";
        popupInst.collision = { X: "fit", Y: "fit" };
        popupInst.offsetY = 4;
        popupEle.style.zIndex = getZindexPartial(this.splitBtn.element).toString();
      }
      this.bindCallBackEvent();
    };
    ColorPicker2.prototype.onOpen = function() {
      this.trigger("open", { element: this.container });
      if (!Browser.isDevice) {
        var popupInst = this.getPopupInst();
        var collision = isCollide(popupInst.element);
        if (collision.length > 0) {
          popupInst.collision = { X: "flip", Y: "fit" };
          popupInst.position = { X: "right", Y: "bottom" };
          popupInst.targetType = "container";
        }
      }
    };
    ColorPicker2.prototype.getPopupInst = function() {
      return getInstance(this.getPopupEle(), Popup);
    };
    ColorPicker2.prototype.bindCallBackEvent = function() {
      var _this = this;
      this.splitBtn.beforeOpen = function(args) {
        var callBackPromise = new Deferred();
        _this.trigger("beforeOpen", args, function(observeOpenArgs) {
          if (!observeOpenArgs.cancel) {
            var popupEle = _this.getPopupEle();
            popupEle.style.top = formatUnit(0 + pageYOffset);
            popupEle.style.left = formatUnit(0 + pageXOffset);
            popupEle.style.display = "block";
            _this.createWidget();
            popupEle.style.display = "";
            if (Browser.isDevice) {
              if (_this.createPopupOnClick) {
                var popupInst = _this.getPopupInst();
                popupInst.relateTo = document.body;
                popupInst.position = { X: "center", Y: "center" };
                popupInst.targetType = "container";
                popupInst.collision = { X: "fit", Y: "fit" };
                popupInst.offsetY = 4;
                popupEle.style.zIndex = getZindexPartial(_this.splitBtn.element).toString();
              }
              _this.modal = _this.createElement("div");
              _this.modal.className = "e-" + _this.getModuleName() + " e-modal";
              _this.modal.style.display = "none";
              document.body.insertBefore(_this.modal, popupEle);
              document.body.className += " e-colorpicker-overflow";
              _this.modal.style.display = "block";
              _this.modal.style.zIndex = (Number(popupEle.style.zIndex) - 1).toString();
            }
          }
          args.cancel = observeOpenArgs.cancel;
          callBackPromise.resolve(observeOpenArgs);
        });
        return callBackPromise;
      };
      this.splitBtn.beforeClose = function(args) {
        var callBackPromise = new Deferred();
        if (!isNullOrUndefined(args.event)) {
          var beforeCloseArgs = { element: _this.container, event: args.event, cancel: false };
          _this.trigger("beforeClose", beforeCloseArgs, function(observedCloseArgs) {
            if (Browser.isDevice && args.event.target === _this.modal) {
              observedCloseArgs.cancel = true;
            }
            if (!observedCloseArgs.cancel) {
              _this.onPopupClose();
            }
            args.cancel = observedCloseArgs.cancel;
            callBackPromise.resolve(observedCloseArgs);
          });
        } else {
          callBackPromise.resolve(args);
        }
        return callBackPromise;
      };
    };
    ColorPicker2.prototype.onPopupClose = function() {
      this.unWireEvents();
      this.destroyOtherComp();
      this.container.style.width = "";
      select("." + SPLITPREVIEW, this.splitBtn.element).style.backgroundColor = this.convertToRgbString(this.hexToRgb(this.value));
      this.container.innerHTML = "";
      removeClass([this.container], [PICKERCONTENT, PALETTECONTENT]);
      if (Browser.isDevice && this.modal) {
        removeClass([document.body], "e-colorpicker-overflow");
        this.modal.style.display = "none";
        this.modal.outerHTML = "";
        this.modal = null;
      }
    };
    ColorPicker2.prototype.createPalette = function() {
      classList(this.container, [PALETTECONTENT], [PICKERCONTENT]);
      if (this.presetColors) {
        var paletteGroup = this.createElement("div", { className: "e-custom-palette" });
        this.appendElement(paletteGroup);
        var keys = Object.keys(this.presetColors);
        if (keys.length === 1) {
          this.appendPalette(this.presetColors[keys[0]], keys[0], paletteGroup);
        } else {
          for (var i = 0, len = keys.length; i < len; i++) {
            this.appendPalette(this.presetColors[keys[i]], keys[i], paletteGroup);
          }
        }
        if (selectAll(".e-row", paletteGroup).length > 10) {
          addClass([paletteGroup], "e-palette-group");
        }
      } else {
        this.appendPalette(presets.default, "default");
      }
      if (this.mode === "Palette" && !this.modeSwitcher && this.noColor) {
        this.setNoColor();
      }
      var width = parseInt(getComputedStyle(this.container).borderBottomWidth, 10);
      this.container.style.width = formatUnit(this.container.children[0].offsetWidth + width + width);
      this.rgb = this.hexToRgb(this.roundValue(this.value));
      this.hsv = this.rgbToHsv.apply(this, this.rgb);
    };
    ColorPicker2.prototype.firstPaletteFocus = function() {
      if (!select("." + SELECT, this.container.children[0])) {
        selectAll("." + PALETTES, this.container)[0].focus();
      }
    };
    ColorPicker2.prototype.appendPalette = function(colors, key, refEle) {
      var palette = this.createElement("div", { className: PALETTES, attrs: { "tabindex": "0", "role": "grid" } });
      if (refEle) {
        refEle.appendChild(palette);
      } else {
        this.appendElement(palette);
      }
      var row;
      var tile;
      var roundedColor;
      for (var i = 0, len = colors.length; i < len; i++) {
        if (i === 0 || i % this.columns === 0) {
          row = this.createElement("div", {
            className: "e-row",
            attrs: { "role": "row" }
          });
          palette.appendChild(row);
        }
        roundedColor = this.roundValue(colors[i]).toLowerCase();
        tile = this.createElement("span", {
          className: TILE,
          attrs: { "role": "gridcell", "aria-label": roundedColor, "aria-selected": "false", "tabindex": "0" }
        });
        this.trigger("beforeTileRender", { element: tile, presetName: key, value: colors[i] });
        row.appendChild(tile);
        if (this.value === roundedColor) {
          this.addTileSelection(tile);
          palette.focus();
        }
        tile.style.backgroundColor = this.convertToRgbString(this.hexToRgb(roundedColor));
      }
    };
    ColorPicker2.prototype.setNoColor = function() {
      var noColorEle = this.container.querySelector(".e-row").children[0];
      noColorEle.classList.add(NOCOLOR);
      if (!this.value) {
        noColorEle.classList.add(SELECT);
        closest(noColorEle, "." + PALETTES).focus();
      }
      ["aria-selected", "aria-label"].forEach(function(attr) {
        noColorEle.removeAttribute(attr);
      });
      noColorEle.style.backgroundColor = "";
    };
    ColorPicker2.prototype.appendElement = function(ele, insertPos) {
      if (insertPos === void 0) {
        insertPos = 0;
      }
      var refEle = this.container.children[insertPos];
      if (refEle) {
        this.container.insertBefore(ele, refEle);
      } else {
        this.container.appendChild(ele);
      }
    };
    ColorPicker2.prototype.addTileSelection = function(ele) {
      ele.classList.add(SELECT);
      ele.setAttribute("aria-selected", "true");
    };
    ColorPicker2.prototype.createPicker = function() {
      classList(this.container, [PICKERCONTENT], [PALETTECONTENT]);
      var hsvContainer = this.createElement("div", { className: HSVCONTAINER });
      this.appendElement(hsvContainer);
      hsvContainer.appendChild(this.createElement("div", { className: HSVAREA }));
      var dragHandler = this.createElement("span", { className: HANDLER, attrs: { "tabindex": "0" } });
      hsvContainer.appendChild(dragHandler);
      if (this.value === null || this.value === "") {
        this.value = "#008000ff";
      }
      this.rgb = this.hexToRgb(this.value);
      this.hsv = this.rgbToHsv.apply(this, this.rgb);
      this.setHsvContainerBg();
      this.setHandlerPosition();
      this.createSlider();
      this.createDragTooltip();
    };
    ColorPicker2.prototype.setHsvContainerBg = function(h) {
      if (h === void 0) {
        h = this.hsv[0];
      }
      this.getHsvContainer().style.backgroundColor = this.convertToRgbString(this.hsvToRgb(h, 100, 100, 1));
    };
    ColorPicker2.prototype.getHsvContainer = function() {
      return select("." + HSVCONTAINER, this.container);
    };
    ColorPicker2.prototype.setHandlerPosition = function() {
      var dragHandler = this.getDragHandler();
      var hsvArea = select("." + HSVAREA, this.container);
      if (this.enableRtl) {
        dragHandler.style.left = formatUnit(hsvArea.offsetWidth * Math.abs(100 - this.hsv[1]) / 100);
      } else {
        dragHandler.style.left = formatUnit(hsvArea.offsetWidth * this.hsv[1] / 100);
      }
      dragHandler.style.top = formatUnit(hsvArea.offsetHeight * (100 - this.hsv[2]) / 100);
    };
    ColorPicker2.prototype.createSlider = function() {
      var sliderPreviewWrapper = this.createElement("div", { className: "e-slider-preview" });
      this.appendElement(sliderPreviewWrapper, 1);
      this.createPreview(sliderPreviewWrapper);
      var sliderWrapper = this.createElement("div", { className: "e-colorpicker-slider" });
      sliderPreviewWrapper.insertBefore(sliderWrapper, sliderPreviewWrapper.children[0]);
      var slider = this.createElement("div", { className: "e-hue-slider" });
      sliderWrapper.appendChild(slider);
      this.hueSlider = new Slider({
        value: this.hsv[0],
        min: 0,
        max: 359,
        enableRtl: this.enableRtl,
        enabled: !this.disabled,
        change: this.hueChange.bind(this)
      });
      this.hueSlider.createElement = this.createElement;
      this.hueSlider.appendTo(slider);
      if (this.enableOpacity) {
        slider = this.createElement("div", { className: "e-opacity-slider" });
        sliderWrapper.appendChild(slider);
        this.createOpacitySlider(slider);
      }
    };
    ColorPicker2.prototype.createOpacitySlider = function(slider) {
      this.opacitySlider = new Slider({
        value: this.rgb[3] * 100,
        min: 0,
        max: 100,
        enableRtl: this.enableRtl,
        enabled: !this.disabled,
        change: this.opacityChange.bind(this)
      });
      this.opacitySlider.createElement = this.createElement;
      this.opacitySlider.appendTo(slider);
      var opacityBgTrack = this.createElement("div", { className: "e-opacity-empty-track" });
      slider.appendChild(opacityBgTrack);
      this.updateOpacitySliderBg();
    };
    ColorPicker2.prototype.updateOpacitySliderBg = function() {
      var direction = this.enableRtl ? "to left" : "to right";
      var opacityEle = select(".e-opacity-empty-track", this.opacitySlider.element);
      if (opacityEle) {
        opacityEle.style.background = "linear-gradient(" + direction + ", rgba(" + this.rgb.slice(0, 3) + ", 0) 0%, " + this.convertToRgbString(this.rgb.slice(0, 3)) + " 100%)";
      }
    };
    ColorPicker2.prototype.hueChange = function(args) {
      this.hsv[0] = args.value;
      this.setHsvContainerBg();
      this.convertToOtherFormat();
    };
    ColorPicker2.prototype.opacityChange = function(args) {
      var value = args.value;
      var pValue = this.rgbToHex(this.rgb);
      this.hsv[3] = value / 100;
      this.rgb[3] = value / 100;
      var cValue = this.rgbToHex(this.rgb);
      this.updateOpacityInput(value);
      var rgb = this.convertToRgbString(this.rgb);
      this.updatePreview(rgb);
      this.triggerEvent(cValue, pValue, rgb);
    };
    ColorPicker2.prototype.updateOpacityInput = function(value) {
      if (this.enableOpacity && !this.getWrapper().classList.contains(HIDEVALUE)) {
        var opacityTextBoxInst = getInstance(select("." + OPACITY, this.container), NumericTextBox);
        opacityTextBoxInst.value = value;
        opacityTextBoxInst.dataBind();
      }
    };
    ColorPicker2.prototype.createPreview = function(parentEle) {
      var previewContainer = this.createElement("div", { className: PREVIEW });
      parentEle.appendChild(previewContainer);
      var preview = this.createElement("span", { className: "e-preview " + CURRENT });
      previewContainer.appendChild(preview);
      var colorValue = this.convertToRgbString(this.rgb);
      preview.style.backgroundColor = colorValue;
      preview = this.createElement("span", { className: "e-preview " + PREVIOUS });
      previewContainer.appendChild(preview);
      preview.style.backgroundColor = colorValue;
    };
    ColorPicker2.prototype.isPicker = function() {
      return !this.container.classList.contains(PALETTECONTENT);
    };
    ColorPicker2.prototype.getPopupEle = function() {
      return this.container.parentElement;
    };
    ColorPicker2.prototype.createNumericInput = function(element2, value, label, max) {
      var _this = this;
      var numericInput = new NumericTextBox({
        value,
        placeholder: label,
        min: 0,
        max,
        format: "###.##",
        showSpinButton: false,
        floatLabelType: "Always",
        enableRtl: this.enableRtl,
        enabled: !this.disabled,
        readonly: this.isPicker() ? false : true,
        change: function(args) {
          if (args.event) {
            _this.inputHandler(args.event);
          }
        }
      });
      numericInput.createElement = this.createElement;
      numericInput.appendTo(element2);
    };
    ColorPicker2.prototype.createInput = function() {
      var isPicker = this.isPicker();
      var wrapper = this.getWrapper();
      if (isPicker && !wrapper.classList.contains(HIDEVALUE) || !isPicker && wrapper.classList.contains(SHOWVALUE)) {
        var inputWrap = this.createElement("div", { className: INPUTWRAPPER });
        if (isPicker) {
          this.appendElement(inputWrap, 2);
        } else {
          this.appendElement(inputWrap, 1);
        }
        var container = this.createElement("div", { className: "e-input-container" });
        inputWrap.appendChild(container);
        if (!wrapper.classList.contains(HIDEVALUESWITCH)) {
          this.appendValueSwitchBtn(inputWrap);
        }
        if (!wrapper.classList.contains(HIDEHEX)) {
          var hexInput = this.createElement("input", {
            className: HEX,
            attrs: { "maxlength": "7", "spellcheck": "false", "aria-label": "HEX" }
          });
          container.appendChild(hexInput);
          Input.createInput({
            element: hexInput,
            floatLabelType: "Always",
            properties: {
              placeholder: "HEX",
              enableRtl: this.enableRtl,
              enabled: !this.disabled,
              readonly: this.isPicker() ? false : true
            }
          }, this.createElement);
          Input.setValue(this.value.slice(0, 7), hexInput);
          hexInput.addEventListener("input", this.inputHandler.bind(this));
        }
        if (!wrapper.classList.contains(HIDERGBA)) {
          var label = void 0;
          var value = void 0;
          if (this.isRgb) {
            label = "RGB";
            value = this.rgb;
          } else {
            label = "HSV";
            value = this.hsv;
          }
          var clsName = ["rh", "gs", "bv"];
          for (var i = 0; i < 3; i++) {
            this.createNumericInput(container.appendChild(this.createElement("input", { className: "e-" + clsName[i] + "-value" })), value[i], label[i], 255);
          }
          if (this.enableOpacity) {
            this.appendOpacityValue(container);
          }
        }
      }
    };
    ColorPicker2.prototype.appendOpacityValue = function(container) {
      this.createNumericInput(container.appendChild(this.createElement("input", { className: OPACITY })), this.rgb[3] * 100, "A", 100);
    };
    ColorPicker2.prototype.appendValueSwitchBtn = function(targetEle) {
      var valueSwitchBtn = this.createElement("button", {
        className: "e-icons e-css e-btn e-flat e-icon-btn " + FORMATSWITCH,
        attrs: { "title": "Toggle format" }
      });
      targetEle.appendChild(valueSwitchBtn);
      if (this.isPicker() && !this.getWrapper().classList.contains(HIDERGBA)) {
        valueSwitchBtn.addEventListener("click", this.formatSwitchHandler.bind(this));
      }
    };
    ColorPicker2.prototype.createCtrlBtn = function() {
      if (this.modeSwitcher || this.showButtons) {
        this.l10n.setLocale(this.locale);
        var btnWrapper = this.createElement("div", { className: CTRLSWITCH });
        this.container.appendChild(btnWrapper);
        if (this.showButtons) {
          var controlBtnWrapper = this.createElement("div", { className: CTRLBTN });
          btnWrapper.appendChild(controlBtnWrapper);
          var apply = this.l10n.getConstant("Apply");
          controlBtnWrapper.appendChild(this.createElement("button", {
            innerHTML: apply,
            className: "e-btn e-css e-flat e-primary e-small " + APPLY,
            attrs: { "title": apply }
          }));
          var cancel = this.l10n.getConstant("Cancel");
          controlBtnWrapper.appendChild(this.createElement("button", {
            innerHTML: cancel,
            className: "e-btn e-css e-flat e-small " + CANCEL,
            attrs: { "title": cancel }
          }));
        }
        if (this.modeSwitcher) {
          this.appendModeSwitchBtn();
        }
      }
    };
    ColorPicker2.prototype.appendModeSwitchBtn = function() {
      var modeSwitcher = this.createElement("button", {
        className: "e-icons e-btn e-flat e-icon-btn " + MODESWITCH,
        attrs: { title: this.l10n.getConstant("ModeSwitcher") }
      });
      select("." + CTRLSWITCH, this.container).insertBefore(modeSwitcher, select("." + CTRLBTN, this.container));
    };
    ColorPicker2.prototype.createDragTooltip = function() {
      var _this = this;
      var tooltip = new Tooltip({
        opensOn: "Custom",
        showTipPointer: false,
        cssClass: "e-color-picker-tooltip",
        htmlAttributes: { title: "tooltip" },
        beforeOpen: function(args) {
          _this.tooltipEle = args.element;
        },
        animation: { open: { effect: "None" }, close: { effect: "None" } }
      });
      tooltip.createElement = this.createElement;
      tooltip.appendTo(this.container);
      tooltip.open(this.container);
      this.tooltipEle.style.zIndex = getZindexPartial(this.tooltipEle).toString();
      this.tooltipEle.setAttribute("aria-label", "colorpicker-tooltip");
      select(".e-tip-content", this.tooltipEle).appendChild(this.createElement("div", { className: "e-tip-transparent" }));
    };
    ColorPicker2.prototype.getTooltipInst = function() {
      return getInstance(this.container, Tooltip);
    };
    ColorPicker2.prototype.setTooltipOffset = function(value) {
      this.getTooltipInst().offsetY = value;
    };
    ColorPicker2.prototype.toggleDisabled = function(enable) {
      if (enable) {
        this.getWrapper().classList.add(DISABLED2);
      } else {
        this.getWrapper().classList.remove(DISABLED2);
      }
      if (this.showButtons) {
        [].slice.call(selectAll(".e-btn", this.container)).forEach(function(ele) {
          if (enable) {
            attributes(ele, { "disabled": "" });
          } else {
            ele.removeAttribute("disabled");
          }
        });
      }
    };
    ColorPicker2.prototype.convertToRgbString = function(rgb) {
      return rgb.length ? rgb.length === 4 ? "rgba(" + rgb.join() + ")" : "rgb(" + rgb.join() + ")" : "";
    };
    ColorPicker2.prototype.convertToHsvString = function(hsv) {
      return hsv.length === 4 ? "hsva(" + hsv.join() + ")" : "hsv(" + hsv.join() + ")";
    };
    ColorPicker2.prototype.updateHsv = function() {
      this.hsv[1] = this.hsv[1] > 100 ? 100 : this.hsv[1];
      this.hsv[2] = this.hsv[2] > 100 ? 100 : this.hsv[2];
      this.setHandlerPosition();
    };
    ColorPicker2.prototype.convertToOtherFormat = function(isKey) {
      if (isKey === void 0) {
        isKey = false;
      }
      var pValue = this.rgbToHex(this.rgb);
      this.rgb = this.hsvToRgb.apply(this, this.hsv);
      var cValue = this.rgbToHex(this.rgb);
      var rgba = this.convertToRgbString(this.rgb);
      this.updatePreview(rgba);
      this.updateInput(cValue);
      this.triggerEvent(cValue, pValue, rgba, isKey);
    };
    ColorPicker2.prototype.updateInput = function(value) {
      var wrapper = this.getWrapper();
      if (!wrapper.classList.contains(HIDEVALUE)) {
        if (!wrapper.classList.contains(HIDEHEX)) {
          Input.setValue(value.substr(0, 7), select("." + HEX, this.container));
        }
        if (!wrapper.classList.contains(HIDERGBA)) {
          if (this.isRgb) {
            this.updateValue(this.rgb, false);
          } else {
            this.updateValue(this.hsv, false);
          }
        }
      }
    };
    ColorPicker2.prototype.updatePreview = function(value) {
      if (this.enableOpacity) {
        this.updateOpacitySliderBg();
      }
      select(".e-tip-transparent", this.tooltipEle).style.backgroundColor = value;
      select("." + PREVIEW + " ." + CURRENT, this.container).style.backgroundColor = value;
      select("." + PREVIEW + " ." + PREVIOUS, this.container).style.backgroundColor = this.convertToRgbString(this.hexToRgb(this.value));
    };
    ColorPicker2.prototype.getDragHandler = function() {
      return select("." + HANDLER, this.container);
    };
    ColorPicker2.prototype.removeTileSelection = function() {
      var selectedEle = [].slice.call(selectAll("." + SELECT, this.container.children[0]));
      selectedEle.forEach(function(ele) {
        ele.classList.remove(SELECT);
        ele.setAttribute("aria-selected", "false");
      });
    };
    ColorPicker2.prototype.convertRgbToNumberArray = function(value) {
      return value.slice(value.indexOf("(") + 1, value.indexOf(")")).split(",").map(function(n, i) {
        return i !== 3 ? parseInt(n, 10) : parseFloat(n);
      });
    };
    ColorPicker2.prototype.getValue = function(value, type) {
      if (!value) {
        value = this.value;
      }
      type = !type ? "hex" : type.toLowerCase();
      if (value[0] === "r") {
        var cValue = this.convertRgbToNumberArray(value);
        if (type === "hex" || type === "hexa") {
          var hex = this.rgbToHex(cValue);
          return type === "hex" ? hex.slice(0, 7) : hex;
        } else {
          if (type === "hsv") {
            return this.convertToHsvString(this.rgbToHsv.apply(this, cValue.slice(0, 3)));
          } else {
            if (type === "hsva") {
              return this.convertToHsvString(this.rgbToHsv.apply(this, cValue));
            } else {
              return "null";
            }
          }
        }
      } else {
        if (value[0] === "h") {
          var cValue = this.hsvToRgb.apply(this, this.convertRgbToNumberArray(value));
          if (type === "rgba") {
            return this.convertToRgbString(cValue);
          } else {
            if (type === "hex" || type === "hexa") {
              var hex = this.rgbToHex(cValue);
              return type === "hex" ? hex.slice(0, 7) : hex;
            } else {
              if (type === "rgb") {
                return this.convertToRgbString(cValue.slice(0, 3));
              } else {
                return "null";
              }
            }
          }
        } else {
          value = this.roundValue(value);
          var rgb = this.hexToRgb(value);
          if (type === "rgb" || type === "hsv") {
            rgb = rgb.slice(0, 3);
          }
          if (type === "rgba" || type === "rgb") {
            return this.convertToRgbString(rgb);
          } else {
            if (type === "hsva" || type === "hsv") {
              return this.convertToHsvString(this.rgbToHsv.apply(this, rgb));
            } else {
              if (type === "hex") {
                return value.slice(0, 7);
              } else {
                if (type === "a") {
                  return rgb[3].toString();
                } else {
                  return "null";
                }
              }
            }
          }
        }
      }
    };
    ColorPicker2.prototype.toggle = function() {
      if (this.container.parentElement.classList.contains("e-popup-close")) {
        this.splitBtn.toggle();
      } else {
        this.closePopup(null);
      }
    };
    ColorPicker2.prototype.getModuleName = function() {
      return "colorpicker";
    };
    ColorPicker2.prototype.getPersistData = function() {
      return this.addOnPersist(["value"]);
    };
    ColorPicker2.prototype.wireEvents = function() {
      if (this.isPicker()) {
        var dragHandler = this.getDragHandler();
        EventHandler.add(dragHandler, "keydown", this.pickerKeyDown, this);
        var ctrlBtn = select("." + CTRLBTN, this.container);
        if (ctrlBtn) {
          EventHandler.add(ctrlBtn, "keydown", this.ctrlBtnKeyDown, this);
        }
        EventHandler.add(this.getHsvContainer(), "mousedown touchstart", this.handlerDown, this);
        if (this.modeSwitcher || this.showButtons) {
          this.addCtrlSwitchEvent();
        }
        EventHandler.add(select("." + PREVIOUS, this.container), "click", this.previewHandler, this);
      } else {
        EventHandler.add(this.container, "click", this.paletteClickHandler, this);
        EventHandler.add(this.container, "keydown", this.paletteKeyDown, this);
      }
    };
    ColorPicker2.prototype.formResetHandler = function() {
      this.value = this.initialInputValue;
      attributes(this.element, { "value": this.initialInputValue });
    };
    ColorPicker2.prototype.addCtrlSwitchEvent = function() {
      var ctrlSwitchBtn = select("." + CTRLSWITCH, this.container);
      if (ctrlSwitchBtn) {
        EventHandler.add(ctrlSwitchBtn, "click", this.btnClickHandler, this);
      }
    };
    ColorPicker2.prototype.ctrlBtnKeyDown = function(e) {
      if (e.keyCode === 13) {
        var applyBtn = select("." + APPLY, this.container);
        if (applyBtn) {
          var cValue = this.rgbToHex(this.rgb);
          this.triggerChangeEvent(cValue);
        }
        this.splitBtn.element.focus();
      }
    };
    ColorPicker2.prototype.pickerKeyDown = function(e) {
      switch (e.keyCode) {
        case 39:
          this.handlerDragPosition(1, this.enableRtl ? -1 : 1, e);
          break;
        case 37:
          this.handlerDragPosition(1, this.enableRtl ? 1 : -1, e);
          break;
        case 38:
          this.handlerDragPosition(2, 1, e);
          break;
        case 40:
          this.handlerDragPosition(2, -1, e);
          break;
        case 13: {
          e.preventDefault();
          var cValue = this.rgbToHex(this.rgb);
          this.enterKeyHandler(cValue, e);
        }
      }
    };
    ColorPicker2.prototype.enterKeyHandler = function(value, e) {
      this.triggerChangeEvent(value);
      if (!this.inline) {
        this.splitBtn.element.focus();
      }
    };
    ColorPicker2.prototype.closePopup = function(e) {
      var _this = this;
      var beforeCloseArgs = { element: this.container, event: e, cancel: false };
      this.trigger("beforeClose", beforeCloseArgs, function(observedcloseArgs) {
        if (!observedcloseArgs.cancel) {
          _this.splitBtn.toggle();
          _this.onPopupClose();
        }
      });
    };
    ColorPicker2.prototype.triggerChangeEvent = function(value) {
      var hex = value.slice(0, 7);
      this.trigger("change", {
        currentValue: { hex, rgba: this.convertToRgbString(this.rgb) },
        previousValue: { hex: this.value.slice(0, 7), rgba: this.convertToRgbString(this.hexToRgb(this.value)) },
        value: this.enableOpacity ? value : hex
      });
      if (this.enableOpacity) {
        this.setProperties({ "value": value }, true);
      } else {
        this.setProperties({ "value": hex }, true);
      }
      this.element.value = hex ? hex : "#000000";
    };
    ColorPicker2.prototype.handlerDragPosition = function(prob, value, e) {
      e.preventDefault();
      this.hsv[prob] += value * (e.ctrlKey ? 1 : 3);
      if (this.hsv[prob] < 0) {
        this.hsv[prob] = 0;
      }
      this.updateHsv();
      this.convertToOtherFormat(true);
    };
    ColorPicker2.prototype.handlerDown = function(e) {
      e.preventDefault();
      if (e.type === "mousedown") {
        this.clientX = Math.abs(e.pageX - pageXOffset);
        this.clientY = Math.abs(e.pageY - pageYOffset);
        this.setTooltipOffset(8);
      } else {
        this.clientX = Math.abs(e.changedTouches[0].pageX - pageXOffset);
        this.clientY = Math.abs(e.changedTouches[0].pageY - pageYOffset);
        this.setTooltipOffset(-8);
      }
      this.setHsv(this.clientX, this.clientY);
      this.getDragHandler().style.transition = "left .4s cubic-bezier(.25, .8, .25, 1), top .4s cubic-bezier(.25, .8, .25, 1)";
      this.updateHsv();
      this.convertToOtherFormat();
      this.getDragHandler().focus();
      EventHandler.add(document, "mousemove touchmove", this.handlerMove, this);
      EventHandler.add(document, "mouseup touchend", this.handlerEnd, this);
    };
    ColorPicker2.prototype.handlerMove = function(e) {
      if (e.type !== "touchmove") {
        e.preventDefault();
      }
      var x;
      var y;
      if (e.type === "mousemove") {
        x = Math.abs(e.pageX - pageXOffset);
        y = Math.abs(e.pageY - pageYOffset);
      } else {
        x = Math.abs(e.changedTouches[0].pageX - pageXOffset);
        y = Math.abs(e.changedTouches[0].pageY - pageYOffset);
      }
      this.setHsv(x, y);
      var dragHandler = this.getDragHandler();
      this.updateHsv();
      this.convertToOtherFormat();
      this.getTooltipInst().refresh(dragHandler);
      if (!this.tooltipEle.style.transform) {
        if (Math.abs(this.clientX - x) > 8 || Math.abs(this.clientY - y) > 8) {
          select("." + HSVAREA, this.container).style.cursor = "pointer";
          dragHandler.style.transition = "none";
          if (!this.inline) {
            this.tooltipEle.style.zIndex = (parseInt(this.getPopupEle().style.zIndex, 10) + 1).toString();
          }
          this.tooltipEle.style.transform = "rotate(45deg)";
          dragHandler.classList.add("e-hide-handler");
        }
      }
    };
    ColorPicker2.prototype.setHsv = function(clientX, clientY) {
      var ele = select("." + HSVAREA, this.container);
      var position = ele.getBoundingClientRect();
      if (this.enableRtl) {
        clientX = clientX > position.right ? 0 : Math.abs(clientX - position.right);
      } else {
        clientX = clientX > position.left ? Math.abs(clientX - position.left) : 0;
      }
      clientY = clientY > position.top ? Math.abs(clientY - position.top) : 0;
      this.hsv[2] = Math.round(Number(100 * (ele.offsetHeight - Math.max(0, Math.min(ele.offsetHeight, clientY - ele.offsetTop))) / ele.offsetHeight) * 10) / 10;
      this.hsv[1] = Math.round(Number(100 * Math.max(0, Math.min(ele.offsetWidth, clientX - ele.offsetLeft)) / ele.offsetWidth) * 10) / 10;
    };
    ColorPicker2.prototype.handlerEnd = function(e) {
      if (e.type !== "touchend") {
        e.preventDefault();
      }
      EventHandler.remove(document, "mousemove touchmove", this.handlerMove);
      EventHandler.remove(document, "mouseup touchend", this.handlerEnd);
      var dragHandler = this.getDragHandler();
      select("." + HSVAREA, this.container).style.cursor = "";
      if (this.tooltipEle.style.transform) {
        this.tooltipEle.style.transform = "";
        dragHandler.classList.remove("e-hide-handler");
      }
      if (!this.inline && !this.showButtons) {
        this.closePopup(e);
      }
    };
    ColorPicker2.prototype.btnClickHandler = function(e) {
      var target = e.target;
      if (closest(target, "." + MODESWITCH)) {
        e.stopPropagation();
        this.switchToPalette();
      } else {
        if (target.classList.contains(APPLY) || target.classList.contains(CANCEL)) {
          this.ctrlBtnClick(target, e);
        }
      }
    };
    ColorPicker2.prototype.switchToPalette = function() {
      this.trigger("beforeModeSwitch", { element: this.container, mode: "Palette" });
      this.unWireEvents();
      this.destroyOtherComp();
      detach(select(".e-slider-preview", this.container));
      if (!this.getWrapper().classList.contains(HIDEVALUE)) {
        remove(select("." + INPUTWRAPPER, this.container));
      }
      detach(this.getHsvContainer());
      this.createPalette();
      this.firstPaletteFocus();
      this.createInput();
      this.refreshPopupPos();
      if (this.element.parentElement && this.element.parentElement.parentElement && this.element.parentElement.parentElement.classList.contains("e-ie-ddb-popup")) {
        this.refreshImageEditorPopupPos();
      }
      ;
      this.wireEvents();
      this.trigger("onModeSwitch", { element: this.container, mode: "Palette" });
    };
    ColorPicker2.prototype.refreshImageEditorPopupPos = function() {
      if (Browser.isDevice) {
        var popupEle = this.getPopupEle();
        popupEle.style.left = formatUnit(0 + pageXOffset);
        popupEle.style.top = formatUnit(0 + pageYOffset);
        var btnElem = document.querySelector("#" + this.element.parentElement.parentElement.id.split("-popup")[0]);
        if (btnElem) {
          popupEle.parentElement.ej2_instances[0].refreshPosition(btnElem);
        }
      }
    };
    ColorPicker2.prototype.refreshPopupPos = function() {
      if (!this.inline) {
        var popupEle = this.getPopupEle();
        popupEle.style.left = formatUnit(0 + pageXOffset);
        popupEle.style.top = formatUnit(0 + pageYOffset);
        this.getPopupInst().refreshPosition(this.splitBtn.element.parentElement);
      }
    };
    ColorPicker2.prototype.formatSwitchHandler = function() {
      if (this.isRgb) {
        this.updateValue(this.hsv, true, 3, [360, 100, 100]);
        this.isRgb = false;
      } else {
        this.updateValue(this.rgb, true, 2);
        this.isRgb = true;
      }
    };
    ColorPicker2.prototype.updateValue = function(value, format, idx, max) {
      var clsName = ["e-rh-value", "e-gs-value", "e-bv-value"];
      var inst;
      for (var i = 0, len = clsName.length; i < len; i++) {
        inst = getInstance(select("." + clsName[i], this.container), NumericTextBox);
        inst.value = Math.round(value[i]);
        if (format) {
          inst.placeholder = clsName[i].substr(idx, 1).toUpperCase();
          inst.max = max ? max[i] : 255;
        }
        inst.dataBind();
      }
    };
    ColorPicker2.prototype.previewHandler = function(e) {
      var target = e.target;
      var pValue = this.rgbToHex(this.rgb);
      this.rgb = this.convertRgbToNumberArray(target.style.backgroundColor);
      if (!this.rgb[3]) {
        this.rgb[3] = 1;
      }
      var cValue = this.rgbToHex(this.rgb);
      var hsv = this.rgbToHsv.apply(this, this.rgb);
      if (hsv[0] !== this.hsv[0]) {
        this.hueSlider.setProperties({ "value": hsv[0] }, true);
        this.hueSlider.refresh();
      }
      this.setHsvContainerBg(hsv[0]);
      if (this.enableOpacity && hsv[3] !== this.hsv[3]) {
        this.opacitySlider.setProperties({ "value": hsv[3] * 100 }, true);
        this.opacitySlider.refresh();
        this.updateOpacitySliderBg();
      }
      this.hsv = hsv;
      this.setHandlerPosition();
      this.updateInput(cValue);
      select("." + PREVIEW + " ." + CURRENT, this.container).style.backgroundColor = this.convertToRgbString(this.rgb);
      this.triggerEvent(cValue, pValue, this.convertToRgbString(this.rgb));
    };
    ColorPicker2.prototype.paletteClickHandler = function(e) {
      e.preventDefault();
      var target = e.target;
      if (target.classList.contains(TILE)) {
        this.removeTileSelection();
        this.addTileSelection(target);
        if (target.classList.contains(NOCOLOR)) {
          this.noColorTile();
        } else {
          var cValue = target.getAttribute("aria-label");
          var pValue = this.rgbToHex(this.rgb);
          this.rgb = this.hexToRgb(this.roundValue(cValue));
          this.hsv = this.rgbToHsv.apply(this, this.rgb);
          if (this.getWrapper().classList.contains(SHOWVALUE)) {
            this.updateInput(cValue);
          }
          this.triggerEvent(cValue, pValue, this.convertToRgbString(this.rgb));
        }
        if (!this.inline && !this.showButtons) {
          this.closePopup(e);
        }
      } else {
        if (closest(target, "." + MODESWITCH)) {
          this.switchToPicker();
        } else {
          if (target.classList.contains(APPLY) || target.classList.contains(CANCEL)) {
            this.ctrlBtnClick(target, e);
          } else {
            if (this.getWrapper().classList.contains(SHOWVALUE) && closest(target, "." + FORMATSWITCH)) {
              this.formatSwitchHandler();
            }
          }
        }
      }
    };
    ColorPicker2.prototype.noColorTile = function(isKey) {
      if (isKey === void 0) {
        isKey = false;
      }
      var pValue = this.rgbToHex(this.rgb);
      this.rgb = [];
      this.hsv = [];
      this.triggerEvent("", pValue, "", isKey);
    };
    ColorPicker2.prototype.switchToPicker = function() {
      var wrapper = this.getWrapper();
      this.trigger("beforeModeSwitch", { element: this.container, mode: "Picker" });
      this.unWireEvents();
      [].slice.call(selectAll("." + PALETTES, this.container)).forEach(function(ele) {
        detach(ele);
      });
      if (wrapper.classList.contains(SHOWVALUE)) {
        detach(select("." + INPUTWRAPPER, this.container));
      }
      this.container.style.width = "";
      var grpEle = select(".e-custom-palette", this.container);
      if (this.presetColors) {
        remove(grpEle);
      }
      this.createPicker();
      this.getDragHandler().focus();
      this.createInput();
      this.refreshPopupPos();
      if (this.element.parentElement && this.element.parentElement.parentElement && this.element.parentElement.parentElement.classList.contains("e-ie-ddb-popup")) {
        this.refreshImageEditorPopupPos();
      }
      ;
      this.wireEvents();
      this.trigger("onModeSwitch", { element: this.container, mode: "Picker" });
    };
    ColorPicker2.prototype.ctrlBtnClick = function(ele, e) {
      if (ele.classList.contains(APPLY)) {
        var cValue = this.rgbToHex(this.rgb);
        this.triggerChangeEvent(cValue);
      }
      if (!this.inline) {
        this.closePopup(e);
        this.splitBtn.element.focus();
      } else if (ele.classList.contains(CANCEL)) {
        var beforeCloseArgs = { element: this.container, event: e, cancel: false };
        this.trigger("beforeClose", beforeCloseArgs);
      }
    };
    ColorPicker2.prototype.paletteKeyDown = function(e) {
      var target = e.target;
      if (!target.classList.contains(PALETTES)) {
        return;
      }
      var selectedEle;
      var idx;
      var tiles = [].slice.call(selectAll("." + TILE, target));
      var prevSelectedEle = tiles.filter(function(tile) {
        return tile.classList.contains("e-selected");
      }).pop();
      switch (!e.altKey && e.keyCode) {
        case 39:
          e.preventDefault();
          selectedEle = prevSelectedEle ? tiles[this.tilePosition(tiles, prevSelectedEle, this.enableRtl ? -1 : 1)] : tiles[this.enableRtl ? tiles.length - 1 : 0];
          this.keySelectionChanges(selectedEle);
          break;
        case 37:
          e.preventDefault();
          selectedEle = prevSelectedEle ? tiles[this.tilePosition(tiles, prevSelectedEle, this.enableRtl ? 1 : -1)] : tiles[this.enableRtl ? 0 : tiles.length - 1];
          this.keySelectionChanges(selectedEle);
          break;
        case 38:
          e.preventDefault();
          idx = prevSelectedEle ? this.tilePosition(tiles, prevSelectedEle, -this.columns) : 0;
          selectedEle = tiles[idx] ? tiles[idx] : tiles[idx - this.columns];
          this.keySelectionChanges(selectedEle);
          break;
        case 40:
          e.preventDefault();
          idx = prevSelectedEle ? this.tilePosition(tiles, prevSelectedEle, this.columns) : tiles.length - 1;
          if (tiles[idx]) {
            selectedEle = tiles[idx];
          } else {
            idx %= tiles.length;
            idx += tiles[tiles.length - 1].parentElement.childElementCount;
            selectedEle = tiles[idx];
          }
          this.keySelectionChanges(selectedEle);
          break;
        case 13:
          e.preventDefault();
          if (prevSelectedEle) {
            var cValue = prevSelectedEle.getAttribute("aria-label");
            this.enterKeyHandler(cValue ? cValue : "", e);
          }
      }
    };
    ColorPicker2.prototype.keySelectionChanges = function(newEle) {
      this.removeTileSelection();
      this.addTileSelection(newEle);
      if (newEle.classList.contains(NOCOLOR)) {
        this.noColorTile(true);
      } else {
        var cValue = newEle.getAttribute("aria-label");
        var pValue = this.rgbToHex(this.rgb);
        this.rgb = this.hexToRgb(cValue);
        this.hsv = this.rgbToHsv.apply(this, this.rgb);
        if (this.getWrapper().classList.contains(SHOWVALUE)) {
          this.updateInput(cValue);
        }
        this.triggerEvent(cValue, pValue, this.convertToRgbString(this.rgb), true);
      }
    };
    ColorPicker2.prototype.tilePosition = function(items, element2, cIdx) {
      items = Array.prototype.slice.call(items);
      var n = items.length;
      var emptyCount = this.columns - items[n - 1].parentElement.childElementCount;
      var idx = items.indexOf(element2);
      idx += cIdx;
      if (idx < 0) {
        idx += n + emptyCount;
      } else {
        idx %= n + emptyCount;
      }
      return idx;
    };
    ColorPicker2.prototype.inputHandler = function(e) {
      var target = e.target;
      if (!target.value.length) {
        return;
      }
      var hsv;
      var pValue;
      var label = select(".e-float-text", target.parentElement).textContent;
      switch (label) {
        case "HEX": {
          var value = "";
          if (target.value[0] === "#" && target.value.length !== 5 || target.value[0] !== "#" && target.value.length !== 4) {
            value = this.roundValue(target.value);
          }
          if (value.length === 9) {
            pValue = this.rgbToHex(this.rgb);
            this.rgb = this.hexToRgb(value + value.substr(-2));
            this.inputValueChange(this.rgbToHsv.apply(this, this.rgb), pValue, target.value);
          } else {
            return;
          }
          break;
        }
        case "R":
          if (this.rgb[0] !== Number(target.value)) {
            pValue = this.rgbToHex(this.rgb);
            this.rgb[0] = Number(target.value);
            hsv = this.rgbToHsv.apply(this, this.rgb);
            this.inputValueChange(hsv, pValue);
          }
          break;
        case "G":
          if (this.rgb[1] !== Number(target.value)) {
            pValue = this.rgbToHex(this.rgb);
            this.rgb[1] = Number(target.value);
            hsv = this.rgbToHsv.apply(this, this.rgb);
            this.inputValueChange(hsv, pValue);
          }
          break;
        case "B":
          if (this.rgb[2] !== Number(target.value)) {
            pValue = this.rgbToHex(this.rgb);
            this.rgb[2] = Number(target.value);
            hsv = this.rgbToHsv.apply(this, this.rgb);
            this.inputValueChange(hsv, pValue);
          }
          break;
        case "H":
          this.hueSlider.value = Number(target.value);
          break;
        case "S":
          if (this.hsv[1] !== Number(target.value)) {
            this.hsv[1] = Number(target.value);
            this.updateHsv();
            this.convertToOtherFormat();
          }
          break;
        case "V":
          if (this.hsv[2] !== Number(target.value)) {
            this.hsv[2] = Number(target.value);
            this.updateHsv();
            this.convertToOtherFormat();
          }
          break;
        case "A":
          this.opacitySlider.value = Number(target.value);
          break;
      }
    };
    ColorPicker2.prototype.inputValueChange = function(hsv, pValue, value) {
      if (hsv[0] !== this.hsv[0]) {
        this.hueSlider.setProperties({ "value": hsv[0] }, true);
        this.hueSlider.refresh();
        this.setHsvContainerBg(hsv[0]);
      }
      this.hsv = hsv;
      var cValue = this.rgbToHex(this.rgb);
      this.setHandlerPosition();
      this.updateInput(value ? value : cValue);
      var rgba = this.convertToRgbString(this.rgb);
      this.updatePreview(rgba);
      this.triggerEvent(cValue, pValue, rgba);
    };
    ColorPicker2.prototype.triggerEvent = function(cValue, pValue, rgba, isKey) {
      if (isKey === void 0) {
        isKey = false;
      }
      var hex = cValue.slice(0, 7);
      if (!this.showButtons && !isKey) {
        this.trigger("change", {
          currentValue: { hex, rgba },
          previousValue: { hex: this.value.slice(0, 7), rgba: this.convertToRgbString(this.hexToRgb(this.value)) },
          value: cValue
        });
        if (this.enableOpacity) {
          this.setProperties({ "value": cValue }, true);
        } else {
          this.setProperties({ "value": hex }, true);
        }
        this.element.value = hex ? hex : "#000000";
      } else {
        this.trigger("select", {
          currentValue: { hex, rgba },
          previousValue: { hex: pValue.slice(0, 7), rgba: this.convertToRgbString(this.hexToRgb(pValue)) }
        });
      }
    };
    ColorPicker2.prototype.destroy = function() {
      var _this = this;
      var wrapper = this.getWrapper();
      _super.prototype.destroy.call(this);
      ["tabindex", "spellcheck"].forEach(function(attr) {
        _this.element.removeAttribute(attr);
      });
      if (this.inline) {
        this.unWireEvents();
        this.destroyOtherComp();
      } else {
        if (this.isPopupOpen()) {
          this.unWireEvents();
          this.destroyOtherComp();
        }
        this.splitBtn.destroy();
        this.splitBtn = null;
      }
      this.tileRipple();
      this.tileRipple = null;
      this.ctrlBtnRipple();
      this.ctrlBtnRipple = null;
      if (this.element.nextElementSibling) {
        detach(this.element.nextElementSibling);
      }
      if (wrapper) {
        wrapper.parentElement.insertBefore(this.element, wrapper);
        detach(wrapper);
      }
      this.container = null;
      if (this.formElement) {
        EventHandler.remove(this.formElement, "reset", this.formResetHandler);
      }
    };
    ColorPicker2.prototype.destroyOtherComp = function() {
      if (this.isPicker()) {
        var popup = closest(this.hueSlider.element, ".e-color-picker");
        var numericElemColl = popup.querySelectorAll(".e-numerictextbox");
        for (var i = 0; i < numericElemColl.length; i++) {
          getInstance(numericElemColl[i], NumericTextBox).destroy();
        }
        this.hueSlider.destroy();
        if (this.enableOpacity) {
          this.opacitySlider.destroy();
          this.opacitySlider = null;
        }
        this.hueSlider = null;
        var tooltipInst = this.getTooltipInst();
        tooltipInst.close();
        tooltipInst.destroy();
        this.tooltipEle = null;
      }
    };
    ColorPicker2.prototype.isPopupOpen = function() {
      return this.getPopupEle().classList.contains("e-popup-open");
    };
    ColorPicker2.prototype.unWireEvents = function() {
      if (this.isPicker()) {
        var dragHandler = this.getDragHandler();
        EventHandler.remove(dragHandler, "keydown", this.pickerKeyDown);
        var ctrlBtn = select("." + CTRLBTN, this.container);
        if (ctrlBtn) {
          EventHandler.remove(ctrlBtn, "keydown", this.ctrlBtnKeyDown);
        }
        EventHandler.remove(this.getHsvContainer(), "mousedown touchstart", this.handlerDown);
        if (this.modeSwitcher || this.showButtons) {
          EventHandler.remove(select("." + CTRLSWITCH, this.container), "click", this.btnClickHandler);
        }
        EventHandler.remove(select("." + PREVIOUS, this.container), "click", this.previewHandler);
      } else {
        EventHandler.remove(this.container, "click", this.paletteClickHandler);
        EventHandler.remove(this.container, "keydown", this.paletteKeyDown);
      }
    };
    ColorPicker2.prototype.roundValue = function(value) {
      if (!value) {
        return "";
      }
      if (value[0] !== "#") {
        value = "#" + value;
      }
      var len = value.length;
      if (len === 4) {
        value += "f";
        len = 5;
      }
      if (len === 5) {
        var tempValue = "";
        for (var i = 1, len_1 = value.length; i < len_1; i++) {
          tempValue += value.charAt(i) + value.charAt(i);
        }
        value = "#" + tempValue;
        len = 9;
      }
      if (len === 7) {
        value += "ff";
      }
      return value;
    };
    ColorPicker2.prototype.hexToRgb = function(hex) {
      if (!hex) {
        return [];
      }
      hex = hex.trim();
      if (hex.length !== 9) {
        hex = this.roundValue(hex);
      }
      var opacity = Number((parseInt(hex.slice(-2), 16) / 255).toFixed(2));
      hex = hex.slice(1, 7);
      var bigInt = parseInt(hex, 16);
      var h = [];
      h.push(bigInt >> 16 & 255);
      h.push(bigInt >> 8 & 255);
      h.push(bigInt & 255);
      h.push(opacity);
      return h;
    };
    ColorPicker2.prototype.rgbToHsv = function(r, g, b, opacity) {
      if (this.rgb && !this.rgb.length) {
        return [];
      }
      r /= 255;
      g /= 255;
      b /= 255;
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var h;
      var v = max;
      var d = max - min;
      var s = max === 0 ? 0 : d / max;
      if (max === min) {
        h = 0;
      } else {
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }
      var hsv = [Math.round(h * 360), Math.round(s * 1e3) / 10, Math.round(v * 1e3) / 10];
      if (!isNullOrUndefined(opacity)) {
        hsv.push(opacity);
      }
      return hsv;
    };
    ColorPicker2.prototype.hsvToRgb = function(h, s, v, opacity) {
      var r;
      var g;
      var b;
      s /= 100;
      v /= 100;
      if (s === 0) {
        r = g = b = v;
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), opacity];
      }
      h /= 60;
      var i = Math.floor(h);
      var f = h - i;
      var p = v * (1 - s);
      var q = v * (1 - s * f);
      var t = v * (1 - s * (1 - f));
      switch (i) {
        case 0:
          r = v;
          g = t;
          b = p;
          break;
        case 1:
          r = q;
          g = v;
          b = p;
          break;
        case 2:
          r = p;
          g = v;
          b = t;
          break;
        case 3:
          r = p;
          g = q;
          b = v;
          break;
        case 4:
          r = t;
          g = p;
          b = v;
          break;
        default:
          r = v;
          g = p;
          b = q;
      }
      var rgb = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
      if (!isNullOrUndefined(opacity)) {
        rgb.push(opacity);
      }
      return rgb;
    };
    ColorPicker2.prototype.rgbToHex = function(rgb) {
      return rgb.length ? "#" + this.hex(rgb[0]) + this.hex(rgb[1]) + this.hex(rgb[2]) + (!isNullOrUndefined(rgb[3]) ? rgb[3] !== 0 ? (Math.round(rgb[3] * 255) + 65536).toString(16).substr(-2) : "00" : "") : "";
    };
    ColorPicker2.prototype.hex = function(x) {
      return ("0" + x.toString(16)).slice(-2);
    };
    ColorPicker2.prototype.changeModeSwitcherProp = function(prop) {
      var ctrlSwitchWrapper = select("." + CTRLSWITCH, this.container);
      if (prop) {
        if (ctrlSwitchWrapper) {
          this.appendModeSwitchBtn();
        } else {
          this.createCtrlBtn();
          if (this.isPicker() && !this.disabled) {
            this.addCtrlSwitchEvent();
          }
        }
      } else {
        if (ctrlSwitchWrapper) {
          if (this.showButtons) {
            detach(select("." + MODESWITCH, ctrlSwitchWrapper));
          } else {
            remove(ctrlSwitchWrapper);
          }
        }
      }
    };
    ColorPicker2.prototype.changeShowBtnProps = function(prop) {
      var ctrlBtnWrapper = select("." + CTRLSWITCH, this.container);
      if (prop) {
        if (ctrlBtnWrapper) {
          remove(ctrlBtnWrapper);
        }
        this.createCtrlBtn();
        if (this.isPicker() && !this.disabled) {
          this.addCtrlSwitchEvent();
        }
      } else {
        if (this.modeSwitcher) {
          detach(select("." + CTRLBTN, ctrlBtnWrapper));
        } else {
          remove(ctrlBtnWrapper);
        }
      }
    };
    ColorPicker2.prototype.changeValueProp = function(newProp) {
      if (this.isPicker()) {
        this.rgb = this.hexToRgb(newProp);
        this.hsv = this.rgbToHsv.apply(this, this.rgb);
        this.setHandlerPosition();
        detach(closest(this.hueSlider.element, ".e-slider-preview"));
        this.createSlider();
        this.setHsvContainerBg();
        this.updateInput(newProp);
        if (this.rgb.length === 4) {
          this.updateOpacityInput(this.rgb[3] * 100);
        }
      } else {
        this.removeTileSelection();
        var ele = this.container.querySelector('span[aria-label="' + this.roundValue(newProp) + '"]');
        if (ele) {
          this.addTileSelection(ele);
        }
      }
    };
    ColorPicker2.prototype.setInputEleProps = function() {
      remove(select("." + INPUTWRAPPER, this.container));
      this.createInput();
    };
    ColorPicker2.prototype.changeDisabledProp = function(newProp) {
      if (this.isPicker()) {
        this.hueSlider.enabled = !newProp;
        this.opacitySlider.enabled = !newProp;
        this.setInputEleProps();
      }
      if (newProp) {
        this.toggleDisabled(true);
        this.unWireEvents();
      } else {
        this.toggleDisabled(false);
        this.wireEvents();
      }
    };
    ColorPicker2.prototype.changeCssClassProps = function(newProp, oldProp) {
      var wrapper = this.getWrapper();
      var popupWrapper = this.getPopupEle();
      if (oldProp) {
        removeClass([wrapper, popupWrapper], oldProp.split(" "));
      }
      if (newProp) {
        addClass([wrapper, popupWrapper], newProp.replace(/\s+/g, " ").trim().split(" "));
      }
    };
    ColorPicker2.prototype.changeRtlProps = function(newProp) {
      if (newProp) {
        addClass([this.getWrapper()], "e-rtl");
      } else {
        removeClass([this.getWrapper()], "e-rtl");
      }
    };
    ColorPicker2.prototype.changePaletteProps = function() {
      detach(this.container.children[0]);
      this.container.style.width = "";
      this.createPalette();
    };
    ColorPicker2.prototype.changeOpacityProps = function(newProp) {
      var wrapper = this.getWrapper();
      if (newProp) {
        removeClass([this.container.parentElement], HIDEOPACITY);
        this.createOpacitySlider(select(".e-colorpicker-slider", this.container).appendChild(this.createElement("div", { className: "e-opacity-slider" })));
        if (!wrapper.classList.contains(HIDEVALUE) && !wrapper.classList.contains(HIDERGBA)) {
          this.appendOpacityValue(select(".e-input-container", this.container));
        }
      } else {
        addClass([this.container.parentElement], HIDEOPACITY);
        this.opacitySlider.destroy();
        remove(this.opacitySlider.element);
        this.opacitySlider = null;
        if (!wrapper.classList.contains(HIDEVALUE) && !wrapper.classList.contains(HIDERGBA)) {
          remove(select("." + OPACITY, this.container).parentElement);
        }
      }
    };
    ColorPicker2.prototype.onPropertyChanged = function(newProp, oldProp) {
      var _this = this;
      if (!isNullOrUndefined(newProp.value)) {
        var value = this.roundValue(newProp.value);
        if (value.length === 9) {
          this.element.value = this.roundValue(value).slice(0, 7);
          var preview = this.splitBtn && select("." + SPLITPREVIEW, this.splitBtn.element);
          if (preview) {
            preview.style.backgroundColor = this.convertToRgbString(this.hexToRgb(newProp.value));
          }
        } else if (this.noColor && this.mode === "Palette" && this.value === "") {
          var preview = this.splitBtn && select("." + SPLITPREVIEW, this.splitBtn.element);
          preview.style.backgroundColor = "";
        } else {
          this.value = oldProp.value;
        }
      }
      if (!this.inline && isNullOrUndefined(newProp.inline)) {
        var otherCompModel = ["disabled", "enableRtl"];
        this.splitBtn.setProperties(getModel(newProp, otherCompModel));
        if (!this.isPopupOpen()) {
          this.changeCssClassProps(newProp.cssClass, oldProp.cssClass);
          this.changeRtlProps(newProp.enableRtl);
          return;
        }
      }
      var _loop_1 = function(prop2) {
        switch (prop2) {
          case "inline":
            if (newProp.inline) {
              this_1.getWrapper().appendChild(this_1.container);
              this_1.splitBtn.destroy();
              detach(this_1.element.nextElementSibling);
              if (!this_1.container.children.length) {
                this_1.createWidget();
              }
            } else {
              this_1.destroyOtherComp();
              this_1.unWireEvents();
              this_1.container.innerHTML = "";
              this_1.createSplitBtn();
            }
            break;
          case "cssClass": {
            this_1.changeCssClassProps(newProp.cssClass, oldProp.cssClass);
            var props = newProp.cssClass.split(" ").concat(oldProp.cssClass.split(" "));
            props = props.reduce(function(a, b) {
              if (a.indexOf(b) < 0) {
                a.push(b);
              }
              return a;
            }, []);
            var count_1 = 0;
            props.forEach(function(cls) {
              if (count_1 === 0 && (cls === HIDEVALUE || cls === HIDEVALUESWITCH || cls === SHOWVALUE || cls === HIDEHEX || cls === HIDERGBA)) {
                var inputWrap = select("." + INPUTWRAPPER, _this.container);
                if (inputWrap) {
                  remove(select("." + INPUTWRAPPER, _this.container));
                }
                _this.createInput();
                count_1++;
              }
            });
            break;
          }
          case "enableRtl":
            if (this_1.isPicker()) {
              this_1.hueSlider.enableRtl = newProp.enableRtl;
              if (this_1.enableOpacity) {
                this_1.opacitySlider.enableRtl = newProp.enableRtl;
              }
              this_1.setInputEleProps();
            }
            this_1.changeRtlProps(newProp.enableRtl);
            break;
          case "disabled":
            this_1.changeDisabledProp(newProp.disabled);
            break;
          case "value":
            if (this_1.value !== oldProp.value) {
              this_1.changeValueProp(newProp.value);
            }
            break;
          case "showButtons":
            this_1.changeShowBtnProps(newProp.showButtons);
            break;
          case "mode":
            if (newProp.mode === "Picker") {
              this_1.switchToPicker();
            } else {
              this_1.switchToPalette();
            }
            break;
          case "modeSwitcher":
            this_1.changeModeSwitcherProp(newProp.modeSwitcher);
            break;
          case "columns":
          case "presetColors":
            if (!this_1.isPicker()) {
              this_1.changePaletteProps();
            }
            break;
          case "noColor":
            if (newProp.noColor) {
              if (this_1.mode === "Palette" && !this_1.modeSwitcher) {
                this_1.setNoColor();
              }
            } else {
              this_1.changePaletteProps();
            }
            break;
          case "enableOpacity":
            this_1.changeOpacityProps(newProp.enableOpacity);
            break;
        }
      };
      var this_1 = this;
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        _loop_1(prop);
      }
    };
    ColorPicker2.prototype.focusIn = function() {
      this.element.parentElement.focus();
    };
    __decorate13([
      Property("#008000ff")
    ], ColorPicker2.prototype, "value", void 0);
    __decorate13([
      Property("")
    ], ColorPicker2.prototype, "cssClass", void 0);
    __decorate13([
      Property(false)
    ], ColorPicker2.prototype, "disabled", void 0);
    __decorate13([
      Property("Picker")
    ], ColorPicker2.prototype, "mode", void 0);
    __decorate13([
      Property(true)
    ], ColorPicker2.prototype, "modeSwitcher", void 0);
    __decorate13([
      Property(null)
    ], ColorPicker2.prototype, "presetColors", void 0);
    __decorate13([
      Property(true)
    ], ColorPicker2.prototype, "showButtons", void 0);
    __decorate13([
      Property(10)
    ], ColorPicker2.prototype, "columns", void 0);
    __decorate13([
      Property(false)
    ], ColorPicker2.prototype, "inline", void 0);
    __decorate13([
      Property(false)
    ], ColorPicker2.prototype, "noColor", void 0);
    __decorate13([
      Property(false)
    ], ColorPicker2.prototype, "enablePersistence", void 0);
    __decorate13([
      Property(true)
    ], ColorPicker2.prototype, "enableOpacity", void 0);
    __decorate13([
      Property(false)
    ], ColorPicker2.prototype, "createPopupOnClick", void 0);
    __decorate13([
      Event()
    ], ColorPicker2.prototype, "select", void 0);
    __decorate13([
      Event()
    ], ColorPicker2.prototype, "change", void 0);
    __decorate13([
      Event()
    ], ColorPicker2.prototype, "beforeTileRender", void 0);
    __decorate13([
      Event()
    ], ColorPicker2.prototype, "beforeOpen", void 0);
    __decorate13([
      Event()
    ], ColorPicker2.prototype, "open", void 0);
    __decorate13([
      Event()
    ], ColorPicker2.prototype, "beforeClose", void 0);
    __decorate13([
      Event()
    ], ColorPicker2.prototype, "beforeModeSwitch", void 0);
    __decorate13([
      Event()
    ], ColorPicker2.prototype, "onModeSwitch", void 0);
    __decorate13([
      Event()
    ], ColorPicker2.prototype, "created", void 0);
    ColorPicker2 = __decorate13([
      NotifyPropertyChanges
    ], ColorPicker2);
    return ColorPicker2;
  }(Component)
);

// node_modules/@syncfusion/ej2-inputs/src/textbox/textbox.js
var __extends14 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate14 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HIDE_CLEAR = "e-clear-icon-hide";
var TEXTBOX_FOCUS = "e-input-focus";
var containerAttr = ["title", "style", "class"];
var TextBox = (
  /** @class */
  function(_super) {
    __extends14(TextBox2, _super);
    function TextBox2(options, element2) {
      var _this = _super.call(this, options, element2) || this;
      _this.previousValue = null;
      _this.isAngular = false;
      _this.isHiddenInput = false;
      _this.isForm = false;
      _this.inputPreviousValue = null;
      _this.isVue = false;
      _this.textboxOptions = options;
      return _this;
    }
    TextBox2.prototype.onPropertyChanged = function(newProp, oldProp) {
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "floatLabelType":
            Input.removeFloating(this.textboxWrapper);
            Input.addFloating(this.respectiveElement, this.floatLabelType, this.placeholder);
            break;
          case "enabled":
            Input.setEnabled(this.enabled, this.respectiveElement, this.floatLabelType, this.textboxWrapper.container);
            this.bindClearEvent();
            break;
          case "width":
            Input.setWidth(newProp.width, this.textboxWrapper.container);
            break;
          case "value":
            {
              var prevOnChange = this.isProtectedOnChange;
              this.isProtectedOnChange = true;
              if (!this.isBlank(this.value)) {
                this.value = this.value.toString();
              }
              this.isProtectedOnChange = prevOnChange;
              Input.setValue(this.value, this.respectiveElement, this.floatLabelType, this.showClearButton);
              if (this.isHiddenInput) {
                this.element.value = this.respectiveElement.value;
              }
              this.inputPreviousValue = this.respectiveElement.value;
              if ((this.isAngular || this.isVue) && this.preventChange === true) {
                this.previousValue = this.isAngular ? this.value : this.previousValue;
                this.preventChange = false;
              } else if (isNullOrUndefined(this.isAngular) || !this.isAngular || this.isAngular && !this.preventChange || this.isAngular && isNullOrUndefined(this.preventChange)) {
                this.raiseChangeEvent();
              }
            }
            break;
          case "htmlAttributes":
            {
              this.updateHTMLAttrToElement();
              this.updateHTMLAttrToWrapper();
              this.checkAttributes(true);
              this.multiline && !isNullOrUndefined(this.textarea) ? Input.validateInputType(this.textboxWrapper.container, this.textarea) : Input.validateInputType(this.textboxWrapper.container, this.element);
            }
            break;
          case "readonly":
            Input.setReadonly(this.readonly, this.respectiveElement);
            break;
          case "type":
            if (this.respectiveElement.tagName !== "TEXTAREA") {
              this.respectiveElement.setAttribute("type", this.type);
              Input.validateInputType(this.textboxWrapper.container, this.element);
              this.raiseChangeEvent();
            }
            break;
          case "showClearButton":
            Input.setClearButton(this.showClearButton, this.respectiveElement, this.textboxWrapper);
            this.bindClearEvent();
            break;
          case "enableRtl":
            Input.setEnableRtl(this.enableRtl, [this.textboxWrapper.container]);
            break;
          case "placeholder":
            Input.setPlaceholder(this.placeholder, this.respectiveElement);
            Input.calculateWidth(this.respectiveElement, this.textboxWrapper.container);
            break;
          case "autocomplete":
            if (this.autocomplete !== "on" && this.autocomplete !== "") {
              this.respectiveElement.autocomplete = this.autocomplete;
            } else {
              this.removeAttributes(["autocomplete"]);
            }
            break;
          case "cssClass":
            this.updateCssClass(newProp.cssClass, oldProp.cssClass);
            break;
          case "locale":
            this.globalize = new Internationalization(this.locale);
            this.l10n.setLocale(this.locale);
            this.setProperties({ placeholder: this.l10n.getConstant("placeholder") }, true);
            Input.setPlaceholder(this.placeholder, this.respectiveElement);
            break;
        }
      }
    };
    TextBox2.prototype.getModuleName = function() {
      return "textbox";
    };
    TextBox2.prototype.isBlank = function(str) {
      return !str || /^\s*$/.test(str);
    };
    TextBox2.prototype.preRender = function() {
      this.cloneElement = this.element.cloneNode(true);
      this.formElement = closest(this.element, "form");
      if (!isNullOrUndefined(this.formElement)) {
        this.isForm = true;
      }
      if (this.element.tagName === "EJS-TEXTBOX") {
        var ejInstance = getValue("ej2_instances", this.element);
        var inputElement = this.multiline ? this.createElement("textarea") : this.createElement("input");
        var index = 0;
        for (index; index < this.element.attributes.length; index++) {
          var attributeName = this.element.attributes[index].nodeName;
          if (attributeName !== "id" && attributeName !== "class") {
            inputElement.setAttribute(attributeName, this.element.attributes[index].nodeValue);
            inputElement.innerHTML = this.element.innerHTML;
            if (attributeName === "name") {
              this.element.removeAttribute("name");
            }
          } else if (attributeName === "class") {
            inputElement.setAttribute(attributeName, this.element.className.split(" ").filter(function(item) {
              return item.indexOf("ng-") !== 0;
            }).join(" "));
          }
        }
        this.element.appendChild(inputElement);
        this.element = inputElement;
        setValue("ej2_instances", ejInstance, this.element);
      }
      this.updateHTMLAttrToElement();
      this.checkAttributes(false);
      if ((isNullOrUndefined(this.textboxOptions) || this.textboxOptions["value"] === void 0) && this.element.value !== "") {
        this.setProperties({ value: this.element.value }, true);
      }
      if (this.element.tagName !== "TEXTAREA") {
        this.element.setAttribute("type", this.type);
      }
      if (this.type === "text") {
        this.element.setAttribute("role", "textbox");
      }
      this.globalize = new Internationalization(this.locale);
      var localeText = { placeholder: this.placeholder };
      this.l10n = new L10n("textbox", localeText, this.locale);
      if (this.l10n.getConstant("placeholder") !== "") {
        this.setProperties({ placeholder: this.placeholder || this.l10n.getConstant("placeholder") }, true);
      }
      if (!this.element.hasAttribute("id")) {
        this.element.setAttribute("id", getUniqueID("textbox"));
      }
      if (!this.element.hasAttribute("name")) {
        this.element.setAttribute("name", this.element.getAttribute("id"));
      }
      if (this.element.tagName === "INPUT" && this.multiline) {
        this.isHiddenInput = true;
        this.textarea = this.createElement("textarea");
        this.element.parentNode.insertBefore(this.textarea, this.element);
        this.element.setAttribute("type", "hidden");
        this.textarea.setAttribute("name", this.element.getAttribute("name"));
        this.element.removeAttribute("name");
        this.textarea.setAttribute("role", this.element.getAttribute("role"));
        this.element.removeAttribute("role");
        this.textarea.setAttribute("id", getUniqueID("textarea"));
        var apiAttributes = ["placeholder", "disabled", "value", "readonly", "type", "autocomplete"];
        for (var index = 0; index < this.element.attributes.length; index++) {
          var attributeName = this.element.attributes[index].nodeName;
          if (this.element.hasAttribute(attributeName) && containerAttr.indexOf(attributeName) < 0 && !(attributeName === "id" || attributeName === "type" || attributeName === "e-mappinguid")) {
            this.textarea.setAttribute(attributeName, this.element.attributes[index].nodeValue);
            if (apiAttributes.indexOf(attributeName) < 0) {
              this.element.removeAttribute(attributeName);
              index--;
            }
          }
        }
      }
    };
    TextBox2.prototype.checkAttributes = function(isDynamic) {
      var attrs = isDynamic ? isNullOrUndefined(this.htmlAttributes) ? [] : Object.keys(this.htmlAttributes) : ["placeholder", "disabled", "value", "readonly", "type", "autocomplete"];
      for (var _i = 0, attrs_1 = attrs; _i < attrs_1.length; _i++) {
        var key = attrs_1[_i];
        if (!isNullOrUndefined(this.element.getAttribute(key))) {
          switch (key) {
            case "disabled":
              if (isNullOrUndefined(this.textboxOptions) || this.textboxOptions["enabled"] === void 0 || isDynamic) {
                var enabled = this.element.getAttribute(key) === "disabled" || this.element.getAttribute(key) === "" || this.element.getAttribute(key) === "true" ? false : true;
                this.setProperties({ enabled }, !isDynamic);
              }
              break;
            case "readonly":
              if (isNullOrUndefined(this.textboxOptions) || this.textboxOptions["readonly"] === void 0 || isDynamic) {
                var readonly = this.element.getAttribute(key) === "readonly" || this.element.getAttribute(key) === "" || this.element.getAttribute(key) === "true" ? true : false;
                this.setProperties({ readonly }, !isDynamic);
              }
              break;
            case "placeholder":
              if (isNullOrUndefined(this.textboxOptions) || this.textboxOptions["placeholder"] === void 0 || isDynamic) {
                this.setProperties({ placeholder: this.element.placeholder }, !isDynamic);
              }
              break;
            case "autocomplete":
              if (isNullOrUndefined(this.textboxOptions) || this.textboxOptions["autocomplete"] === void 0 || isDynamic) {
                var autoCompleteTxt = this.element.autocomplete === "off" ? "off" : "on";
                this.setProperties({ autocomplete: autoCompleteTxt }, !isDynamic);
              }
              break;
            case "value":
              if ((isNullOrUndefined(this.textboxOptions) || this.textboxOptions["value"] === void 0 || isDynamic) && this.element.value !== "") {
                this.setProperties({ value: this.element.value }, !isDynamic);
              }
              break;
            case "type":
              if (isNullOrUndefined(this.textboxOptions) || this.textboxOptions["type"] === void 0 || isDynamic) {
                this.setProperties({ type: this.element.type }, !isDynamic);
              }
              break;
          }
        }
      }
    };
    TextBox2.prototype.render = function() {
      var updatedCssClassValue = this.cssClass;
      if (!isNullOrUndefined(this.cssClass) && this.cssClass !== "") {
        updatedCssClassValue = this.getInputValidClassList(this.cssClass);
      }
      this.respectiveElement = this.isHiddenInput ? this.textarea : this.element;
      this.textboxWrapper = Input.createInput({
        element: this.respectiveElement,
        floatLabelType: this.floatLabelType,
        properties: {
          enabled: this.enabled,
          enableRtl: this.enableRtl,
          cssClass: updatedCssClassValue,
          readonly: this.readonly,
          placeholder: this.placeholder,
          showClearButton: this.showClearButton
        }
      });
      this.updateHTMLAttrToWrapper();
      if (this.isHiddenInput) {
        this.respectiveElement.parentNode.insertBefore(this.element, this.respectiveElement);
      }
      this.wireEvents();
      if (!isNullOrUndefined(this.value)) {
        Input.setValue(this.value, this.respectiveElement, this.floatLabelType, this.showClearButton);
        if (this.isHiddenInput) {
          this.element.value = this.respectiveElement.value;
        }
      }
      if (!isNullOrUndefined(this.value)) {
        this.initialValue = this.value;
        this.setInitialValue();
      }
      if (this.autocomplete !== "on" && this.autocomplete !== "") {
        this.respectiveElement.autocomplete = this.autocomplete;
      } else if (!isNullOrUndefined(this.textboxOptions) && this.textboxOptions["autocomplete"] !== void 0) {
        this.removeAttributes(["autocomplete"]);
      }
      this.previousValue = this.value;
      this.inputPreviousValue = this.value;
      this.respectiveElement.defaultValue = this.respectiveElement.value;
      Input.setWidth(this.width, this.textboxWrapper.container);
      if (!isNullOrUndefined(closest(this.element, "fieldset")) && closest(this.element, "fieldset").disabled) {
        this.enabled = false;
      }
      this.renderComplete();
    };
    TextBox2.prototype.updateHTMLAttrToWrapper = function() {
      if (!isNullOrUndefined(this.htmlAttributes)) {
        for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
          var key = _a[_i];
          if (containerAttr.indexOf(key) > -1) {
            if (key === "class") {
              var updatedClassValues = this.getInputValidClassList(this.htmlAttributes["" + key]);
              if (updatedClassValues !== "") {
                addClass([this.textboxWrapper.container], updatedClassValues.split(" "));
              }
            } else if (key === "style") {
              var setStyle = this.textboxWrapper.container.getAttribute(key);
              setStyle = !isNullOrUndefined(setStyle) ? setStyle + this.htmlAttributes["" + key] : this.htmlAttributes["" + key];
              this.textboxWrapper.container.setAttribute(key, setStyle);
            } else {
              this.textboxWrapper.container.setAttribute(key, this.htmlAttributes["" + key]);
            }
          }
        }
      }
    };
    TextBox2.prototype.updateHTMLAttrToElement = function() {
      if (!isNullOrUndefined(this.htmlAttributes)) {
        for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
          var key = _a[_i];
          if (containerAttr.indexOf(key) < 0) {
            this.multiline && !isNullOrUndefined(this.textarea) ? this.textarea.setAttribute(key, this.htmlAttributes["" + key]) : this.element.setAttribute(key, this.htmlAttributes["" + key]);
          }
        }
      }
    };
    TextBox2.prototype.updateCssClass = function(newClass, oldClass) {
      Input.setCssClass(this.getInputValidClassList(newClass), [this.textboxWrapper.container], this.getInputValidClassList(oldClass));
    };
    TextBox2.prototype.getInputValidClassList = function(inputClassName) {
      var result = inputClassName;
      if (!isNullOrUndefined(inputClassName) && inputClassName !== "") {
        result = inputClassName.replace(/\s+/g, " ").trim();
      }
      return result;
    };
    TextBox2.prototype.setInitialValue = function() {
      if (!this.isAngular) {
        this.respectiveElement.setAttribute("value", this.initialValue);
      }
    };
    TextBox2.prototype.wireEvents = function() {
      EventHandler.add(this.respectiveElement, "focus", this.focusHandler, this);
      EventHandler.add(this.respectiveElement, "blur", this.focusOutHandler, this);
      EventHandler.add(this.respectiveElement, "keydown", this.keydownHandler, this);
      EventHandler.add(this.respectiveElement, "input", this.inputHandler, this);
      EventHandler.add(this.respectiveElement, "change", this.changeHandler, this);
      if (this.isForm) {
        EventHandler.add(this.formElement, "reset", this.resetForm, this);
      }
      this.bindClearEvent();
      if (!isNullOrUndefined(this.textboxWrapper.container.querySelector(".e-float-text")) && this.floatLabelType === "Auto" && this.textboxWrapper.container.classList.contains("e-autofill") && this.textboxWrapper.container.classList.contains("e-outline")) {
        EventHandler.add(this.textboxWrapper.container.querySelector(".e-float-text"), "animationstart", this.animationHandler, this);
      }
    };
    TextBox2.prototype.animationHandler = function() {
      this.textboxWrapper.container.classList.add("e-valid-input");
      var label = this.textboxWrapper.container.querySelector(".e-float-text");
      if (!isNullOrUndefined(label)) {
        label.classList.add("e-label-top");
        if (label.classList.contains("e-label-bottom")) {
          label.classList.remove("e-label-bottom");
        }
      }
    };
    TextBox2.prototype.resetValue = function(value) {
      var prevOnChange = this.isProtectedOnChange;
      this.isProtectedOnChange = true;
      this.value = value;
      if (value == null && this.textboxWrapper.container.classList.contains("e-valid-input")) {
        this.textboxWrapper.container.classList.remove("e-valid-input");
      }
      this.isProtectedOnChange = prevOnChange;
    };
    TextBox2.prototype.resetForm = function() {
      if (this.isAngular) {
        this.resetValue("");
      } else {
        this.resetValue(this.initialValue);
      }
      if (!isNullOrUndefined(this.textboxWrapper)) {
        var label = this.textboxWrapper.container.querySelector(".e-float-text");
        if (!isNullOrUndefined(label) && this.floatLabelType !== "Always") {
          if (isNullOrUndefined(this.initialValue) || this.initialValue === "") {
            label.classList.add("e-label-bottom");
            label.classList.remove("e-label-top");
          } else if (this.initialValue !== "") {
            label.classList.add("e-label-top");
            label.classList.remove("e-label-bottom");
          }
        }
      }
    };
    TextBox2.prototype.focusHandler = function(args) {
      var eventArgs = {
        container: this.textboxWrapper.container,
        event: args,
        value: this.value
      };
      this.trigger("focus", eventArgs);
    };
    TextBox2.prototype.focusOutHandler = function(args) {
      if (!(this.previousValue === null && this.value === null && this.respectiveElement.value === "") && this.previousValue !== this.value) {
        this.raiseChangeEvent(args, true);
      }
      var eventArgs = {
        container: this.textboxWrapper.container,
        event: args,
        value: this.value
      };
      this.trigger("blur", eventArgs);
    };
    TextBox2.prototype.keydownHandler = function(args) {
      if ((args.keyCode === 13 || args.keyCode === 9) && !((this.previousValue === null || this.previousValue === "") && (this.value === null || this.value === "") && this.respectiveElement.value === "")) {
        this.setProperties({ value: this.respectiveElement.value }, true);
      }
    };
    TextBox2.prototype.inputHandler = function(args) {
      var textboxObj = this;
      var eventArgs = {
        event: args,
        value: this.respectiveElement.value,
        previousValue: this.inputPreviousValue,
        container: this.textboxWrapper.container
      };
      this.inputPreviousValue = this.respectiveElement.value;
      if (this.isAngular) {
        textboxObj.localChange({ value: this.respectiveElement.value });
        this.preventChange = true;
      }
      if (this.isVue) {
        this.preventChange = true;
      }
      this.trigger("input", eventArgs);
      args.stopPropagation();
    };
    TextBox2.prototype.changeHandler = function(args) {
      this.setProperties({ value: this.respectiveElement.value }, true);
      if (this.previousValue != this.value) {
        this.raiseChangeEvent(args, true);
      }
      args.stopPropagation();
    };
    TextBox2.prototype.raiseChangeEvent = function(event, interaction) {
      var eventArgs = {
        event,
        value: this.value,
        previousValue: this.previousValue,
        container: this.textboxWrapper.container,
        isInteraction: interaction ? interaction : false,
        isInteracted: interaction ? interaction : false
      };
      this.preventChange = false;
      this.trigger("change", eventArgs);
      this.previousValue = this.value;
      if (this.element.tagName === "INPUT" && this.multiline && Browser.info.name === "mozilla") {
        this.element.value = this.respectiveElement.value;
      }
    };
    TextBox2.prototype.bindClearEvent = function() {
      if (this.showClearButton) {
        if (this.enabled) {
          EventHandler.add(this.textboxWrapper.clearButton, "mousedown touchstart", this.resetInputHandler, this);
        } else {
          EventHandler.remove(this.textboxWrapper.clearButton, "mousedown touchstart", this.resetInputHandler);
        }
      }
    };
    TextBox2.prototype.resetInputHandler = function(event) {
      event.preventDefault();
      if (!this.textboxWrapper.clearButton.classList.contains(HIDE_CLEAR) || this.textboxWrapper.container.classList.contains("e-static-clear")) {
        Input.setValue("", this.respectiveElement, this.floatLabelType, this.showClearButton);
        if (this.isHiddenInput) {
          this.element.value = this.respectiveElement.value;
        }
        this.setProperties({ value: this.respectiveElement.value }, true);
        var eventArgs = {
          event,
          value: this.respectiveElement.value,
          previousValue: this.inputPreviousValue,
          container: this.textboxWrapper.container
        };
        this.trigger("input", eventArgs);
        this.inputPreviousValue = this.respectiveElement.value;
        this.raiseChangeEvent(event, true);
        if (closest(this.element, "form")) {
          var element2 = this.element;
          var keyupEvent = document.createEvent("KeyboardEvent");
          keyupEvent.initEvent("keyup", false, true);
          element2.dispatchEvent(keyupEvent);
        }
      }
    };
    TextBox2.prototype.unWireEvents = function() {
      EventHandler.remove(this.respectiveElement, "focus", this.focusHandler);
      EventHandler.remove(this.respectiveElement, "blur", this.focusOutHandler);
      EventHandler.remove(this.respectiveElement, "keydown", this.keydownHandler);
      EventHandler.remove(this.respectiveElement, "input", this.inputHandler);
      EventHandler.remove(this.respectiveElement, "change", this.changeHandler);
      if (this.isForm) {
        EventHandler.remove(this.formElement, "reset", this.resetForm);
      }
      if (!isNullOrUndefined(this.textboxWrapper.container.querySelector(".e-float-text")) && this.floatLabelType === "Auto" && this.textboxWrapper.container.classList.contains("e-outline") && this.textboxWrapper.container.classList.contains("e-autofill")) {
        EventHandler.remove(this.textboxWrapper.container.querySelector(".e-float-text"), "animationstart", this.animationHandler);
      }
    };
    TextBox2.prototype.destroy = function() {
      this.unWireEvents();
      if (this.element.tagName === "INPUT" && this.multiline) {
        detach(this.textboxWrapper.container.getElementsByTagName("textarea")[0]);
        this.respectiveElement = this.element;
        this.element.removeAttribute("type");
      }
      this.respectiveElement.value = this.respectiveElement.defaultValue;
      this.respectiveElement.classList.remove("e-input");
      this.removeAttributes(["aria-disabled", "aria-readonly", "aria-labelledby"]);
      if (!isNullOrUndefined(this.textboxWrapper)) {
        this.textboxWrapper.container.insertAdjacentElement("afterend", this.respectiveElement);
        detach(this.textboxWrapper.container);
      }
      this.textboxWrapper = null;
      Input.destroy();
      _super.prototype.destroy.call(this);
    };
    TextBox2.prototype.addIcon = function(position, icons) {
      Input.addIcon(position, icons, this.textboxWrapper.container, this.respectiveElement, this.createElement);
    };
    TextBox2.prototype.getPersistData = function() {
      var keyEntity = ["value"];
      return this.addOnPersist(keyEntity);
    };
    TextBox2.prototype.addAttributes = function(attributes2) {
      for (var _i = 0, _a = Object.keys(attributes2); _i < _a.length; _i++) {
        var key = _a[_i];
        if (key === "disabled") {
          this.setProperties({ enabled: false }, true);
          Input.setEnabled(this.enabled, this.respectiveElement, this.floatLabelType, this.textboxWrapper.container);
        } else if (key === "readonly") {
          this.setProperties({ readonly: true }, true);
          Input.setReadonly(this.readonly, this.respectiveElement);
        } else if (key === "class") {
          this.respectiveElement.classList.add(attributes2["" + key]);
        } else if (key === "placeholder") {
          this.setProperties({ placeholder: attributes2["" + key] }, true);
          Input.setPlaceholder(this.placeholder, this.respectiveElement);
        } else if (key === "rows" && this.respectiveElement.tagName === "TEXTAREA") {
          this.respectiveElement.setAttribute(key, attributes2["" + key]);
        } else {
          this.respectiveElement.setAttribute(key, attributes2["" + key]);
        }
      }
    };
    TextBox2.prototype.removeAttributes = function(attributes2) {
      for (var _i = 0, attributes_1 = attributes2; _i < attributes_1.length; _i++) {
        var key = attributes_1[_i];
        if (key === "disabled") {
          this.setProperties({ enabled: true }, true);
          Input.setEnabled(this.enabled, this.respectiveElement, this.floatLabelType, this.textboxWrapper.container);
        } else if (key === "readonly") {
          this.setProperties({ readonly: false }, true);
          Input.setReadonly(this.readonly, this.respectiveElement);
        } else if (key === "placeholder") {
          this.setProperties({ placeholder: null }, true);
          Input.setPlaceholder(this.placeholder, this.respectiveElement);
        } else {
          this.respectiveElement.removeAttribute(key);
        }
      }
    };
    TextBox2.prototype.focusIn = function() {
      if (document.activeElement !== this.respectiveElement && this.enabled) {
        this.respectiveElement.focus();
        if (this.textboxWrapper.container.classList.contains("e-input-group") || this.textboxWrapper.container.classList.contains("e-outline") || this.textboxWrapper.container.classList.contains("e-filled")) {
          addClass([this.textboxWrapper.container], [TEXTBOX_FOCUS]);
        }
      }
    };
    TextBox2.prototype.focusOut = function() {
      if (document.activeElement === this.respectiveElement && this.enabled) {
        this.respectiveElement.blur();
        if (this.textboxWrapper.container.classList.contains("e-input-group") || this.textboxWrapper.container.classList.contains("e-outline") || this.textboxWrapper.container.classList.contains("e-filled")) {
          removeClass([this.textboxWrapper.container], [TEXTBOX_FOCUS]);
        }
      }
    };
    __decorate14([
      Property("text")
    ], TextBox2.prototype, "type", void 0);
    __decorate14([
      Property(false)
    ], TextBox2.prototype, "readonly", void 0);
    __decorate14([
      Property(null)
    ], TextBox2.prototype, "value", void 0);
    __decorate14([
      Property("Never")
    ], TextBox2.prototype, "floatLabelType", void 0);
    __decorate14([
      Property("")
    ], TextBox2.prototype, "cssClass", void 0);
    __decorate14([
      Property(null)
    ], TextBox2.prototype, "placeholder", void 0);
    __decorate14([
      Property("on")
    ], TextBox2.prototype, "autocomplete", void 0);
    __decorate14([
      Property({})
    ], TextBox2.prototype, "htmlAttributes", void 0);
    __decorate14([
      Property(false)
    ], TextBox2.prototype, "multiline", void 0);
    __decorate14([
      Property(true)
    ], TextBox2.prototype, "enabled", void 0);
    __decorate14([
      Property(false)
    ], TextBox2.prototype, "showClearButton", void 0);
    __decorate14([
      Property(false)
    ], TextBox2.prototype, "enablePersistence", void 0);
    __decorate14([
      Property(null)
    ], TextBox2.prototype, "width", void 0);
    __decorate14([
      Event()
    ], TextBox2.prototype, "created", void 0);
    __decorate14([
      Event()
    ], TextBox2.prototype, "destroyed", void 0);
    __decorate14([
      Event()
    ], TextBox2.prototype, "change", void 0);
    __decorate14([
      Event()
    ], TextBox2.prototype, "blur", void 0);
    __decorate14([
      Event()
    ], TextBox2.prototype, "focus", void 0);
    __decorate14([
      Event()
    ], TextBox2.prototype, "input", void 0);
    TextBox2 = __decorate14([
      NotifyPropertyChanges
    ], TextBox2);
    return TextBox2;
  }(Component)
);

// node_modules/@syncfusion/ej2-inputs/src/common/signature-base.js
var __extends15 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var SignatureBase = (
  /** @class */
  function(_super) {
    __extends15(SignatureBase2, _super);
    function SignatureBase2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.minDistance = 5;
      _this.previous = 0;
      _this.interval = 30;
      _this.timeout = null;
      _this.isSignatureEmpty = true;
      _this.backgroundLoaded = null;
      _this.isBlazor = false;
      _this.isResponsive = false;
      _this.signPointsColl = [];
      _this.signRatioPointsColl = [];
      return _this;
    }
    SignatureBase2.prototype.initialize = function(element2, dotnetRef) {
      this.clearArray = [];
      this.element = element2;
      this.canvasContext = this.element.getContext("2d");
      this.canvasContext.canvas.tabIndex = -1;
      if (dotnetRef) {
        this.dotnetRef = dotnetRef;
        this.isBlazor = true;
        if (this.signatureValue) {
          this.loadPersistedSignature();
        }
      }
      this.setHTMLProperties();
      if (isNullOrUndefined(this.signatureValue)) {
        this.updateSnapCollection(true);
      }
      this.wireEvents();
      if (!this.isBlazor) {
        this.trigger("created", null);
      }
    };
    SignatureBase2.prototype.wireEvents = function() {
      if (isNullOrUndefined(this.pointColl) && !this.isReadOnly && !this.disabled) {
        EventHandler.add(this.canvasContext.canvas, "mousedown touchstart", this.mouseDownHandler, this);
        EventHandler.add(this.canvasContext.canvas, "keydown", this.keyboardHandler, this);
        window.addEventListener("resize", this.resizeHandler.bind(this));
      } else if (this.pointColl) {
        EventHandler.add(this.canvasContext.canvas, "mousemove touchmove", this.mouseMoveHandler, this);
        EventHandler.add(this.canvasContext.canvas, "mouseup touchend", this.mouseUpHandler, this);
        EventHandler.add(document, "mouseup", this.mouseUpHandler, this);
      }
    };
    SignatureBase2.prototype.unwireEvents = function(type) {
      if (type === "mouseup" || type === "touchend") {
        EventHandler.remove(this.canvasContext.canvas, "mousemove touchmove", this.mouseMoveHandler);
        EventHandler.remove(this.canvasContext.canvas, "mouseup touchend", this.mouseUpHandler);
        EventHandler.remove(document, "mouseup", this.mouseUpHandler);
      } else {
        EventHandler.remove(this.canvasContext.canvas, "mousedown touchstart", this.mouseDownHandler);
        EventHandler.remove(this.canvasContext.canvas, "keydown", this.keyboardHandler);
        window.removeEventListener("resize", this.resizeHandler);
      }
    };
    SignatureBase2.prototype.setHTMLProperties = function() {
      if (this.element.height === 150 && this.element.width === 300 && this.element.offsetHeight !== 0 && this.element.offsetWidth !== 0) {
        this.element.height = this.element.offsetHeight;
        this.element.width = this.element.offsetWidth;
        this.isResponsive = true;
      } else if ((this.element.height !== this.element.offsetHeight - 1 || this.element.width !== this.element.offsetWidth - 1) && this.element.offsetHeight !== 0 && this.element.offsetWidth !== 0) {
        this.element.height = this.element.offsetHeight;
        this.element.width = this.element.offsetWidth;
      }
      this.canvasContext.fillStyle = this.strokeColor;
      this.tempCanvas = this.createElement("canvas", { className: "e-" + this.getModuleName() + "-temp" });
      this.tempContext = this.tempCanvas.getContext("2d");
      this.tempCanvas.width = this.element.width;
      this.tempCanvas.height = this.element.height;
      if (this.backgroundImage) {
        this.canvasContext.canvas.style.backgroundImage = "url(" + this.backgroundImage + ")";
        this.canvasContext.canvas.style.backgroundRepeat = "no-repeat";
        if (this.saveWithBackground) {
          this.setBackgroundImage(this.backgroundImage, "temp");
        }
      } else if (this.backgroundColor) {
        this.canvasContext.canvas.style.backgroundColor = this.backgroundColor;
      }
    };
    SignatureBase2.prototype.mouseDownHandler = function(e) {
      if (e.buttons === 1 || e.buttons === 2 || e.type === "touchstart") {
        if (e.type === "touchstart") {
          e.preventDefault();
          e.stopPropagation();
        }
        this.beginStroke(e);
        this.wireEvents();
      }
    };
    SignatureBase2.prototype.mouseMoveHandler = function(e) {
      if (e.buttons === 1 || e.buttons === 2 || e.type === "touchmove") {
        if (e.type === "touchmove") {
          e.preventDefault();
          e.stopPropagation();
        }
        if (this.interval) {
          this.updateStrokeWithThrottle(e);
        } else {
          this.updateStroke(e);
        }
      }
    };
    SignatureBase2.prototype.mouseUpHandler = function(e) {
      var args = { actionName: "strokeUpdate" };
      if (e.type === "touchstart") {
        e.preventDefault();
        e.stopPropagation();
      }
      this.endDraw();
      this.updateSnapCollection();
      this.unwireEvents(e.type);
      if (!this.isBlazor) {
        this.trigger("change", args);
      } else {
        this.dotnetRef.invokeMethodAsync("TriggerEventAsync", "mouseUp");
      }
      this.signatureValue = this.snapColl[this.incStep];
      for (var i = 0; i < this.signPointsColl.length; i++) {
        this.signRatioPointsColl.push({
          x: this.signPointsColl[i].x / this.canvasContext.canvas.width,
          y: this.signPointsColl[i].y / this.canvasContext.canvas.height
        });
      }
      this.signPointsColl = [];
    };
    SignatureBase2.prototype.keyboardHandler = function(e) {
      var _this = this;
      var args = { fileName: "Signature", type: "Png", cancel: false };
      switch (e.key) {
        case "Delete":
          this.clear();
          break;
        case (e.ctrlKey && "s"):
          if (!this.isBlazor) {
            this.trigger("beforeSave", args, function(observableSaveArgs) {
              if (!args.cancel) {
                _this.save(observableSaveArgs.type, observableSaveArgs.fileName);
              }
            });
          } else {
            this.dotnetRef.invokeMethodAsync("TriggerEventAsync", "beforeSave");
          }
          e.preventDefault();
          e.stopImmediatePropagation();
          break;
        case (e.ctrlKey && "z"):
          this.undo();
          break;
        case (e.ctrlKey && "y"):
          this.redo();
          break;
      }
    };
    SignatureBase2.prototype.resizeHandler = function() {
      var proxy2 = this;
      if (this.isResponsive) {
        this.canvasContext.canvas.width = this.element.offsetWidth;
        this.canvasContext.canvas.height = this.element.offsetHeight;
        this.canvasContext.scale(1, 1);
        var pointSize = (this.minStrokeWidth + this.maxStrokeWidth) / 2;
        for (var i = 0; i < this.signRatioPointsColl.length; i++) {
          this.arcDraw(this.signRatioPointsColl[i].x * this.canvasContext.canvas.width, this.signRatioPointsColl[i].y * this.canvasContext.canvas.height, pointSize);
        }
        this.signPointsColl = [];
        this.canvasContext.closePath();
        this.canvasContext.fill();
      } else {
        var restoreImg_1 = new Image();
        restoreImg_1.src = this.snapColl[this.incStep];
        restoreImg_1.onload = function() {
          proxy2.canvasContext.clearRect(0, 0, proxy2.element.width, proxy2.element.height);
          proxy2.canvasContext.drawImage(restoreImg_1, 0, 0, proxy2.element.width, proxy2.element.height);
        };
      }
    };
    SignatureBase2.prototype.beginStroke = function(e) {
      this.internalRefresh();
      this.updateStroke(e);
    };
    SignatureBase2.prototype.updateStroke = function(e) {
      var point = this.createPoint(e);
      this.addPoint(point);
    };
    SignatureBase2.prototype.updateStrokeWithThrottle = function(args) {
      var now = Date.now();
      var remaining = this.interval - (now - this.previous);
      this.storedArgs = args;
      if (remaining <= 0 || remaining > this.interval) {
        if (this.timeout) {
          clearTimeout(this.timeout);
          this.timeout = null;
        }
        this.previous = now;
        this.updateStroke(this.storedArgs);
        if (!this.timeout) {
          this.storedArgs = null;
        }
      } else if (!this.timeout) {
        this.timeout = window.setTimeout(this.delay.bind(this), remaining);
      }
    };
    SignatureBase2.prototype.delay = function() {
      this.previous = Date.now();
      this.timeout = null;
      this.updateStroke(this.storedArgs);
      if (!this.timeout) {
        this.storedArgs = null;
      }
    };
    SignatureBase2.prototype.createPoint = function(e) {
      var rect = this.canvasContext.canvas.getBoundingClientRect();
      if (e.type === "mousedown" || e.type === "mousemove") {
        return this.point(e.clientX - rect.left, e.clientY - rect.top, (/* @__PURE__ */ new Date()).getTime());
      } else {
        return this.point(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top, (/* @__PURE__ */ new Date()).getTime());
      }
    };
    SignatureBase2.prototype.point = function(pointX, pointY, time) {
      this.pointX = pointX;
      this.pointY = pointY;
      this.time = time || (/* @__PURE__ */ new Date()).getTime();
      return { x: this.pointX, y: this.pointY, time: this.time };
    };
    SignatureBase2.prototype.addPoint = function(point) {
      var points = this.pointColl;
      var controlPoint1;
      var controlPoint2;
      var lastPoint = points.length > 0 && points[points.length - 1];
      var isLastPointTooClose = lastPoint ? this.distanceTo(lastPoint) <= this.minDistance : false;
      if (!lastPoint || !(lastPoint && isLastPointTooClose)) {
        points.push(point);
        if (points.length > 2) {
          if (points.length === 3) {
            points.unshift(points[0]);
          }
          controlPoint1 = this.calculateCurveControlPoints(points[0], points[1], points[2]).controlPoint2;
          controlPoint2 = this.calculateCurveControlPoints(points[1], points[2], points[3]).controlPoint1;
          this.startPoint = points[1];
          this.controlPoint1 = controlPoint1;
          this.controlPoint2 = controlPoint2;
          this.endPoint = points[2];
          this.startDraw();
          points.shift();
        }
      }
    };
    SignatureBase2.prototype.startDraw = function() {
      var velocity;
      velocity = this.pointVelocityCalc(this.startPoint);
      velocity = this.velocity * velocity + (1 - this.velocity) * this.lastVelocity;
      var newWidth = Math.max(this.maxStrokeWidth / (velocity + 1), this.minStrokeWidth);
      this.curveDraw(this.lastWidth, newWidth);
      this.lastVelocity = velocity;
      this.lastWidth = newWidth;
    };
    SignatureBase2.prototype.endDraw = function() {
      var canDrawCurve = this.pointColl.length > 2;
      var point = this.pointColl[0];
      if (!canDrawCurve && point) {
        this.strokeDraw(point);
      }
    };
    SignatureBase2.prototype.curveDraw = function(startWidth, endWidth) {
      var context = this.canvasContext;
      var width;
      var i;
      var t1;
      var t2;
      var t3;
      var u1;
      var u2;
      var u3;
      var x;
      var y;
      var widthValue = endWidth - startWidth;
      var bezierLength = this.bezierLengthCalc();
      var drawSteps = Math.ceil(bezierLength) * 2;
      context.beginPath();
      for (i = 0; i < drawSteps; i++) {
        t1 = i / drawSteps;
        t2 = t1 * t1;
        t3 = t2 * t1;
        u1 = 1 - t1;
        u2 = u1 * u1;
        u3 = u2 * u1;
        x = u3 * this.startPoint.x;
        x += 3 * u2 * t1 * this.controlPoint1.x;
        x += 3 * u1 * t2 * this.controlPoint2.x;
        x += t3 * this.endPoint.x;
        y = u3 * this.startPoint.y;
        y += 3 * u2 * t1 * this.controlPoint1.y;
        y += 3 * u1 * t2 * this.controlPoint2.y;
        y += t3 * this.endPoint.y;
        width = Math.min(startWidth + t3 * widthValue, this.maxStrokeWidth);
        this.arcDraw(x, y, width);
      }
      context.closePath();
      context.fill();
      this.isSignatureEmpty = false;
    };
    SignatureBase2.prototype.strokeDraw = function(point) {
      var context = this.canvasContext;
      var pointSize = (this.minStrokeWidth + this.maxStrokeWidth) / 2;
      context.beginPath();
      this.arcDraw(point.x, point.y, pointSize);
      context.closePath();
      context.fill();
      this.isSignatureEmpty = false;
    };
    SignatureBase2.prototype.arcDraw = function(x, y, size) {
      this.signPointsColl.push({ x, y });
      var context = this.canvasContext;
      context.moveTo(x, y);
      context.arc(x, y, size, 0, 2 * Math.PI, false);
    };
    SignatureBase2.prototype.calculateCurveControlPoints = function(p1, p2, p3) {
      var dx1 = p1.x - p2.x;
      var dy1 = p1.y - p2.y;
      var dx2 = p2.x - p3.x;
      var dy2 = p2.y - p3.y;
      var m1 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
      var m2 = { x: (p2.x + p3.x) / 2, y: (p2.y + p3.y) / 2 };
      var l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
      var l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      var dxm = m1.x - m2.x;
      var dym = m1.y - m2.y;
      var k = l2 / (l1 + l2);
      var cm = { x: m2.x + dxm * k, y: m2.y + dym * k };
      var tx = p2.x - cm.x;
      var ty = p2.y - cm.y;
      return {
        controlPoint1: this.point(m1.x + tx, m1.y + ty, 0),
        controlPoint2: this.point(m2.x + tx, m2.y + ty, 0)
      };
    };
    SignatureBase2.prototype.bezierLengthCalc = function() {
      var steps = 10;
      var length = 0;
      var i;
      var t;
      var pointx1;
      var pointy1;
      var pointx2;
      var pointy2;
      var pointx3;
      var pointy3;
      for (i = 0; i <= steps; i++) {
        t = i / steps;
        pointx1 = this.bezierPointCalc(t, this.startPoint.x, this.controlPoint1.x, this.controlPoint2.x, this.endPoint.x);
        pointy1 = this.bezierPointCalc(t, this.startPoint.y, this.controlPoint1.y, this.controlPoint2.y, this.endPoint.y);
        if (i > 0) {
          pointx3 = pointx1 - pointx2;
          pointy3 = pointy1 - pointy2;
          length += Math.sqrt(pointx3 * pointx3 + pointy3 * pointy3);
        }
        pointx2 = pointx1;
        pointy2 = pointy1;
      }
      return length;
    };
    SignatureBase2.prototype.bezierPointCalc = function(t, startpoint, cp1, cp2, endpoint) {
      return startpoint * (1 - t) * (1 - t) * (1 - t) + 3 * cp1 * (1 - t) * (1 - t) * t + 3 * cp2 * (1 - t) * t * t + endpoint * t * t * t;
    };
    SignatureBase2.prototype.pointVelocityCalc = function(startPoint) {
      return this.time !== startPoint.time ? this.distanceTo(startPoint) / (this.time - startPoint.time) : 0;
    };
    SignatureBase2.prototype.distanceTo = function(start) {
      return Math.sqrt(Math.pow(this.pointX - start.x, 2) + Math.pow(this.pointY - start.y, 2));
    };
    SignatureBase2.prototype.isRead = function(isRead) {
      if (isRead) {
        EventHandler.remove(this.canvasContext.canvas, "mousedown touchstart", this.mouseDownHandler);
      } else if (!this.disabled) {
        EventHandler.add(this.canvasContext.canvas, "mousedown touchstart", this.mouseDownHandler, this);
      }
    };
    SignatureBase2.prototype.enableOrDisable = function(isDisable) {
      this.disabled = isDisable;
      if (isDisable) {
        this.canvasContext.canvas.style.filter = "opacity(0.5)";
        this.isRead(true);
      } else {
        this.canvasContext.canvas.style.filter = "";
        this.isRead(false);
      }
    };
    SignatureBase2.prototype.updateSnapCollection = function(isClear) {
      if (isNullOrUndefined(this.incStep)) {
        this.incStep = -1;
        this.incStep++;
        this.snapColl = [];
        this.clearArray = [];
      } else {
        this.incStep++;
      }
      if (this.incStep < this.snapColl.length) {
        this.snapColl.length = this.incStep;
      }
      if (this.incStep > 0) {
        var canvasNew = this.createElement("canvas", { className: "e-" + this.getModuleName() + "-wrapper" });
        var canvasContextNew = canvasNew.getContext("2d");
        canvasNew.width = this.canvasContext.canvas.width;
        canvasNew.height = this.canvasContext.canvas.height;
        canvasContextNew.drawImage(this.canvasContext.canvas, 0, 0, canvasNew.width, canvasNew.height);
        this.snapColl.push(canvasNew.toDataURL());
      } else {
        this.snapColl.push(this.canvasContext.canvas.toDataURL());
      }
      if (isClear) {
        this.clearArray.push(this.incStep);
      }
    };
    SignatureBase2.prototype.setBackgroundImage = function(imageSrc, type) {
      var proxy2 = this;
      var imageObj = new Image();
      imageObj.crossOrigin = "anonymous";
      imageObj.src = imageSrc;
      if (type == "temp") {
        imageObj.onload = function() {
          proxy2.tempContext.globalCompositeOperation = "source-over";
          proxy2.tempContext.drawImage(imageObj, 0, 0, proxy2.element.width, proxy2.element.height);
        };
      } else {
        imageObj.onload = function() {
          proxy2.canvasContext.globalCompositeOperation = "source-over";
          proxy2.canvasContext.drawImage(imageObj, 0, 0, proxy2.element.width, proxy2.element.height);
          proxy2.updateSnapCollection();
          proxy2.saveBackground(true);
        };
        this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
      }
    };
    SignatureBase2.prototype.setBackgroundColor = function(color) {
      var canvasEle = this.canvasContext;
      canvasEle.strokeStyle = color;
      var i;
      var j;
      for (i = 1; i <= canvasEle.canvas.width; i++) {
        for (j = 1; j <= canvasEle.canvas.height; j++) {
          canvasEle.strokeRect(0, 0, i, j);
        }
      }
      this.updateSnapCollection();
    };
    SignatureBase2.prototype.loadPersistedSignature = function() {
      if (isNullOrUndefined(this.signatureValue)) {
        return;
      }
      var proxy2 = this;
      var lastImage = new Image();
      lastImage.src = this.signatureValue;
      lastImage.onload = function() {
        proxy2.canvasContext.clearRect(0, 0, proxy2.element.width, proxy2.element.height);
        proxy2.canvasContext.drawImage(lastImage, 0, 0);
        proxy2.updateSnapCollection();
      };
      this.isSignatureEmpty = false;
    };
    SignatureBase2.prototype.getBlob = function(url) {
      var arr = url.split(",");
      var type = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type });
    };
    SignatureBase2.prototype.download = function(blob, fileName) {
      var blobUrl = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = blobUrl;
      a.target = "_parent";
      a.download = fileName;
      (document.body || document.documentElement).appendChild(a);
      a.click();
      a.parentNode.removeChild(a);
    };
    SignatureBase2.prototype.internalRefresh = function() {
      this.pointColl = [];
      this.lastVelocity = 0;
      this.lastWidth = (this.minStrokeWidth + this.maxStrokeWidth) / 2;
    };
    SignatureBase2.prototype.refresh = function() {
      this.isResponsive = false;
      this.setHTMLProperties();
      this.resizeHandler();
      this.internalRefresh();
    };
    SignatureBase2.prototype.clear = function() {
      var args = { actionName: "clear" };
      this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
      this.tempContext.clearRect(0, 0, this.tempContext.canvas.width, this.tempContext.canvas.height);
      if (this.saveWithBackground) {
        this.setBackgroundImage(this.backgroundImage, "temp");
      }
      this.internalRefresh();
      this.signRatioPointsColl = [];
      this.updateSnapCollection(true);
      this.isSignatureEmpty = true;
      if (!this.isBlazor) {
        this.trigger("change", args);
      } else {
        this.dotnetRef.invokeMethodAsync("TriggerEventAsync", "Clear");
      }
    };
    SignatureBase2.prototype.undo = function() {
      var args = { actionName: "undo" };
      var proxy2 = this;
      if (this.incStep > 0) {
        this.incStep--;
        var undoImg_1 = new Image();
        undoImg_1.src = this.snapColl[this.incStep];
        undoImg_1.onload = function() {
          proxy2.canvasContext.clearRect(0, 0, proxy2.element.width, proxy2.element.height);
          proxy2.canvasContext.drawImage(undoImg_1, 0, 0, proxy2.element.width, proxy2.element.height);
        };
      }
      this.isClear();
      if (!this.isBlazor) {
        this.trigger("change", args);
      } else {
        this.dotnetRef.invokeMethodAsync("TriggerEventAsync", "Undo");
      }
    };
    SignatureBase2.prototype.redo = function() {
      var args = { actionName: "redo" };
      var proxy2 = this;
      if (this.incStep < this.snapColl.length - 1) {
        this.incStep++;
        var redoImg_1 = new Image();
        redoImg_1.src = this.snapColl[this.incStep];
        redoImg_1.onload = function() {
          proxy2.canvasContext.clearRect(0, 0, proxy2.element.width, proxy2.element.height);
          proxy2.canvasContext.drawImage(redoImg_1, 0, 0, proxy2.element.width, proxy2.element.height);
        };
      }
      this.isClear();
      if (!this.isBlazor) {
        this.trigger("change", args);
      } else {
        this.dotnetRef.invokeMethodAsync("TriggerEventAsync", "Redo");
      }
    };
    SignatureBase2.prototype.isClear = function() {
      if (this.clearArray) {
        var empty = false;
        for (var i = 0; i < this.clearArray.length; i++) {
          if (this.clearArray[i] === this.incStep) {
            this.isSignatureEmpty = true;
            empty = true;
          }
        }
        if (!empty) {
          this.isSignatureEmpty = false;
        }
      }
    };
    SignatureBase2.prototype.isEmpty = function() {
      return this.isSignatureEmpty;
    };
    SignatureBase2.prototype.canUndo = function() {
      return this.incStep > 0;
    };
    SignatureBase2.prototype.canRedo = function() {
      return this.incStep < this.snapColl.length - 1;
    };
    SignatureBase2.prototype.draw = function(text, fontFamily, fontSize, x, y) {
      var args = { actionName: "draw-text" };
      this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
      fontFamily = fontFamily || "Arial";
      fontSize = fontSize || 30;
      this.canvasContext.font = fontSize + "px " + fontFamily;
      var startX = this.element.width / 2;
      var startY = this.element.height / 2;
      if (isNullOrUndefined(x) && isNullOrUndefined(y)) {
        this.canvasContext.textAlign = "center";
        this.canvasContext.textBaseline = "middle";
      } else {
        startX = isNullOrUndefined(x) ? startX : x;
        startY = isNullOrUndefined(y) ? startY + fontSize / 2 : y + fontSize / 2;
      }
      this.canvasContext.fillText(text, startX, startY);
      this.updateSnapCollection();
      this.isSignatureEmpty = false;
      this.trigger("change", args);
    };
    SignatureBase2.prototype.load = function(signature, width, height) {
      height = height || this.element.height;
      width = width || this.element.width;
      this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
      var proxy2 = this;
      var bitmapImage = new Image();
      bitmapImage.src = signature;
      if (signature.slice(0, 4) !== "data") {
        bitmapImage.crossOrigin = "anonymous";
      }
      bitmapImage.onload = function() {
        Promise.all([
          createImageBitmap(bitmapImage, 0, 0, width, height)
        ]).then(function(results) {
          var tempCanvas = document.createElement("canvas");
          tempCanvas.width = width;
          tempCanvas.height = height;
          tempCanvas.getContext("2d").drawImage(results[0], 0, 0);
          if (signature.slice(0, 4) !== "data") {
            proxy2.canvasContext.globalCompositeOperation = "source-over";
          }
          proxy2.canvasContext.drawImage(tempCanvas, 0, 0, width, height, 0, 0, proxy2.element.width, proxy2.element.height);
          proxy2.updateSnapCollection();
        });
      };
      this.isSignatureEmpty = false;
    };
    SignatureBase2.prototype.saveBackground = function(savebg) {
      var imageSrc;
      if (savebg && this.backgroundImage) {
        imageSrc = this.snapColl[this.incStep - 1];
      } else {
        imageSrc = this.snapColl[this.incStep];
      }
      if (!savebg) {
        this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
        if (this.backgroundImage) {
          this.setBackgroundImage(this.backgroundImage);
        } else if (this.backgroundColor) {
          this.setBackgroundColor(this.backgroundColor);
          savebg = true;
        }
      }
      if (savebg) {
        var proxy_1 = this;
        var imageObj_1 = new Image();
        imageObj_1.crossOrigin = "anonymous";
        imageObj_1.src = imageSrc;
        imageObj_1.onload = function() {
          proxy_1.backgroundLoaded = true;
          proxy_1.canvasContext.globalCompositeOperation = "source-over";
          proxy_1.canvasContext.drawImage(imageObj_1, 0, 0, proxy_1.element.width, proxy_1.element.height);
          proxy_1.save(proxy_1.fileType, proxy_1.fileName);
        };
      }
    };
    SignatureBase2.prototype.save = function(type, fileName) {
      if (this.saveWithBackground && this.backgroundLoaded == null && (this.backgroundImage || this.backgroundColor)) {
        this.backgroundLoaded = false;
        this.fileType = type;
        this.fileName = fileName;
        this.saveBackground(false);
      } else if (type === "Svg") {
        fileName = fileName || "Signature";
        this.toSVG(fileName);
      } else if (type === "Jpeg") {
        fileName = fileName || "Signature";
        if (!this.saveWithBackground || this.saveWithBackground && !(this.backgroundImage || this.backgroundColor)) {
          this.toJPEG(fileName);
        } else {
          var dataURL = this.canvasContext.canvas.toDataURL("image/jpeg");
          this.download(this.getBlob(dataURL), fileName + ".jpeg");
        }
      } else {
        fileName = fileName || "Signature";
        var dataURL = this.canvasContext.canvas.toDataURL("image/png");
        this.download(this.getBlob(dataURL), fileName + ".png");
      }
      if (this.saveWithBackground && this.backgroundLoaded) {
        this.resetSnap();
      }
    };
    SignatureBase2.prototype.resetSnap = function() {
      this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
      var proxy2 = this;
      var restoreObj = new Image();
      restoreObj.src = this.snapColl[this.incStep - 1];
      restoreObj.onload = function() {
        proxy2.canvasContext.drawImage(restoreObj, 0, 0, proxy2.element.width, proxy2.element.height);
        proxy2.updateSnapCollection();
      };
      this.backgroundLoaded = null;
      this.snapColl.pop();
      this.incStep--;
      this.snapColl.pop();
      this.incStep--;
    };
    SignatureBase2.prototype.toJPEG = function(fileName) {
      var _this = this;
      var imageSrc = this.snapColl[this.incStep];
      this.setBackgroundColor("#ffffff");
      var proxy2 = this;
      var imageObj = new Image();
      imageObj.crossOrigin = "anonymous";
      imageObj.src = imageSrc;
      imageObj.onload = function() {
        proxy2.canvasContext.globalCompositeOperation = "source-over";
        proxy2.canvasContext.drawImage(imageObj, 0, 0, proxy2.element.width, proxy2.element.height);
        var dataURL = proxy2.canvasContext.canvas.toDataURL("image/jpeg");
        proxy2.download(proxy2.getBlob(dataURL), fileName + ".jpeg");
        proxy2.canvasContext.clearRect(0, 0, proxy2.canvasContext.canvas.width, proxy2.canvasContext.canvas.height);
        _this.resizeHandler();
      };
      this.snapColl.pop();
      this.incStep--;
    };
    SignatureBase2.prototype.toSVG = function(fileName, dataUrl) {
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", this.canvasContext.canvas.width.toString());
      svg.setAttribute("height", this.canvasContext.canvas.height.toString());
      var XLinkNS = "http://www.w3.org/1999/xlink";
      var img = document.createElementNS("http://www.w3.org/2000/svg", "image");
      img.setAttributeNS(null, "height", this.canvasContext.canvas.height.toString());
      img.setAttributeNS(null, "width", this.canvasContext.canvas.width.toString());
      img.setAttributeNS(XLinkNS, "xlink:href", dataUrl);
      svg.appendChild(img);
      var prefix = "data:image/svg+xml;base64,";
      var header = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"' + (' width="' + this.canvasContext.canvas.width + '"') + (' height="' + this.canvasContext.canvas.height + '"') + ">";
      var footer = "</svg>";
      var body = svg.innerHTML;
      var data = header + body + footer;
      var svgDataUrl = prefix + btoa(data);
      if (fileName == null) {
        return svgDataUrl;
      } else {
        this.download(this.getBlob(svgDataUrl), fileName + ".svg");
        return null;
      }
    };
    SignatureBase2.prototype.saveAsBlob = function() {
      return this.getBlob(this.canvasContext.canvas.toDataURL("image/png"));
    };
    SignatureBase2.prototype.getSignature = function(type) {
      if (this.saveWithBackground && this.backgroundColor && !this.backgroundImage) {
        this.tempContext.fillStyle = this.backgroundColor;
        this.tempContext.fillRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
      } else if (!this.backgroundColor && !this.backgroundImage && type === "Jpeg") {
        this.tempContext.fillStyle = "#fff";
        this.tempContext.fillRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
      }
      this.tempContext.drawImage(this.element, 0, 0);
      if (type === "Jpeg") {
        return this.tempCanvas.toDataURL("image/jpeg");
      } else if (type === "Svg") {
        return this.toSVG(null, this.tempCanvas.toDataURL("image/png"));
      } else {
        return this.tempCanvas.toDataURL("image/png");
      }
    };
    SignatureBase2.prototype.getModuleName = function() {
      return "signature";
    };
    SignatureBase2.prototype.getPersistData = function() {
      this.signatureValue = this.snapColl[this.incStep];
      return this.addOnPersist(["signatureValue"]);
    };
    SignatureBase2.prototype.destroy = function() {
      if (this.getModuleName() !== "image-editor") {
        this.unwireEvents(null);
        removeClass([this.element], "e-" + this.getModuleName());
        this.element.removeAttribute("tabindex");
        this.pointColl = null;
      }
      _super.prototype.destroy.call(this);
    };
    SignatureBase2.prototype.propertyChanged = function(key, value) {
      var canvasNew = this.canvasContext;
      switch (key) {
        case "backgroundColor":
          canvasNew.canvas.style.backgroundColor = value;
          this.backgroundColor = value;
          break;
        case "backgroundImage":
          canvasNew.canvas.style.backgroundImage = "url(" + value + ")";
          this.backgroundImage = value;
          if (this.saveWithBackground) {
            this.setBackgroundImage(this.backgroundImage, "temp");
          }
          break;
        case "strokeColor":
          canvasNew.fillStyle = value;
          this.strokeColor = value;
          break;
        case "saveWithBackground":
          this.saveWithBackground = value;
          break;
        case "maxStrokeWidth":
          this.maxStrokeWidth = value;
          break;
        case "minStrokeWidth":
          this.minStrokeWidth = value;
          break;
        case "velocity":
          this.velocity = value;
          break;
        case "isReadOnly":
          this.isRead(value);
          break;
        case "disabled":
          this.enableOrDisable(value);
          break;
      }
    };
    return SignatureBase2;
  }(Component)
);

// node_modules/@syncfusion/ej2-inputs/src/signature/signature.js
var __extends16 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate15 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Signature = (
  /** @class */
  function(_super) {
    __extends16(Signature2, _super);
    function Signature2(options, element2) {
      return _super.call(this, options, element2) || this;
    }
    Signature2.prototype.preRender = function() {
    };
    Signature2.prototype.render = function() {
      this.initialize();
    };
    Signature2.prototype.initialize = function() {
      addClass([this.element], "e-" + this.getModuleName());
      _super.prototype.initialize.call(this, this.element);
      if (this.enablePersistence) {
        this.loadPersistedSignature();
      }
    };
    Signature2.prototype.getModuleName = function() {
      return "signature";
    };
    Signature2.prototype.getPersistData = function() {
      return this.addOnPersist(["signatureValue"]);
    };
    Signature2.prototype.onPropertyChanged = function(newProp, oldProp) {
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "backgroundColor":
            _super.prototype.propertyChanged.call(this, prop, newProp.backgroundColor);
            break;
          case "backgroundImage":
            _super.prototype.propertyChanged.call(this, prop, newProp.backgroundImage);
            break;
          case "strokeColor":
            if (newProp.strokeColor !== oldProp.strokeColor) {
              _super.prototype.propertyChanged.call(this, prop, newProp.strokeColor);
            }
            break;
          case "saveWithBackground":
            _super.prototype.propertyChanged.call(this, prop, newProp.saveWithBackground);
            break;
          case "isReadOnly":
            _super.prototype.propertyChanged.call(this, prop, newProp.isReadOnly);
            break;
          case "disabled":
            _super.prototype.propertyChanged.call(this, prop, newProp.disabled);
            break;
        }
      }
    };
    __decorate15([
      Property("")
    ], Signature2.prototype, "backgroundColor", void 0);
    __decorate15([
      Property("")
    ], Signature2.prototype, "backgroundImage", void 0);
    __decorate15([
      Property(false)
    ], Signature2.prototype, "disabled", void 0);
    __decorate15([
      Property(false)
    ], Signature2.prototype, "isReadOnly", void 0);
    __decorate15([
      Property(true)
    ], Signature2.prototype, "saveWithBackground", void 0);
    __decorate15([
      Property("#000000")
    ], Signature2.prototype, "strokeColor", void 0);
    __decorate15([
      Property(0.5)
    ], Signature2.prototype, "minStrokeWidth", void 0);
    __decorate15([
      Property(2)
    ], Signature2.prototype, "maxStrokeWidth", void 0);
    __decorate15([
      Property(0.7)
    ], Signature2.prototype, "velocity", void 0);
    __decorate15([
      Property("en-US")
    ], Signature2.prototype, "locale", void 0);
    __decorate15([
      Property(false)
    ], Signature2.prototype, "enableRtl", void 0);
    __decorate15([
      Property(false)
    ], Signature2.prototype, "enablePersistence", void 0);
    __decorate15([
      Event()
    ], Signature2.prototype, "beforeSave", void 0);
    __decorate15([
      Event()
    ], Signature2.prototype, "change", void 0);
    __decorate15([
      Event()
    ], Signature2.prototype, "created", void 0);
    Signature2 = __decorate15([
      NotifyPropertyChanges
    ], Signature2);
    return Signature2;
  }(SignatureBase)
);

// node_modules/@syncfusion/ej2-inputs/src/rating/rating.js
var __extends17 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate16 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ICONCSS = "e-rating-icon e-icons e-star-filled";
var ITEMLIST = "e-rating-item-list";
var ITEMCONTAINER = "e-rating-item-container";
var SELECTED = "e-rating-selected";
var INTERMEDIATE = "e-rating-intermediate";
var LABEL = "e-rating-label";
var RESET = "e-icons e-reset";
var HIDDEN = "e-rating-hidden";
var DISABLED3 = "e-disabled";
var READONLY = "e-rating-readonly";
var RTL6 = "e-rtl";
var ANIMATION = "e-rating-animation";
var FULLTEMPLATE = "e-rating-full";
var EMPTYTEMPLATE = "e-rating-empty";
var SELECTEDVALUE = "e-selected-value";
var RATINGVALUE = "--rating-value";
var LabelPosition;
(function(LabelPosition2) {
  LabelPosition2["Top"] = "Top";
  LabelPosition2["Bottom"] = "Bottom";
  LabelPosition2["Left"] = "Left";
  LabelPosition2["Right"] = "Right";
})(LabelPosition || (LabelPosition = {}));
var PrecisionType;
(function(PrecisionType2) {
  PrecisionType2["Full"] = "Full";
  PrecisionType2["Half"] = "Half";
  PrecisionType2["Quarter"] = "Quarter";
  PrecisionType2["Exact"] = "Exact";
})(PrecisionType || (PrecisionType = {}));
var Rating = (
  /** @class */
  function(_super) {
    __extends17(Rating2, _super);
    function Rating2(options, element2) {
      var _this = _super.call(this, options, element2) || this;
      _this.itemElements = [];
      return _this;
    }
    Rating2.prototype.preRender = function() {
      if (!this.element.id) {
        this.element.id = getUniqueID("e-" + this.getModuleName());
      }
      this.keyConfigs = {
        downarrow: "downarrow",
        leftarrow: "leftarrow",
        rightarrow: "rightarrow",
        uparrow: "uparrow",
        space: "space"
      };
      this.tooltipOpen = false;
      this.isTouchSelected = false;
    };
    Rating2.prototype.render = function() {
      this.initialize();
      this.updateMinValue();
      this.updateTemplateFunction();
      this.triggerChange(null, this.value, false);
      this.renderItems();
      this.displayLabel();
    };
    Rating2.prototype.initialize = function() {
      this.wrapper = this.createElement("div", { className: "e-" + this.getModuleName() + "-container " });
      this.element.parentNode.insertBefore(this.wrapper, this.element);
      this.wrapper.appendChild(this.element);
      if (this.element.getAttribute("name") == null) {
        this.element.setAttribute("name", this.element.id);
      }
      attributes(this.element, { "aria-label": "rating" });
      this.renderItemList();
      this.updateReset();
      if (this.readOnly) {
        this.wrapper.classList.add(READONLY);
      }
      if (!this.visible) {
        this.wrapper.classList.add(HIDDEN);
      }
      if (this.enableRtl) {
        this.wrapper.classList.add(RTL6);
      }
      if (this.enableAnimation) {
        this.wrapper.classList.add(ANIMATION);
      }
      if (this.cssClass) {
        addClass([this.wrapper], this.cssClass.split(" "));
      }
      this.updateTooltip();
      this.wireKeyboardEvent();
      this.updateDisabled();
    };
    Rating2.prototype.updateDisabled = function() {
      this.wrapper.classList[this.disabled ? "add" : "remove"](DISABLED3);
      attributes(this.ratingItemList, { "tabindex": this.disabled ? "-1" : "0" });
      this.updateResetButton();
    };
    Rating2.prototype.updateResetButton = function() {
      if (this.allowReset) {
        var isDisabled = this.value <= this.min || this.disabled;
        this.resetElement.classList[isDisabled ? "add" : "remove"](DISABLED3);
        attributes(this.resetElement, { "tabindex": isDisabled ? "-1" : "0", "aria-hidden": isDisabled.toString() });
      }
    };
    Rating2.prototype.renderItemList = function() {
      var _this = this;
      this.ratingItemList = this.createElement("div", {
        className: ITEMLIST,
        id: this.element.id + "_item-list"
      });
      attributes(this.ratingItemList, { "aria-label": "rating", "role": "slider" });
      this.wrapper.appendChild(this.ratingItemList);
      EventHandler.add(this.ratingItemList, "touchmove", function(e) {
        return _this.touchMoveHandler(e);
      }, this);
      EventHandler.add(this.ratingItemList, Browser.touchEndEvent, this.touchEndHandler, this);
    };
    Rating2.prototype.touchMoveHandler = function(e) {
      if (!this.isTouchSelected) {
        this.wrapper.classList.add("e-rating-touch");
        this.isTouchSelected = true;
      }
      this.wrapper.classList.add("e-touch-select");
      var rect = this.ratingItemList.getBoundingClientRect();
      var x = e.touches[0].clientX - rect.x;
      var currValue = x / rect.width * this.itemsCount;
      currValue = this.enableRtl ? this.itemsCount - currValue : currValue;
      currValue = currValue < this.min ? this.min : currValue > this.itemsCount ? this.itemsCount : currValue;
      currValue = this.validateValue(currValue);
      var element2 = currValue === 0 ? null : this.itemElements[parseInt((Math.ceil(currValue) - 1).toString(), 10)];
      if (currValue === this.currentValue) {
        if (this.showTooltip && element2) {
          this.openRatingTooltip(element2, false);
        }
        return;
      }
      var previousValue = this.currentValue;
      this.triggerChange(e, currValue);
      this.updateCurrentValue(currValue);
      if (this.showTooltip) {
        if (element2) {
          if (Math.ceil(currValue) !== Math.ceil(previousValue)) {
            this.closeRatingTooltip();
          }
          this.openRatingTooltip(element2, true);
        } else {
          this.closeRatingTooltip();
        }
      }
    };
    Rating2.prototype.touchEndHandler = function() {
      this.closeRatingTooltip();
      this.wrapper.classList.remove("e-touch-select");
    };
    Rating2.prototype.updateTemplateFunction = function() {
      this.emptyTemplateFunction = this.emptyTemplate ? this.getTemplateString(this.emptyTemplate) : null;
      this.fullTemplateFunction = this.fullTemplate ? this.getTemplateString(this.fullTemplate) : null;
    };
    Rating2.prototype.renderItems = function() {
      var _this = this;
      for (var i = 0; i < this.itemsCount; i++) {
        var ratingItemContainer = this.createElement("span", { className: ITEMCONTAINER });
        var spanItem = this.createElement("span", { className: "e-rating-item" });
        var ratingValue = this.getRatingValue(this.value, i);
        this.renderItemContent(spanItem, ratingValue, i, false);
        ratingItemContainer.appendChild(spanItem);
        this.wireItemsEvents(ratingItemContainer, i + 1);
        this.itemElements.push(ratingItemContainer);
        var eventArgs = { element: ratingItemContainer, value: i + 1 };
        this.trigger("beforeItemRender", eventArgs, function(args) {
          _this.ratingItemList.appendChild(args.element);
        });
      }
      attributes(this.ratingItemList, { "aria-valuemax": this.itemsCount.toString() });
      this.updateItemValue(false);
    };
    Rating2.prototype.renderItemContent = function(spanEle, val, index, isrerender) {
      if (isrerender) {
        this.removeItemContent(spanEle);
      }
      if (this.fullTemplate && val === 1) {
        spanEle.classList.add(FULLTEMPLATE);
        append(this.fullTemplateFunction({ index, ratingValue: val }, this, "ratingFullTemplate", this.element.id + "fullTemplate", this.isStringTemplate), spanEle);
      } else if (this.emptyTemplate) {
        spanEle.classList.add(EMPTYTEMPLATE);
        append(this.emptyTemplateFunction({ index, ratingValue: val }, this, "ratingEmptyTemplate", this.element.id + "emptyTemplate", this.isStringTemplate), spanEle);
      } else {
        addClass([spanEle], ICONCSS.split(" "));
      }
    };
    Rating2.prototype.removeItemContent = function(spanEle) {
      spanEle.classList.remove(FULLTEMPLATE, EMPTYTEMPLATE);
      removeClass([spanEle], ICONCSS.split(" "));
      if (spanEle.firstChild) {
        spanEle.innerHTML = "";
      }
    };
    Rating2.prototype.updateTooltip = function() {
      if (this.showTooltip) {
        this.tooltipObj = new Tooltip({
          target: ".e-rating-item-container",
          windowCollision: true,
          opensOn: "Custom",
          cssClass: this.cssClass ? "e-rating-tooltip " + this.cssClass : "e-rating-tooltip"
        });
        this.tooltipObj.appendTo(this.ratingItemList);
      } else {
        if (!isNullOrUndefined(this.tooltipObj)) {
          this.tooltipObj.destroy();
          this.tooltipObj = null;
        }
      }
    };
    Rating2.prototype.updateMinValue = function() {
      this.setProperties({ min: this.validateValue(this.min) }, true);
      if (this.min > 0 && this.value < this.min) {
        this.triggerChange(null, this.min, false);
      }
      attributes(this.ratingItemList, { "aria-valuemin": this.min.toString() });
    };
    Rating2.prototype.validateValue = function(currentValue) {
      if (currentValue > this.itemsCount) {
        currentValue = this.itemsCount;
      } else if (currentValue < 0) {
        currentValue = 0;
      } else {
        currentValue = this.precision === PrecisionType.Full || this.enableSingleSelection ? Math.round(currentValue) : this.precision === PrecisionType.Half ? Math.round(currentValue * 2) / 2 : this.precision === PrecisionType.Quarter ? Math.round(currentValue * 4) / 4 : Math.round(currentValue * 10) / 10;
      }
      return currentValue;
    };
    Rating2.prototype.getRatingValue = function(value, i) {
      return this.enableSingleSelection ? value > i && value <= i + 1 ? 1 : 0 : value >= i + 1 ? 1 : value < i ? 0 : value - i;
    };
    Rating2.prototype.updateItemValue = function(isUpdate) {
      if (isUpdate === void 0) {
        isUpdate = true;
      }
      if (isUpdate && this.isReact) {
        this.clearTemplate(["ratingEmptyTemplate", "ratingFullTemplate"]);
      }
      for (var i = 0; i < this.itemsCount; i++) {
        var itemElement = this.itemElements[parseInt(i.toString(), 10)];
        itemElement.classList.remove(SELECTED, INTERMEDIATE, SELECTEDVALUE);
        var ratingValue = this.getRatingValue(this.currentValue, i);
        if (ratingValue === 1) {
          itemElement.classList.add(SELECTED);
        } else if (ratingValue > 0) {
          itemElement.classList.add(INTERMEDIATE);
        } else if (this.precision === PrecisionType.Full && i + 1 <= this.value && !this.enableSingleSelection) {
          itemElement.classList.add(SELECTEDVALUE);
        }
        if (isUpdate) {
          this.updateItemContent(ratingValue, i);
        }
        itemElement.style.setProperty(RATINGVALUE, ratingValue * 100 + "%");
        itemElement.classList[this.value === 0 && i === 0 || this.value === i + 1 || ratingValue > 0 && ratingValue < 1 ? "add" : "remove"]("e-rating-focus");
      }
      if (isUpdate) {
        this.renderReactTemplates();
      }
      this.updateResetButton();
      attributes(this.ratingItemList, { "aria-valuenow": this.currentValue.toString() });
      attributes(this.element, { "value": this.value.toString() });
    };
    Rating2.prototype.updateItemContent = function(ratingValue, index) {
      if (!this.fullTemplate && !this.emptyTemplate) {
        return;
      }
      var spanEle = this.itemElements[parseInt(index.toString(), 10)].querySelector(".e-rating-item");
      if (this.fullTemplate && ratingValue === 1) {
        if (!this.isReact && spanEle.classList.contains(FULLTEMPLATE)) {
          return;
        }
        this.removeItemContent(spanEle);
        spanEle.classList.add(FULLTEMPLATE);
        append(this.fullTemplateFunction({ ratingValue, index }, this, "ratingFullTemplate", this.element.id + "fullTemplate" + index, this.isStringTemplate), spanEle);
      } else if (this.emptyTemplate) {
        if (!this.isReact && spanEle.classList.contains(EMPTYTEMPLATE)) {
          return;
        }
        this.removeItemContent(spanEle);
        spanEle.classList.add(EMPTYTEMPLATE);
        append(this.emptyTemplateFunction({ ratingValue, index }, this, "ratingEmptyTemplate", this.element.id + "emptyTemplate" + index, this.isStringTemplate), spanEle);
      } else {
        this.removeItemContent(spanEle);
        addClass([spanEle], ICONCSS.split(" "));
      }
    };
    Rating2.prototype.updateTooltipContent = function(isChange) {
      var _this = this;
      if (this.showTooltip) {
        if (this.isReact) {
          this.clearTemplate(["ratingTooltipTemplate"]);
        }
        var content_1;
        if (this.tooltipTemplate) {
          content_1 = this.createElement("span", { className: "e-rating-tooltip-content" });
          var templateFunction = this.getTemplateString(this.tooltipTemplate);
          append(templateFunction({ value: this.currentValue }, this, "ratingTooltipTemplate", this.element.id + "tooltipTemplate", this.isStringTemplate), content_1);
          this.tooltipObj.setProperties({ content: content_1 }, isChange);
          if (this.isAngular) {
            setTimeout(function() {
              var ratingSpan = _this.ratingItemList.querySelectorAll("." + ITEMCONTAINER + "." + SELECTED);
              _this.tooltipObj.refresh(ratingSpan[ratingSpan.length - 1]);
            });
          }
        } else {
          content_1 = this.currentValue.toString();
          this.tooltipObj.setProperties({ content: initializeCSPTemplate(function() {
            return content_1;
          }) }, isChange);
        }
        this.renderReactTemplates();
      }
    };
    Rating2.prototype.getTemplateString = function(template) {
      var stringContent = "";
      try {
        if (typeof template !== "function") {
          var tempEle = select(template);
          if (tempEle) {
            stringContent = tempEle.tagName === "SCRIPT" ? tempEle.innerHTML : tempEle.outerHTML;
          } else {
            stringContent = template;
          }
        } else {
          stringContent = template;
        }
      } catch (e) {
        stringContent = template;
      }
      return compile(stringContent);
    };
    Rating2.prototype.displayLabel = function() {
      if (this.showLabel) {
        this.spanLabel = this.createElement("span", { className: LABEL });
        this.updateLabel();
        this.updateLabelPosition();
      } else {
        if (this.wrapper.contains(this.spanLabel)) {
          remove(this.spanLabel);
          this.spanLabel = null;
        }
      }
    };
    Rating2.prototype.updateLabel = function() {
      if (this.showLabel) {
        if (this.labelTemplate) {
          if (this.isReact) {
            this.clearTemplate(["ratingLabelTemplate"]);
          }
          if (this.spanLabel.firstChild) {
            this.spanLabel.innerHTML = "";
          }
          var templateFunction = this.getTemplateString(this.labelTemplate);
          append(templateFunction({ value: this.currentValue }, this, "ratingLabelTemplate", this.element.id + "labelTemplate", this.isStringTemplate), this.spanLabel);
          this.renderReactTemplates();
        } else {
          this.spanLabel.textContent = this.currentValue + " / " + this.itemsCount;
        }
      }
    };
    Rating2.prototype.updateReset = function() {
      if (this.allowReset) {
        this.resetElement = this.createElement("span", {
          className: RESET,
          attrs: { "aria-label": "resetbutton", "role": "button" }
        });
        this.updateResetButton();
        EventHandler.add(this.resetElement, "click", this.resetClicked, this);
        this.wrapper.insertBefore(this.resetElement, this.ratingItemList);
      } else {
        if (this.wrapper.contains(this.resetElement)) {
          remove(this.resetElement);
          this.resetElement = null;
        }
      }
    };
    Rating2.prototype.updateLabelPosition = function() {
      this.clearLabelPosition();
      this.spanLabel.classList.add("e-label-" + this.labelPosition.toLowerCase());
      if (this.labelPosition === "Left" || this.labelPosition === "Top") {
        this.wrapper.firstChild.after(this.spanLabel);
      } else {
        this.wrapper.appendChild(this.spanLabel);
      }
    };
    Rating2.prototype.clearLabelPosition = function() {
      var removeCss = this.spanLabel.classList.value.match(/(e-label-[top|bottom|right|left]+)/g);
      if (removeCss) {
        removeClass([this.spanLabel], removeCss);
      }
    };
    Rating2.prototype.wireItemsEvents = function(itemElement, index) {
      var _this = this;
      EventHandler.add(itemElement, "click", function(e) {
        return _this.clickHandler(e);
      }, this);
      EventHandler.add(itemElement, "mousemove", function(e) {
        return _this.mouseMoveHandler(index, e);
      }, this);
      EventHandler.add(itemElement, "mouseleave", this.mouseLeaveHandler, this);
    };
    Rating2.prototype.clickHandler = function(e) {
      this.currentValue = this.min > 0 && this.currentValue < this.min ? this.min : this.currentValue;
      this.triggerChange(e, this.currentValue);
      this.updateItemValue();
      this.updateLabel();
      this.updateResetButton();
    };
    Rating2.prototype.updateValueChange = function(e, val, isInteracted) {
      if (isInteracted === void 0) {
        isInteracted = true;
      }
      this.triggerChange(e, val, isInteracted);
      this.updateItemValue();
      this.updateLabel();
    };
    Rating2.prototype.triggerChange = function(e, val, isInteracted) {
      if (isInteracted === void 0) {
        isInteracted = true;
      }
      val = this.validateValue(val);
      this.currentValue = val;
      if (this.currentValue === this.value) {
        return;
      }
      var eventArgs = { event: e, isInteracted, value: val, previousValue: this.value };
      this.setProperties({ value: val }, true);
      this.trigger("valueChanged", eventArgs);
    };
    Rating2.prototype.mouseMoveHandler = function(index, e) {
      if (this.isTouchSelected) {
        this.wrapper.classList.remove("e-rating-touch");
        this.isTouchSelected = false;
      }
      var currValue = this.calculateCurrentValue(index, e);
      currValue = this.validateValue(currValue);
      var element2 = this.itemElements[parseInt((index - 1).toString(), 10)];
      if (currValue === this.currentValue) {
        this.openRatingTooltip(element2, false);
        return;
      }
      this.updateCurrentValue(currValue);
      this.openRatingTooltip(element2, true);
      var eventArgs = { element: element2, event: e, value: currValue };
      this.trigger("onItemHover", eventArgs);
    };
    Rating2.prototype.openRatingTooltip = function(element2, isChange) {
      if (this.showTooltip) {
        if (!this.tooltipOpen) {
          this.updateTooltipContent(false);
          this.tooltipObj.open(element2);
          this.tooltipOpen = true;
        } else if (isChange) {
          this.updateTooltipContent(true);
          this.tooltipObj.refresh(element2);
        }
      }
    };
    Rating2.prototype.closeRatingTooltip = function() {
      if (this.tooltipOpen) {
        this.tooltipObj.close();
        this.tooltipOpen = false;
      }
    };
    Rating2.prototype.updateCurrentValue = function(currValue) {
      this.currentValue = currValue;
      this.updateItemValue();
      this.updateLabel();
    };
    Rating2.prototype.mouseLeaveHandler = function() {
      this.closeRatingTooltip();
      this.updateCurrentValue(this.value);
    };
    Rating2.prototype.calculateCurrentValue = function(index, args) {
      var currentValue = index;
      if (!(this.enableSingleSelection || this.precision === PrecisionType.Full)) {
        currentValue = args.offsetX / this.itemElements[index - 1].clientWidth;
        currentValue = this.enableRtl ? 1 - currentValue : currentValue;
        if (this.precision === PrecisionType.Quarter) {
          currentValue = currentValue <= 0.25 ? 0.25 : currentValue <= 0.5 ? 0.5 : currentValue < 0.75 ? 0.75 : 1;
        } else if (this.precision === PrecisionType.Half) {
          currentValue = currentValue <= 0.5 ? 0.5 : 1;
        }
        currentValue = currentValue + index - 1;
      }
      return currentValue;
    };
    Rating2.prototype.reset = function() {
      this.resetClicked(null, false);
    };
    Rating2.prototype.resetClicked = function(e, isInteracted) {
      if (isInteracted === void 0) {
        isInteracted = true;
      }
      this.updateValueChange(e, this.min, isInteracted);
      this.updateResetButton();
    };
    Rating2.prototype.wireKeyboardEvent = function() {
      this.keyboardModuleRating = new KeyboardEvents(this.wrapper, {
        keyAction: this.keyActionHandler.bind(this),
        keyConfigs: this.keyConfigs,
        eventName: "keydown"
      });
    };
    Rating2.prototype.keyActionHandler = function(e) {
      if (this.disabled || this.readOnly) {
        return;
      }
      if (e.target.classList.contains(ITEMLIST)) {
        switch (e.action) {
          case "uparrow":
            this.handleNavigation(e, true);
            break;
          case "downarrow":
            this.handleNavigation(e, false);
            break;
          case "leftarrow":
            this.handleNavigation(e, this.enableRtl);
            break;
          case "rightarrow":
            this.handleNavigation(e, !this.enableRtl);
            break;
        }
      }
      if (this.allowReset && e.target.classList.contains("e-reset")) {
        switch (e.action) {
          case "space":
            this.resetClicked(e);
            break;
        }
      }
    };
    Rating2.prototype.handleNavigation = function(e, isIncrease) {
      if (!isIncrease && this.value > this.min || isIncrease && this.value < this.itemsCount) {
        var currentValue = this.precision === PrecisionType.Full || this.enableSingleSelection ? 1 : this.precision === PrecisionType.Half ? 0.5 : this.precision === PrecisionType.Quarter ? 0.25 : Math.round(0.1 * 10) / 10;
        currentValue = isIncrease ? this.value + currentValue : this.value - currentValue;
        this.updateValueChange(e, currentValue);
        this.updateResetButton();
      }
    };
    Rating2.prototype.updateContent = function() {
      if (this.isReact) {
        this.clearTemplate(["ratingEmptyTemplate", "ratingFullTemplate"]);
      }
      for (var i = 0; i < this.itemsCount; i++) {
        var itemElement = this.itemElements[parseInt(i.toString(), 10)].firstElementChild;
        this.renderItemContent(itemElement, this.getRatingValue(this.value, i), i, true);
      }
    };
    Rating2.prototype.getModuleName = function() {
      return "rating";
    };
    Rating2.prototype.getPersistData = function() {
      return this.addOnPersist([]);
    };
    Rating2.prototype.removeItemElements = function() {
      for (var i = 0; i < this.itemElements.length; i++) {
        remove(this.itemElements[parseInt(i.toString(), 10)]);
      }
      this.itemElements = [];
    };
    Rating2.prototype.destroy = function() {
      var _this = this;
      _super.prototype.destroy.call(this);
      this.removeItemElements();
      this.clearTemplate();
      if (this.spanLabel) {
        remove(this.spanLabel);
        this.spanLabel = null;
      }
      if (this.resetElement) {
        remove(this.resetElement);
        this.resetElement = null;
      }
      if (this.showTooltip) {
        this.tooltipObj.destroy();
        this.tooltipObj = null;
      }
      remove(this.ratingItemList);
      this.ratingItemList = null;
      this.wrapper.parentNode.insertBefore(this.element, this.wrapper);
      remove(this.wrapper);
      this.wrapper = null;
      this.keyboardModuleRating.destroy();
      this.keyboardModuleRating = null;
      ["value", "aria-label", "name"].forEach(function(attr) {
        _this.element.removeAttribute(attr);
      });
    };
    Rating2.prototype.onPropertyChanged = function(newProp, oldProp) {
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "value":
            this.updateValueChange(null, this.value > this.min ? this.value : this.min, false);
            break;
          case "min":
            this.updateMinValue();
            this.updateItemValue();
            this.updateLabel();
            break;
          case "showLabel":
            this.displayLabel();
            break;
          case "visible":
            this.wrapper.classList[!this.visible ? "add" : "remove"](HIDDEN);
            break;
          case "disabled":
            this.updateDisabled();
            break;
          case "readOnly":
            this.wrapper.classList[this.readOnly ? "add" : "remove"](READONLY);
            break;
          case "allowReset":
            this.updateReset();
            break;
          case "enableRtl":
            this.wrapper.classList[this.enableRtl ? "add" : "remove"](RTL6);
            break;
          case "cssClass":
            if (oldProp.cssClass) {
              removeClass([this.wrapper], oldProp.cssClass.split(" "));
            }
            if (newProp.cssClass) {
              addClass([this.wrapper], newProp.cssClass.split(" "));
            }
            if (this.tooltipObj) {
              this.tooltipObj.setProperties({ cssClass: this.cssClass ? "e-rating-tooltip " + this.cssClass : "e-rating-tooltip" });
            }
            break;
          case "labelPosition":
            this.updateLabelPosition();
            break;
          case "showTooltip":
            this.updateTooltip();
            break;
          case "precision":
            this.updateMinValue();
            this.triggerChange(null, this.value, false);
            this.updateItemValue();
            this.updateLabel();
            break;
          case "enableSingleSelection":
            this.updateValueChange(null, this.currentValue, false);
            break;
          case "enableAnimation":
            this.wrapper.classList[this.enableAnimation ? "add" : "remove"](ANIMATION);
            break;
          case "emptyTemplate":
          case "fullTemplate":
            this.updateTemplateFunction();
            this.updateContent();
            break;
          case "labelTemplate":
            this.updateLabel();
            break;
          case "itemsCount":
            this.removeItemElements();
            this.renderItems();
            this.updateLabel();
            break;
        }
      }
    };
    __decorate16([
      Property(false)
    ], Rating2.prototype, "allowReset", void 0);
    __decorate16([
      Property("")
    ], Rating2.prototype, "cssClass", void 0);
    __decorate16([
      Property(false)
    ], Rating2.prototype, "disabled", void 0);
    __decorate16([
      Property("")
    ], Rating2.prototype, "emptyTemplate", void 0);
    __decorate16([
      Property(true)
    ], Rating2.prototype, "enableAnimation", void 0);
    __decorate16([
      Property(false)
    ], Rating2.prototype, "enableSingleSelection", void 0);
    __decorate16([
      Property("")
    ], Rating2.prototype, "fullTemplate", void 0);
    __decorate16([
      Property(5)
    ], Rating2.prototype, "itemsCount", void 0);
    __decorate16([
      Property(LabelPosition.Right)
    ], Rating2.prototype, "labelPosition", void 0);
    __decorate16([
      Property("")
    ], Rating2.prototype, "labelTemplate", void 0);
    __decorate16([
      Property(0)
    ], Rating2.prototype, "min", void 0);
    __decorate16([
      Property(PrecisionType.Full)
    ], Rating2.prototype, "precision", void 0);
    __decorate16([
      Property(false)
    ], Rating2.prototype, "readOnly", void 0);
    __decorate16([
      Property(false)
    ], Rating2.prototype, "showLabel", void 0);
    __decorate16([
      Property(true)
    ], Rating2.prototype, "showTooltip", void 0);
    __decorate16([
      Property("")
    ], Rating2.prototype, "tooltipTemplate", void 0);
    __decorate16([
      Property(0)
    ], Rating2.prototype, "value", void 0);
    __decorate16([
      Property(true)
    ], Rating2.prototype, "visible", void 0);
    __decorate16([
      Event()
    ], Rating2.prototype, "beforeItemRender", void 0);
    __decorate16([
      Event()
    ], Rating2.prototype, "created", void 0);
    __decorate16([
      Event()
    ], Rating2.prototype, "onItemHover", void 0);
    __decorate16([
      Event()
    ], Rating2.prototype, "valueChanged", void 0);
    Rating2 = __decorate16([
      NotifyPropertyChanges
    ], Rating2);
    return Rating2;
  }(Component)
);

export {
  calculateRelativeBasedPosition,
  calculatePosition,
  fit,
  isCollide,
  Popup,
  getScrollableParent,
  getZindexPartial,
  Dialog,
  Tooltip,
  createSpinner,
  showSpinner,
  hideSpinner,
  Input,
  NumericTextBox,
  regularExpressions,
  createMask,
  applyMask,
  wireEvents,
  unwireEvents,
  bindClearEvent,
  unstrippedValue,
  strippedValue,
  maskInputMouseDownHandler,
  maskInputMouseUpHandler,
  maskInputFocusHandler,
  triggerFocus,
  escapeRegExp,
  maskInputBlurHandler,
  maskInputDropHandler,
  mobileRemoveFunction,
  setMaskValue,
  setElementValue,
  maskInput,
  getVal,
  getMaskedVal,
  MaskUndo,
  MaskedTextBox,
  TicksData,
  ColorRangeData,
  LimitData,
  TooltipData,
  Slider,
  regex,
  ErrorOption,
  FormValidator,
  FilesProp,
  ButtonsProps,
  AsyncSettings,
  Uploader,
  ColorPicker,
  TextBox,
  SignatureBase,
  Signature,
  LabelPosition,
  PrecisionType,
  Rating
};
//# sourceMappingURL=chunk-MEYCFX4N.js.map
