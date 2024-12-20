import React, { createContext, useContext, useState } from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  price: number;
}

interface BookContextProps {
  books: Book[];
  addBook: (book: Book) => void;
  editBook: (book: Book) => void;
  deleteBook: (id: string) => void;
}

const BookContext = createContext<BookContextProps | undefined>(undefined);

export const BookProvider: React.FC = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);

  const addBook = (book: Book) => setBooks((prev) => [...prev, book]);

  const editBook = (updatedBook: Book) =>
    setBooks((prev) =>
      prev.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );

  const deleteBook = (id: string) =>
    setBooks((prev) => prev.filter((book) => book.id !== id));

  return (
    <BookContext.Provider value={{ books, addBook, editBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) throw new Error('useBooks must be used within a BookProvider');
  return context;
};
