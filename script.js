const myLibrary = [];

//Book constructor
const Book = function(title,author,pages,isRead){
    this.id = crypto.randomUUID();
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.isRead=isRead;
}

Book.prototype.toggleRead = function (){
    this.isRead = !this.isRead;
}

//Add book to library array
function addBookToLibrary(title,author,pages,isRead){
    const book = new Book(title,author,pages,isRead);
    myLibrary.push(book);
    renderBooks();
}

//Remove book by ID
function removeBookBy(id){
    const index = myLibrary.findIndex(x => x.id === id);
    if(index !== -1){
        myLibrary.splice(index,1);
        renderBooks();
    }
}

//Render all books on page
function renderBooks(){
    const booksDiv = document.getElementById('books');
    booksDiv.innerHTML = '';
    myLibrary.forEach( book =>{
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <h3>${book.title}</h3>
            <p>by <b>${book.author}</b></p>
            <p>Pages: ${book.pages}</p>
            <p>Status: <span>${book.isRead === true ? 'Read' : 'Not Read'}</span></p>
            <button data-id="${book.id}" class="toggle-read-btn">${book.isRead ? 'Mark Unread' : 'Mark Read'}</button>
            <button data-id="${book.id}" class="remove-btn">Remove</button>
        `;
        booksDiv.appendChild(card);
    });

    //Listener for remove & toggle 
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.onclick = e => removeBookBy(btn.dataset.id);
    });
    document.querySelectorAll('.toggle-read-btn').forEach(btn => {
        btn.onclick = e => {
            const book = myLibrary.find(b=>b.id === btn.dataset.id);
            if(book){
                book.toggleRead();
                renderBooks();
            }
        }
    }); 
}

//Show/hide form logic
const newBookBtn = document.getElementById('new-book-btn');
const bookForm = document.getElementById('book-form');
const cancelBtn = document.getElementById('cancel-btn');
newBookBtn.onclick = () => { bookForm.style.display='block'; };
cancelBtn.onclick = () => {
    bookForm.style.display = 'none';
    bookForm.reset();
};

//Form submit
bookForm.onsubmit = (e) =>{
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked;
    addBookToLibrary(title,author,pages,isRead);
    bookForm.style.display = 'none';
    bookForm.reset();
};

// --- 初始化展示一些书籍（可选）---
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
