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
    const dateArray = [];
    let allLikes = 0;
    photographers.forEach((photographer) => { 
        if(photographer.id === photographerID){
            display++;
            const photographerModel = photographerFactory(photographer);   
            media.forEach((media) => {
                if(photographerID === media.photographerId){
                    allLikes += media.likes;
                    console.log(allLikes);
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
    document.querySelectorAll(".heart").forEach(heart => heart.addEventListener("click", function likePicture(e){
        const rate = parseInt(document.querySelector(".rate").textContent)+1;
        const nbrOfLikes = parseInt(e.target.parentNode.children[0].textContent);
        const addLike = nbrOfLikes + 1;
        document.querySelector(".rate").textContent = rate.toString();
        e.target.parentNode.children[0].textContent = addLike.toString();
        heart.style.cursor = "auto"; 
        this.removeEventListener("click", likePicture);
    }));
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



init2();