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
    isLoading: false,
    totalPages: 1,
  };

  async componentDidUpdate(pP, pS) {
   if(pP.imageName !== this.props.imageName) {
    this.setState({ data: [] });
    }

    if (pP.imageName !== this.props.imageName || pP.page !== this.props.page) {
      this.setState({ isLoading: true });
      
      try {
        const url = `${BASE_URL}?q=${this.props.imageName}&page=${this.props.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
        const response = await axios.get(url);
        this.setState(pS => ({ data: [...pS.data, ...response.data.hits], totalPages: response.data.totalHits / 12 }));
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
    
  }

  render() {
    const { data, totalPages, isLoading } = this.state;
    const { changePage, page} = this.props;
   const isbtnHiden = totalPages <= page;
    return (
      <>{isLoading && <Loader/>}
        {data.length > 0 && (
          <>
            <ImageGalleryList>
            {data.map(item =>(<ImageGalleryItem key={item.id}  imgUrl={item.webformatURL} descr={item.tags} largeImage={item.largeImageURL}/>))}
            </ImageGalleryList>
           {!isbtnHiden && <Btn incrementPage={changePage}/>} 
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
