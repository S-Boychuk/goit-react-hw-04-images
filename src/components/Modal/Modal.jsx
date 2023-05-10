import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ imgURL, alt, onClose }) => {
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div onClick={handleBackdropClick} className={css.overlay}>
      <div className={css.modal}>
        <img src={imgURL} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imgURL: PropTypes.string,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
