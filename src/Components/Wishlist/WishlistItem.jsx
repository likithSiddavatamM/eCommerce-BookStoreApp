const WishlistItem = ({ title, author, discountedPrice, price, image, onRemove }) => (
  <div className="wishlist-item">
    <div className="item-image">
      <img src={image || '/placeholder.png'} alt={title || 'No title'} />
    </div>
    <div className="item-details">
      <h3>{title || 'Untitled'}</h3>
      <p className="author">by {author || 'Unknown'}</p>
      <div className="price-container">
     
        
        
        {discountedPrice && ( 
          <span className="discountedPrice">Rs. {discountedPrice}</span>
          )}
         {price && (
          <span className="price">Rs. {price}</span>
        )}
      </div>
    </div>
    <button className="remove-button" onClick={onRemove}>×</button>
  </div>
);

export default WishlistItem;
