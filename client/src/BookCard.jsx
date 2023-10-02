// BookCard.js
import React from 'react';

function BookCard({ book }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold">{book.title}</h3>
      <p className="text-gray-600">{book.author}</p>
      <p className="mt-2">{book.overview}</p>
      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          View
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Manage
        </button>
      </div>
    </div>
  );
}

export default BookCard;
