    // --- Book Class ---
    class Book {
      constructor(title, author, pages, isRead) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
      }

      toggleRead() {
        this.isRead = !this.isRead;
      }
    }

    // --- Library Class ---
    class Library {
      constructor() {
        this.books = [];
      }

      addBook(title, author, pages, isRead) {
        const book = new Book(title, author, pages, isRead);
        this.books.push(book);
        this.render();
      }

      removeBook(id) {
        this.books = this.books.filter(book => book.id !== id);
        this.render();
      }

      toggleRead(id) {
        const book = this.books.find(b => b.id === id);
        if (book) {
          book.toggleRead();
          this.render();
        }
      }

      render() {
        const booksDiv = document.getElementById('books');
        booksDiv.innerHTML = '';

        this.books.forEach(book => {
          const card = document.createElement('div');
          card.className = 'book-card';
          card.innerHTML = `
            <h3>${book.title}</h3>
            <p>by <b>${book.author}</b></p>
            <p>Pages: ${book.pages}</p>
            <p>Status: <span>${book.isRead ? 'Read' : 'Not Read'}</span></p>
            <button data-id="${book.id}" class="toggle-read-btn">${book.isRead ? 'Mark Unread' : 'Mark Read'}</button>
            <button data-id="${book.id}" class="remove-btn">Remove</button>
          `;
          booksDiv.appendChild(card);
        });

        // Attach event listeners
        document.querySelectorAll('.remove-btn').forEach(btn => {
          btn.onclick = e => this.removeBook(btn.dataset.id);
        });

        document.querySelectorAll('.toggle-read-btn').forEach(btn => {
          btn.onclick = e => this.toggleRead(btn.dataset.id);
        });
      }
    }

    // --- Initialize Library ---
    const myLibrary = new Library();

    // --- DOM Elements ---
    const newBookBtn = document.getElementById('new-book-btn');
    const bookForm = document.getElementById('book-form');
    const cancelBtn = document.getElementById('cancel-btn');

    // Show form
    newBookBtn.onclick = () => {
      bookForm.style.display = 'block';
    };

    // Hide and reset form
    cancelBtn.onclick = () => {
      bookForm.style.display = 'none';
      bookForm.reset();
    };

    // Form submission
    bookForm.onsubmit = e => {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const pages = document.getElementById('pages').valueAsNumber;
      const isRead = document.getElementById('isRead').checked;

      myLibrary.addBook(title, author, pages, isRead);
      bookForm.style.display = 'none';
      bookForm.reset();
    };

    // --- Initial books (optional)
    myLibrary.addBook("1984", "George Orwell", 328, true);
    myLibrary.addBook("The Hobbit", "J.R.R. Tolkien", 295, false);