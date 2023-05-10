import { useState } from 'react';
import { BsSearchHeartFill } from 'react-icons/bs';
import { PropTypes } from 'prop-types';
import css from './Searchbar.module.css';

const SearchBar = ({ getSearchQuery, reset }) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }) => setValue(value);

  const handleSubmit = e => {
    e.preventDefault();
    getSearchQuery(value);
    reset();
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css['button-label']}>Search</span>
          <BsSearchHeartFill size={20} />
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={value}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  getSearchQuery: PropTypes.func.isRequired,
};

export default SearchBar;
