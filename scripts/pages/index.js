    async function getPhotographers() {
        const newRequest = new Request("../../data/photographers.json");
        const photographersData = await fetch(newRequest)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                return data.photographers
            })
            .catch(console.error);        
        // et bien retourner le tableau photographers seulement une fois
        return (photographersData)
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            console.log(photographerModel);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const photographers = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    