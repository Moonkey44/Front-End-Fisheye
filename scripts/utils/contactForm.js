function displayModal(){
    //On construit notre modale de contact
    const close = document.querySelector(".modal_close")
    const modal = document.getElementById("contact_modal");
    const nameUser = document.querySelector(".name_user");
    const headerModal = document.querySelector(".header_modal");
    //On modifie le titre du modale en ajoutant le nom du photographe sélectionné
    headerModal.children[0].innerHTML =`Contactez-moi<br>${nameUser.textContent}`;
    //On affiche notre modal
	modal.style.display = "block";
    const main = document.querySelector("main");
    const header = document.querySelector("header");
    //On configure le masquage du lecteur audio
    main.setAttribute("aria-hidden","true");
    header.setAttribute("aria-hidden","true");
    modal.setAttribute("aria-hidden","false");
    //On rend notre page opaque pour rendre notre modale plus visible
    header.style.opacity = 0.6;
    main.style.opacity = 0.6;
    //On met le focus sur le bouton close de notre modale et on enlève les focus de notre page principale
    deleteMainFocus();
    //On définis l'index de tabulation de notre bouton de fermeture de la modale
    close.setAttribute("tabindex","1");
    close.focus();
    //On définis nos évenement de fermeture de la modale - keyup + Enter
    document.addEventListener("keyup",function escapeKeyUp(e){
        if(e.key === "Escape"){
            closeModal();               
            this.removeEventListener("key",escapeKeyUp);
        }
    });
    close.addEventListener("keydown",function enterKeyUp(e){
        if(e.key === "Enter"){
            closeModal();
            this.removeEventListener("keyup",enterKeyUp);
        }
    });
}

function closeModal() {
    //On ferme la modale et la cachant du DOM 
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";       
    const main = document.querySelector("main");
    const header = document.querySelector("header");
    //On configure le masquage du lecteur audio
    main.setAttribute("aria-hidden","false");
    header.setAttribute("aria-hidden","false");
    modal.setAttribute("aria-hidden","true");
    //Et on remet l'opacité de la page à son état normale
    header.style.opacity = 1;
    main.style.opacity = 1;
    resetModal();
    //Enfin on réactive le focus de notre page principale
    activeMainFocus();
}

function returnListInput(){
    //On construit un tableau contenant tout nos éléments inputs
    const listInput = Array.from(document.querySelectorAll("input"));
    const areaInput = document.getElementById("message");
    //Et on ajoute notre élément area contenant le message de l'utilsiateur au photographe à la liste d'input
    listInput.push(areaInput);
    //Enfin on retourne cette liste
    return listInput;
}

//On supprime l'index de notre bouton de fermeture et on reset les valeurs de notre liste d'input retourné 
function resetModal(){
    document.querySelector(".modal_close").removeAttribute("tabindex");
    returnListInput().forEach(function(input){
        input.value ="";
    });
}

//On affiche dans notre terminal chaque élément input et l'élément area retourné  
function sendModal(event){
    event.preventDefault();
    returnListInput().forEach(function(input){
        console.log(input.value);
    });
    closeModal();
}

function activeMainFocus(){
    //On appelle tous les élements contenant l'attribut tabindex
    const elementsUnfocus = document.querySelectorAll("*[tabindex]");
    //console.log(elementsUnfocus);
    //Ensuite on redéfinis le tabindex de chaque élément de la liste à 1 pour leurs accorder une priorité
    //sauf les éléments correspondants au tarifs journalier et des likes du photographe que l'on passe à 0
    elementsUnfocus.forEach(elementUnfocus => {
        if(elementUnfocus.className === "rate_div" || elementUnfocus.className === "price_photographer"){
            elementUnfocus.setAttribute("tabindex","0");
        }
        else{
            elementUnfocus.setAttribute("tabindex","1");
        }
    });
}

function deleteMainFocus(){
    //On appelle tous les élements contenant l'attribut tabindex
    const elementsFocus = document.querySelectorAll("*[tabindex]");
    //Ensuite on redéfinis le tabindex de chaque élément de la liste à -1 pour leurs enlever leurs priorités
    elementsFocus.forEach(elementFocus => {
        elementFocus.setAttribute("tabindex","-1");
    });
}