let myLibrary = [];

var title = author = pages = read = undefined; 
const library = document.querySelector('.library');

// Open and close up new input form
const newFormButton = document.querySelector('.add-book-button');
const modal = document.querySelector('.modal-overlay');
newFormButton.onclick = function () {
    modal.style.display ="block";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function closeInputForm () {
    modal.style.display = "none"; 
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").checked = false;
}

// Add book to library
function newBook(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
};

function isRead() {
    if (document.getElementById("read").checked === true) {
        return "Read";
    }
    else {
        return "Not read";
    }
}

function addBookToLibrary (title, author, pages, read) {
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var pages = document.getElementById("pages").value;
    var read = isRead();
    const book = new newBook(title, author, pages, read);
    myLibrary.push(book);
}


// Display book
function addButtons (div, book) {
    const readButton = document.createElement ('button');
    readButton.classList.add('read-button');
    div.appendChild(readButton);
    readButton.textContent = book["read"];
    if (book["read"] === "Read") {
        readButton.classList.add('green-button');
    }
    const removalButton = document.createElement ('button');
    removalButton.textContent = "Remove book";
    removalButton.classList.add('removal-button');
    div.appendChild(removalButton);
}

function displayBook (book, index) {
    const div = document.createElement ('div');
    div.classList.add('book');
    div.setAttribute(`data-index`,`${index}`);
    library.appendChild(div);
    const bookAsArray = Object.values(book);
    for (i = 0; i < 3; i++) {
        const p = document.createElement ('p');
        div.appendChild(p);
        p.textContent = `${bookAsArray[i]}`;
    }
    addButtons (div, book);
}

function clearDisplay () {
    const library = document.querySelector('.library');
    while (library.firstChild) {
        library.removeChild(library.lastChild);
}};

function displayLibrary () {
    clearDisplay()
    myLibrary.forEach((element, index) =>
    displayBook(element, index))
};

// Remove book from library
function removeBook (index) {
    myLibrary.splice(index, 1);
}

function enableRemovalButton () {
    const removalButton = document.querySelectorAll('.removal-button');
    removalButton.forEach((button) => {
        button.addEventListener ('click', () => {
            removeBook(parseInt(button.parentElement.dataset.index));
            displayLibrary();
            enableRemovalButton();
            enableReadButton();
})})};

// Change read and unread status of book

function changeReadStatus (index) {
    if (myLibrary[index]['read'] === "Read") {
        myLibrary[index]['read'] = "Not read";
    }
    else {
        myLibrary[index]['read'] = "Read";
}};

function enableReadButton () {
    const readButton = document.querySelectorAll ('.read-button');
    readButton.forEach((button) => {
        button.addEventListener ('click', () => {
            changeReadStatus(button.parentElement.dataset.index);
            displayLibrary();
            enableRemovalButton();
            enableReadButton();
            console.log(myLibrary);
})})};

// Initiate storage of book and display of library when pressing submit
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener ('click', () => {
    event.preventDefault();
    addBookToLibrary();
    displayLibrary();
    closeInputForm ();
    enableRemovalButton();
    enableReadButton ();
});





