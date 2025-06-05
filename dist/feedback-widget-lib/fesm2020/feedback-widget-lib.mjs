import * as i0 from '@angular/core';
import { Injectable, Component, NgModule } from '@angular/core';

class FeedbackWidgetLibService {
    constructor() {
        this.isLoaded = false;
        this.config = {};
        this.rating = 0;
        this.imageBase64 = "";
        this.videoBase64 = "";
        this.setupFileInput = (input, type) => {
            const uploadBox = input.closest(".upload-box");
            const icon = uploadBox.querySelector("i");
            const text = uploadBox.querySelector(".upload-text");
            // Progress UI elements
            const progressDiv = document.createElement("div");
            progressDiv.className = "upload-progress";
            progressDiv.style.display = "none";
            const fileName = document.createElement("div");
            fileName.className = "filename";
            const fileSize = document.createElement("div");
            fileSize.className = "size";
            const bar = document.createElement("div");
            bar.className = "progress-bar";
            const fill = document.createElement("div");
            fill.className = "progress-fill";
            const removeBtn = document.createElement("button");
            removeBtn.className = "remove-btn";
            removeBtn.textContent = "Remove";
            const sizeRemoveCntnr = document.createElement("div");
            sizeRemoveCntnr.className = "size-and-remove-cntnr";
            sizeRemoveCntnr.appendChild(fileSize);
            sizeRemoveCntnr.appendChild(removeBtn);
            bar.appendChild(fill);
            progressDiv.appendChild(fileName);
            progressDiv.appendChild(sizeRemoveCntnr);
            progressDiv.appendChild(bar);
            uploadBox.appendChild(progressDiv);
            input.addEventListener("change", () => {
                const file = input.files?.[0];
                if (!file)
                    return;
                // Show progress UI
                icon.style.display = "none";
                text.style.display = "none";
                progressDiv.style.display = "flex";
                // Update filename and size
                fileName.textContent = file.name;
                fileSize.textContent = `${(file.size / 1024).toFixed(1)} KB`;
                // Read file
                const reader = new FileReader();
                reader.onloadstart = () => {
                    fill.style.width = "0%";
                };
                reader.onprogress = (e) => {
                    if (e.lengthComputable) {
                        const percent = (e.loaded / e.total) * 100;
                        fill.style.width = `${percent.toFixed(0)}%`;
                    }
                };
                reader.onloadend = () => {
                    fill.style.width = "100%";
                    const base64 = reader.result;
                    if (type === "image")
                        this.imageBase64 = base64;
                    else
                        this.videoBase64 = base64;
                };
                reader.readAsDataURL(file);
            });
            removeBtn.addEventListener("click", (e) => {
                e.preventDefault();
                input.value = "";
                icon.style.display = "";
                text.style.display = "";
                progressDiv.style.display = "none";
                fill.style.width = "0%";
                fileName.textContent = "";
                fileSize.textContent = "";
                if (type === "image")
                    this.imageBase64 = "";
                else
                    this.videoBase64 = "";
            });
        };
    }
    load(config) {
        if (this.isLoaded)
            return;
        this.config = config;
        this.loadFont();
        this.injectStyles();
        this.createButton();
        this.isLoaded = true;
    }
    unload() {
        document.querySelector('.feedback-btn')?.remove();
        document.querySelector('.feedback-modal')?.remove();
        document.querySelector('.feedback-backdrop')?.remove();
        this.isLoaded = false;
        this.rating = 0;
        this.imageBase64 = "";
        this.videoBase64 = "";
    }
    loadFont() {
        if (!document.getElementById('poppins-font')) {
            const link = document.createElement('link');
            link.id = 'poppins-font';
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Poppins&display=swap';
            document.head.appendChild(link);
        }
    }
    injectStyles() {
        const style = document.createElement('style');
        style.innerText = `
      .feedback-btn{
              font-family: 'Poppins', sans-serif;
              background-color: #7106ff;
              color: white;
              box-shadow: 5px 5px 8px 2px rgba(0,0,0,0.6);
              position: fixed;
              right: 16px;
              bottom: 48px;
              border: 0;
              border-radius: 24px;
              padding: 8px 16px;
              display: flex;
              align-items: center;
              gap: 8px;
              font-size: 14px;
              font-weight: 600;       
              z-index: 9997;
          }
          
          .feedback-btn span{
              display: none;
          }
          
          .feedback-btn:hover span{
              display: block;
          }
  
          .feedback-modal {
              opacity: 0;
              visibility: hidden;
              transition: opacity 0.3s ease, visibility 0.3s ease;
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              background: rgba(0,0,0,0.4);
              z-index: 9998;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 16px;
              box-sizing: border-box;
          }
  
          .feedback-modal.show {
              opacity: 1;
              visibility: visible;
          }
  
          .feedback-content {
              background: #fff;
              width: 100%;
              max-width: 575px;
              border-radius: 12px;
              font-family: 'Poppins', sans-serif;
              box-shadow: 0 6px 20px rgba(0,0,0,0.25);
              max-height: 90vh;
              overflow-y: auto;
              box-sizing: border-box;
              transform: scale(0.9);
              transition: transform 0.3s ease;
          }
  
          .feedback-modal.show .feedback-content {
              transform: scale(1);
          }
  
          .feedback-backdrop {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              background: rgba(0,0,0,0.4);
              opacity: 0;
              visibility: hidden;
              z-index: 9997;
              transition: opacity 0.3s ease, visibility 0.3s ease;
          }
  
          .feedback-backdrop.show {
              visibility: visible;
              opacity: 1;
          }
  
          .feedback-modal-header div{
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 16px;
              border-bottom: 1px solid #AEB3B9;
          }
  
          .feedback-modal-header div h1{
              padding: 0;
              margin: 0;
              height: fit-content;
              font-family: 'Poppins', sans-serif;
              font-weight: 600;
              font-size: 18px;
              line-height: 100%;
              color: #333232;
          }
          
          .feedback-modal-header div button{
              height: fit-content;
              padding: 0;
          }
  
          .close-btn {
              background: none;
              border: none;
              font-size: 24px;
              font-weight: 400;
              color: #333;
              cursor: pointer;
              padding: 4px 8px;
              line-height: 1;
          }
  
          .close-btn:hover {
              transform: scale(1.1);
          }
  
          .feed-back-form{
              display: flex;
              flex-wrap: wrap;
              padding: 16px;
              gap: 16px;
          }
  
          .col12{
              flex: 0 0 auto;
              width: 100%;
              display: flex;;
              flex-direction: column;
              gap: 8px;
            }
  
          .feedback-stars {
            display: flex;
            justify-content: space-between;
            font-size: 28px;
            cursor: pointer;
          }
  
          .feedback-stars span {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            font-size: 40px;
            border-radius: 50%;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
  
          .feedback-stars span.selected {
            transform: scale(1.3);
            box-shadow: 7px 5px 8px rgba(0, 0, 0, 0.25);
          }
  
          .feedback-stars span:hover {
            transform: scale(1.2);
            box-shadow: 7px 5px 8px rgba(0, 0, 0, 0.25);
          }
  
          .formLabel{
              font-weight: 500;
              font-family: 'Poppins', sans-serif;
              font-size: 14px;
              line-height: 100%;
              color: #3d3d3d;
          }
          
          .formControl{
            border: 1px solid #CCD1D6;
            padding: 10px 12px;
            border-radius: 6px;
            color: #6D6D6D;
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            font-weight: 400;
            transition: border-color 0.2s ease;
          }
  
          .formControl:hover, 
          .formControl:focus, 
          .formControl:focus-visible {
            border: 1px solid #3b82f6 !important;
            outline: none;
          }
  
          .colMd6 {
              display: flex;
              flex-direction: column;
              gap: 8px;
          }
  
          .fileInputs{
            width: 100%;
            display: flex;
            gap: 16px;
            flex-direction: column;
          }
  
          @media (min-width: 768px) {
            .colMd6 {
              flex: 0 0 auto;
              width: 50%;
            }
  
            .fileInputs{ 
              display: flex;
              flex-direction: row;
              margin-right: 16px;
            }
            
            .upload-progress{
              width: 220.5px !important;
            } 
          }
  
          .upload-box {
            border: 2px dashed #CCD1D6;
            padding: 16px;
            border-radius: 8px;
            text-align: center;
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
            color: #4b5563;
            font-size: 14px;
            position: relative;
            transition: border-color 0.2s ease;
          }
  
          .upload-box:hover {
            border-color: #3b82f6;
            background-color: #f9fafb;
          }
  
          .upload-box i {
            font-size: 24px;
            margin-bottom: 8px;
            display: block;
            font-style: normal;
          }
            
          .upload-box input[type="file"] {
            display: none;
          }
  
          .upload-progress {
            display: none;
            flex-direction: column;
            gap: 4px;
            align-items: flex-start;
            margin-top: 8px;
            font-family: 'Poppins', sans-serif;
            width: 100%;
          }
  
          .upload-progress .filename {
            font-size: 12px;
            font-weight: 500;
            color: #374151;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
  
          .size-and-remove-cntnr{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }
  
          .upload-progress .size {
            font-size: 12px;
            color: #6B7280;
          }
  
          .upload-progress .progress-bar {
            width: 100%;
            background-color: #e5e7eb;
            height: 6px;
            border-radius: 4px;
            overflow: hidden;
          }
  
          .upload-progress .progress-fill {
            height: 100%;
            width: 0%;
            background-color: #3b82f6;
            transition: width 0.2s ease;
          }
  
          .upload-progress .remove-btn {
            margin-top: 6px;
            font-size: 12px;
            color: #ef4444;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            font-weight: 500;
          }
          
          .feedback-modal-footer{
            padding: 16px;
            border-top: 1px solid #AEB3B9;
          }
  
          .feedback-modal-footer div{
            display: flex;
            justify-content: flex-end;
            gap: 16px;
          }
  
          .feedback-modal-footer div #fb-cancel{
            padding: 8px 10px;
            border: none;
            background-color: transparent;
            color: #454545;
            font-family: Poppins;
            font-weight: 500;
            font-size: 12px;
            line-height: 100%;
            cursor: pointer;
          }
  
          .feedback-modal-footer div #fb-submit{
            padding: 9px 14px;
            background-color: #7106FF;
            border: none;
            border-radius: 6px;
            font-family: "Poppins";
            font-weight: 500;
            font-size: 14px;
            line-height: 100%;
            color: #fff;
          }
    `;
        document.head.appendChild(style);
    }
    createButton() {
        const btn = document.createElement('button');
        btn.className = 'feedback-btn';
        btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
        class="bi bi-chat-fill" viewBox="0 0 16 16">
        <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7
        c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 
        2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 
        4.18-1.234A9 9 0 0 0 8 15"/>
      </svg> <span>Feedback</span>
    `;
        btn.onclick = () => this.showModal();
        document.body.appendChild(btn);
    }
    showModal() {
        const backdrop = document.createElement('div');
        backdrop.className = 'feedback-backdrop';
        document.body.appendChild(backdrop);
        const modal = document.createElement('aside');
        modal.className = 'feedback-modal';
        const content = document.createElement('div');
        content.className = 'feedback-content';
        content.appendChild(this.createHeader(modal, backdrop));
        content.appendChild(this.createBody());
        content.appendChild(this.createFooter(modal, backdrop));
        modal.appendChild(content);
        document.body.appendChild(modal);
        setTimeout(() => {
            modal.classList.add('show');
            backdrop.classList.add('show');
        }, 10);
    }
    createHeader(modal, backdrop) {
        const header = document.createElement('header');
        header.className = 'feedback-modal-header';
        header.innerHTML = `
      <div>
        <h1>Feedback</h1>
        <button class="close-btn" id="closeBtn">&times;</button>
      </div>`;
        header.querySelector('#closeBtn')?.addEventListener('click', () => this.closeModal(modal, backdrop));
        return header;
    }
    createBody() {
        const body = document.createElement('main');
        body.className = 'feedback-modal-body';
        body.innerHTML = `
      <form class="feed-back-form">
        <div class="col12">
          <label for="stars" class="formLabel">How do you feel?</label>
          <div class="feedback-stars" id="stars">
            ${['😠', '😞', '😐', '🙂', '😄']
            .map((emoji, i) => `<span data-value="${i + 1}" title="${emoji}">${emoji}</span>`)
            .join('')}
          </div>
        </div>
        <div class="col12">
          <label class="formLabel">Comments:</label>
          <textarea id="fb-comments" class="formControl" rows="3" maxlength="1000"></textarea>
        </div>
        <div class="col12">
          <label class="formLabel">What could be improved?</label>
          <textarea id="fb-improvement" class="formControl" rows="3" maxlength="1000"></textarea>
        </div>
        <div class="fileInputs">
          <div class="colMd6">
            <label class="formLabel">Attach an image:</label>
            <label class="upload-box">
              <i>🖼️</i>
              <span class="upload-text">Click here to upload image</span>
              <input type="file" id="fb-image" accept="image/*">
            </label>
          </div>
          <div class="colMd6">
            <label class="formLabel">Attach a video:</label>
            <label class="upload-box">
              <i>🎥</i>
              <span class="upload-text">Click here to upload video</span>
              <input type="file" id="fb-video" accept="video/*">
            </label>
          </div>
        </div>
      </form>`;
        // Rating
        body.querySelectorAll('.feedback-stars span')?.forEach(span => {
            span.addEventListener('click', () => {
                this.rating = Number(span.getAttribute('data-value'));
                body.querySelectorAll('.feedback-stars span').forEach(s => s.classList.remove('selected'));
                span.classList.add('selected');
            });
        });
        this.setupFileInput(body.querySelector('#fb-image'), 'image');
        this.setupFileInput(body.querySelector('#fb-video'), 'video');
        return body;
    }
    createFooter(modal, backdrop) {
        const footer = document.createElement('footer');
        footer.className = 'feedback-modal-footer';
        footer.innerHTML = `
      <div>
        <button id="fb-cancel">Cancel</button>
        <button id="fb-submit">Submit</button>
      </div>
    `;
        footer.querySelector('#fb-cancel')?.addEventListener('click', () => this.closeModal(modal, backdrop));
        footer.querySelector('#fb-submit')?.addEventListener('click', () => this.submit(modal, backdrop));
        return footer;
    }
    closeModal(modal, backdrop) {
        modal.classList.remove('show');
        backdrop.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            backdrop.remove();
        }, 300);
    }
    submit(modal, backdrop) {
        const comment = document.getElementById('fb-comments').value.trim();
        const improvement = document.getElementById('fb-improvement').value.trim();
        if (!this.rating) {
            alert('Please select a rating.');
            return;
        }
        if (!comment) {
            alert('Please enter a comment.');
            return;
        }
        const payload = {
            username: this.config?.user,
            rating: this.rating,
            comment,
            improvement,
            image: this.imageBase64,
            video: this.videoBase64
        };
        fetch('https://192.168.1.19:2000/feedback/feedback/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(res => {
            if (!res.ok)
                throw new Error('Server error');
            return res.json();
        })
            .then(() => {
            alert('✅ Feedback submitted!');
            this.closeModal(modal, backdrop);
        })
            .catch(err => {
            console.error('❌ Error submitting feedback:', err);
            alert('❌ Error submitting feedback.');
        });
    }
}
FeedbackWidgetLibService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FeedbackWidgetLibService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FeedbackWidgetLibService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FeedbackWidgetLibService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FeedbackWidgetLibService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });

class FeedbackWidgetLibComponent {
    constructor() { }
    ngOnInit() {
    }
}
FeedbackWidgetLibComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FeedbackWidgetLibComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
FeedbackWidgetLibComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: FeedbackWidgetLibComponent, selector: "lib-feedback-widget-lib", ngImport: i0, template: `
    <p>
      feedback-widget-lib works!
    </p>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FeedbackWidgetLibComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-feedback-widget-lib', template: `
    <p>
      feedback-widget-lib works!
    </p>
  ` }]
        }], ctorParameters: function () { return []; } });

class FeedbackWidgetLibModule {
}
FeedbackWidgetLibModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FeedbackWidgetLibModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FeedbackWidgetLibModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: FeedbackWidgetLibModule, declarations: [FeedbackWidgetLibComponent], exports: [FeedbackWidgetLibComponent] });
FeedbackWidgetLibModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FeedbackWidgetLibModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FeedbackWidgetLibModule, decorators: [{
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
        }] });

/*
 * Public API Surface of feedback-widget-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { FeedbackWidgetLibComponent, FeedbackWidgetLibModule, FeedbackWidgetLibService };
//# sourceMappingURL=feedback-widget-lib.mjs.map
