import { Component } from 'react';
import { PropTypes } from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { tags, imageUrl, largeImageURL } = this.props;
    return (
      <li className={css['gallery-item']}>
        <img
          className={css['gallery-item-image']}
          src={imageUrl}
          alt={tags}
          onClick={this.toggleModal}
        />
        {this.state.showModal && (
          <Modal imgURL={largeImageURL} alt={tags} onClose={this.toggleModal} />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string,
  imageUrl: PropTypes.string,
  largeImageURL: PropTypes.string,
};

export default ImageGalleryItem;
