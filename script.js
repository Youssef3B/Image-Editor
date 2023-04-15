let saturate = document.getElementById('saturate');
let brightness = document.getElementById('brightness');
let grayscale = document.getElementById('grayscale');
let sepia = document.getElementById('sepia');
let blur = document.getElementById('blur');
let huerotate = document.getElementById('hue-rotate');


let image = document.getElementById('image');
let choseimage = document.getElementById('chose_image');
let save_image = document.getElementById('save_image');
let reset = document.getElementById('reset');

let left = document.getElementById('left');
let right = document.getElementById('right');
let horizontal = document.getElementById('horizontal');
let vertical = document.getElementById('vertical');

let rotation = 0;
let isVerticalFlipped = false;
let isHorizontalFlipped = false;

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');

let filters = document.querySelectorAll(".filters input");



save_image.onclick = function(){
    canvas.width = image.naturalWidth * 2;
    canvas.height = image.naturalHeight * 2;
    
    

    // Create temporary image element
    let tempImage = new Image();

    // Apply same transforms and filters to temporary image as main image
    tempImage.src = image.src;
    tempImage.onload = function() {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rotation * Math.PI / 180);
      ctx.scale(isHorizontalFlipped ? -1 : 1, isVerticalFlipped ? -1 : 1);
      ctx.filter = `
        saturate(${saturate.value}%)
        brightness(${brightness.value}%)
        grayscale(${grayscale.value}%)
        sepia(${sepia.value}%)
        blur(${blur.value}px)
        hue-rotate(${huerotate.value}deg)
      `;
      ctx.drawImage(tempImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
      ctx.restore();

      // Download the edited image
      let link = document.createElement('a');
      link.download = 'edited-image.jpeg';
      link.href = canvas.toDataURL("image/jpeg", 0.9);
      link.click();
    }
};

  



function resetvalues(){
    image.style.filter = "none";
    saturate.value = "100";
    brightness.value = "100";
    grayscale.value = "0";
    sepia.value = "0";
    blur.value = "0";
    huerotate.value = "0";
    image.style= "initial";
}

reset.addEventListener("click", function(){
    resetvalues();
})

window.onload = function(){
    save_image.style.display = 'none';
    reset.style.display = 'none';
    for (let i = 0; i < filters.length; i++) {
        filters[i].disabled = true;
      }
      left.disabled = true;
      right.disabled = true;
      vertical.disabled = true;
      horizontal.disabled = true;
}

choseimage.onchange = function(){
    resetvalues();
    save_image.style.display = 'inline-block';
    reset.style.display = 'block';
    for (let i = 0; i < filters.length; i++) {
        filters[i].disabled = false;
      }
      left.disabled = false;
      right.disabled =false;
      vertical.disabled = false;
      horizontal.disabled = false;
    let file = new FileReader();
    file.readAsDataURL(choseimage.files[0]);
    file.onload = function(){
        console.log(file.result);
        image.src = file.result;
    }
   
    
}
left.addEventListener("click", function(){
    rotation += 90;
    image.style.transform = `rotate(${rotation}deg)`;

})
right.addEventListener("click",function(){
    rotation -= 90;
    image.style.transform = `rotate(${rotation}deg)`;
})

horizontal.addEventListener("click",function(){
    if (!isHorizontalFlipped) {
        // Flip image horizontally
        image.style.transform += ' scaleX(-1)';
        isHorizontalFlipped = true;
      } else {
        // Flip image back to normal
        image.style.transform = image.style.transform.replace(' scaleX(-1)', '');
        isHorizontalFlipped = false;
      }
})
vertical.addEventListener("click",function(){
    if (!isVerticalFlipped) {
        // Flip image vertically
        image.style.transform += ' scaleY(-1)';
        isVerticalFlipped = true;
      } else {
        // Flip image back to normal
        image.style.transform = image.style.transform.replace(' scaleY(-1)', '');
        isVerticalFlipped = false;
      }

})


filters.forEach(function(filter){
    filter.addEventListener("input", function(){
        image.style.filter = `
            saturate(${saturate.value}%)
            brightness(${brightness.value}%)
            grayscale(${grayscale.value}%)
            sepia(${sepia.value}%)           
            blur(${blur.value}px)           
            hue-rotate(${huerotate.value}deg)           
        `       
    })
   
})

