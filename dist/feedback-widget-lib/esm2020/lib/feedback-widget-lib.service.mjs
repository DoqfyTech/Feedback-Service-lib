import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class FeedbackWidgetLibService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVlZGJhY2std2lkZ2V0LWxpYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZmVlZGJhY2std2lkZ2V0LWxpYi9zcmMvbGliL2ZlZWRiYWNrLXdpZGdldC1saWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUszQyxNQUFNLE9BQU8sd0JBQXdCO0lBSW5DO1FBSFEsbUJBQWMsR0FBVyxpQkFBaUIsQ0FBQztRQUMzQyxhQUFRLEdBQVksS0FBSyxDQUFDO0lBRW5CLENBQUM7SUFFUixJQUFJLENBQUMsU0FBaUI7UUFDNUIsTUFBTSxNQUFNLEdBQUksTUFBYyxDQUFDLGNBQWMsQ0FBQztRQUM5QyxJQUFJLE1BQU0sSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO1lBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztTQUNsQztJQUNILENBQUM7SUFFRCxJQUFJLENBQUMsU0FBaUI7UUFDcEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3JCLE9BQU8sRUFBRSxDQUFDO2dCQUNWLE9BQU87YUFDUjtZQUVELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsMkJBQTJCLENBQUM7WUFDekMsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsQ0FBQztZQUNGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLDhCQUE4QixDQUFDLENBQUM7WUFDOUQsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUNKLE1BQU0sTUFBTSxHQUFJLE1BQWMsQ0FBQyxjQUFjLENBQUM7UUFDOUMsSUFBRyxNQUFNLElBQUksT0FBTyxNQUFNLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBQztZQUNoRCxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUE7U0FDakI7UUFFRCxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUN2RCxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQ2xELFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUNwRCxRQUFRLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFFN0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQzs7Z0dBOUNVLHdCQUF3Qjs4RUFBeEIsd0JBQXdCLFdBQXhCLHdCQUF3QixtQkFGdkIsTUFBTTt1RkFFUCx3QkFBd0I7Y0FIcEMsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBGZWVkYmFja1dpZGdldExpYlNlcnZpY2Uge1xuICBwcml2YXRlIHdpZGdldFNjcmlwdElkOiBzdHJpbmcgPSAnZmVlZGJhY2std2lkZ2V0JztcbiAgcHJpdmF0ZSBpc0xvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBwcml2YXRlIGluaXQodXNlckVtYWlsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCB3aWRnZXQgPSAod2luZG93IGFzIGFueSkuRmVlZGJhY2tXaWRnZXQ7XG4gICAgaWYgKHdpZGdldCAmJiB0eXBlb2Ygd2lkZ2V0LmluaXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHdpZGdldC5pbml0KHsgdXNlcjogdXNlckVtYWlsIH0pO1xuICAgIH1cbiAgfVxuXG4gIGxvYWQodXNlckVtYWlsOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNMb2FkZWQpIHtcbiAgICAgICAgdGhpcy5pbml0KHVzZXJFbWFpbCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIHNjcmlwdC5pZCA9IHRoaXMud2lkZ2V0U2NyaXB0SWQ7XG4gICAgICBzY3JpcHQuc3JjID0gJ2Fzc2V0cy9mZWVkYmFjay13aWRnZXQuanMnO1xuICAgICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5pbml0KHVzZXJFbWFpbCk7XG4gICAgICAgIHRoaXMuaXNMb2FkZWQgPSB0cnVlO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9O1xuICAgICAgc2NyaXB0Lm9uZXJyb3IgPSAoKSA9PiByZWplY3QoJ0ZhaWxlZCB0byBsb2FkIHdpZGdldCBzY3JpcHQnKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9KTtcbiAgfVxuXG4gIHVubG9hZCgpOiB2b2lke1xuICAgIGNvbnN0IHdpZGdldCA9ICh3aW5kb3cgYXMgYW55KS5GZWVkYmFja1dpZGdldDtcbiAgICBpZih3aWRnZXQgJiYgdHlwZW9mIHdpZGdldC5kZXN0cm95ID09PSAnZnVuY3Rpb24nKXtcbiAgICAgIHdpZGdldC5kZXN0cm95KClcbiAgICB9XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLndpZGdldFNjcmlwdElkKT8ucmVtb3ZlKCk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrLWJ0bicpPy5yZW1vdmUoKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2stbW9kYWwnKT8ucmVtb3ZlKCk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrLW1vZGFsLWJhY2tkcm9wJyk/LnJlbW92ZSgpO1xuXG4gICAgdGhpcy5pc0xvYWRlZCA9IGZhbHNlO1xuICB9XG59XG4iXX0=