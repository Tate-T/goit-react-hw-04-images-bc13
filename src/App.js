import React, { Component } from 'react';
import s from './App.css';
import Searchbar from './components/Searchbar/Searchbar';
// import Loader from './components/Loader/Loader';
// import Button from './components/Button/Button';
// import Modal from './components/Modal/Modal';
import ImageGallery from './components/ImageGallery/ImageGallery';

class App extends Component {

  render() {
    return (
      <div className={s.app} >
        <Searchbar />
        <ImageGallery />
        {/* <Loader />
        <Button />
        <Modal /> */}
      </div>
    );
  }
}

export default App;
