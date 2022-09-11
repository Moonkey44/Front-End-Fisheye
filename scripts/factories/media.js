 function mediaFactory(data,name)
 {
    //on créer un constructeur de type objet qui va récupérer les données que l'on a besoin dans l'objet data
    const {title, image, video, likes, date} = data;
    function getVideoOrPicture(image, video){
      //si l'image n'est pas définis
      if(image === undefined){
        //Alors on construit notre vidéos
        //En lui passant en chemin d'accès l'url de la vidéo correspondante
        //remarquer la fonction getuserfirstName qui va retourner le prénom du photographe correctement écris 
        const videoPath = `assets/photographers/Sample_Photos/${getUserFirstName(name)}/${video}`;
        const videoElt = document.createElement("video");
        videoElt.setAttribute("src", videoPath);
        videoElt.setAttribute("aria-label",title);
        videoElt.setAttribute("role","link");
        videoElt.setAttribute("tabindex",1);
        return videoElt
      }
      else{
        //Sinon on construit et retourne notre image 
        const picturePath = `assets/photographers/Sample_Photos/${getUserFirstName(name)}/${image}`;
        const pictureElt = document.createElement("img");
        pictureElt.setAttribute("src", picturePath);
        pictureElt.setAttribute("role", "link");
        pictureElt.setAttribute("alt", title);
        pictureElt.setAttribute("tabindex",1);
        return pictureElt
      }
    }

    function getUserFirstName(name){
      //Ici la constance va contenir tout le prénom grâce a la fonction substring
      //qui va chercher et retourner une chaîne de caractère à partir du 1er caractère 
      //jusqu'à ce que la fonction trouve un espace
      const firstName = name.substring(0,name.indexOf(' '));
      //ensuite si la fonction search trouve le caractère -
      if(firstName.search(/-/)){  
        //Alors on le remplace par un espace
        const trueFirstName = firstName.replace(/-/," ");
        //Enfin on retourne le prénom du photographe correctement écris.
        return trueFirstName;
      }
    }

    function getPictureCardDOM(index){
        //on construit les élements constituants notre média à affiché
        //ainsi que son accessibilité et leurs tabindex
        const article = document.createElement("article");
        const figure = document.createElement("figure");
        const figcaption = document.createElement("figcaption");
        const divlikes = document.createElement("div");
        const pLikes = document.createElement('p');
        const h3 = document.createElement("h3");
        const heart = document.createElement('i');
        //On met un dataset de la date de l'image dans la description de celle-ci
        //pour pouvoir faire le triage post init (reload)  
        figcaption.dataset.dateOfPicture = date;
        heart.classList.add("fa-solid", "fa-heart");
        heart.setAttribute("aria-label","like");
        heart.setAttribute("id",`like${index}`);
        pLikes.setAttribute("aria-controls",`like${index}`);
        heart.classList.add("heart");
        heart.setAttribute("role","button");
        heart.setAttribute("tabindex",1);
        pLikes.classList.add("nbrOfLikes");
        divlikes.setAttribute("tabindex",1);
        divlikes.setAttribute("aria-label",`${likes} like`);
        pLikes.textContent = likes;
        h3.textContent = title;
        h3.setAttribute("tabindex",1);
        //Notre figure va contenir comme élément enfant soit une vidéo soit une image en fonction
        //de la data passé en paramètre de notre factory
        figure.appendChild(getVideoOrPicture(image,video));
        divlikes.appendChild(pLikes);
        divlikes.appendChild(heart);
        figcaption.appendChild(h3);
        figcaption.appendChild(divlikes);
        figure.appendChild(figcaption);
        article.appendChild(figure);
        //on retourne notre article pour la construction finale du DOM de la page media
        return article;
    }
    //On retourne un objet contenant les données et fonctions sensibles d'être utilisées
    return {likes, date, getPictureCardDOM}
 }