import React, { useEffect, useState } from 'react';
import './BookDetails.scss';
import { FaRegStar, FaRegHeart, FaHeart } from 'react-icons/fa';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBookById } from '../../Api';

const BookDetails = () => {
  const { id } = useParams();
  const books = useSelector((state) => state.bookContainer.books);
  const [currentBook, setCurrentBook] = useState({});
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const book = books.find((book) => book._id === id);
      if (book) {
        setCurrentBook(book);
      } else {
        const fetchedBook = await getBookById(id);
        setCurrentBook(fetchedBook);
      }
    };
    fetchDetails();
  }, [id, books]);

  const handleAddToBag = () => {
    setQuantity(1);
    setShowQuantitySelector(true);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      setShowQuantitySelector(false);
    }
    setQuantity(newQuantity);
  };

  const handleWishlistToggle = () => {
    setIsWishlist((prev) => !prev);
  };

  return (
    <div className="book-details">
      <div className="book-details__container">
        <div className="book-details__image-section">
          <img
            src={currentBook.bookImage}
            alt={currentBook.bookName}
            className="book-details__image"
          />
          <div className="book-details__buttons">
            {showQuantitySelector ? (
              <QuantitySelector
                quantity={quantity}
                setQuantity={handleQuantityChange}
              />
            ) : (
              <button
                className="book-details__add-button"
                onClick={handleAddToBag}
              >
                ADD TO BAG
              </button>
            )}
            <button
              className="book-details__wishlist-button"
              onClick={handleWishlistToggle}
            >
              {isWishlist ? (
                <FaHeart className="wishlist-icon wishlist-icon--active" />
              ) : (
                <FaRegHeart className="wishlist-icon" />
              )}
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
            <span className="book-details__rating-badge">{currentBook.rating || '4.5'} ★</span>
            <span className="book-details__review-count">({currentBook.reviews || 20})</span>
          </div>

          <div className="book-details__price">
            <span className="book-details__current-price">
              Rs.{currentBook.discountPrice}
            </span>
            <span className="book-details__original-price">
              Rs.{currentBook.price}
            </span>
          </div>

          <div className="book-details__description">
            <h2 className="book-details__section-title">Book Detail</h2>
            <p className="book-details__description-text">{currentBook.description || 'No description available.'}</p>
          </div>

          {/* Review Section */}
          <div className="book-details__feedback">
            <h3 className="book-details__feedback-title">Customer Feedback</h3>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
