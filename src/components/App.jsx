import { Component } from 'react';
import SearchBar from './Searchbar/Searchbar';
import css from './App.module.css';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  getSearchQuery = searchQuery => this.setState({ searchQuery });

  render() {
    return (
      <div className={css.app}>
        <SearchBar getSearchQuery={this.getSearchQuery}></SearchBar>
        <ImageGallery searchQuery={this.state.searchQuery}></ImageGallery>
      </div>
    );
  }
}
