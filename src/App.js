import React, { useState, useEffect, useCallback } from 'react';
import s from './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar/Searchbar';
import Button from './components/Button/Button';
import LoaderSpinner from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageGalleryItem from './components/ImageGallery/ImageGalleryItem/ImageGalleryItem';
import galleryAPI from './services/gallery-api';

const App = () => {

  const [galleryImgName, setGalleryImgName] = useState('');
  const [gallery, setGallery] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setIoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //     const galleryRendrer = () => {
  //       setIoading({ loading: true });
  //       // this.setState({ status: 'pending' });
  //       galleryAPI
  //         .fetchGallery(galleryImgName, page)
  //         // .then(gallery => this.setState({ gallery, status: 'resolved' }))
  //         .then((res) => {
  //           if (res.totalHits === 0) {
  //             throw new Error(
  //               `По запросу ${galleryImgName} ничего не найдено!`,
  //             );
  //           }

  //           setGallery(prev =>
  //             page === 1
  //               ? res.hits
  //               : [...prev, ...res.hits],
  //           );

  //           setTotal(res.totalHits);

  //           scroll();
  //         })
  //         .catch(error => setError({ error }))
  //         // .catch(error => this.setState({ error, status: 'rejected' }))
  //         .finally(() => setIoading(false));
  //     }

  //     galleryRendrer()

  //     if (page > 1) {
  //       window.scrollTo({
  //         top: document.documentElement.scrollHeight,
  //         behavior: 'smooth'
  //       });
  //     }
  //   }, [galleryImgName, page])

  const galleryRendrer = useCallback(
    () => {
      setIoading({ loading: true });
      galleryAPI
        .fetchGallery(galleryImgName, page)
        .then((res) => {
          if (res.totalHits === 0) {
            throw new Error(
              `По запросу ${galleryImgName} ничего не найдено!`,
            );
          }

          setGallery(prev =>
            page === 1
              ? res.hits
              : [...prev, ...res.hits],
          );

          setTotal(res.totalHits);

        })
        .catch(error => setError({ error }))
        .finally(() => setIoading(false));

      if (page > 1) {
        scroll();
      }

    },
    [galleryImgName, page],
  )

  useEffect(() => {
    galleryRendrer()

  }, [galleryRendrer])

  const handleSearchSubmit = galleryImgName => {
    setGalleryImgName(galleryImgName)
    setPage(1)
    setError(null)
  }

  const showLoadMore = () => {
    return Math.ceil(total / 12) !== page - 1;
  };

  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const onClickImage = largeImageURL => {
    setLargeImageURL(largeImageURL);
    this.toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal)
  };

  const handlePageIncr = () => {
    setPage(page + 1);
  };

  return (
    <div className={s.app} >
      <Searchbar findImg={handleSearchSubmit} />
      {error && <h1>{error.message}</h1>}
      {gallery.length > 0 &&
        (<ImageGallery galleryImgName={galleryImgName} >
          {gallery.map(img =>
          (<ImageGalleryItem
            key={img.id}
            webformatURL={img.webformatURL}
            largeImageURL={img.largeImageURL}
            onClick={onClickImage} />))}
        </ImageGallery>)}
      {showModal && <Modal URL={largeImageURL} onClose={toggleModal} />}
      {gallery.length > 0 && !loading && showLoadMore() && (
        <Button galleryAppear={handlePageIncr} />
      )}
      {loading && <LoaderSpinner />}
      <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        draggable
        pauseOnHover
        theme='colored'
      />
    </div>
  );
}

export default App;
