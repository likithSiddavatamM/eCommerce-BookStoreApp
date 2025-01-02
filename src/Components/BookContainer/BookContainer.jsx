import React, { useEffect, useRef } from "react";
import Book from "../Book/Book";
import './BookContainer.scss';
import { searchedBooks } from "../../Api";
import { Pagination } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setBooks, setPage } from "../../App/BookContainerSlice";

export default () => {

    const page = useSelector((state)=>state.bookContainer.page);
    const books = useSelector((state)=>state.bookContainer.books);
    const count = useSelector((state)=>state.bookContainer.count);
    const value = useSelector((state)=>state.bookContainer.value);

    let prevPage = useRef(page);
    let prevValue = useRef(value);

    const dispatch = useDispatch();

    useEffect(()=>{
        if(prevPage.current!=page || books.length==0 || prevValue.current!=value)
            (async()=>{
                const data = await searchedBooks(page, value);
                dispatch(setBooks({data: data[0], count: Math.ceil(data[1] / 20)}))
                prevPage.current=page;
                prevValue.current = value;
            })()
    }, [page, value])

    return(
        <>
            <div className="BookContainer">
                {
                    books.map((book)=><Book key={book._id} book={book}/>)
                }
            </div>
            {count>1&&(<footer className="Footer">
                <Pagination 
                    count={count}
                    page={page}
                    onChange={(e,v)=>dispatch(setPage(v))}
                />
            </footer>)}
        </>
    )
}
