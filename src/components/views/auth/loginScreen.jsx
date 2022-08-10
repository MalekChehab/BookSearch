import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './loginScreen.css';
import reading from '../../../assets/reading.png';

const LoginScreen = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // global google
        google.accounts.id.initialize({
          client_id: "524495382387-mf7sqgp3gg8so5omn0o8m0p82bofdu00.apps.googleusercontent.com",
          callback: handleSuccess
        });
        
        google.accounts.id.renderButton(
          document.getElementById('signInDiv'),
          {theme: 'outline', size: 'large', text: 'continue_with'}
        );
    }, []);

    let navigate = useNavigate();

    function handleSuccess () {
        setIsLoggedIn(true);
        console.log(isLoggedIn);
        navigate('/search');
    }
    
    return (
        <>
            <h1 className='title'>Book Search</h1>
            <div className='loginImage'>
                <img src={reading} alt="readingImage" className='readingImage' />
            </div>
            <hr className='separator'/>
            <h2>Log In</h2>
            <div id='signInDiv' ></div>
        </>
    )
}

export default LoginScreen;