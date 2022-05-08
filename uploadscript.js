const files={}
function onClick(id){
  const dragDropList = document.getElementById("drag-drop-list");
  if(id)  delete files[id];
  let html="";
  const keys=Object.keys(files);
  for(let i=0;i<keys.length;i++){
    html+='<div class="drag-drop-list-element">' + files[keys[i]].name +`<button onclick="onClick(${files[keys[i]].lastModified})">X</button></div>\n`
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
