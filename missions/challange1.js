class Book {
  constructor(title, description, author) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.title = title;
    this.description = description;
    this.author = author;
  }
}

class Library {
  constructor(books = []) {
    this.books = books;
  }

  addBook(bookInfo) {
    // make error if bookInfo is not an object
    if (typeof bookInfo !== 'object') {
      throw new Error('bookInfo must be an object');
    }
    const book = new Book(bookInfo.title, bookInfo.description, bookInfo.author);
    this.books.push(book);
    return book;
  }

  getBooks() {
    if (!this.books) {
      throw new Error('Books not found');
    }
    return this.books;
  }

  removeBookById(id) {
    const book = this.getBookById(id);
    if (!book) {
      throw new Error('Book not found');
    }
    this.books = this.books.filter(book => book.id !== id);
  }

  getBookById(id) {
    // make error if book not found
    const book = this.books.find(book => book.id === id);
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  }

  updateBookById(id, info) {
    const book = this.getBookById(id);
    if (!book) {
      throw new Error('Book not found');
    }

    if (info.title) {
      book.title = info.title;
    }
    if (info.description) {
      book.description = info.description;
    }
    if (info.author) {
      book.author = info.author;
    }
    return book;
  }
}

// Teste 1: verifica se a classe Book está funcionando corretamente
const book = new Book('The Great Gatsby', 'A novel by F. Scott Fitzgerald', 'F. Scott Fitzgerald');
console.assert(book.title === 'The Great Gatsby');
console.assert(book.description === 'A novel by F. Scott Fitzgerald');
console.assert(book.author === 'F. Scott Fitzgerald');

// Teste 2: verifica se a classe Library está funcionando corretamente
const library = new Library();
const book1 = library.addBook({ title: 'Pride and Prejudice', description: 'A novel by Jane Austen', author: 'Jane Austen' });
const book2 = library.addBook({ title: 'To Kill a Mockingbird', description: 'A novel by Harper Lee', author: 'Harper Lee' });
console.assert(library.getBooks().length === 2);
console.assert(library.getBookById(book1.id) === book1);

// Teste 3: verifica se os métodos removeBookById e updateBookById estão funcionando corretamente
library.removeBookById(book1.id);
console.assert(library.getBooks().length === 1);
library.updateBookById(book2.id, { title: 'To Kill a Mockingbird (new title)' });
console.assert(library.getBookById(book2.id).title === 'To Kill a Mockingbird (new title)');

// console all objects created
console.log('book: ', JSON.stringify(book, null, 2));
console.log('library: ', JSON.stringify(library, null, 2));
