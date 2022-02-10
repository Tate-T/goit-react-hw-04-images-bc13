import React, { Component } from 'react';
import s from './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import Loader from './components/Loader/Loader';
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
        {showModal && <Modal onClose={this.toggleModal} />}
        <Loader />
      </div>
    );
  }
}

export default App;
