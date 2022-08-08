//Mettre le code JavaScript lié à la page photographer.html

import { getPhotographersOrMedia } from "./index.js";

function displayData(photographers, media)
{
    const urlsearchParams = new URLSearchParams(document.location.search);
    const photographerID = parseInt(urlsearchParams.get("id"));
    const picturesSection = document.querySelector(".pictures");
    const mediaArray = [];
    photographers.forEach((photographer) => {
        if(photographer.id === photographerID){
            const photographerModel = photographerFactory(photographer);
            photographerModel.getUserHeader();
            photographerModel.getUserRate();
            media.forEach((media) => {
                if(photographerID === media.photographerId){
                    mediaArray.push(media);
                    //const mediaModel = mediaFactory(media,photographerModel.name);
                    //picturesSection.appendChild(mediaModel.getPictureCardDOM());
                }
            })
        }
    });
}

async function init(){
    // Récupère les datas des photographes
    const photographers = await getPhotographersOrMedia("photographers");
    const media = await getPhotographersOrMedia("media");
    displayData(photographers, media);
}



init();