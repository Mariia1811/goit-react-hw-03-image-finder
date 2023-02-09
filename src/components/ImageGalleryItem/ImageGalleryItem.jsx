import PropTypes from 'prop-types';
import { ImageGalleryItemLi, ImageGalleryItemImage } from './ImageGalleryItem.styled';

function ImageGalleryItem({ imgUrl, descr }) {
  return (
    <ImageGalleryItemLi>
      <ImageGalleryItemImage src={imgUrl} alt={descr} />
    </ImageGalleryItemLi>
  );
}

ImageGalleryItem.propTypes = {
  imgUrl: PropTypes.string,
  descr: PropTypes.string,
};

export default ImageGalleryItem;
