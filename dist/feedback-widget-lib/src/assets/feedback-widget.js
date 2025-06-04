mainFunction = () => {
    let config = {};
    let rating = 0;
    let imageBase64 = "";
    let videoBase64 = "";
    const chatFillIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-fill" viewBox="0 0 16 16">
    <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15"/>
  </svg>`;
  
    function init(userConfig) {
      config = userConfig;
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", startWidget);
      } else {
        startWidget();
      }
    }
  
    const startWidget = () => {
      loadFont();
      injectStyles();
      createButton();
    };
  
    const loadFont = () => {
      if (!document.getElementById("poppins-font")) {
        const link = document.createElement("link");
        link.id = "poppins-font";
        link.rel = "stylesheet";
        link.href =
          "https://fonts.googleapis.com/css2?family=Poppins&display=swap";
        document.head.appendChild(link);
      }
    };
  
    const injectStyles = () => {
      const css = `
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
  
      const style = document.createElement("style");
      style.innerText = css;
      document.head.appendChild(style);
    };
  
    const createButton = () => {
      const btn = document.createElement("button");
      btn.className = "feedback-btn";
      btn.innerHTML = `${chatFillIcon} <span>Feedback</span>`;
      btn.onclick = showModal;
      document.body.appendChild(btn);
    };
  
    const showModal = () => {
      const backdrop = document.createElement("div");
      backdrop.className = "feedback-backdrop";
      document.body.appendChild(backdrop);
  
      const modal = document.createElement("aside");
      modal.className = "feedback-modal";
  
      const content = document.createElement("div");
      content.className = "feedback-content";
  
      content.appendChild(modalHeader());
      content.appendChild(modalBody());
      content.appendChild(modalFooter());
  
      modal.appendChild(content);
  
      document.body.appendChild(modal);
  
      setTimeout(() => {
        modal.classList.add("show");
        backdrop.classList.add("show");
      }, 10);
  
      modal.querySelector("#closeBtn").onclick = () =>
        closeModal(modal, backdrop);
  
      modal.querySelector("#fb-cancel").onclick = () =>
        closeModal(modal, backdrop);
  
      modal.querySelector("#fb-submit").onclick = () => submitFeedback(modal, backdrop);
    };
  
    const closeModal = (modal, backdrop) => {
      modal.classList.remove("show");
      backdrop.classList.remove("show");
  
      setTimeout(() => {
        modal.remove();
        backdrop.remove();
      }, 300);
    };
  
    const modalHeader = () => {
      const header = document.createElement("header");
      header.className = "feedback-modal-header";
      header.innerHTML = `
          <div>
              <h1>Feedback</h1>
              <button class="close-btn" id="closeBtn">&times;</button>
          </div>
      `;
      return header;
    };
  
    const modalBody = () => {
      const body = document.createElement("main");
      body.className = "feedback-modal-body";
      body.innerHTML = `
          <div>
              <form class="feed-back-form">
                  <div class="col12">
                      <label for="stars" class="formLabel">How do you feel?</label>
                      <div class="feedback-stars" id="stars" role="select">
                          ${[
                            { value: 1, emoji: "😠", label: "Angry" },
                            { value: 2, emoji: "😞", label: "Unhappy" },
                            { value: 3, emoji: "😐", label: "Neutral" },
                            { value: 4, emoji: "🙂", label: "Good" },
                            { value: 5, emoji: "😄", label: "Happy" },
                          ]
                            .map(
                              (i) =>
                                `<span data-value="${i.value}" title="${i.label}">${i.emoji}</span>`
                            )
                            .join("")}
                      </div>
                  </div>
                  <div class="col12">
                      <label for="fb-comments" class="formLabel">Comments:</label>
                      <textarea id="fb-comments" class="formControl" rows="3" placeholder="Write your comments..." maxlength="1000"></textarea>   
                  </div>
                  <div class="col12">
                      <label for="fb-improvement" class="formLabel">What could be improved?</label>
                      <textarea id="fb-improvement" class="formControl" rows="3" placeholder="Your suggestions" maxlength="1000"></textarea>   
                  </div>
                  <div class="fileInputs">
                    <div class="colMd6">
                        <label for="fb-image" class="formLabel">Attach an image:</label>
                        <label for="fb-image" class="upload-box" id="imageUploadBox">
                          <i>🖼️</i>
                          <span class="upload-text">Click here to upload image</span>
                          <input type="file" id="fb-image" accept="image/*">
                        </label>
                    </div>
                    <div class="colMd6">
                        <label for="fb-video" class="formLabel">Attach a video:</label>
                        <label for="fb-video" class="upload-box" id="videoUploadBox">
                          <i>🎥</i>
                          <span class="upload-text">Click here to upload video</span>
                          <input type="file" id="fb-video" accept="video/*">
                        </label>
                    </div>
                  </div>
              </form>
          </div>
      `;
  
      ratingEvent(body);
      setupFileInput(body.querySelector("#fb-image"), "image");
      setupFileInput(body.querySelector("#fb-video"), "video");
  
      return body;
    };
  
    const setupFileInput = (input, type) => {
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
      // progressDiv.appendChild(fileSize);
      progressDiv.appendChild(bar);
      // progressDiv.appendChild(removeBtn);
      uploadBox.appendChild(progressDiv);
  
      input.addEventListener("change", () => {
        const file = input.files[0];
        if (!file) return;
  
        icon.style.display = "none";
        text.style.display = "none";
        progressDiv.style.display = "flex";
  
        fileName.textContent = file.name;
        fileSize.textContent = `${(file.size / 1024).toFixed(1)} KB`;
  
        const reader = new FileReader();
        reader.onloadstart = () => (fill.style.width = "0%");
        reader.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = (e.loaded / e.total) * 100;
            fill.style.width = `${percent.toFixed(0)}%`;
          }
        };
        reader.onloadend = () => {
          fill.style.width = "100%";
          const base64 = reader.result;
          if (type === "image") imageBase64 = base64;
          else videoBase64 = base64;
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
        if (type === "image") imageBase64 = null;
        else videoBase64 = null;
      });
    };
  
    const ratingEvent = (body) => {
      // Rating logic
      const stars = body.querySelectorAll(".feedback-stars span");
      stars.forEach((star) => {
        star.addEventListener("click", () => {
          rating = parseInt(star.dataset.value);
          stars.forEach((s) => s.classList.remove("selected"));
          stars[rating - 1].classList.add("selected")
        });
      });
    };
  
    const modalFooter = () => {
      const footer = document.createElement("footer");
      footer.className = "feedback-modal-footer";
      footer.innerHTML = `
          <div>
              <button id="fb-cancel">Cancel</button>
              <button id="fb-submit">Submit</button>
          </div>
      `;
  
      return footer;
    };
  
    const submitFeedback = (modal, backdrop) => {
      const comment = document.getElementById("fb-comments").value.trim();
  
      if (!rating) {
        alert("Please select a rating.");
        return;
      }
  
      if (!comment) {
        alert("Please enter a comment.");
        return;
      }
  
      const improvement = document.getElementById("fb-improvement").value.trim();
  
      console.log('config:------>', config)
  
      const feedback = {
        username: config.user,
        rating,
        comment,
        improvement,
        image: imageBase64,
        video: videoBase64
      };
    
      fetch('https://192.168.1.19:2000/feedback/feedback/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(feedback)
      })
        .then((res) => {
          if (!res.ok) throw new Error("Server error");
          return res.json(); // Optional: parse response if needed
        })
        .then(() => {
          alert("✅ Feedback submitted!");
          closeModal(modal, backdrop);
        })
        .catch((err) => {
          alert("❌ Error submitting feedback.");
          console.error("Submission error:", err);
          console.log("Feedback payload:", feedback);
        });
    }
    
  
  
    return { init };
  };
  
  window.FeedbackWidget = mainFunction();
  