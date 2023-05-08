import { Component } from 'react';
import { PropTypes } from 'prop-types';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { imgURL, alt } = this.props;
    return (
      <div onClick={this.handleBackdropClick} className={css.overlay}>
        <div className={css.modal}>
          <img src={imgURL} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  imgURL: PropTypes.string,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
