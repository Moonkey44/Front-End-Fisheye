 function mediaFactory(data,name)
 {
    const { id, photographerId, title, image, likes, date, price } = data;
    const picture = `assets/photographers/Sample_Photos/${getUserFirstName(name)}/${image}`;

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
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        const h3 = document.createElement("h3");
        img.setAttribute("src", picture);
        img.setAttribute("alt", title);
        link.appendChild(img);
        figcaption.appendChild(h3);
        figure.appendChild(link);
        figure.appendChild(figcaption);
        article.appendChild(figure);
        return article;
    }

    return {getUserFirstName, getPictureCardDOM, picture}
 }