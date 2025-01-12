import React, { useEffect, useRef, useState } from "react";
import Book from "../Book/Book";
import './BookContainer.scss';
import { allBooks, searchedBooks } from "../../Api";
import { Pagination } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setBooks, setPage } from "../../App/BookContainerSlice";
import { useSearchParams } from "react-router-dom";
import { setSort } from "../../App/BookContainerSlice";
import BookNotFound from "../BookNotFound/BookNotFound";
import Loader from "../Loader/Loader";

export default () => {

    const page = useSelector((state)=>state.bookContainer.page);
    const books = useSelector((state)=>state.bookContainer.books);
    const count = useSelector((state)=>state.bookContainer.count);
    const value = useSelector((state)=>state.bookContainer.value);
    const sort = useSelector((state)=>state.bookContainer.sort);
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
 
    let prevPage = useRef(page);
    let prevValue = useRef(value);
    let prevSort = useRef(sort);
    const dispatch = useDispatch();

    // useEffect(()=>{
    //     if(value=='')
    //         if(prevPage?.current!=page || books?.length==0 || prevValue?.current!=value || prevSort?.current!=sort)
    //             (async()=>{
    //                 try{
    //                     setLoading(true)
    //                 const data = await allBooks(page, sort);
    //                 dispatch(setBooks({data: data[0], count: Math.ceil(data[1] / 20)}))
    //                 prevPage.current=page;
    //                 prevSort.current = sort;
    //                 }
    //                 catch(error){
    //                     dispatch(setBooks([]))
    //                 }
    //                 finally{
    //                     setLoading(false)
    //                 }
    //             })()
    // }, [page, value, sort])

    // useEffect(()=>{
    //     if(value!='')
    //         if(prevPage?.current!=page || books?.length==0 || prevValue?.current!=value || prevSort?.current!=sort)
    //             (async()=>{
    //                 try{
    //                     setLoading(true)

    //                 const data = await searchedBooks(page, value, sort);
    //                 dispatch(setBooks({data: data[0], count: Math.ceil(data[1] / 20)}))
    //                 prevPage.current=page;
    //                 prevValue.current = value;
    //                 prevSort.current = sort;
    //             }
    //             catch(error){
    //                 dispatch(setBooks([]))
    //             }
    //             finally{
    //                 setLoading(false)
    //             }
    //             })()
    // }, [page, value, sort])


    useEffect(() => {
        const queryPage = Number(searchParams.get("page")) || 1;
        console.log(queryPage,"===========******************===========")

        if (queryPage !== page) {
            console.log(queryPage,"==========================")
            dispatch(setPage(Number(queryPage)));
        }
        const querySort =  Number(searchParams.get("sort")) || 0;
        console.log("querySort", querySort)
        if (querySort !== sort) {
            console.log("querySort", querySort)

            dispatch(setSort(Number(querySort)));
        }
    }, []);

    useEffect(() => {
        const querySort =  Number(searchParams.get("sort")) || 0;
        setSearchParams({ page: page , sort: querySort});
    }, [page]);

    useEffect(() => {
        const queryPage = Number(searchParams.get("page")) || 1;
        setSearchParams({ page: queryPage, sort: sort })
    }, [sort]);

    useEffect(() => {
            console.log(page, sort, "--------------------------------------")
            if (value === '') {
                if(prevPage?.current!=page || books?.length==0 || prevValue?.current!=value || prevSort?.current!=sort)
                    (async()=>{
                        try {
                            setLoading(true)
                            const data = await allBooks(page, sort);
                            dispatch(setBooks({data: data[0], count: Math.ceil(data[1] / 20)}))
                            prevPage.current=page;
                            prevValue.current = value;
                            prevSort.current = sort;
                        }
                        catch(error){
                            dispatch(setBooks([]))
                        }
                        finally{
                            setLoading(false)
                        }
                    })()
                    }
             else {
                if(prevPage?.current!=page || books?.length==0 || prevValue?.current!=value || prevSort?.current!=sort)
                                (async()=>{
                                    try{
                                        setLoading(true)
                
                                    const data = await searchedBooks(page, value, sort);
                                    dispatch(setBooks({data: data[0], count: Math.ceil(data[1] / 20)}))
                                    prevPage.current=page;
                                    prevValue.current = value;
                                    prevSort.current = sort;
                                }
                                catch(error){
                                    dispatch(setBooks([]))
                                }
                                finally{
                                    setLoading(false)
                                }
                                })()
            }
    }, [page, value, sort]);




    return(<>
        {!loading ? (<>
            {books?.length
            ?   (<div className="BookContainer">
                    {
                        books.map((book)=><Book key={book._id} book={book}/>)
                    }
                </div>)
            :   (<div className="BookContainer">
                    <BookNotFound/>
                </div>)
                }
            {count>1&&(<footer className="Footer">
                <Pagination 
                    count={count}
                    page={page}
                    onChange={(e,v)=>dispatch(setPage(v))}
                />
            </footer>)}
        </>) : <Loader/>}
        </>
    )
}