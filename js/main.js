// function calc(n) {
//     return {
//         toBe(m) {
//             return n == m ? {value: true} : {error : 'not equal'}
//         },
//         notToBe(s) {
//             return n != s ? {value: true} : {error : "equal"};
//         }
//     }
// }

// console.log(calc(5).toBe(4));
// console.log(calc(5).notToBe(4));

// const arr = [
//     ['1','2','3'],
//     [true],
//     ['4','5','6'],
// ]

// let res = arr.reduce((acc, item, index, array)=>{
//     return acc.concat(item);
// }, []);

// console.log(res);

//! Sinf ishidagi uy ishi 

let elForm = document.querySelector(".js-form");
let elInput = document.querySelector(".js-input");
let elList = document.querySelector(".js-list");

let elAllBtn = document.querySelector(".js-all-btn");
let elCompBtn = document.querySelector(".js-completed-btn");
let elUncompBtn = document.querySelector(".js-uncompleted-btn");
let elAllStrBtn = document.querySelector(".all-str");
let elCompStrBtn = document.querySelector(".comp-str");
let elUnCompStrBtn = document.querySelector(".uncomp-str");

let todos = [];

let compSum = 0;
let unCompSum = 0;

elForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    let inputValue = elInput.value;
    elInput.value = '';

    todos.push({
        id: todos.length ? (todos.at(-1).id + 1) : 1,
        text : inputValue,
        isCompleted : false,
    })

    elAllStrBtn.textContent = todos.length;
    elUnCompStrBtn.textContent = todos.length - compSum;
    elCompStrBtn.textContent = compSum;

    render(todos, elList);
})

elList.addEventListener("click", (evt) => {
    if(evt.target.matches(".todo-delete-btn")) {
        let deletedTodoId = evt.target.dataset.todoId; 

        let deletedIndex = todos.findIndex((item) => item.id == deletedTodoId );
        todos.splice(deletedIndex, 1);

        render([...todos], elList);
    }

    if(evt.target.matches(".todo-edit-btn")) {
        let newEditText = prompt("O'zgartirilayotgan textni kiriting: ");
        let editedTodoId = evt.target.dataset.todoId; 

        let editItem = todos.find((item) => item.id == editedTodoId );
        editItem.text = newEditText;

        render([...todos], elList);
    }

    if(evt.target.matches(".todo-checkbox")) {
          
        let completedTodoId = evt.target.dataset.todoId; 

        let completedItem = todos.find((item) => item.id == completedTodoId );
        // console.log(completedItem);

        completedItem.isCompleted = !completedItem.isCompleted;
        if(completedItem.isCompleted) {
            compSum++;
        }

        render([...todos], elList);
    }
})

let btnWrap = document.querySelector(".btn-groups");

btnWrap.addEventListener("click", evt => {
    if (evt.target.matches(".js-all-btn")) {
        render(todos,elList)
    }
    if (evt.target.matches(".js-completed-btn")) {
        const checkeds = todos.filter(item => item.isCompleted)
        render(checkeds, elList)
    }
    if (evt.target.matches(".js-uncompleted-btn")) {
        const uncheckeds = todos.filter(item => !item.isCompleted)
        render(uncheckeds, elList)
    }
})

elAllBtn.addEventListener("click", function(evt) {
    evt.preventDefault();

    console.log("all");
})

elCompBtn.addEventListener("click", function(evt) {
    evt.preventDefault();

    console.log("comp");
})
elUncompBtn.addEventListener("click", function(evt) {
    evt.preventDefault();

    console.log("uncomp");
})

function render(arr, node) {
    node.innerHTML = '';

    arr.forEach((item) => {
        let newItem = document.createElement("li");
        let newText = document.createElement("span");
        let newInput = document.createElement("input");
        let newDeleteBtn = document.createElement("button");
        let newEditBtn = document.createElement("button");

        newText.textContent = item.text;
        newInput.type = "checkbox";
        newDeleteBtn.textContent = "Delete";
        newEditBtn.textContent = "Edit";

        newItem.setAttribute("class", "list-group-item d-flex align-items-center");
        newInput.setAttribute("class", "form-check-input me-2 todo-checkbox")
        newText.setAttribute("class", "flex-grow-1");
        newDeleteBtn.setAttribute("class", "btn btn-danger todo-delete-btn");
        newEditBtn.setAttribute("class", "btn btn-warning me-2 todo-edit-btn");

        newDeleteBtn.dataset.todoId = item.id;
        newEditBtn.dataset.todoId = item.id;
        newInput.dataset.todoId = item.id;

        if(item.isCompleted) {
            newInput.checked = true;
            newText.classList.add("text-decoration-line-through");
            newText.classList.add("fw-bold");
        }


        newItem.append(newInput, newText, newEditBtn, newDeleteBtn);
        node.appendChild(newItem);


    });
}




