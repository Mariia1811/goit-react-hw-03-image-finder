import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  state = {
    isShowModal: false,
  };

  handleClickImg = () => {
    this.setState(({ isShowModal }) => ({
      isShowModal: !isShowModal,
    }));
  };

  render() {
    const { imgUrl, descr, largeImage } = this.props;

    return (
      <>
        <ImageGalleryItemLi onClick={this.handleClickImg}>
          <ImageGalleryItemImage src={imgUrl} alt={descr}  loading="lazy" />
        </ImageGalleryItemLi>
        {this.state.isShowModal && (
          <Modal
            largeImage={largeImage}
            descr={descr}
            onCloseModal={this.handleClickImg}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  imgUrl: PropTypes.string,
  descr: PropTypes.string,
  largeImage: PropTypes.string,
};

export default ImageGalleryItem;
