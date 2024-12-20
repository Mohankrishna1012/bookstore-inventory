
import React, { useState, useEffect } from 'react';

interface BookFormProps {
  addBook: (book: any) => void;
  updateBook: (updatedBook: any) => void;
  editingBook: any;
}

const BookForm: React.FC<BookFormProps> = ({ addBook, updateBook, editingBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState<number | string>('');

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setGenre(editingBook.genre);
      setPrice(editingBook.price);
    }
  }, [editingBook]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !author || !genre || !price) {
      alert("All fields are required.");
      return;
    }

    if (isNaN(Number(price)) || Number(price) <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    const newBook = { id: Date.now(), title, author, genre, price: parseFloat(price.toString()) };

    if (editingBook) {
      updateBook({ ...editingBook, title, author, genre, price: parseFloat(price.toString()) });
    } else {
      addBook(newBook);
    }

    // Reset the form
    setTitle('');
    setAuthor('');
    setGenre('');
    setPrice('');
  };

  return (
    <div className="book-form">
      <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Select Genre</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Science">Science</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Biography">Biography</option>
          <option value="Fiction">Romance</option>
          <option value="Non-Fiction">Dark</option>
          <option value="Science">Horror</option>
          <option value="Fantasy">Documentry</option>
          <option value="Biography">Drama</option>
        </select>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input type="submit" value={editingBook ? 'Save Changes' : 'Add Book'} />
      </form>
    </div>
  );
};

export default BookForm;
