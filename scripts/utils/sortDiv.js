//Je construis le DOM de mon nouveau select personnalisé
const selectDiv = document.querySelector(".custom-sort");
const oldSelect = document.querySelector("select");
const newSelect = document.createElement("div");
const newMenu = document.createElement("div");
newMenu.classList.add("select_items","select_hide");
newSelect.setAttribute("role","menu");
newSelect.setAttribute("aria-haspopup","true");
newSelect.setAttribute("aria-expanded","false");
newSelect.setAttribute("tabindex","1");
newSelect.classList.add("sort-select");
//le contenu de mon select personnalisé contiendra le contenu de l'option sélectionné dans l'élément select caché via son index
newSelect.textContent = oldSelect.options[oldSelect.selectedIndex].textContent;
selectDiv.appendChild(newSelect);
newSelect.setAttribute("aria-label",`${newSelect.innerHTML} sélectionné`);
//On boucle pour copier les options de l'élément select caché dans mon nouveau menu personnalisé
//et on ajoute les évènements sur ses nouveaux options
for(i=1;i < oldSelect.length; i++){
    const newOption = document.createElement("div");
    newOption.innerHTML = oldSelect.options[i].innerHTML;
    newOption.setAttribute("role","menuitem");
    newOption.setAttribute("aria-label",`${newOption.innerHTML}`);
    newOption.setAttribute("aria-expanded","true");
    newMenu.appendChild(newOption);
    newOption.addEventListener("click",selectItems);
    newOption.addEventListener("keyup",function(e){
        if(e.key === "Enter"){
            selectItems(e);
        }
    });
}
//On ajoute notre nouveau menu dans notre section de triage
//on modifie son style dans le css pour qu'il apparait en dessous de notre select perso
selectDiv.appendChild(newMenu);
//On définis les évènements sur notre select perso
newSelect.addEventListener("click",function(e){
    openNewMenu();
    this.addEventListener("click",closeNewMenu);
});
newSelect.addEventListener("keyup",function(e){
    if(e.key === "Enter"){
        openNewMenu(e);
        this.addEventListener("keyup",closeNewMenu);
    }
});

//Dans cette fonction, nous allons nous servir d'un vrai élément select avec ses options (caché) qui va servir d'intermédiaire
//pour configurer l'affichage de nos options et select personnalisées (div) au click
function selectItems(e){
    //on boucle sur notre élément select caché
    for(i=0;i <= oldSelect.length;i++){
        //Si notre option perso séléctionné correspond à une des options de l'élément select caché
        if(oldSelect.options[i].innerHTML === e.target.innerHTML){
            //Alors on change la valeur de l'index de l'élément select caché par l'index de son option sélectionné  
            oldSelect.selectedIndex = oldSelect.options[i].index;
            //Ensuite on change le contenu de l'option personnalisée sélectionner par le contenu de notre select personnalisé
            e.target.innerHTML = newSelect.innerHTML;
            e.target.setAttribute("aria-label",`${newSelect.innerHTML}`);
            //Enfin on change le contenu de notre select perso par le contenu de l'option du select caché
            newSelect.innerHTML = oldSelect.options[i].innerHTML;
            break;
        }
    } 
    closeNewMenu();
    newSelect.focus();
}

function openNewMenu(e){
    //on appel nos options dans une constante 
    const newOptions = document.querySelectorAll("div[role=menuitem]");
    newSelect.setAttribute("aria-expanded","true");
    newSelect.setAttribute("aria-haspopup","false");
    newSelect.removeAttribute("aria-labelledby");
    newSelect.setAttribute("role","menuitem");
    newSelect.setAttribute("aria-label",`${newSelect.innerHTML}`);
    newSelect.removeAttribute("labelledby");
    //On enlève le focus de notre page et on la reconfigure sur notre select et option perso
    deleteMainFocus();
    newSelect.setAttribute("tabindex","1");
    for(i=0;i < newOptions.length; i++){
        newOptions[i].setAttribute("tabindex","1");
    }
    //On enlève le focus de notre select et on lui rajoute pour pouvoir le selectionner avec le tabindex
    //Si l'utilisateur c'est tromper
    newSelect.blur();
    newSelect.focus();
    //on ajoute une classe pour faire tourner notre pseudo-élement (flêche) de notre select perso 
    newSelect.classList.add("rotate");
    //On affiche notre nouveau menu et on reconfigure le style de notre select
    newMenu.classList.remove("select_hide");
    newSelect.style.borderBottomLeftRadius = "0";
    newSelect.style.borderBottomRightRadius = "0";
}

function closeNewMenu(){
    //On active le focus de notre page et on l'enlève de nos options perso 
    newSelect.setAttribute("role","menu");
    newSelect.setAttribute("aria-expanded","false");
    newSelect.setAttribute("aria-haspopup","true");
    newSelect.setAttribute("aria-label",`${newSelect.innerHTML} sélectionné`);
    activeMainFocus();
    document.querySelectorAll("div[role=menuitem]").forEach(option => {
        option.setAttribute("tabindex","-1");
    });
    //On met notre pseudo élément de notre select perso à sa position initiale 
    newSelect.classList.remove("rotate");
    //Et on cache notre nouveau menu perso et on reconfigure le style de notre select perso a sa valeur intiale
    newMenu.classList.add("select_hide");
    newSelect.style.borderBottomLeftRadius = "5px";
    newSelect.style.borderBottomRightRadius = "5px";
    //Puis on reset notre page principale
    resetMedia(oldSelect.value);
    //Enfin on enlève les évènements de notre select perso appelé lors de l'ouverture de celui-ci
    newSelect.removeEventListener("click",closeNewMenu);
    newSelect.removeEventListener("keyup",closeNewMenu);
}
