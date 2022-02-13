import React, { Component } from 'react';
import s from './App.css';
// import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar/Searchbar';
import Button from './components/Button/Button';
// import LoaderSpinner from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageGalleryItem from './components/ImageGallery/ImageGalleryItem/ImageGalleryItem';
import galleryAPI from './services/gallery-api';

class App extends Component {
  state = {
    galleryImgName: '',
    gallery: [],
    largeImageURL: '',
    currentPage: 1,
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

  componentDidMount() {
    this.setState({ loading: true, gallery: null });
    this.fetchGallery();
  }

  componentDidUpdate(prevState) {
    if (prevState.galleryImgName !== this.state.galleryImgName) {
      this.setState({ loading: true });
      // this.setState({ status: 'pending' });
      galleryAPI
        .fetchGallery(this.state.galleryImgName, this.state.currentPage)
        // .then(gallery => this.setState({ gallery, status: 'resolved' }))
        .then(({ hits, total }) => {
          if (total === 0) {
            throw new Error(
              `По запросу ${this.state.galleryImgName} ничего не найдено!`,
            );
          }
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...hits],
          }));
          window.scrollTo({
            top: document.documentElement.offsetHeight,
            behavior: 'smooth',
          });
          this.setState(prevState => ({
            currentPage: prevState.currentPage + 1,
          }));
        })
        .catch(error => this.setState({ error }))
        // .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleSearchSubmit = galleryImgName => {
    this.setState({
      galleryImgName: galleryImgName,
      gallery: [],
      currentPage: 1,
      error: null
    })
  }

  showLoadMore = () => {
    const { total, page } = this.state;
    return Math.ceil(total / 12) !== page - 1;
  };

  onClickImage = largeImageURL => {
    this.togleModal();
    this.setState({ largeImageURL: largeImageURL });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }))
  }

  render() {
    const { gallery, galleryImgName, showModal, loading, error } = this.state;
    const showLoadMore = this.showLoadMore();
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
        {gallery.length > 0 &&
          (<ImageGallery galleryImgName={galleryImgName} >
            {this.state.gallery.map(img =>
            (<ImageGalleryItem
              key={img.id}
              webformatURL={gallery.webformatURL}
              largeImageURL={gallery.largeImageURL}
              onClick={this.onClickImage} />))}
          </ImageGallery>)}
        {showModal && <Modal URL={this.state.largeImageURL} onClose={this.toggleModal} />}
        {gallery.length > 0 && !loading && showLoadMore && (
          <Button onClickHandler={this.fetchGallery} />
        )}
        {/* {loading && <LoaderSpinner />} */}
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
