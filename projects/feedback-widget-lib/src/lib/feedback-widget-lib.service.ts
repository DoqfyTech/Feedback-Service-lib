import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackWidgetLibService {
  private widgetScriptId: string = 'feedback-widget';
  private isLoaded: boolean = false;

  constructor() {}

  private init(userEmail: string): void {
    const widget = (window as any).FeedbackWidget;
    if (widget && typeof widget.init === 'function') {
      widget.init({ user: userEmail });
    }
  }

  load(userEmail: string): Promise<void> {
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

  unload(): void{
    const widget = (window as any).FeedbackWidget;
    if(widget && typeof widget.destroy === 'function'){
      widget.destroy()
    }

    document.getElementById(this.widgetScriptId)?.remove();
    document.querySelector('.feedback-btn')?.remove();
    document.querySelector('.feedback-modal')?.remove();
    document.querySelector('.feedback-modal-backdrop')?.remove();

    this.isLoaded = false;
  }
}
