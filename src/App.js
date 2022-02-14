import React, { Component } from 'react';
import s from './App.css';
// import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar/Searchbar';
import Button from './components/Button/Button';
import LoaderSpinner from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageGalleryItem from './components/ImageGallery/ImageGalleryItem/ImageGalleryItem';
import galleryAPI from './services/gallery-api';

class App extends Component {
  state = {
    galleryImgName: '',
    gallery: [],
    largeImageURL: '',
    page: 1,
    total: 0,
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

  componentDidUpdate(_, prevState) {
    if (prevState.galleryImgName !== this.state.galleryImgName || prevState.page !== this.state.page) {
      this.galleryRendrer()
    }

    if (this.state.page > 1 && prevState.gallery !== this.state.gallery) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }
  }

  galleryRendrer = () => {
    this.setState({ loading: true });
    // this.setState({ status: 'pending' });
    galleryAPI
      .fetchGallery(this.state.galleryImgName, this.state.page)
      // .then(gallery => this.setState({ gallery, status: 'resolved' }))
      .then((res) => {
        if (res.totalHits === 0) {
          throw new Error(
            `По запросу ${this.state.galleryImgName} ничего не найдено!`,
          );
        }
        this.setState((prevState) => ({
          gallery:
            this.state.page === 1
              ? res.hits
              : [...prevState.gallery, ...res.hits],

          total: res.totalHits,

        }));

        this.scroll();
      })
      .catch(error => this.setState({ error }))
      // .catch(error => this.setState({ error, status: 'rejected' }))
      .finally(() => this.setState({ loading: false }));
  }

  handleSearchSubmit = galleryImgName => {
    this.setState({
      galleryImgName: galleryImgName,
      // gallery: [],
      page: 1,
      error: null
    })
  }

  showLoadMore = () => {
    const { total, page } = this.state;
    return Math.ceil(total / 12) !== page - 1;
  };

  scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  onClickImage = largeImageURL => {
    this.setState({ largeImageURL: largeImageURL });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }))
  }

  handlePageIncr = () => {
    this.setState({ page: this.state.page + 1 });
  };

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
              webformatURL={img.webformatURL}
              largeImageURL={img.largeImageURL}
              onClick={this.onClickImage} />))}
          </ImageGallery>)}
        {showModal && <Modal URL={this.state.largeImageURL} onClose={this.toggleModal} />}
        {gallery.length > 0 && !loading && showLoadMore && (
          <Button galleryAppear={this.handlePageIncr} />
        )}
        {loading && <LoaderSpinner />}
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
