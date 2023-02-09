import { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Btn from 'components/Button/Button';
import Loader from '../Loader/Loader';
import { ImageGalleryList } from 'components/ImageGallery/ImageGallery.styled';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32796564-0a88b372c2cdbd62904225ff4';

class ImageGallery extends Component {
  state = {
    data: [],
    page: 1,
    isLoading: false,
  };

  async componentDidUpdate(pP, pS) {
   if(pP.imageName !== this.props.imageName) {
    this.setState({ data: [], page: 1,});
    }

    if (pP.imageName !== this.props.imageName || pS.page !== this.state.page) {
      this.setState({ isLoading: true });
      
      try {
        const url = `${BASE_URL}?q=${this.props.imageName}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
        const response = await axios.get(url);

        this.setState(pS => ({ data: [...pS.data, ...response.data.hits] }));
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleClick = () => {
    this.setState(pS=>({page: pS.page + 1})) 
   }

  render() {
    const { data, isLoading } = this.state;
    console.log(data)
    return (
      <>{isLoading && <Loader/>}
        {data.length > 0 && (
          <>
            <ImageGalleryList>
            {data.map(item =>(<ImageGalleryItem key={item.id}  imgUrl={item.webformatURL} descr={item.tags}/>))}
            </ImageGalleryList>
            <Btn incrementPage={this.handleClick}/>
          </>
        )}
      </>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  imageName: PropTypes.string,
};
