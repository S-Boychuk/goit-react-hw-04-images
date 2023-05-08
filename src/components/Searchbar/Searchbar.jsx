import { Component } from 'react';
import { BsSearchHeartFill } from 'react-icons/bs';
import { PropTypes } from 'prop-types';
import css from './Searchbar.module.css';

class SearchBar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => this.setState({ value });

  handleSubmit = e => {
    e.preventDefault();
    this.props.getSearchQuery(this.state.value);
  };

  render() {
    const { value } = this.state;

    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
            value={value}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  getSearchQuery: PropTypes.func.isRequired,
};

export default SearchBar;
