import React, {useEffect} from 'react';
import BookAuthors from './bookAuthors';
import './bookDetail.css';
import { IconBook } from "@tabler/icons";
import DropDownButton from './dropDownButton';

const BookDetail = ({book}) => {

    return (
        <section>
            <div>
                <img
                    className='detailsImage'
                    alt={`${book.volumeInfo.title} book`}
                    src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                />

                <div className='detailsText'>
                    <p>
                        <strong>Title:</strong> {book.volumeInfo.subtitle == null ? `${book.volumeInfo.title}` : `${book.volumeInfo.title}: ${book.volumeInfo.subtitle}`}
                    </p>
                    <p>
                        <strong>Authors:</strong> {BookAuthors(book.volumeInfo.authors)}
                    </p>
                    <p>
                        <strong>Page Count:</strong> {book.volumeInfo.pageCount}
                    </p>
                    <p>
                        <strong>Publisher:</strong> {book.volumeInfo.publisher}
                    </p>
                    <p>
                        <strong>Language:</strong> {book.volumeInfo.language}
                    </p>
                </div>
                <div className='buttons'>
                    <button 
                        className='previewButton'
                        type='button'
                        onClick={(e) => {
                            e.preventDefault();
                            window.open(`${book.accessInfo.webReaderLink}`)
                        }}>
                            <IconBook style={{marginRight:5}}/> Preview
                    </button>

                    <DropDownButton name='Download'>
                        <li>
                            <a className='downloadOptions' 
                            href={book.accessInfo.epub.downloadLink} 
                            target="_blank">
                                EPUB
                            </a>
                        </li>
                        <li>
                            <a className='downloadOptions' 
                            href={book.accessInfo.pdf.downloadLink} 
                            target="_blank">
                                PDF
                            </a>
                        </li>
                    </DropDownButton>
                </div>
            </div>
        </section>
    );
};

export default BookDetail;