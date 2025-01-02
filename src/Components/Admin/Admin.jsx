import React, { useState } from "react";
import "./Admin.scss";
import { Button, Card, CardActionArea, CardContent, CardMedia } from "@mui/material";

const Admin = () => {
  const [books, setBooks] = useState([]);
  const [bookForm, setBookForm] = useState({
    bookName: "",
    author: "",
    description: "",
    bookImage: "",
    quantity: "",
    price: "",
    discountPrice: "",
  });
  const [isAddingNewBook, setIsAddingBook] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookForm({ ...bookForm, [name]: value });
  };

  const handleAddNewBook = () => {
    setIsAddingBook(true); 
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBookForm({ ...bookForm, bookImage: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBooks([...books, bookForm]);
    setBookForm({
      bookName: "",
      author: "",
      description: "",
      bookImage: "",
      quantity: "",
      price: "",
      discountPrice: "",
    });
    setIsAddingBook(false);
  };

  return (
    <div className="admin-container">
      <div className="admin-form-section">
        <div className="admin-title">
        <h2 className="admin-form-title">Books Dashboard</h2>
        <button className="admin-className-add-btn" onClick={handleAddNewBook}>
           + Add New Book
        </button>
        </div>
        {isAddingNewBook && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="bookName"
            className="admin-form-input"
            value={bookForm.bookName}
            onChange={handleInputChange}
            placeholder="Book Name"
            required
          />
          <input
            type="text"
            name="author"
            className="admin-form-input"
            value={bookForm.author}
            onChange={handleInputChange}
            placeholder="Author"
            required
          />
          <textarea
            name="description"
            className="admin-form-textarea"
            value={bookForm.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
          ></textarea>
          <input
            type="file"
            name="bookImage"
            className="admin-form-input"
            accept="image/*"
            placeholder="Upload The Image"
            onChange={handleImageUpload}
            required
          />
          <input
            type="number"
            name="quantity"
            className="admin-form-input"
            value={bookForm.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            required
          />
          <input
            type="number"
            name="price"
            className="admin-form-input"
            value={bookForm.price}
            onChange={handleInputChange}
            placeholder="Price"
            required
          />
          <input
            type="number"
            name="discountPrice"
            className="admin-form-input"
            value={bookForm.discountPrice}
            onChange={handleInputChange}
            placeholder="Discount Price"
            required
          />
          <button type="submit" className="admin-submit-btn">Add Book</button>
        </form> 
        )}
      </div>

      <div className="admin-book-section">
        {books.map((book, index) => (
          <Card className=" Admin-cardContainer" key={index}>
          <CardActionArea>
            <CardContent className="cardContent">
            {book.bookImage && (<CardMedia
                className="Admin-cardMedia"
                component="img"
                image={book.bookImage}
                alt="BookImage"
              /> )}
            </CardContent>
            <CardContent className="Admin-cardContentDown">
              <p className="Admin-bookName">{book.bookName}</p>
              <p className="Admin-author">{book.author}</p>
              <span className="Admin-price">Rs. {book.discountPrice}</span>
              <span className="Admin-discount">Rs. {book.price}</span>
            </CardContent>
            <Button className="admin-delete-btn" sx={{color:"#8f2b2f"}}>Delete</Button>
          </CardActionArea>
        </Card>
        ))}
      </div>
    </div>
  );
};

export default Admin;
