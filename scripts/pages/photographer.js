//Mettre le code JavaScript lié à la page photographer.html
let display = 0;

function displayDataPhotographer(photographers, media)
{
    const urlsearchParams = new URLSearchParams(document.location.search);
    const photographerID = parseInt(urlsearchParams.get("id"));
    const main = document.querySelector("#main");
    const rate = document.querySelector(".rate");
    const picturesSection = document.createElement("section");
    const select = document.querySelector(".sort-select");
    picturesSection.setAttribute("class","pictures");
    main.insertBefore(picturesSection,rate);
    const testArray = [];
    photographers.forEach((photographer) => {
        if(photographer.id === photographerID){
            display++;
            const photographerModel = photographerFactory(photographer);
            if(display === 1){
                photographerModel.getUserHeader();
                photographerModel.getUserRate();
            }
            media.forEach((media) => {
                if(photographerID === media.photographerId){
                    testArray.push(media.date);
                    const mediaModel = mediaFactory(media,photographerModel.name);
                    picturesSection.appendChild(mediaModel.getPictureCardDOM());
                }
            })

        }
    });
    if(select.value === "date"){    
        console.log(testArray);
    }
}

async function init2(){
    // Récupère les datas des photographes
    const selectInput = document.querySelector(".sort-select");
    const photographers = await getPhotographersOrMedia("photographers");
    const media = await getPhotographersOrMedia("media");
    const sortMedia = getSortArray(media, selectInput.value);
    displayDataPhotographer(photographers, sortMedia);
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

init2();