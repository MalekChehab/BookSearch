import React from 'react';

const BookAuthors = (authors) => {
    if (!authors) return '';
    else if (authors.length <= 2) {
        authors = authors.join(' and ');
    }
    else if (authors.length > 2) {
        let lastAuthor = ` and ${authors.slice(-1)}`;
        authors.pop();
        authors = authors.join(', ');
        authors += lastAuthor;
    };
    return (authors);
};

export default BookAuthors;