const files={}
function onClick(id){
  const dragDropList = document.getElementById("drag-drop-list");
  if(id)  delete files[id];
  let html='<h4 class="drag-drop-list-heading">Uploaded files</h4>\n';
  const keys=Object.keys(files);
  for(let i=0;i<keys.length;i++){
    html+='<div class="drag-drop-list-element"><div class="drag-drop-list-element-text">' + files[keys[i]].name +`</div><button onclick="onClick(${files[keys[i]].lastModified})"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="20" height="20"
viewBox="0 0 172 172"
style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g id="original-icon" fill="#e74c3c"><path d="M86,14.33333c-11.81018,0 -21.5,9.68982 -21.5,21.5h-37.625c-1.93842,-0.02741 -3.74144,0.99102 -4.71865,2.66532c-0.97721,1.6743 -0.97721,3.74507 0,5.41937c0.97721,1.6743 2.78023,2.69273 4.71865,2.66532h8.95833v91.375c0,10.86825 8.84008,19.70833 19.70833,19.70833h60.91667c10.86825,0 19.70833,-8.84008 19.70833,-19.70833v-91.375h8.95833c1.93842,0.02741 3.74144,-0.99102 4.71865,-2.66532c0.97721,-1.6743 0.97721,-3.74507 0,-5.41937c-0.97721,-1.6743 -2.78023,-2.69273 -4.71865,-2.66532h-37.625c0,-11.81018 -9.68982,-21.5 -21.5,-21.5zM86,25.08333c5.99898,0 10.75,4.75102 10.75,10.75h-21.5c0,-5.99898 4.75102,-10.75 10.75,-10.75zM69.875,64.5c2.967,0 5.375,2.408 5.375,5.375v53.75c0,2.967 -2.408,5.375 -5.375,5.375c-2.967,0 -5.375,-2.408 -5.375,-5.375v-53.75c0,-2.967 2.408,-5.375 5.375,-5.375zM102.125,64.5c2.967,0 5.375,2.408 5.375,5.375v53.75c0,2.967 -2.408,5.375 -5.375,5.375c-2.967,0 -5.375,-2.408 -5.375,-5.375v-53.75c0,-2.967 2.408,-5.375 5.375,-5.375z"></path></g></g></svg></button></div>\n`
  }
  dragDropList.innerHTML=html;
}
window.addEventListener("DOMContentLoaded", () => {
  const dragDropAreas = document.getElementsByClassName("drag-drop-area");
  const dragDropList = document.getElementById("drag-drop-list");
  for (let area of dragDropAreas) {
    let parentEl = area.parentElement.parentElement;
    let progressThumb = parentEl.querySelector(
      ".drag-drop-progress-loader-thumb"
    );
    let uploadBtn = parentEl.querySelector(".drag-drop-area-button");
    let fileDialog = parentEl.querySelector(".file-dialog");

    const onUploadFiles = (files) => {
      console.log(files) // FileList → https://developer.mozilla.org/en-US/docs/Web/API/FileList

      progressThumb.style.width = 0;

      if (parentEl.classList.contains("active")) {
        parentEl.classList.remove("active");
      }

      parentEl.classList.add("dropped-anim");
      parentEl.classList.add("dropped");

      setTimeout(() => {
        parentEl.classList.remove("dropped-anim");

        // Fake upload simulation
        let uploadProgress = 0;
        let timer = setInterval(() => {
          uploadProgress++;

          progressThumb.style.width = uploadProgress + "%";

          if (uploadProgress === 100) {
            clearInterval(timer);
            setTimeout(() => {
              parentEl.classList.remove("dropped"); // Remove this class when uploading is finished
            }, 400);
          }
        }, 15);
      }, 800);
    }

    // Upload using dragging
    area.addEventListener("dragenter", (e) => {
      e.preventDefault();
      if (!parentEl.classList.contains("active")) {
        parentEl.classList.add("active");
      }
    });
    area.addEventListener("dragleave", (e) => {
      e.preventDefault();
      if (parentEl.classList.contains("active")) {
        parentEl.classList.remove("active");
      }
    });
    area.addEventListener("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();

      onUploadFiles(e.dataTransfer.files);
    });
    area.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    // Upload using button
    uploadBtn.addEventListener("click", () => {
      fileDialog.click();
    });

    fileDialog.addEventListener("change", () => {
      onUploadFiles(fileDialog.files);
      for (let i = 0; i < fileDialog.files.length; i++) files[fileDialog.files[i].lastModified] = fileDialog.files[i];
      onClick();
    })



  }
});
