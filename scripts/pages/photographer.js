//Mettre le code JavaScript lié à la page photographer.html
const urlsearchParams = new URLSearchParams(document.location.search);
const photographerID = parseInt(urlsearchParams.get("id"));

function displayPhotographerHeader(photographers)
{
    const photographerSection = document.querySelector(".photograph-header");
    const buttonModal = document.querySelector('button');
    photographers.forEach((photographer) => {
        if(photographer.id === photographerID){
            const photographerModel = photographerFactory(photographer);
            const divPhotographerDescription = photographerModel.getUserHeader();
            divPhotographerDescription.classList.add("descriptionUser");
            photographerSection.insertBefore(divPhotographerDescription,buttonModal);
            photographerSection.appendChild(photographerModel.imgUser);
        }
    });
}

async function init2(){
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    displayPhotographerHeader(photographers);
}

init2();