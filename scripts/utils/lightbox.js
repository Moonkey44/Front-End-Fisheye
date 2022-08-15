function buildDOMLightbox(element, linksList){
    const lightbox = document.querySelector(".lightbox");
    const figure = document.querySelector('.pictureContainer_lightbox');
    const figcaption = document.createElement("figcaption");
    console.log(element);
    if(element.src.match(/\.jpg/)){
        const image = document.createElement("img");
        image.setAttribute('src',element.getAttribute('src'));
        image.setAttribute('alt', element.getAttribute('src'));
        image.classList.add("media_lightbox")
        figcaption.textContent = element.getAttribute('src');
        figure.appendChild(image);
    }
    else{
        const video = document.createElement("video");
        video.setAttribute('src',element.getAttribute("src"));
        video.setAttribute('alt', element.getAttribute("alt"));
        video.setAttribute("controls", "true");
        video.classList.add("media_lightbox");
        figure.appendChild(video);
    }
    figcaption.classList.add('figcaption_lightbox');
    figcaption.textContent = element.getAttribute("alt");
    figure.appendChild(figcaption);
    lightbox.style.display = "block";
    document.querySelector(".lightbox_prev").addEventListener("click",function(){
        previous(linksList);
    });
    document.querySelector(".lightbox_next").addEventListener("click",function(){
        next(linksList);
    });
    document.addEventListener("keyup",function(e){
        onKeyUp(e,linksList);
    });
    document.querySelector(".close_lightbox").addEventListener("click",function(){
        closeLightbox();
        document.removeEventListener("keyup", onKeyUp);
    });
}

function onKeyUp(e, linksList){
    switch(e.key){
        case "Escape":
            closeLightbox();
            break;
        case "ArrowRight":
            next(linksList);
            break;
        case "ArrowLeft":
            previous(linksList);        
    }
}

function closeLightbox(){
    const lightbox = document.querySelector(".lightbox");
    const figure = document.querySelector('.pictureContainer_lightbox');
    const media = document.querySelector('.media_lightbox');
    const figcaption = document.querySelector('.figcaption_lightbox');
    figure.removeChild(media);
    figure.removeChild(figcaption);
    lightbox.style.display = "none";
    document.removeEventListener("click",closeLightbox);
}

function next(linksList){
    const figure = document.querySelector('.pictureContainer_lightbox');
    const media = document.querySelector(".media_lightbox");
    const figcaption = document.querySelector(".figcaption_lightbox");
    for(i=0; i < linksList.length; i++){
        if(media.src !== null && media.src === linksList[i].currentSrc && linksList[i+1] !== undefined && linksList[i+1].tagName !== "VIDEO"){
            const newImg = document.createElement("img");
            newImg.setAttribute("src",linksList[i+1].currentSrc);
            newImg.setAttribute("alt",linksList[i+1].alt);
            newImg.classList.add("media_lightbox");
            figcaption.textContent = linksList[i+1].getAttribute("alt");
            figure.replaceChild(newImg,media);
            break;
        }
        else if(media.src !== null && media.src === linksList[i].currentSrc && linksList[i+1] !== undefined && linksList[i+1].tagName === "VIDEO"){
            const newVideo = document.createElement("video");
            newVideo.setAttribute("src",linksList[i+1].currentSrc);
            newVideo.setAttribute("alt",linksList[i+1].alt);
            newVideo.setAttribute("control", "true");
            newVideo.classList.add("media_lightbox");
            figcaption.textContent = linksList[i+1].getAttribute("alt");
            figure.replaceChild(newVideo,media);
            break;
        }
    }
}

function previous(linksList){
    const figure = document.querySelector('.pictureContainer_lightbox');
    const media = document.querySelector(".media_lightbox");
    const figcaption = document.querySelector(".figcaption_lightbox");
    for(i=0; i < linksList.length; i++){
        if(media.src !== null && media.src === linksList[i].currentSrc && linksList[i-1] !== undefined && linksList[i-1].tagName !== "VIDEO" ){
            const newImg = document.createElement("img");
            newImg.setAttribute("src",linksList[i-1].currentSrc);
            newImg.setAttribute("alt",linksList[i-1].alt);
            newImg.classList.add("media_lightbox");
            figcaption.textContent = linksList[i-1].alt;
            figure.replaceChild(newImg,media);
        } 
        else if(media.src !== null && media.src === linksList[i].currentSrc && linksList[i-1] !== undefined && linksList[i-1].tagName === "VIDEO"){
            const newVideo = document.createElement("video");
            newVideo.setAttribute("src",linksList[i-1].currentSrc);
            newVideo.setAttribute("alt",linksList[i-1].alt);
            newVideo.setAttribute("controls", "true");
            newVideo.classList.add("media_lightbox");
            figcaption.textContent = linksList[i-1].getAttribute("alt");
            figure.replaceChild(newVideo,media);
        }
    }
}