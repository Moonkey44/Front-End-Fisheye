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
    const lightbox = document.querySelector(".lightbox");
    const figure = document.querySelector('.pictureContainer_lightbox');
    const media = document.querySelector('.media_lightbox');
    const figcaption = document.querySelector('.figcaption_lightbox');
    const main = document.querySelector("main");
    const header = document.querySelector("header");
    const arrowLeft = document.querySelector(".lightbox_prev");
    const arrowRight = document.querySelector(".lightbox_next");
    main.setAttribute("aria-hidden",false);
    header.setAttribute("aria-hidden",false);
    lightbox.setAttribute("aria-hidden",true);
    document.querySelector(".close_lightbox").removeAttribute("tabindex");
    arrowLeft.removeAttribute("tabindex");
    media.removeAttribute("tabindex");
    figcaption.removeAttribute("tabindex");
    arrowRight.removeAttribute("tabindex");
    figure.removeChild(media);
    figure.removeChild(figcaption);
    lightbox.style.display = "none";
    document.removeEventListener("keyup",onKeyUp);
    arrowLeft.removeEventListener("click",previousEvent);
    arrowRight.removeEventListener("click",nextEvent);
    activeMainFocus();
}

function nextEvent(){
    const increment = 1;
    loadNewMedia(increment);
}

function previousEvent(){
    const decrement = -1;
    loadNewMedia(decrement);
}

function loadNewMedia(counter){
    //Convertit la liste d'éléments en tableau et enlève le 1er élément correspondant a l'image de profil du photographe
    const links = Array.from(document.querySelectorAll('img[src$=".jpg"], video[src$=".mp4"]')).splice(1);
    //Enlève le dernier élément du tableau correspondant à l'image courante de la lightbox 
    //(sinon on boucle sans cesse lors de la décrementation de la liste) 
    const linksList = links.splice(0,links.length-1);
    const mediaCurrent = document.querySelector(".media_lightbox");
    const figure = document.querySelector('.pictureContainer_lightbox');
    const figcaption = document.querySelector(".figcaption_lightbox");
    for( let i= 0; i < linksList.length; i++){
        if(mediaCurrent.src === linksList[i].src && linksList[i+counter] !== undefined && linksList[i+counter].tagName === "IMG"){
            const newImg = document.createElement("img");
            newImg.setAttribute("src",linksList[i+counter].src);
            newImg.setAttribute("alt",linksList[i+counter].alt);
            newImg.setAttribute("tabindex",0);
            newImg.classList.add("media_lightbox");
            figcaption.textContent = linksList[i+counter].nextElementSibling.children[0].textContent;
            figure.replaceChild(newImg,mediaCurrent);
            break;
         } 
         else if(mediaCurrent.src === linksList[i].src && linksList[i+counter] !== undefined && linksList[i+counter].tagName === "VIDEO"){
            const newVideo = document.createElement("video");
            newVideo.setAttribute("src",linksList[i+counter].src);
            newVideo.setAttribute("aria-label",linksList[i+counter].getAttribute("aria-label"));
            newVideo.setAttribute("controls", "true");
            newVideo.setAttribute("tabindex",0);
            newVideo.classList.add("media_lightbox");
            figcaption.textContent = linksList[i+counter].nextElementSibling.children[0].textContent;
            figure.replaceChild(newVideo,mediaCurrent);
            break;
        }
    }
}


function buildDOMLightbox(element){
    const main = document.querySelector("main");
    const header = document.querySelector("header");
    const lightbox = document.querySelector(".lightbox");
    const close = document.querySelector(".close_lightbox");
    const arrowLeft = document.querySelector(".lightbox_prev");
    const arrowRight = document.querySelector(".lightbox_next");
    const figure = document.querySelector('.pictureContainer_lightbox');
    const figcaption = document.createElement("figcaption");
    figcaption.classList.add('figcaption_lightbox');
    main.setAttribute("aria-hidden",true);
    header.setAttribute("aria-hidden",true);
    lightbox.setAttribute("aria-hidden",false);
    deleteMainFocus();
    figcaption.setAttribute("tabindex","0");
    arrowLeft.setAttribute("tabindex","0");
    arrowRight.setAttribute("tabindex","0");
    close.setAttribute("tabindex","0");
    if(element.src.match(/\.jpg/)){
        const image = document.createElement("img");
        image.setAttribute("tabindex","0");
        image.setAttribute('src',element.getAttribute('src'));
        image.setAttribute('alt', element.getAttribute('alt'));
        image.classList.add("media_lightbox");
        figcaption.textContent = element.nextElementSibling.children[0].textContent;
        figure.appendChild(image);
    }
    else{
        const video = document.createElement("video");
        video.setAttribute("tabindex","0");
        figcaption.textContent = element.nextElementSibling.children[0].textContent;
        video.setAttribute('src',element.getAttribute("src"));
        video.setAttribute('aria-label', element.getAttribute("aria-label"));
        video.setAttribute("controls", "true");
        video.classList.add("media_lightbox");
        figure.appendChild(video);
    }
    figure.appendChild(figcaption);
    lightbox.style.display = "block";
    document.addEventListener("keyup",onKeyUp);
    arrowLeft.addEventListener("click",previousEvent);
    arrowRight.addEventListener("click",nextEvent);
    close.addEventListener("click",closeLightbox);
}

