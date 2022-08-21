//Mettre le code JavaScript lié à la page photographer.html
let display = 0;

function displayDataPhotographer(photographers, media)
{
    const urlsearchParams = new URLSearchParams(document.location.search);
    const photographerID = parseInt(urlsearchParams.get("id"));
    const main = document.querySelector("#main");
    const rate = document.querySelector(".rateDiv");
    const picturesSection = document.createElement("section");
    const select = document.querySelector(".sort-select");
    picturesSection.classList.add("pictures");
    main.insertBefore(picturesSection,rate);
    const dateArray = [];
    let allLikes = 0;
    photographers.forEach((photographer) => { 
        if(photographer.id === photographerID){
            display++;
            const photographerModel = photographerFactory(photographer);   
            media.forEach((media) => {
                if(photographerID === media.photographerId){
                    allLikes += media.likes;
                    dateArray.push(media.date);
                    const mediaModel = mediaFactory(media,photographerModel.name);
                    picturesSection.appendChild(mediaModel.getPictureCardDOM());
                }
            })
            if(display === 1){   
                photographerModel.getUserHeader();
                photographerModel.getUserRate(allLikes);
            }
        }
    });
    if(select.value === "date"){    
        console.log(dateArray);
    }
}

async function init2(){
    // Récupère les datas des photographes
    const selectInput = document.querySelector(".sort-select");
    const photographers = await getPhotographersOrMedia("photographers");
    const media = await getPhotographersOrMedia("media");
    const sortMedia = getSortArray(media, selectInput.value);
    displayDataPhotographer(photographers, sortMedia);
    document.querySelectorAll(".heart").forEach(heart => heart.addEventListener("click", clickLikeEvent));
    document.querySelectorAll(".heart").forEach(heart => heart.addEventListener("keyup", enterLikeEvent));
    const links = document.querySelectorAll('img[src$=".jpg"], video[src$=".mp4"]');
    const linksList = Array.from(links).splice(1);
    linksList.forEach( link => link.addEventListener('click', function buildEvent(e){
        buildDOMLightbox(e.target, linksList);
        document.removeEventListener("click",buildEvent);
    }));
}

function getSortArray(media,select){
    switch(select){
        case "popularity" :
            return media.sort((a,b) => b.likes - a.likes);
        case "date" : 
            return media.sort((a,b) => new Date(b.date) - new Date(a.date));
        case "title" :
            return media.sort((a,b) =>{
                return a.title.localeCompare(b.title);
            });
    }
}

function removePictures(){
    const sectionPicture = document.querySelector(".pictures");
    sectionPicture.remove();
}

function sortPicture(){
    removePictures();
    init2();
}

function clickLikeEvent(e){
    addlikeMedia(e);
    this.removeEventListener("click", clickLikeEvent);
    this.removeEventListener("keyup", enterLikeEvent);
}

function enterLikeEvent(e){
    if(e.key === "Enter"){
        addlikeMedia(e);
        this.removeEventListener("keyup",enterLikeEvent);
        this.removeEventListener("click",clickLikeEvent);
    }
}

function addlikeMedia(event){
    const rate = parseInt(document.querySelector(".rate").textContent)+1;
    document.querySelector(".rate").textContent = rate.toString();
    const nbrOfLikes = parseInt(event.target.parentNode.children[0].textContent);
    const addLike = nbrOfLikes + 1;
    event.target.parentNode.children[0].textContent = addLike.toString();
    //console.log(event);
    event.target.style.cursor = "auto";
}

function deleteFocus(){
    const elementsFocus = document.querySelectorAll("*[tabindex]");
    elementsFocus.forEach(elementFocus => {
        elementFocus.setAttribute("tabindex","-1");
    });
}

function activeFocus(){
    const elementsUnfocus = document.querySelectorAll("*[tabindex]");
    //console.log(elementsUnfocus);
    elementsUnfocus.forEach(elementUnfocus => {
        if(elementUnfocus.className === "rate_div" || elementUnfocus.className === "price_photographer"){
            elementUnfocus.setAttribute("tabindex","0");
        }
        else{
            elementUnfocus.setAttribute("tabindex","1");
        }
    });
}

init2();