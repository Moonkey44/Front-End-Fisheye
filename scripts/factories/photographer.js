function photographerFactory(data) {
    //on créer un constructeur de type objet qui va récupérer les données que l'on a besoin dans l'objet data
    const {name, city, country, tagline, price, portrait,id} = data;
    //Puis on définis notre constante qui va contenir le chemin d'accès du portrait du photographe
    const picture = `assets/photographers/Sample_Photos/Photographers_ID_Photos/${portrait}`;
    //On définis la constante qui va contenir le string de l'emplacement du photographe
    const localisationValue = `${city}, ${country}`;
    //on définis la constante qui va contenir le string du prix du photographe
    const priceValue = `${price}€/jour`;
    //On configure les éléments du photographe que l'on va ajouter dans le DOM
    const imgUser = document.createElement( 'img' );
    const nameUser = document.createElement( 'h2' );
    const localisationUser = document.createElement( 'h3');
    const descriptionUser = document.createElement( 'p' );
    const priceUser = document.createElement( 'p' );
    nameUser.textContent = name;
    nameUser.classList.add("name_user");
    nameUser.setAttribute("id",id);
    priceUser.classList.add("price");
    descriptionUser.classList.add("description");    
    localisationUser.textContent = localisationValue;
    descriptionUser.textContent = tagline;
    priceUser.textContent = priceValue;
    imgUser.setAttribute("src", picture);
    imgUser.setAttribute("alt", ` profil de ${name}`);
    imgUser.setAttribute("class","profile");
    //Cette fonction va nous servir à construire l'article de chaque photographe
    function getUserCardDOM() {
        const link = document.createElement('a');
        const article = document.createElement('article');
        const figure = document.createElement('figure');
        const figcaption = document.createElement('figcaption');
        //On initialise les tabindex à 0 de la carte donc les tabindex
        //vont suivre l'ordre du DOM
        imgUser .setAttribute("tabindex",0);
        nameUser.setAttribute("tabindex",0);
        localisationUser.setAttribute("tabindex",0);
        descriptionUser.setAttribute("tabindex",0);
        priceUser.setAttribute("tabindex",0);
        link.setAttribute("id","link");
        //ici on modifie l'attribut href des lien en lui ajoutant en paramètre de l'url
        //l'id du photographe
        link.setAttribute("href",`photographer.html?id=${id}`);
        link.setAttribute('aria-label',name);                  
        figcaption.appendChild(localisationUser);
        figcaption.appendChild(descriptionUser);
        figcaption.appendChild(priceUser);
        link.appendChild(imgUser);
        link.appendChild(nameUser);
        figure.appendChild(link);
        figure.appendChild(figcaption);
        article.appendChild(figure);
        //puis on retourne l'article construit du photographe
        return article
    }
    //Cette fonction va nous servir à afficher l'entête de présentation du photographe
    //dans la page de media 
    function getUserHeader(){
        const photographerSection = document.querySelector(".photograph-header");
        const buttonModal = document.querySelector('button');
        const divPhotographerDescription = document.createElement("div");
        divPhotographerDescription.classList.add("descriptionUser");
        //On initialise les tabindex à 1 de la carte donc les tabindex des éléments
        //vont avoir la priorité de sélection sur le reste des élements du DOM
        nameUser.setAttribute("tabindex",1);
        localisationUser.setAttribute("tabindex",1);
        descriptionUser.setAttribute("tabindex",1);
        imgUser.setAttribute("tabindex",1);
        //Enfin on construit notre DOM de l'entête de la page media
        divPhotographerDescription.appendChild(nameUser);
        divPhotographerDescription.appendChild(localisationUser);
        divPhotographerDescription.appendChild(descriptionUser);
        photographerSection.insertBefore(divPhotographerDescription,buttonModal);
        photographerSection.appendChild(imgUser);
    }
    //ici on construit le bloc d'évaluation du photographe que l'on va afficher
    //dans la page de média en lui passant en paramètre le nombre total de likes
    function getUserRate(allLikes)
    {
        const rateSection = document.querySelector(".rate_section");
        const rateDiv = document.createElement("div");
        const price = document.createElement("p");
        const heart = document.createElement("i");
        const rate = document.createElement("p");
        heart.classList.add("fa-solid","fa-heart");
        rateDiv.classList.add("rate_div");
        rate.classList.add("rate");
        price.classList.add("price_photographer");
        rateDiv.setAttribute("tabindex",0);
        heart.setAttribute("aria-label","like au total");
        heart.setAttribute("role","img");
        price.textContent = priceValue;       
        price.setAttribute("tabindex",0);
        rate.textContent = allLikes;
        rateDiv.appendChild(rate);
        rateDiv.appendChild(heart);
        rateSection.appendChild(rateDiv);
        rateSection.appendChild(price);
    }
    //On retourne un objet contenant les données et fonctions sensibles d'être utilisées
    return {name, imgUser, priceValue, getUserCardDOM, getUserHeader, getUserRate}
}
