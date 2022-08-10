import React from 'react';
import { IconBooks } from "@tabler/icons";
import './header.css';

const Header = ({headerText}) => {

    return (
        <>
            <div className="svg-container">
                <svg className='svg' viewBox='0 0 250 100'>
                    <path className='path2' d="M 0,0 L 0,50 C 25,100 150,100 150,0" />
                </svg>
            </div>
            <header className='header'>
                <h1 className='headerText'><IconBooks  className='headerIcon'/>{headerText}</h1>
            </header>
        </>
    );
};

export default Header;