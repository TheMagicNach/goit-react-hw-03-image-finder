import  { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyled } from './ImageGallery.styled';

class ImageGallery extends Component {

  render() {
    const { images, onOpenModal } = this.props;
    return (
      <>
        <ImageGalleryStyled >

          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onOpenModal={onOpenModal}
            />
          ))}


        </ImageGalleryStyled>
      </>
    )
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;