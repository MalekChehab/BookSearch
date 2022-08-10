import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import BookDetail from '../../bookDetail';
import DotLoader from 'react-spinners/DotLoader';

const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'blue',
};

const BookDetailScreen = () => {
    const {bookId} = useParams();

    const [book, setBook] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
        const fetchBook = async () => {
            setLoading(true);
            setError(false);
            try{
                const result = await axios.get(`${API_BASE_URL}/${bookId}`);
                setBook(result.data);
            }catch(error){
                setError(true);
            }
            setLoading(false);
        };
        fetchBook();
    }, [bookId]);
    return (
        <>
            <DotLoader
                color={'#162463'} 
                loading={loading} 
                cssOverride={override} 
                size={60}
                margin={2}
            />
            {error && (
                <div style={{color: 'red'}}>
                    some error occured, while fetching api
                </div>
            )}
            {book && <BookDetail book={book} />}
        </>
    );
};

export default BookDetailScreen;