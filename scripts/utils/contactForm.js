function displayModal(){
    const modal = document.getElementById("contact_modal");
    const nameUser = document.querySelector(".name_user");
    const headerModal = document.querySelector(".header_modal");
    headerModal.children[0].innerHTML =`Contactez-moi<br>${nameUser.textContent}`;
	modal.style.display = "block";
    const main = document.querySelector("main");
    const header = document.querySelector("header");
    main.setAttribute("aria-hidden",true);
    header.setAttribute("aria-hidden",true);
    modal.setAttribute("aria-hidden",false);
    header.style.opacity = 0.6;
    main.style.opacity = 0.6;
    const firstInput = document.getElementById("first");
    firstInput.focus();
    deleteMainFocus();
    document.querySelector(".modal_close").setAttribute("tabindex","0");
    document.addEventListener("keyup",function escapeKeyUp(e){
        if(e.key === "Escape"){
            closeModal();               
            this.removeEventListener("keyup",escapeKeyUp);
        }
    });
    document.querySelector(".modal_close").addEventListener("keyup",function enterKeyUp(e){
        if(e.key === "Enter"){
            closeModal();
            this.removeEventListener("keyup",enterKeyUp);
        }
    });
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";       
    const main = document.querySelector("main");
    const header = document.querySelector("header");
    main.setAttribute("aria-hidden",false);
    header.setAttribute("aria-hidden",false);
    modal.setAttribute("aria-hidden",true);
    header.style.opacity = 1;
    main.style.opacity = 1;
    resetModal();
    activeMainFocus();
}

function returnListInput(){
    const listInput = Array.from(document.querySelectorAll("input"));
    const areaInput = document.getElementById("message");
    listInput.push(areaInput);
    return listInput;
}

function resetModal(){
    document.querySelector(".modal_close").removeAttribute("tabindex");
    returnListInput().forEach(function(input){
        input.value ="";
    });
}

function sendModal(event){
    event.preventDefault();
    returnListInput().forEach(function(input){
        console.log(input.value);
    });
    closeModal();
}

function activeMainFocus(){
    const elementsUnfocus = document.querySelectorAll("*[tabindex]");
    //console.log(elementsUnfocus);
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
    const elementsFocus = document.querySelectorAll("*[tabindex]");
    elementsFocus.forEach(elementFocus => {
        elementFocus.setAttribute("tabindex","-1");
    });
}