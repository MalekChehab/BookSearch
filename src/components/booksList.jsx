import React from 'react';
import BookAuthors from './bookAuthors';
import {Link} from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import './booksList.css';

const BookItem = ({book}) => {
    
    return (
        <li>
            <Link to={`/book/${book.id}`}>  
                
                <div className='bookCard'>
                    <img
                        alt={`${book.volumeInfo.title} book`}
                        src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gps_api`}
                    />
                    <div className='bookCardText'>
                        <h3>{book.volumeInfo.title}                                                                                 {/*title*/}
                            <span>{book.volumeInfo.publishedDate != null ? ` (${book.volumeInfo.publishedDate})` : ''}</span>       {/*publishedDate*/}
                        </h3>
                        <p>{book.volumeInfo.authors != null ? (`${BookAuthors(book.volumeInfo.authors)}`) : ''}</p>                 {/*authors*/}
                        <p>{book.volumeInfo.publisher != null ? (`${book.volumeInfo.publisher}`) : ''}</p>                          {/*publisher*/}
                        <div>{book.volumeInfo.averageRating != null ? 
                        <StarRatings
                            className='ratings'                                                                                      //rating
                            rating={book.volumeInfo.averageRating}
                            starRatedColor='#ffb65a'
                            starEmptyColor='grey'
                            starDimension='25px'
                        />
                        : ''}</div>
                        <p>{book.volumeInfo.ratingCount != null ? (`Number of ratings: ${book.volumeInfo.ratingCount}`) : ''}</p>   {/*numberOfRatings*/}
                    </div>
                </div>
            </Link>
        </li>
    );
};

const BooksList = ({books}) => {
    return (
            <ul className='grid'>
                {books.items.map((book, index) => {
                    return <BookItem className='bookItem' book={book} key={index} />;
                })}
            </ul>
    );
};

export default BooksList;