function buildDOMLightbox(element){
    //On construit le DOM de la lightbox
    const main = document.querySelector("main");
    const header = document.querySelector("header");
    const lightbox = document.querySelector(".lightbox");
    const close = document.querySelector(".close_lightbox");
    const arrowLeft = document.querySelector(".lightbox_prev");
    const arrowRight = document.querySelector(".lightbox_next");
    const figure = document.querySelector('.pictureContainer_lightbox');
    const figcaption = document.createElement("figcaption");
    const h3= document.createElement("h3");
    h3.classList.add("media_h3");
    figcaption.classList.add('figcaption_lightbox');
    //On configure le masquage du lecteur audio
    main.setAttribute("aria-hidden","true");
    header.setAttribute("aria-hidden","true");
    lightbox.setAttribute("aria-hidden","false");
    //On enlève le focus de notre page
    deleteMainFocus();
    //Si l'élément selectionné correspond à une image alors on construit notre nouvelle élément
    //et on l'ajoute à notre DOM 
    if(element.src.match(/\.jpg/)){
        const image = document.createElement("img");
        image.setAttribute("tabindex","1");
        image.setAttribute('src',element.getAttribute('src'));
        image.setAttribute('alt', `${element.getAttribute('alt')} image`);
        image.classList.add("media_lightbox");
        figure.appendChild(image);
    }
    //Sinon l'élément sélectionné correspond à une vidéo et on construit notre nouvelle élément
    //et on l'ajoute a notre DOM
    else{
        const video = document.createElement("video");
        video.setAttribute("tabindex","1");
        video.setAttribute('src',element.getAttribute("src"));
        video.setAttribute('aria-label', `${element.getAttribute("aria-label")}`);
        video.setAttribute("controls", "true");
        video.classList.add("media_lightbox");
        figure.appendChild(video);
        video.focus();
    }
    //On défini le contenu de la description de notre média grâce au propriété de l'élément sélectionné
    h3.textContent = element.nextElementSibling.children[0].textContent;
    h3.setAttribute("id","dialog");
    //puis on configure le reste des tabindex et on finis la construction du DOM de la lighbox
    h3.setAttribute("tabindex","1");
    close.setAttribute("tabindex","0");
    arrowLeft.setAttribute("tabindex","0");
    arrowRight.setAttribute("tabindex","0");
    figcaption.appendChild(h3);
    figure.appendChild(figcaption);
    lightbox.style.display = "block";
    //Enfin on définis l'appel de nos évènements via les fonctions définis plus loins dans le code
    close.addEventListener("keyup",enterEvent);
    document.addEventListener("keyup",onKeyUp);
    arrowLeft.addEventListener("keyup",enterEvent);
    arrowLeft.addEventListener("click",previousEvent);
    arrowRight.addEventListener("keyup",enterEvent);
    arrowRight.addEventListener("click",nextEvent);
    close.addEventListener("click",closeLightbox);
    //Enfin on met le focus sur notre media lors de l'ouverture de la lightbox
    document.querySelector(".media_lightbox").focus();
}

//ici, on configure l'évènement lors du relachement de la touche entrée
function enterEvent(e){
    console.log(e);
    if(e.key === "Enter"){
        //On appelle les fonctions correspondant à l'élément séléctioné
        switch(e.target.alt){
            case "next image":
                nextEvent();
                break;
            case "previous image":
                previousEvent();
                break;
            case "Ferme la dialog":
                closeLightbox();
        }
    }
}

//Cette fonction sert à définir l'incrémentation de notre liste de média
function nextEvent(){
    const increment = 1;
    //on appelle la fonction pour charger le média suivant en lui passant en argument l'incrémentation 
    loadNewMedia(increment);
}
//Cette fonction sert à définir la décrémentation de notre liste de média
function previousEvent(){
    const decrement = -1;
    //on appelle la fonction pour charger le média précédent en lui passant en argument la décrémentation 
    loadNewMedia(decrement);
}

//ici, on configure les évènement keyup en appellant les fonctions correspondant à la touche relachées 
function onKeyUp(e){
    switch(e.key){
        case "Escape":
            closeLightbox();
            break;
        case "ArrowRight":
            nextEvent();
            break;
        case "ArrowLeft":
            previousEvent();        
    }
}

function closeLightbox(){
    //On apelle nos élements de la lightbox
    const close = document.querySelector(".close_lightbox");
    const lightbox = document.querySelector(".lightbox");
    const figure = document.querySelector('.pictureContainer_lightbox');
    const media = document.querySelector('.media_lightbox');
    const figcaption = document.querySelector('.figcaption_lightbox');
    const main = document.querySelector("main");
    const header = document.querySelector("header");
    const arrowLeft = document.querySelector(".lightbox_prev");
    const arrowRight = document.querySelector(".lightbox_next");
    //On configure le masquage du lecteur audio
    main.setAttribute("aria-hidden","false");
    header.setAttribute("aria-hidden","false");
    lightbox.setAttribute("aria-hidden","true");
    document.querySelector(".close_lightbox").removeAttribute("tabindex");
    //On supprime les tabindex de notre lightbox
    arrowLeft.removeAttribute("tabindex");
    media.removeAttribute("tabindex");
    figcaption.removeAttribute("tabindex");
    arrowRight.removeAttribute("tabindex");
    //On réinitialise la lightbox à son état inital en supprimant le média courant et sa description
    figure.removeChild(media);
    figure.removeChild(figcaption);
    //Puis on supprime son affichage
    lightbox.style.display = "none";
    //Et on enlève bien les évènements de la lightbox pour ne pas avoir des conflits lors du prochain appel de celle-ci 
    document.removeEventListener("keyup",onKeyUp);
    arrowLeft.removeEventListener("click",previousEvent);
    arrowLeft.removeEventListener("keyup",enterEvent);
    arrowRight.removeEventListener("click",nextEvent);
    arrowRight.removeEventListener("keyup",enterEvent);
    close.removeEventListener("click",closeLightbox);
    close.removeEventListener("keyup",enterEvent);
    //Enfin on réactive les focus de notre page principale
    activeMainFocus();
}

//Cette fonction nous permet de charger le média en fonction du compteur passé en paramètre (- ou +)
function loadNewMedia(counter){
    //Convertit la liste d'éléments en tableau et enlève le 1er élément correspondant à l'image de profil du photographe
    const links = Array.from(document.querySelectorAll('img[src$=".jpg"], video[src$=".mp4"]')).splice(1);
    //Ensuite on enlève le dernier élément du tableau correspondant à l'image courante de la lightbox 
    //sinon on boucle sans cesse sur notre liste lors de la décrementation 
    const linksList = links.splice(0,links.length-1);
    //On appel nos élements de la lightbox déja existants  
    const mediaCurrent = document.querySelector(".media_lightbox");
    const figure = document.querySelector('.pictureContainer_lightbox');
    const figcaption = document.querySelector(".figcaption_lightbox");
    const h3 = document.querySelector(".media_h3");
    //On boucle sur la liste modifié de média 
    for( let i= 0; i < linksList.length; i++)
    {
        //Si le chemin du média courant correspond au chemin d'un élément de la liste de média et si un élément correspondant a la liste de média avec
        //l'index courant + le compteur est définis et est une image 
        if(mediaCurrent.src === linksList[i].src && linksList[i+counter] !== undefined && linksList[i+counter].tagName === "IMG"){
            //alors on construit la nouvelle image avec sa description 
            const newImg = document.createElement("img");
            newImg.setAttribute("src",linksList[i+counter].src);
            newImg.setAttribute("alt",`${linksList[i+counter].alt} image`);
            newImg.setAttribute("tabindex",1);
            newImg.classList.add("media_lightbox");
            h3.textContent = linksList[i+counter].nextElementSibling.children[0].textContent;
            //et on remplace le media courant par notre nouvelle image et on lui met le focus
            figure.replaceChild(newImg,mediaCurrent);
            newImg.focus();
            break;
         }
         //Sinon si le chemin du média courant correspond au chemin d'un élément de la liste de média et si un élément correspondant à la liste de média avec
        //l'index courant + le compteur est définis et est une vidéo 
         else if(mediaCurrent.src === linksList[i].src && linksList[i+counter] !== undefined && linksList[i+counter].tagName === "VIDEO"){
            ////alors on construit la nouvelle vidéo avec sa description 
            const newVideo = document.createElement("video");
            newVideo.setAttribute("src",linksList[i+counter].src);
            newVideo.setAttribute("aria-label",linksList[i+counter].getAttribute("aria-label"));
            newVideo.setAttribute("controls", "true");
            newVideo.setAttribute("tabindex","1");
            newVideo.classList.add("media_lightbox");
            h3.textContent = linksList[i+counter].nextElementSibling.children[0].textContent;
            //et on remplace le media courant par notre nouvelle vidéo et on lui met le focus
            figure.replaceChild(newVideo,mediaCurrent);
            newVideo.focus();
            break;
        }
    }
}
