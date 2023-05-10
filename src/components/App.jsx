import { useState } from 'react';
import SearchBar from './Searchbar/Searchbar';
import css from './App.module.css';
import ImageGallery from './ImageGallery/ImageGallery';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  const reset = () => {
    setImages([]);
    setPage(1);
  };

  const getSearchQuery = searchQuery => setSearchQuery(searchQuery);

  return (
    <div className={css.app}>
      <SearchBar getSearchQuery={getSearchQuery} reset={reset}></SearchBar>
      <ImageGallery
        searchQuery={searchQuery}
        page={page}
        setPage={setPage}
        images={images}
        setImages={setImages}
      ></ImageGallery>
    </div>
  );
};
