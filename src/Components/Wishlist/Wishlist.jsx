import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWishlist, removeWishlistItem } from '../../App/wishlistSlice';
import WishlistItem from './WishlistItem';
import './Wishlist.scss';

export default function Wishlist() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchWishlist());
    }
  }, [status, dispatch]);

  const handleRemove = (bookId) => {
    dispatch(removeWishlistItem(bookId));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (status === 'succeeded' && (!Array.isArray(items) || items.length === 0)) {
    return <div>Your wishlist is empty.</div>;
  }

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-header">
        My Wishlist ({String(Array.isArray(items) ? items.length : 0).padStart(2, '0')})
      </h2>
      <div className="wishlist-items">
        {Array.isArray(items) && items.map((item) => (
          <WishlistItem
            key={item._id}
            title={item.bookName}
            author={item.author}
            price={item.price}
            discountedPrice={item.discountedPrice}
            image={item.bookImage}
            onRemove={() => handleRemove(item.bookId)}
          />
        ))}
      </div>
    </div>
  );
}
