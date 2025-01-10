import React, { useEffect, useState } from 'react';
import './BookDetails.scss';
import { FaRegStar, FaRegHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBookById, addToCartApi } from '../../Api';
import { addToCart, setQuantity, setTotalBookQuantity, updateQuantity } from '../../App/CartSlice';
import QuantitySelector from '../QuantitySelector/QuantitySelector';

const BookDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentBook, setCurrentBook] = useState({});
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  
  const books = useSelector((state) => state.bookContainer.books);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const quantity = useSelector((state) => state.cart.quantities[id] || 0);
  
  useEffect(() => {
    const fetchBookDetails = async () => {
      const book = books.find((book) => book._id === id);
      if (book) {
        setCurrentBook(book);
        dispatch(setTotalBookQuantity({ bookId: id, quantity: book.quantity }));
      } else {
        const fetchedBook = await getBookById(id);
        setCurrentBook(fetchedBook);
        dispatch(setTotalBookQuantity({ bookId: id, quantity: fetchedBook.quantity }));
      }
    };
    fetchBookDetails();
  }, [id, books, dispatch]);

  useEffect(() => {
    setShowQuantitySelector(quantity > 0);
  }, [quantity]);

  const handleAddToBag = async () => {
    const bookToAdd = { ...currentBook, bookId: id, quantity: 1 };

    if (isAuthenticated) {
      try {
        await addToCartApi(currentBook._id);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
    dispatch(addToCart(bookToAdd));
    dispatch(setQuantity({ bookId: id, quantity: 1 }));
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      setShowQuantitySelector(false);
    } else {
      dispatch(updateQuantity({ id: currentBook._id, quantity: newQuantity }));
    }
  };

  return (
    <div className="book-details">
      <div className="book-details__container">
        <div className="book-details__image-section">
          <div className="book-details__image-container">
            <div className="book-details__main-image">
              <img
                src={currentBook.bookImage}
                alt={currentBook.bookName}
                className="book-details__image"
              />
            </div>
          </div>
          <div className="book-details__buttons">
            {showQuantitySelector ? (
              <QuantitySelector
                setQuantity={handleQuantityChange}
                id={currentBook._id}
              />
            ) : (
              <button
                className="book-details__add-button"
                onClick={handleAddToBag}
              >
                ADD TO BAG
              </button>
            )}
            <button className="book-details__wishlist-button">
              <FaRegHeart className="wishlist-icon" />
              WISHLIST
            </button>
          </div>
        </div>

        <div className="book-details__info-section">
          <div className="book-details__header">
            <h1 className="book-details__title">{currentBook.bookName}</h1>
            <p className="book-details__author">by {currentBook.author}</p>
          </div>

          <div className="book-details__rating">
            <span className="book-details__rating-badge">4.5 ★</span>
            <span className="book-details__review-count">(20)</span>
          </div>

          <div className="book-details__price">
            <span className="book-details__current-price">Rs. {currentBook.discountPrice}</span>
            <span className="book-details__original-price">Rs. {currentBook.price}</span>
          </div>

          <div className="book-details__description">
            <h2 className="book-details__section-title">Book Detail</h2>
            <p className="book-details__description-text">{currentBook.description}</p>
          </div>

          <div className="book-details__feedback">
            <h2 className="book-details__section-title">Customer Feedback</h2>
            <div className="book-details__rating-input">
              <p className="book-details__rating-label">Overall rating</p>
              <div className="book-details__stars">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button key={rating} className="book-details__star-button">
                    <FaRegStar className="book-details__star-empty" />
                  </button>
                ))}
              </div>
              <textarea
                placeholder="Write your review"
                className="book-details__review-input"
                readOnly
              />
              <button className="book-details__submit-button">Submit</button>
            </div>
            <div className="book-details__reviews">
              <div className="book-details__review">
                <div className="book-details__review-header">
                  <span className="book-details__review-author">Aniket Chile</span>
                  <div className="book-details__review-stars">
                    {[1, 2, 3].map((rating) => (
                      <FaRegStar key={rating} className="book-details__star-filled" />
                    ))}
                    {[1, 2].map((rating) => (
                      <FaRegStar key={rating} className="book-details__star-empty" />
                    ))}
                  </div>
                </div>
                <p className="book-details__review-text">Good product. Even though the translation could have been better, Chanakya's neeti are thought provoking. Chanakya has written on many different topics and his writings are succinct.</p>
              </div>
              <div className="book-details__review">
                <div className="book-details__review-header">
                  <span className="book-details__review-author">Shweta Bodkar</span>
                  <div className="book-details__review-stars">
                    {[1, 2, 3, 4].map((rating) => (
                      <FaRegStar key={rating} className="book-details__star-filled" />
                    ))}
                    <FaRegStar className="book-details__star-empty" />
                  </div>
                </div>
                <p className="book-details__review-text"> Good product. Even though the translation could have been better, Chanakya's neeti are thought provoking. Chanakya has written on many different topics and his writings are succinct.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

