
import React from 'react';

interface BookTableProps {
  books: any[];
  updateBook: (updatedBook: any) => void;
  deleteBook: (bookId: number) => void;
  setEditingBook: (book: any) => void;
}

const BookTable: React.FC<BookTableProps> = ({ books, updateBook, deleteBook, setEditingBook }) => {
  return (
    <div className="book-table">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan={5}>No books available.</td>
            </tr>
          ) : (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>${book.price}</td>
                <td>
                  <button onClick={() => setEditingBook(book)} className="edit-btn">
                    Edit
                  </button>
                  <span>   </span>
                  <button onClick={() => deleteBook(book.id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
