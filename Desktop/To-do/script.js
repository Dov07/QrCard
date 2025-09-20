

const input = document.querySelector(".input");
const deleteAllItem = document.querySelector(".deleteAll");
const addBtn = document.querySelector(".addbtn");
const listGroup = document.querySelector(".listGroup")

let todos;


loadItems();

eventListener();

function eventListener() {
    addBtn.addEventListener("click", addNewItem);

    listGroup.addEventListener("click", deleteItem);

    deleteAllItem.addEventListener("click", deleteAll);
}



function loadItems() {
     todos = getItemsFromLS();
    todos.forEach(function (item){
        createItem(item);
})



}
function getItemsFromLS(){
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}

function setItemToLS(newTodo){
    todos = getItemsFromLS();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));

}

function addNewItem(e) {
    if (input.value.trim() === "") {
        alert("bir şeyler yaz aq");
        e.preventDefault();
        return;
    }
    createItem(input.value);
    setItemToLS(input.value);
    input.value = "";
}


function createItem(text) {
    const li = document.createElement("li");
    li.className = "listeler";
    li.appendChild(document.createTextNode(text));
    // made a
    const a = document.createElement("a");
    a.className = "deleteOption";
    a.setAttribute("href", "#");
    a.innerHTML = "sil"; // buraya fonttan bir şey alırız. 

    li.appendChild(a);

    listGroup.appendChild(li);

 
  
}
// eleman silme

function deleteItem(e) {

    if (e.target.className === "deleteOption") {
        if (confirm("Silmek istediğinize emin misiniz ?")) {
            const todoText = e.target.parentElement.firstChild.textContent;
            e.target.parentElement.remove();
            deleteFromStorage(todoText);
        }
    }
    e.preventDefault();
}


function deleteFromStorage(deleteTodo){
    let todos = getItemsFromLS();
    todos.forEach(function(todo,index){
        if(todo=== deleteTodo ){
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function deleteAll(e) {
    if (confirm("Tümünü silmek istediğinize emin misiniz?")) {
        while (listGroup.firstChild) {
            listGroup.removeChild(listGroup.firstChild);
        }
        localStorage.clear();
    }
    e.preventDefault();
}


