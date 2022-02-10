import React, { Component } from 'react';
import s from './App.css';
import Searchbar from './components/Searchbar/Searchbar';
// import Loader from './components/Loader/Loader';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import ImageGallery from './components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    showModal: false
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }))
  }

  render() {
    const { showModal } = this.state;
    return (
      <div className={s.app} >
        <Searchbar />
        <ImageGallery />
        {/* <Loader /> */}
        <Button toggleModal={this.toggleModal} />
        {showModal && <Modal />}
      </div>
    );
  }
}

export default App;
