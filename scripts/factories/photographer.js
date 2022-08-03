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
    localisationUser.textContent = localisationValue;
    descriptionUser.textContent = tagline;
    priceUser.textContent = priceValue;
    imgUser.setAttribute("src", picture);
    imgUser.setAttribute("alt", name);

    function getUserCardDOM() {
        const link = document.createElement( 'a' );
        const article = document.createElement( 'article' );
        const figure = document.createElement( 'figure' );
        const figcaption = document.createElement( 'figcaption' );
        link.setAttribute("href",`../../photographer.html?id=${id}`);
        link.setAttribute('aria-label',`lien vers la page du photographe ${nameUser}`);
        priceUser.classList.add("price");
        descriptionUser.classList.add("description");
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
        const divPhotographerDescription = document.createElement("div");
        divPhotographerDescription.appendChild(nameUser);
        divPhotographerDescription.appendChild(localisationUser);
        divPhotographerDescription.appendChild(descriptionUser);
        descriptionUser.classList.add("description");
        return divPhotographerDescription
    }

    return {imgUser, priceUser, getUserCardDOM, getUserHeader}
}
