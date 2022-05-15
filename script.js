const header = document.querySelector('.header');
const addBookBtn = document.querySelector('.add-book-button');

const blur = document.getElementsByClassName('blur');

const formWrapper = document.querySelector('.form-wrapper');
const formCloser = document.querySelector('.form-closer');

const title = document.querySelector('input[name="title"]');
const author = document.querySelector('input[name="author"]');
const pages = document.querySelector('input[name="pages"]');
const submit = document.querySelector('input[name="submit"]');

const cardWrapper = document.querySelector('.card-wrapper');
let cardHeader = document.querySelector('.card-header');

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary() {
    const read = document.querySelector('input[name=read]:checked').value;
    myLibrary.push(new Book(`${title.value}`, `${author.value}`, `${pages.value}`, `${read}`));
    addBookToDiv();
}

function addBookToDiv() {
    for (let i = myLibrary.length - 1; i < myLibrary.length; i++) {
        bookDiv = document.createElement("div");
        bookDiv.classList.add("bookDiv");
        bookDiv.dataset.index = `${myLibrary.indexOf(myLibrary[i])}`;
        cardWrapper.appendChild(bookDiv);
        bookDiv.innerHTML = `<header class="card-header"><p class="card-closer delete"></p></header> <p class="card-text"><b> ${myLibrary[i].title} </b><br> by <b> ${myLibrary[i].author} </b><br> Pages: ${myLibrary[i].pages} </p> `;
        addBtnsToDiv();
        activeClass();
    }
}

function activeClass() {
    if (header.classList.contains('active') || cardWrapper.classList.contains('active')) {
        for (let i = 0; i < blur.length; i++) {
            blur[i].classList.remove('active');
        }
        formWrapper.classList.remove('active');
    } else {
        for (let i = 0; i < blur.length; i++) {
            blur[i].classList.toggle('active');
        }
        
        formWrapper.classList.toggle('active');
    }
}

function addBtnsToDiv() {
    // deleteBtn = document.createElement("p");
    // deleteBtn.classList.add("card-closer");
    // deleteBtn.classList.add("delete");
    // deleteBtn.textContent = "X";
    // bookDiv.appendChild(deleteBtn);

    changeBtn = document.createElement("button");
    changeBtn.classList.add("change");
    // changeBtn.classList.add("card-text");
    
    if (myLibrary[bookDiv.dataset.index].read === 'Yes') {
        changeBtn.textContent = "READ";
        changeBtn.classList.add("read-color");
    } else {
        changeBtn.textContent = "NOT READ";
        changeBtn.classList.remove("read-color");
    }
    bookDiv.appendChild(changeBtn);
}

function changeReadStatus(event) {
    if (event.target.classList.contains("change")) {
        deleteArray = event.target.parentNode.dataset.index;
        if (myLibrary[deleteArray].read === 'Yes') {
            myLibrary[deleteArray].read = 'No';
            event.target.textContent = "NOT READ";
            event.target.classList.remove("read-color");
        } else {
            myLibrary[deleteArray].read = 'Yes';
            event.target.textContent = "READ";
            event.target.classList.add("read-color");
        }
    }
}

function setDataAttr() {
    let newBookDiv = document.querySelectorAll(".bookDiv");
    for (let i = 0; i < newBookDiv.length; i++) {
        newBookDiv[i].dataset.index = i;
    }
}

function deleteDiv(event) {
    if(event.target.classList.contains("delete")){
        event.target.closest("div").remove();
        deleteArray = event.target.parentNode.dataset.index;
        myLibrary.splice(deleteArray, 1);
        setDataAttr();
    }
}

document.addEventListener("click", function(event) {
    if (event.target.matches(".add-book-button") || !event.target.closest(".form-wrapper")) {
        for (let i = 0; i < blur.length; i++) {
            blur[i].classList.remove('active');
        }
        formWrapper.classList.remove('active');
    }
}, true)

cardWrapper.addEventListener("click", changeReadStatus);
cardWrapper.addEventListener("click", deleteDiv);
submit.addEventListener("submit", addBookToLibrary);
addBookBtn.addEventListener("click", activeClass);
formCloser.addEventListener("click", activeClass);







