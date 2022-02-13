import React, { Component } from 'react';
import s from './App.css';
// import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar/Searchbar';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import ImageGallery from './components/ImageGallery/ImageGallery';
import galleryAPI from './services/gallery-api';

class App extends Component {
  state = {
    galleryImgName: '',
    gallery: null,
    loading: false,
    error: null,
    showModal: false,
    // status: 'idle'
  }

  // const KEY = '23821952-b78db636c6ddcde4f5e93d8a9';

  // componentDidMount() {
  //   this.setState({ loading: true });

  //   setTimeout(() => {
  //     fetch('https://pixabay.com/api/')
  //       .then(res => res.json())
  //       .then(gallery => this.setState({ gallery }))
  //       .finaly(() => this.setState({ loading: false }));
  //   }, 1000)
  // }


  componentDidUpdate(prevState) {
    if (prevState.galleryImgName !== this.state.galleryImgName) {
      this.setState({ loading: true, gallery: null });
      // this.setState({ status: 'pending' });
      galleryAPI
        .fetchGallery(this.state.galleryImgName)
        .then(gallery => this.setState({ gallery }))
        // .then(gallery => this.setState({ gallery, status: 'resolved' }))
        .catch(error => this.setState({ error }))
        // .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleSearchSubmit = galleryImgName => {
    this.setState({ galleryImgName })
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }))
  }

  render() {
    const { gallery, galleryImgName, showModal, loading, error } = this.state;

    // if (this.state.status === 'idle') {
    //   return <div>Enter image-name</div>
    // }

    // if (this.state.status === 'pending') {
    //   return <div>Is loading</div>
    // }

    // if (this.state.status === 'rejected') {
    //   return <h1>{error.message}</h1>
    // }

    // if (this.state.status === 'resolved') {
    //   return <ImageGallery galleryImgName={galleryImgName} />
    // }

    return (
      <div className={s.app} >
        <Searchbar findImg={this.handleSearchSubmit} />
        {error && <h1>{error.message}</h1>}
        {gallery && <ImageGallery galleryImgName={galleryImgName} />}
        {showModal && <Modal onClose={this.toggleModal} />}
        {loading && <Loader />}
        {/* <ToastContainer position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover /> */}
      </div>
    );
  }
}

export default App;
