// Select Elements Needed
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const element = document.getElementById("element");

//class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Store a to-do

let LIST, id;

//restore to-do-list from localStorage
let data = localStorage.getItem("TODO");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    LIST = [];
    id = 0;
}

// load items into the UI
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
};

// clear localStorage
clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
});


//Show Date

const today = new Date();
const options = { weekday: 'long', month: 'short', day:'numeric'};

dateElement.innerHTML = today.toLocaleDateString("en-us", options);

//add a todo
function addToDo(todo , id, done, trash){

    if(trash){ return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item =   `<li class="item">
                        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                        <input id="${id}" class="text ${LINE}" disabled value="${todo}" job="edit">
                        <i class="fa fa-edit ed" job="edit" id="${id}"></i>
                        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>`;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item)
};

//edit a todo


//add item to the list when user presses enter
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value;
        if(toDo){
            addToDo( toDo, id, false, false);
            LIST.push({
                    name: toDo,
                    id: id,
                    done: false, 
                    trash: false
            });
            // add item to local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }

});

//complete todo

function completeToDo(element){    
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);

    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;

}


//remove a to-do
function removeToDo( element ){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;

}

//edit a to-do

function editToDo(element){
    edit = element.parentNode.getElementsByTagName("input")[0];
    editid = edit.id
    console.log(element.parentNode.getElementsByTagName("input"));
    console.log(editid);
    element.parentNode.getElementsByTagName("input")[0].removeAttribute("disabled");
    element.parentNode.getElementsByTagName("input")[0].focus();

    document.addEventListener("keyup", function(event){
        if(event.keyCode == 13){
            const toDo = edit.value;
            obj = LIST[editid] 
            console.log(obj);
            if(toDo){
                obj.name = toDo
                // add item to local storage
                localStorage.setItem("TODO", JSON.stringify(LIST));
                element.parentNode.getElementsByTagName("input")[0].blur();
            }
        }
    
    });
} 

//target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = event.target.attributes.job.value;
    console.log(elementJob);
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "edit"){
        editToDo(element);
    }
    else if(elementJob == "delete"){
        removeToDo(element);
    }

    // add item to local storage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});








