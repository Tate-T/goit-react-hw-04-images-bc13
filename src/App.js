import React, { Component } from 'react';
import s from './App.css';
// import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar/Searchbar';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import ImageGallery from './components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    galleryImgName: '',
    gallery: null,
    loading: false,
    showModal: false
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

  componentDidUpdate(prevProps) {
    if (prevProps.galleryImgName !== this.props.galleryImgName) {
      this.setState({ loading: true });
      fetch(`https://pixabay.com/api/${this.props.galleryImgName}`)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
        })
        .then(gallery => this.setState({ gallery }))
        .catch(error => this.setState({ error }))
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
    return (
      <div className={s.app} >
        <Searchbar findImg={this.handleSearchSubmit} />
        {error && <h1>Изображения с именем {galleryImgName} нет</h1>}
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
