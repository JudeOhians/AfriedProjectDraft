import React, { useState, useRef } from "react";

function PublishPage() {
  const [bookTitle, setBookTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [bookOverview, setOverviewName] = useState("");
  const [file, setFile] = useState(null);
  const [bookCover, setBookCover] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef(null);
  const bookCoverInputRef = useRef(null);

  const handleTitleChange = (e) => {
    setBookTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthorName(e.target.value);
  };

  const handleOverviewChange = (e) => {
    setOverviewName(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleBookCoverChange = (e) => {
    const selectedFile = e.target.files[0];
    setBookCover(selectedFile);
  };

  const handlePublish = () => {
    const formData = new FormData();
    formData.append("bookTitle", bookTitle);
    formData.append("authorName", authorName);
    formData.append("bookOverview", bookOverview);
    formData.append("file", file);
    formData.append("bookCover", bookCover);

    // Make a POST request to upload the book and its details to the server
    fetch("http://localhost:3000/api/upload-book", {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        if (response.status === 201) {
          setSuccessMessage("Book uploaded successfully");
          setErrorMessage("");
          setBookTitle("");
          setAuthorName("");
          setOverviewName("");
          setFile(null);
          setBookCover(null);
          fileInputRef.current.value = ""; // Clear the file input field
          bookCoverInputRef.current.value = ""; // Clear the book cover input field
        } else {
          const errorData = await response.json();
          setErrorMessage(`Error uploading book: ${errorData.message}`);
          setSuccessMessage("");
        }
      })
      .catch((error) => {
        setErrorMessage(`Error uploading book: ${error.message}`);
        setSuccessMessage("");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Publish Your Book</h2>
        {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
        {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Book Title
          </label>
          <input
            type="text"
            value={bookTitle}
            onChange={handleTitleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Author Name
          </label>
          <input
            type="text"
            value={authorName}
            onChange={handleAuthorChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Brief Overview of Book
          </label>
          <input
            type="text"
            value={bookOverview}
            onChange={handleOverviewChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload Book (PDF)
          </label>
          <input
            ref={fileInputRef} // Add a ref to the file input
            name="file"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload Book Cover (.jpg format)
          </label>
          <input
            ref={bookCoverInputRef} // Add a ref to the book cover input
            name="bookCover"
            type="file"
            accept=".jpg"
            onChange={handleBookCoverChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          onClick={handlePublish}
          className="w-full bg-indigo-500 text-white py-2 rounded-md hover-bg-indigo-600 transition duration-300"
        >
          Publish
        </button>
      </div>
    </div>
  );
}

export default PublishPage;
