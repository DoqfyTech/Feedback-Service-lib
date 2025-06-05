import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class FeedbackWidgetLibService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVlZGJhY2std2lkZ2V0LWxpYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZmVlZGJhY2std2lkZ2V0LWxpYi9zcmMvbGliL2ZlZWRiYWNrLXdpZGdldC1saWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUczQyxNQUFNLE9BQU8sd0JBQXdCO0lBT25DO1FBTlEsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixXQUFNLEdBQVEsRUFBRSxDQUFDO1FBQ2pCLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxnQkFBVyxHQUFTLEVBQUUsQ0FBQztRQUN2QixnQkFBVyxHQUFTLEVBQUUsQ0FBQztRQWlmOUIsbUJBQWMsR0FBRyxDQUFDLEtBQVMsRUFBRSxJQUFRLEVBQUUsRUFBRTtZQUN4QyxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQy9DLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUMsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUVyRCx1QkFBdUI7WUFDdkIsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsRCxXQUFXLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDO1lBQzFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUVuQyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9DLFFBQVEsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO1lBRWhDLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENB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LEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBGZWVkYmFja1dpZGdldExpYlNlcnZpY2Uge1xuICBwcml2YXRlIGlzTG9hZGVkID0gZmFsc2U7XG4gIHByaXZhdGUgY29uZmlnOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSByYXRpbmcgPSAwO1xuICBwcml2YXRlIGltYWdlQmFzZTY0OiBhbnkgID0gXCJcIjtcbiAgcHJpdmF0ZSB2aWRlb0Jhc2U2NDogYW55ICA9IFwiXCI7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGxvYWQoY29uZmlnOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0xvYWRlZCkgcmV0dXJuO1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuXG4gICAgdGhpcy5sb2FkRm9udCgpO1xuICAgIHRoaXMuaW5qZWN0U3R5bGVzKCk7XG4gICAgdGhpcy5jcmVhdGVCdXR0b24oKTtcblxuICAgIHRoaXMuaXNMb2FkZWQgPSB0cnVlO1xuICB9XG5cbiAgdW5sb2FkKCk6IHZvaWQge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjay1idG4nKT8ucmVtb3ZlKCk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrLW1vZGFsJyk/LnJlbW92ZSgpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjay1iYWNrZHJvcCcpPy5yZW1vdmUoKTtcbiAgICB0aGlzLmlzTG9hZGVkID0gZmFsc2U7XG4gICAgdGhpcy5yYXRpbmcgPSAwO1xuICAgIHRoaXMuaW1hZ2VCYXNlNjQgPSBcIlwiO1xuICAgIHRoaXMudmlkZW9CYXNlNjQgPSBcIlwiO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkRm9udCgpIHtcbiAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3BwaW5zLWZvbnQnKSkge1xuICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgIGxpbmsuaWQgPSAncG9wcGlucy1mb250JztcbiAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgbGluay5ocmVmID0gJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UG9wcGlucyZkaXNwbGF5PXN3YXAnO1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluamVjdFN0eWxlcygpIHtcbiAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGUuaW5uZXJUZXh0ID0gYFxuICAgICAgLmZlZWRiYWNrLWJ0bntcbiAgICAgICAgICAgICAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzcxMDZmZjtcbiAgICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgICBib3gtc2hhZG93OiA1cHggNXB4IDhweCAycHggcmdiYSgwLDAsMCwwLjYpO1xuICAgICAgICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgICAgICAgIHJpZ2h0OiAxNnB4O1xuICAgICAgICAgICAgICBib3R0b206IDQ4cHg7XG4gICAgICAgICAgICAgIGJvcmRlcjogMDtcbiAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMjRweDtcbiAgICAgICAgICAgICAgcGFkZGluZzogOHB4IDE2cHg7XG4gICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICAgIGdhcDogOHB4O1xuICAgICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7ICAgICAgIFxuICAgICAgICAgICAgICB6LWluZGV4OiA5OTk3O1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICAuZmVlZGJhY2stYnRuIHNwYW57XG4gICAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIC5mZWVkYmFjay1idG46aG92ZXIgc3BhbntcbiAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICAuZmVlZGJhY2stbW9kYWwge1xuICAgICAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICAgICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgICAgICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBlYXNlLCB2aXNpYmlsaXR5IDAuM3MgZWFzZTtcbiAgICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICAgICAgICB0b3A6IDA7XG4gICAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICAgIHdpZHRoOiAxMDB2dztcbiAgICAgICAgICAgICAgaGVpZ2h0OiAxMDB2aDtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjQpO1xuICAgICAgICAgICAgICB6LWluZGV4OiA5OTk4O1xuICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgICAgcGFkZGluZzogMTZweDtcbiAgICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgIC5mZWVkYmFjay1tb2RhbC5zaG93IHtcbiAgICAgICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgIC5mZWVkYmFjay1jb250ZW50IHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICAgIG1heC13aWR0aDogNTc1cHg7XG4gICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XG4gICAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgNnB4IDIwcHggcmdiYSgwLDAsMCwwLjI1KTtcbiAgICAgICAgICAgICAgbWF4LWhlaWdodDogOTB2aDtcbiAgICAgICAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjkpO1xuICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgLmZlZWRiYWNrLW1vZGFsLnNob3cgLmZlZWRiYWNrLWNvbnRlbnQge1xuICAgICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgLmZlZWRiYWNrLWJhY2tkcm9wIHtcbiAgICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICAgICAgICB0b3A6IDA7XG4gICAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICAgIHdpZHRoOiAxMDB2dztcbiAgICAgICAgICAgICAgaGVpZ2h0OiAxMDB2aDtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjQpO1xuICAgICAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICAgICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgICAgICAgICAgIHotaW5kZXg6IDk5OTc7XG4gICAgICAgICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBlYXNlLCB2aXNpYmlsaXR5IDAuM3MgZWFzZTtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgIC5mZWVkYmFjay1iYWNrZHJvcC5zaG93IHtcbiAgICAgICAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICAgICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgIC5mZWVkYmFjay1tb2RhbC1oZWFkZXIgZGl2e1xuICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjQUVCM0I5O1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgLmZlZWRiYWNrLW1vZGFsLWhlYWRlciBkaXYgaDF7XG4gICAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgICAgaGVpZ2h0OiBmaXQtY29udGVudDtcbiAgICAgICAgICAgICAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcbiAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICAgICAgICBsaW5lLWhlaWdodDogMTAwJTtcbiAgICAgICAgICAgICAgY29sb3I6ICMzMzMyMzI7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIC5mZWVkYmFjay1tb2RhbC1oZWFkZXIgZGl2IGJ1dHRvbntcbiAgICAgICAgICAgICAgaGVpZ2h0OiBmaXQtY29udGVudDtcbiAgICAgICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgIC5jbG9zZS1idG4ge1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICAgICAgICAgICAgY29sb3I6ICMzMzM7XG4gICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgICAgcGFkZGluZzogNHB4IDhweDtcbiAgICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDE7XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICAuY2xvc2UtYnRuOmhvdmVyIHtcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgLmZlZWQtYmFjay1mb3Jte1xuICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICAgICAgICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgICAgICAgICAgIGdhcDogMTZweDtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgIC5jb2wxMntcbiAgICAgICAgICAgICAgZmxleDogMCAwIGF1dG87XG4gICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4OztcbiAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAgICAgZ2FwOiA4cHg7XG4gICAgICAgICAgICB9XG4gIFxuICAgICAgICAgIC5mZWVkYmFjay1zdGFycyB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICAgICAgZm9udC1zaXplOiAyOHB4O1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgLmZlZWRiYWNrLXN0YXJzIHNwYW4ge1xuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICB3aWR0aDogNDBweDtcbiAgICAgICAgICAgIGhlaWdodDogNDBweDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2UsIGJveC1zaGFkb3cgMC4ycyBlYXNlO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgLmZlZWRiYWNrLXN0YXJzIHNwYW4uc2VsZWN0ZWQge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjMpO1xuICAgICAgICAgICAgYm94LXNoYWRvdzogN3B4IDVweCA4cHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgIC5mZWVkYmFjay1zdGFycyBzcGFuOmhvdmVyIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4yKTtcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDdweCA1cHggOHB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICAuZm9ybUxhYmVse1xuICAgICAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICAgICAgICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xuICAgICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgICBjb2xvcjogIzNkM2QzZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgLmZvcm1Db250cm9se1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI0NDRDFENjtcbiAgICAgICAgICAgIHBhZGRpbmc6IDEwcHggMTJweDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICAgICAgICAgIGNvbG9yOiAjNkQ2RDZEO1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4ycyBlYXNlO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgLmZvcm1Db250cm9sOmhvdmVyLCBcbiAgICAgICAgICAuZm9ybUNvbnRyb2w6Zm9jdXMsIFxuICAgICAgICAgIC5mb3JtQ29udHJvbDpmb2N1cy12aXNpYmxlIHtcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICMzYjgyZjYgIWltcG9ydGFudDtcbiAgICAgICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICAuY29sTWQ2IHtcbiAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAgICAgZ2FwOiA4cHg7XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICAuZmlsZUlucHV0c3tcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGdhcDogMTZweDtcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICAgICAgICAgIC5jb2xNZDYge1xuICAgICAgICAgICAgICBmbGV4OiAwIDAgYXV0bztcbiAgICAgICAgICAgICAgd2lkdGg6IDUwJTtcbiAgICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgICAuZmlsZUlucHV0c3sgXG4gICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMTZweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLnVwbG9hZC1wcm9ncmVzc3tcbiAgICAgICAgICAgICAgd2lkdGg6IDIyMC41cHggIWltcG9ydGFudDtcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICAudXBsb2FkLWJveCB7XG4gICAgICAgICAgICBib3JkZXI6IDJweCBkYXNoZWQgI0NDRDFENjtcbiAgICAgICAgICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xuICAgICAgICAgICAgY29sb3I6ICM0YjU1NjM7XG4gICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4ycyBlYXNlO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgLnVwbG9hZC1ib3g6aG92ZXIge1xuICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiAjM2I4MmY2O1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZmFmYjtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgIC51cGxvYWQtYm94IGkge1xuICAgICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgLnVwbG9hZC1ib3ggaW5wdXRbdHlwZT1cImZpbGVcIl0ge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgIC51cGxvYWQtcHJvZ3Jlc3Mge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgICBnYXA6IDRweDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogOHB4O1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgLnVwbG9hZC1wcm9ncmVzcyAuZmlsZW5hbWUge1xuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgICAgIGNvbG9yOiAjMzc0MTUxO1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgLnNpemUtYW5kLXJlbW92ZS1jbnRucntcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICAudXBsb2FkLXByb2dyZXNzIC5zaXplIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICAgIGNvbG9yOiAjNkI3MjgwO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgLnVwbG9hZC1wcm9ncmVzcyAucHJvZ3Jlc3MtYmFyIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2U1ZTdlYjtcbiAgICAgICAgICAgIGhlaWdodDogNnB4O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgIC51cGxvYWQtcHJvZ3Jlc3MgLnByb2dyZXNzLWZpbGwge1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgd2lkdGg6IDAlO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzNiODJmNjtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IHdpZHRoIDAuMnMgZWFzZTtcbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgIC51cGxvYWQtcHJvZ3Jlc3MgLnJlbW92ZS1idG4ge1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogNnB4O1xuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgY29sb3I6ICNlZjQ0NDQ7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIC5mZWVkYmFjay1tb2RhbC1mb290ZXJ7XG4gICAgICAgICAgICBwYWRkaW5nOiAxNnB4O1xuICAgICAgICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNBRUIzQjk7XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICAuZmVlZGJhY2stbW9kYWwtZm9vdGVyIGRpdntcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgICAgICAgICAgZ2FwOiAxNnB4O1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgLmZlZWRiYWNrLW1vZGFsLWZvb3RlciBkaXYgI2ZiLWNhbmNlbHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDhweCAxMHB4O1xuICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICBjb2xvcjogIzQ1NDU0NTtcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBQb3BwaW5zO1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgLmZlZWRiYWNrLW1vZGFsLWZvb3RlciBkaXYgI2ZiLXN1Ym1pdHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDlweCAxNHB4O1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzcxMDZGRjtcbiAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBcIlBvcHBpbnNcIjtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICAgIH1cbiAgICBgO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVCdXR0b24oKSB7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnRuLmNsYXNzTmFtZSA9ICdmZWVkYmFjay1idG4nO1xuICAgIGJ0bi5pbm5lckhUTUwgPSBgXG4gICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiBmaWxsPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgY2xhc3M9XCJiaSBiaS1jaGF0LWZpbGxcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNOCAxNWM0LjQxOCAwIDgtMy4xMzQgOC03cy0zLjU4Mi03LTgtNy04IDMuMTM0LTggN1xuICAgICAgICBjMCAxLjc2Ljc0MyAzLjM3IDEuOTcgNC42LS4wOTcgMS4wMTYtLjQxNyAyLjEzLS43NzEgXG4gICAgICAgIDIuOTY2LS4wNzkuMTg2LjA3NC4zOTQuMjczLjM2MiAyLjI1Ni0uMzcgMy41OTctLjkzOCBcbiAgICAgICAgNC4xOC0xLjIzNEE5IDkgMCAwIDAgOCAxNVwiLz5cbiAgICAgIDwvc3ZnPiA8c3Bhbj5GZWVkYmFjazwvc3Bhbj5cbiAgICBgO1xuICAgIGJ0bi5vbmNsaWNrID0gKCkgPT4gdGhpcy5zaG93TW9kYWwoKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGJ0bik7XG4gIH1cblxuICBwcml2YXRlIHNob3dNb2RhbCgpIHtcbiAgICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJhY2tkcm9wLmNsYXNzTmFtZSA9ICdmZWVkYmFjay1iYWNrZHJvcCc7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChiYWNrZHJvcCk7XG5cbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2FzaWRlJyk7XG4gICAgbW9kYWwuY2xhc3NOYW1lID0gJ2ZlZWRiYWNrLW1vZGFsJztcblxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250ZW50LmNsYXNzTmFtZSA9ICdmZWVkYmFjay1jb250ZW50JztcblxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVIZWFkZXIobW9kYWwsIGJhY2tkcm9wKSk7XG4gICAgY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZUJvZHkoKSk7XG4gICAgY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZUZvb3Rlcihtb2RhbCwgYmFja2Ryb3ApKTtcblxuICAgIG1vZGFsLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobW9kYWwpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICBiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgfSwgMTApO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVIZWFkZXIobW9kYWw6IEhUTUxFbGVtZW50LCBiYWNrZHJvcDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgaGVhZGVyLmNsYXNzTmFtZSA9ICdmZWVkYmFjay1tb2RhbC1oZWFkZXInO1xuICAgIGhlYWRlci5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDE+RmVlZGJhY2s8L2gxPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY2xvc2UtYnRuXCIgaWQ9XCJjbG9zZUJ0blwiPiZ0aW1lczs8L2J1dHRvbj5cbiAgICAgIDwvZGl2PmA7XG4gICAgaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJyNjbG9zZUJ0bicpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuY2xvc2VNb2RhbChtb2RhbCwgYmFja2Ryb3ApKTtcbiAgICByZXR1cm4gaGVhZGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVCb2R5KCk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWFpbicpO1xuICAgIGJvZHkuY2xhc3NOYW1lID0gJ2ZlZWRiYWNrLW1vZGFsLWJvZHknO1xuXG4gICAgYm9keS5pbm5lckhUTUwgPSBgXG4gICAgICA8Zm9ybSBjbGFzcz1cImZlZWQtYmFjay1mb3JtXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wxMlwiPlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJzdGFyc1wiIGNsYXNzPVwiZm9ybUxhYmVsXCI+SG93IGRvIHlvdSBmZWVsPzwvbGFiZWw+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZlZWRiYWNrLXN0YXJzXCIgaWQ9XCJzdGFyc1wiPlxuICAgICAgICAgICAgJHtbJ/CfmKAnLCAn8J+YnicsICfwn5iQJywgJ/CfmYInLCAn8J+YhCddXG4gICAgICAgICAgICAgIC5tYXAoKGVtb2ppLCBpKSA9PiBgPHNwYW4gZGF0YS12YWx1ZT1cIiR7aSArIDF9XCIgdGl0bGU9XCIke2Vtb2ppfVwiPiR7ZW1vaml9PC9zcGFuPmApXG4gICAgICAgICAgICAgIC5qb2luKCcnKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wxMlwiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm1MYWJlbFwiPkNvbW1lbnRzOjwvbGFiZWw+XG4gICAgICAgICAgPHRleHRhcmVhIGlkPVwiZmItY29tbWVudHNcIiBjbGFzcz1cImZvcm1Db250cm9sXCIgcm93cz1cIjNcIiBtYXhsZW5ndGg9XCIxMDAwXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wxMlwiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm1MYWJlbFwiPldoYXQgY291bGQgYmUgaW1wcm92ZWQ/PC9sYWJlbD5cbiAgICAgICAgICA8dGV4dGFyZWEgaWQ9XCJmYi1pbXByb3ZlbWVudFwiIGNsYXNzPVwiZm9ybUNvbnRyb2xcIiByb3dzPVwiM1wiIG1heGxlbmd0aD1cIjEwMDBcIj48L3RleHRhcmVhPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZpbGVJbnB1dHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sTWQ2XCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtTGFiZWxcIj5BdHRhY2ggYW4gaW1hZ2U6PC9sYWJlbD5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cInVwbG9hZC1ib3hcIj5cbiAgICAgICAgICAgICAgPGk+8J+WvO+4jzwvaT5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1cGxvYWQtdGV4dFwiPkNsaWNrIGhlcmUgdG8gdXBsb2FkIGltYWdlPC9zcGFuPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImZpbGVcIiBpZD1cImZiLWltYWdlXCIgYWNjZXB0PVwiaW1hZ2UvKlwiPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sTWQ2XCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtTGFiZWxcIj5BdHRhY2ggYSB2aWRlbzo8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwidXBsb2FkLWJveFwiPlxuICAgICAgICAgICAgICA8aT7wn46lPC9pPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVwbG9hZC10ZXh0XCI+Q2xpY2sgaGVyZSB0byB1cGxvYWQgdmlkZW88L3NwYW4+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIGlkPVwiZmItdmlkZW9cIiBhY2NlcHQ9XCJ2aWRlby8qXCI+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZm9ybT5gO1xuXG4gICAgLy8gUmF0aW5nXG4gICAgYm9keS5xdWVyeVNlbGVjdG9yQWxsKCcuZmVlZGJhY2stc3RhcnMgc3BhbicpPy5mb3JFYWNoKHNwYW4gPT4ge1xuICAgICAgc3Bhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdGhpcy5yYXRpbmcgPSBOdW1iZXIoc3Bhbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnKSk7XG4gICAgICAgIGJvZHkucXVlcnlTZWxlY3RvckFsbCgnLmZlZWRiYWNrLXN0YXJzIHNwYW4nKS5mb3JFYWNoKHMgPT4gcy5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpKTtcbiAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNldHVwRmlsZUlucHV0KGJvZHkucXVlcnlTZWxlY3RvcignI2ZiLWltYWdlJykgYXMgSFRNTElucHV0RWxlbWVudCwgJ2ltYWdlJyk7XG4gICAgdGhpcy5zZXR1cEZpbGVJbnB1dChib2R5LnF1ZXJ5U2VsZWN0b3IoJyNmYi12aWRlbycpIGFzIEhUTUxJbnB1dEVsZW1lbnQsICd2aWRlbycpO1xuXG4gICAgcmV0dXJuIGJvZHk7XG4gIH1cblxuICAgc2V0dXBGaWxlSW5wdXQgPSAoaW5wdXQ6YW55LCB0eXBlOmFueSkgPT4ge1xuICAgIGNvbnN0IHVwbG9hZEJveCA9IGlucHV0LmNsb3Nlc3QoXCIudXBsb2FkLWJveFwiKTtcbiAgICBjb25zdCBpY29uID0gdXBsb2FkQm94LnF1ZXJ5U2VsZWN0b3IoXCJpXCIpO1xuICAgIGNvbnN0IHRleHQgPSB1cGxvYWRCb3gucXVlcnlTZWxlY3RvcihcIi51cGxvYWQtdGV4dFwiKTtcbiAgXG4gICAgLy8gUHJvZ3Jlc3MgVUkgZWxlbWVudHNcbiAgICBjb25zdCBwcm9ncmVzc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJvZ3Jlc3NEaXYuY2xhc3NOYW1lID0gXCJ1cGxvYWQtcHJvZ3Jlc3NcIjtcbiAgICBwcm9ncmVzc0Rpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIFxuICAgIGNvbnN0IGZpbGVOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmaWxlTmFtZS5jbGFzc05hbWUgPSBcImZpbGVuYW1lXCI7XG4gIFxuICAgIGNvbnN0IGZpbGVTaXplID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmaWxlU2l6ZS5jbGFzc05hbWUgPSBcInNpemVcIjtcbiAgXG4gICAgY29uc3QgYmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBiYXIuY2xhc3NOYW1lID0gXCJwcm9ncmVzcy1iYXJcIjtcbiAgXG4gICAgY29uc3QgZmlsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZmlsbC5jbGFzc05hbWUgPSBcInByb2dyZXNzLWZpbGxcIjtcbiAgXG4gICAgY29uc3QgcmVtb3ZlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICByZW1vdmVCdG4uY2xhc3NOYW1lID0gXCJyZW1vdmUtYnRuXCI7XG4gICAgcmVtb3ZlQnRuLnRleHRDb250ZW50ID0gXCJSZW1vdmVcIjtcbiAgXG4gICAgY29uc3Qgc2l6ZVJlbW92ZUNudG5yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzaXplUmVtb3ZlQ250bnIuY2xhc3NOYW1lID0gXCJzaXplLWFuZC1yZW1vdmUtY250bnJcIjtcbiAgICBzaXplUmVtb3ZlQ250bnIuYXBwZW5kQ2hpbGQoZmlsZVNpemUpO1xuICAgIHNpemVSZW1vdmVDbnRuci5hcHBlbmRDaGlsZChyZW1vdmVCdG4pO1xuICBcbiAgICBiYXIuYXBwZW5kQ2hpbGQoZmlsbCk7XG4gICAgcHJvZ3Jlc3NEaXYuYXBwZW5kQ2hpbGQoZmlsZU5hbWUpO1xuICAgIHByb2dyZXNzRGl2LmFwcGVuZENoaWxkKHNpemVSZW1vdmVDbnRucik7XG4gICAgcHJvZ3Jlc3NEaXYuYXBwZW5kQ2hpbGQoYmFyKTtcbiAgICB1cGxvYWRCb3guYXBwZW5kQ2hpbGQocHJvZ3Jlc3NEaXYpO1xuICBcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGZpbGUgPSBpbnB1dC5maWxlcz8uWzBdO1xuICAgICAgaWYgKCFmaWxlKSByZXR1cm47XG4gIFxuICAgICAgLy8gU2hvdyBwcm9ncmVzcyBVSVxuICAgICAgaWNvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB0ZXh0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIHByb2dyZXNzRGl2LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgXG4gICAgICAvLyBVcGRhdGUgZmlsZW5hbWUgYW5kIHNpemVcbiAgICAgIGZpbGVOYW1lLnRleHRDb250ZW50ID0gZmlsZS5uYW1lO1xuICAgICAgZmlsZVNpemUudGV4dENvbnRlbnQgPSBgJHsoZmlsZS5zaXplIC8gMTAyNCkudG9GaXhlZCgxKX0gS0JgO1xuICBcbiAgICAgIC8vIFJlYWQgZmlsZVxuICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgIHJlYWRlci5vbmxvYWRzdGFydCA9ICgpID0+IHtcbiAgICAgICAgZmlsbC5zdHlsZS53aWR0aCA9IFwiMCVcIjtcbiAgICAgIH07XG4gICAgICByZWFkZXIub25wcm9ncmVzcyA9IChlKSA9PiB7XG4gICAgICAgIGlmIChlLmxlbmd0aENvbXB1dGFibGUpIHtcbiAgICAgICAgICBjb25zdCBwZXJjZW50ID0gKGUubG9hZGVkIC8gZS50b3RhbCkgKiAxMDA7XG4gICAgICAgICAgZmlsbC5zdHlsZS53aWR0aCA9IGAke3BlcmNlbnQudG9GaXhlZCgwKX0lYDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiB7XG4gICAgICAgIGZpbGwuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgY29uc3QgYmFzZTY0ID0gcmVhZGVyLnJlc3VsdDtcbiAgICAgICAgaWYgKHR5cGUgPT09IFwiaW1hZ2VcIikgdGhpcy5pbWFnZUJhc2U2NCA9IGJhc2U2NDtcbiAgICAgICAgZWxzZSB0aGlzLnZpZGVvQmFzZTY0ID0gYmFzZTY0O1xuICAgICAgfTtcbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIH0pO1xuICBcbiAgICByZW1vdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICBpY29uLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgdGV4dC5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgIHByb2dyZXNzRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIGZpbGwuc3R5bGUud2lkdGggPSBcIjAlXCI7XG4gICAgICBmaWxlTmFtZS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICBmaWxlU2l6ZS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICBpZiAodHlwZSA9PT0gXCJpbWFnZVwiKSB0aGlzLmltYWdlQmFzZTY0ID0gXCJcIjtcbiAgICAgIGVsc2UgdGhpcy52aWRlb0Jhc2U2NCA9IFwiXCI7XG4gICAgfSk7XG4gIH07XG4gIFxuXG4gIHByaXZhdGUgY3JlYXRlRm9vdGVyKG1vZGFsOiBIVE1MRWxlbWVudCwgYmFja2Ryb3A6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpO1xuICAgIGZvb3Rlci5jbGFzc05hbWUgPSAnZmVlZGJhY2stbW9kYWwtZm9vdGVyJztcbiAgICBmb290ZXIuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdj5cbiAgICAgICAgPGJ1dHRvbiBpZD1cImZiLWNhbmNlbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGlkPVwiZmItc3VibWl0XCI+U3VibWl0PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgZm9vdGVyLnF1ZXJ5U2VsZWN0b3IoJyNmYi1jYW5jZWwnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmNsb3NlTW9kYWwobW9kYWwsIGJhY2tkcm9wKSk7XG4gICAgZm9vdGVyLnF1ZXJ5U2VsZWN0b3IoJyNmYi1zdWJtaXQnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnN1Ym1pdChtb2RhbCwgYmFja2Ryb3ApKTtcblxuICAgIHJldHVybiBmb290ZXI7XG4gIH1cblxuICBwcml2YXRlIGNsb3NlTW9kYWwobW9kYWw6IEhUTUxFbGVtZW50LCBiYWNrZHJvcDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgbW9kYWwucmVtb3ZlKCk7XG4gICAgICBiYWNrZHJvcC5yZW1vdmUoKTtcbiAgICB9LCAzMDApO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJtaXQobW9kYWw6IEhUTUxFbGVtZW50LCBiYWNrZHJvcDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBjb21tZW50ID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmYi1jb21tZW50cycpIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQpLnZhbHVlLnRyaW0oKTtcbiAgICBjb25zdCBpbXByb3ZlbWVudCA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmItaW1wcm92ZW1lbnQnKSBhcyBIVE1MVGV4dEFyZWFFbGVtZW50KS52YWx1ZS50cmltKCk7XG5cbiAgICBpZiAoIXRoaXMucmF0aW5nKSB7XG4gICAgICBhbGVydCgnUGxlYXNlIHNlbGVjdCBhIHJhdGluZy4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWNvbW1lbnQpIHtcbiAgICAgIGFsZXJ0KCdQbGVhc2UgZW50ZXIgYSBjb21tZW50LicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICB1c2VybmFtZTogdGhpcy5jb25maWc/LnVzZXIsXG4gICAgICByYXRpbmc6IHRoaXMucmF0aW5nLFxuICAgICAgY29tbWVudCxcbiAgICAgIGltcHJvdmVtZW50LFxuICAgICAgaW1hZ2U6IHRoaXMuaW1hZ2VCYXNlNjQsXG4gICAgICB2aWRlbzogdGhpcy52aWRlb0Jhc2U2NFxuICAgIH07XG5cbiAgICBmZXRjaCgnaHR0cHM6Ly8xOTIuMTY4LjEuMTk6MjAwMC9mZWVkYmFjay9mZWVkYmFjay8nLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZClcbiAgICB9KVxuICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKCFyZXMub2spIHRocm93IG5ldyBFcnJvcignU2VydmVyIGVycm9yJyk7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgYWxlcnQoJ+KchSBGZWVkYmFjayBzdWJtaXR0ZWQhJyk7XG4gICAgICAgIHRoaXMuY2xvc2VNb2RhbChtb2RhbCwgYmFja2Ryb3ApO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCfinYwgRXJyb3Igc3VibWl0dGluZyBmZWVkYmFjazonLCBlcnIpO1xuICAgICAgICBhbGVydCgn4p2MIEVycm9yIHN1Ym1pdHRpbmcgZmVlZGJhY2suJyk7XG4gICAgICB9KTtcbiAgfVxufVxuIl19