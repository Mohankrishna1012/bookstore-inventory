
import React, { useState } from 'react';

interface FiltersProps {
  filterBooks: (author: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ filterBooks }) => {
  const [selectedAuthor, setSelectedAuthor] = useState('');

  const handleFilter = () => {
    filterBooks(selectedAuthor);
  };

  return (
    <div className="filters">
      <h2>Filter by Author</h2>
      <input
        type="text"
        value={selectedAuthor}
        onChange={(e) => setSelectedAuthor(e.target.value)}
        placeholder="Enter Author Name"
      />
      <button onClick={handleFilter}>Apply Filter</button>
    </div>
  );
};

export default Filters;
