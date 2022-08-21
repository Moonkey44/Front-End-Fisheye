    async function getPhotographersOrMedia(choice) {
        const newRequest = new Request("data/photographers.json");
        const data = await fetch(newRequest)
            .then((response) => response.json())
            .then((data) => {
                //console.log(data);
                if(choice === "photographers"){
                    return data.photographers
                }
                else if(choice === "media"){
                    return data.media
                }
            }).catch(console.error);        
        return data
    }

    function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            if(photographersSection != null){
                photographersSection.appendChild(userCardDOM);
            }    
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const photographers = await getPhotographersOrMedia("photographers");
        displayData(photographers);
    }
    
    init();