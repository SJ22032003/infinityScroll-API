const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let totalImages = 0;
let imagesLoad = 0;
let ready = false;
let intialLoad = true;
let photosArray = [];

// Unsplash Api
let count = 6;
const apiKey = 'x7Yv12yTMNpK4OgqrMbRx-Pq5g9GLk2pxYrofZQwpXc';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all Image Loaded
function imageLoaded(){
    imagesLoad++;
    if(imagesLoad === totalImages){
        loader.hidden = true;
        ready = true;
        intialLoad = false;
        count = 30;
    }
}
//helper SetAttribute
function setAttributes(element , attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

//Create Elements for links & photos
function displayPhotos(){
    totalImages = photosArray.length
    //Run function for each object in Array
    photosArray.forEach((photo) => {
        //create <a> to unsplash
        const item = document.createElement('a');
        setAttributes(item ,{
            href:photo.links.html,
            target:'_blank',
        })
        //create <img> image for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description===null?'No Description':photo.alt_description,
        })

        //Event Listner, check when Image is fineshed loading
        img.addEventListener('load', imageLoaded);
        //put <img> inside <a> & in image-container
        item.append(img);
        imageContainer.append(item);
    });
}

//Get photos
async function getPhotos(){
    try{
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    }
    catch(error){
        //Alert Error
        imageContainer.innerHTML+= `<h3>There seems to an error</h3><pre>${error}</pre><br>
        The backend will resolve this issue soon. <br>
        <div class='image-container'>
            <img src=noscript/loading.svg></img>
        </div>`;
    }
}

//scrolling to the end for Infinty Scrolling
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        imagesLoad = 0;
        getPhotos();
    }
})

//On load
getPhotos();