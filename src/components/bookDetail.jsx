import React, {useEffect} from 'react';
import BookAuthors from './bookAuthors';
import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';
import './bookDetail.css';
import { IconBookDownload, IconBook } from "@tabler/icons";
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('ORg4AjUWIQA/Gnt2VVhiQlFaclxJVHxBYVF2R2FJflR0fV9FZ0wxOX1dQl9hSXZTf0RnXHhednxVQWY=');

enableRipple(true);

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
                            <IconBook style={{marginRight: 5}}/> Preview
                    </button>

                    <DropDownButtonComponent
                        className='dropdownDownloadButton'
                        cssClass='e-caret-hide'
                        items={
                            [
                                {
                                    iconCss: 'e-icons e-file',
                                    text: 'EPUB',
                                    url: `${book.accessInfo.epub.downloadLink}`,
                                    disabled: book.accessInfo.epub.isAvailable ? false : true,
                                }, 
                                {
                                    iconCss: 'e-icons e-export-pdf-2',
                                    text: 'PDF',
                                    url: `${book.accessInfo.pdf.downloadLink}`,
                                    disabled: book.accessInfo.pdf.isAvailable ? false : true,
                                },
                            ]
                        } > 
                        <IconBookDownload style={{marginRight: 5}}/> Download
                    </DropDownButtonComponent>  
                </div>
            </div>
        </section>
    );
};

export default BookDetail;