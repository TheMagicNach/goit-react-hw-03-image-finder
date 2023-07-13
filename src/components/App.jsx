import React ,{ Component } from 'react';
import PropTypes from 'prop-types';
import { AppStyled } from './App.styled';
import { FetchApi } from './API/api';


import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

class App extends Component {

  state = {
    images: [],
    currentPage: 1,
    query: '',
    isLoading: false,
    selectedImage: null,
  };

  galleryRef = null;

  componentDidMount() {
    this.galleryRef = React.createRef();
  }

  handleOpenModal = selectedImage => {
    this.setState({ selectedImage });
  };

    handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  handleSearchSubmit = async query => {
    this.setState(
      {
        images: [],
        currentPage: 1,
        query,
        isLoading: true,
      },
      async () => {
        try {
          const images = await FetchApi(query, 1);

          if (images.length === 0 && images.length <= 12) {
            this.setState({ isLoading: false });
          
          } else {
            const totalCount = this.state.images.length;
           
            
          }
          this.setState({ images });
        } catch (error) {
    
          this.setState({ error: error.message });
        }

        this.setState({ isLoading: false });
      }
    );
  };

 handleLoadMore = async () => {
    const { currentPage, query, images } = this.state;
    const nextPage = currentPage + 1;

    this.setState({ isLoading: true });

    try {
      const images = await FetchApi(query, nextPage);
      if (images.length === 0 && images.length <= 12) {
        this.setState({ isLoading: false });

        return;
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        currentPage: nextPage,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    }

    this.setState({ isLoading: false });


    const totalCount = this.state.images.length;
  };



  render() {
     const { images, isLoading, selectedImage } = this.state;
    const isShowButton = images.length > 0 && !isLoading && images.length >= 12 && images.length % 12 === 0;
    return (
    <>
      <SearchBar onSubmit={this.handleSearchSubmit}/>
        <AppStyled>

        <ImageGallery
          images={images}
          onOpenModal={this.handleOpenModal}
          ref={this.galleryRef}
          />
          {isShowButton && <Button onClick={this.handleLoadMore} />}
          {isLoading && <Loader />}
          {selectedImage && (
            <Modal
              largeImageURL={selectedImage.largeImageURL}
              onClose={this.handleCloseModal}
            />
          )}
        </AppStyled>

    </>
    )
  }
}
App.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  currentPage: PropTypes.number,
  query: PropTypes.string,
  isLoading: PropTypes.bool,
  selectedImage: PropTypes.object,
};

export default App;