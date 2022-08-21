function photographerFactory(data) {
    const {name, city, country, tagline, price, portrait,id} = data;
    const picture = `assets/photographers/Sample_Photos/Photographers_ID_Photos/${portrait}`;
    const localisationValue = `${city}, ${country}`;
    const priceValue = `${price}€/jour`;
    const imgUser = document.createElement( 'img' );
    const nameUser = document.createElement( 'h2' );
    const localisationUser = document.createElement( 'h3');
    const descriptionUser = document.createElement( 'p' );
    const priceUser = document.createElement( 'p' );
    nameUser.textContent = name;
    nameUser.classList.add("name_user");
    priceUser.classList.add("price");
    descriptionUser.classList.add("description");    
    localisationUser.textContent = localisationValue;
    descriptionUser.textContent = tagline;
    priceUser.textContent = priceValue;
    imgUser.setAttribute("src", picture);
    imgUser.setAttribute("alt", name);
    imgUser.setAttribute("class","profile");

    function getUserCardDOM() {
        const link = document.createElement( 'a' );
        const article = document.createElement( 'article' );
        const figure = document.createElement( 'figure' );
        const figcaption = document.createElement( 'figcaption' );
        imgUser .setAttribute("tabindex",0);
        nameUser.setAttribute("tabindex",0);
        localisationUser.setAttribute("tabindex",0);
        descriptionUser.setAttribute("tabindex",0);
        priceUser.setAttribute("tabindex",0);
        link.setAttribute("href",`photographer.html`);
        link.setAttribute('aria-label',`lien vers la page du photographe ${nameUser}`);                  
        figcaption.appendChild(localisationUser);
        figcaption.appendChild(descriptionUser);
        figcaption.appendChild(priceUser);
        link.appendChild(imgUser);
        link.appendChild(nameUser);
        figure.appendChild(link);
        figure.appendChild(figcaption);
        article.appendChild(figure);
        return article
    }

    function getUserHeader(){
        const photographerSection = document.querySelector(".photograph-header");
        const buttonModal = document.querySelector('button');
        const divPhotographerDescription = document.createElement("div");
        divPhotographerDescription.classList.add("descriptionUser");
        nameUser.setAttribute("tabindex",1);
        localisationUser.setAttribute("tabindex",1);
        descriptionUser.setAttribute("tabindex",1);
        imgUser.setAttribute("tabindex",1);
        divPhotographerDescription.appendChild(nameUser);
        divPhotographerDescription.appendChild(localisationUser);
        divPhotographerDescription.appendChild(descriptionUser);
        photographerSection.insertBefore(divPhotographerDescription,buttonModal);
        photographerSection.appendChild(imgUser);
    }

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
        rateDiv.setAttribute("aria-label",`${name} a ${allLikes} coeurs au totals`);
        heart.setAttribute("aria-label","likes");
        heart.setAttribute("role","img");
        price.textContent = priceValue;  
        price.setAttribute("aria-label", `${price.textContent}`);       
        price.setAttribute("tabindex",0);
        rate.textContent = allLikes;
        rateDiv.appendChild(rate);
        rateDiv.appendChild(heart);
        rateSection.appendChild(rateDiv);
        rateSection.appendChild(price);
    }

    return {name, imgUser, priceValue, getUserCardDOM, getUserHeader, getUserRate}
}
