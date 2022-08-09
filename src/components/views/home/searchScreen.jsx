import React, {useState, CSSProperties} from 'react';
import axios from 'axios';
import BookSearchForm from '../../bookSearchForm';
import BooksList from '../../booksList';
import DotLoader from 'react-spinners/DotLoader';
import Header from '../../header';
import {Button} from 'react-bootstrap';
import './searchScreen.css';
import {IconLogout} from '@tabler/icons';
import {useNavigate} from 'react-router-dom';

const SearchScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState({items: []});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    let API_URL = 'https://www.googleapis.com/books/v1/volumes';

    const onInputChange = e => {
        setSearchTerm(e.target.value);
    };

    const onSubmit = e => {
        e.preventDefault();
        fetchBooks();
    }

    const fetchBooks = async () => {
        setLoading(true);
        console.log(loading);
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
        console.log(loading);
    };

    const handleLogout = () => {
        navigate('/', {isLoggedIn: false});
    }

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
            <BooksList books={books} />
        </>
    );

};

export default SearchScreen;
