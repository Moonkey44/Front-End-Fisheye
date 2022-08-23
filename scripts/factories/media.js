 function mediaFactory(data,name)
 {
    const {title, image, video, likes} = data;

    function getVideoOrPicture(image, video){
      if(image === undefined){
        const videoPath = `assets/photographers/Sample_Photos/${getUserFirstName(name)}/${video}`;
        const videoElt = document.createElement("video");
        videoElt.setAttribute("src", videoPath);
        videoElt.setAttribute("aria-label",`video`);
        videoElt.setAttribute("role","link");
        videoElt.setAttribute("tabindex",1);
        return videoElt
      }
      else{
        const picturePath = `assets/photographers/Sample_Photos/${getUserFirstName(name)}/${image}`;
        const pictureElt = document.createElement("img");
        pictureElt.setAttribute("src", picturePath);
        pictureElt.setAttribute("role", "link");
        pictureElt.setAttribute("alt", "image");
        pictureElt.setAttribute("tabindex",1);
        return pictureElt
      }
    }

    function getUserFirstName(name){
        const firstName = name.substring(0,name.indexOf(' '));
        if(firstName.search(/-/)){  
          const trueFirstName = firstName.replace(/-/," ");
          return trueFirstName;
        }
    }

    function getPictureCardDOM(){
        const article = document.createElement("article");
        const figure = document.createElement("figure");
        const figcaption = document.createElement("figcaption");
        const divlikes = document.createElement("div");
        const pLikes = document.createElement('p');
        const h3 = document.createElement("h3");
        const heart = document.createElement('i');
        heart.classList.add("fa-solid", "fa-heart");
        heart.setAttribute("aria-label","likes");
        heart.classList.add("heart");
        heart.setAttribute("role","button");
        heart.setAttribute("tabindex",1);
        pLikes.classList.add("nbrOfLikes");
        divlikes.setAttribute("tabindex",1);
        divlikes.setAttribute("aria-label",`${likes}`);
        pLikes.textContent = likes;
        h3.textContent = title;
        h3.setAttribute("tabindex",1);
        figure.appendChild(getVideoOrPicture(image,video));
        divlikes.appendChild(pLikes);
        divlikes.appendChild(heart);
        figcaption.appendChild(h3);
        figcaption.appendChild(divlikes);
        figure.appendChild(figcaption);
        article.appendChild(figure);
        return article;
    }

    return {getUserFirstName, getPictureCardDOM}
 }