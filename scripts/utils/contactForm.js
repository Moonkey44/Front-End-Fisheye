function displayModal(){
    const modal = document.getElementById("contact_modal");
    const nameUser = document.querySelector(".name_user");
    const headerModal = document.querySelector(".header_modal");
    headerModal.children[0].innerHTML =`Contactez-moi<br>${nameUser.textContent}`;
	modal.style.display = "block";
    modal.setAttribute("aria-hidden", false);
    const main = document.querySelector("main");
    const header = document.querySelector("header");
    main.setAttribute("aria-hidden",true);
    header.setAttribute("aria-hidden",true);
    header.style.opacity = 0.6;
    main.style.opacity = 0.6;
    const firstInput = document.getElementById("first");
    firstInput.focus();
    deleteFocus();
    document.querySelector(".modal_close").setAttribute("tabindex","0");
    document.addEventListener("keyup",function onKeyUp(e){
        switch(e.key){
            case "Escape":
                closeModal();               
                this.removeEventListener("keyup",onKeyUp);
        }
    });
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", true);
    const main = document.querySelector("main");
    const header = document.querySelector("header");
    main.setAttribute("aria-hidden",false);
    header.setAttribute("aria-hidden",false);
    header.style.opacity = 1;
    main.style.opacity = 1;
    resetModal();
    document.querySelector(".modal_close").removeAttribute("tabindex");
    activeFocus();
}

function returnListInput(){
    const listInput = Array.from(document.querySelectorAll("input"));
    const areaInput = document.getElementById("message");
    listInput.push(areaInput);
    return listInput;
}

function resetModal(){
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