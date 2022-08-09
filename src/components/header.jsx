import React from 'react';
import { IconBooks } from "@tabler/icons";
import './header.css';

const Header = ({headerText}) => {

    return (
        <>
            <div className="svg-container">
                {/* <svg className='svg' viewBox="0 0 500 800"  xmlns="http://www.w3.org/2000/svg"> */}
                    {/* <path className='path2' d="M 800 0 L 500 150 C 210 260 -1 160 -1 160 L 2 0 L 500 0 Z" /> */}
                <svg className='svg' viewBox='0 0 250 100'>
                    <path className='path2' d="M 0,0 L 0,50 C 25,100 150,100 150,0" />
                </svg>
                {/* <svg viewBox="0 0 800 400">
                    <path
                        className="path"
                        d="M 800 300 Q 400 350 0 300 L 0 0 L 800 0 L 800 300 Z"
                        fill="#50c6d8"
                    />
                </svg> */}
            </div>
            <header className='header'>
                <h1 className='headerText'><IconBooks  className='headerIcon'/>{headerText}</h1>
            </header>
        </>
    );
};

export default Header;