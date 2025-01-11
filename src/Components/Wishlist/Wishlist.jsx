import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWishlist, removeWishlistItem } from '../../App/wishlistSlice';
import WishlistItem from './WishlistItem';
import NotLoggedInPrompt from './NotLoggedInPrompt';
import './Wishlist.scss';
import wishlist from '../../Assets/wishlist.svg'; 

export default function Wishlist() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const { items, status } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (isAuthenticated && (status === 'idle' || status === 'itemRemoved')) {
      dispatch(fetchWishlist());
    }
  }, [isAuthenticated, status, dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      localStorage.setItem('wishlist', JSON.stringify(items)); 
    }
  }, [items, status]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist'));
    if (savedWishlist) {
      dispatch({ type: 'wishlist/fetchWishlist', payload: savedWishlist });
    }
  }, [dispatch]);

  const handleRemove = (bookId) => {
    dispatch(removeWishlistItem(bookId)).then(() => {
      dispatch(fetchWishlist()); 
    });
  };

  if (!isAuthenticated) {
    return <NotLoggedInPrompt message="Login to view your wishlist items." iconSize={64} />;
  }

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <NotLoggedInPrompt message="Failed to load your wishlist." iconSize={64} />;
  }

  if (status === 'succeeded' && (!Array.isArray(items) || items.length === 0)) {
    return (
      <div style={{ textAlign: 'center' }}>
        <img src={wishlist} alt="Empty Wishlist" className="empty-wishlist" />
        <h3 className="empty-wishlist-text">Your wishlist is empty</h3>
      </div>
    );
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