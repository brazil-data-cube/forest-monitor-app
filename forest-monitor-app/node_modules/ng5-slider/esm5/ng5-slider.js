import { __values, __extends } from 'tslib';
import { Subject } from 'rxjs';
import { Renderer2, Directive, ElementRef, HostBinding, ChangeDetectorRef, Component, ViewChild, HostListener, Input, EventEmitter, Output, ContentChild, forwardRef, NgZone, NgModule } from '@angular/core';
import { throttleTime, tap, distinctUntilChanged, filter } from 'rxjs/operators';
import detectPassiveEvents from 'detect-passive-events';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

var PointerType = {
    Min: 0,
    Max: 1,
};
PointerType[PointerType.Min] = "Min";
PointerType[PointerType.Max] = "Max";
var LabelType = {
    Low: 0,
    High: 1,
    Floor: 2,
    Ceil: 3,
    TickValue: 4,
};
LabelType[LabelType.Low] = "Low";
LabelType[LabelType.High] = "High";
LabelType[LabelType.Floor] = "Floor";
LabelType[LabelType.Ceil] = "Ceil";
LabelType[LabelType.TickValue] = "TickValue";
var Options = /** @class */ (function () {
    function Options() {
        this.floor = 0;
        this.ceil = null;
        this.step = 1;
        this.minRange = null;
        this.maxRange = null;
        this.pushRange = false;
        this.minLimit = null;
        this.maxLimit = null;
        this.translate = null;
        this.combineLabels = null;
        this.getLegend = null;
        this.stepsArray = null;
        this.bindIndexForStepsArray = false;
        this.draggableRange = false;
        this.draggableRangeOnly = false;
        this.showSelectionBar = false;
        this.showSelectionBarEnd = false;
        this.showSelectionBarFromValue = null;
        this.showOuterSelectionBars = false;
        this.hidePointerLabels = false;
        this.hideLimitLabels = false;
        this.autoHideLimitLabels = true;
        this.readOnly = false;
        this.disabled = false;
        this.mouseEventsInterval = 50;
        this.touchEventsInterval = 50;
        this.inputEventsInterval = 100;
        this.outputEventsInterval = 100;
        this.showTicks = false;
        this.showTicksValues = false;
        this.tickStep = null;
        this.tickValueStep = 1;
        this.ticksArray = null;
        this.ticksTooltip = null;
        this.ticksValuesTooltip = null;
        this.vertical = false;
        this.getSelectionBarColor = null;
        this.getTickColor = null;
        this.getPointerColor = null;
        this.keyboardSupport = true;
        this.scale = 1;
        this.enforceStep = true;
        this.enforceRange = true;
        this.noSwitching = false;
        this.onlyBindHandles = false;
        this.rightToLeft = false;
        this.reversedControls = false;
        this.boundPointerLabels = true;
        this.logScale = false;
        this.customValueToPosition = null;
        this.customPositionToValue = null;
        this.precisionLimit = 12;
        this.selectionBarGradient = null;
        this.ariaLabel = null;
        this.ariaLabelledBy = null;
        this.ariaLabelHigh = null;
        this.ariaLabelledByHigh = null;
        this.handleDimension = null;
        this.barDimension = null;
        this.animate = true;
    }
    return Options;
}());
var ChangeContext = /** @class */ (function () {
    function ChangeContext() {
    }
    return ChangeContext;
}());
var ValueHelper = /** @class */ (function () {
    function ValueHelper() {
    }
    ValueHelper.isNullOrUndefined = function (value) {
        return value === undefined || value === null;
    };
    ValueHelper.linearValueToPosition = function (val, minVal, maxVal) {
        var range = maxVal - minVal;
        return (val - minVal) / range;
    };
    ValueHelper.logValueToPosition = function (val, minVal, maxVal) {
        val = Math.log(val);
        minVal = Math.log(minVal);
        maxVal = Math.log(maxVal);
        var range = maxVal - minVal;
        return (val - minVal) / range;
    };
    ValueHelper.linearPositionToValue = function (percent, minVal, maxVal) {
        return percent * (maxVal - minVal) + minVal;
    };
    ValueHelper.logPositionToValue = function (percent, minVal, maxVal) {
        minVal = Math.log(minVal);
        maxVal = Math.log(maxVal);
        var value = percent * (maxVal - minVal) + minVal;
        return Math.exp(value);
    };
    ValueHelper.findStepIndex = function (modelValue, stepsArray) {
        var differences = stepsArray.map(function (step) { return Math.abs(modelValue - step.value); });
        var minDifferenceIndex = 0;
        for (var index = 0; index < stepsArray.length; index++) {
            if (differences[index] !== differences[minDifferenceIndex] && differences[index] < differences[minDifferenceIndex]) {
                minDifferenceIndex = index;
            }
        }
        return minDifferenceIndex;
    };
    return ValueHelper;
}());
var CompatibilityHelper = /** @class */ (function () {
    function CompatibilityHelper() {
    }
    CompatibilityHelper.isTouchEvent = function (event) {
        if (((window)).TouchEvent !== undefined) {
            return event instanceof TouchEvent;
        }
        return event.touches !== undefined;
    };
    CompatibilityHelper.isResizeObserverAvailable = function () {
        return ((window)).ResizeObserver !== undefined;
    };
    return CompatibilityHelper;
}());
var MathHelper = /** @class */ (function () {
    function MathHelper() {
    }
    MathHelper.roundToPrecisionLimit = function (value, precisionLimit) {
        return +(value.toPrecision(precisionLimit));
    };
    MathHelper.clampToRange = function (value, floor, ceil) {
        return Math.min(Math.max(value, floor), ceil);
    };
    return MathHelper;
}());
var EventListener = /** @class */ (function () {
    function EventListener() {
        this.eventName = null;
        this.events = null;
        this.eventsSubscription = null;
        this.teardownCallback = null;
    }
    return EventListener;
}());
var EventListenerHelper = /** @class */ (function () {
    function EventListenerHelper(renderer) {
        this.renderer = renderer;
    }
    EventListenerHelper.prototype.attachPassiveEventListener = function (nativeElement, eventName, callback, throttleInterval) {
        if (detectPassiveEvents.hasSupport !== true) {
            return this.attachEventListener(nativeElement, eventName, callback, throttleInterval);
        }
        var listener = new EventListener();
        listener.eventName = eventName;
        listener.events = new Subject();
        var observerCallback = function (event) {
            listener.events.next(event);
        };
        nativeElement.addEventListener(eventName, observerCallback, { passive: true, capture: false });
        listener.teardownCallback = function () {
            nativeElement.removeEventListener(eventName, observerCallback, { passive: true, capture: false });
        };
        listener.eventsSubscription = listener.events
            .pipe((!ValueHelper.isNullOrUndefined(throttleInterval))
            ? throttleTime(throttleInterval, undefined, { leading: true, trailing: true })
            : tap(function () { }))
            .subscribe(function (event) {
            callback(event);
        });
        return listener;
    };
    EventListenerHelper.prototype.detachEventListener = function (eventListener) {
        if (!ValueHelper.isNullOrUndefined(eventListener.eventsSubscription)) {
            eventListener.eventsSubscription.unsubscribe();
            eventListener.eventsSubscription = null;
        }
        if (!ValueHelper.isNullOrUndefined(eventListener.events)) {
            eventListener.events.complete();
            eventListener.events = null;
        }
        if (!ValueHelper.isNullOrUndefined(eventListener.teardownCallback)) {
            eventListener.teardownCallback();
            eventListener.teardownCallback = null;
        }
    };
    EventListenerHelper.prototype.attachEventListener = function (nativeElement, eventName, callback, throttleInterval) {
        var listener = new EventListener();
        listener.eventName = eventName;
        listener.events = new Subject();
        var observerCallback = function (event) {
            listener.events.next(event);
        };
        listener.teardownCallback = this.renderer.listen(nativeElement, eventName, observerCallback);
        listener.eventsSubscription = listener.events
            .pipe((!ValueHelper.isNullOrUndefined(throttleInterval))
            ? throttleTime(throttleInterval, undefined, { leading: true, trailing: true })
            : tap(function () { }))
            .subscribe(function (event) { callback(event); });
        return listener;
    };
    return EventListenerHelper;
}());
var SliderElementDirective = /** @class */ (function () {
    function SliderElementDirective(elemRef, renderer, changeDetectionRef) {
        this.elemRef = elemRef;
        this.renderer = renderer;
        this.changeDetectionRef = changeDetectionRef;
        this._position = 0;
        this._dimension = 0;
        this._alwaysHide = false;
        this._vertical = false;
        this._scale = 1;
        this.opacity = 1;
        this.visibility = 'visible';
        this.left = '';
        this.bottom = '';
        this.height = '';
        this.width = '';
        this.eventListeners = [];
        this.eventListenerHelper = new EventListenerHelper(this.renderer);
    }
    Object.defineProperty(SliderElementDirective.prototype, "position", {
        get: function () {
            return this._position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderElementDirective.prototype, "dimension", {
        get: function () {
            return this._dimension;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderElementDirective.prototype, "alwaysHide", {
        get: function () {
            return this._alwaysHide;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderElementDirective.prototype, "vertical", {
        get: function () {
            return this._vertical;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderElementDirective.prototype, "scale", {
        get: function () {
            return this._scale;
        },
        enumerable: true,
        configurable: true
    });
    SliderElementDirective.prototype.setAlwaysHide = function (hide) {
        this._alwaysHide = hide;
        if (hide) {
            this.visibility = 'hidden';
        }
        else {
            this.visibility = 'visible';
        }
    };
    SliderElementDirective.prototype.hide = function () {
        this.opacity = 0;
    };
    SliderElementDirective.prototype.show = function () {
        if (this.alwaysHide) {
            return;
        }
        this.opacity = 1;
    };
    SliderElementDirective.prototype.isVisible = function () {
        if (this.alwaysHide) {
            return false;
        }
        return this.opacity !== 0;
    };
    SliderElementDirective.prototype.setVertical = function (vertical) {
        this._vertical = vertical;
        if (this._vertical) {
            this.left = '';
            this.width = '';
        }
        else {
            this.bottom = '';
            this.height = '';
        }
    };
    SliderElementDirective.prototype.setScale = function (scale) {
        this._scale = scale;
    };
    SliderElementDirective.prototype.setPosition = function (pos) {
        if (this._position !== pos && !this.isRefDestroyed()) {
            this.changeDetectionRef.markForCheck();
        }
        this._position = pos;
        if (this._vertical) {
            this.bottom = Math.round(pos) + 'px';
        }
        else {
            this.left = Math.round(pos) + 'px';
        }
    };
    SliderElementDirective.prototype.calculateDimension = function () {
        var val = this.getBoundingClientRect();
        if (this.vertical) {
            this._dimension = (val.bottom - val.top) * this.scale;
        }
        else {
            this._dimension = (val.right - val.left) * this.scale;
        }
    };
    SliderElementDirective.prototype.setDimension = function (dim) {
        if (this._dimension !== dim && !this.isRefDestroyed()) {
            this.changeDetectionRef.markForCheck();
        }
        this._dimension = dim;
        if (this._vertical) {
            this.height = Math.round(dim) + 'px';
        }
        else {
            this.width = Math.round(dim) + 'px';
        }
    };
    SliderElementDirective.prototype.getBoundingClientRect = function () {
        return this.elemRef.nativeElement.getBoundingClientRect();
    };
    SliderElementDirective.prototype.on = function (eventName, callback, debounceInterval) {
        var listener = this.eventListenerHelper.attachEventListener(this.elemRef.nativeElement, eventName, callback, debounceInterval);
        this.eventListeners.push(listener);
    };
    SliderElementDirective.prototype.onPassive = function (eventName, callback, debounceInterval) {
        var listener = this.eventListenerHelper.attachPassiveEventListener(this.elemRef.nativeElement, eventName, callback, debounceInterval);
        this.eventListeners.push(listener);
    };
    SliderElementDirective.prototype.off = function (eventName) {
        var listenersToKeep;
        var listenersToRemove;
        if (!ValueHelper.isNullOrUndefined(eventName)) {
            listenersToKeep = this.eventListeners.filter(function (event) { return event.eventName !== eventName; });
            listenersToRemove = this.eventListeners.filter(function (event) { return event.eventName === eventName; });
        }
        else {
            listenersToKeep = [];
            listenersToRemove = this.eventListeners;
        }
        try {
            for (var listenersToRemove_1 = __values(listenersToRemove), listenersToRemove_1_1 = listenersToRemove_1.next(); !listenersToRemove_1_1.done; listenersToRemove_1_1 = listenersToRemove_1.next()) {
                var listener = listenersToRemove_1_1.value;
                this.eventListenerHelper.detachEventListener(listener);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (listenersToRemove_1_1 && !listenersToRemove_1_1.done && (_a = listenersToRemove_1.return)) _a.call(listenersToRemove_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.eventListeners = listenersToKeep;
        var e_1, _a;
    };
    SliderElementDirective.prototype.isRefDestroyed = function () {
        return ValueHelper.isNullOrUndefined(this.changeDetectionRef) || this.changeDetectionRef['destroyed'];
    };
    return SliderElementDirective;
}());
SliderElementDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ng5SliderElement]'
            },] },
];
SliderElementDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: ChangeDetectorRef, },
]; };
SliderElementDirective.propDecorators = {
    "opacity": [{ type: HostBinding, args: ['style.opacity',] },],
    "visibility": [{ type: HostBinding, args: ['style.visibility',] },],
    "left": [{ type: HostBinding, args: ['style.left',] },],
    "bottom": [{ type: HostBinding, args: ['style.bottom',] },],
    "height": [{ type: HostBinding, args: ['style.height',] },],
    "width": [{ type: HostBinding, args: ['style.width',] },],
};
var SliderHandleDirective = /** @class */ (function (_super) {
    __extends(SliderHandleDirective, _super);
    function SliderHandleDirective(elemRef, renderer, changeDetectionRef) {
        var _this = _super.call(this, elemRef, renderer, changeDetectionRef) || this;
        _this.active = false;
        _this.role = '';
        _this.tabindex = '';
        _this.ariaOrientation = '';
        _this.ariaLabel = '';
        _this.ariaLabelledBy = '';
        _this.ariaValueNow = '';
        _this.ariaValueText = '';
        _this.ariaValueMin = '';
        _this.ariaValueMax = '';
        return _this;
    }
    SliderHandleDirective.prototype.focus = function () {
        this.elemRef.nativeElement.focus();
    };
    return SliderHandleDirective;
}(SliderElementDirective));
SliderHandleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ng5SliderHandle]'
            },] },
];
SliderHandleDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: ChangeDetectorRef, },
]; };
SliderHandleDirective.propDecorators = {
    "active": [{ type: HostBinding, args: ['class.ng5-slider-active',] },],
    "role": [{ type: HostBinding, args: ['attr.role',] },],
    "tabindex": [{ type: HostBinding, args: ['attr.tabindex',] },],
    "ariaOrientation": [{ type: HostBinding, args: ['attr.aria-orientation',] },],
    "ariaLabel": [{ type: HostBinding, args: ['attr.aria-label',] },],
    "ariaLabelledBy": [{ type: HostBinding, args: ['attr.aria-labelledby',] },],
    "ariaValueNow": [{ type: HostBinding, args: ['attr.aria-valuenow',] },],
    "ariaValueText": [{ type: HostBinding, args: ['attr.aria-valuetext',] },],
    "ariaValueMin": [{ type: HostBinding, args: ['attr.aria-valuemin',] },],
    "ariaValueMax": [{ type: HostBinding, args: ['attr.aria-valuemax',] },],
};
var SliderLabelDirective = /** @class */ (function (_super) {
    __extends(SliderLabelDirective, _super);
    function SliderLabelDirective(elemRef, renderer, changeDetectionRef) {
        var _this = _super.call(this, elemRef, renderer, changeDetectionRef) || this;
        _this._value = null;
        return _this;
    }
    Object.defineProperty(SliderLabelDirective.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    SliderLabelDirective.prototype.setValue = function (value) {
        var recalculateDimension = false;
        if (!this.alwaysHide &&
            (ValueHelper.isNullOrUndefined(this.value) ||
                this.value.length !== value.length ||
                (this.value.length > 0 && this.dimension === 0))) {
            recalculateDimension = true;
        }
        this._value = value;
        this.elemRef.nativeElement.innerHTML = value;
        if (recalculateDimension) {
            this.calculateDimension();
        }
    };
    return SliderLabelDirective;
}(SliderElementDirective));
SliderLabelDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ng5SliderLabel]'
            },] },
];
SliderLabelDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: ChangeDetectorRef, },
]; };
var Tick = /** @class */ (function () {
    function Tick() {
        this.selected = false;
        this.style = {};
        this.tooltip = null;
        this.tooltipPlacement = null;
        this.value = null;
        this.valueTooltip = null;
        this.valueTooltipPlacement = null;
        this.legend = null;
    }
    return Tick;
}());
var Dragging = /** @class */ (function () {
    function Dragging() {
        this.active = false;
        this.value = 0;
        this.difference = 0;
        this.position = 0;
        this.lowLimit = 0;
        this.highLimit = 0;
    }
    return Dragging;
}());
var ModelValues = /** @class */ (function () {
    function ModelValues() {
    }
    ModelValues.compare = function (x, y) {
        if (ValueHelper.isNullOrUndefined(x) && ValueHelper.isNullOrUndefined(y)) {
            return false;
        }
        if (ValueHelper.isNullOrUndefined(x) !== ValueHelper.isNullOrUndefined(y)) {
            return false;
        }
        return x.value === y.value && x.highValue === y.highValue;
    };
    return ModelValues;
}());
var ModelChange = /** @class */ (function (_super) {
    __extends(ModelChange, _super);
    function ModelChange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModelChange.compare = function (x, y) {
        if (ValueHelper.isNullOrUndefined(x) && ValueHelper.isNullOrUndefined(y)) {
            return false;
        }
        if (ValueHelper.isNullOrUndefined(x) !== ValueHelper.isNullOrUndefined(y)) {
            return false;
        }
        return x.value === y.value &&
            x.highValue === y.highValue &&
            x.forceChange === y.forceChange;
    };
    return ModelChange;
}(ModelValues));
var NG5_SLIDER_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SliderComponent; }),
    multi: true,
};
var SliderComponent = /** @class */ (function () {
    function SliderComponent(renderer, elementRef, changeDetectionRef, zone) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.changeDetectionRef = changeDetectionRef;
        this.zone = zone;
        this.value = null;
        this.valueChange = new EventEmitter();
        this.highValue = null;
        this.highValueChange = new EventEmitter();
        this.options = new Options();
        this.userChangeStart = new EventEmitter();
        this.userChange = new EventEmitter();
        this.userChangeEnd = new EventEmitter();
        this.initHasRun = false;
        this.inputModelChangeSubject = new Subject();
        this.inputModelChangeSubscription = null;
        this.outputModelChangeSubject = new Subject();
        this.outputModelChangeSubscription = null;
        this.viewLowValue = null;
        this.viewHighValue = null;
        this.viewOptions = new Options();
        this.handleHalfDimension = 0;
        this.maxHandlePosition = 0;
        this.currentTrackingPointer = null;
        this.currentFocusPointer = null;
        this.firstKeyDown = false;
        this.touchId = null;
        this.dragging = new Dragging();
        this.sliderElementVerticalClass = false;
        this.sliderElementAnimateClass = false;
        this.sliderElementDisabledAttr = null;
        this.barStyle = {};
        this.minPointerStyle = {};
        this.maxPointerStyle = {};
        this.fullBarTransparentClass = false;
        this.selectionBarDraggableClass = false;
        this.ticksUnderValuesClass = false;
        this.intermediateTicks = false;
        this.ticks = [];
        this.eventListenerHelper = null;
        this.onMoveEventListener = null;
        this.onEndEventListener = null;
        this.resizeObserver = null;
        this.onTouchedCallback = null;
        this.onChangeCallback = null;
        this.eventListenerHelper = new EventListenerHelper(this.renderer);
    }
    Object.defineProperty(SliderComponent.prototype, "manualRefresh", {
        set: function (manualRefresh) {
            var _this = this;
            this.unsubscribeManualRefresh();
            this.manualRefreshSubscription = manualRefresh.subscribe(function () {
                setTimeout(function () { return _this.calculateViewDimensionsAndDetectChanges(); });
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "triggerFocus", {
        set: function (triggerFocus) {
            var _this = this;
            this.unsubscribeTriggerFocus();
            this.triggerFocusSubscription = triggerFocus.subscribe(function (pointerType) {
                _this.focusPointer(pointerType);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "range", {
        get: function () {
            return !ValueHelper.isNullOrUndefined(this.value) && !ValueHelper.isNullOrUndefined(this.highValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "showTicks", {
        get: function () {
            return this.viewOptions.showTicks;
        },
        enumerable: true,
        configurable: true
    });
    SliderComponent.prototype.ngOnInit = function () {
        this.viewOptions = new Options();
        Object.assign(this.viewOptions, this.options);
        this.updateDisabledState();
        this.updateVerticalState();
    };
    SliderComponent.prototype.ngAfterViewInit = function () {
        this.applyOptions();
        this.subscribeInputModelChangeSubject(this.viewOptions.inputEventsInterval);
        this.subscribeOutputModelChangeSubject(this.viewOptions.outputEventsInterval);
        this.renormaliseModelValues();
        this.viewLowValue = this.modelValueToViewValue(this.value);
        if (this.range) {
            this.viewHighValue = this.modelValueToViewValue(this.highValue);
        }
        else {
            this.viewHighValue = null;
        }
        this.updateVerticalState();
        this.manageElementsStyle();
        this.updateDisabledState();
        this.calculateViewDimensions();
        this.addAccessibility();
        this.updateCeilLabel();
        this.updateFloorLabel();
        this.initHandles();
        this.manageEventsBindings();
        this.subscribeResizeObserver();
        this.initHasRun = true;
        if (!this.isRefDestroyed()) {
            this.changeDetectionRef.detectChanges();
        }
    };
    SliderComponent.prototype.ngOnChanges = function (changes) {
        if (!ValueHelper.isNullOrUndefined(changes["options"])) {
            this.onChangeOptions();
        }
        if (!ValueHelper.isNullOrUndefined(changes["value"]) ||
            !ValueHelper.isNullOrUndefined(changes["highValue"])) {
            this.inputModelChangeSubject.next({
                value: this.value,
                highValue: this.highValue,
                forceChange: false,
                internalChange: false
            });
        }
    };
    SliderComponent.prototype.ngOnDestroy = function () {
        this.unbindEvents();
        this.unsubscribeResizeObserver();
        this.unsubscribeInputModelChangeSubject();
        this.unsubscribeOutputModelChangeSubject();
        this.unsubscribeManualRefresh();
        this.unsubscribeTriggerFocus();
    };
    SliderComponent.prototype.writeValue = function (obj) {
        if (obj instanceof Array) {
            this.value = obj[0];
            this.highValue = obj[1];
        }
        else {
            this.value = obj;
        }
        this.inputModelChangeSubject.next({
            value: this.value,
            highValue: this.highValue,
            forceChange: false,
            internalChange: false
        });
    };
    SliderComponent.prototype.registerOnChange = function (onChangeCallback) {
        this.onChangeCallback = onChangeCallback;
    };
    SliderComponent.prototype.registerOnTouched = function (onTouchedCallback) {
        this.onTouchedCallback = onTouchedCallback;
    };
    SliderComponent.prototype.setDisabledState = function (isDisabled) {
        this.viewOptions.disabled = isDisabled;
        this.updateDisabledState();
    };
    SliderComponent.prototype.onResize = function (event) {
        this.calculateViewDimensionsAndDetectChanges();
    };
    SliderComponent.prototype.subscribeInputModelChangeSubject = function (interval) {
        var _this = this;
        this.inputModelChangeSubscription = this.inputModelChangeSubject
            .pipe(distinctUntilChanged(ModelChange.compare), filter(function (modelChange) { return !modelChange.forceChange && !modelChange.internalChange; }), (!ValueHelper.isNullOrUndefined(interval))
            ? throttleTime(interval, undefined, { leading: true, trailing: true })
            : tap(function () { }))
            .subscribe(function (modelChange) { return _this.applyInputModelChange(modelChange); });
    };
    SliderComponent.prototype.subscribeOutputModelChangeSubject = function (interval) {
        var _this = this;
        this.outputModelChangeSubscription = this.outputModelChangeSubject
            .pipe(distinctUntilChanged(ModelChange.compare), (!ValueHelper.isNullOrUndefined(interval))
            ? throttleTime(interval, undefined, { leading: true, trailing: true })
            : tap(function () { }))
            .subscribe(function (modelChange) { return _this.publishOutputModelChange(modelChange); });
    };
    SliderComponent.prototype.subscribeResizeObserver = function () {
        var _this = this;
        if (CompatibilityHelper.isResizeObserverAvailable()) {
            this.resizeObserver = new ResizeObserver(function () { return _this.calculateViewDimensionsAndDetectChanges(); });
            this.resizeObserver.observe(this.elementRef.nativeElement);
        }
    };
    SliderComponent.prototype.unsubscribeResizeObserver = function () {
        if (CompatibilityHelper.isResizeObserverAvailable() && this.resizeObserver !== null) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
    };
    SliderComponent.prototype.unsubscribeOnMove = function () {
        if (!ValueHelper.isNullOrUndefined(this.onMoveEventListener)) {
            this.eventListenerHelper.detachEventListener(this.onMoveEventListener);
            this.onMoveEventListener = null;
        }
    };
    SliderComponent.prototype.unsubscribeOnEnd = function () {
        if (!ValueHelper.isNullOrUndefined(this.onEndEventListener)) {
            this.eventListenerHelper.detachEventListener(this.onEndEventListener);
            this.onEndEventListener = null;
        }
    };
    SliderComponent.prototype.unsubscribeInputModelChangeSubject = function () {
        if (!ValueHelper.isNullOrUndefined(this.inputModelChangeSubscription)) {
            this.inputModelChangeSubscription.unsubscribe();
            this.inputModelChangeSubscription = null;
        }
    };
    SliderComponent.prototype.unsubscribeOutputModelChangeSubject = function () {
        if (!ValueHelper.isNullOrUndefined(this.outputModelChangeSubscription)) {
            this.outputModelChangeSubscription.unsubscribe();
            this.outputModelChangeSubscription = null;
        }
    };
    SliderComponent.prototype.unsubscribeManualRefresh = function () {
        if (!ValueHelper.isNullOrUndefined(this.manualRefreshSubscription)) {
            this.manualRefreshSubscription.unsubscribe();
            this.manualRefreshSubscription = null;
        }
    };
    SliderComponent.prototype.unsubscribeTriggerFocus = function () {
        if (!ValueHelper.isNullOrUndefined(this.triggerFocusSubscription)) {
            this.triggerFocusSubscription.unsubscribe();
            this.triggerFocusSubscription = null;
        }
    };
    SliderComponent.prototype.getPointerElement = function (pointerType) {
        if (pointerType === PointerType.Min) {
            return this.minHandleElement;
        }
        else if (pointerType === PointerType.Max) {
            return this.maxHandleElement;
        }
        return null;
    };
    SliderComponent.prototype.getCurrentTrackingValue = function () {
        if (this.currentTrackingPointer === PointerType.Min) {
            return this.viewLowValue;
        }
        else if (this.currentTrackingPointer === PointerType.Max) {
            return this.viewHighValue;
        }
        return null;
    };
    SliderComponent.prototype.modelValueToViewValue = function (modelValue) {
        if (ValueHelper.isNullOrUndefined(modelValue)) {
            return NaN;
        }
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray) && !this.viewOptions.bindIndexForStepsArray) {
            return ValueHelper.findStepIndex(+modelValue, this.viewOptions.stepsArray);
        }
        return +modelValue;
    };
    SliderComponent.prototype.viewValueToModelValue = function (viewValue) {
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray) && !this.viewOptions.bindIndexForStepsArray) {
            return this.getStepValue(viewValue);
        }
        return viewValue;
    };
    SliderComponent.prototype.getStepValue = function (sliderValue) {
        var step = this.viewOptions.stepsArray[sliderValue];
        return (!ValueHelper.isNullOrUndefined(step)) ? step.value : NaN;
    };
    SliderComponent.prototype.applyViewChange = function () {
        this.value = this.viewValueToModelValue(this.viewLowValue);
        if (this.range) {
            this.highValue = this.viewValueToModelValue(this.viewHighValue);
        }
        this.outputModelChangeSubject.next({
            value: this.value,
            highValue: this.highValue,
            userEventInitiated: true,
            forceChange: false
        });
        this.inputModelChangeSubject.next({
            value: this.value,
            highValue: this.highValue,
            forceChange: false,
            internalChange: true
        });
    };
    SliderComponent.prototype.applyInputModelChange = function (modelChange) {
        var normalisedModelChange = this.normaliseModelValues(modelChange);
        var normalisationChange = !ModelValues.compare(modelChange, normalisedModelChange);
        if (normalisationChange) {
            this.value = normalisedModelChange.value;
            this.highValue = normalisedModelChange.highValue;
        }
        this.viewLowValue = this.modelValueToViewValue(normalisedModelChange.value);
        if (this.range) {
            this.viewHighValue = this.modelValueToViewValue(normalisedModelChange.highValue);
        }
        else {
            this.viewHighValue = null;
        }
        this.updateLowHandle(this.valueToPosition(this.viewLowValue));
        if (this.range) {
            this.updateHighHandle(this.valueToPosition(this.viewHighValue));
        }
        this.updateSelectionBar();
        this.updateTicksScale();
        this.updateAriaAttributes();
        if (this.range) {
            this.updateCombinedLabel();
        }
        this.outputModelChangeSubject.next({
            value: normalisedModelChange.value,
            highValue: normalisedModelChange.highValue,
            forceChange: normalisationChange,
            userEventInitiated: false
        });
    };
    SliderComponent.prototype.publishOutputModelChange = function (modelChange) {
        var _this = this;
        var emitOutputs = function () {
            _this.valueChange.emit(modelChange.value);
            if (_this.range) {
                _this.highValueChange.emit(modelChange.highValue);
            }
            if (!ValueHelper.isNullOrUndefined(_this.onChangeCallback)) {
                if (_this.range) {
                    _this.onChangeCallback([modelChange.value, modelChange.highValue]);
                }
                else {
                    _this.onChangeCallback(modelChange.value);
                }
            }
            if (!ValueHelper.isNullOrUndefined(_this.onTouchedCallback)) {
                if (_this.range) {
                    _this.onTouchedCallback([modelChange.value, modelChange.highValue]);
                }
                else {
                    _this.onTouchedCallback(modelChange.value);
                }
            }
        };
        if (modelChange.userEventInitiated) {
            emitOutputs();
            this.userChange.emit(this.getChangeContext());
        }
        else {
            setTimeout(function () { emitOutputs(); });
        }
    };
    SliderComponent.prototype.normaliseModelValues = function (input) {
        var normalisedInput = new ModelValues();
        normalisedInput.value = input.value;
        normalisedInput.highValue = input.highValue;
        if (this.viewOptions.enforceStep) {
            normalisedInput.value = this.roundStep(normalisedInput.value);
            if (this.range) {
                normalisedInput.highValue = this.roundStep(normalisedInput.highValue);
            }
        }
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray) || !this.viewOptions.enforceRange) {
            return normalisedInput;
        }
        normalisedInput.value = MathHelper.clampToRange(normalisedInput.value, this.viewOptions.floor, this.viewOptions.ceil);
        if (this.range) {
            normalisedInput.highValue = MathHelper.clampToRange(normalisedInput.highValue, this.viewOptions.floor, this.viewOptions.ceil);
        }
        if (this.range && input.value > input.highValue) {
            if (this.viewOptions.noSwitching) {
                normalisedInput.value = normalisedInput.highValue;
            }
            else {
                var tempValue = input.value;
                normalisedInput.value = input.highValue;
                normalisedInput.highValue = tempValue;
            }
        }
        return normalisedInput;
    };
    SliderComponent.prototype.renormaliseModelValues = function () {
        var previousModelValues = {
            value: this.value,
            highValue: this.highValue
        };
        var normalisedModelValues = this.normaliseModelValues(previousModelValues);
        if (!ModelValues.compare(normalisedModelValues, previousModelValues)) {
            this.value = normalisedModelValues.value;
            this.highValue = normalisedModelValues.highValue;
            this.outputModelChangeSubject.next({
                value: this.value,
                highValue: this.highValue,
                forceChange: true,
                userEventInitiated: false
            });
        }
    };
    SliderComponent.prototype.onChangeOptions = function () {
        if (!this.initHasRun) {
            return;
        }
        var previousInputEventsInterval = this.viewOptions.inputEventsInterval;
        var previousOutputEventsInterval = this.viewOptions.outputEventsInterval;
        this.applyOptions();
        if (previousInputEventsInterval !== this.viewOptions.inputEventsInterval) {
            this.unsubscribeInputModelChangeSubject();
            this.subscribeInputModelChangeSubject(this.viewOptions.inputEventsInterval);
        }
        if (previousOutputEventsInterval !== this.viewOptions.outputEventsInterval) {
            this.unsubscribeInputModelChangeSubject();
            this.subscribeInputModelChangeSubject(this.viewOptions.outputEventsInterval);
        }
        this.renormaliseModelValues();
        this.viewLowValue = this.modelValueToViewValue(this.value);
        if (this.range) {
            this.viewHighValue = this.modelValueToViewValue(this.highValue);
        }
        else {
            this.viewHighValue = null;
        }
        this.resetSlider();
    };
    SliderComponent.prototype.applyOptions = function () {
        this.viewOptions = new Options();
        Object.assign(this.viewOptions, this.options);
        this.viewOptions.draggableRange = this.range && this.viewOptions.draggableRange;
        this.viewOptions.draggableRangeOnly = this.range && this.viewOptions.draggableRangeOnly;
        if (this.viewOptions.draggableRangeOnly) {
            this.viewOptions.draggableRange = true;
        }
        this.viewOptions.showTicks = this.viewOptions.showTicks ||
            this.viewOptions.showTicksValues ||
            !ValueHelper.isNullOrUndefined(this.viewOptions.ticksArray);
        if (this.viewOptions.showTicks &&
            (!ValueHelper.isNullOrUndefined(this.viewOptions.tickStep) || !ValueHelper.isNullOrUndefined(this.viewOptions.ticksArray))) {
            this.intermediateTicks = true;
        }
        this.viewOptions.showSelectionBar = this.viewOptions.showSelectionBar ||
            this.viewOptions.showSelectionBarEnd ||
            !ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue);
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray)) {
            this.applyStepsArrayOptions();
        }
        else {
            this.applyFloorCeilOptions();
        }
        if (ValueHelper.isNullOrUndefined(this.viewOptions.combineLabels)) {
            this.viewOptions.combineLabels = function (minValue, maxValue) {
                return minValue + ' - ' + maxValue;
            };
        }
        if (this.viewOptions.logScale && this.viewOptions.floor === 0) {
            throw Error('Can\'t use floor=0 with logarithmic scale');
        }
    };
    SliderComponent.prototype.applyStepsArrayOptions = function () {
        var _this = this;
        this.viewOptions.floor = 0;
        this.viewOptions.ceil = this.viewOptions.stepsArray.length - 1;
        this.viewOptions.step = 1;
        if (ValueHelper.isNullOrUndefined(this.viewOptions.translate)) {
            this.viewOptions.translate = function (modelValue) {
                if (_this.viewOptions.bindIndexForStepsArray) {
                    return String(_this.getStepValue(modelValue));
                }
                return String(modelValue);
            };
        }
        this.viewOptions.getLegend = function (index) {
            var step = _this.viewOptions.stepsArray[index];
            return step.legend;
        };
    };
    SliderComponent.prototype.applyFloorCeilOptions = function () {
        if (ValueHelper.isNullOrUndefined(this.viewOptions.step)) {
            this.viewOptions.step = 1;
        }
        else {
            this.viewOptions.step = +this.viewOptions.step;
            if (this.viewOptions.step <= 0) {
                this.viewOptions.step = 1;
            }
        }
        if (ValueHelper.isNullOrUndefined(this.viewOptions.ceil) ||
            ValueHelper.isNullOrUndefined(this.viewOptions.floor)) {
            throw Error('floor and ceil options must be supplied');
        }
        this.viewOptions.ceil = +this.viewOptions.ceil;
        this.viewOptions.floor = +this.viewOptions.floor;
        if (ValueHelper.isNullOrUndefined(this.viewOptions.translate)) {
            this.viewOptions.translate = function (value) { return String(value); };
        }
    };
    SliderComponent.prototype.resetSlider = function () {
        this.manageElementsStyle();
        this.addAccessibility();
        this.updateCeilLabel();
        this.updateFloorLabel();
        this.unbindEvents();
        this.manageEventsBindings();
        this.updateDisabledState();
        this.calculateViewDimensions();
        this.refocusPointerIfNeeded();
    };
    SliderComponent.prototype.focusPointer = function (pointerType) {
        if (pointerType !== PointerType.Min && pointerType !== PointerType.Max) {
            pointerType = PointerType.Min;
        }
        if (pointerType === PointerType.Min) {
            this.minHandleElement.focus();
        }
        else if (this.range && pointerType === PointerType.Max) {
            this.maxHandleElement.focus();
        }
    };
    SliderComponent.prototype.refocusPointerIfNeeded = function () {
        if (!ValueHelper.isNullOrUndefined(this.currentFocusPointer)) {
            this.onPointerFocus(this.currentFocusPointer);
            var element = this.getPointerElement(this.currentFocusPointer);
            element.focus();
        }
    };
    SliderComponent.prototype.manageElementsStyle = function () {
        var _this = this;
        this.updateScale();
        this.floorLabelElement.setAlwaysHide(this.viewOptions.showTicksValues || this.viewOptions.hideLimitLabels);
        this.ceilLabelElement.setAlwaysHide(this.viewOptions.showTicksValues || this.viewOptions.hideLimitLabels);
        var hideLabelsForTicks = this.viewOptions.showTicksValues && !this.intermediateTicks;
        this.minHandleLabelElement.setAlwaysHide(hideLabelsForTicks || this.viewOptions.hidePointerLabels);
        this.maxHandleLabelElement.setAlwaysHide(hideLabelsForTicks || !this.range || this.viewOptions.hidePointerLabels);
        this.combinedLabelElement.setAlwaysHide(hideLabelsForTicks || !this.range || this.viewOptions.hidePointerLabels);
        this.selectionBarElement.setAlwaysHide(!this.range && !this.viewOptions.showSelectionBar);
        this.leftOuterSelectionBarElement.setAlwaysHide(!this.range || !this.viewOptions.showOuterSelectionBars);
        this.rightOuterSelectionBarElement.setAlwaysHide(!this.range || !this.viewOptions.showOuterSelectionBars);
        this.fullBarTransparentClass = this.range && this.viewOptions.showOuterSelectionBars;
        this.selectionBarDraggableClass = this.viewOptions.draggableRange && !this.viewOptions.onlyBindHandles;
        this.ticksUnderValuesClass = this.intermediateTicks && this.options.showTicksValues;
        if (this.sliderElementVerticalClass !== this.viewOptions.vertical) {
            this.updateVerticalState();
            setTimeout(function () { _this.resetSlider(); });
        }
        if (this.sliderElementAnimateClass !== this.viewOptions.animate) {
            setTimeout(function () { _this.sliderElementAnimateClass = _this.viewOptions.animate; });
        }
    };
    SliderComponent.prototype.manageEventsBindings = function () {
        if (this.viewOptions.disabled || this.viewOptions.readOnly) {
            this.unbindEvents();
        }
        else {
            this.bindEvents();
        }
    };
    SliderComponent.prototype.updateDisabledState = function () {
        this.sliderElementDisabledAttr = this.viewOptions.disabled ? 'disabled' : null;
    };
    SliderComponent.prototype.updateVerticalState = function () {
        this.sliderElementVerticalClass = this.viewOptions.vertical;
        try {
            for (var _a = __values(this.getAllSliderElements()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var element = _b.value;
                if (!ValueHelper.isNullOrUndefined(element)) {
                    element.setVertical(this.viewOptions.vertical);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var e_2, _c;
    };
    SliderComponent.prototype.updateScale = function () {
        try {
            for (var _a = __values(this.getAllSliderElements()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var element = _b.value;
                element.setScale(this.viewOptions.scale);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var e_3, _c;
    };
    SliderComponent.prototype.getAllSliderElements = function () {
        return [this.leftOuterSelectionBarElement,
            this.rightOuterSelectionBarElement,
            this.fullBarElement,
            this.selectionBarElement,
            this.minHandleElement,
            this.maxHandleElement,
            this.floorLabelElement,
            this.ceilLabelElement,
            this.minHandleLabelElement,
            this.maxHandleLabelElement,
            this.combinedLabelElement,
            this.ticksElement
        ];
    };
    SliderComponent.prototype.initHandles = function () {
        this.updateLowHandle(this.valueToPosition(this.viewLowValue));
        if (this.range) {
            this.updateHighHandle(this.valueToPosition(this.viewHighValue));
        }
        this.updateSelectionBar();
        if (this.range) {
            this.updateCombinedLabel();
        }
        this.updateTicksScale();
    };
    SliderComponent.prototype.addAccessibility = function () {
        this.updateAriaAttributes();
        this.minHandleElement.role = 'slider';
        if (this.viewOptions.keyboardSupport &&
            !(this.viewOptions.readOnly || this.viewOptions.disabled)) {
            this.minHandleElement.tabindex = '0';
        }
        else {
            this.minHandleElement.tabindex = '';
        }
        if (this.viewOptions.vertical) {
            this.minHandleElement.ariaOrientation = 'vertical';
        }
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.ariaLabel)) {
            this.minHandleElement.ariaLabel = this.viewOptions.ariaLabel;
        }
        else if (!ValueHelper.isNullOrUndefined(this.viewOptions.ariaLabelledBy)) {
            this.minHandleElement.ariaLabelledBy = this.viewOptions.ariaLabelledBy;
        }
        if (this.range) {
            this.maxHandleElement.role = 'slider';
            if (this.viewOptions.keyboardSupport &&
                !(this.viewOptions.readOnly || this.viewOptions.disabled)) {
                this.maxHandleElement.tabindex = '0';
            }
            else {
                this.maxHandleElement.tabindex = '';
            }
            this.maxHandleElement.ariaOrientation = this.viewOptions.vertical ? 'vertical' : 'horizontal';
            if (!ValueHelper.isNullOrUndefined(this.viewOptions.ariaLabelHigh)) {
                this.maxHandleElement.ariaLabel = this.viewOptions.ariaLabelHigh;
            }
            else if (!ValueHelper.isNullOrUndefined(this.viewOptions.ariaLabelledByHigh)) {
                this.maxHandleElement.ariaLabelledBy = this.viewOptions.ariaLabelledByHigh;
            }
        }
    };
    SliderComponent.prototype.updateAriaAttributes = function () {
        this.minHandleElement.ariaValueNow = (+this.value).toString();
        this.minHandleElement.ariaValueText = this.viewOptions.translate(+this.value, LabelType.Low);
        this.minHandleElement.ariaValueMin = this.viewOptions.floor.toString();
        this.minHandleElement.ariaValueMax = this.viewOptions.ceil.toString();
        if (this.range) {
            this.maxHandleElement.ariaValueNow = (+this.highValue).toString();
            this.maxHandleElement.ariaValueText = this.viewOptions.translate(+this.highValue, LabelType.High);
            this.maxHandleElement.ariaValueMin = this.viewOptions.floor.toString();
            this.maxHandleElement.ariaValueMax = this.viewOptions.ceil.toString();
        }
    };
    SliderComponent.prototype.calculateViewDimensions = function () {
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.handleDimension)) {
            this.minHandleElement.setDimension(this.viewOptions.handleDimension);
        }
        else {
            this.minHandleElement.calculateDimension();
        }
        var handleWidth = this.minHandleElement.dimension;
        this.handleHalfDimension = handleWidth / 2;
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.barDimension)) {
            this.fullBarElement.setDimension(this.viewOptions.barDimension);
        }
        else {
            this.fullBarElement.calculateDimension();
        }
        this.maxHandlePosition = this.fullBarElement.dimension - handleWidth;
        if (this.initHasRun) {
            this.updateFloorLabel();
            this.updateCeilLabel();
            this.initHandles();
        }
    };
    SliderComponent.prototype.calculateViewDimensionsAndDetectChanges = function () {
        this.calculateViewDimensions();
        if (!this.isRefDestroyed()) {
            this.changeDetectionRef.detectChanges();
        }
    };
    SliderComponent.prototype.isRefDestroyed = function () {
        return this.changeDetectionRef['destroyed'];
    };
    SliderComponent.prototype.updateTicksScale = function () {
        var _this = this;
        if (!this.viewOptions.showTicks) {
            return;
        }
        var ticksArray = !ValueHelper.isNullOrUndefined(this.viewOptions.ticksArray)
            ? this.viewOptions.ticksArray
            : this.getTicksArray();
        var translate = this.viewOptions.vertical ? 'translateY' : 'translateX';
        if (this.viewOptions.rightToLeft) {
            ticksArray.reverse();
        }
        var newTicks = ticksArray.map(function (value) {
            var position = _this.valueToPosition(value);
            if (_this.viewOptions.vertical) {
                position = _this.maxHandlePosition - position;
            }
            var translation = translate + '(' + Math.round(position) + 'px)';
            var tick = new Tick();
            tick.selected = _this.isTickSelected(value);
            tick.style = {
                '-webkit-transform': translation,
                '-moz-transform': translation,
                '-o-transform': translation,
                '-ms-transform': translation,
                transform: translation,
            };
            if (tick.selected && !ValueHelper.isNullOrUndefined(_this.viewOptions.getSelectionBarColor)) {
                tick.style['background-color'] = _this.getSelectionBarColor();
            }
            if (!tick.selected && !ValueHelper.isNullOrUndefined(_this.viewOptions.getTickColor)) {
                tick.style['background-color'] = _this.getTickColor(value);
            }
            if (!ValueHelper.isNullOrUndefined(_this.viewOptions.ticksTooltip)) {
                tick.tooltip = _this.viewOptions.ticksTooltip(value);
                tick.tooltipPlacement = _this.viewOptions.vertical ? 'right' : 'top';
            }
            if (_this.viewOptions.showTicksValues && (value % _this.viewOptions.tickValueStep === 0)) {
                tick.value = _this.getDisplayValue(value, LabelType.TickValue);
                if (!ValueHelper.isNullOrUndefined(_this.viewOptions.ticksValuesTooltip)) {
                    tick.valueTooltip = _this.viewOptions.ticksValuesTooltip(value);
                    tick.valueTooltipPlacement = _this.viewOptions.vertical
                        ? 'right'
                        : 'top';
                }
            }
            if (!ValueHelper.isNullOrUndefined(_this.viewOptions.getLegend)) {
                var legend = _this.viewOptions.getLegend(value);
                if (!ValueHelper.isNullOrUndefined(legend)) {
                    tick.legend = legend;
                }
            }
            return tick;
        });
        if (!ValueHelper.isNullOrUndefined(this.ticks) && this.ticks.length === newTicks.length) {
            for (var i = 0; i < newTicks.length; ++i) {
                Object.assign(this.ticks[i], newTicks[i]);
            }
        }
        else {
            this.ticks = newTicks;
        }
        if (!this.isRefDestroyed()) {
            this.changeDetectionRef.detectChanges();
        }
    };
    SliderComponent.prototype.getTicksArray = function () {
        var step = (!ValueHelper.isNullOrUndefined(this.viewOptions.tickStep)) ? this.viewOptions.tickStep : this.viewOptions.step;
        var ticksArray = [];
        for (var value = this.viewOptions.floor; value <= this.viewOptions.ceil; value += step) {
            ticksArray.push(value);
        }
        return ticksArray;
    };
    SliderComponent.prototype.isTickSelected = function (value) {
        if (!this.range) {
            if (!ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue)) {
                var center = this.viewOptions.showSelectionBarFromValue;
                if (this.viewLowValue > center &&
                    value >= center &&
                    value <= this.viewLowValue) {
                    return true;
                }
                else if (this.viewLowValue < center &&
                    value <= center &&
                    value >= this.viewLowValue) {
                    return true;
                }
            }
            else if (this.viewOptions.showSelectionBarEnd) {
                if (value >= this.viewLowValue) {
                    return true;
                }
            }
            else if (this.viewOptions.showSelectionBar && value <= this.viewLowValue) {
                return true;
            }
        }
        if (this.range && value >= this.viewLowValue && value <= this.viewHighValue) {
            return true;
        }
        return false;
    };
    SliderComponent.prototype.updateFloorLabel = function () {
        if (!this.floorLabelElement.alwaysHide) {
            this.floorLabelElement.setValue(this.getDisplayValue(this.viewOptions.floor, LabelType.Floor));
            this.floorLabelElement.calculateDimension();
            var position = this.viewOptions.rightToLeft
                ? this.fullBarElement.dimension - this.floorLabelElement.dimension
                : 0;
            this.floorLabelElement.setPosition(position);
        }
    };
    SliderComponent.prototype.updateCeilLabel = function () {
        if (!this.ceilLabelElement.alwaysHide) {
            this.ceilLabelElement.setValue(this.getDisplayValue(this.viewOptions.ceil, LabelType.Ceil));
            this.ceilLabelElement.calculateDimension();
            var position = this.viewOptions.rightToLeft
                ? 0
                : this.fullBarElement.dimension - this.ceilLabelElement.dimension;
            this.ceilLabelElement.setPosition(position);
        }
    };
    SliderComponent.prototype.updateHandles = function (which, newPos) {
        if (which === PointerType.Min) {
            this.updateLowHandle(newPos);
        }
        else if (which === PointerType.Max) {
            this.updateHighHandle(newPos);
        }
        this.updateSelectionBar();
        this.updateTicksScale();
        if (this.range) {
            this.updateCombinedLabel();
        }
    };
    SliderComponent.prototype.getHandleLabelPos = function (labelType, newPos) {
        var labelDimension = (labelType === PointerType.Min)
            ? this.minHandleLabelElement.dimension
            : this.maxHandleLabelElement.dimension;
        var nearHandlePos = newPos - labelDimension / 2 + this.handleHalfDimension;
        var endOfBarPos = this.fullBarElement.dimension - labelDimension;
        if (!this.viewOptions.boundPointerLabels) {
            return nearHandlePos;
        }
        if ((this.viewOptions.rightToLeft && labelType === PointerType.Min) ||
            (!this.viewOptions.rightToLeft && labelType === PointerType.Max)) {
            return Math.min(nearHandlePos, endOfBarPos);
        }
        else {
            return Math.min(Math.max(nearHandlePos, 0), endOfBarPos);
        }
    };
    SliderComponent.prototype.updateLowHandle = function (newPos) {
        this.minHandleElement.setPosition(newPos);
        this.minHandleLabelElement.setValue(this.getDisplayValue(this.viewLowValue, LabelType.Low));
        this.minHandleLabelElement.setPosition(this.getHandleLabelPos(PointerType.Min, newPos));
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.getPointerColor)) {
            this.minPointerStyle = {
                backgroundColor: this.getPointerColor(PointerType.Min),
            };
        }
        if (this.viewOptions.autoHideLimitLabels) {
            this.updateFloorAndCeilLabelsVisibility();
        }
    };
    SliderComponent.prototype.updateHighHandle = function (newPos) {
        this.maxHandleElement.setPosition(newPos);
        this.maxHandleLabelElement.setValue(this.getDisplayValue(this.viewHighValue, LabelType.High));
        this.maxHandleLabelElement.setPosition(this.getHandleLabelPos(PointerType.Max, newPos));
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.getPointerColor)) {
            this.maxPointerStyle = {
                backgroundColor: this.getPointerColor(PointerType.Max),
            };
        }
        if (this.viewOptions.autoHideLimitLabels) {
            this.updateFloorAndCeilLabelsVisibility();
        }
    };
    SliderComponent.prototype.updateFloorAndCeilLabelsVisibility = function () {
        if (this.viewOptions.hidePointerLabels) {
            return;
        }
        var floorLabelHidden = false;
        var ceilLabelHidden = false;
        var isMinLabelAtFloor = this.isLabelBelowFloorLabel(this.minHandleLabelElement);
        var isMinLabelAtCeil = this.isLabelAboveCeilLabel(this.minHandleLabelElement);
        var isMaxLabelAtCeil = this.isLabelAboveCeilLabel(this.maxHandleLabelElement);
        var isCombinedLabelAtFloor = this.isLabelBelowFloorLabel(this.combinedLabelElement);
        var isCombinedLabelAtCeil = this.isLabelAboveCeilLabel(this.combinedLabelElement);
        if (isMinLabelAtFloor) {
            floorLabelHidden = true;
            this.floorLabelElement.hide();
        }
        else {
            floorLabelHidden = false;
            this.floorLabelElement.show();
        }
        if (isMinLabelAtCeil) {
            ceilLabelHidden = true;
            this.ceilLabelElement.hide();
        }
        else {
            ceilLabelHidden = false;
            this.ceilLabelElement.show();
        }
        if (this.range) {
            var hideCeil = this.combinedLabelElement.isVisible() ? isCombinedLabelAtCeil : isMaxLabelAtCeil;
            var hideFloor = this.combinedLabelElement.isVisible() ? isCombinedLabelAtFloor : isMinLabelAtFloor;
            if (hideCeil) {
                this.ceilLabelElement.hide();
            }
            else if (!ceilLabelHidden) {
                this.ceilLabelElement.show();
            }
            if (hideFloor) {
                this.floorLabelElement.hide();
            }
            else if (!floorLabelHidden) {
                this.floorLabelElement.show();
            }
        }
    };
    SliderComponent.prototype.isLabelBelowFloorLabel = function (label) {
        var pos = label.position;
        var dim = label.dimension;
        var floorPos = this.floorLabelElement.position;
        var floorDim = this.floorLabelElement.dimension;
        return this.viewOptions.rightToLeft
            ? pos + dim >= floorPos - 2
            : pos <= floorPos + floorDim + 2;
    };
    SliderComponent.prototype.isLabelAboveCeilLabel = function (label) {
        var pos = label.position;
        var dim = label.dimension;
        var ceilPos = this.ceilLabelElement.position;
        var ceilDim = this.ceilLabelElement.dimension;
        return this.viewOptions.rightToLeft
            ? pos <= ceilPos + ceilDim + 2
            : pos + dim >= ceilPos - 2;
    };
    SliderComponent.prototype.updateSelectionBar = function () {
        var position = 0;
        var dimension = 0;
        var isSelectionBarFromRight = this.viewOptions.rightToLeft
            ? !this.viewOptions.showSelectionBarEnd
            : this.viewOptions.showSelectionBarEnd;
        var positionForRange = this.viewOptions.rightToLeft
            ? this.maxHandleElement.position + this.handleHalfDimension
            : this.minHandleElement.position + this.handleHalfDimension;
        if (this.range) {
            dimension = Math.abs(this.maxHandleElement.position - this.minHandleElement.position);
            position = positionForRange;
        }
        else {
            if (!ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue)) {
                var center = this.viewOptions.showSelectionBarFromValue;
                var centerPosition = this.valueToPosition(center);
                var isModelGreaterThanCenter = this.viewOptions.rightToLeft
                    ? this.viewLowValue <= center
                    : this.viewLowValue > center;
                if (isModelGreaterThanCenter) {
                    dimension = this.minHandleElement.position - centerPosition;
                    position = centerPosition + this.handleHalfDimension;
                }
                else {
                    dimension = centerPosition - this.minHandleElement.position;
                    position = this.minHandleElement.position + this.handleHalfDimension;
                }
            }
            else if (isSelectionBarFromRight) {
                dimension = Math.ceil(Math.abs(this.maxHandlePosition - this.minHandleElement.position) + this.handleHalfDimension);
                position = Math.floor(this.minHandleElement.position + this.handleHalfDimension);
            }
            else {
                dimension = this.minHandleElement.position + this.handleHalfDimension;
                position = 0;
            }
        }
        this.selectionBarElement.setDimension(dimension);
        this.selectionBarElement.setPosition(position);
        if (this.range && this.viewOptions.showOuterSelectionBars) {
            if (this.viewOptions.rightToLeft) {
                this.rightOuterSelectionBarElement.setDimension(position);
                this.rightOuterSelectionBarElement.setPosition(0);
                this.fullBarElement.calculateDimension();
                this.leftOuterSelectionBarElement.setDimension(this.fullBarElement.dimension - (position + dimension));
                this.leftOuterSelectionBarElement.setPosition(position + dimension);
            }
            else {
                this.leftOuterSelectionBarElement.setDimension(position);
                this.leftOuterSelectionBarElement.setPosition(0);
                this.fullBarElement.calculateDimension();
                this.rightOuterSelectionBarElement.setDimension(this.fullBarElement.dimension - (position + dimension));
                this.rightOuterSelectionBarElement.setPosition(position + dimension);
            }
        }
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.getSelectionBarColor)) {
            var color = this.getSelectionBarColor();
            this.barStyle = {
                backgroundColor: color,
            };
        }
        else if (!ValueHelper.isNullOrUndefined(this.viewOptions.selectionBarGradient)) {
            var offset = (!ValueHelper.isNullOrUndefined(this.viewOptions.showSelectionBarFromValue))
                ? this.valueToPosition(this.viewOptions.showSelectionBarFromValue)
                : 0;
            var reversed = (offset - position > 0 && !isSelectionBarFromRight) || (offset - position <= 0 && isSelectionBarFromRight);
            var direction = this.viewOptions.vertical
                ? reversed ? 'bottom' : 'top'
                : reversed ? 'left' : 'right';
            this.barStyle = {
                backgroundImage: 'linear-gradient(to ' +
                    direction +
                    ', ' +
                    this.viewOptions.selectionBarGradient.from +
                    ' 0%,' +
                    this.viewOptions.selectionBarGradient.to +
                    ' 100%)',
            };
            if (this.viewOptions.vertical) {
                this.barStyle.backgroundPosition =
                    'center ' +
                        (offset +
                            dimension +
                            position +
                            (reversed ? -this.handleHalfDimension : 0)) +
                        'px';
                this.barStyle.backgroundSize =
                    '100% ' + (this.fullBarElement.dimension - this.handleHalfDimension) + 'px';
            }
            else {
                this.barStyle.backgroundPosition =
                    offset -
                        position +
                        (reversed ? this.handleHalfDimension : 0) +
                        'px center';
                this.barStyle.backgroundSize =
                    this.fullBarElement.dimension - this.handleHalfDimension + 'px 100%';
            }
        }
    };
    SliderComponent.prototype.getSelectionBarColor = function () {
        if (this.range) {
            return this.viewOptions.getSelectionBarColor(this.value, this.highValue);
        }
        return this.viewOptions.getSelectionBarColor(this.value);
    };
    SliderComponent.prototype.getPointerColor = function (pointerType) {
        if (pointerType === PointerType.Max) {
            return this.viewOptions.getPointerColor(this.highValue, pointerType);
        }
        return this.viewOptions.getPointerColor(this.value, pointerType);
    };
    SliderComponent.prototype.getTickColor = function (value) {
        return this.viewOptions.getTickColor(value);
    };
    SliderComponent.prototype.updateCombinedLabel = function () {
        var isLabelOverlap = null;
        if (this.viewOptions.rightToLeft) {
            isLabelOverlap =
                this.minHandleLabelElement.position - this.minHandleLabelElement.dimension - 10 <= this.maxHandleLabelElement.position;
        }
        else {
            isLabelOverlap =
                this.minHandleLabelElement.position + this.minHandleLabelElement.dimension + 10 >= this.maxHandleLabelElement.position;
        }
        if (isLabelOverlap) {
            var lowDisplayValue = this.getDisplayValue(this.viewLowValue, LabelType.Low);
            var highDisplayValue = this.getDisplayValue(this.viewHighValue, LabelType.High);
            var combinedLabelValue = this.viewOptions.rightToLeft
                ? this.viewOptions.combineLabels(highDisplayValue, lowDisplayValue)
                : this.viewOptions.combineLabels(lowDisplayValue, highDisplayValue);
            this.combinedLabelElement.setValue(combinedLabelValue);
            var pos = this.viewOptions.boundPointerLabels
                ? Math.min(Math.max(this.selectionBarElement.position +
                    this.selectionBarElement.dimension / 2 -
                    this.combinedLabelElement.dimension / 2, 0), this.fullBarElement.dimension - this.combinedLabelElement.dimension)
                : this.selectionBarElement.position + this.selectionBarElement.dimension / 2 - this.combinedLabelElement.dimension / 2;
            this.combinedLabelElement.setPosition(pos);
            this.minHandleLabelElement.hide();
            this.maxHandleLabelElement.hide();
            this.combinedLabelElement.show();
        }
        else {
            this.updateHighHandle(this.valueToPosition(this.viewHighValue));
            this.updateLowHandle(this.valueToPosition(this.viewLowValue));
            this.maxHandleLabelElement.show();
            this.minHandleLabelElement.show();
            this.combinedLabelElement.hide();
        }
        if (this.viewOptions.autoHideLimitLabels) {
            this.updateFloorAndCeilLabelsVisibility();
        }
    };
    SliderComponent.prototype.getDisplayValue = function (value, which) {
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.stepsArray) && !this.viewOptions.bindIndexForStepsArray) {
            value = this.getStepValue(value);
        }
        return this.viewOptions.translate(value, which);
    };
    SliderComponent.prototype.roundStep = function (value, customStep) {
        var step = !ValueHelper.isNullOrUndefined(customStep) ? customStep : this.viewOptions.step;
        var steppedDifference = MathHelper.roundToPrecisionLimit((value - this.viewOptions.floor) / step, this.viewOptions.precisionLimit);
        steppedDifference = Math.round(steppedDifference) * step;
        return MathHelper.roundToPrecisionLimit(this.viewOptions.floor + steppedDifference, this.viewOptions.precisionLimit);
    };
    SliderComponent.prototype.valueToPosition = function (val) {
        var fn = ValueHelper.linearValueToPosition;
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.customValueToPosition)) {
            fn = this.viewOptions.customValueToPosition;
        }
        else if (this.viewOptions.logScale) {
            fn = ValueHelper.logValueToPosition;
        }
        val = MathHelper.clampToRange(val, this.viewOptions.floor, this.viewOptions.ceil);
        var percent = fn(val, this.viewOptions.floor, this.viewOptions.ceil);
        if (ValueHelper.isNullOrUndefined(percent)) {
            percent = 0;
        }
        if (this.viewOptions.rightToLeft) {
            percent = 1 - percent;
        }
        return percent * this.maxHandlePosition;
    };
    SliderComponent.prototype.positionToValue = function (position) {
        var percent = position / this.maxHandlePosition;
        if (this.viewOptions.rightToLeft) {
            percent = 1 - percent;
        }
        var fn = ValueHelper.linearPositionToValue;
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.customPositionToValue)) {
            fn = this.viewOptions.customPositionToValue;
        }
        else if (this.viewOptions.logScale) {
            fn = ValueHelper.logPositionToValue;
        }
        var value = fn(percent, this.viewOptions.floor, this.viewOptions.ceil);
        return !ValueHelper.isNullOrUndefined(value) ? value : 0;
    };
    SliderComponent.prototype.getEventXY = function (event, targetTouchId) {
        if (event instanceof MouseEvent) {
            return this.viewOptions.vertical ? event.clientY : event.clientX;
        }
        var touchIndex = 0;
        var touches = event.touches;
        if (!ValueHelper.isNullOrUndefined(targetTouchId)) {
            for (var i = 0; i < touches.length; i++) {
                if (touches[i].identifier === targetTouchId) {
                    touchIndex = i;
                    break;
                }
            }
        }
        return this.viewOptions.vertical ? touches[touchIndex].clientY : touches[touchIndex].clientX;
    };
    SliderComponent.prototype.getEventPosition = function (event, targetTouchId) {
        var sliderElementBoundingRect = this.elementRef.nativeElement.getBoundingClientRect();
        var sliderPos = this.viewOptions.vertical ?
            sliderElementBoundingRect.bottom : sliderElementBoundingRect.left;
        var eventPos = 0;
        if (this.viewOptions.vertical) {
            eventPos = -this.getEventXY(event, targetTouchId) + sliderPos;
        }
        else {
            eventPos = this.getEventXY(event, targetTouchId) - sliderPos;
        }
        return eventPos * this.viewOptions.scale - this.handleHalfDimension;
    };
    SliderComponent.prototype.getNearestHandle = function (event) {
        if (!this.range) {
            return PointerType.Min;
        }
        var position = this.getEventPosition(event);
        var distanceMin = Math.abs(position - this.minHandleElement.position);
        var distanceMax = Math.abs(position - this.maxHandleElement.position);
        if (distanceMin < distanceMax) {
            return PointerType.Min;
        }
        else if (distanceMin > distanceMax) {
            return PointerType.Max;
        }
        else if (!this.viewOptions.rightToLeft) {
            return position < this.minHandleElement.position ? PointerType.Min : PointerType.Max;
        }
        return position > this.minHandleElement.position ? PointerType.Min : PointerType.Max;
    };
    SliderComponent.prototype.bindEvents = function () {
        var _this = this;
        var draggableRange = this.viewOptions.draggableRange;
        if (!this.viewOptions.onlyBindHandles) {
            this.selectionBarElement.on('mousedown', function (event) { return _this.onBarStart(null, draggableRange, event, true, true, true); });
        }
        if (this.viewOptions.draggableRangeOnly) {
            this.minHandleElement.on('mousedown', function (event) { return _this.onBarStart(PointerType.Min, draggableRange, event, true, true); });
            this.maxHandleElement.on('mousedown', function (event) { return _this.onBarStart(PointerType.Max, draggableRange, event, true, true); });
        }
        else {
            this.minHandleElement.on('mousedown', function (event) { return _this.onStart(PointerType.Min, event, true, true); });
            if (this.range) {
                this.maxHandleElement.on('mousedown', function (event) { return _this.onStart(PointerType.Max, event, true, true); });
            }
            if (!this.viewOptions.onlyBindHandles) {
                this.fullBarElement.on('mousedown', function (event) { return _this.onStart(null, event, true, true, true); });
                this.ticksElement.on('mousedown', function (event) { return _this.onStart(null, event, true, true, true, true); });
            }
        }
        if (!this.viewOptions.onlyBindHandles) {
            this.selectionBarElement.onPassive('touchstart', function (event) { return _this.onBarStart(null, draggableRange, event, true, true, true); });
        }
        if (this.viewOptions.draggableRangeOnly) {
            this.minHandleElement.onPassive('touchstart', function (event) { return _this.onBarStart(PointerType.Min, draggableRange, event, true, true); });
            this.maxHandleElement.onPassive('touchstart', function (event) { return _this.onBarStart(PointerType.Max, draggableRange, event, true, true); });
        }
        else {
            this.minHandleElement.onPassive('touchstart', function (event) { return _this.onStart(PointerType.Min, event, true, true); });
            if (this.range) {
                this.maxHandleElement.onPassive('touchstart', function (event) { return _this.onStart(PointerType.Max, event, true, true); });
            }
            if (!this.viewOptions.onlyBindHandles) {
                this.fullBarElement.onPassive('touchstart', function (event) { return _this.onStart(null, event, true, true, true); });
                this.ticksElement.onPassive('touchstart', function (event) { return _this.onStart(null, event, false, false, true, true); });
            }
        }
        if (this.viewOptions.keyboardSupport) {
            this.minHandleElement.on('focus', function () { return _this.onPointerFocus(PointerType.Min); });
            if (this.range) {
                this.maxHandleElement.on('focus', function () { return _this.onPointerFocus(PointerType.Max); });
            }
        }
    };
    SliderComponent.prototype.unbindEvents = function () {
        this.unsubscribeOnMove();
        this.unsubscribeOnEnd();
        try {
            for (var _a = __values(this.getAllSliderElements()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var element = _b.value;
                if (!ValueHelper.isNullOrUndefined(element)) {
                    element.off();
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_4) throw e_4.error; }
        }
        var e_4, _c;
    };
    SliderComponent.prototype.onBarStart = function (pointerType, draggableRange, event, bindMove, bindEnd, simulateImmediateMove, simulateImmediateEnd) {
        if (draggableRange) {
            this.onDragStart(pointerType, event, bindMove, bindEnd);
        }
        else {
            this.onStart(pointerType, event, bindMove, bindEnd, simulateImmediateMove, simulateImmediateEnd);
        }
    };
    SliderComponent.prototype.onStart = function (pointerType, event, bindMove, bindEnd, simulateImmediateMove, simulateImmediateEnd) {
        var _this = this;
        event.stopPropagation();
        if (!CompatibilityHelper.isTouchEvent(event) || !detectPassiveEvents.hasSupport) {
            event.preventDefault();
        }
        this.calculateViewDimensions();
        if (ValueHelper.isNullOrUndefined(pointerType)) {
            pointerType = this.getNearestHandle(event);
        }
        this.currentTrackingPointer = pointerType;
        var pointerElement = this.getPointerElement(pointerType);
        pointerElement.active = true;
        if (this.viewOptions.keyboardSupport) {
            pointerElement.focus();
        }
        if (bindMove) {
            this.unsubscribeOnMove();
            var onMoveCallback = function (e) { return _this.dragging.active ? _this.onDragMove(e) : _this.onMove(e); };
            if (CompatibilityHelper.isTouchEvent(event)) {
                this.onMoveEventListener = this.eventListenerHelper.attachPassiveEventListener(document, 'touchmove', onMoveCallback, this.viewOptions.touchEventsInterval);
            }
            else {
                this.onMoveEventListener = this.eventListenerHelper.attachEventListener(document, 'mousemove', onMoveCallback, this.viewOptions.mouseEventsInterval);
            }
        }
        if (bindEnd) {
            this.unsubscribeOnEnd();
            var onEndCallback = function (e) { return _this.onEnd(e); };
            if (CompatibilityHelper.isTouchEvent(event)) {
                this.onEndEventListener = this.eventListenerHelper.attachPassiveEventListener(document, 'touchend', onEndCallback);
            }
            else {
                this.onEndEventListener = this.eventListenerHelper.attachEventListener(document, 'mouseup', onEndCallback);
            }
        }
        this.userChangeStart.emit(this.getChangeContext());
        if (CompatibilityHelper.isTouchEvent(event) && !ValueHelper.isNullOrUndefined(((event)).changedTouches)) {
            if (ValueHelper.isNullOrUndefined(this.touchId)) {
                this.touchId = ((event)).changedTouches[0].identifier;
            }
        }
        if (simulateImmediateMove) {
            this.onMove(event, true);
        }
        if (simulateImmediateEnd) {
            this.onEnd(event);
        }
    };
    SliderComponent.prototype.onMove = function (event, fromTick) {
        var touchForThisSlider = null;
        if (CompatibilityHelper.isTouchEvent(event)) {
            var changedTouches = ((event)).changedTouches;
            for (var i = 0; i < changedTouches.length; i++) {
                if (changedTouches[i].identifier === this.touchId) {
                    touchForThisSlider = changedTouches[i];
                    break;
                }
            }
            if (ValueHelper.isNullOrUndefined(touchForThisSlider)) {
                return;
            }
        }
        var newPos = !ValueHelper.isNullOrUndefined(touchForThisSlider)
            ? this.getEventPosition(event, touchForThisSlider.identifier)
            : this.getEventPosition(event);
        var newValue;
        var ceilValue = this.viewOptions.rightToLeft
            ? this.viewOptions.floor
            : this.viewOptions.ceil;
        var floorValue = this.viewOptions.rightToLeft ? this.viewOptions.ceil : this.viewOptions.floor;
        if (newPos <= 0) {
            newValue = floorValue;
        }
        else if (newPos >= this.maxHandlePosition) {
            newValue = ceilValue;
        }
        else {
            newValue = this.positionToValue(newPos);
            if (fromTick && !ValueHelper.isNullOrUndefined(this.viewOptions.tickStep)) {
                newValue = this.roundStep(newValue, this.viewOptions.tickStep);
            }
            else {
                newValue = this.roundStep(newValue);
            }
        }
        this.positionTrackingHandle(newValue);
    };
    SliderComponent.prototype.onEnd = function (event) {
        if (CompatibilityHelper.isTouchEvent(event)) {
            var changedTouches = ((event)).changedTouches;
            if (changedTouches[0].identifier !== this.touchId) {
                return;
            }
        }
        this.touchId = null;
        if (!this.viewOptions.keyboardSupport) {
            this.minHandleElement.active = false;
            this.maxHandleElement.active = false;
            this.currentTrackingPointer = null;
        }
        this.dragging.active = false;
        this.unsubscribeOnMove();
        this.unsubscribeOnEnd();
        this.userChangeEnd.emit(this.getChangeContext());
    };
    SliderComponent.prototype.onPointerFocus = function (pointerType) {
        var _this = this;
        var pointerElement = this.getPointerElement(pointerType);
        pointerElement.on('blur', function () { return _this.onPointerBlur(pointerElement); });
        pointerElement.on('keydown', function (event) { return _this.onKeyboardEvent(event); });
        pointerElement.on('keyup', function () { return _this.onKeyUp(); });
        pointerElement.active = true;
        this.currentTrackingPointer = pointerType;
        this.currentFocusPointer = pointerType;
        this.firstKeyDown = true;
    };
    SliderComponent.prototype.onKeyUp = function () {
        this.firstKeyDown = true;
        this.userChangeEnd.emit(this.getChangeContext());
    };
    SliderComponent.prototype.onPointerBlur = function (pointer) {
        pointer.off('blur');
        pointer.off('keydown');
        pointer.off('keyup');
        pointer.active = false;
        if (ValueHelper.isNullOrUndefined(this.touchId)) {
            this.currentTrackingPointer = null;
            this.currentFocusPointer = null;
        }
    };
    SliderComponent.prototype.getKeyActions = function (currentValue) {
        var valueRange = this.viewOptions.ceil - this.viewOptions.floor;
        var increaseStep = currentValue + this.viewOptions.step;
        var decreaseStep = currentValue - this.viewOptions.step;
        var increasePage = currentValue + valueRange / 10;
        var decreasePage = currentValue - valueRange / 10;
        if (this.viewOptions.reversedControls) {
            increaseStep = currentValue - this.viewOptions.step;
            decreaseStep = currentValue + this.viewOptions.step;
            increasePage = currentValue - valueRange / 10;
            decreasePage = currentValue + valueRange / 10;
        }
        var actions = {
            UP: increaseStep,
            DOWN: decreaseStep,
            LEFT: decreaseStep,
            RIGHT: increaseStep,
            PAGEUP: increasePage,
            PAGEDOWN: decreasePage,
            HOME: this.viewOptions.reversedControls ? this.viewOptions.ceil : this.viewOptions.floor,
            END: this.viewOptions.reversedControls ? this.viewOptions.floor : this.viewOptions.ceil,
        };
        if (this.viewOptions.rightToLeft) {
            actions["LEFT"] = increaseStep;
            actions["RIGHT"] = decreaseStep;
            if (this.viewOptions.vertical) {
                actions["UP"] = decreaseStep;
                actions["DOWN"] = increaseStep;
            }
        }
        return actions;
    };
    SliderComponent.prototype.onKeyboardEvent = function (event) {
        var currentValue = this.getCurrentTrackingValue();
        var keyCode = !ValueHelper.isNullOrUndefined(event.keyCode)
            ? event.keyCode
            : event.which;
        var keys = {
            38: 'UP',
            40: 'DOWN',
            37: 'LEFT',
            39: 'RIGHT',
            33: 'PAGEUP',
            34: 'PAGEDOWN',
            36: 'HOME',
            35: 'END',
        };
        var actions = this.getKeyActions(currentValue);
        var key = keys[keyCode];
        var action = actions[key];
        if (ValueHelper.isNullOrUndefined(action) || ValueHelper.isNullOrUndefined(this.currentTrackingPointer)) {
            return;
        }
        event.preventDefault();
        if (this.firstKeyDown) {
            this.firstKeyDown = false;
            this.userChangeStart.emit(this.getChangeContext());
        }
        var actionValue = MathHelper.clampToRange(action, this.viewOptions.floor, this.viewOptions.ceil);
        var newValue = this.roundStep(actionValue);
        if (!this.viewOptions.draggableRangeOnly) {
            this.positionTrackingHandle(newValue);
        }
        else {
            var difference = this.viewHighValue - this.viewLowValue;
            var newMinValue = void 0;
            var newMaxValue = void 0;
            if (this.currentTrackingPointer === PointerType.Min) {
                newMinValue = newValue;
                newMaxValue = newValue + difference;
                if (newMaxValue > this.viewOptions.ceil) {
                    newMaxValue = this.viewOptions.ceil;
                    newMinValue = newMaxValue - difference;
                }
            }
            else if (this.currentTrackingPointer === PointerType.Max) {
                newMaxValue = newValue;
                newMinValue = newValue - difference;
                if (newMinValue < this.viewOptions.floor) {
                    newMinValue = this.viewOptions.floor;
                    newMaxValue = newMinValue + difference;
                }
            }
            this.positionTrackingBar(newMinValue, newMaxValue);
        }
    };
    SliderComponent.prototype.onDragStart = function (pointerType, event, bindMove, bindEnd) {
        var position = this.getEventPosition(event);
        this.dragging = new Dragging();
        this.dragging.active = true;
        this.dragging.value = this.positionToValue(position);
        this.dragging.difference = this.viewHighValue - this.viewLowValue;
        this.dragging.lowLimit = this.viewOptions.rightToLeft
            ? this.minHandleElement.position - position
            : position - this.minHandleElement.position;
        this.dragging.highLimit = this.viewOptions.rightToLeft
            ? position - this.maxHandleElement.position
            : this.maxHandleElement.position - position;
        this.onStart(pointerType, event, bindMove, bindEnd);
    };
    SliderComponent.prototype.getMinValue = function (newPos, outOfBounds, isAbove) {
        var isRTL = this.viewOptions.rightToLeft;
        var value = null;
        if (outOfBounds) {
            if (isAbove) {
                value = isRTL
                    ? this.viewOptions.floor
                    : this.viewOptions.ceil - this.dragging.difference;
            }
            else {
                value = isRTL
                    ? this.viewOptions.ceil - this.dragging.difference
                    : this.viewOptions.floor;
            }
        }
        else {
            value = isRTL
                ? this.positionToValue(newPos + this.dragging.lowLimit)
                : this.positionToValue(newPos - this.dragging.lowLimit);
        }
        return this.roundStep(value);
    };
    SliderComponent.prototype.getMaxValue = function (newPos, outOfBounds, isAbove) {
        var isRTL = this.viewOptions.rightToLeft;
        var value = null;
        if (outOfBounds) {
            if (isAbove) {
                value = isRTL
                    ? this.viewOptions.floor + this.dragging.difference
                    : this.viewOptions.ceil;
            }
            else {
                value = isRTL
                    ? this.viewOptions.ceil
                    : this.viewOptions.floor + this.dragging.difference;
            }
        }
        else {
            if (isRTL) {
                value =
                    this.positionToValue(newPos + this.dragging.lowLimit) +
                        this.dragging.difference;
            }
            else {
                value =
                    this.positionToValue(newPos - this.dragging.lowLimit) +
                        this.dragging.difference;
            }
        }
        return this.roundStep(value);
    };
    SliderComponent.prototype.onDragMove = function (event) {
        var newPos = this.getEventPosition(event);
        var ceilLimit, floorLimit, floorHandleElement, ceilHandleElement;
        if (this.viewOptions.rightToLeft) {
            ceilLimit = this.dragging.lowLimit;
            floorLimit = this.dragging.highLimit;
            floorHandleElement = this.maxHandleElement;
            ceilHandleElement = this.minHandleElement;
        }
        else {
            ceilLimit = this.dragging.highLimit;
            floorLimit = this.dragging.lowLimit;
            floorHandleElement = this.minHandleElement;
            ceilHandleElement = this.maxHandleElement;
        }
        var isUnderFloorLimit = (newPos <= floorLimit);
        var isOverCeilLimit = (newPos >= this.maxHandlePosition - ceilLimit);
        var newMinValue;
        var newMaxValue;
        if (isUnderFloorLimit) {
            if (floorHandleElement.position === 0) {
                return;
            }
            newMinValue = this.getMinValue(newPos, true, false);
            newMaxValue = this.getMaxValue(newPos, true, false);
        }
        else if (isOverCeilLimit) {
            if (ceilHandleElement.position === this.maxHandlePosition) {
                return;
            }
            newMaxValue = this.getMaxValue(newPos, true, true);
            newMinValue = this.getMinValue(newPos, true, true);
        }
        else {
            newMinValue = this.getMinValue(newPos, false, false);
            newMaxValue = this.getMaxValue(newPos, false, false);
        }
        this.positionTrackingBar(newMinValue, newMaxValue);
    };
    SliderComponent.prototype.positionTrackingBar = function (newMinValue, newMaxValue) {
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.minLimit) &&
            newMinValue < this.viewOptions.minLimit) {
            newMinValue = this.viewOptions.minLimit;
            newMaxValue = MathHelper.roundToPrecisionLimit(newMinValue + this.dragging.difference, this.viewOptions.precisionLimit);
        }
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.maxLimit) &&
            newMaxValue > this.viewOptions.maxLimit) {
            newMaxValue = this.viewOptions.maxLimit;
            newMinValue = MathHelper.roundToPrecisionLimit(newMaxValue - this.dragging.difference, this.viewOptions.precisionLimit);
        }
        this.viewLowValue = newMinValue;
        this.viewHighValue = newMaxValue;
        this.applyViewChange();
        this.updateHandles(PointerType.Min, this.valueToPosition(newMinValue));
        this.updateHandles(PointerType.Max, this.valueToPosition(newMaxValue));
    };
    SliderComponent.prototype.positionTrackingHandle = function (newValue) {
        newValue = this.applyMinMaxLimit(newValue);
        if (this.range) {
            if (this.viewOptions.pushRange) {
                newValue = this.applyPushRange(newValue);
            }
            else {
                if (this.viewOptions.noSwitching) {
                    if (this.currentTrackingPointer === PointerType.Min &&
                        newValue > this.viewHighValue) {
                        newValue = this.applyMinMaxRange(this.viewHighValue);
                    }
                    else if (this.currentTrackingPointer === PointerType.Max &&
                        newValue < this.viewLowValue) {
                        newValue = this.applyMinMaxRange(this.viewLowValue);
                    }
                }
                newValue = this.applyMinMaxRange(newValue);
                if (this.currentTrackingPointer === PointerType.Min && newValue > this.viewHighValue) {
                    this.viewLowValue = this.viewHighValue;
                    this.applyViewChange();
                    this.updateHandles(PointerType.Min, this.maxHandleElement.position);
                    this.updateAriaAttributes();
                    this.currentTrackingPointer = PointerType.Max;
                    this.minHandleElement.active = false;
                    this.maxHandleElement.active = true;
                    if (this.viewOptions.keyboardSupport) {
                        this.maxHandleElement.focus();
                    }
                }
                else if (this.currentTrackingPointer === PointerType.Max &&
                    newValue < this.viewLowValue) {
                    this.viewHighValue = this.viewLowValue;
                    this.applyViewChange();
                    this.updateHandles(PointerType.Max, this.minHandleElement.position);
                    this.updateAriaAttributes();
                    this.currentTrackingPointer = PointerType.Min;
                    this.maxHandleElement.active = false;
                    this.minHandleElement.active = true;
                    if (this.viewOptions.keyboardSupport) {
                        this.minHandleElement.focus();
                    }
                }
            }
        }
        if (this.getCurrentTrackingValue() !== newValue) {
            if (this.currentTrackingPointer === PointerType.Min) {
                this.viewLowValue = newValue;
                this.applyViewChange();
            }
            else if (this.currentTrackingPointer === PointerType.Max) {
                this.viewHighValue = newValue;
                this.applyViewChange();
            }
            this.updateHandles(this.currentTrackingPointer, this.valueToPosition(newValue));
            this.updateAriaAttributes();
        }
    };
    SliderComponent.prototype.applyMinMaxLimit = function (newValue) {
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.minLimit) && newValue < this.viewOptions.minLimit) {
            return this.viewOptions.minLimit;
        }
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.maxLimit) && newValue > this.viewOptions.maxLimit) {
            return this.viewOptions.maxLimit;
        }
        return newValue;
    };
    SliderComponent.prototype.applyMinMaxRange = function (newValue) {
        var oppositeValue = (this.currentTrackingPointer === PointerType.Min)
            ? this.viewHighValue
            : this.viewLowValue;
        var difference = Math.abs(newValue - oppositeValue);
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.minRange)) {
            if (difference < this.viewOptions.minRange) {
                if (this.currentTrackingPointer === PointerType.Min) {
                    return MathHelper.roundToPrecisionLimit(this.viewHighValue - this.viewOptions.minRange, this.viewOptions.precisionLimit);
                }
                else if (this.currentTrackingPointer === PointerType.Max) {
                    return MathHelper.roundToPrecisionLimit(this.viewLowValue + this.viewOptions.minRange, this.viewOptions.precisionLimit);
                }
            }
        }
        if (!ValueHelper.isNullOrUndefined(this.viewOptions.maxRange)) {
            if (difference > this.viewOptions.maxRange) {
                if (this.currentTrackingPointer === PointerType.Min) {
                    return MathHelper.roundToPrecisionLimit(this.viewHighValue - this.viewOptions.maxRange, this.viewOptions.precisionLimit);
                }
                else if (this.currentTrackingPointer === PointerType.Max) {
                    return MathHelper.roundToPrecisionLimit(this.viewLowValue + this.viewOptions.maxRange, this.viewOptions.precisionLimit);
                }
            }
        }
        return newValue;
    };
    SliderComponent.prototype.applyPushRange = function (newValue) {
        var difference = (this.currentTrackingPointer === PointerType.Min)
            ? this.viewHighValue - newValue
            : newValue - this.viewLowValue;
        var minRange = (!ValueHelper.isNullOrUndefined(this.viewOptions.minRange))
            ? this.viewOptions.minRange
            : this.viewOptions.step;
        var maxRange = this.viewOptions.maxRange;
        if (difference < minRange) {
            if (this.currentTrackingPointer === PointerType.Min) {
                this.viewHighValue = MathHelper.roundToPrecisionLimit(Math.min(newValue + minRange, this.viewOptions.ceil), this.viewOptions.precisionLimit);
                newValue = MathHelper.roundToPrecisionLimit(this.viewHighValue - minRange, this.viewOptions.precisionLimit);
                this.applyViewChange();
                this.updateHandles(PointerType.Max, this.valueToPosition(this.viewHighValue));
            }
            else if (this.currentTrackingPointer === PointerType.Max) {
                this.viewLowValue = MathHelper.roundToPrecisionLimit(Math.max(newValue - minRange, this.viewOptions.floor), this.viewOptions.precisionLimit);
                newValue = MathHelper.roundToPrecisionLimit(this.viewLowValue + minRange, this.viewOptions.precisionLimit);
                this.applyViewChange();
                this.updateHandles(PointerType.Min, this.valueToPosition(this.viewLowValue));
            }
            this.updateAriaAttributes();
        }
        else if (!ValueHelper.isNullOrUndefined(maxRange) && difference > maxRange) {
            if (this.currentTrackingPointer === PointerType.Min) {
                this.viewHighValue = MathHelper.roundToPrecisionLimit(newValue + maxRange, this.viewOptions.precisionLimit);
                this.applyViewChange();
                this.updateHandles(PointerType.Max, this.valueToPosition(this.viewHighValue));
            }
            else if (this.currentTrackingPointer === PointerType.Max) {
                this.viewLowValue = MathHelper.roundToPrecisionLimit(newValue - maxRange, this.viewOptions.precisionLimit);
                this.applyViewChange();
                this.updateHandles(PointerType.Min, this.valueToPosition(this.viewLowValue));
            }
            this.updateAriaAttributes();
        }
        return newValue;
    };
    SliderComponent.prototype.getChangeContext = function () {
        var changeContext = new ChangeContext();
        changeContext.pointerType = this.currentTrackingPointer;
        changeContext.value = +this.value;
        if (this.range) {
            changeContext.highValue = +this.highValue;
        }
        return changeContext;
    };
    return SliderComponent;
}());
SliderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng5-slider',
                template: "<!-- // 0 Left selection bar outside two handles -->\n<span ng5SliderElement #leftOuterSelectionBar class=\"ng5-slider-span ng5-slider-bar-wrapper ng5-slider-left-out-selection\">\n  <span class=\"ng5-slider-span ng5-slider-bar\"></span>\n</span>\n<!-- // 1 Right selection bar outside two handles -->\n<span ng5SliderElement #rightOuterSelectionBar class=\"ng5-slider-span ng5-slider-bar-wrapper ng5-slider-right-out-selection\">\n  <span class=\"ng5-slider-span ng5-slider-bar\"></span>\n</span>\n<!-- // 2 The whole slider bar -->\n<span ng5SliderElement #fullBar [class.ng5-slider-transparent]=\"fullBarTransparentClass\" class=\"ng5-slider-span ng5-slider-bar-wrapper ng5-slider-full-bar\">\n  <span class=\"ng5-slider-span ng5-slider-bar\"></span>\n</span>\n<!-- // 3 Selection bar between two handles -->\n<span ng5SliderElement #selectionBar [class.ng5-slider-draggable]=\"selectionBarDraggableClass\" class=\"ng5-slider-span ng5-slider-bar-wrapper ng5-slider-selection-bar\">\n  <span class=\"ng5-slider-span ng5-slider-bar ng5-slider-selection\" [ngStyle]=\"barStyle\"></span>\n</span>\n<!-- // 4 Low slider handle -->\n<span ng5SliderHandle #minHandle class=\"ng5-slider-span ng5-slider-pointer ng5-slider-pointer-min\" [ngStyle]=minPointerStyle></span>\n<!-- // 5 High slider handle -->\n<span ng5SliderHandle #maxHandle [style.display]=\"range ? 'inherit' : 'none'\" class=\"ng5-slider-span ng5-slider-pointer ng5-slider-pointer-max\" [ngStyle]=maxPointerStyle></span>\n<!-- // 6 Floor label -->\n<span ng5SliderLabel #floorLabel class=\"ng5-slider-span ng5-slider-bubble ng5-slider-limit ng5-slider-floor\"></span>\n<!-- // 7 Ceiling label -->\n<span ng5SliderLabel #ceilLabel class=\"ng5-slider-span ng5-slider-bubble ng5-slider-limit ng5-slider-ceil\"></span>\n<!-- // 8 Label above the low slider handle -->\n<span ng5SliderLabel #minHandleLabel class=\"ng5-slider-span ng5-slider-bubble ng5-slider-model-value\"></span>\n<!-- // 9 Label above the high slider handle -->\n<span ng5SliderLabel #maxHandleLabel class=\"ng5-slider-span ng5-slider-bubble ng5-slider-model-high\"></span>\n<!-- // 10 Combined range label when the slider handles are close ex. 15 - 17 -->\n<span ng5SliderLabel #combinedLabel class=\"ng5-slider-span ng5-slider-bubble ng5-slider-combined\"></span>\n<!-- // 11 The ticks -->\n<span ng5SliderElement #ticksElement [hidden]=\"!showTicks\" [class.ng5-slider-ticks-values-under]=\"ticksUnderValuesClass\" class=\"ng5-slider-ticks\">\n  <span *ngFor=\"let t of ticks\" class=\"ng5-slider-tick\" [ngClass]=\"{'ng5-slider-selected': t.selected}\" [ngStyle]=\"t.style\">\n    <ng5-slider-tooltip-wrapper [template]=\"tooltipTemplate\" [tooltip]=\"t.tooltip\" [placement]=\"t.tooltipPlacement\"></ng5-slider-tooltip-wrapper>\n    <ng5-slider-tooltip-wrapper *ngIf=\"t.value != null\" class=\"ng5-slider-span ng5-slider-tick-value\"\n        [template]=\"tooltipTemplate\" [tooltip]=\"t.valueTooltip\" [placement]=\"t.valueTooltipPlacement\" [content]=\"t.value\"></ng5-slider-tooltip-wrapper>\n    <span *ngIf=\"t.legend != null\" class=\"ng5-slider-span ng5-slider-tick-legend\" [innerHTML]=\"t.legend\"></span>\n  </span>\n</span>",
                styles: ["::ng-deep .ng5-slider{display:inline-block;position:relative;height:4px;width:100%;margin:35px 0 15px;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-ms-touch-action:pan-y;touch-action:pan-y}::ng-deep .ng5-slider.with-legend{margin-bottom:40px}::ng-deep .ng5-slider[disabled]{cursor:not-allowed}::ng-deep .ng5-slider[disabled] .ng5-slider-pointer{cursor:not-allowed;background-color:#d8e0f3}::ng-deep .ng5-slider[disabled] .ng5-slider-draggable{cursor:not-allowed}::ng-deep .ng5-slider[disabled] .ng5-slider-selection{background:#8b91a2}::ng-deep .ng5-slider[disabled] .ng5-slider-tick{cursor:not-allowed}::ng-deep .ng5-slider[disabled] .ng5-slider-tick.ng5-slider-selected{background:#8b91a2}::ng-deep .ng5-slider .ng5-slider-span{white-space:nowrap;position:absolute;display:inline-block}::ng-deep .ng5-slider .ng5-slider-base{width:100%;height:100%;padding:0}::ng-deep .ng5-slider .ng5-slider-bar-wrapper{left:0;-webkit-box-sizing:border-box;box-sizing:border-box;margin-top:-16px;padding-top:16px;width:100%;height:32px;z-index:1}::ng-deep .ng5-slider .ng5-slider-draggable{cursor:move}::ng-deep .ng5-slider .ng5-slider-bar{left:0;width:100%;height:4px;z-index:1;background:#d8e0f3;border-radius:2px}::ng-deep .ng5-slider .ng5-slider-bar-wrapper.ng5-slider-transparent .ng5-slider-bar{background:0 0}::ng-deep .ng5-slider .ng5-slider-bar-wrapper.ng5-slider-left-out-selection .ng5-slider-bar{background:#df002d}::ng-deep .ng5-slider .ng5-slider-bar-wrapper.ng5-slider-right-out-selection .ng5-slider-bar{background:#03a688}::ng-deep .ng5-slider .ng5-slider-selection{z-index:2;background:#0db9f0;border-radius:2px}::ng-deep .ng5-slider .ng5-slider-pointer{cursor:pointer;width:32px;height:32px;top:-14px;background-color:#0db9f0;z-index:3;border-radius:16px}::ng-deep .ng5-slider .ng5-slider-pointer:after{content:'';width:8px;height:8px;position:absolute;top:12px;left:12px;border-radius:4px;background:#fff}::ng-deep .ng5-slider .ng5-slider-pointer:hover:after{background-color:#fff}::ng-deep .ng5-slider .ng5-slider-pointer.ng5-slider-active{z-index:4}::ng-deep .ng5-slider .ng5-slider-pointer.ng5-slider-active:after{background-color:#451aff}::ng-deep .ng5-slider .ng5-slider-bubble{cursor:default;bottom:16px;padding:1px 3px;color:#55637d;font-size:16px}::ng-deep .ng5-slider .ng5-slider-bubble.ng5-slider-limit{color:#55637d}::ng-deep .ng5-slider .ng5-slider-ticks{-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;height:0;position:absolute;left:0;top:-3px;margin:0;z-index:1;list-style:none}::ng-deep .ng5-slider .ng5-slider-ticks-values-under .ng5-slider-tick-value{top:auto;bottom:-36px}::ng-deep .ng5-slider .ng5-slider-tick{text-align:center;cursor:pointer;width:10px;height:10px;background:#d8e0f3;border-radius:50%;position:absolute;top:0;left:0;margin-left:11px}::ng-deep .ng5-slider .ng5-slider-tick.ng5-slider-selected{background:#0db9f0}::ng-deep .ng5-slider .ng5-slider-tick-value{position:absolute;top:-34px;-webkit-transform:translate(-50%,0);transform:translate(-50%,0)}::ng-deep .ng5-slider .ng5-slider-tick-legend{position:absolute;top:24px;-webkit-transform:translate(-50%,0);transform:translate(-50%,0);max-width:50px;white-space:normal}::ng-deep .ng5-slider.vertical{position:relative;width:4px;height:100%;margin:0 20px;padding:0;vertical-align:baseline;-ms-touch-action:pan-x;touch-action:pan-x}::ng-deep .ng5-slider.vertical .ng5-slider-base{width:100%;height:100%;padding:0}::ng-deep .ng5-slider.vertical .ng5-slider-bar-wrapper{top:auto;left:0;margin:0 0 0 -16px;padding:0 0 0 16px;height:100%;width:32px}::ng-deep .ng5-slider.vertical .ng5-slider-bar{bottom:0;left:auto;width:4px;height:100%}::ng-deep .ng5-slider.vertical .ng5-slider-pointer{left:-14px!important;top:auto;bottom:0}::ng-deep .ng5-slider.vertical .ng5-slider-bubble{left:16px!important;bottom:0}::ng-deep .ng5-slider.vertical .ng5-slider-ticks{height:100%;width:0;left:-3px;top:0;z-index:1}::ng-deep .ng5-slider.vertical .ng5-slider-tick{vertical-align:middle;margin-left:auto;margin-top:11px}::ng-deep .ng5-slider.vertical .ng5-slider-tick-value{left:24px;top:auto;-webkit-transform:translate(0,-28%);transform:translate(0,-28%)}::ng-deep .ng5-slider.vertical .ng5-slider-tick-legend{top:auto;right:24px;-webkit-transform:translate(0,-28%);transform:translate(0,-28%);max-width:none;white-space:nowrap}::ng-deep .ng5-slider.vertical .ng5-slider-ticks-values-under .ng5-slider-tick-value{bottom:auto;left:auto;right:24px}::ng-deep .ng5-slider *{-webkit-transition:none;transition:none}::ng-deep .ng5-slider.animate .ng5-slider-bar-wrapper{-webkit-transition:all linear .3s;transition:all linear .3s}::ng-deep .ng5-slider.animate .ng5-slider-selection{-webkit-transition:background-color linear .3s;transition:background-color linear .3s}::ng-deep .ng5-slider.animate .ng5-slider-pointer{-webkit-transition:all linear .3s;transition:all linear .3s}::ng-deep .ng5-slider.animate .ng5-slider-bubble{-webkit-transition:all linear .3s;transition:all linear .3s}::ng-deep .ng5-slider.animate .ng5-slider-bubble.ng5-slider-limit{-webkit-transition:opacity linear .3s;transition:opacity linear .3s}::ng-deep .ng5-slider.animate .ng5-slider-bubble.ng5-slider-combined{-webkit-transition:opacity linear .3s;transition:opacity linear .3s}::ng-deep .ng5-slider.animate .ng5-slider-tick{-webkit-transition:background-color linear .3s;transition:background-color linear .3s}"],
                host: { class: 'ng5-slider' },
                providers: [NG5_SLIDER_CONTROL_VALUE_ACCESSOR]
            },] },
];
SliderComponent.ctorParameters = function () { return [
    { type: Renderer2, },
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
    { type: NgZone, },
]; };
SliderComponent.propDecorators = {
    "value": [{ type: Input },],
    "valueChange": [{ type: Output },],
    "highValue": [{ type: Input },],
    "highValueChange": [{ type: Output },],
    "options": [{ type: Input },],
    "userChangeStart": [{ type: Output },],
    "userChange": [{ type: Output },],
    "userChangeEnd": [{ type: Output },],
    "manualRefresh": [{ type: Input },],
    "triggerFocus": [{ type: Input },],
    "leftOuterSelectionBarElement": [{ type: ViewChild, args: ['leftOuterSelectionBar', { read: SliderElementDirective },] },],
    "rightOuterSelectionBarElement": [{ type: ViewChild, args: ['rightOuterSelectionBar', { read: SliderElementDirective },] },],
    "fullBarElement": [{ type: ViewChild, args: ['fullBar', { read: SliderElementDirective },] },],
    "selectionBarElement": [{ type: ViewChild, args: ['selectionBar', { read: SliderElementDirective },] },],
    "minHandleElement": [{ type: ViewChild, args: ['minHandle', { read: SliderHandleDirective },] },],
    "maxHandleElement": [{ type: ViewChild, args: ['maxHandle', { read: SliderHandleDirective },] },],
    "floorLabelElement": [{ type: ViewChild, args: ['floorLabel', { read: SliderLabelDirective },] },],
    "ceilLabelElement": [{ type: ViewChild, args: ['ceilLabel', { read: SliderLabelDirective },] },],
    "minHandleLabelElement": [{ type: ViewChild, args: ['minHandleLabel', { read: SliderLabelDirective },] },],
    "maxHandleLabelElement": [{ type: ViewChild, args: ['maxHandleLabel', { read: SliderLabelDirective },] },],
    "combinedLabelElement": [{ type: ViewChild, args: ['combinedLabel', { read: SliderLabelDirective },] },],
    "ticksElement": [{ type: ViewChild, args: ['ticksElement', { read: SliderElementDirective },] },],
    "tooltipTemplate": [{ type: ContentChild, args: ['tooltipTemplate',] },],
    "sliderElementVerticalClass": [{ type: HostBinding, args: ['class.vertical',] },],
    "sliderElementAnimateClass": [{ type: HostBinding, args: ['class.animate',] },],
    "sliderElementDisabledAttr": [{ type: HostBinding, args: ['attr.disabled',] },],
    "onResize": [{ type: HostListener, args: ['window:resize', ['$event'],] },],
};
var TooltipWrapperComponent = /** @class */ (function () {
    function TooltipWrapperComponent() {
    }
    return TooltipWrapperComponent;
}());
TooltipWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng5-slider-tooltip-wrapper',
                template: "<ng-container *ngIf=\"template\">\n  <ng-template *ngTemplateOutlet=\"template; context: {tooltip: tooltip, placement: placement, content: content}\"></ng-template>\n</ng-container>\n\n<ng-container *ngIf=\"!template\">\n  <div class=\"ng5-slider-inner-tooltip\" [attr.title]=\"tooltip\" [attr.data-tooltip-placement]=\"placement\">\n    {{content}}\n  </div>\n</ng-container>",
                styles: [".ng5-slider-inner-tooltip{height:100%}"]
            },] },
];
TooltipWrapperComponent.ctorParameters = function () { return []; };
TooltipWrapperComponent.propDecorators = {
    "template": [{ type: Input },],
    "tooltip": [{ type: Input },],
    "placement": [{ type: Input },],
    "content": [{ type: Input },],
};
var Ng5SliderModule = /** @class */ (function () {
    function Ng5SliderModule() {
    }
    return Ng5SliderModule;
}());
Ng5SliderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    SliderComponent,
                    SliderElementDirective,
                    SliderHandleDirective,
                    SliderLabelDirective,
                    TooltipWrapperComponent
                ],
                exports: [
                    SliderComponent
                ]
            },] },
];
Ng5SliderModule.ctorParameters = function () { return []; };

export { Ng5SliderModule, ChangeContext, PointerType, LabelType, Options, SliderElementDirective as ɵb, SliderHandleDirective as ɵc, SliderLabelDirective as ɵd, SliderComponent as ɵa, TooltipWrapperComponent as ɵe };
//# sourceMappingURL=ng5-slider.js.map
