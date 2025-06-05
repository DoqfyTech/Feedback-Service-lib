import * as i0 from "@angular/core";
export declare class FeedbackWidgetLibService {
    private isLoaded;
    private config;
    private rating;
    private imageBase64;
    private videoBase64;
    constructor();
    load(config: any): void;
    unload(): void;
    private loadFont;
    private injectStyles;
    private createButton;
    private showModal;
    private createHeader;
    private createBody;
    setupFileInput: (input: any, type: any) => void;
    private createFooter;
    private closeModal;
    private submit;
    static ɵfac: i0.ɵɵFactoryDeclaration<FeedbackWidgetLibService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FeedbackWidgetLibService>;
}
