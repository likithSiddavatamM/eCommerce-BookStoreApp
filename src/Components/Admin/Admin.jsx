import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box'
import React, { useState, useEffect } from "react";
import "./Admin.scss";
import { Button, Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { createBookByAdminApiCall, fetchAdminBooks,deleteAdminBooks } from "../../Api";
import { jwtDecode } from "jwt-decode";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';

const HistoryCard = ({ book, status }) => {
  const statusColor = status === "created" ? "green" : "red";
  return (
    <Card
      className="admin-history-card"
      style={{
        backgroundColor: '#F5F5F5', 
        margin: '15px',
        padding: '7px',
      }}
    >
      <CardActionArea>
        <CardContent
          className="history-card-content"
          style={{
            display: 'flex', 
            alignItems: 'center', 
          }}
        >
          {book.bookImage && (
            <CardMedia
              className="history-card-media"
              component="img"
              image={book.bookImage}
              alt="Book Image"
              style={{
                width: '100px',
                height: 'auto',
                objectFit: 'cover',
                marginRight: '20px', 
              }}
            />
          )}
          <div className="history-card-details">
            <p className="history-card-id">Book ID: {book._id}</p>
            <p className="history-card-name">Book Name:{book.bookName}</p>
            <p className="history-card-time">
              {new Date(book.createdAt).toLocaleString()}
            </p>
            <span
              className="history-card-status"
              style={{ color: statusColor }}
            >
              {status === 'created' ? '.Created' : 'Deleted'}
            </span>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
  
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3}}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Admin = () => {{
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 
    const [books, setBooks] = useState([]);
    const [bookForm, setBookForm] = useState({
      bookName: "",
      author: "",
      description: "",
      bookImage: null,
      quantity: "",
      price: "",
      discountPrice: "",
    });
    const [isAddingNewBook, setIsAddingBook] = useState(false);
    const [AdminId,setAdminId]=useState("")
    const [history, setHistory] = useState([]);
  
    const getAdminUserId = () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Access token not found');
      }
      const decodedToken = jwtDecode(token); 
      return decodedToken.user._id    ;
    };
  
    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const adminUserId = getAdminUserId();
          console.log('Admin User ID:', adminUserId);
          setAdminId(adminUserId);
          const fetchedBooks = await fetchAdminBooks();
          console.log(fetchedBooks);
          const adminBooks = fetchedBooks.filter(book => book.admin_user_id === adminUserId);
          setBooks(adminBooks);

          const historyData = fetchedBooks.map((book) => ({
            ...book,
            status: book.deletedAt ? "deleted" : "created",
          }));
  
          // Sort history by the createdAt or deletedAt date (latest first)
          const sortedHistory = historyData.sort((a, b) => new Date(b.createdAt || b.deletedAt) - new Date(a.createdAt || a.deletedAt));
          setHistory(sortedHistory);
  
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      };
  
      fetchBooks();
    }, []);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setBookForm({ ...bookForm, [name]: value });
    };
  
    const handleAddNewBookOpen = () => {
      setIsAddingBook(true);
    };
    const handleAddNewBookClose =() =>{
      setIsAddingBook(false);
    }
    
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setBookForm({ ...bookForm, bookImage: file });
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const formData = new FormData();
      formData.append("bookName", bookForm.bookName);
      formData.append("author", bookForm.author);
      formData.append("description", bookForm.description);
      formData.append("quantity", bookForm.quantity);
      formData.append("price", bookForm.price);
      formData.append("discountPrice", bookForm.discountPrice);
    
      if (bookForm.bookImage) {
        formData.append("bookImage", bookForm.bookImage);
      }
    
      try {
        const newBook = await createBookByAdminApiCall(formData);
        setBooks([...books, newBook.data]);
        toast.success("Book Created successfully!", { theme: "colored" });
        setBookForm({
          bookName: "",
          author: "",
          description: "",
          bookImage: null,
          quantity: "",
          price: "",
          discountPrice: "",
        });
        setIsAddingBook(false);
      } catch (error) {
        console.error("Error creating book:", error);
        toast.error("Book Not Created !", { theme: "colored" });
      }
    };

    const handleDeleteBook = async (bookId) => {
      try {
        await deleteAdminBooks(bookId);
        setBooks(books.filter((book) => book._id !== bookId));
        toast.success("Book Deleted successfully!", { theme: "colored" });
      } catch (error) {
        console.error('Error deleting book:', error);
        toast.error("Book Not Deleted !", { theme: "colored" });
      }
    };

   
  return (
    <div className="admin-container">
    <Box sx={{ width: '100%',paddingTop:"3%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "#9D9D9D" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" TabIndicatorProps={{
            style: {
              backgroundColor: "#A03037", 
            },
          }}
          sx={{
            "& .MuiTab-root": {
              color: "gray",
              mr: 10, 
            },
            "& .Mui-selected": {
              color: "Green"
            }
          }}>
          <Tab label="Books" {...a11yProps(0)} />
          <Tab label="Add Book" {...a11yProps(1)} />
          <Tab label="History" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="admin-book-section">
          {books.map((book, i) => (
            <Card className="Admin-cardContainer" key={i}>
              <CardActionArea>
                <CardContent className="cardContent">
                  {book.bookImage && (
                    <CardMedia
                      className="Admin-cardMedia"
                      component="img"
                      image={book.bookImage}
                      alt="Book Image"
                    />
                  )}
                </CardContent>
                <CardContent className="Admin-cardContentDown">
                  <p className="Admin-bookName">{book.bookName}</p>
                  <p className="Admin-author">{book.author}</p>
                  <span className="Admin-price">Rs. {book.discountPrice}</span>
                  <span className="Admin-discount">Rs. {book.price}</span>
                </CardContent>
                <Button className="admin-delete-btn" sx={{ color: "#8f2b2f" }}  onClick={() => handleDeleteBook(book._id)} >
                  Delete
                </Button>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <div className="admin-form-section">
          <div className="admin-title">
            <h2 className="admin-form-title">Add Books</h2>
            {isAddingNewBook  ? (
                  <button
                    className="admin-className-add-btn"
                    onClick={() => handleAddNewBookClose()}
                  >
                   Close
                  </button>
                ) : (
                  <button
                    className="admin-className-add-btn"
                    onClick={() => handleAddNewBookOpen()}
                  >
                   + Add New Book
                  </button>
                )}
          </div>
          {isAddingNewBook && (
            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <div className="admin-history-section">
            {history.map((book, i) => (
              <HistoryCard key={i} book={book} status={book.status} />
            ))}
          </div>
      </CustomTabPanel>
    </Box>
    <ToastContainer
            position="bottom-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="colored"
            transition={Bounce}
            />
    </div>
  );
}

}


export default Admin;