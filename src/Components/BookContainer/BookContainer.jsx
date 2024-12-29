import React, { useEffect, useState } from "react";
import Book from "../Book/Book";
import './BookContainer.scss';
import { allBooks } from "../../Api";
import { Pagination } from "@mui/material";

export default () => {

let [books, setBooks] = useState([])
let [page, setPage] = useState(1);
let [count, setCount] = useState()

    useEffect(()=>{
        (async()=>{
            const data = await allBooks(page);
            setBooks(data[0])
            setCount(Math.ceil(data[1] / 16))
        })()
    }, [page])

    return(
    <>
        <div className="BookContainer">
            {
                
                books.map((book)=><Book key={book._id} book={book}/>)
            }
        </div>
        {count&&(<footer className="Footer">
            {console.log("here")}
            <Pagination 
                count={count}
                page={page}
                onChange={(e,v)=>setPage(v)}
            />
        </footer>)}
    </>
    )

}
    