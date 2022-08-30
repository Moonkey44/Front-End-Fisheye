const selectDiv = document.querySelector(".custom-sort");
const oldSelect = document.querySelector("select");
const newSelect = document.createElement("div");
newSelect.setAttribute("role","select");
newSelect.setAttribute("aria-label",`${newSelect.innerHTML}`);
newSelect.setAttribute("aria-labelledby", "sort-select");
newSelect.setAttribute("tabindex",1);
newSelect.classList.add("sort-select");
newSelect.textContent = oldSelect.options[oldSelect.selectedIndex].textContent;
selectDiv.appendChild(newSelect);
const newMenu = document.createElement("div");
newMenu.classList.add("select_items","select_hide");
for(i=1;i < oldSelect.length; i++){
    const newOption = document.createElement("div");
    newOption.innerHTML = oldSelect.options[i].innerHTML;
    newOption.setAttribute("role","option");
    newOption.setAttribute("aria-label",`${newOption.innerHTML}`);
    newMenu.appendChild(newOption);
    newOption.addEventListener("click",selectItems);
    newOption.addEventListener("keyup",function(e){
        if(e.key === "Enter"){
            selectItems(e);
        }
    });
}
selectDiv.appendChild(newMenu);
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

function selectItems(e){
    newSelect.classList.add("rotate");
    for(i=0;i < oldSelect.length;i++){
        if(oldSelect.options[i].innerHTML === e.target.innerHTML){
            oldSelect.selectedIndex = oldSelect.options[i].index;
            e.target.innerHTML = newSelect.innerHTML;   
            newSelect.innerHTML = oldSelect.options[i].innerHTML;
            break;
        }
    } 
    closeNewMenu();    
}

function openNewMenu(e){
    const newOptions = document.querySelectorAll("div[role=option]");
    deleteMainFocus();
    newSelect.setAttribute("tabindex","1");
    newSelect.setAttribute("role","options");
    newSelect.blur();
    newSelect.focus();
    newSelect.classList.add("rotate");
    newMenu.classList.remove("select_hide");
    newSelect.style.borderBottomLeftRadius = "0";
    newSelect.style.borderBottomRightRadius = "0";
    for(i=0;i < newOptions.length; i++){
        newOptions[i].setAttribute("tabindex","0");
        // if(i === newOptions.length-1){
        //    newOptions[i].addEventListener("keydown", function loopEvent(e){
        //         if(e.key === "Tab"){
        //             newSelect.focus();
        //         }
        //         this.removeEventListener("keydown",loopEvent);
        //    }); 
        // }
    }
}

function closeNewMenu(){
    activeMainFocus();
    newSelect.setAttribute("role","select");
    newSelect.classList.remove("rotate");
    newMenu.classList.add("select_hide");
    newSelect.style.borderBottomLeftRadius = "5px";
    newSelect.style.borderBottomRightRadius = "5px";
    sortPicture();
    newSelect.removeEventListener("click",closeNewMenu);
    newSelect.removeEventListener("keyup",closeNewMenu);
    document.querySelectorAll("div[role=option]").forEach(option => {
        option.setAttribute("tabindex","-1");
    });
}
