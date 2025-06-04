import * as i0 from '@angular/core';
import { Injectable, Component, NgModule } from '@angular/core';

class FeedbackWidgetLibService {
    constructor() {
        this.widgetScriptId = 'feedback-widget';
        this.isLoaded = false;
    }
    init(userEmail) {
        const widget = window.FeedbackWidget;
        if (widget && typeof widget.init === 'function') {
            widget.init({ user: userEmail });
        }
    }
    load(userEmail) {
        return new Promise((resolve, reject) => {
            if (this.isLoaded) {
                this.init(userEmail);
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.id = this.widgetScriptId;
            script.src = 'assets/feedback-widget.js';
            script.onload = () => {
                this.init(userEmail);
                this.isLoaded = true;
                resolve();
            };
            script.onerror = () => reject('Failed to load widget script');
            document.body.appendChild(script);
        });
    }
    unload() {
        const widget = window.FeedbackWidget;
        if (widget && typeof widget.destroy === 'function') {
            widget.destroy();
        }
        document.getElementById(this.widgetScriptId)?.remove();
        document.querySelector('.feedback-btn')?.remove();
        document.querySelector('.feedback-modal')?.remove();
        document.querySelector('.feedback-modal-backdrop')?.remove();
        this.isLoaded = false;
    }
}
FeedbackWidgetLibService.ɵfac = function FeedbackWidgetLibService_Factory(t) { return new (t || FeedbackWidgetLibService)(); };
FeedbackWidgetLibService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: FeedbackWidgetLibService, factory: FeedbackWidgetLibService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FeedbackWidgetLibService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

class FeedbackWidgetLibComponent {
    constructor() { }
    ngOnInit() {
    }
}
FeedbackWidgetLibComponent.ɵfac = function FeedbackWidgetLibComponent_Factory(t) { return new (t || FeedbackWidgetLibComponent)(); };
FeedbackWidgetLibComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FeedbackWidgetLibComponent, selectors: [["lib-feedback-widget-lib"]], decls: 2, vars: 0, template: function FeedbackWidgetLibComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "p");
        i0.ɵɵtext(1, " feedback-widget-lib works! ");
        i0.ɵɵelementEnd();
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FeedbackWidgetLibComponent, [{
        type: Component,
        args: [{ selector: 'lib-feedback-widget-lib', template: `
    <p>
      feedback-widget-lib works!
    </p>
  ` }]
    }], function () { return []; }, null); })();

class FeedbackWidgetLibModule {
}
FeedbackWidgetLibModule.ɵfac = function FeedbackWidgetLibModule_Factory(t) { return new (t || FeedbackWidgetLibModule)(); };
FeedbackWidgetLibModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: FeedbackWidgetLibModule });
FeedbackWidgetLibModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({});
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FeedbackWidgetLibModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    FeedbackWidgetLibComponent
                ],
                imports: [],
                exports: [
                    FeedbackWidgetLibComponent
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(FeedbackWidgetLibModule, { declarations: [FeedbackWidgetLibComponent], exports: [FeedbackWidgetLibComponent] }); })();

/*
 * Public API Surface of feedback-widget-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { FeedbackWidgetLibComponent, FeedbackWidgetLibModule, FeedbackWidgetLibService };
//# sourceMappingURL=feedback-widget-lib.mjs.map
