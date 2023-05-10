import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import css from './ImageGallery.module.css';
import { PER_PAGE, getImages } from 'api/PixabayApiService';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';

const ImageGallery = ({ searchQuery, images, setImages, page, setPage }) => {
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const createGallery = async () => {
      setStatus('pending');
      try {
        const newImages = await getImages(searchQuery, page);
        const totalPages = getTotalPages(newImages.totalHits, PER_PAGE);

        if (totalPages > page) {
          setStatus('loaded');
        } else {
          setStatus('endOfPage');
        }

        setImages(prevImages => [...prevImages, ...newImages.hits]);
      } catch (error) {
        console.log(error);
      }
    };

    createGallery();
  }, [searchQuery, page]);

  const getTotalPages = (total, denominator) => {
    const divisible = total % denominator === 0;
    const valueToBeAdded = divisible ? 0 : 1;
    return Math.floor(total / denominator) + valueToBeAdded;
  };

  const updatePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  // const reset = () => {
  //   setPage(1);
  //   setImages([]);
  // };

  return (
    images.length !== 0 && (
      <>
        <ul className={css.gallery}>
          {images.map(({ id, tags, webformatURL, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                tags={tags}
                imageUrl={webformatURL}
                largeImageURL={largeImageURL}
              />
            );
          })}
        </ul>
        {status === 'loaded' && <Button onClick={updatePage} />}
        {status === 'pending' && <Loader />}
      </>
    )
  );
};

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ImageGallery;
