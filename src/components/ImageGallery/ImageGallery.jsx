import { Component } from 'react';
import { PropTypes } from 'prop-types';
import css from './ImageGallery.module.css';
import { PER_PAGE, getImages } from 'api/PixabayApiService';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    showBtn: false,
    showLoader: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchQuery !== this.props.searchQuery &&
      this.props.searchQuery.trim()
    ) {
      this.resetState();
      this.createGallery();
      return;
    }

    if (
      prevProps.searchQuery === this.props.searchQuery &&
      prevState.page !== this.state.page
    ) {
      this.createGallery();
      return;
    }
  }

  createGallery = async () => {
    this.toggleLoader();
    this.setState({ showBtn: false });

    try {
      const newImages = await getImages(
        this.props.searchQuery,
        this.state.page
      );

      const totalPages = this.getTotalPages(newImages.totalHits, PER_PAGE);

      if (totalPages > this.state.page) {
        this.setState({ showBtn: true });
      }

      this.setState(({ images }) => ({
        images: [...images, ...newImages.hits],
      }));
    } catch (error) {
      console.log(error);
    }

    this.toggleLoader();
  };

  getTotalPages = (total, denominator) => {
    const divisible = total % denominator === 0;
    const valueToBeAdded = divisible ? 0 : 1;
    return Math.floor(total / denominator) + valueToBeAdded;
  };

  updatePage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  resetState = () => this.setState({ images: [], page: 1 });

  toggleLoader = () => {
    this.setState(({ showLoader }) => ({ showLoader: !showLoader }));
  };

  render() {
    return (
      this.state.images.length !== 0 && (
        <>
          <ul className={css.gallery}>
            {this.state.images.map(
              ({ id, tags, webformatURL, largeImageURL }) => {
                return (
                  <ImageGalleryItem
                    key={id}
                    tags={tags}
                    imageUrl={webformatURL}
                    largeImageURL={largeImageURL}
                  />
                );
              }
            )}
          </ul>
          {this.state.showBtn && <Button onClick={this.updatePage} />}
          {this.state.showLoader && <Loader />}
        </>
      )
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ImageGallery;
