//Mettre le code JavaScript lié à la page photographer.html
//Déclare et initialise l'affichage à 0
let display = 0;

//Déclare notre fonction d'affichage de la main page du photographe sélectionné en lui passant en paramètre ses données 
function displayDataPhotographer(photographers, medias)
{
    //récupère un objet permettant d'atteindre les informations contenu dans l'url de notre page
    const urlsearchParams = new URLSearchParams(document.location.search);
    //Récupère le paramètre id du photographe séléctionné et le convertit en entier
    const photographerID = parseInt(urlsearchParams.get("id"));
    //Configure notre section de media (tabindex, aria, class)
    const main = document.querySelector("#main");
    const rate = document.querySelector(".rateDiv");
    const picturesSection = document.createElement("section");
    picturesSection.setAttribute("aria-label","photographer media");
    picturesSection.setAttribute("tabindex",1);
    const select = document.querySelector("select");
    picturesSection.classList.add("pictures");
    main.insertBefore(picturesSection,rate);
    //On définis un tableau de date et une variable qui va contenir tous les likes du photographe
    const dateArray = [];
    let allLikes = 0;
    //On boucle sur le tableau d'objet pour récupérer les données du photographe sélectionné dans la page d'acceuil
    photographers.forEach((photographer) => { 
        //Si l'id du photographe passé en paramètre correspond à une des id du tableau d'objet 
        if(photographer.id === photographerID){
            //Alors on incrémente notre variable affichage
            display++;
            //On initialise notre factory patern du photographe et on récupère les fonctions et les données dont ont a besoin 
            const photographerModel = photographerFactory(photographer);
            //Ensuite on fait de même pour le tableau de média en récupérant tous les médias correspondant au photographe séléctionné   
            medias.forEach((media) => {
                if(photographerID === media.photographerId){
                    const mediaModel = mediaFactory(media,photographerModel.name);
                    //on ajoute le nombre total de likes de chaque média correspondant
                    allLikes += mediaModel.likes;
                    //Et on met la date de chaque média correspondant dans le tableau de date
                    dateArray.push(mediaModel.date);
                    //On construit notre article et on le place dans le DOM
                    picturesSection.appendChild(mediaModel.getPictureCardDOM());
                }
            })
            //Si la variable d'affichage est affecté de 1 alors on affiche l'entête de la page et son évaluation correspondant
            //au photographe sélectionné grâce au fonction du photographe pattern 
            if(display === 1){   
                photographerModel.getUserHeader();
                photographerModel.getUserRate(allLikes);
            }
        }
    });
    //Si l'utilisateur a choisis le trie en fonction des dates grâce au select alors on affiche notre tableau de date dans le terminal
    if(select.value === "date"){    
        console.log(dateArray);
    }
}

async function init2(){
    //On récupère les données des photographes et des médias grâce à la fonction définis dans notre script de l'index 
    const selectInput = document.querySelector("select");
    const photographers = await getPhotographersOrMedia("photographers");
    const media = await getPhotographersOrMedia("media");
    const reload = false;
    //On appelle notre fonction de triage en lui passant en argument notre tableau d'objet media, la valeur de notre select et en précisant
    //notre reload car cette une initialisation de la page, cette fonction nous retournera le tableau de média trier en fonction du choix de l'utilisateur
    const sortMedia = getSortArray(media, selectInput.value,reload);
    //Puis on éxecute notre fonction d'affichage des médias triés et du photographe séléctionné en les passants en argument 
    displayDataPhotographer(photographers, sortMedia);
    // On appelle nos écouteurs d'événements click et entrer pour chaque coeurs dans le DOM 
    document.querySelectorAll(".heart").forEach(heart => heart.addEventListener("click", clickLikeEvent));
    document.querySelectorAll(".heart").forEach(heart => heart.addEventListener("keyup", enterLikeEvent));
    //On séléctionne tout nos vidéos et images affiché dans le DOM
    const links = document.querySelectorAll('img[src$=".jpg"], video[src$=".mp4"]');
    //On le convertit en tableau d'élément puis on supprime le 1er index qui correspond au profil du photographe 
    const linksList = Array.from(links).splice(1);
    //On gère nos écouteurs d'évènements click et entrer sur chaque élément de notre liste
    //Si les évènements sont activés alors on éxécute notre fonction d'affichage de la lightbox en lui passant en argumant l'élément sélectionné 
    linksList.forEach( link =>{
        link.addEventListener('click', function buildEvent(e){
            buildDOMLightbox(e.target);
        })
        link.addEventListener('keyup',function(e){
            if(e.key === "Enter"){
                buildDOMLightbox(e.target);
            }
        });
    });
}

//Si reload est a true alors on trie notre tableau d'élément article
function getSortArray(media,select, reload){
    switch(select){
        case "popularity" :
            //On retourne le tableau trier en comparant les propriétés likes de chaque élément
            //Si b - a est positif alors b passe devant a sinon si il est négatif alors b reste à sa place
            if(reload){    
                //Ici on trie en convertissant en entier chaque élément enfant "p" de nos articles
                return media.sort((a,b) => parseInt(b.children[0].children[1].children[1].children[0].textContent) - parseInt(a.children[0].children[1].children[1].children[0].textContent));
            } else {
                return media.sort((a,b) => b.likes - a.likes);
            }
        case "date" : 
            //On retourne le tableau trier en comparant les propriétés dates de chaque élément
            //même chose qu'avant sauf que l'on convertit ses propriétés string en type date
            //puis la méthode sort les convertits en valeur ASCII et les comparent entre elle
            if(reload){
                //Ici on trie en convertissant en date chaque valeur de l'attribut data de l'élément enfant "figcaption" de nos articles
                return media.sort((a,b) => new Date(b.children[0].children[1].getAttribute("data-date-of-picture")) - new Date(a.children[0].children[1].getAttribute("data-date-of-picture")));
            } else {
                return media.sort((a,b) => new Date(b.date) - new Date(a.date));
            }
        case "title" :
            //On retourne le tableau trier en comparant les propriétés title de chaque élément
            //en retournant la valeur de la méthode localeCompare qui renvoie un nombre indiquant si la chaîne de caractère courante
            //(ici a) se situe avant (-1), après (1) ou est la même (0) que la chaîne passé en paramètre (b)
            if(reload){
                //Ici on trie en comparant la chaîne de caractère de chaque élément enfant "h3" de nos articles 
                return media.sort((a,b) =>{
                    return a.children[0].children[1].children[0].textContent.localeCompare(b.children[0].children[1].children[0].textContent);
                });
            } else {
                return media.sort((a,b) =>{
                    return a.title.localeCompare(b.title);
                });
            }
            
    }
}
//cette fonction nous permet de suprimer tout les articles de la page et d'afficher ces mêmes articles triés
function reset(sortArticleArray){
    const sectionPicture = document.querySelector(".pictures");
    const article = document.querySelectorAll("article");
    article.forEach(article => {
        article.remove();
    });
    for(i=0; i< sortArticleArray.length; i++){
        sectionPicture.appendChild(sortArticleArray[i]);
    }
}
//cette fonction sera éxécuté à la fermeture du select en récupérant sa valeur
function resetMedia(select){
    const reload = true;
    // On récupère un tableau de nos élements article pour pouvoir l'utilisé dans la fonction de triage
    const articleArray = Array.from(document.querySelectorAll("article"));
    //On le passe en argument, ainsi que la valeur de la selection et en précisant que c'est bien un reload de la section média
    const sortArray = getSortArray(articleArray,select,reload);
    //Il nous reste plus qu'à éxécuter la fonction reset en passant en argument le tableau trié retourné
    reset(sortArray);
}

//Lors de l'appel de cette événement on ajoute le like dans le DOM
//puis on supprime les écouteurs d'événements du coeur 
//pour que l'utilisateur puisse liker qu'une seule fois
function clickLikeEvent(e){
    addlikeMedia(e);
    this.removeEventListener("click", clickLikeEvent);
    this.removeEventListener("keyup", enterLikeEvent);
}

//Pareil qu'avant pour cette événement
function enterLikeEvent(e){
    if(e.key === "Enter"){
        addlikeMedia(e);
        this.removeEventListener("keyup",enterLikeEvent);
        this.removeEventListener("click",clickLikeEvent);
    }
}

function addlikeMedia(event){
    const rate = document.querySelector(".rate");
    //On récupère le like total de photographe on le convertit en entier et on l'incrémente.
    const intRate = parseInt(rate.textContent)+1;
    //On reconvertit le résultat en chaîne de caractère et on le modifie dans le DOM
    rate.textContent = intRate.toString();
    //Nous faisons la même chose avec l'élément situé à coter du coeur séléctionné  
    const nbrOfLikes = parseInt(event.target.parentNode.children[0].textContent);
    const addLike = nbrOfLikes + 1;
    event.target.parentNode.children[0].textContent = addLike.toString();
    //On fait aussi la mise à jour de l'accessibilité
    event.target.parentNode.setAttribute("aria-label",`${event.target.parentNode.children[0].textContent} like`);
    event.target.setAttribute("aria-label","like sélectionné");
    //Puis on enlève le curseur pointeur pour indiquer à l'utilisateur qu'il ne peut plus liker
    event.target.style.cursor = "auto";
    event.target.blur();
    event.target.parentElement.focus();
}

//il nous reste plus qu'a éxécuté la fonction d'initialisation de la page media
init2();