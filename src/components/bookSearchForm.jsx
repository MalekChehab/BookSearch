import React from 'react';
import './bookSearchForm.css';

const BookSearchForm = ({
    onSubmitHandler,
    searchTerm,
    onInputChange,
    error,
}) => {
    return(
        <form onSubmit={onSubmitHandler}>
            <input
                className='searchBar'
                type="search"
                placeholder='Search for an Author'
                value={searchTerm}
                onChange={onInputChange}
                required
             />
             <button className='submitButton' type="submit">Search</button>
            {error && (
                <div className='errorText' >
                    some error occured, while fetching api
                </div>
            )}
        </form>
    );
};

export default BookSearchForm;