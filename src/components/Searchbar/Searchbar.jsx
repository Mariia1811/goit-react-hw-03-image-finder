import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { SearchWrap, SearchForm, SearchFormInput } from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    searchImg: '',
  };

  handleChange = e => {
    this.setState({ searchImg: e.target.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchImg.trim() === '') {
      toast.warn('Sorry, the field is empty, please try again.', {
        theme: 'colored',
      });
      this.setState({ searchImg: '' });
      e.target.reset();
      return;
    }
    this.props.onSubmit(this.state.searchImg);
    this.setState({ searchImg: '' });
  };

  render() {
    return (
      <SearchWrap>
        <SearchForm onSubmit={this.handleSubmit}>
          <IconButton aria-label="search" type="submit">
            <SearchIcon />
          </IconButton>

          <SearchFormInput
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchWrap>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
