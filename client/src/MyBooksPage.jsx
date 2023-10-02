// MyBooksPage.js
import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';

function MyBooksPage() {
  const [uploadedBooks, setUploadedBooks] = useState([]);

  useEffect(() => {
    // Fetch the list of uploaded books from your backend API when the component mounts.
    // You should replace this with your actual API endpoint.
    fetch('/api/my-books')
      .then((response) => response.json())
      .then((data) => setUploadedBooks(data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-4">My Uploaded Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {uploadedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBooksPage;
