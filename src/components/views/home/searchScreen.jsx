import React, {useState, useEffect} from 'react';
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
    const [startIndex, setStartIndex] = useState(0);
    const maxResults = 40;
    const [isThereMoreBooks, setIsThereMoreBooks] = useState(false);
    const [isThereLessBooks, setIsThereLessBooks] = useState(false);

    useEffect(() => {
        console.log('books:', books);

        if(startIndex+maxResults<books.totalItems){
            setIsThereMoreBooks(true);
        }else{
            setIsThereMoreBooks(false);
        }
        if(startIndex > 0){
            setIsThereLessBooks(true);
        }else{
            setIsThereLessBooks(false);
        }
    }, [books]);

    useEffect(() => {
        console.log('startIndex:', startIndex);
        if(searchTerm != ''){
            fetchBooks();
        }
    }, [startIndex]);

    let navigate = useNavigate();

    const handleLogout = () => {
        navigate('/', {isLoggedIn: false});
    }

    let API_URL = 'https://www.googleapis.com/books/v1/volumes';

    const onInputChange = e => {
        setStartIndex(0);
        setSearchTerm(e.target.value);
        // for search as you type feature
        fetchBooks();
    };

    const onSubmit = e => {
        setStartIndex(0);
        e.preventDefault();
        fetchBooks();
    }

    const fetchBooks = async () => {
        setLoading(true);
        setError(false);
        try{
            const result = await axios.get(
                `${API_URL}?q=inauthor:${searchTerm}&filter=free-ebooks&download=download-undefined&maxResults=${maxResults}&startIndex=${startIndex}&orderBy=newest`
                );
            if(result.data != null){
                setBooks(result.data);
            }else{
                console.log('no result found');
            }
        } catch(error){
            setError(true);
        }
        setLoading(false);
    }

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const nextBooks = async() => {
        setStartIndex(startIndex+maxResults);
        fetchBooks();
        console.log('index: '+ startIndex);
        goToTop();
        console.log(books.items[0].volumeInfo.title);
    }

    const previousBooks = async() => {
        setStartIndex(startIndex-maxResults);
        fetchBooks();
        goToTop();
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
            <ErrorBoundary key={searchTerm}>
                <BooksList books={books} />
            </ErrorBoundary>
            {isThereLessBooks && <Button className='previousButton' onClick={previousBooks}>Previous</Button>}    
            {isThereMoreBooks && <Button className='nextButton' onClick={nextBooks}>Next</Button>}
        </>
    );

};

export default SearchScreen;
