const fileInput = document.querySelector('.file-input'),
filterOptions =document.querySelectorAll('.filter button'),
filterName =document.querySelector('.filter-info .name'),
filterValue =document.querySelector('.filter-info .value'),
filterSlider =document.querySelector('.slider input'),
rotateOptions =document.querySelectorAll('.rotate button'),
previewImg =document.querySelector('.preview-img img'),
resetImgBtn =document.querySelector('.reset-filter'),
saveImgBtn =document.querySelector('.save-img'),
chooseImgBtn =document.querySelector('.choose-img');


let brightness = 100, saturation  = 100, inversion = 0,  grayscale = 0; // intizial the value of filter
let rotate = 0 , flipVertical = 1 , flipHorizontal =1;
const applyFilter = ()=>{
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipVertical} , ${flipHorizontal})`
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

const loadImage = ()=>{
    let file = fileInput.files[0]; //getting the user seleted file 
    if(!file) return; //return if user hasnot selected file
    previewImg.src = URL.createObjectURL(file); //passing file url as preview img src
    previewImg.addEventListener('load' , ()=>{
    resetImgBtn.click();//clicking the reset button when new image is loaded
    document.querySelector('.container').classList.remove('disabled'); // all button are avaliavble only when photo is selected
    });
   
    
}



filterOptions.forEach(option =>{
    option.addEventListener('click', ()=>{ //adding click event listener to all filter buttons
        document.querySelector('.filter .active').classList.remove('active');
        option.classList.add('active'); //for active the button
        filterName.innerText = option.innerText; //changing the filter name 
         if(option.id === "brightness"){  //changing the value for seleted filter
            filterSlider.max = 200;
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
         }
          else if(option.id === "saturation"){
            filterSlider.max = 200;
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
         }
         else if(option.id === "inversion"){
            filterSlider.max = 100;
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
         }else{
            filterSlider.max = 100;
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
         }

    });
});

const updateFilter = ()=>{
    //changing the silder value
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector('.filter .active'); // getting the seleted filter info

    //updating the value of slider when the button is seleted
    if(selectedFilter.id === "brightness"){
        brightness = filterSlider.value;

    }else if(selectedFilter.id ==="saturation"){
        saturation = filterSlider.value;
    }else if(selectedFilter.id === "inversion"){
        inversion = filterSlider.value;

    }else{
        grayscale = filterSlider.value;
    }
    applyFilter();
}

rotateOptions.forEach(option =>{
    option.addEventListener('click' , ()=>{ //adding click event listener to all the rotate/flip buttons
        if(option.id ===  "left"){
            rotate -= 90;
        }else if(option.id === "right"){
            rotate +=90;
        }else if(option.id === "vertical"){
            flipVertical = flipVertical === 1?-1:1;  //flip the photo to vertical
        }else{
            flipHorizontal = flipHorizontal === 1?-1:1;
        }


        applyFilter();
    });

});

const resetFilter =()=>{
    brightness = 100, saturation  = 100, inversion = 0,  grayscale = 0; //resetting the filters
 rotate = 0 , flipVertical = 1 , flipHorizontal =1;
    filterOptions[0].click()//clicking brightness btn, so the brightness seleted by default
    applyFilter();

}

const saveImage = ()=>{
   let canvas = document.createElement('canvas'); // creating the canvas element
   let ctx = canvas.getContext('2d'); //canvas.getContext return a drawing context on the canvas 
   canvas.width = previewImg.naturalWidth; //setting canvas width to actual image width
   canvas.height = previewImg.naturalHeight; //setting canvas height to actual image height

   //applying user selected filter canvas filter
   ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
   ctx.translate(canvas.width/2,canvas.height/2); //translating canvas from the center
   if(rotate !== 0){  // if rotate value is'nt 0,rotate the canvas
     ctx.rotate(rotate * Math.PI / 180);

   }
   ctx.scale(flipVertical,flipHorizontal);
    ctx.drawImage(previewImg,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);

    const link = document.createElement('a'); // creating <a> element 
    link.download= "image.png"; //passing <a> tag download value to "image.png"
    link.href = canvas.toDataURL();
    link.click();
   
}

fileInput.addEventListener('change', loadImage);
filterSlider.addEventListener('input' , updateFilter);
resetImgBtn.addEventListener('click',resetFilter);
saveImgBtn.addEventListener('click',saveImage);
chooseImgBtn.addEventListener('click' ,()=> fileInput.click() ); //for taking the input of image file