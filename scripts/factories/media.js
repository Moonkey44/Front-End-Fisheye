 function mediaFactory(data,name)
 {
    const { id, photographerId, title, image, video, likes, date, price } = data;

    function getVideoOrPicture(image, video){
      if(image === undefined){
        const videoPath = `assets/photographers/Sample_Photos/${getUserFirstName(name)}/${video}`;
        const videoElt = document.createElement("video");
        videoElt.setAttribute("src", videoPath);
        videoElt.setAttribute("alt", title);
        videoElt.setAttribute("autoplay", "");
        return videoElt; 
      }
      else{
        const picturePath = `assets/photographers/Sample_Photos/${getUserFirstName(name)}/${image}`;
        const pictureElt = document.createElement("img");
        pictureElt.setAttribute("src", picturePath);
        pictureElt.setAttribute("alt", title);
        return pictureElt
      }
    }

    function getUserFirstName(name){
        const firstName = name.substring(0,name.indexOf(' '));
        if(firstName.search(/\-/)){  
          const trueFirstName = firstName.replace(/\-/," ");
          return trueFirstName;
        }
    }

    function getPictureCardDOM(){
        const article = document.createElement("article");
        const figure = document.createElement("figure");
        const link = document.createElement("a");
        const figcaption = document.createElement("figcaption");
        const divlikes = document.createElement("div");
        const heart = document.createElement('i');
        const pLikes = document.createElement('p');
        const h3 = document.createElement("h3");
        heart.classList.add("fa-solid", "fa-heart");
        heart.setAttribute("aria-label","likes");
        pLikes.textContent = likes;
        h3.textContent = title;
        divlikes.setAttribute("aria-label","likes");
        link.appendChild(getVideoOrPicture(image,video));
        divlikes.appendChild(pLikes);
        divlikes.appendChild(heart);
        figcaption.appendChild(h3);
        figcaption.appendChild(divlikes);
        figure.appendChild(link);
        figure.appendChild(figcaption);
        article.appendChild(figure);
        return article;
    }

    return {getUserFirstName, getPictureCardDOM}
 }