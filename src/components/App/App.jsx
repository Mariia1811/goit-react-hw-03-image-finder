import { Component } from 'react';
import { ToastContainer} from 'react-toastify';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { AppWrap } from './App.styled';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
  };

  handleSubmitForm = imgName => {
    this.setState({ searchQuery: imgName, page: 1 });
  };

  handleClick = () => {
    this.setState(pS => ({ page: pS.page + 1 }));
  };

  render() {
    return (
      <AppWrap>
        <Searchbar onSubmit={this.handleSubmitForm} />
       
        <ImageGallery
          imageName={this.state.searchQuery}
          page={this.state.page}
          onBtnchangePage={this.handleClick}
        />
        <ToastContainer/>
      </AppWrap>
    );
  }
}

export default App;
