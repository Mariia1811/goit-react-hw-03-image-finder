import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {Overlay, ModalEl} from './Modal.styled'

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscClose);
  }

  handleEscClose = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleBackdropClose = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { largeImage, tags } = this.props;

    const templete = (
      <Overlay onClick={this.handleBackdropClose}>
        <ModalEl>
          <img src={largeImage} alt={tags} />
        </ModalEl>
      </Overlay>
    );
    return createPortal(templete, document.querySelector('#modal-root'));
  }
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
