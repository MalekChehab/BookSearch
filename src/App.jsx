import React from 'react';
import './App.css';
import SearchScreen from './components/views/home/searchScreen';
import BookDetailScreen from './components/views/home/bookDetailScreen';
import LoginScreen from './components/views/auth/loginScreen';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const NoMatchRoute = () => <div>404 Page doesn't exist</div>;

const App = () => {

  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' exact element={<LoginScreen/>} />
          <Route path="/search" exact element={<SearchScreen/>} />
          <Route path="/book/:bookId" exact element={<BookDetailScreen/>} />
          <Route element={<NoMatchRoute/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;