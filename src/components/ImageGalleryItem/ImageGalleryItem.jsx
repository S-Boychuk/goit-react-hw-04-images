import { useState } from 'react';
import { PropTypes } from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

const ImageGalleryItem = ({ tags, imageUrl, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <li className={css['gallery-item']}>
      <img
        className={css['gallery-item-image']}
        src={imageUrl}
        alt={tags}
        onClick={toggleModal}
      />
      {showModal && (
        <Modal imgURL={largeImageURL} alt={tags} onClose={toggleModal} />
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string,
  imageUrl: PropTypes.string,
  largeImageURL: PropTypes.string,
};

export default ImageGalleryItem;
