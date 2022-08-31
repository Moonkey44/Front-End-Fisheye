    //Cette fonction asynchrone nous permet de récupérer les données des photographes
    //et des médias dans le json
    async function getPhotographersOrMedia(choice) {
        //On créer une nouvelle requête http via le chemin d'accès du json concerné
        const newRequest = new Request("data/photographers.json");
        //On utilise la méthode asynchrone fetch qui va attendre la réponse de la requête 
        const data = await fetch(newRequest)
            //On convertit la réponse de la promesse en tableau d'objet grâce a la méthode json 
            .then((response) => response.json())
            //Puis En fonction du choix passé en paramètre on retourne la data correspondante 
            .then((data) => {
                //console.log(data);
                if(choice === "photographers"){
                    return data.photographers
                }
                else if(choice === "media"){
                    return data.media
                }
                //Si la méthode fetch nous retourne une erreur alors on l'affiche dans la console
            }).catch(console.error);
        return data
    }

    //cette fonction va nous permettre d'afficher dasn la page d'acceuil 
    //chaque photographe contenu dans les données passés en paramètre 
    function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        //On boucle sur notre tableau d'objet
        photographers.forEach((photographer) => {
            //on initialise nos factory pattern en lui passant en paramètre chaque photographe
            const photographerModel = photographerFactory(photographer);
            //on ajoute chaque photographe dans le DOM
            const userCardDOM = photographerModel.getUserCardDOM();
            //Si la section existe bien alors on ajoute notre article dans le DOM
            if(photographersSection != null){
                photographersSection.appendChild(userCardDOM);
            }    
        });
    }

    //ici nous initialisons le script
    async function init() {
        //En récupèrant les datas des photographes
        const photographers = await getPhotographersOrMedia("photographers");
        //Puis en affichant nos données récupérées
        displayData(photographers);
    }
    //il nous reste plus qu'a éxécuté la fonction d'initialisation de la page index
    init();