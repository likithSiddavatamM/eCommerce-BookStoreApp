import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import React from "react";
import img from "../../Assets/img2.png";
import './Book.scss';
import { useNavigate } from "react-router-dom";

export default ({ book }) => {
  const navigate = useNavigate();

    return (
      <span>
        <Card className="cardContainer" onClick={()=>{navigate(`book/${book._id}`)}}>
          <CardActionArea>
            <CardContent className="cardContent">
              <CardMedia
                className="cardMedia"
                component="img"
                image={book.bookImage?book.bookImage:img}
                alt="BookImage"
              />
            </CardContent>
            <CardContent>
              <p className="bookName">{book.bookName}</p>
              <p className="author">{book.author}</p>
              <span className="rating">
                <span className="ratingTag">{  Math.floor(Math.random() * (5 - 1 + 1) * 10) / 10 + 1 } ★</span>
                <span className="ratingCount">({ (Math.floor(Math.random() * (1000 - 1 + 1)) + 1) })</span>
              </span>
              <span className="price">Rs. {book.discountPrice}</span>
              <span className="discount">Rs. {book.price}</span>
            </CardContent>
          </CardActionArea>
        </Card>
      </span>
  );
};
