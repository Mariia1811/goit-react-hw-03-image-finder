import { Component } from 'react';
import { AppWrap} from './App.styled';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';

class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmitForm = imgName => {
    this.setState({ searchQuery: imgName});
  };

  render() {
    return (
      <AppWrap >
        <Searchbar onSubmit={this.handleSubmitForm} />
        <ImageGallery imageName={this.state.searchQuery} />
      </AppWrap>
    );
  }
}

export default App;
