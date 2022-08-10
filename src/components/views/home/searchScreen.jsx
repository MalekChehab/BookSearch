import React, {useState} from 'react';
import axios from 'axios';
import BookSearchForm from '../../bookSearchForm';
import BooksList from '../../booksList';
import DotLoader from 'react-spinners/DotLoader';
import Header from '../../header';
import {Button} from 'react-bootstrap';
import './searchScreen.css';
import {IconLogout} from '@tabler/icons';
import {useNavigate} from 'react-router-dom';
import ErrorBoundary from '../../errorBoundary';

const SearchScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState({items: []});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    const handleLogout = () => {
        navigate('/', {isLoggedIn: false});
    }

    let API_URL = 'https://www.googleapis.com/books/v1/volumes';

    const onInputChange = e => {
        setSearchTerm(e.target.value);
        
        // for search as you type feature
        fetchBooks();
    };

    const onSubmit = e => {
        e.preventDefault();
        fetchBooks();
    }

    const fetchBooks = async () => {
        setLoading(true);
        setError(false);
        
        try{    
            //inauthor is for searching for author
            //filter to only show downloadable free ebooks
            //increase the number of results to 40 which is maximum
            //order by the newest book
            const result = await axios.get(`${API_URL}?q=inauthor:${searchTerm}&filter=free-ebooks&download=download-undefined&maxResults=40&orderBy=newest`);
            if(result.data != null){
                setBooks(result.data);
            }else{
                console.log('no result found');
            }
        } catch(error){
            setError(true);
        }
        setLoading(false);
    };

    return (
        <>
            <Header headerText={'Book Search'} />
            
            <Button type='button' className='logoutButton' onClick={handleLogout}><IconLogout /></Button>

            <BookSearchForm
                onSubmitHandler={onSubmit}
                onInputChange={onInputChange}
                searchTerm={searchTerm}
                error={error}
            />
            <DotLoader
                className='dotLoader'
                color={'#162463'}
                loading={loading}
                size={60}
                margin={2}
            />
            <ErrorBoundary key={searchTerm}>
                <BooksList books={books} />
            </ErrorBoundary>
        </>
    );

};

export default SearchScreen;
