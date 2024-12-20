
import React, { useState } from 'react';
import { BookProvider } from './context/BookContext';
import BookTable from './components/BookTable';
import BookForm from './components/BookForm';
import Filters from './components/Filters';
import './styles/App.css';

const App: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<any[]>(books);
  const [editingBook, setEditingBook] = useState<any | null>(null);

  const addBook = (book: any) => {
    setBooks([...books, book]);
    setFilteredBooks([...books, book]);
  };

  const updateBook = (updatedBook: any) => {
    const updatedBooks = books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
    setEditingBook(null); // Clear editing state after updating
  };

  const deleteBook = (bookId: number) => {
    const updatedBooks = books.filter((book) => book.id !== bookId);
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
  };

  const filterBooks = (author: string) => {
    let filtered = books;
    if (author) {
      filtered = filtered.filter((book) => book.author.toLowerCase().includes(author.toLowerCase()));
    }
    setFilteredBooks(filtered);
  };

  return (
    <BookProvider>
      <div className="app">
        <h1>Bookstore Inventory</h1>
        <BookForm addBook={addBook} updateBook={updateBook} editingBook={editingBook} />
        <Filters filterBooks={filterBooks} />
        <BookTable books={filteredBooks} updateBook={updateBook} deleteBook={deleteBook} setEditingBook={setEditingBook} />
      </div>
    </BookProvider>
  );
};

export default App;
